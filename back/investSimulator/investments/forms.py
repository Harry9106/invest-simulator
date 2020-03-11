from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Investment


class CustomInvestmentCreationForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        model = Investment
        fields = ('asset', 'amount')


class CustomInvestmentChangeForm(UserChangeForm):

    class Meta:
        model = Investment
        fields = UserChangeForm.Meta.fields
