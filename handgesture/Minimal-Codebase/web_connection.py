import random
from z_execute import *

user_danger_threshold = 0.5   ## user's dangerous attribute as threshold (half of danger percentage to decide whether for AD system to take over)

# def dec_generator(inputs, detector_config, detector, labels, weighting_func):
def dec_generator(prediction_det, prob_det, labels):
# def event_occured():
    # det_selected_queue = myqueue_det.ewma
    # prediction_det, prob_det = get_det_prediction(inputs, detector_config, detector)
    # if prediction_det == 1 and prob_det > weighting_func(len(myqueue_det)):
    user_danger_status = random.uniform(0, 1)   ## user's dangerous attribute within boundary condition [0,1]
    dec_ = ""   ## decision to tell driver whether to take over or not

    if prediction_det == 1:
        logging_information["event"] = labels["detector_class"][prediction_det]
        logging_information["probability"] = prob_det
        # decision making system
        # post_data(logging_information)
        if user_danger_threshold < user_danger_status: ## if dangerous threshold is over half percentage then
            dec_ = "No"
            dec_binray_flag = False
            print(f'__system decision is {dec_} from user danger status, {user_danger_status}, with danger threshold {user_danger_threshold}')
            # print(f'__system decision is {dec_} from {logging_information["event"]} with probability {logging_information["probability"]}')
            return dec_binray_flag

        elif user_danger_threshold > user_danger_status:
            dec_ = "Yes"
            dec_binray_flag = True
            return dec_binray_flag
    else:
        print("__None detected, system cannot generate decision, return false")