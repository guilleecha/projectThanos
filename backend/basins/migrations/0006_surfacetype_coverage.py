# Generated by Django 5.1.5 on 2025-01-17 01:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basins', '0005_basin_p_3_10_basinanalysis'),
    ]

    operations = [
        migrations.CreateModel(
            name='SurfaceType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('min_coefficient', models.FloatField()),
                ('avg_coefficient', models.FloatField()),
                ('max_coefficient', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Coverage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('permeability_condition', models.CharField(choices=[('minimo', 'Mínimo'), ('promedio', 'Promedio'), ('maximo', 'Máximo')], max_length=50)),
                ('area', models.FloatField()),
                ('basin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='coverages', to='basins.basin')),
                ('surface_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='basins.surfacetype')),
            ],
        ),
    ]
