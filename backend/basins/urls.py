from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BasinViewSet, BasinAnalysisViewSet, SurfaceTypeViewSet, CoverageViewSet, basin_detail_api, basin_list_api, basin_analysis_summary_api, create_analysis_api

router = DefaultRouter()
router.register(r'basins', BasinViewSet)
router.register(r'basin-analyses', BasinAnalysisViewSet)
router.register(r'surface-types', SurfaceTypeViewSet)
router.register(r'coverages', CoverageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/basins/', basin_list_api, name='basin_list_api'),
    path('api/basins/<int:id>/', basin_detail_api, name='basin_detail_api'),
    path('api/basins/<int:basin_id>/analyses/summary/', basin_analysis_summary_api, name='basin_analysis_summary_api'),
    path('api/basins/<int:basin_id>/analyses/new/', create_analysis_api, name='create_analysis_api'),
]