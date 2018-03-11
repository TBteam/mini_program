
from rest_framework import status
from rest_framework.response import Response
from app1.mysys.ErrorCode import ErrorCode
from rest_framework.decorators import api_view
import time
from app1.mysys import SysParam
import os
from app1.utils.debug import log

@api_view(['POST'])
def uploadFiles(request):
    log.debug('upload file')
    try:
        files = request.FILES.getlist("file")
        allFileNames = ""
        #log(files)
        for file in files:
            oldname = file.name
            filename = str(int(time.time() * 10) ) + "." + oldname.split(".")[1]
            filepath = "product"
            dirpath = os.path.join(SysParam.SYS_PIC_DIR,filepath)
            if not os.path.exists(dirpath):
                os.makedirs(dirpath)
            newfilepath = os.path.join(dirpath,filename)
            with open(newfilepath,'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            allFileNames = os.path.join(filepath,filename)
            log.debug("all file name:" + allFileNames)
    except Exception as e:
        log.error(format(e))
        return Response("error",status = status.HTTP_400_BAD_REQUEST)
    return Response({"filepath":allFileNames})

