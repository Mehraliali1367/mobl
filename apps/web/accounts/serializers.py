from rest_framework import serializers
from .models import User, Profile, Province, Cities


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ('phone_number', 'full_name', 'password', 'password2')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_phone_number(self, value):
        if value == "0912":
            raise serializers.ValidationError("نباید از 0912 استفاده کنید")
        return value

    def validate(self, attrs):
        if not attrs["password"] == attrs["password2"]:
            raise serializers.ValidationError("password must match")
        return attrs


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'full_name', 'email', 'phone_number',)
        extra_kwargs = {
            'phone_number': {'read_only': True}
        }


class CheckOTPSerializer(serializers.Serializer):
    otp = serializers.IntegerField()
    token = serializers.CharField(max_length=500)


class ResendOtpSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=500)


class PhoneSerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=11)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id','user','title', 'postal_code', 'province', 'city', 'address', 'tel')


class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = '__all__'


class CitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cities
        fields = '__all__'
