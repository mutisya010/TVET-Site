from django.urls import path
from .views import AcademicDepartmentListView, ProgramListView, ProgramDetailView

urlpatterns = [
    path('programs/categories/', AcademicDepartmentListView.as_view(), name='program-categories'),
    path('programs/', ProgramListView.as_view(), name='program-list'),
    path('programs/<slug:slug>/', ProgramDetailView.as_view(), name='program-detail'),
]

