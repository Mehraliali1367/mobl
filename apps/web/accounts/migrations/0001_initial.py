# Generated by Django 5.1.4 on 2025-04-30 08:37

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('phone_number', models.CharField(max_length=11, unique=True, validators=[django.core.validators.RegexValidator(message='Phone number must be 11 digits only.', regex='^\\d{11}')])),
                ('email', models.EmailField(blank=True, max_length=100, null=True, unique=True)),
                ('full_name', models.CharField(blank=True, max_length=100, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Cities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('provinceName', models.CharField(max_length=100)),
                ('provinceId', models.PositiveSmallIntegerField()),
                ('cityName', models.CharField(max_length=100)),
                ('cityId', models.PositiveSmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='OtpCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(max_length=11, unique=True, validators=[django.core.validators.RegexValidator(message='Phone number must be 11 digits only.', regex='^\\d{11}')])),
                ('otp', models.CharField(blank=True, max_length=6, null=True)),
                ('dob', models.DateField(blank=True, null=True)),
                ('otp_expiry', models.DateTimeField(blank=True, null=True)),
                ('max_otp_try', models.CharField(default=5, max_length=2)),
                ('otp_max_out', models.DateTimeField(blank=True, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('deleted', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Province',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('provinceName', models.CharField(max_length=100)),
                ('provinceId', models.PositiveSmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='home', max_length=100)),
                ('postal_code', models.CharField(max_length=10)),
                ('address', models.CharField(max_length=500)),
                ('tel', models.CharField(max_length=11)),
                ('created', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated', models.DateTimeField(auto_now=True, null=True)),
                ('deleted', models.DateTimeField(auto_now=True, null=True)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='City', to='accounts.cities')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Profile', to=settings.AUTH_USER_MODEL)),
                ('province', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='Province', to='accounts.province')),
            ],
        ),
    ]
