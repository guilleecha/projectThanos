from django.shortcuts import render
from rest_framework import viewsets
from .models import Basin, BasinAnalysis, SurfaceType, Coverage
from .serializers import BasinSerializer, BasinAnalysisSerializer, SurfaceTypeSerializer, CoverageSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .utils import calculate_runoff, calculate_tc_kirpich, calculate_tc_uruguay
from django.core.cache import cache

# Create your views here.

class BasinViewSet(viewsets.ModelViewSet):
    queryset = Basin.objects.all()
    serializer_class = BasinSerializer

class BasinAnalysisViewSet(viewsets.ModelViewSet):
    queryset = BasinAnalysis.objects.all()
    serializer_class = BasinAnalysisSerializer

class SurfaceTypeViewSet(viewsets.ModelViewSet):
    queryset = SurfaceType.objects.all()
    serializer_class = SurfaceTypeSerializer

class CoverageViewSet(viewsets.ModelViewSet):
    queryset = Coverage.objects.all()
    serializer_class = CoverageSerializer

@csrf_exempt
def basin_detail_api(request, id):
    try:
        basin = Basin.objects.select_related('analyses').get(id=id)
    except Basin.DoesNotExist:
        return JsonResponse({'error': 'Basin not found'}, status=404)

    if request.method == 'GET':
        basin_dict = {
            'id': basin.id,
            'name': basin.name,
            'area': basin.area,
            'altimetry': basin.altimetry,
            'main_channel_length': basin.main_channel_length,
            'curve_number': basin.curve_number,
            'slope': basin.slope,
            'runoff_coefficient': basin.runoff_coefficient,
            'P_3_10': basin.P_3_10,
            'analyses': list(basin.analyses.values())
        }
        return JsonResponse(basin_dict)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        for key, value in data.items():
            setattr(basin, key, value)
        basin.save()
        return JsonResponse(basin.id, safe=False)
    elif request.method == 'DELETE':
        basin.delete()
        return JsonResponse({'id': id}, safe=False)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def basin_list_api(request):
    if request.method == 'GET':
        basins = cache.get('basins')
        if not basins:
            basins = Basin.objects.all()
            cache.set('basins', basins, timeout=60*15)
        basins_data = BasinSerializer(basins, many=True).data
        return JsonResponse(basins_data, safe=False)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def basin_analysis_summary_api(request, basin_id):
    if request.method == 'GET':
        analyses = BasinAnalysis.objects.filter(basin_id=basin_id).select_related('coverages')
        summary = []
        for analysis in analyses:
            coverages = Coverage.objects.filter(basin_id=basin_id, analysis_id=analysis.id)
            coverage_data = CoverageSerializer(coverages, many=True).data
            summary.append({
                'id': analysis.id,
                'precipitation': analysis.precipitation,
                'return_period': analysis.return_period,
                'method': analysis.method,
                'runoff': analysis.runoff,
                'tc': analysis.tc,
                'weighted_runoff_coefficient': analysis.calculate_weighted_runoff_coefficient(),
                'coverages': coverage_data
            })
        return JsonResponse(summary, safe=False)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def create_analysis_api(request, basin_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        analysis = BasinAnalysis.objects.create(
            basin_id=basin_id,
            precipitation=data['precipitation'],
            return_period=data['return_period'],
            method=data['method'],
            runoff=data['runoff'],
            tc=data['tc']
        )
        serializer = BasinAnalysisSerializer(analysis)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)