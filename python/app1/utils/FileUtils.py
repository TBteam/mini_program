
from remote_again import settings
import os

def GetFileBaseDir():
    #print("base dir" + settings.BASE_DIR)
    #print("current dir" + os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

