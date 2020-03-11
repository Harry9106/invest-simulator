from rest_framework import serializers
from . import models


class AssetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Asset
        fields = ('name', 'type',)


class AssetPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Asset
        fields = ('sell', 'buy',)
