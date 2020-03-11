from django.urls import path
from .views import user_wallet, transaction, public

urlpatterns = [
    path('wallet/', user_wallet),
    path('transaction/', transaction),
    path('public/', public)
]
