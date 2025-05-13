from rest_framework import serializers
from .models import *
import json
import datetime
from products.serializers import ProductSerializer, ProductImageSerializer, ProductSerializerAndImages
from products.models import Product
from django.shortcuts import get_object_or_404


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'


class StatusTranzactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusTransaction
        fields = '__all__'


class OrderListSerializer(serializers.ModelSerializer):
    Items = serializers.SerializerMethodField(source='get_Items')
    profile = serializers.SerializerMethodField(source='get_profile')
    posting_order = serializers.SerializerMethodField(source='get_posting_order')

    def get_Items(self, obj):
        Items = OrderItem.objects.filter(order=obj)
        ser_Items = OrderItemListSerializer(instance=Items, many=True)
        return ser_Items.data

    def get_profile(self, obj):
        return obj.profile.title

    def get_posting_order(self, obj):
        return obj.posting_order.title

    class Meta:
        model = Order
        fields = (
            'id', 'paid', 'discount', 'user', 'posting_order', 'profile', 'get_total_price', 'get_create_persian_date',
            'Items',)


class OrderItemListSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField(source='get_product')

    def get_product(self, obj):
        _obj = get_object_or_404(Product, id=obj.product.id)
        ser_data = ProductSerializerAndImages(instance=_obj)
        return ser_data.data

    class Meta:
        model = OrderItem
        fields = '__all__'


class TransactionListSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(source='get_user')
    status =serializers.SerializerMethodField(source='get_status')
    def get_user(self, obj):
        return obj.user.full_name
    def get_status(self, obj):
        return obj.status.title


    class Meta:
        model = Transaction
        fields =('user','order','status','amount','trans_id','get_create_persian_date')
