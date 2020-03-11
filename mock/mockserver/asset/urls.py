from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('getAvailableAssets', views.all_asset),
    path('getassetmarketprice/<str:name>', views.price_asset)
]

urlpatterns = format_suffix_patterns(urlpatterns)
