from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Sum
from .serializers import InvestmentSerializer
from .models import Investment
from asset.utils import updateAssetsPrices


@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def user_wallet(request):
    """
    Metodo que devuelve las inversiones del usuario en caso de ser un GET.
    En caso de ser un POST, se validan los datos, se crea la inversion y se
    modifica el dinero liquido del usuario.
    """

    if request.method == 'GET':
        updateAssetsPrices()
        investments = request.user.investments.all()\
            .values('asset', 'asset__name', 'asset__type', 'asset__buy',
                    'asset__sell')\
            .order_by()\
            .annotate(amountSum=Sum('amount'))\
            .filter(amountSum__gte=0.01)
        serializer = list(investments)
        return Response(serializer, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        investment = InvestmentSerializer(data=request.data)
        if investment.is_valid():
            if investment.validated_data["type"] == "SELL":
                investment.validated_data["amount"] = \
                    investment.validated_data["amount"] * (-1)
                total = investment.validated_data["amount"] * \
                    investment.validated_data["old_buy"]
            else:
                total = investment.validated_data["amount"] * \
                        investment.validated_data["old_sell"]
            request.user.cash = request.user.cash - total
            request.user.save()
            investment.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(investment.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def transaction(request):
    """
    Metodo que devuelve todas las transacciones de un usuario si es GET.
    Si es POST, cambia la visibilidad de una invesrion especifica.
    """
    if request.method == 'GET':
        investments = request.user.investments.all() \
            .values('id', 'asset', 'asset__name', 'type', 'old_buy',
                    'old_sell', 'purchased_on', 'amount', 'visible') \
            .order_by('-purchased_on')
        serializer = list(investments)
        return Response(serializer, status=status.HTTP_200_OK)
    if request.method == 'POST':
        investment = request.user.investments.get(id=request.data["pk"])
        investment.visible = not investment.visible
        investment.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def public(request):
    """
    Metodo que devuelve una lista con todas las inversiones publicas de los
    usuarios.
    """
    if request.method == 'GET':
        investments = Investment.objects.all() \
            .values('asset__name', 'asset__sell', 'type', 'old_sell',
                    'purchased_on', 'amount', 'user__username', 'user__rank')\
            .filter(visible=True, type="BUY")\
            .exclude(user=request.user.id)\
            .order_by('-purchased_on')
        serializer = list(investments)
        return Response(serializer, status=status.HTTP_200_OK)
