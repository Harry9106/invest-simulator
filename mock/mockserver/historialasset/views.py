from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models
from .serializers import AssetHistorialSerializer


@api_view(['GET'])
def historial_asset(request, name, startdate, enddate):
    if request.method == 'GET':
        asset = models.AssetHistorial.objects.all()\
            .values('sell', 'buy', 'date')\
            .filter(date__range=(startdate, enddate),
                    asset__name__iexact=name)\
            .order_by('date')
        serializer = AssetHistorialSerializer(asset, many=True)
        return Response(serializer.data)
