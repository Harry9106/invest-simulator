from .models import Alarm


def check_alarms():
    """
    Esta funcion se encarga de checkear el estado de todas las alarmas
    configuradas en el sistema.
    """
    alarms = Alarm.objects.all()
    for alarm in alarms:
        alarm.check_alarm()
        alarm.save()
