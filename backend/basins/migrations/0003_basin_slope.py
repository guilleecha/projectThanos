# Generated by Django 5.1.5 on 2025-01-17 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basins', '0002_basin_curve_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='basin',
            name='slope',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
