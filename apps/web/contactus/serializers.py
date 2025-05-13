from rest_framework import serializers
from .models import ContactUs, PhoneClient


class ContactUsSerializers(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = ('name', 'email', 'subject', 'text')


class PhoneClientSerializers(serializers.ModelSerializer):
    class Meta:
        model = PhoneClient
        fields = ('phone',)
