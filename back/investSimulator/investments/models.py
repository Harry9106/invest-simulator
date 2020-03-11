from rest_framework.exceptions import ValidationError
from users.models import CustomUser
from asset.models import Asset
from django.db import models
from django.core.validators import MinValueValidator, DecimalValidator, \
    ProhibitNullCharactersValidator
from decimal import Decimal


BUY = 'BUY'
SELL = 'SELL'

INVESTMENT_TYPE = (
    (BUY, 'buy'),
    (SELL, 'sell'),
)


def validate_not_zero(value):
    """
    Validador que impide que un valor sea 0.
    """
    if value == 0:
        raise ValidationError("Value can not be zero.")


class Investment(models.Model):
    """
    Clase que modela una inversion en la bolsa de valores.

    asset: activo al cual esta vinculada la inversion. (Int)

    old_buy: precio de compra del activo al momento de la compra (Decimal)

    old_sell: precio de venta del activo al momento de la compra (Decimal)

    amount: cantidad de activo. (Decimal)

    purchased_on: fecha en la que se registro la operacion. (Date)

    type: tipo de inversion. Puede ser compra o venta. (String)

    user: usuario al que esta vinculada la inversion. (Int)

    visible: determina si una inversion es publica(True) o privada(False)
    """

    asset = models.ForeignKey(Asset, related_name='investments', null=False,
                              blank=False, on_delete=models.CASCADE)
    old_buy = models.DecimalField(max_digits=10, decimal_places=2,
                                  null=False, blank=False,
                                  validators=[DecimalValidator(10, 2),
                                              MinValueValidator(
                                                  Decimal('0.01'))])
    old_sell = models.DecimalField(max_digits=10, decimal_places=2,
                                   null=False, blank=False, validators=[
                                        DecimalValidator(10, 2),
                                        MinValueValidator(Decimal('0.01'))])
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=False,
                                 blank=False,
                                 validators=[DecimalValidator(10, 2),
                                             MinValueValidator(
                                                 Decimal('0.01'))])
    purchased_on = models.DateTimeField(auto_now_add=True, blank=False,
                                        null=False)
    type = models.CharField(max_length=8, choices=INVESTMENT_TYPE,
                            blank=False, null=False,
                            validators=[ProhibitNullCharactersValidator])
    user = models.ForeignKey(CustomUser, related_name='investments',
                             blank=False, null=False, on_delete=models.CASCADE)
    visible = models.BooleanField(blank=False, null=False)

    def __str__(self):
        return self.asset.name
