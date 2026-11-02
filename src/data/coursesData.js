// Master Catalog Data for Courses, Qualifications & Academic Departments
// Fully compliant with KNQF (Kenya National Qualifications Framework) and TVET CDACC / KNEC Standards
// Modern Institutional Palette (Deep Green, Clean White, Warm Amber, Slate)

export const courseCategories = [
  { id: 'all', label: 'All Courses' },
  { id: 'electrical', label: 'Electrical & Solar' },
  { id: 'automotive', label: 'Automotive & Mechanical' },
  { id: 'building', label: 'Building & Civil' },
  { id: 'ict-business', label: 'ICT & Business Studies' },
  { id: 'agriculture', label: 'Agriculture & Applied Sciences' },
  { id: 'hospitality', label: 'Hospitality & Management' },
];

export const allCatalogCourses = [
  // ==========================================
  // 1. ELECTRICAL & ELECTRONIC ENGINEERING
  // ==========================================
  {
    id: 'electrical-diploma',
    code: 'EEE6101',
    department: 'electrical',
    deptLabel: 'ELECTRICAL & ELECTRONICS',
    title: 'Diploma in Electrical & Electronic Engineering (Power Option)',
    qualificationLevel: 'Diploma',
    knqfLevel: 'KNQF Level 6',
    duration: '3 Years',
    examBoard: 'TVET CDACC / KNEC',
    badgeType: 'info',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCSE Mean Grade C- (Minus) with D+ in Mathematics & Physics',
    practicalRatio: '70% Practical / 30% Theory',
    examBoardDetail: 'CDACC / KNEC Accredited',
    pathways: 'Power Transmission, Substation Automation, Solar Mini-grids, Industrial PLC Systems.',
    overview: 'Advanced engineering programme equipping trainees with comprehensive design, installation, automated control, and testing skills for heavy electrical machinery, renewable solar-wind power grids, programmable logic controllers (PLCs), and high-voltage transmission networks.',
    modules: [
      'Advanced Electrical Machines & Three-Phase Power',
      'Industrial Automation, SCADA & PLC Programming',
      'High-Voltage Transmission & Switchgear Protection',
      'Solar Photovoltaic Grid-Tie Engineering (EPRA T3)',
      'Power Electronics, Inverters & Variable Drives',
      'Engineering Mathematics & Computer-Aided Circuit Design (CAD)'
    ],
    careerOpportunities: [
      'Substation Automation & Control Engineer',
      'Industrial Plant Electrical Supervisor',
      'Grid-Tie Solar Installation Project Manager',
      'Power Transmission Maintenance Inspector'
    ]
  },
  {
    id: 'electrical-craft',
    code: 'EEE5101',
    department: 'electrical',
    deptLabel: 'ELECTRICAL & ELECTRONICS',
    title: 'Craft Certificate in Electrical & Electronics Engineering',
    qualificationLevel: 'Craft',
    knqfLevel: 'KNQF Level 5',
    duration: '2 Years',
    examBoard: 'KNEC / CDACC Approved',
    badgeType: 'info',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCSE Mean Grade D (Plain) or Artisan Pass',
    epraLicensing: 'Class C1 / T2 Preparation',
    practicalRatio: '75% Workshop Practice',
    fieldPlacement: 'Local Energy Subcontractors',
    pathways: 'Domestic & Industrial Installation, Solar Micro-grid Tech, EPRA Wireman.',
    overview: 'This program equips trainees with both theoretical foundation and hands-on skills required to install, inspect, test, and maintain high and low voltage electrical wiring systems, industrial motor automation, renewable solar photovoltaic power setups, and smart grid automation in line with EPRA regulations.',
    modules: [
      'Single & 3-Phase Installation & Conduit Wiring',
      'Solar Photovoltaic Design & Installation (EPRA T2)',
      'Electrical Machines, Star-Delta & Motor Starters',
      'Electrical Engineering Drawing & Wiring Schematics',
      'Industrial Power Electronic Circuits & Relays',
      'Occupational Safety & EPRA Certification Standards'
    ],
    careerOpportunities: [
      'Licensed EPRA Electrical Wireman (Class C1)',
      'Industrial Maintenance Electrician',
      'Solar PV Installation Specialist',
      'Power Distribution Line Technician'
    ]
  },
  {
    id: 'electrical-artisan',
    code: 'EEE4101',
    department: 'electrical',
    deptLabel: 'ELECTRICAL & ELECTRONICS',
    title: 'Artisan in Electrical Installation & Solar PV',
    qualificationLevel: 'Artisan',
    knqfLevel: 'KNQF Level 4',
    duration: '1 Year',
    examBoard: 'NITA / TVET CDACC',
    badgeType: 'warning',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCPE Certificate or KCSE Open Entry',
    practicalRatio: '85% Workshop Hands-On',
    pathways: 'Domestic House Wiring, Solar PV System Assembly, Backup Inverter Installation.',
    overview: 'Foundational vocational certificate covering residential conduit wiring, lighting distribution boards, single-phase sockets, earthing arrangements, and small-scale off-grid solar home systems for homes and shops.',
    modules: [
      'Basic Domestic Electrical Installation',
      'Single-Phase Testing & Earthing Verification',
      'Off-Grid Solar PV Panels & Battery Banks',
      'Electrical Workshop Tools & Safety Regulations',
      'Basic Technical Drawing & Circuit Tracing'
    ],
    careerOpportunities: [
      'Certified Residential Wireman',
      'Rural Solar Home Systems Installer',
      'Appliance Repair Assistant',
      'Independent Electrical Handyman'
    ]
  },

  // ==========================================
  // 2. MECHANICAL & AUTOMOTIVE ENGINEERING
  // ==========================================
  {
    id: 'automotive-diploma',
    code: 'AUT6104',
    department: 'automotive',
    deptLabel: 'MECHANICAL & AUTOMOTIVE',
    title: 'Diploma in Automotive Engineering',
    qualificationLevel: 'Diploma',
    knqfLevel: 'KNQF Level 6',
    duration: '3 Years',
    examBoard: 'KNEC / CDACC',
    badgeType: 'purple',
    intakes: ['Jan', 'May'],
    minRequirement: 'KCSE C- (Minus) or Craft Pass',
    workshopFocus: 'OBD Computer Diagnostics',
    industrialAttachment: 'NTSA / Dealership Garages',
    practicalRatio: '70% Bay Workshop & Garage',
    pathways: 'Motor Vehicle Diagnostics, Heavy Commercial Fleet Maintenance, Workshop Management.',
    overview: 'Specialized technical training covering engine rebuilds, computerized OBD-II electronic diagnostics, automatic and manual transmission overhauls, commercial vehicle air brake pneumatics, and computerized fleet management systems.',
    modules: [
      'Electronic Engine Management & OBD-II Diagnostics',
      'Automotive Transmission, Gearboxes & Differential',
      'Auto Electrical & ECU Sensor Calibration',
      'Heavy Machinery & Tractor Fleet Servicing',
      'Automotive Air Conditioning & Climate Systems',
      'Workshop Management & Fleet Service Operations'
    ],
    careerOpportunities: [
      'Computerized Vehicle Diagnostic Specialist',
      'Automotive Fleet Service Manager',
      'Motor Vehicle Inspector / Evaluator',
      'Dealership Senior Service Technician'
    ]
  },
  {
    id: 'automotive-craft',
    code: 'AUT5102',
    department: 'automotive',
    deptLabel: 'MECHANICAL & AUTOMOTIVE',
    title: 'Craft Certificate in Motor Vehicle Mechanics',
    qualificationLevel: 'Craft',
    knqfLevel: 'KNQF Level 5',
    duration: '2 Years',
    examBoard: 'KNEC / CDACC',
    badgeType: 'purple',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCSE Mean Grade D (Plain) or Artisan Pass',
    practicalRatio: '75% Garage & Engine Bays',
    pathways: 'Engine Overhaul, Suspension Tuning, Brake Hydraulics, Garage Workshop Operations.',
    overview: 'Comprehensive hands-on training in petrol and diesel engine disassembly, cylinder head reconditioning, brake hydraulics, manual gearbox repairs, steering alignment, and auto-electrical maintenance.',
    modules: [
      'Petrol & Diesel Engine Rebuilding',
      'Hydraulic Braking & ABS Systems',
      'Vehicle Steering & Suspension Geometry',
      'Starting & Charging Auto-Electrical Systems',
      'Automotive Maintenance Welding & Lathe Machining',
      'Garage Safety & Customer Vehicle Appraisal'
    ],
    careerOpportunities: [
      'Certified Motor Vehicle Mechanic',
      'Fleet Maintenance Technician',
      'Workshop Bay Supervisor',
      'Independent Auto Garage Owner'
    ]
  },
  {
    id: 'welding-artisan',
    code: 'WLD4101',
    department: 'automotive',
    deptLabel: 'MECHANICAL & METALLURGY',
    title: 'Artisan in Welding & Fabrication',
    qualificationLevel: 'Artisan',
    knqfLevel: 'KNQF Level 4',
    duration: '1 Year',
    examBoard: 'NITA / CDACC',
    badgeType: 'purple',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCPE or KCSE Open Entry',
    equipment: 'Industrial Inverter Machines',
    employmentFocus: 'Metal Fabrication & Forge',
    handsOnRatio: '80% Metalwork & Forge Practice',
    pathways: 'Structural Engineering, Fabrication Workshops, Pipeline Installation, Self-Employed Metal Studio.',
    overview: 'Heavy hands-on industrial training in metal preparation, oxy-acetylene flame cutting, electric arc welding, MIG/MAG & TIG precision welding, structural truss fabrication, and steel gate and tank fabrication.',
    modules: [
      'Manual Shielded Metal Arc Welding (SMAW)',
      'MIG/MAG & TIG Specialized Welding',
      'Gas Cutting & Metal Preparation',
      'Sheet Metal Work & Pattern Development',
      'Structural Steel Fabrication & Assembly',
      'Workshop OSHA Safety & Welding Inspection'
    ],
    careerOpportunities: [
      'Industrial Certified Welder (SMAW/MIG)',
      'Structural Steel Fabricator',
      'Pipeline Welder Assistant',
      'Independent Fabrication Shop Proprietor'
    ]
  },

  // ==========================================
  // 3. BUILDING & CIVIL ENGINEERING
  // ==========================================
  {
    id: 'building-diploma',
    code: 'BLD6101',
    department: 'building',
    deptLabel: 'BUILDING & CIVIL',
    title: 'Diploma in Building Technology & Civil Works',
    qualificationLevel: 'Diploma',
    knqfLevel: 'KNQF Level 6',
    duration: '3 Years',
    examBoard: 'TVET CDACC / KNEC',
    badgeType: 'warning',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCSE Mean Grade C- (Minus) or Craft Pass',
    practicalRatio: '70% Construction Yard & CAD Lab',
    pathways: 'Structural Surveying, Site Management, Quantity Estimation, Concrete Design.',
    overview: 'Professional training in civil engineering supervision, reinforced concrete structural analysis, computer-aided architectural detailing (ArchiCAD/AutoCAD), site soil testing, highway construction basics, and public works tendering.',
    modules: [
      'Structural Design & Reinforced Concrete Mechanics',
      'Computer-Aided Architectural Drawing (CAD/BIM)',
      'Land Surveying & GPS Geodesy',
      'Building Economics & Bills of Quantities (BOQ)',
      'Soil Mechanics & Foundation Engineering',
      'National Construction Authority (NCA) Site Regulations'
    ],
    careerOpportunities: [
      'NCA Certified Construction Site Clerk / Agent',
      'Civil Engineering Assistant Inspector',
      'Quantity Surveying Assistant',
      'Building Project Supervisor'
    ]
  },
  {
    id: 'building-craft',
    code: 'BLD5102',
    department: 'building',
    deptLabel: 'BUILDING & CIVIL',
    title: 'Craft Certificate in Building Technology / Masonry',
    qualificationLevel: 'Craft',
    knqfLevel: 'KNQF Level 5',
    duration: '2 Years',
    examBoard: 'KNEC / CDACC / NITA',
    badgeType: 'warning',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCSE D (Plain) or Artisan Pass',
    ncaAccreditation: 'Eligible for NCA Site Clerk',
    projectWork: 'Site Construction Practicals',
    labFacilities: 'Concrete Testing & Level Survey',
    pathways: 'Residential Construction, Municipal Infrastructure, General Building Contracting.',
    overview: 'Hands-on practical training covering reinforced concrete construction, brick masonry, structural surveying, architectural drawing, quantity takeoff, and site supervising in compliance with National Construction Authority (NCA) guidelines.',
    modules: [
      'Bricklaying & Structural Block Masonry',
      'Reinforced Concrete Frameworks & Formwork',
      'Building Drawing & Architectural Detailing',
      'Site Levelling, Setting Out & Survey Instruments',
      'Building Quantities & Cost Estimating',
      'Materials Quality Testing & Curing Protocols'
    ],
    careerOpportunities: [
      'Registered NCA Construction Site Supervisor',
      'Structural Masonry Contractor',
      'Building Materials & Concrete Inspector',
      'CAD Draftsperson & Quantity Estimator'
    ]
  },
  {
    id: 'plumbing-artisan',
    code: 'PLB4101',
    department: 'building',
    deptLabel: 'BUILDING SERVICES',
    title: 'Artisan in Plumbing and Pipe Fitting',
    qualificationLevel: 'Artisan',
    knqfLevel: 'KNQF Level 4',
    duration: '1 Year',
    examBoard: 'CDACC / NITA',
    badgeType: 'warning',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCPE or KCSE Any Grade',
    progression: 'Direct to Craft Level 5',
    certification: 'CDACC Level 4 Certificate',
    handsOnRatio: '80% Practical Trench & Piping',
    pathways: 'Commercial Plumbing, Municipal Water Works, Solar Water Heating Installation.',
    overview: 'Entry-level vocational training teaching sanitary pipework, drainage systems, water supply piping, pipe bending, fixture installations, and pressurized water reticulation systems for domestic and commercial facilities.',
    modules: [
      'Cold & Hot Water Reticulation Systems',
      'Drainage, Soil Waste & Vent Piping',
      'Sanitary Appliances Installation & Servicing',
      'Pipe Jointing, Welding & Threading',
      'Solar Water Heating Integration',
      'Water Pumps, Valves & Pressure Testing'
    ],
    careerOpportunities: [
      'Certified Residential Plumber',
      'Municipal Water & Sewerage Line Technician',
      'Solar Water Heating Installer',
      'Building Maintenance Pipefitter'
    ]
  },

  // ==========================================
  // 4. ICT & BUSINESS STUDIES
  // ==========================================
  {
    id: 'ict-diploma',
    code: 'ICT6102',
    department: 'ict-business',
    deptLabel: 'ICT & INFORMATICS',
    title: 'Diploma in Information Communication Technology',
    qualificationLevel: 'Diploma',
    knqfLevel: 'KNQF Level 6',
    duration: '3 Years',
    examBoard: 'TVET CDACC / KNEC',
    badgeType: 'info',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCSE Mean Grade C- (Minus)',
    attachment: 'Mandatory 3 Months',
    practicalRatio: '70% Practical / 30% Theory',
    examBoardDetail: 'CDACC / KNEC Accredited',
    pathways: 'Systems Support, Network Admin, Cloud Infrastructure, Database Analyst.',
    overview: 'Our comprehensive Diploma in Information Communication Technology provides cutting-edge digital training in cloud computing, network engineering, systems administration, modern cybersecurity protocols, and database management.',
    modules: [
      'Operating Systems & Computer Architecture',
      'Cisco LAN/WAN Network Infrastructure & Routing',
      'Database Design & Management (SQL/NoSQL)',
      'Web Technologies & Cloud Computing Architectures',
      'Cybersecurity Principles & Incident Defense',
      'Mobile Application & Enterprise Software Dev'
    ],
    careerOpportunities: [
      'Junior Systems & Network Administrator',
      'Cloud Infrastructure Support Technician',
      'Enterprise Database Assistant',
      'ICT Technical Support Team Lead'
    ]
  },
  {
    id: 'ict-craft',
    code: 'ICT5101',
    department: 'ict-business',
    deptLabel: 'ICT & INFORMATICS',
    title: 'Craft Certificate in Information Technology',
    qualificationLevel: 'Craft',
    knqfLevel: 'KNQF Level 5',
    duration: '2 Years',
    examBoard: 'KNEC / CDACC',
    badgeType: 'info',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCSE Mean Grade D (Plain)',
    practicalRatio: '75% Computer Lab Hands-On',
    pathways: 'Hardware Maintenance, Network Cabling, Desktop Support, Web Maintenance.',
    overview: 'Hands-on practical IT course covering PC assembly and troubleshooting, structured network cabling, client operating systems installation, office productivity automation, and entry-level website design.',
    modules: [
      'Computer Hardware Assembly & Repair',
      'Local Area Networking (LAN Cabling & Switches)',
      'Operating Systems Installation & Driver Config',
      'Web Page Authoring (HTML/CSS & CMS Platforms)',
      'Database Fundamentals & Spreadsheet Automation',
      'ICT Customer Service & Helpdesk Ethics'
    ],
    careerOpportunities: [
      'IT Support & Helpdesk Technician',
      'Network Cable Installation Specialist',
      'Computer Repair & Maintenance Assistant',
      'Digital Cyber Cafe / Bureau Proprietor'
    ]
  },
  {
    id: 'business-diploma',
    code: 'BSM6101',
    department: 'ict-business',
    deptLabel: 'BUSINESS & COMMERCE',
    title: 'Diploma in Business Management & Accounting',
    qualificationLevel: 'Diploma',
    knqfLevel: 'KNQF Level 6',
    duration: '3 Years',
    examBoard: 'KNEC / CDACC / KASNEB',
    badgeType: 'info',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCSE C- (Minus) or Craft Pass',
    softwareSkills: 'QuickBooks, ERP & Sage',
    creditExemption: 'Direct Transfer to University',
    practical: 'Computerized Accounting Lab',
    pathways: 'Microfinance Banking, Public Sector Supply Chain, Small Business Enterprise Ownership.',
    overview: 'Curriculum focused on enterprise management, financial accounting, procurement procedures, human resource management, digital marketing, and computerized bookkeeping packages used by modern East African firms.',
    modules: [
      'Financial Accounting & Auditing Principles',
      'Computerized Accounting (QuickBooks & Sage ERP)',
      'Business Law & Corporate Taxation',
      'Procurement, Purchasing & Supply Chain Management',
      'Principles of Marketing & Entrepreneurship',
      'Human Resource Management & Workplace Relations'
    ],
    careerOpportunities: [
      'Assistant Accountant / Accounts Payable Clerk',
      'Procurement & Inventory Officer',
      'Microfinance Loan Portfolio Officer',
      'Enterprise General Manager'
    ]
  },
  {
    id: 'business-craft',
    code: 'BSM5102',
    department: 'ict-business',
    deptLabel: 'BUSINESS & COMMERCE',
    title: 'Craft Certificate in Business Management',
    qualificationLevel: 'Craft',
    knqfLevel: 'KNQF Level 5',
    duration: '2 Years',
    examBoard: 'KNEC / CDACC',
    badgeType: 'info',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCSE D (Plain) or Artisan Pass',
    practicalRatio: 'Office Skills & Computerized Accounts',
    pathways: 'Office Clerical Administration, Storekeeping, Sales Representation, Micro-enterprise.',
    overview: 'Vocational business foundation covering office administration, stock record keeping, sales promotion, basic ledger accounting, customer relations, and business communications.',
    modules: [
      'Office Administration & Secretarial Filing',
      'Principles of Bookkeeping & Cashbooks',
      'Storekeeping & Warehousing Controls',
      'Salesmanship & Customer Care',
      'Business English & Commercial Correspondence'
    ],
    careerOpportunities: [
      'Office Administrative Clerk',
      'Storekeeper / Inventory Clerk',
      'Commercial Sales Representative',
      'Small Business Operator'
    ]
  },

  // ==========================================
  // 5. AGRICULTURE & APPLIED SCIENCES
  // ==========================================
  {
    id: 'agri-diploma',
    code: 'AGR6101',
    department: 'agriculture',
    deptLabel: 'AGRICULTURE & APPLIED',
    title: 'Diploma in Sustainable Agriculture & Extension',
    qualificationLevel: 'Diploma',
    knqfLevel: 'KNQF Level 6',
    duration: '3 Years',
    examBoard: 'TVET CDACC / KNEC',
    badgeType: 'success',
    intakes: ['Jan', 'May'],
    minRequirement: 'KCSE Mean Grade C- (Minus) with D+ in Biology/Agriculture',
    practicalRatio: '70% Greenhouse & Field Farm',
    pathways: 'Commercial Farm Management, Agribusiness Value Addition, Climate-Smart Agronomy.',
    overview: 'Comprehensive agro-ecological training covering automated drip greenhouse horticulture, commercial dairy and livestock husbandry, dryland rangeland pasture regeneration, post-harvest agro-processing, and cooperative extension management.',
    modules: [
      'Advanced Greenhouse Crop Agronomy',
      'Animal Nutrition, Dairy Processing & Health',
      'Drip Irrigation Design & Soil Fertility Conservation',
      'Agricultural Economics, Cooperative Law & Value Chains',
      'Post-Harvest Technology & Produce Quality Standards',
      'Climate-Smart Dryland Farming Innovations'
    ],
    careerOpportunities: [
      'Commercial Farm General Manager',
      'County Agricultural Extension Officer',
      'Horticultural Greenhouse Agronomist',
      'Agricultural Microfinance Credit Analyst'
    ]
  },
  {
    id: 'agri-certificate',
    code: 'AGR5102',
    department: 'agriculture',
    deptLabel: 'AGRICULTURE & BIO-RESOURCES',
    title: 'Certificate in Agriculture & Extension Services',
    qualificationLevel: 'Craft',
    knqfLevel: 'KNQF Level 5',
    duration: '2 Years',
    examBoard: 'KNEC / CDACC',
    badgeType: 'success',
    intakes: ['Jan', 'May'],
    minRequirement: 'KCSE D (Plain) or Artisan Pass',
    practicalFarm: 'Loima TVC Demonstration Greenhouse',
    capitation: 'Eligible: Direct Capitation Subsidy',
    practicalFocus: 'Pasture, Silage, Drip Tech',
    pathways: 'Agribusiness Supervisor, Cooperative Society Field Agent, Commercial Horticulture Enterprise.',
    overview: 'Practical agribusiness training focusing on climate-smart dryland farming, greenhouse horticulture, drip irrigation engineering, livestock breeding, dairy management, and agricultural value chain cooperatives.',
    modules: [
      'Crop Agronomy & Protected Greenhouse Cultivation',
      'Livestock Husbandry, Health & Dairy Nutrition',
      'Drip Irrigation Systems & Soil Conservation',
      'Pasture Management, Hay & Silage Production',
      'Agricultural Economics, Accounting & Marketing',
      'Post-Harvest Storage & Agro-Processing'
    ],
    careerOpportunities: [
      'Commercial Farm Field Manager',
      'Agricultural Cooperative Extension Officer',
      'Horticultural Greenhouse Supervisor',
      'Agro-dealer & Farm Input Consultant'
    ]
  },
  {
    id: 'agri-artisan',
    code: 'AGR4101',
    department: 'agriculture',
    deptLabel: 'AGRICULTURE & BIO-RESOURCES',
    title: 'Artisan in Agribusiness & Greenhouse Tech',
    qualificationLevel: 'Artisan',
    knqfLevel: 'KNQF Level 4',
    duration: '1 Year',
    examBoard: 'NITA / CDACC',
    badgeType: 'success',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCPE Certificate or KCSE Open Entry',
    practicalRatio: '85% Demonstration Farm & Greenhouse',
    pathways: 'Drip Line Laying, Greenhouse Vegetable Tending, Poultry Husbandry, Seedbed Nursing.',
    overview: 'Hands-on practical training in soil tillage, nursery bed preparation, greenhouse tomato and capsicum tending, poultry vaccination and rearing, and solar water pump operation.',
    modules: [
      'Nursery Preparation & Seedling Management',
      'Greenhouse Crop Tending & Trellising',
      'Basic Drip Irrigation Maintenance',
      'Smallholder Poultry & Dairy Goats Care',
      'Produce Harvesting, Packaging & Local Market Sales'
    ],
    careerOpportunities: [
      'Greenhouse Attendant / Nursery Operator',
      'Commercial Farm Field Assistant',
      'Poultry Unit Supervisor',
      'Independent Commercial Vegetable Grower'
    ]
  },

  // ==========================================
  // 6. HOSPITALITY & INSTITUTIONAL MANAGEMENT
  // ==========================================
  {
    id: 'hospitality-diploma',
    code: 'HSP6101',
    department: 'hospitality',
    deptLabel: 'HOSPITALITY MANAGEMENT',
    title: 'Diploma in Food and Beverage Management',
    qualificationLevel: 'Diploma',
    knqfLevel: 'KNQF Level 6',
    duration: '3 Years',
    examBoard: 'TVET CDACC / KNEC',
    badgeType: 'info',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCSE Mean Grade C- (Minus)',
    practicalRatio: '70% Commercial Training Kitchen',
    pathways: 'Executive Chef, Food & Beverage Controller, Hotel Catering Manager, Banquet Operations.',
    overview: 'High-grade hospitality culinary and service training covering continental culinary preparation, food costing and beverage controls, formal banquet operations, wine service, HACCP food hygiene protocols, and resort kitchen management.',
    modules: [
      'Continental & African Culinary Arts (Practical Kitchen)',
      'Food & Beverage Service, Bar Operations & Mixology',
      'Food Costing, Purchasing & Menu Engineering',
      'HACCP Food Safety, Nutrition & Hygiene Regulations',
      'Hospitality Front Office & Property Management Systems',
      'Hotel Human Resource & Banquet Event Management'
    ],
    careerOpportunities: [
      'Hotel Food & Beverage Department Manager',
      'Executive Sous Chef / Head Caterer',
      'Institutional Dining Services Supervisor',
      'Catering Business & Restaurant Entrepreneur'
    ]
  },
  {
    id: 'hospitality-craft',
    code: 'HSP5101',
    department: 'hospitality',
    deptLabel: 'HOSPITALITY MANAGEMENT',
    title: 'Craft Certificate in Catering and Accommodation Operations',
    qualificationLevel: 'Craft',
    knqfLevel: 'KNQF Level 5',
    duration: '2 Years',
    examBoard: 'KNEC / CDACC',
    badgeType: 'info',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCSE Mean Grade D (Plain) or Artisan Pass',
    practicalRatio: '75% Practical Kitchen & Housekeeping',
    pathways: 'Commercial Cookery, Guest House Supervision, Buffet Setup, Housekeeping Operations.',
    overview: 'Practical culinary and guest accommodation training in hot and cold meal preparation, baking and pastry fundamentals, dining room table styling, room servicing, laundry management, and hospitality customer care.',
    modules: [
      'Commercial Cookery & Pastry Preparation',
      'Food & Beverage Table Service & Table Etiquette',
      'Accommodation Operations & Guest Housekeeping',
      'Laundry Operations & Chemical Safety',
      'Food Hygiene, Nutrition & Kitchen Safety'
    ],
    careerOpportunities: [
      'Head Cook / Chef de Partie',
      'Dining Room Captain / Waiter Lead',
      'Hotel Housekeeping Supervisor',
      'Outside Catering & Event Cook'
    ]
  },
  {
    id: 'hospitality-artisan',
    code: 'HSP4101',
    department: 'hospitality',
    deptLabel: 'HOSPITALITY MANAGEMENT',
    title: 'Artisan in Food & Beverage Production and Service',
    qualificationLevel: 'Artisan',
    knqfLevel: 'KNQF Level 4',
    duration: '1 Year',
    examBoard: 'NITA / CDACC',
    badgeType: 'info',
    intakes: ['Jan', 'May', 'Sept'],
    minRequirement: 'KCPE Certificate or KCSE Open Entry',
    practicalRatio: '85% Kitchen & Service Practice',
    pathways: 'Fast Food Preparation, Baker Assistant, Dining Steward, Kitchen Commis.',
    overview: 'Entry-level culinary course teaching basic cooking techniques, vegetable cutting, soup and sauce preparation, pastry dough mixing, counter service, and sanitization standards.',
    modules: [
      'Basic Food Production & Knife Skills',
      'Pastry & Breakfast Snack Preparation',
      'Beverage Preparation (Tea, Coffee, Smoothies)',
      'Dining Counter Service & Customer Handling',
      'Kitchen Sanitation & Personal Hygiene Standards'
    ],
    careerOpportunities: [
      'Kitchen Assistant / Commis Chef',
      'Cafe Counter Barista / Attendant',
      'School / Hospital Dining Cook Assistant',
      'Fast Food / Bakery Assistant'
    ]
  }
];

// Department Definition with their respective courses grouped
export const academicDepartments = [
  {
    id: 'electrical',
    title: 'Electrical & Electronic Engineering',
    shortTitle: 'Electrical & Solar',
    icon: 'Zap',
    tagColor: '#D97706',
    tagBg: '#FFFBEB',
    description: 'Power transmission, solar photovoltaic systems, EPRA wireman licensing, and industrial motor automation.',
    courseIds: ['electrical-diploma', 'electrical-craft', 'electrical-artisan']
  },
  {
    id: 'automotive',
    title: 'Mechanical & Automotive Engineering',
    shortTitle: 'Automotive & Mechanical',
    icon: 'Car',
    tagColor: '#14462E',
    tagBg: '#F0FDF4',
    description: 'Motor vehicle electronic diagnostics, engine overhaul, heavy equipment maintenance, and MIG/TIG welding.',
    courseIds: ['automotive-diploma', 'automotive-craft', 'welding-artisan']
  },
  {
    id: 'building',
    title: 'Building & Civil Engineering',
    shortTitle: 'Building & Civil',
    icon: 'HardHat',
    tagColor: '#D97706',
    tagBg: '#FFFBEB',
    description: 'Construction technology, structural surveying, masonry formwork, concrete testing, and plumbing reticulation.',
    courseIds: ['building-diploma', 'building-craft', 'plumbing-artisan']
  },
  {
    id: 'ict-business',
    title: 'ICT & Business Studies',
    shortTitle: 'ICT & Business',
    icon: 'Monitor',
    tagColor: '#166534',
    tagBg: '#F0FDF4',
    description: 'Cloud infrastructure, Cisco networking, database administration, enterprise ERP, and financial accounting.',
    courseIds: ['ict-diploma', 'ict-craft', 'business-diploma', 'business-craft']
  },
  {
    id: 'agriculture',
    title: 'Agriculture & Applied Sciences',
    shortTitle: 'Agriculture & Bio-Resources',
    icon: 'Sprout',
    tagColor: '#166534',
    tagBg: '#F0FDF4',
    description: 'Protected greenhouse horticulture, drip irrigation systems, dairy husbandry, and agribusiness cooperatives.',
    courseIds: ['agri-diploma', 'agri-certificate', 'agri-artisan']
  },
  {
    id: 'hospitality',
    title: 'Hospitality & Institutional Management',
    shortTitle: 'Hospitality & Catering',
    icon: 'Utensils',
    tagColor: '#B45309',
    tagBg: '#FFFBEB',
    description: 'Culinary arts, food and beverage service, bar operations, accommodation management, and catering.',
    courseIds: ['hospitality-diploma', 'hospitality-craft', 'hospitality-artisan']
  }
];

export const coursesData = allCatalogCourses;
