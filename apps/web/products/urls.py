from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    path('category/',views.CategoryView.as_view(),name='category'),
    path('subcategory/',views.SubCategoryView.as_view(),name='subcategory'),
    path('category_products/',views.CategoryGetProducts.as_view(),name='category_get_products'),
    path('ProductList/',views.ProductList.as_view(),name='ProductList'),
    path('SearchList/',views.SearchList.as_view(),name='SearchList'),
    path('DetailProduct/<slug:slug>/',views.DetailProduct.as_view(),name='DetailProduct'),
]