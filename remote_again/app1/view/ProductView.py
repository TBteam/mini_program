from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

from app1.model.product import Product
from app1.serializer.ProductSerializer import ProductSerializer
import datetime
from app1.utils.debug import log

@api_view(['GET','POST'])
def ProductList(request):
    if request.method == "GET":
        products = Product.objects.all()
        serializer = ProductSerializer(products,many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        log.debug(request.body)
        product = Product()
        data = JSONParser().parse(request)
        product.product_name = data['product_name']

        try:
            search = Product.objects.get(product_name=product.product_name)
            log.debug("duplicate:" + product.product_name)
            return Response("duplicate",status=status.HTTP_201_CREATED)
        except:
            pass

        product.create_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        try:
            product.save()
            return Response(ProductSerializer(product).data,status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response("error",status=status.HTTP_400_BAD_REQUEST)


