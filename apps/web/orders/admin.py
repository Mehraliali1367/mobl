from django.contrib import admin
from .models import *


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'profile', 'paid', 'discount', 'posting_order', 'coupon')


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'price', 'quantity',)


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('id','code', 'valid_from', 'valid_to', 'discount', 'active', 'quantity')


@admin.register(PostingOrder)
class PostinOrderAdmin(admin.ModelAdmin):
    list_display = ('id','title',)


@admin.register(Transaction)
class TransacionAdmin(admin.ModelAdmin):
    list_display = ('id','order', 'status', 'amount', 'trans_id', 'created',)


@admin.register(StatusTransaction)
class StatusTransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'title',)
