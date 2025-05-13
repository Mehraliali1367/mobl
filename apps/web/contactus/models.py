from django.db import models

class ContactUs(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    subject = models.CharField(max_length=255)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "ContactUses"
        ordering = ("-created",)

    def __str__(self):
        return f"name{self.name}  email:{self.email}"

class PhoneClient(models.Model):
    phone =models.CharField(max_length=16,unique=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "PhonesClient"
        ordering = ("-created",)

    def __str__(self):
        return f"phone : {self.phone} "