from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Asset
from .serializers import AssetSerializer
from .utils import updateAssetsPrices


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def assets_list(request):
    """
    Este metodo devuelve una lista con todos los activos en la base de datos.
    """
    if request.method == 'GET':
        updateAssetsPrices()
        data = Asset.objects.all()
        serializer = AssetSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
