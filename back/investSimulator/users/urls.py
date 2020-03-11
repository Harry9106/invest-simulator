from django.urls import include, path

from . import views
from .views import CustomRegisterView

urlpatterns = [
    path('profile/', views.current_user_profile),
    path('profile/edit/', views.edit_user_profile),
    path('', include('investments.urls')),
    path('ranking/', views.ranking),
    path('signup/', CustomRegisterView.as_view()),
]
