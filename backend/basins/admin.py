from django.contrib import admin
from .models import Basin, BasinAnalysis, SurfaceType, CoverageType, Coverage

admin.site.register(Basin)
admin.site.register(BasinAnalysis)
admin.site.register(SurfaceType)
admin.site.register(CoverageType)
admin.site.register(Coverage)
