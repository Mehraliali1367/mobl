from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserCreationForm, UserChangeForm
from .models import User, OtpCode, Profile, Province, Cities
from django.contrib.auth.models import Group


@admin.register(OtpCode)
class OtpCodeAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'otp', 'otp_expiry', 'max_otp_try', 'otp_max_out', 'created')


@admin.register(Province)
class ProvinceAdmin(admin.ModelAdmin):
    list_display = ('id','provinceName', 'provinceId')


@admin.register(Cities)
class CitiesAdmin(admin.ModelAdmin):
    list_display = ('id','provinceName','provinceId','cityName','cityId')

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'provinceName', 'cityName', 'tel')

    def provinceName(self, obj):
        return obj.province.provinceName
    def cityName(self,obj):
        return obj.city.cityName

class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('id', 'full_name', 'phone_number', 'last_login', 'created', 'is_admin')
    list_filter = ('is_admin',)

    fieldsets = (
        (None, {'fields': ('phone_number', 'email', 'full_name', 'password')}),
        ('permissions',
         {'fields': ('is_active', 'is_admin', 'created', 'updated', 'last_login')}),

    )

    add_fieldsets = (
        (None, {'fields': ('phone_number', 'email', 'full_name', 'password1', 'password2')}),
    )

    search_fields = ('email', 'full_name',)
    ordering = ('full_name',)
    filter_horizontal = ()
    readonly_fields = ('last_login', 'created', 'updated')


admin.site.unregister(Group)
admin.site.register(User, UserAdmin)
