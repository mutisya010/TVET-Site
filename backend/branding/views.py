from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SiteBranding
from .serializers import SiteBrandingSerializer

class SiteBrandingView(APIView):
    """
    Public endpoint to retrieve the active site branding, logos, color scheme,
    and contact details.
    """
    def get(self, request):
        branding = SiteBranding.get_settings()
        serializer = SiteBrandingSerializer(branding, context={'request': request})
        return Response(serializer.data)
