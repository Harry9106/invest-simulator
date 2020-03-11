from django.db import models
from asset.models import Asset


class AssetHistorial(models.Model):

    asset = models.ForeignKey(Asset, related_name='asset',
                              on_delete=models.CASCADE)
    buy = models.DecimalField(max_digits=10, decimal_places=2,
                              null=False, blank=False)
    sell = models.DecimalField(max_digits=10, decimal_places=2,
                               null=False, blank=False)
    date = models.DateField(auto_now_add=True)
