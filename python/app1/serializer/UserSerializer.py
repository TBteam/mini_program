from rest_framework import serializers
from app1.model.user import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id","username","password")