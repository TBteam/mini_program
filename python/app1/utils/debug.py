
import logging
import os

def get_logger():
    #filepath = os.path.join(os.path.dirname(__file__), 'utils')
    filepath = os.path.join(os.path.dirname(__file__),"log.conf")
    print("log file path:" + filepath)
    logging.config.fileConfig(filepath)
    return logging.getLogger()

def getlogger():
    import logging
    logging.basicConfig(format='%(levelname)s %(asctime)s %(filename)s :%(message)s', level=logging.DEBUG)
    #logging.debug("test log")
    return logging.getLogger()

log = getlogger()

def call_me():
    logger = getlogger()
    logger.info('hi')