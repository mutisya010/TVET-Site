from django.urls import path
from .views import SiteBrandingView

urlpatterns = [
    path('branding/', SiteBrandingView.as_view(), name='site-branding'),
]

