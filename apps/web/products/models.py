from django.db import models
from ckeditor.fields import RichTextField
from utils import get_file_path


class Category(models.Model):
    category = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='self_category')
    name = models.CharField(max_length=255, unique=True)
    name_persian = models.CharField(max_length=255, null=True, blank=True)
    order = models.SmallIntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_category = models.BooleanField(default=False)
    slug = models.SlugField(default="", allow_unicode=True)
    description = models.CharField(max_length=255, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} - {self.description}'

    class Meta:
        ordering = ('-is_category', 'order')
        verbose_name_plural = "Categories"


class Seller(models.Model):
    name = models.CharField(max_length=255)
    name_shop = models.CharField(max_length=255)
    slug = models.SlugField(default="", allow_unicode=True)
    is_active = models.BooleanField(default=True)
    city = models.CharField(max_length=100, default='قم')
    address = models.CharField(max_length=255)
    tel = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} - {self.name_shop}'


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    seller = models.ManyToManyField(Seller, related_name='products')
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    primary_image = models.ImageField(upload_to=get_file_path)
    description_brif = models.TextField(default="")
    description_full = RichTextField(default="")
    is_active = models.BooleanField(default=True)
    price = models.FloatField()
    is_sale = models.BooleanField(default=False)
    discount_percent = models.PositiveSmallIntegerField(default=0)
    quantity = models.IntegerField()
    date_on_sale_from = models.DateTimeField(null=True, blank=True)
    date_on_sale_to = models.DateTimeField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(auto_now=True)

    @property
    def discount(self):
        if self.discount_percent > 0:
            discounted_price = self.price - self.price * self.discount_percent / 100
            return discounted_price

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('-created',)
        verbose_name_plural = "Products"


class ProductTypeName(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(default="", allow_unicode=True)
    description = models.TextField(default="")
    status = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id}-{self.name}'

    class Meta:
        ordering = ('name',)
        verbose_name_plural = "ProductsTypeNames"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_images")
    product_type_name = models.ForeignKey(ProductTypeName, on_delete=models.CASCADE, related_name="product_type_name")
    slug = models.SlugField(default="", allow_unicode=True)
    img_l = models.ImageField(null=True, blank=True, upload_to='', verbose_name='low_quality')
    img_m = models.ImageField(null=True, blank=True, upload_to='', verbose_name='medium_quality')
    img_h = models.ImageField(null=True, blank=True, upload_to='', verbose_name='high_quality')
    status = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "ProductImages"

    def __str__(self):
        return f'{self.product.name}'

