from rest_framework import serializers
from . import models


class AlarmSerializer(serializers.ModelSerializer):
    """
    Serializador de alarmas.
    """
    class Meta:
        model = models.Alarm
        fields = ('asset', 'alarm_price', 'alarm_type', 'threshold', 'status',
                  'user')


class AlarmDeleteSerializer(serializers.ModelSerializer):
    """
    Serializador para eliminar una alarma.
    """
    class Meta:
        model = models.Alarm
        fields = ('id', 'asset', 'alarm_price', 'alarm_type', 'threshold',
                  'status', 'user')
