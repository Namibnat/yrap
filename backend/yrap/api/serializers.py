from asyncore import read
from rest_framework import serializers

from yrap.models import Project

class ProjectSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    project_name = serializers.CharField()
    done_when = serializers.CharField()
    created = serializers.DateField(read_only=True)
    updated = serializers.DateField(read_only=True)
    status = serializers.CharField()

    def create(self, validated_data):
        print(validated_data)
        return Project.objects.create(**validated_data)

    def updated(self, instance, validated_data):
        instance.project_name = validated_data.get('project_name', instance.project_name)
        instance.done_when = validated_data.get('done_when', instance.done_when)
        instance.created = validated_data.get('created', instance.created)
        instance.save()
        return instance
