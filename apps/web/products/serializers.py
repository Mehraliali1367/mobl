from rest_framework import serializers
from .models import Category, Product, ProductImage

# addr_server = '37.152.180.252'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'name_persian', 'slug', 'description')


class SubcategorySerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField(source='get_category')

    def get_category(self, obj):
        subcategory = []
        for item in Category.objects.filter(category=obj):
            subcategory.append(CategorySerializer(instance=item).data)
        return subcategory

    def get_products(self, obj):
        pass

    class Meta:
        model = Category
        fields = ('name', 'name_persian', 'slug', 'description', 'category', 'products')


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField(source='get_category')
    # primary_image = serializers.SerializerMethodField(source='get_primary_image')

    def get_category(self, obj):
        return obj.category.name

    # def get_primary_image(self, obj):
    #     return f'http://${addr_server}:8000/media/{obj.primary_image}'

    class Meta:
        model = Product
        fields = (
            'id', 'category', 'name', 'slug', 'primary_image', 'quantity', 'description_brif', 'description_full',
            'is_active', 'price', 'is_sale',
            'discount_percent',
            'discount')


class ProductSerializerAndImages(serializers.ModelSerializer):
    category_name_persian = serializers.SerializerMethodField(source='get_category_name_persian')
    category = serializers.SerializerMethodField(source='get_category')
    # primary_image = serializers.SerializerMethodField(source='get_primary_image')
    images = serializers.SerializerMethodField(source='get_images')

    def get_category_name_persian(self, obj):
        return obj.category.name_persian

    def get_category(self, obj):
        return obj.category.name

    # def get_primary_image(self, obj):
    #     return f'http://${addr_server}:8000/media/{obj.primary_image}'

    def get_images(self, obj):
        images = []
        for item in ProductImage.objects.filter(product=obj):
            images.append(ProductImageSerializer(instance=item).data)
        return images

    class Meta:
        model = Product
        fields = (
            'id', 'quantity', 'category', 'category_name_persian', 'name', 'slug', 'primary_image', 'description_brif',
            'description_full', 'is_active', 'price',
            'is_sale',
            'discount_percent',
            'discount', 'images')


class ProductImageSerializer(serializers.ModelSerializer):
    # img100 = serializers.SerializerMethodField(source='get_img100')
    # img400 = serializers.SerializerMethodField(source='get_img400')
    # img800 = serializers.SerializerMethodField(source='get_img800')

    # def get_img100(self, obj):
    #     return f'http://${addr_server}:8000/media/{obj.img_l}'
    #
    # def get_img400(self, obj):
    #     return f'http://${addr_server}:8000/media/{obj.img_m}'
    #
    # def get_img800(self, obj):
    #     return f'http://${addr_server}:8000/media/{obj.img_h}'

    class Meta:
        model = ProductImage
        fields = ('product_type_name', 'slug', 'img100', 'img400', 'img800')


class ProductsInstanceCategorySerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField(source='get_category')
    # primary_image = serializers.SerializerMethodField(source='get_primary_image')

    def get_category(self, obj):
        return obj.category.name

    # def get_primary_image(self, obj):
    #     return f'http://${addr_server}:8000/media/{obj.primary_image}'

    class Meta:
        model = Product
        fields = (
            'id', 'category', 'name', 'primary_image', 'description_brif', 'description_brif', 'slug', 'is_active',
            'price', 'is_sale',
            'discount_percent', 'discount')


class CategoryInstanceSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField(source='get_products')

    def get_products(self, obj):
        products = []
        for item in Product.objects.filter(category=obj)[:10]:
            products.append(ProductsInstanceCategorySerializer(instance=item).data)
        return products

    class Meta:
        model = Category
        fields = ('name', 'name_persian', 'slug', 'description', 'products')


class CategoryGetProductsSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField(source='get_category')

    def get_category(self, obj):
        subcategory = []
        for item in Category.objects.filter(category=obj):
            subcategory.append(CategoryInstanceSerializer(instance=item).data)
        return subcategory

    class Meta:
        model = Category
        fields = ('name', 'name_persian', 'slug', 'description', 'category',)

# for us relation ManyTOMany
# def get_category(self, obj_product):
#     result= obj_product.category.all()
#     return CategorySerializer(instance=result, many=True).data
