from django.shortcuts import render

# Create your views here.

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from app1.model.user import User
from app1.serializer.UserSerializer import UserSerializer

@api_view(['GET','POST'])
def User_list(request):

    if request.method == "GET":
        users = User.objects.all()
        serializer = UserSerializer(users,many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        print(request.body)


