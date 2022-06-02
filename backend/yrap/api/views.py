import re
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from yrap.models import Project
from yrap.api.serializers import ProjectSerializer


@api_view(['GET', 'POST'])
def project_list_view(request):
    if request.method == 'GET':
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
