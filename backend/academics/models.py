from django.db import models

class AcademicDepartment(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=100, unique=True)
    short_label = models.CharField(max_length=100, blank=True, help_text="e.g. ELECTRICAL & ELECTRONICS")
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Academic Department"
        verbose_name_plural = "Academic Departments"
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Program(models.Model):
    QUALIFICATION_CHOICES = [
        ('Artisan', 'Artisan Certificate (KNQF Level 4)'),
        ('Certificate', 'Craft Certificate (KNQF Level 5)'),
        ('Diploma', 'Diploma (KNQF Level 6)'),
        ('Higher Diploma', 'Higher Diploma (KNQF Level 7)'),
        ('Short Course', 'Professional Short Course'),
    ]

    department = models.ForeignKey(
        AcademicDepartment, 
        on_delete=models.CASCADE, 
        related_name='programs'
    )
    slug = models.SlugField(max_length=150, unique=True)
    code = models.CharField(max_length=50, help_text="e.g. EEE6101")
    title = models.CharField(max_length=255)
    qualification_level = models.CharField(max_length=60, default='Diploma')
    knqf_level = models.CharField(max_length=60, default='KNQF Level 6')
    duration = models.CharField(max_length=60, default='3 Years')
    exam_board = models.CharField(max_length=100, default='TVET CDACC / KNEC')
    exam_board_detail = models.CharField(max_length=150, blank=True, default='CDACC / KNEC Accredited')
    badge_type = models.CharField(max_length=30, blank=True, default='info')
    
    # Intakes (stored as JSON array, e.g. ["Jan", "May", "Sept"])
    intakes = models.JSONField(default=list, blank=True)
    
    min_requirement = models.TextField(
        help_text="e.g. KCSE Mean Grade C- (Minus) with D+ in Mathematics & Physics"
    )
    practical_ratio = models.CharField(max_length=60, default='70% Practical / 30% Theory')
    pathways = models.TextField(blank=True)
    overview = models.TextField(blank=True)

    # Syllabus modules and careers as JSON arrays
    modules = models.JSONField(default=list, blank=True, help_text="List of curriculum modules")
    career_opportunities = models.JSONField(default=list, blank=True, help_text="List of career paths")

    brochure = models.FileField(upload_to="programs/brochures/", blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Academic Program / Course"
        verbose_name_plural = "Academic Programs & Courses"
        ordering = ['order', 'title']

    def __str__(self):
        return f"{self.title} ({self.code})"
