from django.db import models

class DepartmentDivision(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=100, unique=True)
    short_desc = models.CharField(max_length=255, blank=True)
    color = models.CharField(max_length=20, default="#2E8B57")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Department Division"
        verbose_name_plural = "Department Divisions"
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class DepartmentOffice(models.Model):
    ACTION_ROUTES = [
        ('home', 'Home Page'),
        ('courses', 'Courses Catalog'),
        ('downloads', 'Downloads Page'),
        ('contact', 'Contact Page'),
    ]

    division = models.ForeignKey(
        DepartmentDivision, 
        on_delete=models.CASCADE, 
        related_name='offices'
    )
    slug = models.SlugField(max_length=150, unique=True)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    
    # Mandates and highlights stored as structured JSON
    mandates = models.JSONField(
        default=list, 
        blank=True, 
        help_text="Key responsibilities and mandates list"
    )
    highlights = models.JSONField(
        default=list, 
        blank=True, 
        help_text="Key statistics/highlights (list of {label, value})"
    )
    
    contact_info = models.CharField(max_length=255, blank=True)
    action_text = models.CharField(max_length=100, blank=True, default="Learn More")
    action_route = models.CharField(max_length=50, choices=ACTION_ROUTES, default='home')
    
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Department / Leadership Office"
        verbose_name_plural = "Departments & Leadership Offices"
        ordering = ['order', 'title']

    def __str__(self):
        return f"{self.title} ({self.division.name})"


class StaffMember(models.Model):
    office = models.ForeignKey(
        DepartmentOffice, 
        on_delete=models.CASCADE, 
        related_name='staff'
    )
    full_name = models.CharField(max_length=150)
    role_title = models.CharField(max_length=150, help_text="e.g. Principal & CEO, Head of Department")
    qualifications = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to="staff/", blank=True, null=True)
    is_head = models.BooleanField(default=False, help_text="Is primary head/leader of this unit?")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Staff / Management Member"
        verbose_name_plural = "Staff & Management Members"
        ordering = ['order', 'full_name']

    def __str__(self):
        return f"{self.full_name} - {self.role_title}"


class OfficeImage(models.Model):
    office = models.ForeignKey(
        DepartmentOffice, 
        on_delete=models.CASCADE, 
        related_name='images'
    )
    image = models.ImageField(upload_to="offices/")
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Office / Department Gallery Image"
        verbose_name_plural = "Office / Department Gallery Images"
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.office.title} - Image {self.id}"
