from django.urls import path
from .views import DownloadCategoryListView, DownloadItemListView

urlpatterns = [
    path('downloads/categories/', DownloadCategoryListView.as_view(), name='download-categories'),
    path('downloads/', DownloadItemListView.as_view(), name='download-items'),
]

