
"""
the client here should act as the simulator sending requests for now.
"""

import socket
import json
import logging

TEST_HOST = '127.0.0.1'
TEST_PORT = 40000


def build_request(type, *choices, time_remaining=10):
    pass

def load_request(filename):

    data = {}

    with open(filename, 'r') as f:
        data = json.load(f)

    return data

def send_request(host, port, request):

    logging.info('Sending to: {}:{}'.format(host, port))
    logging.info(request)
    
    try: 
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP

        data = json.dumps(request)

        s.sendto(bytes(data, "utf-8"), (host, port))

    finally:
        s.close()
        logging.info('Succesfully sent request')

def main():

    logging.basicConfig(level=logging.INFO)

    request = load_request('test_request.json')

    send_request(TEST_HOST, TEST_PORT, request)

if __name__ == '__main__':
    main()