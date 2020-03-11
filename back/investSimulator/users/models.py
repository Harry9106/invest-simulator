from decimal import Decimal
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Sum


class CustomUser(AbstractUser):
    """
    Clase que modela un usuario del sistema.

    Atributos:

    avatar: avatar que identifica al usuario. (String)

    cash: dinero liquido disponible para el usuario. (Decimal)

    rank: posicion que ocupa en el ranking de usuarios. (Int)
    """
    avatar = models.CharField(blank=False, max_length=12)
    cash = models.DecimalField(max_digits=14, decimal_places=2, default=5000)
    rank = models.IntegerField(default=0)

    def __str__(self):
        return self.email

    def wallet_quote(self):
        """
        Metodo que recorre las inversiones del usuario y cotiza su cartera
        en base a los precios actuales de los activos y al dinero liquido.
        """
        quote = 0
        investments = self.investments.all()\
            .values('asset__buy')\
            .order_by()\
            .annotate(amountSum=Sum('amount'))\
            .filter(amountSum__gte=0.01)
        for investment in investments:
            quote += investment['amountSum'] * investment['asset__buy']
        return Decimal('%.2f' % (quote + self.cash))
