# Generated by Django 5.1.5 on 2025-01-17 00:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basins', '0003_basin_slope'),
    ]

    operations = [
        migrations.AddField(
            model_name='basin',
            name='runoff_coefficient',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
