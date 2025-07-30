from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("data_admin/", admin.site.urls),
    path("api/accounts/", include("accounts.urls", namespace="accounts")),
    path("api/products/", include("products.urls", namespace="products")),
    path("api/contactus/", include("contactus.urls", namespace="contactus")),
    path("api/orders/", include("orders.urls", namespace="orders")),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
