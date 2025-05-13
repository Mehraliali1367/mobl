from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager
from django.core.validators import RegexValidator


#
# Now when you make user_a follow user_b, user_b's followers will include user_a.
#
# user_a.following.add(user_b)
# assert user_b.followers.filter(id=user_a.id).exists()

class User(AbstractBaseUser):
    phone_number = models.CharField(max_length=11, unique=True, validators=[RegexValidator(
        regex=r"^\d{11}", message="Phone number must be 11 digits only.")])
    email = models.EmailField(max_length=100, unique=True, blank=True, null=True)
    full_name = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    objects = UserManager()

    USERNAME_FIELD = 'phone_number'

    # REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return f'{self.phone_number} {self.full_name}'

    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, pbj=None):
        return True

    def has_module_perms(self, app_label):
        return True


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Profile')
    province = models.ForeignKey('Province', on_delete=models.RESTRICT, related_name='Province')
    city = models.ForeignKey('Cities', on_delete=models.RESTRICT, related_name='City')
    title = models.CharField(max_length=100, default='home')
    postal_code = models.CharField(max_length=10)
    address = models.CharField(max_length=500)
    tel = models.CharField(max_length=11)
    created = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated = models.DateTimeField(auto_now=True, null=True, blank=True)
    deleted = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return f'address: {self.user.full_name} tel:{self.user.phone_number}'


class Province(models.Model):
    provinceName = models.CharField(max_length=100)
    provinceId = models.PositiveSmallIntegerField()

    def __str__(self):
        return f'{self.provinceName}'


class Cities(models.Model):
    provinceName = models.CharField(max_length=100)
    provinceId = models.PositiveSmallIntegerField()
    cityName = models.CharField(max_length=100)
    cityId = models.PositiveSmallIntegerField()

    def __str__(self):
        return f'{self.provinceName} - {self.cityName} '


class OtpCode(models.Model):
    phone_number = models.CharField(max_length=11, unique=True, validators=[RegexValidator(
        regex=r"^\d{11}", message="Phone number must be 11 digits only.")])
    otp = models.CharField(max_length=6, null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    otp_expiry = models.DateTimeField(blank=True, null=True)
    max_otp_try = models.CharField(max_length=2, default=5)
    otp_max_out = models.DateTimeField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.phone_number} - {self.otp} - {self.created}'
