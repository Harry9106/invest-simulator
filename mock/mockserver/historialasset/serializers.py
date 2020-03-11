from rest_framework import serializers
from . import models


class AssetHistorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AssetHistorial
        fields = ('sell', 'buy', 'date')
