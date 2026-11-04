from django.contrib import admin
from .models import AcademicDepartment, Program

@admin.register(AcademicDepartment)
class AcademicDepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'short_label', 'order', 'is_active', 'total_programs')
    list_editable = ('order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'short_label')

    def total_programs(self, obj):
        return obj.programs.count()
    total_programs.short_description = "Programs"


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'code', 'department', 'qualification_level', 'knqf_level', 'duration', 'is_featured', 'is_active')
    list_filter = ('department', 'qualification_level', 'exam_board', 'is_featured', 'is_active')
    list_editable = ('is_featured', 'is_active')
    search_fields = ('title', 'code', 'overview', 'min_requirement')
    prepopulated_fields = {'slug': ('title',)}
    fieldsets = (
        ("Basic Information", {
            "fields": ("title", "slug", "code", "department", "qualification_level", "knqf_level", "badge_type")
        }),
        ("Accreditation & Curriculum Delivery", {
            "fields": ("duration", "exam_board", "exam_board_detail", "practical_ratio", "intakes", "pathways")
        }),
        ("Admissions & Requirements", {
            "fields": ("min_requirement", "overview", "modules", "career_opportunities")
        }),
        ("Media & Visibility", {
            "fields": ("brochure", "is_featured", "is_active", "order")
        }),
    )
