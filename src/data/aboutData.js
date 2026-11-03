// Master Data for About Us categories and detailed options
import img_workshop from '../assets/Bright Workshop Training Room.webp';
import img_training from '../assets/Collaborative Training Room Meeting.webp';
import img_cream from '../assets/Cream Institutional Building in Dry Sunlight.webp';
import img_desert from '../assets/Desert Campus Under Blue Skies.webp';
import img_office from '../assets/Focused Office Training Session.webp';
import img_sunlit from '../assets/Loima College Sunlit Facade.webp';
import img_exterior from '../assets/Lomia Technical College Exterior.webp';
import img_concrete from '../assets/Sunlit Concrete Office Building.webp';
import img_walkway from '../assets/Sunlit School Building with Covered Walkway.webp';
// Balanced Branding: Institutional Green (#14462E / #2E8B57), Crisp White (#FFFFFF), Warm Orange/Amber (#F59E0B)

export const aboutCategories = [
  {
    id: 'general-info',
    title: 'General Information',
    shortDesc: 'Institutional profile, statutory charter, campus life and public communications',
    color: '#FFA500',
  },
  {
    id: 'administrators',
    title: 'Administrators',
    shortDesc: 'Executive governance, institutional leadership and statutory boards',
    color: '#2E8B57',
  },
  {
    id: 'academic-depts',
    title: 'Academic Departments',
    shortDesc: 'Accredited faculties delivering TVET CDACC & KNEC practical programmes',
    color: '#FFA500',
  },
  {
    id: 'non-academic-depts',
    title: 'Non Academic Departments',
    shortDesc: 'Trainee support, industrial liaison, quality assurance and corporate services',
    color: '#2E8B57',
  },
];

export const aboutItems = [
  // ==========================================
  // 1. GENERAL INFORMATION
  // ==========================================
  {
    id: 'our-history',
    categoryId: 'general-info',
    categoryName: 'General Information',
    title: 'Our History',
    subtitle: 'From a Visionary Community Initiative to a Premier National TVET Centre of Excellence',
    description: `Loima Technical and Vocational College (LTVC) was established by the Government of Kenya through the Ministry of Education, State Department for Technical and Vocational Training, to address the pressing demand for high-grade technical and vocational skills in Turkana County and the wider Northern Kenyan region.

Founded as a flagship TVET institution under Kenya Vision 2030, the college broke ground with ultra-modern mechanical workshops, electrical laboratories, and ICT infrastructure. Since opening its gates, Loima TVC has transformed from an initial cohort into a thriving multi-disciplinary technical college offering fully accredited Artisan, Craft Certificate, and Diploma qualifications under TVET CDACC, KNEC, and NITA curricula.`,
    mandates: [
      'Empower Northern Kenya youth with market-demanded hands-on competencies.',
      'Bridge the industrial workforce gap through Competency-Based Education and Training (CBET).',
      'Foster inclusive socio-economic development, self-employment, and entrepreneurship.',
      'Maintain full statutory compliance with TVETA and the KNQF qualification framework.'
    ],
    highlights: [
      { label: 'Year Established', value: '2021' },
      { label: 'Registration', value: 'TVETA/PUBLIC/TVC/2021' },
      { label: 'Campus Acreage', value: '35+ Acres' },
      { label: 'Trainee Capacity', value: '1,500+ Trainees' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=900&q=80',
        caption: 'The main administrative and academic complex of Loima TVC.'
      },
      {
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
        caption: 'Foundational trainee intake during orientation and matriculation.'
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
        caption: 'Commissioning of advanced technical workshop equipment.'
      }
    ],
    contactInfo: 'Main Campus: Lodwar - Loima Road, Turkana County | Email: info@loimatvc.ac.ke',
    actionText: 'View Academic Catalog',
    actionRoute: 'courses'
  },
  {
    id: 'service-charter',
    categoryId: 'general-info',
    categoryName: 'General Information',
    title: 'Service Charter',
    subtitle: 'Our Statutory Commitment to Timely, Transparent, and Accountable Public Service',
    description: `The Loima Technical and Vocational College Citizens Service Delivery Charter outlines our operational standards, service turnaround guarantees, trainee entitlements, and public service pledges under the Constitution of Kenya (2010) and the Public Service Commission standards.

We are dedicated to delivering prompt, courteous, and non-discriminatory service to prospective trainees, guardians, industry partners, and the public. Every department is held to strict performance metrics to ensure maximum satisfaction and operational integrity.`,
    mandates: [
      'Admission application processing within 24 business hours.',
      'Issuance of official receipts and fee statements immediately upon bank reconciliation.',
      'Processing of academic transcripts within 14 days following official examination release.',
      'Response to public inquiries and official correspondence within 48 hours.'
    ],
    highlights: [
      { label: 'Admission Processing', value: '< 24 Hours' },
      { label: 'Fee Statement Issuance', value: 'Instant' },
      { label: 'Transcript Delivery', value: '14 Days' },
      { label: 'Customer Satisfaction', value: '98.4%' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80',
        caption: 'Admissions and Customer Service Desk at the Registrar’s office.'
      },
      {
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
        caption: 'Statutory performance tracking and service quality evaluation.'
      }
    ],
    contactInfo: 'Service Quality Helpdesk: service@loimatvc.ac.ke | Tel: +254 700 000 000',
    actionText: 'Download Official Charter',
    actionRoute: 'downloads'
  },
  {
    id: 'brochures',
    categoryId: 'general-info',
    categoryName: 'General Information',
    title: 'Loima TVC Brochures',
    subtitle: 'Comprehensive Course Prospectuses, Fee Guidelines, and Student Handbooks',
    description: `Explore the complete collection of Loima TVC publications. Our annual brochure packs detail admission criteria for Government-sponsored (KUCCPS) and Self-sponsored trainees, course outlines across all engineering and business faculties, capitation breakdown, accommodation guides, and industrial attachment partnerships.

All prospectuses are regularly updated to reflect the latest TVET CDACC curriculum releases, Ministry of Education fee regulations, and HELB funding allocations.`,
    mandates: [
      'Detailed breakdowns of Artisan, Craft Certificate, and Diploma curricula.',
      'Comprehensive step-by-step KUCCPS placement and inter-institutional transfer instructions.',
      'Transparent schedule of fees showing Government Capitation subsidies.',
      'Full campus map, hostel guidelines, and code of conduct.'
    ],
    highlights: [
      { label: 'Edition', value: '2024 - 2026' },
      { label: 'Document Format', value: 'Printable PDF' },
      { label: 'Programmes Listed', value: '15+ Courses' },
      { label: 'Circulation', value: 'Verified Official' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
        caption: 'Official course guides and student information brochures.'
      },
      {
        url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80',
        caption: 'Trainees reviewing curriculum options during the academic intake fair.'
      }
    ],
    contactInfo: 'Admissions Resource Center: admissions@loimatvc.ac.ke',
    actionText: 'Download Brochure (PDF)',
    actionRoute: 'downloads'
  },
  {
    id: 'gallery',
    categoryId: 'general-info',
    categoryName: 'General Information',
    title: 'Gallery',
    subtitle: 'Vibrant Pictorial Journey Across Workshops, Campus Facilities, and Student Life',
    description: `Step inside the daily life of Loima Technical and Vocational College. Our gallery showcases the state-of-the-art training environments where trainees acquire real-world mastery—from heavy welding and fabrication bays to modern computer labs, electrical testing rigs, greenhouse farming, and athletics fields.

Witness our trainees in action as they build prototypes, conduct site surveying, practice culinary arts, and engage in co-curricular competitions.`,
    mandates: [
      'Visual documentation of modern industrial workshop equipment in active use.',
      'Highlighting trainee achievements in TVET trade fairs and robotic exhibitions.',
      'Capturing vibrant co-curricular life: football tournaments, choir, and cultural festivals.',
      'Showcasing institutional visits from the Ministry of Education and TVETA auditors.'
    ],
    highlights: [
      { label: 'Workshops Photographed', value: '4+ Specialist Bays' },
      { label: 'Campus Facilities', value: 'ICT, Farm & Fields' },
      { label: 'Student Cohorts', value: '1,000+ Active' },
      { label: 'Exhibitions Won', value: 'Regional TVET Fair' }
    ],
    images: [
      { url: img_workshop,  caption: 'Bright workshop training room — hands-on industrial skills in action.' },
      { url: img_training,  caption: 'Collaborative training session with students and instructors.' },
      { url: img_cream,     caption: 'Cream institutional building bathed in dry sunlight.' },
      { url: img_desert,    caption: 'Campus grounds under clear blue skies.' },
      { url: img_office,    caption: 'Focused office training session in the ICT & Business lab.' },
      { url: img_sunlit,    caption: 'Loima College sunlit main facade and entrance.' },
      { url: img_exterior,  caption: 'Lomia Technical College exterior view.' },
      { url: img_concrete,  caption: 'Sunlit administration block and office building.' },
      { url: img_walkway,   caption: 'School building with covered walkway connecting departments.' },
    ],
    contactInfo: 'Media & Public Relations Desk: media@loimatvc.ac.ke',
    actionText: 'Explore Campus Showcase',
    actionRoute: 'home'
  },
  {
    id: 'contact-us',
    categoryId: 'general-info',
    categoryName: 'General Information',
    title: 'Contact Us',
    subtitle: 'Direct Channels to Our Admissions Desk, Registrar, and Campus Headquarters',
    description: `We welcome prospective trainees, parents, guardians, and corporate partners to visit our main campus or reach out through our official direct channels. Our admissions team is on standby to assist with course selection, KUCCPS inter-institutional transfers, hostel bookings, and fee payment arrangements.

Our campus is conveniently situated along the main Loima - Doldol road, with reliable all-weather access, secure parking, and visitor reception facilities.`,
    mandates: [
      'Prompt response to telephone and WhatsApp admissions enquiries (Mon-Fri 8am-5pm).',
      'Guided campus and workshop walkthrough tours for visiting prospective students.',
      'Immediate resolution of registry correspondence and student status verifications.',
      'Direct coordination with high school career teachers for secondary outreach.'
    ],
    highlights: [
      { label: 'Campus Address', value: 'P.O. Box 50 - 20321, Loima' },
      { label: 'Admissions Line', value: '+254 759 437 978' },
      { label: 'WhatsApp Helpdesk', value: '+254 711 000 000' },
      { label: 'Office Hours', value: 'Mon - Fri (8:00 AM - 5:00 PM)' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
        caption: 'Main administration gateway and visitor reception center.'
      },
      {
        url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=900&q=80',
        caption: 'Customer service desk welcoming parents and new applicants.'
      }
    ],
    contactInfo: 'Postal Address: P.O. Box 50 - 20321, Lodwar - Loima Road, Turkana County | Email: info@loimatvc.ac.ke',
    actionText: 'Express Course Enquiry',
    actionRoute: 'home'
  },
  {
    id: 'complaints-feedback',
    categoryId: 'general-info',
    categoryName: 'General Information',
    title: 'Complaints & Feedback',
    subtitle: 'Transparent Public Redress Mechanism and Continuous Quality Improvement',
    description: `Loima TVC upholds an open-door policy and a zero-tolerance approach to maladministration, corruption, or substandard service. In accordance with Commission on Administrative Justice (Ombudsman) directives, our Complaints and Feedback Office provides a safe, anonymous, and expedited channel for trainees, staff, and the community to voice concerns.

Every submission is logged into the official complaint registry, investigated objectively, and resolved within statutory timelines with written feedback provided to the complainant.`,
    mandates: [
      'Guaranteed acknowledgment of all received complaints within 24 working hours.',
      'Fair, confidential, and impartial resolution of trainee grievances and examination disputes.',
      'Continuous quarterly reporting to the Commission on Administrative Justice (CAJ).',
      'Regular implementation of stakeholder suggestions for service delivery enhancements.'
    ],
    highlights: [
      { label: 'Acknowledgment', value: 'Within 24 Hours' },
      { label: 'Resolution Window', value: '5 - 7 Working Days' },
      { label: 'Confidentiality', value: '100% Protected' },
      { label: 'Ombudsman Compliance', value: 'Fully Certified' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=900&q=80',
        caption: 'Customer feedback and service evaluation desk.'
      },
      {
        url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80',
        caption: 'Grievance committee conducting an objective review session.'
      }
    ],
    contactInfo: 'Ombudsman Desk: feedback@loimatvc.ac.ke | Confidential Hotline: +254 759 437 978',
    actionText: 'Contact Registrar Desk',
    actionRoute: 'home'
  },

  // ==========================================
  // 2. ADMINISTRATORS
  // ==========================================
  {
    id: 'board-of-governors',
    categoryId: 'administrators',
    categoryName: 'Administrators',
    title: 'Board of Governors',
    subtitle: 'Strategic Governance, Institutional Stewardship, and Policy Direction',
    description: `The Board of Governors (BOG) is the supreme governing body of Loima Technical and Vocational College, established pursuant to the Technical and Vocational Education and Training Act No. 29 of 2013. Comprising distinguished leaders from industry, academia, public administration, and community stakeholders, the Board provides visionary strategic oversight.

The Board is responsible for institutional resource mobilization, approving capital infrastructure developments, safeguarding institutional financial solvency, and formulating policies that align the college with national industrialization priorities.`,
    mandates: [
      'Formulate and approve the college 5-year Strategic Plan and annual operational budgets.',
      'Supervise executive management and assess institutional performance indicators.',
      'Ensure prudent financial stewardship, statutory audit adherence, and public procurement integrity.',
      'Strengthen industrial partnerships and resource mobilization for campus expansion.'
    ],
    highlights: [
      { label: 'Governing Authority', value: 'TVET Act No. 29 (2013)' },
      { label: 'Board Committees', value: 'Audit, Finance, Academic & HR' },
      { label: 'Meeting Cycle', value: 'Quarterly Regular Sessions' },
      { label: 'Chairperson', value: 'Appointed by Cabinet Secretary' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80',
        caption: 'Board of Governors convening for strategic policy deliberation.'
      },
      {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
        caption: 'Board members inspecting new mechanical engineering workshop equipment.'
      }
    ],
    contactInfo: 'Office of the Secretary to the Board: bog@loimatvc.ac.ke',
    actionText: 'Learn More About Governance',
    actionRoute: 'home'
  },
  {
    id: 'office-of-principal',
    categoryId: 'administrators',
    categoryName: 'Administrators',
    title: 'Office of Principal',
    subtitle: 'Chief Executive Leadership, Academic Vision, and Strategic Execution',
    description: `The Principal is the Chief Executive Officer and academic leader of Loima Technical and Vocational College, serving as the Secretary to the Board of Governors. The Principal is charged with the overall operational leadership, academic excellence, TVETA regulatory compliance, and fiscal management of the institution.

Working closely with the Ministry of Education and TVET CDACC, the Principal spearheads institutional modernization, curriculum delivery, and the establishment of sustainable industry linkages that guarantee high employment outcomes for our graduates.`,
    mandates: [
      'Provide visionary executive leadership and maintain institutional academic excellence.',
      'Ensure strict adherence to national TVET quality standards, KNQF guidelines, and TVETA licensing.',
      'Oversee institutional budget execution, asset preservation, and human resource development.',
      'Act as the chief public representative of the college to the Government, county authorities, and donors.'
    ],
    highlights: [
      { label: 'Executive Role', value: 'Principal & CEO' },
      { label: 'Statutory Body', value: 'Secretary to BOG' },
      { label: 'Administrative Base', value: 'Central Administration Block' },
      { label: 'Direct Oversight', value: 'All Academic & Support Divisions' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80',
        caption: 'The Principal presiding over the annual institutional review.'
      },
      {
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
        caption: 'Principal’s executive boardroom during an industrial partner signing.'
      }
    ],
    contactInfo: 'Executive Office: principal@loimatvc.ac.ke | Switchboard: +254 700 000 000',
    actionText: 'View College Leadership',
    actionRoute: 'home'
  },
  {
    id: 'deputy-principal-admin',
    categoryId: 'administrators',
    categoryName: 'Administrators',
    title: 'Office of Deputy Principal Administration',
    subtitle: 'Institutional Operations, Human Resources, Infrastructure, and Security',
    description: `The Office of the Deputy Principal (Administration) is the nerve center for campus operations, resource management, and institutional logistics. This office manages human resources, campus physical infrastructure, fleet logistics, procurement coordination, estate security, and non-teaching staff welfare.

Through proactive maintenance schedules and modern facility management, the office ensures an optimal, safe, and productive teaching and learning environment across the 35+ acre campus.`,
    mandates: [
      'Coordinate institutional staff recruitment, capacity development, and performance appraisal.',
      'Supervise campus physical development, building maintenance, water, and power installations.',
      'Ensure 24/7 security of trainees, staff, and institutional assets across campus grounds.',
      'Manage transport fleet, workshop consumable supplies, and environmental cleanliness.'
    ],
    highlights: [
      { label: 'Operational Scope', value: 'HR, Estates & Infrastructure' },
      { label: 'Campus Safety', value: '24/7 Guarded & Monitored' },
      { label: 'Staff Managed', value: 'Teaching & Support Personnel' },
      { label: 'Facility Readiness', value: '100% Operational Standards' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
        caption: 'Administrative coordination center and human resources wing.'
      },
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
        caption: 'Campus facilities and infrastructure management command.'
      }
    ],
    contactInfo: 'Email: dpa@loimatvc.ac.ke | Location: Administration Block, 1st Floor',
    actionText: 'Explore Campus Facilities',
    actionRoute: 'home'
  },
  {
    id: 'deputy-principal-academics',
    categoryId: 'administrators',
    categoryName: 'Administrators',
    title: 'Office of Deputy Principal Academics',
    subtitle: 'Curriculum Implementation, Examination Integrity, and Faculty Development',
    description: `The Office of the Deputy Principal (Academics) steers the educational core of the college. This office is tasked with curriculum implementation, timetable coordination, faculty supervision, academic quality audits, and statutory collaboration with examination bodies including TVET CDACC, KNEC, and NITA.

Under its stewardship, Loima TVC maintains a rigorous Competency-Based Education and Training (CBET) framework that combines 70% practical workshop immersion with 30% theory, ensuring trainees achieve complete occupational competence.`,
    mandates: [
      'Plan, monitor, and evaluate the delivery of all approved TVET training programs.',
      'Coordinate continuous assessments, internal moderation, and national examination schedules.',
      'Ensure faculty members are certified in CBET methodologies and industry pedagogy.',
      'Supervise academic departments and drive trainee academic performance.'
    ],
    highlights: [
      { label: 'Curriculum Model', value: 'CBET (70% Practical)' },
      { label: 'Examination Partners', value: 'TVET CDACC, KNEC, NITA' },
      { label: 'Departments Overseen', value: '5 Academic Divisions' },
      { label: 'Academic Completion Rate', value: '96.2%' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80',
        caption: 'Academic board meeting on curriculum delivery and evaluation.'
      },
      {
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
        caption: 'Academic department heads assessing student practical projects.'
      }
    ],
    contactInfo: 'Email: dpa.academics@loimatvc.ac.ke | Tel: +254 759 437 978',
    actionText: 'Explore Accredited Courses',
    actionRoute: 'courses'
  },
  {
    id: 'office-of-registrar',
    categoryId: 'administrators',
    categoryName: 'Administrators',
    title: 'Office of Registrar',
    subtitle: 'Admissions Gateway, Trainee Records, KUCCPS Liaison, and Certification',
    description: `The Office of the Registrar (Academic & Administrative Affairs) is the primary contact point for all trainees from admission through graduation. The office oversees student onboarding, KUCCPS placement verification, trainee registration numbers, class rolls, fee clearance verification, and the issuance of official transcripts and certificates.

The Registrar also acts as the official institutional liaison with statutory regulatory bodies including the Kenya National Qualifications Authority (KNQA) and TVETA.`,
    mandates: [
      'Manage the end-to-end trainee admission pipeline for Government and Self-sponsored cohorts.',
      'Process KUCCPS placement lists, transfers, and annual intake data.',
      'Maintain secure, confidential, and digitized permanent student academic records.',
      'Coordinate the issuance of official completion letters, academic transcripts, and certificates.'
    ],
    highlights: [
      { label: 'Annual Trainee Intake', value: '3 Intakes (Jan, May, Sep)' },
      { label: 'Record Digitization', value: '100% Online Registry' },
      { label: 'Turnaround Time', value: 'Same-day Admission Letters' },
      { label: 'Statutory Stamp', value: 'Official Registrar Seal' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
        caption: 'Registrar desk processing new trainee verification documents.'
      },
      {
        url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80',
        caption: 'Digitized student archive and official transcript authentication.'
      }
    ],
    contactInfo: 'Email: admissions@loimatvc.ac.ke | Phone: +254 759 437 978',
    actionText: 'Apply via Courses Catalog',
    actionRoute: 'courses'
  },
  {
    id: 'office-of-dean-of-trainees',
    categoryId: 'administrators',
    categoryName: 'Administrators',
    title: 'Office of Dean of Trainees',
    subtitle: 'Student Welfare, Hostel Accommodation, Mentorship, and Student Governance',
    description: `The Office of the Dean of Trainees champions the holistic welfare, personal development, and residential comfort of every student at Loima TVC. This office coordinates the Trainee Governing Council, hostel accommodation, dining hall services, psycho-social counseling, health and wellness services, and club activities.

The Dean works in close harmony with student leaders to maintain campus harmony, organize mentorship forums, and nurture trainees into responsible, disciplined professionals ready to excel in industry.`,
    mandates: [
      'Supervise campus student accommodation and coordinate approved private hostel partners.',
      'Facilitate democratic Trainee Council elections and advise student leadership.',
      'Provide professional and confidential guidance, counseling, and mental health support.',
      'Organize cultural days, talent showcases, and community volunteer outreaches.'
    ],
    highlights: [
      { label: 'Student Governance', value: 'Elected Trainee Council' },
      { label: 'Hostel Coverage', value: 'On-Campus & Approved Hostels' },
      { label: 'Clubs & Societies', value: '12+ Active Student Guilds' },
      { label: 'Wellness Services', value: 'Free Student Counseling' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
        caption: 'Trainee council representatives meeting with the Dean of Trainees.'
      },
      {
        url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80',
        caption: 'Student mentorship session and career orientation event.'
      }
    ],
    contactInfo: 'Dean of Trainees Desk: dean.trainees@loimatvc.ac.ke | Location: Student Centre',
    actionText: 'Download Joining Instructions',
    actionRoute: 'downloads'
  },

  // ==========================================
  // 3. ACADEMIC DEPARTMENTS
  // ==========================================
  {
    id: 'ict-business',
    categoryId: 'academic-depts',
    categoryName: 'Academic Departments',
    title: 'ICT and Business Studies',
    subtitle: 'Computing Systems, Software Development, Accounting, and Enterprise Management',
    description: `The Department of ICT and Business Studies bridges technological mastery with enterprise management. Our state-of-the-art computer laboratories are equipped with high-speed fiber internet, server racks, and licensed development software to prepare trainees for the digital economy.

The department offers courses in Information Communication Technology, Business Management, Accounting, Human Resource Management, and Computerized Secretarial Studies, equipping graduates to launch tech enterprises or manage corporate operations.`,
    mandates: [
      'Equip trainees with industry-standard software programming, database, and network skills.',
      'Train professional accountants, procurement specialists, and enterprise managers.',
      'Integrate artificial intelligence, cloud computing, and digital literacy across all training.',
      'Facilitate incubation of tech startups and student digital innovations.'
    ],
    highlights: [
      { label: 'Programs Offered', value: 'Diploma, Craft & Artisan' },
      { label: 'Lab Capacity', value: '40+ High-End Workstations' },
      { label: 'Certifications', value: 'KNEC, TVET CDACC, KASNEB' },
      { label: 'Attachment Rate', value: '100% Industry Placement' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
        caption: 'Trainees working in the Ultra-Modern Computer Laboratory.'
      },
      {
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80',
        caption: 'Business and accounting trainees conducting financial simulations.'
      }
    ],
    contactInfo: 'Head of Department: hod.ict@loimatvc.ac.ke',
    actionText: 'View ICT & Business Courses',
    actionRoute: 'courses'
  },
  {
    id: 'hospitality-management',
    categoryId: 'academic-depts',
    categoryName: 'Academic Departments',
    title: 'Hospitality and Institutional Management',
    subtitle: 'Culinary Arts, Food & Beverage Production, Housekeeping, and Event Management',
    description: `The Department of Hospitality and Institutional Management prepares trainees for dynamic careers in the global tourism, hotel, and institutional catering sectors. Training is conducted in standard commercial training kitchens, mock hotel guest suites, and pastry bakeries.

Students gain hands-on expertise in international gastronomy, food safety and hygiene (HACCP), front office operations, mixology, housekeeping, and large-scale catering management.`,
    mandates: [
      'Master professional culinary arts, baking, and international cuisine preparation.',
      'Deliver world-class service training in restaurant, banqueting, and front office operations.',
      'Instill rigorous food safety, nutrition, and institutional management standards.',
      'Partner with top safari lodges, hotels, and airlines for trainee attachments.'
    ],
    highlights: [
      { label: 'Facilities', value: 'Commercial Training Kitchen & Mock Suite' },
      { label: 'Specializations', value: 'Food & Beverage, Housekeeping, Bakery' },
      { label: 'Exam Bodies', value: 'TVET CDACC & KNEC' },
      { label: 'Industry Links', value: 'Leading Hotels & Eco-Lodges' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80',
        caption: 'Hospitality trainees during practical culinary baking session.'
      },
      {
        url: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=900&q=80',
        caption: 'Food and beverage service practicals in the training restaurant.'
      }
    ],
    contactInfo: 'Head of Department: hod.hospitality@loimatvc.ac.ke',
    actionText: 'Explore Hospitality Courses',
    actionRoute: 'courses'
  },
  {
    id: 'electrical-electronic',
    categoryId: 'academic-depts',
    categoryName: 'Academic Departments',
    title: 'Electrical and Electronic Engineering',
    subtitle: 'Power Systems, Industrial Automation, Solar PV Technology, and Building Wiring',
    description: `The Department of Electrical and Electronic Engineering produces skilled electrical technologists and technicians. Featuring dedicated power distribution trainers, AC/DC motor benches, and solar PV demonstration rigs, the department provides comprehensive training.

Trainees are prepared for direct EPRA (Energy and Petroleum Regulatory Authority) electrical worker licensing, enabling them to execute domestic and industrial installations, transformer maintenance, and renewable energy projects.`,
    mandates: [
      'Provide comprehensive practical training in domestic, commercial, and industrial electrical wiring.',
      'Train solar photovoltaic installers aligned with national clean energy targets.',
      'Prepare trainees for EPRA Class C, B, and A statutory licensing examinations.',
      'Master electric motor maintenance, rewinding, switchgear, and PLC automation.'
    ],
    highlights: [
      { label: 'Licensing Alignment', value: 'EPRA Class T1, T2 & C' },
      { label: 'Workshop Rigs', value: 'Industrial Power & Solar PV' },
      { label: 'Qualification Levels', value: 'Artisan, Craft & Diploma' },
      { label: 'Industry Demands', value: 'Renewable Energy & Manufacturing' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80',
        caption: 'Trainees assembling industrial power distribution boards.'
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
        caption: 'Electrical workshop testing bench and oscilloscope analysis.'
      }
    ],
    contactInfo: 'Head of Department: hod.electrical@loimatvc.ac.ke',
    actionText: 'Explore Electrical Engineering',
    actionRoute: 'courses'
  },
  {
    id: 'agriculture-applied',
    categoryId: 'academic-depts',
    categoryName: 'Academic Departments',
    title: 'Department of Agriculture and Applied Sciences',
    subtitle: 'Climate-Smart Farming, Agribusiness Value Addition, Animal Health, and Irrigation',
    description: `Positioned in the agricultural heartbeat of Turkana County, the Department of Agriculture and Applied Sciences champions modern, climate-smart agriculture and sustainable food systems. The department manages a dedicated demonstration farm, modern greenhouses, and drip irrigation installations.

Students receive rigorous training in crop production, livestock husbandry, post-harvest handling, agribusiness management, veterinary technology, and soil nutrient analysis.`,
    mandates: [
      'Teach modern drip irrigation and climate-resilient crop farming methods.',
      'Equip trainees with livestock breeding, dairy management, and veterinary skills.',
      'Train agribusiness entrepreneurs in product processing and market value addition.',
      'Provide extension services and agricultural advisory to local farming communities.'
    ],
    highlights: [
      { label: 'Demonstration Farm', value: 'Active Greenhouses & Drip Fields' },
      { label: 'Key Programs', value: 'General Agriculture, Agribusiness' },
      { label: 'Exam Board', value: 'TVET CDACC & KNEC' },
      { label: 'Field Practicals', value: 'Daily Hands-On Farm Exposure' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900&q=80',
        caption: 'Agricultural trainees inspecting high-yield crops under greenhouse cultivation.'
      },
      {
        url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80',
        caption: 'Field demonstration of computerized drip irrigation and soil testing.'
      }
    ],
    contactInfo: 'Head of Department: hod.agri@loimatvc.ac.ke',
    actionText: 'Explore Agriculture Courses',
    actionRoute: 'courses'
  },
  {
    id: 'building-civil',
    categoryId: 'academic-depts',
    categoryName: 'Academic Departments',
    title: 'Building & Civil Engineering',
    subtitle: 'Structural Masonry, Plumbing, Architectural Draughting, and Surveying',
    description: `The Department of Building & Civil Engineering equips trainees to build Kenya’s critical infrastructure. With outdoor construction yards, surveying gear, and plumbing test installations, trainees gain practical mastery in masonry, architectural design, pipefitting, concrete technology, and road construction.

Graduates gain accreditation through the National Construction Authority (NCA) and secure employment with major construction firms, county governments, and water companies.`,
    mandates: [
      'Develop skilled craftsmen in structural masonry, bricklaying, and plastering.',
      'Provide practical mastery of residential and municipal plumbing, drainage, and solar water heating.',
      'Train architectural draughting using modern CAD software and computerized surveying levels.',
      'Foster independent construction contractors accredited under the NCA framework.'
    ],
    highlights: [
      { label: 'Regulatory Alignment', value: 'National Construction Authority (NCA)' },
      { label: 'Facilities', value: 'Masonry Yard & Plumbing Bays' },
      { label: 'Software Tools', value: 'AutoCAD, Structural Modeling' },
      { label: 'Course Levels', value: 'Artisan, Craft & Diploma' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=900&q=80',
        caption: 'Building technology trainees constructing brickwork and structural foundations.'
      },
      {
        url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
        caption: 'Plumbing and pipefitting trainees testing pressurized hydraulic lines.'
      }
    ],
    contactInfo: 'Head of Department: hod.civil@loimatvc.ac.ke',
    actionText: 'Explore Building & Civil Courses',
    actionRoute: 'courses'
  },

  // ==========================================
  // 4. NON ACADEMIC DEPARTMENTS
  // ==========================================
  {
    id: 'sports-recreation',
    categoryId: 'non-academic-depts',
    categoryName: 'Non Academic Departments',
    title: 'Sports and Recreation Office',
    subtitle: 'Physical Fitness, Inter-TVET Athletics, Co-Curricular Excellence, and Wellness',
    description: `The Sports and Recreation Office coordinates physical health, sporting championships, and recreational life at Loima TVC. The college maintains football pitches, volleyball courts, netball courts, and indoor games facilities.

Our teams participate actively in the Kenya Association of Technical Training Institutions (KATTI) regional and national athletics, ball games, and cultural competitions, winning laurels and fostering teamwork and discipline among trainees.`,
    mandates: [
      'Organize competitive sports teams in football, volleyball, athletics, and basketball.',
      'Coordinate participation in KATTI regional and national TVET sports championships.',
      'Promote daily fitness, wellness, and recreational activities for all trainees and staff.',
      'Provide leadership and talent scouting opportunities for gifted student athletes.'
    ],
    highlights: [
      { label: 'Facilities', value: 'Football Pitch, Volleyball & Netball' },
      { label: 'Championship Association', value: 'KATTI TVET Games' },
      { label: 'Active Disciplines', value: '8+ Competitive Sports' },
      { label: 'Annual Trophies', value: 'Regional Athletics Winners' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80',
        caption: 'Loima TVC trainees competing in regional TVET track and field events.'
      },
      {
        url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=900&q=80',
        caption: 'Campus football and team fitness training sessions.'
      }
    ],
    contactInfo: 'Sports Officer: sports@loimatvc.ac.ke',
    actionText: 'Explore Campus Life',
    actionRoute: 'home'
  },
  {
    id: 'industrial-liaison',
    categoryId: 'non-academic-depts',
    categoryName: 'Non Academic Departments',
    title: 'Industrial Liaison Office',
    subtitle: 'Mandatory Industrial Attachments, Corporate Partnerships, and Workplace Placements',
    description: `The Industrial Liaison Office (ILO) bridges the classroom with actual industry. It coordinates mandatory 3-month industrial attachments for all trainees prior to graduation, securing placements across leading manufacturing firms, engineering agencies, agribusiness conglomerates, and government parastatals.

The office also manages trainee workplace insurance (WIBA), organizes on-site supervisor assessments, and builds long-term memoranda of understanding (MOUs) with national employers.`,
    mandates: [
      'Facilitate 100% industrial attachment placement for all eligible Craft and Diploma trainees.',
      'Administer statutory group personal accident and WIBA workplace insurance coverage.',
      'Coordinate faculty supervision visits and employer attachment assessment rubrics.',
      'Formulate industry MoUs for apprenticeship, dual training, and graduate hiring.'
    ],
    highlights: [
      { label: 'Attachment Guarantee', value: '100% Supervised Placement' },
      { label: 'Attachment Period', value: 'Minimum 3 Months (1 Term)' },
      { label: 'Corporate Partners', value: '50+ Industrial Hosts' },
      { label: 'Insurance Policy', value: 'Full WIBA Trainee Cover' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
        caption: 'Trainees undergoing industrial apprenticeship at an engineering partner plant.'
      },
      {
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
        caption: 'Industrial liaison officer signing an MOU with corporate partners.'
      }
    ],
    contactInfo: 'Liaison Officer: ilo@loimatvc.ac.ke | Direct: +254 759 437 978',
    actionText: 'Download Attachment Logbook',
    actionRoute: 'downloads'
  },
  {
    id: 'career-services',
    categoryId: 'non-academic-depts',
    categoryName: 'Non Academic Departments',
    title: 'Office of Career Services',
    subtitle: 'Employability Training, Resume Clinics, Mock Interviews, and Job Placement',
    description: `The Office of Career Services (OCS) empowers trainees to transition seamlessly from graduation to rewarding careers. Established under Ministry of Education guidelines, the OCS hosts regular career days, resume-writing workshops, soft skills bootcamps, and mock interview sessions.

The office maintains an active employer database and graduate tracking network, connecting Loima TVC alumni directly to job opportunities in the private sector and public civil service.`,
    mandates: [
      'Conduct regular professional CV writing, digital branding, and interview preparation clinics.',
      'Organize the annual Loima TVC Career & Innovation Fair with invited corporate recruiters.',
      'Track alumni employment destinations and maintain graduate employer feedback loops.',
      'Deliver entrepreneurial mentorship for trainees seeking to establish independent businesses.'
    ],
    highlights: [
      { label: 'Placement Support', value: 'Direct Employer Referral' },
      { label: 'Annual Career Fairs', value: 'Over 30 Participating Employers' },
      { label: 'Alumni Network', value: 'Graduates Working Nationally' },
      { label: 'Work Readiness Workshops', value: 'Conducted Every Term' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80',
        caption: 'Career advisor conducting a one-on-one interview preparation session.'
      },
      {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
        caption: 'Students attending the annual Loima TVC corporate recruitment forum.'
      }
    ],
    contactInfo: 'Career Services Advisor: careers@loimatvc.ac.ke',
    actionText: 'View Academic Programmes',
    actionRoute: 'courses'
  },
  {
    id: 'quality-assurance',
    categoryId: 'non-academic-depts',
    categoryName: 'Non Academic Departments',
    title: 'Quality Assurance & Standards Office',
    subtitle: 'Institutional Audits, TVETA Compliance, CBET Benchmarking, and Evaluation',
    description: `The Quality Assurance and Standards (QAS) Office safeguards the educational and operational excellence of the college. Acting as an internal watchdog, the office carries out regular internal quality audits of training facilities, lecturer lesson plans, practical assessment scoring, and student satisfaction.

The office ensures Loima TVC continually complies with TVETA licensing conditions, ISO standards, and the Kenya National Qualifications Framework (KNQF) requirements.`,
    mandates: [
      'Conduct continuous internal academic and administrative audits across all departments.',
      'Monitor curriculum delivery to ensure 100% adherence to TVET CDACC CBET standards.',
      'Administer confidential end-of-term trainee feedback and lecturer evaluation surveys.',
      'Lead institutional preparations for external TVETA and statutory regulatory inspections.'
    ],
    highlights: [
      { label: 'Statutory Standards', value: 'TVETA Registered & Certified' },
      { label: 'Quality Audit Cycle', value: 'Termly Internal Inspections' },
      { label: 'Curriculum Audit', value: '100% CBET Alignment' },
      { label: 'Customer Satisfaction', value: 'Evaluated & Documented' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
        caption: 'Quality Assurance team conducting an academic standards review.'
      },
      {
        url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=900&q=80',
        caption: 'Inspection of workshop safety protocols and practical rubrics.'
      }
    ],
    contactInfo: 'Director of Quality Assurance: qas@loimatvc.ac.ke',
    actionText: 'View Accreditation Notice',
    actionRoute: 'downloads'
  },
  {
    id: 'finance-office',
    categoryId: 'non-academic-depts',
    categoryName: 'Non Academic Departments',
    title: 'Finance Office',
    subtitle: 'Fee Administration, Government Capitation, HELB Disbursements, and Budgeting',
    description: `The Finance Office manages the financial integrity, accounting, and revenue systems of Loima TVC. Responsible for trainee fee billing, the office ensures transparent management of the annual Government Capitation subsidy per student, HELB TVET loan and bursary disbursements, and NG-CDF tuition sponsorships.

Trainees and parents receive timely financial receipts, fee payment installment reconciliations, and clearance statements via secure institutional accounts.`,
    mandates: [
      'Process trainee tuition fees, capitation remittances, and HELB loan statements.',
      'Provide instant receipts and digitized clearance statements for registered students.',
      'Ensure strict adherence to the Public Finance Management (PFM) Act and statutory audits.',
      'Liaise with national banks (KCB) and M-Pesa paybill channels for secure fee remittance.'
    ],
    highlights: [
      { label: 'Government Capitation', value: 'MOE Approved Subsidy' },
      { label: 'Bank Partner', value: 'Kenya Commercial Bank (KCB)' },
      { label: 'M-Pesa Paybill', value: 'Verified Official Gateway' },
      { label: 'Fee Clearance', value: 'Real-Time Verification' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80',
        caption: 'Finance team balancing tuition ledgers and trainee bursary accounts.'
      },
      {
        url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=900&q=80',
        caption: 'Accounts desk issuing official receipts and fee statements.'
      }
    ],
    contactInfo: 'Accounts Desk: finance@loimatvc.ac.ke | Location: Admin Block Ground Floor',
    actionText: 'View Approved Fee Structure',
    actionRoute: 'downloads'
  },
  {
    id: 'performance-contracting',
    categoryId: 'non-academic-depts',
    categoryName: 'Non Academic Departments',
    title: 'Performance Contracting Office',
    subtitle: 'Institutional Target Setting, Public Service Evaluation, and Compliance Reporting',
    description: `The Performance Contracting Office steers the college’s compliance with the Government of Kenya Performance Contracting guidelines for State Corporations and Tertiary Institutions.

The office cascades annual ministerial targets to all academic and non-academic departments, monitors quarterly milestone delivery, and prepares statutory performance reports submitted to the Ministry of Education and the Public Service Commission.`,
    mandates: [
      'Negotiate and execute the annual Performance Contract with the Ministry of Education.',
      'Cascade performance deliverables to departments and individual staff workplans.',
      'Conduct quarterly internal performance evaluations and statutory compliance reviews.',
      'Spearhead continual institutional productivity and public service delivery enhancements.'
    ],
    highlights: [
      { label: 'Target Framework', value: 'Annual Ministerial Contract' },
      { label: 'Evaluation Cycle', value: 'Quarterly & Annual Review' },
      { label: 'Performance Rating', value: 'Very Good (Public Service Benchmark)' },
      { label: 'Oversight Body', value: 'Public Service Commission' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80',
        caption: 'Performance contracting committee deliberating on quarterly targets.'
      },
      {
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
        caption: 'Institutional performance reporting and documentation review.'
      }
    ],
    contactInfo: 'Performance Officer: pc@loimatvc.ac.ke',
    actionText: 'View Service Charter',
    actionRoute: 'downloads'
  },
  {
    id: 'examinations-timetabling',
    categoryId: 'non-academic-depts',
    categoryName: 'Non Academic Departments',
    title: 'Examinations & Timetabling Office',
    subtitle: 'National Examination Administration, KNEC/CDACC Registrations, and Schedules',
    description: `The Examinations and Timetabling Office is responsible for the scheduling, organization, and administration of all internal and national examinations. The office oversees candidate registration with KNEC, TVET CDACC, and NITA, manages examination secure storage, and supervises assessment rooms.

Additionally, the office drafts the master teaching and workshop usage timetables each term, ensuring balanced facility utilization across all faculties without scheduling clashes.`,
    mandates: [
      'Register all eligible trainees for national KNEC, TVET CDACC, and NITA examinations.',
      'Manage secure handling, printing, and confidential administration of examination papers.',
      'Formulate termly master class and workshop practical timetables.',
      'Facilitate timely release of internal progress records and official national examination results.'
    ],
    highlights: [
      { label: 'National Exam Bodies', value: 'TVET CDACC, KNEC, NITA' },
      { label: 'Centre Status', value: 'Approved National Exam Centre' },
      { label: 'Timetable Scheduling', value: 'Zero-Clash Algorithm' },
      { label: 'Pass Rate', value: 'High National Performance Average' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80',
        caption: 'Trainees sitting for national certification examinations.'
      },
      {
        url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80',
        caption: 'Examination office processing official candidate registration dockets.'
      }
    ],
    contactInfo: 'Examinations Officer: exams@loimatvc.ac.ke',
    actionText: 'Check Academic Calendar',
    actionRoute: 'downloads'
  },
  {
    id: 'research-innovation',
    categoryId: 'non-academic-depts',
    categoryName: 'Non Academic Departments',
    title: 'Research & Innovation Office',
    subtitle: 'Applied Engineering Research, Prototype Incubation, Robotics, and Patenting',
    description: `The Research and Innovation Office fosters a culture of discovery, technological ingenuity, and problem-solving at Loima TVC. Trainees and trainers are supported to build practical prototypes that solve local challenges—such as solar water pumps, automated agro-sorters, waste-plastic pavers, and mobile IoT applications.

The office sponsors trainee participation in regional TVET innovation fairs, scientific conferences, and technology incubation competitions with industry mentors.`,
    mandates: [
      'Promote applied research and engineering prototyping among trainees and faculty.',
      'Organize the annual Loima TVC Trainee Innovation and Science Competition.',
      'Facilitate patenting and intellectual property (IP) protection for breakthrough inventions.',
      'Secure research grants and technical equipment sponsorships from technology partners.'
    ],
    highlights: [
      { label: 'Key Innovation Areas', value: 'Clean Energy, IoT, Agri-Tech & Automation' },
      { label: 'Annual Fair', value: 'TVET Regional Science Fair' },
      { label: 'Active Prototypes', value: 'Solar Irrigation & Waste Recovery Rigs' },
      { label: 'Mentorship', value: 'Industry Engineering Experts' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
        caption: 'Engineering trainees testing an automated robotic prototyping rig.'
      },
      {
        url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=900&q=80',
        caption: 'Student researchers demonstrating solar-powered agricultural prototypes.'
      }
    ],
    contactInfo: 'Research Coordinator: research@loimatvc.ac.ke',
    actionText: 'Explore Campus Showcase',
    actionRoute: 'home'
  }
];

