from django.db import models
from users.models import CustomUser
from asset.models import Asset
from django.core.validators import MinValueValidator
from decimal import Decimal
from django.core.mail import send_mail

HIGH = 'HIGH'
LOW = 'LOW'

ALARM_TYPE = (
    (HIGH, 'high'),
    (LOW, 'low'),
)

BUY = 'BUY'
SELL = 'SELL'

ALARM_PRICE = (
    (BUY, 'buy'),
    (SELL, 'sell'),
)


class Alarm(models.Model):
    """Define

    alarm_type: tipo de alarma. Puede ser alta o baja. (String)

    alarm_price: precio sobre el que se setea la alarma. (String)

    threshold: umbral con el que se compara el precio. (Decimal)

    asset: activo al cual esta vinculado la alarma. (Int)

    user: usuario al que esta vinculada la alarma. (Int)

    status: estado en el que se encuentra la alarma.
            es 1 o True cuando esta activa.
            es 0 o False en caso contrario
            (Bool)

    check_alarm(): checkea la condicion de la alarma.

    """

    alarm_type = models.CharField(max_length=8, choices=ALARM_TYPE,
                                  blank=False, null=False)
    alarm_price = models.CharField(max_length=8, choices=ALARM_PRICE,
                                   blank=False, null=False)
    threshold = models.DecimalField(max_digits=10, decimal_places=2,
                                    null=False,
                                    blank=False,
                                    validators=[
                                        MinValueValidator(Decimal('0.01'))])
    asset = models.ForeignKey(Asset, related_name='alarms',
                              on_delete=models.CASCADE, null=False,
                              blank=False)
    user = models.ForeignKey(CustomUser, related_name='alarms',
                             on_delete=models.CASCADE, null=False, blank=False)
    status = models.BooleanField(null=False, blank=False)

    def __str__(self):
        return self.asset

    def check_alarm(self):
        """
        Este metodo checkea el estado de la alarma en relacion a sus atributos
        y si se cumple la condicion de la misma se envia un correo electronico.
        """

        if self.alarm_price == 'BUY':
            price_type = "compra"
            if self.alarm_type == 'HIGH':
                if self.status:
                    if self.threshold < self.asset.buy:
                        send_mail(
                            'Alarma de Invest Simulator',
                            'Le informamos que el precio de '
                            + price_type + ' del activo '
                            + self.asset.name + ' ha superado el umbral de $'
                            + str(self.threshold),
                            'alarms@investsimulator.com',
                            [self.user],
                            fail_silently=False,
                        )
                        self.status = False
                elif not self.status:
                    if self.threshold >= self.asset.buy:
                        self.status = True
            elif self.alarm_type == 'LOW':
                if self.status:
                    if self.threshold > self.asset.buy:
                        send_mail(
                            'Alarma de Invest Simulator',
                            'Le informamos que el precio de '
                            + price_type + ' del activo '
                            + self.asset.name
                            + ' ha caido por debajo del umbral de $'
                            + str(self.threshold),
                            'alarms@investsimulator.com',
                            [self.user],
                            fail_silently=False,
                        )
                        self.status = False
                elif not self.status:
                    if self.threshold <= self.asset.buy:
                        self.status = True
        elif self.alarm_price == 'SELL':
            price_type = "venta"
            if self.alarm_type == 'HIGH':
                if self.status:
                    if self.threshold < self.asset.sell:
                        send_mail(
                            'Alarma de Invest Simulator',
                            'Le informamos que el precio de '
                            + price_type + ' del activo '
                            + self.asset.name + ' ha superado el umbral de $'
                            + str(self.threshold),
                            'alarms@investsimulator.com',
                            [self.user],
                            fail_silently=False,
                        )
                        self.status = False
                elif not self.status:
                    if self.threshold >= self.asset.sell:
                        self.status = True
            elif self.alarm_type == 'LOW':
                if self.status:
                    if self.threshold > self.asset.sell:
                        send_mail(
                            'Alarma de Invest Simulator',
                            'Le informamos que el precio de '
                            + price_type + ' del activo '
                            + self.asset.name
                            + ' ha caido por debajo del umbral de $'
                            + str(self.threshold),
                            'alarms@investsimulator.com',
                            [self.user],
                            fail_silently=False,
                        )
                        self.status = False
                elif not self.status:
                    if self.threshold <= self.asset.sell:
                        self.status = True
