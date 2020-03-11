from django.db import models


class Asset(models.Model):
    SHARE = 'SHARE'
    CURRENCY = 'CURRENCY'
    TYPE = (
        (SHARE, 'share'),
        (CURRENCY, 'currency'),
    )
    name = models.CharField(max_length=50, blank=False, null=False)
    type = models.CharField(max_length=8, choices=TYPE, blank=False,
                            null=False)
    buy = models.DecimalField(max_digits=10, decimal_places=2, null=False,
                              blank=False)
    sell = models.DecimalField(max_digits=10, decimal_places=2, null=False,
                               blank=False)

    def __str__(self):
        return self.name
