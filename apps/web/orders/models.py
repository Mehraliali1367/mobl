from django.db import models
from django.contrib.auth import get_user_model
from accounts.models import Profile
from products.models import Product
from django.core.validators import MinValueValidator, MaxValueValidator
import jdatetime


class Order(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='orders')
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='orders')
    paid = models.BooleanField(default=False)
    posting_order = models.ForeignKey("PostingOrder", on_delete=models.SET_NULL, related_name='post_order', null=True,
                                      blank=True)
    discount = models.IntegerField(blank=True, null=True, default=None)
    coupon = models.CharField(max_length=5, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('paid', '-updated')

    def __str__(self):
        return f'{self.user} - {str(self.id)}'

    def get_total_price(self):
        total = sum(item.get_cost() for item in self.Order_item.all())
        if self.discount:
            discount_price = (self.discount / 100) * total
            return int(total - discount_price)
        return total

    def get_create_persian_date(self):
        jdatetime.set_locale(jdatetime.FA_LOCALE)
        return jdatetime.date.fromgregorian(date=self.created).strftime("%d %B %Y")
        # return jdatetime.datetime.now().strftime("%a, %d %b %Y %H:%M:%S")


#

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='Order_item')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.IntegerField()
    quantity = models.IntegerField(default=1)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id)

    def get_cost(self):
        return self.price * self.quantity


class Coupon(models.Model):
    code = models.CharField(max_length=30, unique=True)
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    discount = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(90)])
    active = models.BooleanField(default=False)
    quantity = models.PositiveIntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.code


class PostingOrder(models.Model):
    title = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Transaction(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='transaction', null=True,
                             blank=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='transactions')
    status = models.ForeignKey('StatusTransaction', on_delete=models.CASCADE, related_name='transactions')
    amount = models.PositiveIntegerField(default=0)
    trans_id = models.CharField(max_length=50, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('created',)
        # verbose_name_plural = "ProductsTypeNames"

    def __str__(self):
        return f'{self.order}-{self.status}'

    def get_create_persian_date(self):
        jdatetime.set_locale(jdatetime.FA_LOCALE)
        return jdatetime.date.fromgregorian(date=self.created).strftime("%d %B %Y")


class StatusTransaction(models.Model):
    title = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id}-{self.title}'
