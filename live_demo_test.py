
"""
the client here should act as the simulator sending requests for now.
"""

import socket
import json
import logging
from configparser import ConfigParser
import time

CONFIG_FILE_PATH = 'config.ini'

config = ConfigParser()
config.read(CONFIG_FILE_PATH)

if not config.items:
    print('could not access config parameters')
    exit(1)

HOST = str(config['MAIN_SERVER']['HOST'])
REQUEST_PORT = int(config['MAIN_SERVER']['HOST_REQUEST_PORT'])
RESPONSE_PORT = int(config['MAIN_SERVER']['HOST_RESPONSE_PORT'])


def load_json(filename):

    data = {}

    with open(filename, 'r') as f:
        data = json.load(f)

    return data

def send_data(host, port, data):

    logging.info('Sending to: {}:{}'.format(host, port))
    logging.info(data)
    
    try: 
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP

        # serialize json
        data = json.dumps(data)

        s.sendto(bytes(data, "utf-8"), (host, port))

    finally:
        s.close()
        logging.info('Succesfully sent request')

def main():

    logging.basicConfig(level=logging.INFO)

    request_1 = {
        "type": "request",
        "request_text": "The car in front is driving slow. Overtake at the next possible situation?",
        "choices": ["no", "yes"],
        "default_choice": 0, 
        "time_remaining": 10
    }

    request_2 = {
        "type": "request",
        "request_text": "Overtake now?",
        "choices": ["no", "yes"],
        "default_choice": 0, 
        "time_remaining": 5
    }

    request_3 = {
        "type": "request",
        "request_text": "Overtake now?",
        "choices": ["no", "yes"],
        "default_choice": 0, 
        "time_remaining": 5
    }

    response_1 = {
        "type": "user_response",
        "decision": 1
    }

    response_2 = {
        "type": "user_response",
        "decision": 0
    }

    response_3 = {
        "type": "user_response",
        "decision": 1
    }

    # wait for 6sec, until car appears 
    time.sleep(6)
    send_data(HOST, REQUEST_PORT, request_1)

    # respond with yes
    time.sleep(3)
    send_data(HOST, RESPONSE_PORT, response_1)

    # ask for overtake
    time.sleep(3)
    send_data(HOST, REQUEST_PORT, request_2)

    # respond with no
    time.sleep(4)
    send_data(HOST, RESPONSE_PORT, response_2)

    # ask for overtake again
    time.sleep(4)
    send_data(HOST, REQUEST_PORT, request_3)

    # respond with yes
    time.sleep(2)
    send_data(HOST, RESPONSE_PORT, response_3)




if __name__ == '__main__':
    main()