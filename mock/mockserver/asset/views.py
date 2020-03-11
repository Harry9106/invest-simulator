from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models
from .serializers import AssetListSerializer, AssetPriceSerializer


@api_view(['GET'])
def all_asset(request):
    if request.method == 'GET':
        asset = models.Asset.objects.all().values('name', 'type')\
            .order_by('name')
        serializer = AssetListSerializer(asset, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def price_asset(request, name):
    if request.method == 'GET':
        asset = models.Asset.objects.all().values('sell', 'buy')\
            .filter(name__iexact=name)
        serializer = AssetPriceSerializer(asset, many=True)
        return Response(serializer.data)
