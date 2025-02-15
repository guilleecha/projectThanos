import os
import sys
import django

# Añadir la ruta del proyecto al sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from basins.models import Basin

# Datos de ejemplo
basins_data = [
    {'name': 'Basin 1', 'area': 100.0, 'altimetry': 500.0, 'main_channel_length': 50.0},
    {'name': 'Basin 2', 'area': 200.0, 'altimetry': 600.0, 'main_channel_length': 60.0},
    {'name': 'Basin 3', 'area': 300.0, 'altimetry': 700.0, 'main_channel_length': 70.0},
]

for basin_data in basins_data:
    Basin.objects.create(**basin_data)

print("Basins added successfully!")