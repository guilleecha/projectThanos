from django.db import models

class SurfaceType(models.Model):
    name = models.CharField(max_length=100)
    min_coefficient = models.FloatField()
    avg_coefficient = models.FloatField()
    max_coefficient = models.FloatField()

    def __str__(self):
        return self.name

class CoverageType(models.Model):
    family = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    min_coefficient = models.FloatField()
    avg_coefficient = models.FloatField()
    max_coefficient = models.FloatField()

    def __str__(self):
        return f'{self.family} - {self.type}'

class Basin(models.Model):
    name = models.CharField(max_length=100)
    area = models.FloatField()  # Área en km²
    altimetry = models.FloatField()  # Altimetría en metros
    main_channel_length = models.FloatField()  # Longitud del cauce principal en km
    curve_number = models.IntegerField(default=75)  # Proporciona un valor predeterminado
    slope = models.FloatField(null=True, blank=True)  # Campo para la pendiente media
    runoff_coefficient = models.FloatField(null=True, blank=True)  # Coeficiente de escorrentía
    P_3_10 = models.FloatField(null=True, blank=True)  # Precipitación máxima esperada para un evento con periodo de retorno de 10 años y duración de 3 horas

    def __str__(self):
        return self.name

class BasinAnalysis(models.Model):
    basin = models.ForeignKey(Basin, on_delete=models.CASCADE, related_name='analyses')
    precipitation = models.FloatField()  # Precipitación en pulgadas
    return_period = models.IntegerField()  # Periodo de retorno en años
    method = models.CharField(max_length=50, choices=[('kirpich', 'Kirpich'), ('uruguay', 'Uruguay')])
    runoff = models.FloatField()  # Escorrentía en pulgadas
    tc = models.FloatField()  # Tiempo de concentración en horas

    def __str__(self):
        return f'Análisis para {self.basin.name} con periodo de retorno {self.return_period} años'

    def calculate_weighted_runoff_coefficient(self):
        total_area = sum(coverage.area for coverage in self.basin.coverages.all())
        if total_area == 0:
            return 0
        weighted_sum = sum(coverage.area * coverage.surface_type.avg_coefficient for coverage in self.basin.coverages.all())
        return weighted_sum / total_area

class Coverage(models.Model):
    basin = models.ForeignKey(Basin, on_delete=models.CASCADE, related_name='coverages')
    surface_type = models.ForeignKey(SurfaceType, on_delete=models.CASCADE)
    permeability_condition = models.CharField(max_length=50, choices=[('minimo', 'Mínimo'), ('promedio', 'Promedio'), ('maximo', 'Máximo')])
    area = models.FloatField()  # Área en km²

    def __str__(self):
        return f'{self.surface_type.name} - {self.permeability_condition}'