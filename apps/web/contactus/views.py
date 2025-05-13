from rest_framework.response import Response
from rest_framework import status
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_422_UNPROCESSABLE_ENTITY
from rest_framework.views import APIView
from .serializers import ContactUsSerializers, PhoneClientSerializers


class ContactUsCreateView(APIView):
    def post(self, request):
        ser_data = ContactUsSerializers(data=request.data)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        else:
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class PhoneClientCreateView(APIView):
    def post(self, request):
        ser_data = PhoneClientSerializers(data=request.data)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        else:
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)
