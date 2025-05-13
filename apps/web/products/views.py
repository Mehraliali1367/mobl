from unicodedata import category

from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .serializers import CategorySerializer, SubcategorySerializer, ProductSerializer, ProductImageSerializer, \
    CategoryGetProductsSerializer, ProductSerializerAndImages
from .models import Category, Product, ProductImage
from django.db.models import Q
from django.shortcuts import get_object_or_404

from rest_framework.pagination import PageNumberPagination


class CategoryView(APIView):
    def get(self, request):
        categories = Category.objects.filter(is_category=True)
        ser_data = CategorySerializer(instance=categories, many=True)
        if ser_data.data:
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response(ser_data.errors)


class CategoryGetProducts(APIView):
    def get(self, request):
        # categoires = request.GET.get("subcategories")
        # sort = request.GET.get("sort")
        categories = Category.objects.filter(is_category=True)
        ser_data = CategoryGetProductsSerializer(instance=categories, many=True)
        if ser_data.data:
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response(ser_data.errors)


class SubCategoryView(APIView):
    def get(self, request):
        categories = Category.objects.filter(is_category=True)
        ser_data = SubcategorySerializer(instance=categories, many=True)
        if ser_data.data:
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response(ser_data.errors)


class ProductList(APIView, PageNumberPagination):
    '''
        baraye estefade az in pagination bayad code zir ra dar file settings ezafe kard
    REST_FRAMEWORK = {
        'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
        'PAGE_SIZE': 2,
    }
    '''

    def get(self, request):
        param_categoires = request.GET.get("subcategories")
        param_sort = request.GET.get("sort")
        print('/' * 100)
        # print('pppp:' + param_sort)
        if param_sort == "max":
            sort = '-price'
        elif param_sort == "min":
            sort = 'price'
        elif param_sort == 'discount':
            sort = '-discount_percent'
        else:
            sort = 'price'

        print(sort)
        if param_categoires is None:
            print('%'*100)
            param_categoires = ""

        if len(param_categoires):
            if ',' in param_categoires:
                items = param_categoires.split(',')
                products = Product.objects.filter(category__name__in=items, is_active=True).order_by(sort)
            else:
                products = Product.objects.filter(category__name=param_categoires, is_active=True).order_by(sort)
        else:
            products = Product.objects.filter(is_active=True).order_by(sort)

        results = self.paginate_queryset(products, request, view=self)
        serializer = ProductSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)


class SearchList(APIView, PageNumberPagination):
    def get(self, request):
        param_search = request.GET.get("search")
        param_sort = request.GET.get("sort")
        print('/' * 100)
        print('pppp:' + param_sort)
        if param_sort == "max":
            sort = '-price'
        elif param_sort == "min":
            sort = 'price'
        elif param_sort == 'discount':
            sort = '-discount_percent'
        else:
            sort = 'price'
        if param_search:
            if len(param_search) > 1:
                products = Product.objects.filter(
                    Q(name__contains=param_search) | Q(category__name_persian__icontains=param_search)).order_by(sort)
                print(products)
            else:
                products = {}
        else:
            products = {}
        results = self.paginate_queryset(products, request, view=self)
        serializer = ProductSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)


class DetailProduct(APIView):
    def get(self, request, slug):
        product = get_object_or_404(Product, slug=slug)
        ser_data = ProductSerializerAndImages(instance=product)
        if ser_data.data:
            return Response(ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response(ser_data.errors)
