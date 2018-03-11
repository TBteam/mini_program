
from enum import Enum,unique

SYS_ERR = -100

@unique
class ErrorCode(Enum):
    SYS_INTERNAL_ERR = SYS_ERR - 1   #系统错误
    SYS_PARA_ERR     = SYS_ERR - 2   #参数错误
    SYS_ESC_ERR      = SYS_ERR - 3   #退出



