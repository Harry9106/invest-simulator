from django.contrib import admin

from .models import Alarm
from .forms import CustomAlarmChangeForm, CustomAlarmCreationForm


"""Modulo administrador de las alarmas"""


class CustomAlarmAdmin(admin.ModelAdmin):
    """Clase personalizada para manejar alarmas desde el admin"""

    add_form = CustomAlarmCreationForm
    form = CustomAlarmChangeForm
    model = Alarm
    list_display = ['asset', 'alarm_type', 'threshold', 'status', 'user']


admin.site.register(Alarm)
