from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_products, name='products'),
    path('products/<int:pk>/', views.get_product, name='product'),
    path('categories/', views.get_categories, name='category'),
    path('cart/', views.get_cart, name='cart'),
    path('cart/add/', views.add_to_cart, name='add_cart'),
    path('cart/remove/', views.remove_to_cart, name='remove_cart'),
    path('cart/update/', views.update_cart_quantity, name='remove_cart'),
]