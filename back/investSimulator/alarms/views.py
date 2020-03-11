from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import AlarmSerializer, AlarmDeleteSerializer
from .models import Alarm


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_alarm(request):
    """
    Este metodo recibe datos de POST, checkea su validez, y crea una alarma.
    """
    if request.method == 'POST':
        serializer = AlarmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def alarms_list(request):
    """
    Este metodo devuelve la lista de alarmas de un usuario autenticado en caso
    de que la peticion sea de tipo GET.
    Si la peticion es de tipo POST, se elimina una alarma del usuario
    autenticado señalada por su clave primaria.
    """
    if request.method == 'GET':
        alarms = request.user.alarms.all().values('id', 'asset__name',
                                                  'alarm_price', 'alarm_type',
                                                  'threshold', 'status',
                                                  'user')
        serializer = list(alarms)
        return Response(serializer, status=status.HTTP_200_OK)
    if request.method == 'POST':
        try:
            alarm = request.user.alarms.get(id=request.data["pk"])
            alarm.delete()
            return Response(status=status.HTTP_200_OK)
        except Alarm.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
