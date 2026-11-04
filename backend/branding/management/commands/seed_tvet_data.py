import json
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings
from branding.models import SiteBranding
from downloads.models import DownloadCategory, DownloadItem
from academics.models import AcademicDepartment, Program
from organization.models import DepartmentDivision, DepartmentOffice, OfficeImage

class Command(BaseCommand):
    help = "Seed database with TVET initial data from initial_data.json"

    def handle(self, *args, **options):
        data_file = Path(settings.BASE_DIR) / "initial_data.json"
        if not data_file.exists():
            self.stderr.write(self.style.ERROR(f"Data file not found at: {data_file}"))
            return

        with open(data_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        # 1. Seed Site Branding
        self.stdout.write(self.style.NOTICE("Seeding Site Branding..."))
        b_data = data.get("branding", {})
        branding, created = SiteBranding.objects.get_or_create(id=1, defaults=b_data)
        if not created:
            for k, v in b_data.items():
                setattr(branding, k, v)
            branding.save()
        self.stdout.write(self.style.SUCCESS(f"Branding initialized: {branding.institution_name}"))

        # 2. Seed Download Categories & Items
        self.stdout.write(self.style.NOTICE("Seeding Download Categories & Items..."))
        cat_map = {}
        for idx, cat in enumerate(data.get("downloadCategories", [])):
            cid = cat["id"]
            if cid == "all":
                continue
            c_obj, _ = DownloadCategory.objects.get_or_create(
                slug=cid,
                defaults={"name": cat["label"], "order": idx}
            )
            cat_map[cid] = c_obj

        for idx, doc in enumerate(data.get("downloadsData", [])):
            cat_obj = cat_map.get(doc["category"])
            if not cat_obj:
                continue
            DownloadItem.objects.update_or_create(
                code=doc.get("code", f"DOC-{idx}"),
                defaults={
                    "category": cat_obj,
                    "title": doc.get("title", ""),
                    "description": doc.get("description", ""),
                    "external_url": doc.get("downloadUrl", "#"),
                    "format": doc.get("format", "PDF"),
                    "size": doc.get("size", ""),
                    "published_date": doc.get("date", ""),
                    "order": idx,
                    "is_active": True,
                }
            )
        self.stdout.write(self.style.SUCCESS(f"Loaded {len(cat_map)} download categories and {len(data.get('downloadsData', []))} documents."))

        # 3. Seed Academic Departments & Courses
        self.stdout.write(self.style.NOTICE("Seeding Academic Courses..."))
        dept_map = {}
        for idx, ccat in enumerate(data.get("courseCategories", [])):
            cid = ccat["id"]
            if cid == "all":
                continue
            d_obj, _ = AcademicDepartment.objects.get_or_create(
                slug=cid,
                defaults={"name": ccat["label"], "order": idx}
            )
            dept_map[cid] = d_obj

        for idx, course in enumerate(data.get("allCatalogCourses", [])):
            dept_slug = course.get("department")
            dept_obj = dept_map.get(dept_slug)
            if not dept_obj:
                dept_obj, _ = AcademicDepartment.objects.get_or_create(
                    slug=dept_slug or "general",
                    defaults={"name": course.get("deptLabel", "General Studies"), "order": 99}
                )
                dept_map[dept_slug] = dept_obj

            Program.objects.update_or_create(
                slug=course["id"],
                defaults={
                    "department": dept_obj,
                    "code": course.get("code", ""),
                    "title": course.get("title", ""),
                    "qualification_level": course.get("qualificationLevel", "Diploma"),
                    "knqf_level": course.get("knqfLevel", "KNQF Level 6"),
                    "duration": course.get("duration", "3 Years"),
                    "exam_board": course.get("examBoard", "TVET CDACC / KNEC"),
                    "exam_board_detail": course.get("examBoardDetail", ""),
                    "badge_type": course.get("badgeType", "info"),
                    "intakes": course.get("intakes", ["Jan", "May", "Sept"]),
                    "min_requirement": course.get("minRequirement", ""),
                    "practical_ratio": course.get("practicalRatio", "70% Practical / 30% Theory"),
                    "pathways": course.get("pathways", ""),
                    "overview": course.get("overview", ""),
                    "modules": course.get("modules", []),
                    "career_opportunities": course.get("careerOpportunities", []),
                    "order": idx,
                    "is_active": True,
                }
            )
        self.stdout.write(self.style.SUCCESS(f"Loaded {len(dept_map)} academic disciplines and {len(data.get('allCatalogCourses', []))} courses."))

        # 4. Seed Department Divisions & Offices
        self.stdout.write(self.style.NOTICE("Seeding Divisions & Offices..."))
        div_map = {}
        for idx, div in enumerate(data.get("aboutCategories", [])):
            did = div["id"]
            d_obj, _ = DepartmentDivision.objects.get_or_create(
                slug=did,
                defaults={
                    "name": div["title"],
                    "short_desc": div.get("shortDesc", ""),
                    "color": div.get("color", "#2E8B57"),
                    "order": idx
                }
            )
            div_map[did] = d_obj

        for idx, item in enumerate(data.get("aboutItems", [])):
            div_obj = div_map.get(item.get("categoryId"))
            if not div_obj:
                continue

            office, _ = DepartmentOffice.objects.update_or_create(
                slug=item["id"],
                defaults={
                    "division": div_obj,
                    "title": item.get("title", ""),
                    "subtitle": item.get("subtitle", ""),
                    "description": item.get("description", ""),
                    "mandates": item.get("mandates", []),
                    "highlights": item.get("highlights", []),
                    "contact_info": item.get("contactInfo", ""),
                    "action_text": item.get("actionText", "Learn More"),
                    "action_route": item.get("actionRoute", "home"),
                    "order": idx,
                    "is_active": True,
                }
            )
        self.stdout.write(self.style.SUCCESS(f"Loaded {len(div_map)} divisions and {len(data.get('aboutItems', []))} offices/departments."))
        self.stdout.write(self.style.SUCCESS("All TVET site data successfully seeded into database!"))

