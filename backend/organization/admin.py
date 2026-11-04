from django.contrib import admin
from .models import DepartmentDivision, DepartmentOffice, StaffMember, OfficeImage

class StaffMemberInline(admin.StackedInline):
    model = StaffMember
    extra = 1
    fields = ('full_name', 'role_title', 'qualifications', 'email', 'phone', 'is_head', 'order')


class OfficeImageInline(admin.TabularInline):
    model = OfficeImage
    extra = 1
    fields = ('image', 'caption', 'order')


@admin.register(DepartmentDivision)
class DepartmentDivisionAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'color', 'order', 'is_active', 'total_offices')
    list_editable = ('order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

    def total_offices(self, obj):
        return obj.offices.count()
    total_offices.short_description = "Offices"


@admin.register(DepartmentOffice)
class DepartmentOfficeAdmin(admin.ModelAdmin):
    list_display = ('title', 'division', 'subtitle', 'action_route', 'order', 'is_active')
    list_filter = ('division', 'action_route', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('title', 'subtitle', 'description')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [StaffMemberInline, OfficeImageInline]
    fieldsets = (
        ("Office Classification", {
            "fields": ("division", "title", "slug", "subtitle")
        }),
        ("Mandate & Overview", {
            "fields": ("description", "mandates", "highlights")
        }),
        ("Contact & Navigation Action", {
            "fields": ("contact_info", "action_text", "action_route", "order", "is_active")
        }),
    )


@admin.register(StaffMember)
class StaffMemberAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'role_title', 'office', 'email', 'phone', 'is_head', 'order')
    list_filter = ('office__division', 'office', 'is_head')
    list_editable = ('is_head', 'order')
    search_fields = ('full_name', 'role_title', 'qualifications')
