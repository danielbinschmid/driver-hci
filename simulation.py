
"""
this script simulates a real-life scenario to test the prototype
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
        "type": "start_simulation"
    }

    request_2 = {
        "type": "request",
        "request_text": "The car in front is driving slow. Take over when possible?",
        "choices": ["no", "yes"],
        "default_choice": 0, 
        "time_remaining": 5
    }

    request_3 = {
        "type": "request",
        "request_text": "I feel safe to take-over. Overtake now?",
        "choices": ["no", "yes"],
        "default_choice": 0, 
        "time_remaining": 5
    }

    request_4 = {
        "type": "reset_simulation"
    }

    # start simulation
    send_data(HOST, REQUEST_PORT, request_1)

    # ask for overtake
    time.sleep(3)
    send_data(HOST, REQUEST_PORT, request_2)

    # ask for overtake again
    time.sleep(7)
    send_data(HOST, REQUEST_PORT, request_3)

    # reset simulation
    time.sleep(20)
    send_data(HOST, REQUEST_PORT, request_4)


if __name__ == '__main__':
    main()