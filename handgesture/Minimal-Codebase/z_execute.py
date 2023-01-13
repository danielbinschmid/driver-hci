from collections import OrderedDict
import os
import glob
import json
import pandas as pd
import numpy as np
import csv
import torch
import time
from torch.autograd import Variable
from PIL import Image
import cv2
from torch.nn import functional as F

from model import generate_model
from spatial_transforms import *
from utils import Queue
import sys

import pdb
import numpy as np
import datetime

from munch import DefaultMunch

def weighting_func(x):
    return (1 / (1 + np.exp(-0.2 * (x - 9))))

def get_det_prediction(inputs, detector_config, detector):
    # get output of detector
    inputs_det = inputs[:, :, -detector_config.sample_duration_det:, :, :]
    
    outputs_det = detector(inputs_det)
    

    outputs_det = F.softmax(outputs_det, dim=1)
    
    outputs_det = outputs_det.cpu().numpy()[0].reshape(-1, )
    # enqueue the probabilities to the detector queue
    myqueue_det.enqueue(outputs_det.tolist())

    if detector_config.det_strategy == 'raw':
        det_selected_queue = outputs_det
    elif detector_config.det_strategy == 'median':
        det_selected_queue = myqueue_det.median
    elif detector_config.det_strategy == 'ma':
        det_selected_queue = myqueue_det.ma
    elif detector_config.det_strategy == 'ewma':
        det_selected_queue = myqueue_det.ewma
    prediction_det = np.argmax(det_selected_queue)

    prob_det = det_selected_queue[prediction_det]

    return prediction_det, prob_det


# ------------------------------ INIT -----------------------------------

# xxxxx prepare the configuration dictionaries xxxxxx
logging_information = {}
labels = {}
config = {}

with open('./z_egoGesture_labels.json', 'r') as opt_file:
    labels = json.load(opt_file)

with open('./config.json', 'r') as opt_file:
    config = json.load(opt_file)

# load configuration of models
classifier_config = {}
detector_config = {}
opt = {}
with open('./z_opts_clf.json', 'r') as opt_file:
    classifier_config = json.load(opt_file)
with open('./z_opts_det.json', 'r') as opt_file:
    detector_config = json.load(opt_file)

classifier_config["root_path"] = config["root_path"]
detector_config["root_path"] = config["root_path"]

classifier_config["no_cuda"] = not config["use_cuda"]
detector_config["no_cuda"] = not config["use_cuda"]

classifier_config["resume_path"] = os.path.join(config["root_path"], config["weights_clf"])
detector_config["resume_path"] = os.path.join(config["root_path"], config["weights_det"])

classifier_config, detector_config, config = DefaultMunch.fromDict(classifier_config), DefaultMunch.fromDict(detector_config), DefaultMunch.fromDict(config)
opt = classifier_config
# xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# generate models
detector, detector_params = generate_model(detector_config)

if detector_config.resume_path:
    detector_config.resume_path = os.path.join(detector_config.root_path, detector_config.resume_path)
    print('loading checkpoint {}'.format(detector_config.resume_path))
    checkpoint = torch.load(detector_config.resume_path)

    if detector_config.no_cuda:
        new_state_dict = OrderedDict()

        for k, v in checkpoint['state_dict'].items():
            if k[:7] == 'module.':
                name = k[7:]  # remove `module.`
            else:
                name = k
            new_state_dict[name] = v
        detector.load_state_dict(new_state_dict)
    else:
        detector.load_state_dict(checkpoint['state_dict'])



classifier, classifier_params = generate_model(classifier_config)

if classifier_config.resume_path:
    print('loading checkpoint {}'.format(classifier_config.resume_path))
    checkpoint = torch.load(classifier_config.resume_path)

    if classifier_config.no_cuda:
        new_state_dict = OrderedDict()

        for k, v in checkpoint['state_dict'].items():
            if k[:7] == 'module.':
                name = k[7:]  # remove `module.`
            else:
                name = k
            new_state_dict[name] = v
        classifier.load_state_dict(new_state_dict)
    else:
        classifier.load_state_dict(checkpoint['state_dict'])

if config.use_cuda:
    detector = detector.cuda()
    classifier = classifier.cuda()
detector.eval()
classifier.eval()


# setup spatial transform of incoming input
if opt.no_mean_norm and not opt.std_norm:
    norm_method = Normalize([0, 0, 0], [1, 1, 1])
elif not opt.std_norm:
    norm_method = Normalize(opt.mean, [1, 1, 1])
else:
    norm_method = Normalize(opt.mean, opt.std)

spatial_transform = Compose([
    Scale(112),
    CenterCrop(112),
    ToTensor(opt.norm_value), norm_method
])
spatial_transform.randomize_parameters()

# more constants and configs 
sample_duration = max(detector_config.sample_duration_det, classifier_config.sample_duration_clf)



# -------------------------------- DETECTION LOOP ----------------------------------
url  = config.camera_port
cap = cv2.VideoCapture(url)
is_first_frame = True
clip = []

myqueue_det = Queue(detector_config.det_queue_size, n_classes=detector_config.n_classes_det)
myqueue_clf = Queue(classifier_config.clf_queue_size, n_classes=classifier_config.n_classes_clf)
clf_selected_queue = np.zeros(classifier_config.n_classes_clf, )
det_selected_queue = np.zeros(detector_config.n_classes_det, )

# Variables for prediction logic
active = False
prev_active = False
passive_count = 0
finished_prediction = None
pre_predict = False
cum_sum = np.zeros(classifier_config.n_classes_clf, )
prev_best1 = classifier_config.n_classes_clf
results = []
active_index = 0
fps = ""




while cap.isOpened(): 
    t1 = time.time()
    ret, frame = cap.read()
    if frame is None:
        break

    # transform frame for input into model
    _frame = cv2.resize(frame,(320,240))
    _frame = Image.fromarray(cv2.cvtColor(_frame, cv2.COLOR_BGR2RGB))
    _frame = _frame.convert('RGB')
    _frame = spatial_transform(_frame)

    # add new frame to sliding time window
    if is_first_frame:
        for i in range(sample_duration):
            
            clip.append(_frame)
        is_first_frame = False
    else:
        clip.pop(0) 
        clip.append(_frame)

    # permute sliding window
    im_dim = clip[0].size()[-2:]
    try:
        test_data = torch.cat(clip, 0).view((sample_duration, -1) + im_dim).permute(1, 0, 2, 3)
    except Exception as e:
        pdb.set_trace()
        raise e
    inputs = torch.cat([test_data],0).view(1,3,sample_duration,112,112)


    # Get prediction
    with torch.no_grad():
        inputs = Variable(inputs)

        # get output of detector
        prediction_det, prob_det = get_det_prediction(inputs, detector_config=detector_config, detector=detector)

        #### State of the detector is checked here as detector act as a switch for the classifier
        if prediction_det == 1:
            inputs_clf = inputs[:, :, :, :, :]
            inputs_clf = torch.Tensor(inputs_clf.numpy()[:,:,::1,:,:])
            outputs_clf = classifier(inputs_clf)
            outputs_clf = F.softmax(outputs_clf, dim=1)
            outputs_clf = outputs_clf.cpu().numpy()[0].reshape(-1, )
            # Push the probabilities to queue
            myqueue_clf.enqueue(outputs_clf.tolist())
            passive_count = 0

            if classifier_config.clf_strategy == 'raw':
                clf_selected_queue = outputs_clf
            elif classifier_config.clf_strategy == 'median':
                clf_selected_queue = myqueue_clf.median
            elif classifier_config.clf_strategy == 'ma':
                clf_selected_queue = myqueue_clf.ma
            elif classifier_config.clf_strategy == 'ewma':
                clf_selected_queue = myqueue_clf.ewma

        else:
            outputs_clf = np.zeros(classifier_config.n_classes_clf, )
            # Push the probabilities to queue
            myqueue_clf.enqueue(outputs_clf.tolist())
            passive_count += 1


    # Whether user is actively performing a hand gesture
    active = passive_count < detector_config.det_counter

    if active:         
        # compute current prediction
        active_index += 1
        cum_sum = ((cum_sum * (active_index - 1)) + (weighting_func(active_index) * clf_selected_queue)) / active_index  # Weighted Aproach
        #cum_sum = ((cum_sum * (active_index-1)) + (1.0 * clf_selected_queue))/active_index #Not Weighting Aproach
        best2, best1 = tuple(cum_sum.argsort()[-2:][::1])

        # if confidence exceeds a confidence threshhold, then return prediction
        if float(cum_sum[best1] - cum_sum[best2]) > classifier_config.clf_threshold_pre:
            finished_prediction = True
            pre_predict = True

    else:
        active_index = 0
 
    if not active and prev_active:
        finished_prediction = True
    elif active and not prev_active:
        finished_prediction = False

    if finished_prediction:
        best2, best1 = tuple(cum_sum.argsort()[-2:][::1])
        if cum_sum[best1] > classifier_config.clf_threshold_final:
            if pre_predict:
                if best1 != prev_best1 and cum_sum[best1] > classifier_config.clf_threshold_final:
                    results.append(best1)
                    print('Early Detected - class : {} with prob : {}'.format(labels[best1], cum_sum[best1]))
            else:
                if cum_sum[best1] > classifier_config.clf_threshold_final:
                    if best1 == prev_best1:
                        if cum_sum[best1] > 5:
                            results.append(best1)
                            print('Late Detected - class : {} with prob : {}'.format(labels[best1], cum_sum[best1]))
                    else:
                        results.append(best1)
                        print('Late Detected - class : {} with prob : {}'.format(labels[best1], cum_sum[best1]))

            finished_prediction = False
            prev_best1 = best1

        cum_sum = np.zeros(classifier_config.n_classes_clf, )
    
    if not active and prev_active:
        pre_predict = False

    prev_active = active
    elapsedTime = time.time() - t1
    fps = "(Playback) {:.1f} FPS".format(1/ (elapsedTime + sys.float_info.epsilon))

    if len(results) != 0:
        predicted = np.array(results)
        prev_best1 = -1
    else:
        predicted = []
    # print('results: {}'.format(results))
    # cv2.putText(frame, fps, (0, 15), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (38, 0, 255), 1, cv2.LINE_AA)
    # cv2.imshow("Result", frame)

    if cv2.waitKey(1)&0xFF == ord('q'):
        break
cv2.destroyAllWindows()

    
