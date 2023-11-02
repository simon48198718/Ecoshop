from django.contrib import admin
from ecommerceapp import models


# Register your models here.
class ProductCategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


class SubCategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


admin.site.register(models.Seller)
admin.site.register(models.Product)
admin.site.register(models.Address)
admin.site.register(models.Customer)
admin.site.register(models.Order)
admin.site.register(models.OrderItem)
admin.site.register(models.FeaturePost)
admin.site.register(models.Brand)
admin.site.register(models.ProductCategory, ProductCategoryAdmin)
admin.site.register(models.SubCategory, SubCategoryAdmin)
admin.site.register(models.Review)
admin.site.register(models.ProductType)
