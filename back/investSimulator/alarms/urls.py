from django.urls import path
from .views import add_alarm, alarms_list

urlpatterns = [
    path('alarm/', add_alarm),
    path('list/', alarms_list),
]
