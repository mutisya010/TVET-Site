from rest_framework import generics
from django.db.models import Q
from .models import DepartmentDivision, DepartmentOffice
from .serializers import DepartmentDivisionSerializer, DepartmentOfficeSerializer

class DepartmentDivisionListView(generics.ListAPIView):
    queryset = DepartmentDivision.objects.filter(is_active=True).order_by('order', 'name')
    serializer_class = DepartmentDivisionSerializer


class DepartmentOfficeListView(generics.ListAPIView):
    serializer_class = DepartmentOfficeSerializer

    def get_queryset(self):
        queryset = DepartmentOffice.objects.filter(is_active=True).select_related('division').prefetch_related('staff', 'images').order_by('order', 'title')
        division_slug = self.request.query_params.get('division')
        search_query = self.request.query_params.get('search')

        if division_slug and division_slug != 'all':
            queryset = queryset.filter(division__slug=division_slug)

        if search_query:
            q = search_query.strip()
            queryset = queryset.filter(
                Q(title__icontains=q) |
                Q(subtitle__icontains=q) |
                Q(description__icontains=q)
            )

        return queryset


class DepartmentOfficeDetailView(generics.RetrieveAPIView):
    queryset = DepartmentOffice.objects.filter(is_active=True).select_related('division').prefetch_related('staff', 'images')
    serializer_class = DepartmentOfficeSerializer
    lookup_field = 'slug'
