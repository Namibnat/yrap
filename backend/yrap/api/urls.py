"""URLconf for yrap apis"""

from django.urls import path
from yrap.api.views import project_list_view

urlpatterns = [
    path('projects/', project_list_view, name='projects'),
]
