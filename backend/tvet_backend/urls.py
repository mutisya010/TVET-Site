from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Admin Branding
admin.site.site_header = "Loima TVC Management Portal"
admin.site.site_title = "TVET Admin"
admin.site.index_title = "College Content & Institutional Administration"

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API Endpoints
    path('api/v1/', include('branding.urls')),
    path('api/v1/', include('downloads.urls')),
    path('api/v1/', include('academics.urls')),
    path('api/v1/', include('organization.urls')),
]

# Serve media and static files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
