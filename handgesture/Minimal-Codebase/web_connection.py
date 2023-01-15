import random
import socket
import json
from configparser import ConfigParser

CONFIG_FILE_PATH = '../../config.ini'

config = ConfigParser()
config.read(CONFIG_FILE_PATH)

if not config.items:
    print('could not access config parameters')
    exit(1)

HOST = str(config['MAIN_SERVER']['HOST'])
PORT = int(config['MAIN_SERVER']['HOST_RESPONSE_PORT'])

labels_lookup = []
decision_to_label = {}
with open('./labelToDecision/decision_to_label.json', 'r') as opt_file:
    decision_to_label = json.load(opt_file)

with open('./z_egoGesture_labels.json', 'r') as opt_file:
    labels_lookup = json.load(opt_file)

def dec_generator(labels):
    label_str = labels_lookup[labels]
    dec_ = 0 if label_str in decision_to_label["0"] else 1
    print("received label: " + label_str + " and generated decision " + str(dec_))

    data = {"type": "user_response", "decision": dec_}
    # json_data = json.load(data)
    send_response(data)


def send_response(data):
    
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.sendto(bytes(json.dumps(data), "utf-8"), (HOST, PORT))
    
    finally:
        print('Sent response to {}:{}'.format(HOST, PORT))
        print('Data was: {}'.format(data))
        
        s.close()
