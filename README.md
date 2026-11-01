# Laikipia North Technical & Vocational College (LNTVC) - React Native Web Application

A modern, high-performance web platform built with **React Native (React Native Web)** replicating the complete home page, courses catalog, admissions enquiry portal, and downloads directory for **Laikipia North Technical and Vocational College**.

---

## 🌟 Pages & Architecture

### 1. Home Page (`/home`)
- **Top Notice Bar:** Emergency hotline (`+254 700 000 000`) and WhatsApp (`+254 711 000 000`).
- **Main Navigation:** Full institutional emblem, active route pills, course dropdowns, mobile drawer, and portal login avatar.
- **Hero Section:** Hands-on workshop training, 100% CBET badge, government capitation subsidy, and KUCCPS Code: `1478111`.
- **4 Key Counter Metrics:** 15+ Accredited Courses, 100% Industry Attachment, TVETA & CDACC Certified, 4+ Modern Workshops.
- **Regulatory Ribbon:** Dark accreditation ribbon (TVETA, CDACC, KNEC, HELB/KUCCPS).
- **Featured Programme Categories:** 6 interactive course cards with category tabs (*All Courses*, *Engineering*, *ICT & Hospitality*, *Agri & Civil*).
- **Institutional Advantages:** CBET practical 70% split, KSh 30,000 capitation grants, and 2x2 benefits grid.
- **Campus Life Showcase:** Photographic bays (*Electrical Bay*, *Digital Center*, *Mechanical Bay*, *Civil Yard*).
- **Academic Registry Notices:** September orientation circular, fee structures, and KUCCPS transfer guides.
- **Course & Notice Modals:** Interactive modals for curriculum syllabus and printable circular stationery.

### 2. Courses & Programmes Catalog Page (`/courses`)
- **Header:** `OFFICIAL ACADEMIC DIRECTORY • 2024/2025 Criteria` with 4 counter metrics (**100%** Practical Guaranteed, **HELB** Eligible, **3 Terms** Per Year, **CDACC** Dual Assessment).
- **Competency-Based Education (CBET) Highlight Card:** Workshop photo with `TVET CDACC CENTER #LNTVC409` badge and 70% hands-on training breakdown.
- **Search & Multi-Filter Control Center:**
  - Real-time keyword search bar (`Search by keyword...`).
  - `Export Catalog` and `Reset` action buttons.
  - 3 HTML Select Dropdowns: *Filter by Department* (6 departments), *Qualification Level* (Artisan, Craft, Diploma), and *Intake Season* (Jan, May, Sept).
  - Quick Department Pills: `All`, `ICT`, `Electrical`, `Automotive`, `Building & Civil`, `Agriculture`, `Business`.
- **Accredited Course Cards Grid:**
  - 8 accredited courses with 2-column technical specifications, career pathways, and split action buttons (`View Curriculum & Fees` + `>`).
- **Statutory Standards, Funding & Assessment Section:**
  - 4 regulatory cards: *KNQF Qualification Levels*, *Approved Fee Policy*, *HELB & HEF Funding*, and *Certification Bodies*.
- **"Ready to Forge Your Technical Future?" Banner:**
  - Dual action CTAs: `Start Application Form` and `Speak with an Admissions Advisor`.

### 3. Admissions & Online Enquiry Page (`/admissions`)
- **Page Header:** `OFFICIAL REGISTRAR PORTAL • Intake Cycle 2024 / 2025` with stat cards (**KSh 30,000** Annual Govt. Capitation, **< 24 Hrs** Direct Offer Response).
- **Prospective Trainee Application Form (Stage 1 & 2):**
  - Full Name, National ID / Birth Certificate, Primary Phone, WhatsApp Number with "Same as phone" autofill, Email, and KCSE/KCPE Mean Grade dropdown.
  - Programme of Interest dropdown matching TVETA & CDACC accredited courses.
  - Interactive intake selectors (`Sept 2024`, `Jan 2025`, `May 2025`).
  - Sponsorship mode selectors (`KUCCPS Govt.`, `Self-Sponsored`).
  - Support inquiries multiline textarea.
  - **Live Dynamic Capitation & Upfront Fee Estimate:** Real-time calculation showing net trainee balance (KSh 28,420/Yr after deducting KSh 30,000 govt capitation).
  - Submit online application with automated reference code generation (`LNTVC-XXXXXX`).
  - Instant WhatsApp direct hotline button.
- **Hands-on Technical Environment Card:** State-of-the-art practical training preview with `TVET CDACC WORKSHOP` badge.
- **Admissions Office Contacts Card:** Direct Liaison Desk with active helpline (`+254 759 437 978`), application inbox, physical address (Rumuruti / Doldol Rd), and campus entrance map preview.
- **KUCCPS 4-Step Application Guide:** Step-by-step guidance for government-placed students with institution code `1478111`.
- **HELB & TVET Funding Model:** 3-step guide for tuition scholarships and M-Pesa upkeep allowance.
- **Interactive Admissions FAQ Accordion:** Expandable answers for entry grades, hostel accommodations, and required document checklists.
- **Official 2024 Joining Packet Banner:** One-click download card for medical forms, rules, and fee schedules (PDF • 2.4 MB).

### 4. Downloads & Official Documents Page (`/downloads`)
- **Page Header:** `• REGISTRAR ACADEMIC & ADMINISTRATIVE AFFAIRS` with 3 metrics (**8** Core Circulars, **100%** TVETA Verified, **2026** Current Syllabus).
- **Search & Category Filter Ribbon:**
  - Real-time document keyword search bar.
  - Category filter pills: *All Documents*, *Application Forms*, *Fee Structures*, *Rules & Regulations*, *Academic Calendars*, *TVETA & CDACC Accreditation*.
- **Official Download Cards Grid (8 Core Documents):**
  1. *2026/2027 Student Application & Admission Form* (PDF • 420 KB)
  2. *Official Fee Structure – Government Sponsored (KUCCPS) 2026* (PDF • 280 KB)
  3. *Official Fee Structure – Self-Sponsored Students 2026* (PDF • 295 KB)
  4. *TVETA Institutional Registration & Accreditation Certificate* (PDF • 1.2 MB)
  5. *Trainee Code of Conduct and Campus Regulations 2026* (PDF • 510 KB)
  6. *Academic Year Calendar & Intake Schedule* (PDF • 180 KB)
  7. *Medical Examination Form for New Students* (PDF • 210 KB)
  8. *Industrial Attachment Logbook & Guidelines* (PDF • 650 KB)
- **Digital Document Validation & KUCCPS Reporting Banner:**
  - Trainee verification notice with barcode header security and main gate QR scanner advisory.
  - Registration staff photo.
- **Accreditation Notice Card:**
  - Registration `TVETA/PUBLIC/TVC/2021`, TVET CDACC Certified, and KNQF Level 3-6 certification guarantee.
- **Download Helpdesk & Admissions Support Card:**
  - Dedicated ICT helpdesk hotline, registrar email, WhatsApp document desk, and campus collection hours.
- **Joining Document Checklist Card:**
  - Verified physical registration docket checklist (KCSE slips, National ID, passport photos, medical forms).

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

- Click **"Downloads"** in the top navigation bar to explore the Downloads page.
- Click **"Courses & Programmes"** to view the Courses Catalog.
- Click **"Admissions"** or **"Apply / Enquire Now"** to view the Admissions & Online Enquiry portal.
- Click **"Home"** or the **College Logo** to return to the Home page.

### Production Build
```bash
npm run build
```
Preview production build:
```bash
npm run preview
```
