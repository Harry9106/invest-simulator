# Generated by Django 2.1.2 on 2018-10-24 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('historialasset', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assethistorial',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
