from rest_framework import serializers
from .models import DownloadCategory, DownloadItem

class DownloadItemSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = DownloadItem
        fields = [
            'id',
            'category',
            'category_slug',
            'category_name',
            'title',
            'code',
            'description',
            'format',
            'size',
            'published_date',
            'download_url',
            'download_count',
            'is_featured',
            'is_active',
        ]

    def get_download_url(self, obj):
        request = self.context.get('request')
        if obj.file and hasattr(obj.file, 'url'):
            return request.build_absolute_uri(obj.file.url) if request else obj.file.url
        return obj.external_url or '#'


class DownloadCategorySerializer(serializers.ModelSerializer):
    document_count = serializers.SerializerMethodField()

    class Meta:
        model = DownloadCategory
        fields = ['id', 'name', 'slug', 'order', 'is_active', 'document_count']

    def get_document_count(self, obj):
        return obj.documents.filter(is_active=True).count()

