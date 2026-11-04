import json
import os
import sys
import django

# 1. Update backend/branding/models.py
models_path = 'backend/branding/models.py'
with open(models_path, 'r', encoding='utf-8') as f:
    m = f.read()

m = m.replace('default="+254 716 189 084"', 'default="+254 746 525 252"')
m = m.replace('default="+254 759 437 978"', 'default="+254 746 525 252"')
m = m.replace('blank=True, default="+254 746 525 252"', 'blank=True, default=""')
with open(models_path, 'w', encoding='utf-8') as f:
    f.write(m)
print("Updated backend/branding/models.py")

# 2. Update backend/initial_data.json
initial_data_path = 'backend/initial_data.json'
with open(initial_data_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

if 'branding' in data:
    data['branding']['helpline_phone'] = "+254 746 525 252"
    data['branding']['helpline_phone_alt'] = ""
    data['branding']['whatsapp_number'] = "+254 746 525 252"

with open(initial_data_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)
print("Updated backend/initial_data.json")

# 3. Update backend/branding/management/commands/seed_tvet_data.py
seed_path = 'backend/branding/management/commands/seed_tvet_data.py'
if os.path.exists(seed_path):
    with open(seed_path, 'r', encoding='utf-8') as f:
        s = f.read()
    s = s.replace("+254 716 189 084", "+254 746 525 252")
    s = s.replace("+254 759 437 978", "+254 746 525 252")
    with open(seed_path, 'w', encoding='utf-8') as f:
        f.write(s)
    print("Updated seed_tvet_data.py")

# 4. Update the active database record in SQLite
sys.path.insert(0, os.path.abspath('backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tvet_backend.settings')
django.setup()
from branding.models import SiteBranding
b = SiteBranding.objects.first()
if b:
    b.helpline_phone = "+254 746 525 252"
    b.helpline_phone_alt = ""
    b.whatsapp_number = "+254 746 525 252"
    b.save()
    print(f"Updated live database record: helpline={b.helpline_phone}, whatsapp={b.whatsapp_number}")

# 5. Update src/components/AdmissionsCTASection.jsx
cta_path = 'src/components/AdmissionsCTASection.jsx'
with open(cta_path, 'r', encoding='utf-8') as f:
    cta = f.read()
cta = cta.replace('254759437978', '254746525252')
cta = cta.replace('+254716189084', '+254746525252')
cta = cta.replace('+254 716 189 084', '+254 746 525 252')
with open(cta_path, 'w', encoding='utf-8') as f:
    f.write(cta)
print("Updated AdmissionsCTASection.jsx")

# 6. Update src/pages/ContactPage.jsx
contact_path = 'src/pages/ContactPage.jsx'
with open(contact_path, 'r', encoding='utf-8') as f:
    cp = f.read()
cp = cp.replace('254759437978', '254746525252')
cp = cp.replace('+254759437978', '+254746525252')
cp = cp.replace('+254 716 189 084 / +254 759 437 978', '+254 746 525 252')
cp = cp.replace('+254 716 189 084', '+254 746 525 252')
cp = cp.replace('+254 759 437 978', '+254 746 525 252')
with open(contact_path, 'w', encoding='utf-8') as f:
    f.write(cp)
print("Updated ContactPage.jsx")

# 7. Update src/pages/DownloadsPage.jsx
dl_path = 'src/pages/DownloadsPage.jsx'
with open(dl_path, 'r', encoding='utf-8') as f:
    dl = f.read()
dl = dl.replace('+254759437978', '+254746525252')
with open(dl_path, 'w', encoding='utf-8') as f:
    f.write(dl)
print("Updated DownloadsPage.jsx")

