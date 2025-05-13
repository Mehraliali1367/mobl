from django.contrib.auth.models import BaseUserManager
import random

class UserManager(BaseUserManager):
    def create_user(self, phone_number, password=random.randint(100000, 999999)):
        user = self.model(phone_number=phone_number)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, phone_number, password):
        user = self.create_user(phone_number=phone_number, password=password)
        user.is_admin = True
        user.save(using=self.db)
        return user
