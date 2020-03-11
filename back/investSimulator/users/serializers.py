from django.contrib.auth import get_user_model
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from . import models

try:
    from allauth.account import app_settings as allauth_settings
    from allauth.utils import (email_address_exists,
                               get_username_max_length)
    from allauth.account.adapter import get_adapter
    from allauth.account.utils import setup_user_email
    from allauth.socialaccount.helpers import complete_social_login
    from allauth.socialaccount.models import SocialAccount
    from allauth.socialaccount.providers.base import AuthProcess
except ImportError:
    raise ImportError("allauth needs to be added to INSTALLED_APPS.")

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('id', 'username', 'avatar', 'cash', 'rank')


class UserProfileSerializer(serializers.ModelSerializer):
    def update(self, user, validated_data):
        user.email = validated_data.get('email', user.email)
        user.first_name = validated_data.get('first_name', user.first_name)
        user.last_name = validated_data.get('last_name', user.last_name)
        user.avatar = validated_data.get('avatar', user.avatar)
        user.save()

        return user

    class Meta:
        model = models.CustomUser
        fields = ('email', 'first_name', 'last_name', 'avatar',)


class UserDetailsSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """

    class Meta:
        model = UserModel
        fields = ('pk', 'username', 'avatar', 'cash', 'rank')


class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model.
    """
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Token
        fields = ('key', 'user',)


class MyRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    avatar = serializers.CharField(required=True, write_only=True)
    username = serializers.CharField(
        max_length=get_username_max_length(),
        min_length=allauth_settings.USERNAME_MIN_LENGTH,
        required=allauth_settings.USERNAME_REQUIRED
    )

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'username': self.validated_data.get('username', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'avatar': self.validated_data.get('avatar', ''),
        }

    def custom_signup(self, request, user):
        user.username = self.validated_data.get('username', '')
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.avatar = self.validated_data.get('avatar', '')
        user.save(update_fields=['first_name', 'last_name', 'avatar'])


class RankingSerializer(serializers.Serializer):
    """La serializacion de ranking"""
    username = serializers.CharField(max_length=None, min_length=None,
                                     allow_blank=False, trim_whitespace=True)
    wallet_quote = serializers.DecimalField(max_digits=10, decimal_places=2)
