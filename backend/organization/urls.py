from django.urls import path
from .views import DepartmentDivisionListView, DepartmentOfficeListView, DepartmentOfficeDetailView

urlpatterns = [
    path('departments/divisions/', DepartmentDivisionListView.as_view(), name='department-divisions'),
    path('departments/', DepartmentOfficeListView.as_view(), name='department-list'),
    path('departments/<slug:slug>/', DepartmentOfficeDetailView.as_view(), name='department-detail'),
]

