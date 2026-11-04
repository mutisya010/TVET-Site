from django.contrib import admin
from .models import SiteBranding

@admin.register(SiteBranding)
class SiteBrandingAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Institution Identity", {
            "fields": (
                "institution_name",
                "short_name",
                "acronym_badge",
                "tagline",
                "sub_tagline",
            ),
        }),
        ("Branding & Color Palette", {
            "description": "Hex codes controlling the visual theme across the college portal.",
            "fields": (
                "primary_color",
                "primary_dark",
                "accent_color",
                "accent_hover",
            ),
        }),
        ("Official Logos & Crests", {
            "fields": (
                "logo",
                "logo_dark",
                "favicon",
            ),
        }),
        ("Communication & Emergency Helplines", {
            "fields": (
                "helpline_phone",
                "helpline_phone_alt",
                "whatsapp_number",
                "email_info",
                "email_principal",
            ),
        }),
        ("Statutory Accreditation & Location", {
            "fields": (
                "tveta_license_number",
                "physical_location",
                "po_box",
                "admissions_notice",
            ),
        }),
    )

    def has_add_permission(self, request):
        # Enforce singleton in admin: cannot add if one already exists
        return not SiteBranding.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
