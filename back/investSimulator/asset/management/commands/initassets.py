from django.core.management.base import BaseCommand
from ...serializers import AssetSerializer
import requests
from django.conf import settings


class Command(BaseCommand):
    help = 'Loads assets from API into own DB'

    def handle(self, *args, **options):
        """
        Este metodo se utiliza para cargar la base de datos con datos de
        una aplicacion externa.
        """
        count = 0
        response = requests.get(settings.URL)
        data = response.json()
        for x in data:
            asset_name = x["name"]
            r = requests.get(settings.URL2 + asset_name)
            prices = r.json()
            prices = prices[0]
            asset = {**x, **prices}
            serializer = AssetSerializer(data=asset)
            if serializer.is_valid():
                serializer.save()
                count += 1
                self.stdout.write("Asset successfully loaded.")
        self.stdout.write(str(count) + " assets were loaded into DB.")
