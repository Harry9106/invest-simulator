from django import forms
from .models import Alarm


class CustomAlarmCreationForm(forms.ModelForm):

    class Meta(forms.ModelForm):
        model = Alarm
        fields = ('asset', 'alarm_type', 'threshold', 'status', 'user')


class CustomAlarmChangeForm(forms.ModelForm):

    class Meta:
        model = Alarm
        fields = ('asset', 'alarm_type', 'threshold', 'status', 'user')
