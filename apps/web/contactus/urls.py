from django.urls import path
from . import views

app_name = 'contactus'

urlpatterns=[
    path('createmessage/',views.ContactUsCreateView.as_view(),name="createmessage"),
    path('phoneclient/',views.PhoneClientCreateView.as_view(),name="phoneclient"),
]