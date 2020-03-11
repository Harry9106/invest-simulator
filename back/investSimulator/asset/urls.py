from django.urls import include, path
from .views import assets_list

from . import views

urlpatterns = [
    path('', assets_list),
]
