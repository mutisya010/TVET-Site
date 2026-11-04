from rest_framework import serializers
from .models import AcademicDepartment, Program

class ProgramSerializer(serializers.ModelSerializer):
    department_slug = serializers.CharField(source='department.slug', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    brochure_url = serializers.SerializerMethodField()
    
    # Aliases for frontend compatibility
    deptLabel = serializers.CharField(source='department_label', read_only=True)
    qualificationLevel = serializers.CharField(source='qualification_level', read_only=True)
    knqfLevel = serializers.CharField(source='knqf_level', read_only=True)
    examBoard = serializers.CharField(source='exam_board', read_only=True)
    examBoardDetail = serializers.CharField(source='exam_board_detail', read_only=True)
    badgeType = serializers.CharField(source='badge_type', read_only=True)
    minRequirement = serializers.CharField(source='min_requirement', read_only=True)
    practicalRatio = serializers.CharField(source='practical_ratio', read_only=True)
    careerOpportunities = serializers.JSONField(source='career_opportunities', read_only=True)

    class Meta:
        model = Program
        fields = [
            'id',
            'slug',
            'code',
            'title',
            'department',
            'department_slug',
            'department_name',
            'deptLabel',
            'qualification_level',
            'qualificationLevel',
            'knqf_level',
            'knqfLevel',
            'duration',
            'exam_board',
            'examBoard',
            'exam_board_detail',
            'examBoardDetail',
            'badge_type',
            'badgeType',
            'intakes',
            'min_requirement',
            'minRequirement',
            'practical_ratio',
            'practicalRatio',
            'pathways',
            'overview',
            'modules',
            'career_opportunities',
            'careerOpportunities',
            'brochure_url',
            'is_featured',
            'is_active',
        ]

    def get_brochure_url(self, obj):
        request = self.context.get('request')
        if obj.brochure and hasattr(obj.brochure, 'url'):
            return request.build_absolute_uri(obj.brochure.url) if request else obj.brochure.url
        return None


class AcademicDepartmentSerializer(serializers.ModelSerializer):
    program_count = serializers.SerializerMethodField()

    class Meta:
        model = AcademicDepartment
        fields = ['id', 'name', 'slug', 'short_label', 'description', 'order', 'is_active', 'program_count']

    def get_program_count(self, obj):
        return obj.programs.filter(is_active=True).count()

