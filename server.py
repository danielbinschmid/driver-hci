
import socket
import time
import threading
import json
import logging
import requests
from configparser import ConfigParser

CONFIG_FILE_PATH = 'config.ini'

"""
TODO:
    + try catch for json parsing
    - decide on action
    - implement logic to handle response
    + respect time left and fire TimeExceeded exception if necessary
    - parse json before calling updateWEbserver()
    - implement type: clear_request
"""


"""
this functions initializes sockets and configurations
"""
def setup():

    # setup logger
    logging.basicConfig(level=logging.INFO)

    # import configs
    config = ConfigParser()
    config.read(CONFIG_FILE_PATH)

    if not config.items:
        logging.warning('Config could not be imported')
        exit(1)

    global HOST
    global REQUEST_PORT
    global RESPONSE_PORT
    global WEBSERVER_ADDRESS

    HOST = str(config['MAIN_SERVER']['HOST_LOCAL'])
    REQUEST_PORT = int(config['MAIN_SERVER']['HOST_REQUEST_PORT'])
    RESPONSE_PORT = int(config['MAIN_SERVER']['HOST_RESPONSE_PORT'])
    WEBSERVER_ADDRESS = str(config['WEBSERVER']['WEBSERVER_ADDRESS'])

    logging.info('Loaded configuration from config.ini\nHOST_LOCAL: {}\nREQUEST_PORT: {}\nRESPONSE_PORT: {}\nWEBSERVER: {}'.format(HOST, REQUEST_PORT, RESPONSE_PORT, WEBSERVER_ADDRESS))

    # init sockets
    request_listener = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
    request_listener.bind((HOST, REQUEST_PORT))

    response_listener = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
    response_listener.bind((HOST, RESPONSE_PORT))

    # launch threads
    thr1 = threading.Thread(target=handle_decision_request, args=['request_listener', request_listener])
    thr1.daemon = True
    thr1.start()

    thr2 = threading.Thread(target=handle_decision_response, args=['response_listener', response_listener])
    thr2.daemon = True
    thr2.start()

"""
this function updates the webserver by sending 'data' to the server
data should be a JSON object already
"""
def update_webserver(data):

    logging.info('Sending Update to Webserver at: {}'.format(WEBSERVER_ADDRESS))

    try:
        webserver_response = requests.post(WEBSERVER_ADDRESS, data=json.dumps(data), timeout=2)
        logging.info('Response from Webserver: {}'.format(webserver_response.text))

    except:
        logging.warning('Error updating Webserver')    

  
"""
this function is called if the timer for the response ran out
"""
def timer_exceeded():

    logging.warning('Response time exceeded')

    response = {
        'type': 'response_time_exceeded',
        } 

    update_webserver(response)

"""
this function is the entry point for threads and
receives data from an entity (eg. ADS) via the network and
triggers the necessary logic
"""
def handle_decision_request(name, sock):

    logging.info('Starting {} on port {}'.format(name, sock.getsockname()[1]))

    while sock.recv is not None:
            data, addr = sock.recvfrom(1024)

            logging.info('Request from: {}'.format(addr))

            try:
                request = json.loads(data.decode())

                # TODO handle decision logic here
                # logging.info('type of request: {}'.format(type(request)))

                # logging.info('JSON object:')
                # for key, value in request.items():
                #     logging.info('{}: {}'.format(key, value))

                # time_remaining = request.get('time_remaining')

                # global timer
                # timer = threading.Timer(time_remaining, timer_exceeded)
                # timer.start()

                # TODO replace the response mechanism with hand gesture
                # decision = input('input decision: left=1, right=2\n')

                # if decision == '1' or decision == '2':
                #     logging.info('Decision taken')

                # response = {
                #     'type': 'response_valid',
                #     'decision': decision
                #     }
                
                # # send response_valid update webserver
                # update_webserver(response)

                # # stop timer if successful
                # timer.cancel()

            except: 
                logging.warning('Invalid JSON object received')
                continue


"""
this function receives data from the hand-gesture and takes action accordingly
"""
def handle_decision_response(name, sock):

    logging.info('Starting {} on port {}'.format(name, sock.getsockname()[1]))

    while sock.recv is not None:
        data, addr = sock.recvfrom(1024)

        logging.info('Received response from: {}'.format(addr))

        logging.info(data.decode())

        # if not timer.isAlive():

        #     # negative response
        #     continue

        update_webserver(data)

        # send valid response



def main():

    setup()
    
    while True:
        
        time.sleep(1)

if __name__ == '__main__':
    main()