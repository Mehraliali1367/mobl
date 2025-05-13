from django import forms
from .models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import ReadOnlyPasswordHashField


class UserRegisterForm(forms.Form):
    email = forms.EmailField()
    phone_number = forms.CharField(max_length=11, label='phone')
    full_name = forms.CharField(max_length=255, label='full_name')
    password = forms.CharField(widget=forms.PasswordInput)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for visible in self.visible_fields():
            visible.field.widget.attrs["class"] = "form-control"

    def clean_phone_number(self):
        cd = self.cleaned_data
        user = User.objects.filter(phone_number=cd["phone_number"]).exists()
        if user:
            raise ValidationError("phone_number already ...")
        return cd["phone_number"]

    def clean_email(self):
        cd = self.cleaned_data
        user = User.objects.filter(email=cd["email"]).exists()
        if user:
            raise ValidationError("ایمیل شما تکراری است")
        return cd["email"]


class UserVerifyCodeForm(forms.Form):
    verify = forms.IntegerField()


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='confirm password', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('phone_number', 'email','full_name')

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password2"])
        if commit:
            user.save()

        return user


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(
        help_text="you can change password <a href=\"../password/ \"> this form</a>")

    class Meta:
        model = User
        fields = ('phone_number', 'email','full_name', 'password', 'last_login')


class UserLoginForm(forms.Form):
    phone = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput())

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs["class"] = "form-control"
