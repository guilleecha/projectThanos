from rest_framework import serializers
from .models import Basin, BasinAnalysis, SurfaceType, Coverage

class BasinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basin
        fields = '__all__'

class BasinAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasinAnalysis
        fields = '__all__'

class SurfaceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurfaceType
        fields = '__all__'

class CoverageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coverage
        fields = '__all__'