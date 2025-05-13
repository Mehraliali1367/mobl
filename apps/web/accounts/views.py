from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .models import Profile
from django.contrib.auth import get_user_model
from .serializers import UserRegisterSerializer, UserSerializer, CheckOTPSerializer, PhoneSerializer, \
    ResendOtpSerializer, ProfileSerializer, ProvinceSerializer, CitiesSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from permissions import IsOwnerReadOnly
from django.views import View
#
from utils import send_otp
import datetime
from django.utils import timezone
from rest_framework.permissions import BasePermission, AllowAny, IsAuthenticated
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import viewsets, status
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
import random
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from .models import *
from .security import create_token, decrypt_token
from rest_framework_simplejwt.backends import TokenBackend
import json
from django.shortcuts import render


class UserRegisterView(APIView):
    def post(self, request):
        ser_data = UserRegisterSerializer(data=request.data)
        if ser_data.is_valid():
            get_user_model().objects.create_user(phone_number=ser_data.validated_data['phone_number'])
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    permission_classes = [IsOwnerReadOnly]
    user = None
    serialize_user_class = UserSerializer

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

    def post(self, request):
        self.check_object_permissions(request, self.user)
        ser_data = UserSerializer(instance=self.user)
        if ser_data.data:
            return Response(data=ser_data.data)
        else:
            return Response({"user": ""})

    def put(self, request):
        self.check_object_permissions(request, self.user)
        ser_data = self.serialize_user_class(instance=self.user, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsOwnerReadOnly]

    def post(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            token = RefreshToken(token)
            token.blacklist()

            return Response({"user": ""}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = PhoneSerializer

    def post(self, request, *args, **kwargs):
        phone = request.data.get('phone')
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone']

        try:
            obj_otp = OtpCode.objects.get(phone_number=phone)
            # Check for max OTP attempts
            if int(obj_otp.max_otp_try) == 0 and obj_otp.otp_max_out and timezone.now() < obj_otp.otp_max_out:
                return Response(
                    "Max OTP try reached, try after an hour",
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # Generate OTP and update user record
            otp = random.randint(1000, 9999)
            otp_expiry = timezone.now() + datetime.timedelta(minutes=60)
            max_otp_try = int(obj_otp.max_otp_try) - 1
            obj_otp.otp = otp
            obj_otp.otp_expiry = otp_expiry
            obj_otp.max_otp_try = max_otp_try
            if max_otp_try == 0:
                otp_max_out = timezone.now() + datetime.timedelta(hours=1)
            elif max_otp_try == -1:
                obj_otp.max_otp_try = 5
            else:
                obj_otp.otp_max_out = None
                obj_otp.max_otp_try = max_otp_try
                obj_otp.save()
                print(obj_otp.otp, 'OTP', obj_otp.phone_number)
                send_otp(obj_otp.phone_number, otp)
                payload = {
                    'phone': phone,
                    'otp': otp,
                    'exp': datetime.datetime.now() + datetime.timedelta(minutes=60)
                }
                token = create_token(payload)
                return Response({'token': token}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            obj_otp_ = OtpCode.objects.create(phone_number=phone)
            otp = random.randint(1000, 9999)
            otp_expiry = timezone.now() + datetime.timedelta(minutes=60)
            max_otp_try = int(obj_otp_.max_otp_try) - 1
            obj_otp_.otp = otp
            obj_otp_.otp_expiry = otp_expiry
            obj_otp_.max_otp_try = max_otp_try
            if max_otp_try == 0:
                otp_max_out = timezone.now() + datetime.timedelta(hours=1)
            elif max_otp_try == -1:
                obj_otp_.max_otp_try = 3
            else:
                obj_otp_.otp_max_out = None
                obj_otp_.max_otp_try = max_otp_try
                obj_otp_.is_passenger = True
                obj_otp_.save()
                send_otp(obj_otp_.phone_number, otp)
                payload = {
                    'phone': phone,
                    'otp': otp,
                    'exp': datetime.datetime.now() + datetime.timedelta(minutes=60)
                }
                token = create_token(payload)
                return Response({'token': token}, status=status.HTTP_200_OK)
        else:
            return Response("Phone number is incorrect", status=status.HTTP_401_UNAUTHORIZED)


class VerifyOTPView(APIView):
    permission_classes = [AllowAny]
    serialize_class = CheckOTPSerializer
    obj_otp_phone = None
    payload = None
    otp = None
    enc_token = None

    def post(self, request, *args, **kwargs):

        serializer = self.serialize_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.otp = serializer.validated_data['otp']
        self.enc_token = serializer.validated_data['token']
        data = decrypt_token(self.enc_token)
        # print(data["payload"]["phone"])
        if not data["status"]:
            return Response("Access denied 100-400", status=status.HTTP_400_BAD_REQUEST)
        else:
            self.payload = data["payload"]
        try:
            obj_otp = OtpCode.objects.get(otp=self.otp)
            if obj_otp:
                self.obj_otp_phone = obj_otp.phone_number
                print('*' * 10 + f' otp:{obj_otp.otp} with phone:{obj_otp.phone_number} verified ' + '*' * 10)
                obj_otp.delete()
            else:
                return Response("Please enter the correct OTP", status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response("Please enter the correct OTP", status=status.HTTP_400_BAD_REQUEST)

        try:
            print('*0' * 100)
            print(self.obj_otp_phone)
            user = User.objects.get(phone_number=self.obj_otp_phone)
            print(user)
            ser_data = UserSerializer(instance=user)
            # login(request, user)
            access = AccessToken.for_user(user=user)
            refresh = RefreshToken.for_user(user=user)
            return Response({'refresh': str(refresh), 'access': str(access), 'user': ser_data.data},
                            status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            print('*1' * 100)
            print(self.obj_otp_phone)
            user_ = User.objects.create(phone_number=self.obj_otp_phone)
            print(user_)
            ser_data = UserSerializer(instance=user_)
            login(request, user_)
            refresh = RefreshToken.for_user(user_)
            return Response({'refresh': str(refresh), 'access': str(refresh.access_token), 'user': ser_data.data},
                            status=status.HTTP_200_OK)


class ResendOTPView(APIView):
    permission_classes = [AllowAny]
    serialize_class = ResendOtpSerializer
    token = None
    obj_otp_phone = None
    payload = None
    otp = None

    def post(self, request, *args, **kwargs):
        # phone = request.data.get('phone')
        print(request.data)
        serializer = self.serialize_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.token = serializer.validated_data['token']
        print(self.token)
        data = decrypt_token(self.token)

        # print(data["payload"]["phone"])
        if not data["status"]:
            return Response("Access denied 100-400", status=status.HTTP_400_BAD_REQUEST)
        else:
            self.payload = data["payload"]

            print(self.payload)
        try:
            obj_otp = OtpCode.objects.get(phone_number=self.payload["phone"])
            # Check for max OTP attempts
            if int(obj_otp.max_otp_try) == 0 and obj_otp.otp_max_out and timezone.now() < obj_otp.otp_max_out:
                return Response(
                    "Max OTP try reached, try after an hour",
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # Generate OTP and update user record
            otp = random.randint(1000, 9999)
            otp_expiry = timezone.now() + datetime.timedelta(minutes=60)
            max_otp_try = int(obj_otp.max_otp_try) - 1
            obj_otp.otp = otp
            obj_otp.otp_expiry = otp_expiry
            obj_otp.max_otp_try = max_otp_try
            if max_otp_try == 0:
                otp_max_out = timezone.now() + datetime.timedelta(hours=1)
            elif max_otp_try == -1:
                obj_otp.max_otp_try = 5
            else:
                obj_otp.otp_max_out = None
                obj_otp.max_otp_try = max_otp_try
                obj_otp.save()
                print(obj_otp.otp, 'OTP', obj_otp.phone_number)
                send_otp(obj_otp.phone_number, otp)
                payload = {
                    'phone': self.payload["phone"],
                    'otp': otp,
                    'exp': datetime.datetime.now() + datetime.timedelta(minutes=60)
                }
                print(payload)
                token = create_token(payload)
                return Response({'token': token}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            obj_otp_ = OtpCode.objects.create(phone_number=self.payload["phone"])
            otp = random.randint(1000, 9999)
            otp_expiry = timezone.now() + datetime.timedelta(minutes=60)
            max_otp_try = int(obj_otp_.max_otp_try) - 1
            obj_otp_.otp = otp
            obj_otp_.otp_expiry = otp_expiry
            obj_otp_.max_otp_try = max_otp_try
            if max_otp_try == 0:
                otp_max_out = timezone.now() + datetime.timedelta(hours=1)
            elif max_otp_try == -1:
                obj_otp_.max_otp_try = 3
            else:
                obj_otp_.otp_max_out = None
                obj_otp_.max_otp_try = max_otp_try
                obj_otp_.is_passenger = True
                obj_otp_.save()
                send_otp(obj_otp_.phone_number, otp)
                payload = {
                    'phone': self.payload["phone"],
                    'otp': otp,
                    'exp': datetime.datetime.now() + datetime.timedelta(minutes=60)
                }
                token = create_token(payload)
                return Response({'token': token}, status=status.HTTP_200_OK)
        else:
            return Response("Phone number is incorrect", status=status.HTTP_401_UNAUTHORIZED)


class ProfileView(APIView):
    permission_classes = [IsOwnerReadOnly]
    serialize_user_class = UserSerializer
    serialize_profile_class = ProfileSerializer
    obj_province = None
    obj_cities = None
    user = None

    def setup(self, request, *args, **kwargs):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            valid_data = TokenBackend(algorithm='HS256').decode(token, verify=False)
            id = valid_data['user_id']
            self.user = get_user_model().objects.get(pk=id)
            request.user = self.user
        except ValidationError as v:
            print("validation error", v)

        self.obj_province = Province.objects.all()
        self.obj_cities = Cities.objects.all()
        self.ser_province = ProvinceSerializer(instance=self.obj_province, many=True)
        self.ser_cities = CitiesSerializer(instance=self.obj_cities, many=True)
        self.check_object_permissions(request, request.user)
        self.user_instance = request.user
        user_serialize = self.serialize_user_class(instance=self.user_instance)
        self.serialize_user_instance = user_serialize.data
        self.profile_instances = self.user_instance.Profile.all()
        return super().setup(request, *args, **kwargs)

    def get(self, request):
        if self.profile_instances:
            serializer = self.serialize_profile_class(instance=self.profile_instances, many=True)

            if serializer.data:
                return Response(
                    data={'user': self.serialize_user_instance, 'addresses': serializer.data,
                          'province': self.ser_province.data,
                          'cities': self.ser_cities.data},
                    status=status.HTTP_200_OK)
        else:
            return Response(
                data={'user': self.serialize_user_instance, 'addresses': {},
                      'province': self.ser_province.data,
                      'cities': self.ser_cities.data},
                status=status.HTTP_200_OK)

    def post(self, request):
        self.check_object_permissions(request, self.user)
        data = request.data
        data['user'] = f'{request.user.id}'
        ser_data = self.serialize_profile_class(data=data)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        print('*' * 100)
        print(request.data.get('id'))
        profile_id = request.data.get('id')
        query_get_profile = Profile.objects.get(pk=profile_id)
        print(query_get_profile)
        if self.user == query_get_profile.user:
            self.check_object_permissions(request, self.user)
            data = request.data
            ser_data = self.serialize_profile_class(instance=query_get_profile, data=data, partial=True)
            if ser_data.is_valid():
                print("-" * 100)
                ser_data.save()
                return Response(ser_data.data, status=status.HTTP_200_OK)
            return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": {"Access denied"}}, status=status.HTTP_403_FORBIDDEN)

    def delete(self,request):
        profile_id = request.data.get('id')
        query_get_profile = Profile.objects.get(pk=profile_id)
        if self.user == query_get_profile.user:
            self.check_object_permissions(request, self.user)
            query_get_profile.delete()
            return Response({'message':{"delete success"}},status=status.HTTP_200_OK)
        else:
            return Response({"error": {"Access denied"}}, status=status.HTTP_403_FORBIDDEN)

class ReadJson(View):
    def get(self, request):
        return render(request, 'form.html')

    def post(self, request):
        if request.FILES['json_file']:
            json_file = request.FILES['json_file']
            data = json.load(json_file)
            # print(data)
            for item in data:
                province = Cities(
                    provinceName=item['provinceName'],
                    cityName=item['cityName'],
                    cityId=item['cityId'],
                    provinceId=item['provinceId'],
                )
                province.save()
            return render(request, 'success.html')
        return render(request, 'form.html')


# print(request.META['HTTP_AUTHORIZATION'])
# print(request.headers.get('Authorization'))
'''
        for send from post man
           # # remember old state
        # _mutable = data._mutable
        # 
        # # set to mutable
        # data._mutable = True

        # сhange the values you want

          data['user'] = request.user.id

        # set mutable flag back
        # data._mutable = _mutable
        '''
