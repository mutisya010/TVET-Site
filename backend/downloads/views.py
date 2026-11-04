from rest_framework import generics
from django.db.models import Q
from .models import DownloadCategory, DownloadItem
from .serializers import DownloadCategorySerializer, DownloadItemSerializer

class DownloadCategoryListView(generics.ListAPIView):
    queryset = DownloadCategory.objects.filter(is_active=True).order_by('order', 'name')
    serializer_class = DownloadCategorySerializer


class DownloadItemListView(generics.ListAPIView):
    serializer_class = DownloadItemSerializer

    def get_queryset(self):
        queryset = DownloadItem.objects.filter(is_active=True).select_related('category').order_by('order', '-id')
        category_slug = self.request.query_params.get('category')
        search_query = self.request.query_params.get('search')

        if category_slug and category_slug != 'all':
            queryset = queryset.filter(category__slug=category_slug)

        if search_query:
            q = search_query.strip()
            queryset = queryset.filter(
                Q(title__icontains=q) |
                Q(description__icontains=q) |
                Q(code__icontains=q)
            )

        return queryset
