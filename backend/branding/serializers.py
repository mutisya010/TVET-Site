from rest_framework import serializers
from .models import SiteBranding

class SiteBrandingSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    logo_dark_url = serializers.SerializerMethodField()
    favicon_url = serializers.SerializerMethodField()

    class Meta:
        model = SiteBranding
        fields = [
            'id',
            'institution_name',
            'short_name',
            'acronym_badge',
            'tagline',
            'sub_tagline',
            'primary_color',
            'primary_dark',
            'accent_color',
            'accent_hover',
            'logo',
            'logo_url',
            'logo_dark',
            'logo_dark_url',
            'favicon',
            'favicon_url',
            'helpline_phone',
            'helpline_phone_alt',
            'whatsapp_number',
            'email_info',
            'email_principal',
            'physical_location',
            'po_box',
            'tveta_license_number',
            'admissions_notice',
            'updated_at',
        ]

    def get_logo_url(self, obj):
        request = self.context.get('request')
        if obj.logo and hasattr(obj.logo, 'url'):
            return request.build_absolute_uri(obj.logo.url) if request else obj.logo.url
        return None

    def get_logo_dark_url(self, obj):
        request = self.context.get('request')
        if obj.logo_dark and hasattr(obj.logo_dark, 'url'):
            return request.build_absolute_uri(obj.logo_dark.url) if request else obj.logo_dark.url
        return None

    def get_favicon_url(self, obj):
        request = self.context.get('request')
        if obj.favicon and hasattr(obj.favicon, 'url'):
            return request.build_absolute_uri(obj.favicon.url) if request else obj.favicon.url
        return None

