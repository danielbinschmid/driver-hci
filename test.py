
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

    request = load_json('test_request.json')
    response = load_json('test_response.json')

    send_data(HOST, REQUEST_PORT, request)

    time.sleep(2)

    send_data(HOST, RESPONSE_PORT, response)


if __name__ == '__main__':
    main()