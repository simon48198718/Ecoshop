from rest_framework import serializers
from ecommerceapp import models
from authentication.serializers import UserSerializer

# Address serializer


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Address
        fields = "__all__"


# Customer serializer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = "__all__"


# Brand Serializer


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Brand
        fields = "__all__"


# Seller Serializer


class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Seller
        fields = "__all__"


# Product Category Serializer


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = "__all__"


# Product Sub Category Serializer


class ProductSubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SubCategory
        fields = "__all__"


# Product Sub Category Serializer


class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductType
        fields = "__all__"


# Product Serializer


class ProductSerializer(serializers.ModelSerializer):
    seller = SellerSerializer(read_only=True, source="Seller.pk")
    brand = BrandSerializer(read_only=True, source="Brand.pk")
    category = ProductCategorySerializer(read_only=True, source="Brand.pk")
    type = ProductTypeSerializer(read_only=True, source="ProductType.pk")

    class Meta:
        model = models.Product
        fields = "__all__"


# Review Serializer


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Review
        fields = "__all__"


# Item that is search by Seller, Brand, Category Serializers


class SellerItemSerializer(serializers.ModelSerializer):
    seller_products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = models.Seller
        fields = "__all__"


class BrandItemSerializer(serializers.ModelSerializer):
    brand_products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = models.Brand
        fields = "__all__"


class ProductCategoryItemSerializer(serializers.ModelSerializer):
    category_products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = models.ProductCategory
        fields = "__all__"


# Order & OrderItem Serializers


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    order = serializers.ReadOnlyField(source="Order.pk")

    class Meta:
        model = models.OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = models.Order
        fields = "__all__"

    def create(self, validated_data):
        order_items_data = validated_data.pop("order_items")
        order = models.Order.objects.create(**validated_data)
        for item_data in order_items_data:
            product_data = item_data.pop("product")
            product = models.Product.objects.get(name=product_data["name"])
            models.OrderItem.objects.create(order=order, product=product, **item_data)
        return order


# class PaymentSerializer(serializers.ModelSerializer):
#     order = OrderSerializer(read_only=True)

#     class Meta:
#         model = Payment
#         fields = ['id', 'order', 'payment_method', 'amount', 'date_created']


class FeaturePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FeaturePost
        fields = "__all__"
