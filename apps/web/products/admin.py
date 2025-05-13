from unicodedata import category

from django.contrib import admin
from .models import Category, Product, ProductImage, Seller, ProductTypeName


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'name_persian','description','order', 'is_category','created')
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Seller)
class SellerAdmin(admin.ModelAdmin):
    list_display = ('name','tel', 'phone', 'is_active','created')
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category_name','seller_name','quantity', 'price', 'discount_percent','discount')
    prepopulated_fields = {"slug": ("name",)}
    def category_name(self, obj):
        return obj.category.name

    def seller_name(self, obj):
        return ", ".join([seller.name for seller in obj.seller.all()])

    category_name.short_description = 'Category Name'
    seller_name.short_description = 'Seller Name'


admin.site.register(ProductImage)
admin.site.register(ProductTypeName)
