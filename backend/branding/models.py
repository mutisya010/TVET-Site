from django.db import models

class SiteBranding(models.Model):
    institution_name = models.CharField(
        max_length=255, 
        default="Loima Technical and Vocational College"
    )
    short_name = models.CharField(
        max_length=60, 
        default="LOIMA",
        help_text="Primary institution display name (e.g. LOIMA)"
    )
    acronym_badge = models.CharField(
        max_length=20, 
        default="TVC",
        help_text="Badge suffix (e.g. TVC)"
    )
    tagline = models.CharField(
        max_length=255, 
        default="TECHNICAL & VOCATIONAL COLLEGE"
    )
    sub_tagline = models.CharField(
        max_length=255, 
        default="Centre of Excellence in Technical & Vocational Training",
        blank=True
    )
    
    # Theme Palette
    primary_color = models.CharField(
        max_length=20, 
        default="#2E8B57", 
        help_text="Primary SeaGreen institutional color"
    )
    primary_dark = models.CharField(
        max_length=20, 
        default="#14462E", 
        help_text="Dark institutional green for headers, ribbons & footer"
    )
    accent_color = models.CharField(
        max_length=20, 
        default="#F59E0B", 
        help_text="Warm amber orange for CTAs and highlighted badges"
    )
    accent_hover = models.CharField(
        max_length=20, 
        default="#D97706"
    )

    # Assets
    logo = models.ImageField(upload_to="branding/", blank=True, null=True)
    logo_dark = models.ImageField(upload_to="branding/", blank=True, null=True)
    favicon = models.ImageField(upload_to="branding/", blank=True, null=True)

    # Contact & Helpline
    helpline_phone = models.CharField(max_length=50, default="+254 716 189 084")
    helpline_phone_alt = models.CharField(max_length=50, blank=True, default="+254 759 437 978")
    whatsapp_number = models.CharField(max_length=50, default="+254 759 437 978")
    email_info = models.EmailField(default="info@loimatvc.ac.ke")
    email_principal = models.EmailField(default="principal@loimatvc.ac.ke")
    physical_location = models.CharField(
        max_length=255, 
        default="Lorugum Campus (~1.5 km off Lodwar–Uganda Road), Loima Sub-County, Turkana County"
    )
    po_box = models.CharField(max_length=100, default="P.O. Box 123 - 30500, Lodwar, Kenya")
    tveta_license_number = models.CharField(max_length=100, default="TVETA/PUBLIC/TVC/0005/2023")

    # Announcement bar notice
    admissions_notice = models.CharField(
        max_length=255, 
        default="Intakes: January, May & September | Apply via KUCCPS or Campus Office in Lorugum"
    )

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site Branding & Settings"
        verbose_name_plural = "Site Branding & Settings"

    def __str__(self):
        return f"{self.institution_name} ({self.short_name})"

    def save(self, *args, **kwargs):
        # Guarantee singleton pattern
        if not self.pk and SiteBranding.objects.exists():
            self.pk = SiteBranding.objects.first().pk
        super().save(*args, **kwargs)

    @classmethod
    def get_settings(cls):
        obj = cls.objects.first()
        if not obj:
            obj = cls.objects.create()
        return obj
