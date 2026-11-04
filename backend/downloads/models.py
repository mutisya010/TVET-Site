import os
from django.db import models

class DownloadCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Download Category"
        verbose_name_plural = "Download Categories"
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class DownloadItem(models.Model):
    category = models.ForeignKey(
        DownloadCategory, 
        on_delete=models.CASCADE, 
        related_name='documents'
    )
    title = models.CharField(max_length=255)
    code = models.CharField(max_length=60, blank=True, help_text="e.g. ADM-FORM-2026")
    description = models.TextField(blank=True)
    file = models.FileField(upload_to="downloads/%Y/", blank=True, null=True)
    external_url = models.URLField(
        blank=True, 
        default="", 
        help_text="Direct link if hosted externally or cloud storage"
    )
    format = models.CharField(max_length=20, default="PDF")
    size = models.CharField(max_length=30, blank=True, help_text="e.g. 420 KB")
    published_date = models.CharField(
        max_length=60, 
        blank=True, 
        help_text="Formatted publication date (e.g. 'Jan 15, 2026')"
    )
    download_count = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Download Document"
        verbose_name_plural = "Download Documents"
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.title} ({self.code or self.format})"

    def save(self, *args, **kwargs):
        if self.file:
            # Auto-detect format from file extension if not provided
            ext = os.path.splitext(self.file.name)[1].replace('.', '').upper()
            if ext and not self.format:
                self.format = ext

            # Auto-calculate human-readable size
            try:
                size_bytes = self.file.size
                if not self.size:
                    if size_bytes < 1024:
                        self.size = f"{size_bytes} B"
                    elif size_bytes < 1024 * 1024:
                        self.size = f"{size_bytes / 1024:.1f} KB"
                    else:
                        self.size = f"{size_bytes / (1024 * 1024):.1f} MB"
            except Exception:
                pass
        super().save(*args, **kwargs)
