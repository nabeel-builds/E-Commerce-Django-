from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_products, name='product'),
    path('products/<int:pk>/', views.get_product, name='product'),
    path('categories/', views.get_categories, name='category'),
]