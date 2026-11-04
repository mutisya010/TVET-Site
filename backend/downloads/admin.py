from django.contrib import admin
from .models import DownloadCategory, DownloadItem

@admin.register(DownloadCategory)
class DownloadCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order', 'is_active', 'total_docs')
    list_editable = ('order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

    def total_docs(self, obj):
        return obj.documents.count()
    total_docs.short_description = "Documents"


@admin.register(DownloadItem)
class DownloadItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'code', 'format', 'size', 'published_date', 'download_count', 'is_featured', 'is_active')
    list_filter = ('category', 'format', 'is_featured', 'is_active')
    list_editable = ('is_featured', 'is_active')
    search_fields = ('title', 'code', 'description')
    readonly_fields = ('size', 'download_count', 'created_at')
    fieldsets = (
        ("Document Info", {
            "fields": ("title", "category", "code", "description")
        }),
        ("File & Storage", {
            "fields": ("file", "external_url", "format", "size")
        }),
        ("Display & Metrics", {
            "fields": ("published_date", "is_featured", "is_active", "order", "download_count", "created_at")
        }),
    )
