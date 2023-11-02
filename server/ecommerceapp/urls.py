from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ecommerceapp import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r"carousel", views.FeaturePostViewSet, basename="carousel")

router.register(r"customer", views.CustomerViewSet, basename="customer")
router.register(r"address", views.AddressViewSet, basename="address")

router.register(r"product", views.ProductViewSet, basename="product")

router.register(r"productreview", views.ReviewViewSet, basename="productreview")

router.register(r"seller", views.SellerViewSet, basename="seller")
router.register(r"sellerproduct", views.SellerItemViewSet, basename="sellerproduct")

router.register(r"brand", views.BrandViewSet, basename="brand")
router.register(r"brandproduct", views.BrandItemViewSet, basename="brandproduct")

router.register(r"category", views.ProductCategoryViewSet, basename="category")
router.register(
    r"categoryproduct", views.ProductCategoryItemViewSet, basename="categoryproduct"
)
router.register(r"subcategory", views.ProductSubCategoryViewSet, basename="subcategory")

router.register(r"producttype", views.ProductTypeViewSet, basename="producttype")

router.register(r"order", views.OrderViewSet, basename="order")
router.register(r"orderproduct", views.OrderItemViewSet, basename="orderitem")


# # The API URLs are now determined automatically by the router.
# urlpatterns = [
#     path('', include(router.urls)),
# ]

urlpatterns = router.urls
