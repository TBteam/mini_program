from rest_framework import serializers
from app1.model.product import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id","product_name","create_date")