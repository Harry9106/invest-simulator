from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal


class Asset(models.Model):
    """
    Esta clase modela un activo de la bolsa de inversiones.

    name: nombre del activo. (String)

    type: tipo del activo. Puede ser accion o divisa. (String)

    buy: precio de compra del activo. (Decimal)

    sell: precio de venta del activo. (Decimal)
    """
    SHARE = 'SHARE'
    CURRENCY = 'CURRENCY'

    ASSET_TYPE = (
        (SHARE, 'share'),
        (CURRENCY, 'currency'),
    )

    name = models.CharField(max_length=50, blank=False, null=False)
    type = models.CharField(max_length=8, choices=ASSET_TYPE,
                            blank=False, null=False)
    buy = models.DecimalField(max_digits=10, decimal_places=2,
                              null=True, blank=True, validators=[
                                        MinValueValidator(Decimal('0.01'))])
    sell = models.DecimalField(max_digits=10, decimal_places=2,
                               null=True, blank=True, validators=[
                                        MinValueValidator(Decimal('0.01'))])

    def __str__(self):
        return self.name
