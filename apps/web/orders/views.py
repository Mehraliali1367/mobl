from django.shortcuts import render
from rest_framework.views import APIView
from .models import Order, OrderItem, Coupon,Transaction
from .serializers import OrderListSerializer,TransactionListSerializer
from permissions import IsOwnerReadOnly
from rest_framework_simplejwt.backends import TokenBackend
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework.response import Response
from rest_framework import status


class ListOrder(APIView):
    permission_classes = [IsOwnerReadOnly]
    serializer_order = OrderListSerializer

    def setup(self, request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        try:
            valid_data = TokenBackend(algorithm='HS256').decode(token, verify=False)
            id = valid_data['user_id']
            self.user = get_user_model().objects.get(pk=id)
            request.user = self.user
        except ValidationError as v:
            print("validation error", v)
        return super().setup(request, *args, **kwargs)

    def get(self, request):
        order = Order.objects.filter(user=self.user)
        ser_order = self.serializer_order(instance=order, many=True)
        return Response(ser_order.data, status=status.HTTP_200_OK)


class ListTransaction(APIView):
    permission_classes = [IsOwnerReadOnly]
    serializer_tran = TransactionListSerializer

    def setup(self, request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        try:
            valid_data = TokenBackend(algorithm='HS256').decode(token, verify=False)
            id = valid_data['user_id']
            self.user = get_user_model().objects.get(pk=id)
            request.user = self.user
        except ValidationError as v:
            print("validation error", v)
        return super().setup(request, *args, **kwargs)

    def get(self, request):
        tran_obj = Transaction.objects.filter(user=self.user)
        ser_order = self.serializer_tran(instance=tran_obj, many=True)
        return Response(ser_order.data, status=status.HTTP_200_OK)
