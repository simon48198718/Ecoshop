from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField


class Customer(models.Model):
    user = models.ForeignKey(User, related_name="user", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="customer/image", null=True, blank=True)
    phone = PhoneNumberField(blank=True, null=True)
    dob = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.username


class Address(models.Model):
    address = models.TextField()
    postal_code = models.CharField(max_length=10)
    type = models.CharField(max_length=50, default="Home")
    default = models.BooleanField(default=False)
    customer = models.ForeignKey(
        Customer, related_name="customer_address", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.address


class Seller(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="seller/image", null=True, blank=True)

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to="brand/image", null=True, blank=True)

    def __str__(self):
        return self.name


class ProductCategory(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, null=True)
    image = models.ImageField(upload_to="category/image", null=True, blank=True)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, null=True)
    category = models.ForeignKey(
        ProductCategory, related_name="sub_category", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.name} - {self.category.name}"


class ProductType(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(
        SubCategory, related_name="sub_category_type", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.name} - {self.category.name}"


class Product(models.Model):
    seller = models.ForeignKey(
        Seller, related_name="seller_products", on_delete=models.CASCADE
    )
    brand = models.ForeignKey(
        Brand, related_name="brand_products", on_delete=models.CASCADE
    )
    category = models.ForeignKey(
        SubCategory,
        related_name="category_products",
        on_delete=models.CASCADE,
        null=True,
    )
    type = models.ForeignKey(
        ProductType,
        related_name="products_type",
        on_delete=models.CASCADE,
        null=True,
    )
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to="product/image", null=True, blank=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(
        Product, related_name="product_review", on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer, related_name="customer_review", on_delete=models.CASCADE
    )
    rate = models.DecimalField(max_digits=3, decimal_places=2)
    comment = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review of #{self.product} - {self.rate}"


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"Order #{self.id} - {self.customer}"


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_items"
    )

    def __str__(self):
        return f"{self.product} ({self.quantity} @ {self.price})"


# class Payment(models.Model):
#     order = models.ForeignKey(Order, on_delete=models.CASCADE)
#     amount = models.DecimalField(max_digits=8, decimal_places=2)
#     created_at = models.DateTimeField(auto_now_add=True)

# class ProductSold(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity_sold = models.PositiveIntegerField(default=0)


class FeaturePost(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to="feature/image", null=True, blank=True)

    def __str__(self):
        return self.title
