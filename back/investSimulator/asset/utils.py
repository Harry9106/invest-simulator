import requests
from .serializers import AssetSerializer
from .models import Asset
from decimal import Decimal
from alarms.utils import check_alarms
from django.conf import settings


def updateAssetsPrices():
    """
    Este metodo actualiza los precios de los activos de la base de datos con
    informacion de una aplicacion externa.
    Si hay un activo que no existe ya en la base de datos, se lo agrega.
    """
    response = requests.get(settings.URL)
    data = response.json()
    for x in data:
        asset_name = x["name"]
        r = requests.get(settings.URL2 + asset_name)
        prices = r.json()
        prices = prices[0]
        if Asset.objects.filter(name=asset_name).exists():
            asset = Asset.objects.get(name=asset_name)
            asset.buy = Decimal(prices["buy"])
            asset.sell = Decimal(prices["sell"])
            asset.save()
        else:
            asset = {**x, **prices}
            serializer = AssetSerializer(data=asset)
            if serializer.is_valid():
                serializer.save()
    check_alarms()
