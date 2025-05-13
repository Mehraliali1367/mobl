from django.urls import path
from . import views

app_name = 'orders'

urlpatterns = [
    path('order_list/',views.ListOrder.as_view(),name='order_list'),
    path('tran_list/',views.ListTransaction.as_view(),name='tran_list'),
]