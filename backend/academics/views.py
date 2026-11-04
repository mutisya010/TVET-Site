from rest_framework import generics
from django.db.models import Q
from .models import AcademicDepartment, Program
from .serializers import AcademicDepartmentSerializer, ProgramSerializer

class AcademicDepartmentListView(generics.ListAPIView):
    queryset = AcademicDepartment.objects.filter(is_active=True).order_by('order', 'name')
    serializer_class = AcademicDepartmentSerializer


class ProgramListView(generics.ListAPIView):
    serializer_class = ProgramSerializer

    def get_queryset(self):
        queryset = Program.objects.filter(is_active=True).select_related('department').order_by('order', 'title')
        dept_slug = self.request.query_params.get('department')
        level = self.request.query_params.get('level')
        search_query = self.request.query_params.get('search')
        intake = self.request.query_params.get('intake')

        if dept_slug and dept_slug != 'all':
            queryset = queryset.filter(department__slug=dept_slug)

        if level and level != 'all':
            queryset = queryset.filter(qualification_level__icontains=level)

        if intake and intake != 'all':
            queryset = queryset.filter(intakes__icontains=intake)

        if search_query:
            q = search_query.strip()
            queryset = queryset.filter(
                Q(title__icontains=q) |
                Q(code__icontains=q) |
                Q(overview__icontains=q) |
                Q(min_requirement__icontains=q)
            )

        return queryset


class ProgramDetailView(generics.RetrieveAPIView):
    queryset = Program.objects.filter(is_active=True)
    serializer_class = ProgramSerializer
    lookup_field = 'slug'
