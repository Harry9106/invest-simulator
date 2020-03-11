from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser


class CustomUserCreationForm(forms.ModelForm):

    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username', 'email')


class CustomUserChangeForm(forms.ModelForm):

    class Meta:
        model = CustomUser
        fields = UserChangeForm.Meta.fields
