from rest_framework import serializers
from .models import DepartmentDivision, DepartmentOffice, StaffMember, OfficeImage

class StaffMemberSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = StaffMember
        fields = [
            'id',
            'full_name',
            'role_title',
            'qualifications',
            'email',
            'phone',
            'bio',
            'photo_url',
            'is_head',
            'order',
        ]

    def get_photo_url(self, obj):
        request = self.context.get('request')
        if obj.photo and hasattr(obj.photo, 'url'):
            return request.build_absolute_uri(obj.photo.url) if request else obj.photo.url
        return None


class OfficeImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = OfficeImage
        fields = ['id', 'image_url', 'caption', 'order']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class DepartmentOfficeSerializer(serializers.ModelSerializer):
    division_slug = serializers.CharField(source='division.slug', read_only=True)
    division_name = serializers.CharField(source='division.name', read_only=True)
    
    # Aliases for frontend compatibility
    categoryId = serializers.CharField(source='division.slug', read_only=True)
    categoryName = serializers.CharField(source='division.name', read_only=True)
    contactInfo = serializers.CharField(source='contact_info', read_only=True)
    actionText = serializers.CharField(source='action_text', read_only=True)
    actionRoute = serializers.CharField(source='action_route', read_only=True)

    staff = StaffMemberSerializer(many=True, read_only=True)
    images = OfficeImageSerializer(many=True, read_only=True)

    class Meta:
        model = DepartmentOffice
        fields = [
            'id',
            'slug',
            'division',
            'division_slug',
            'division_name',
            'categoryId',
            'categoryName',
            'title',
            'subtitle',
            'description',
            'mandates',
            'highlights',
            'contact_info',
            'contactInfo',
            'action_text',
            'actionText',
            'action_route',
            'actionRoute',
            'order',
            'is_active',
            'staff',
            'images',
        ]


class DepartmentDivisionSerializer(serializers.ModelSerializer):
    offices_count = serializers.SerializerMethodField()

    class Meta:
        model = DepartmentDivision
        fields = ['id', 'name', 'slug', 'short_desc', 'color', 'order', 'is_active', 'offices_count']

    def get_offices_count(self, obj):
        return obj.offices.filter(is_active=True).count()

