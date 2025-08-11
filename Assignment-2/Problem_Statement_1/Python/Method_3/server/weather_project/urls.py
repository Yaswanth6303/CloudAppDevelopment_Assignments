from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('weather', views.weather_by_city, name='weather_by_city'),
    path('weather/coordinates', views.weather_by_coordinates, name='weather_by_coordinates'),
]
