from rest_framework import viewsets, filters
from ecommerceapp import serializers, models


# Views for Feature Post model
class FeaturePostViewSet(viewsets.ModelViewSet):
    queryset = models.FeaturePost.objects.all()
    serializer_class = serializers.FeaturePostSerializer


# Views for Customer model
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["user__id"]


# Views for Address model
class AddressViewSet(viewsets.ModelViewSet):
    queryset = models.Address.objects.all()
    serializer_class = serializers.AddressSerializer


# Views for Seller model
class SellerViewSet(viewsets.ModelViewSet):
    queryset = models.Seller.objects.all()
    serializer_class = serializers.SellerSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "user__id"]


class SellerItemViewSet(viewsets.ModelViewSet):
    queryset = models.Seller.objects.all()
    serializer_class = serializers.SellerItemSerializer


# Views for Product's Category
class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.ProductCategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["slug"]


class ProductCategoryItemViewSet(viewsets.ModelViewSet):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.ProductCategoryItemSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["slug"]


class ProductSubCategoryViewSet(viewsets.ModelViewSet):
    queryset = models.SubCategory.objects.all()
    serializer_class = serializers.ProductSubCategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["category__slug"]


# Views for Brand model
class BrandViewSet(viewsets.ModelViewSet):
    queryset = models.Brand.objects.all()
    serializer_class = serializers.BrandSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["brand_products__seller__name"]


class BrandItemViewSet(viewsets.ModelViewSet):
    queryset = models.Brand.objects.all()
    serializer_class = serializers.BrandItemSerializer


# Views for Product Type model
class ProductTypeViewSet(viewsets.ModelViewSet):
    queryset = models.ProductType.objects.all()
    serializer_class = serializers.ProductTypeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["products_type__seller__name"]


# Views for Product model
class ProductViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        "name",
        "seller__name",
        "seller__user__username",
        "brand__name",
        "category__category__slug",
    ]


# Views for Review model
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = models.Review.objects.all()
    serializer_class = serializers.ReviewSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["customer__id"]


# Views for Order model
class OrderViewSet(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["customer__id"]
    ordering_fields = ["order_at"]


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = models.OrderItem.objects.all()
    serializer_class = serializers.OrderItemSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["product__name"]  # search by product name or customer name
    ordering_fields = ["quantity"]  # order by product name, quantity or unit price


# class OrderCreate(generics.CreateAPIView):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer

#     def create(self, request, *args, **kwargs):
#         # Deserialize the order data
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         order = serializer.save()

#         # Update the number of items sold for each product in the order
#         for item in order.items.all():
#             item.num_sold += 1
#             item.save()

#         # Serialize the response data
#         response_serializer = self.get_serializer(order)
#         return Response(response_serializer.data, status=status.HTTP_201_CREATED)


# # Views for Payment model

# class PaymentList(generics.ListCreateAPIView):
#     queryset = Payment.objects.all()
#     serializer_class = PaymentSerializer

# class PaymentDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Payment.objects.all()
#     serializer_class = PaymentSerializer
