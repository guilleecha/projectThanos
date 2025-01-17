import os
import django

# Configurar el entorno de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from basins.models import CoverageType

coverage_data = [
    {"family": "Comercial", "type": "Áreas del centro", "min_coefficient": 0.7, "max_coefficient": 0.95, "avg_coefficient": 0.825},
    {"family": "Comercial", "type": "Áreas residenciales", "min_coefficient": 0.5, "max_coefficient": 0.7, "avg_coefficient": 0.6},
    {"family": "Residencial", "type": "Áreas de viviendas unifamiliares", "min_coefficient": 0.3, "max_coefficient": 0.5, "avg_coefficient": 0.4},
    {"family": "Residencial", "type": "Multi-familiares, independientes", "min_coefficient": 0.4, "max_coefficient": 0.6, "avg_coefficient": 0.5},
    {"family": "Residencial", "type": "Multi-familiares, adosadas", "min_coefficient": 0.6, "max_coefficient": 0.75, "avg_coefficient": 0.675},
    {"family": "Residencial", "type": "Suburbanas", "min_coefficient": 0.25, "max_coefficient": 0.4, "avg_coefficient": 0.325},
    {"family": "Residencial", "type": "Áreas de apartamentos", "min_coefficient": 0.5, "max_coefficient": 0.7, "avg_coefficient": 0.6},
    {"family": "Industrial", "type": "Áreas ligeras", "min_coefficient": 0.5, "max_coefficient": 0.8, "avg_coefficient": 0.65},
    {"family": "Industrial", "type": "Áreas pesadas", "min_coefficient": 0.6, "max_coefficient": 0.9, "avg_coefficient": 0.75},
    {"family": "Otros", "type": "Parques, cementerios", "min_coefficient": 0.1, "max_coefficient": 0.25, "avg_coefficient": 0.175},
    {"family": "Otros", "type": "Parques infantiles", "min_coefficient": 0.2, "max_coefficient": 0.4, "avg_coefficient": 0.3},
    {"family": "Otros", "type": "Áreas de patio ferroviario", "min_coefficient": 0.2, "max_coefficient": 0.4, "avg_coefficient": 0.3},
    {"family": "Otros", "type": "Áreas no mejoradas", "min_coefficient": 0.1, "max_coefficient": 0.3, "avg_coefficient": 0.2},
    {"family": "Pasto/Césped", "type": "Suelo arenoso, plano, 2%", "min_coefficient": 0.05, "max_coefficient": 0.1, "avg_coefficient": 0.075},
    {"family": "Pasto/Césped", "type": "Suelo arenoso, pendiente moderada, 2-7%", "min_coefficient": 0.1, "max_coefficient": 0.15, "avg_coefficient": 0.125},
    {"family": "Pasto/Césped", "type": "Suelo arenoso, empinado, 7%", "min_coefficient": 0.15, "max_coefficient": 0.2, "avg_coefficient": 0.175},
    {"family": "Pasto/Césped", "type": "Suelo arcilloso, plano, 2%", "min_coefficient": 0.13, "max_coefficient": 0.17, "avg_coefficient": 0.15},
    {"family": "Pasto/Césped", "type": "Suelo arcilloso, pendiente moderada, 2-7%", "min_coefficient": 0.18, "max_coefficient": 0.22, "avg_coefficient": 0.2},
    {"family": "Pasto/Césped", "type": "Suelo arcilloso, empinado, 7%", "min_coefficient": 0.25, "max_coefficient": 0.35, "avg_coefficient": 0.3},
    {"family": "Calles", "type": "Asfalto", "min_coefficient": 0.7, "max_coefficient": 0.95, "avg_coefficient": 0.825},
    {"family": "Calles", "type": "Concreto", "min_coefficient": 0.8, "max_coefficient": 0.95, "avg_coefficient": 0.875},
    {"family": "Calles", "type": "Ladrillo", "min_coefficient": 0.7, "max_coefficient": 0.85, "avg_coefficient": 0.775},
    {"family": "Entradas y caminos", "type": "Entradas y caminos", "min_coefficient": 0.75, "max_coefficient": 0.85, "avg_coefficient": 0.8},
    {"family": "Techos", "type": "Techos", "min_coefficient": 0.75, "max_coefficient": 0.95, "avg_coefficient": 0.85},
]

for coverage in coverage_data:
    CoverageType.objects.create(**coverage)