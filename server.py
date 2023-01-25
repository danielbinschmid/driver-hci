
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
    + parse json before calling updateWEbserver()
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

    HOST = str(config['MAIN_SERVER']['HOST'])
    REQUEST_PORT = int(config['MAIN_SERVER']['HOST_REQUEST_PORT'])
    RESPONSE_PORT = int(config['MAIN_SERVER']['HOST_RESPONSE_PORT'])
    WEBSERVER_ADDRESS = str(config['WEBSERVER']['WEBSERVER_ADDRESS'])

    logging.info('Loaded Configuration from config file: {}'.format(CONFIG_FILE_PATH))
    logging.info('HOST: {}'.format(HOST))
    logging.info('REQUEST_PORT: {}'.format(REQUEST_PORT))
    logging.info('RESPONSE_PORT: {}'.format(RESPONSE_PORT))
    logging.info('WEBSERVER: {}'.format(WEBSERVER_ADDRESS))

    # global timer for action decision
    global TIMER

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

    global open_request
    open_request = False

    response = {
        "type": "time_exceeded",
        } 

    update_webserver(response)

    time.sleep(3)

    response = {
        "type": "clear"
    }

    update_webserver(response)

"""
this function is the entry point for threads and
receives data from an entity (eg. ADS) via the network and
triggers the necessary logic
"""
def handle_decision_request(name, sock):

    logging.info('Starting {} on port {}'.format(name, REQUEST_PORT))

    # to track if a request was not yet answered
    global open_request
    open_request = False

    while sock.recv is not None:
            data, addr = sock.recvfrom(1024)

            logging.info('Request from: {}'.format(addr))
            logging.info(data.decode())

            try:
                json_data = json.loads(data.decode())

                request_type = json_data.get('type')
                time_remaining = json_data.get('time_remaining')

                if request_type == 'request' and time_remaining:
                    open_request = True

            except: 
                logging.warning('Invalid JSON Request-object received')
                open_request = False
                continue

            # send request to the webserver to notify the user to take action
            request = json_data
            update_webserver(request)

            # timer starts here, and gets cancelled by response thread
            # open_request gets reset if timer_exceeded is called
            if open_request:
                global TIMER
                TIMER = threading.Timer(time_remaining, timer_exceeded)
                TIMER.start()

                logging.info('Started Timer: {}sec'.format(time_remaining))

"""
this function receives data from the hand-gesture and takes action accordingly
"""
def handle_decision_response(name, sock):

    logging.info('Starting {} on port {}'.format(name, RESPONSE_PORT))

    # to check if a request was not yet answered
    global open_request

    while sock.recv is not None:
        data, addr = sock.recvfrom(1024)

        logging.info('Response from: {}'.format(addr))
        logging.info(data.decode())

        try:
            json_data = json.loads(data.decode())

        except:
            logging.warning('Invalid JSON Response-object received')
            continue

        # TODO 
        # compare response type with request type

        if open_request:

            logging.info('An open request got answered')

            # the user succesfully answered an open request

            # stop the timer as response was valid and in time
            TIMER.cancel()
            open_request = False

            response = json_data
            update_webserver(response)

            # after response, wait some time, then fire clear-request to reset
            time.sleep(2)
            response = {"type": "clear"}
            update_webserver(response)
        
        else:

            logging.warning('The user took action without needing to')

            # the user took action without needing to
            response = {"type": "invalid_action", "text": "No open request to be answered!"}
            update_webserver(response)

            # after response, wait some time, then fire clear-request to reset
            time.sleep(3)

            response = {"type": "clear"}
            update_webserver(response)
 
            
def main():

    setup()
    
    while True:
        
        time.sleep(1)

if __name__ == '__main__':
    main()