from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('getassethistory/<str:name>/<str:startdate>/<str:enddate>',
         views.historial_asset),
]

urlpatterns = format_suffix_patterns(urlpatterns)
