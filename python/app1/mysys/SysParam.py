
import platform
import os

def BisWindows():
    sysstr = platform.system()
    if (sysstr == "Windows"):
        return True
    else:
        return False

def PicPath():
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    return os.path.join(base_path,"pic")
'''
    if(BisWindows() == True):
        return "d:/"
    else:
        return "/tmp/pic/"
'''

SYS_PLATFORM = platform.system()
SYS_PIC_DIR  = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"pic")

