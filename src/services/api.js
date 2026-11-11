import { downloadCategories as fallbackDownloadCategories, downloadsData as fallbackDownloads } from '../data/downloadsData';
import { courseCategories as fallbackCourseCategories, allCatalogCourses as fallbackCourses } from '../data/coursesData';
import { aboutCategories as fallbackAboutCategories, aboutItems as fallbackAboutItems } from '../data/aboutData';

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    // If running locally in Vite dev server (e.g. localhost:5173), route to Django port 8000
    if (window.location.port === '5173' || window.location.port === '3000') {
      return 'http://127.0.0.1:8000/api/v1';
    }
    // In production on VPS, Nginx handles /api/ routing directly
    return `${window.location.origin}/api/v1`;
  }
  return 'http://127.0.0.1:8000/api/v1';
};

const API_BASE_URL = getApiBaseUrl();

async function fetchJson(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// ----------------------------------------------------
// 1. BRANDING & SITE CONFIG
// ----------------------------------------------------
export async function fetchBranding() {
  try {
    return await fetchJson('/branding/');
  } catch (err) {
    console.warn('Backend unavailable, using default branding:', err.message);
    return {
      institution_name: 'Loima Technical and Vocational College',
      short_name: 'LOIMA',
      acronym_badge: 'TVC',
      tagline: 'TECHNICAL & VOCATIONAL COLLEGE',
      sub_tagline: 'Centre of Excellence in Technical & Vocational Training',
      primary_color: '#2E8B57',
      primary_dark: '#14462E',
      accent_color: '#F59E0B',
      accent_hover: '#D97706',
      helpline_phone: '+254 746 525 252',
      helpline_phone_alt: '',
      whatsapp_number: '+254 746 525 252',
      email_info: 'info@loima-tvc.ac.ke',
      email_principal: 'principal@loima-tvc.ac.ke',
      physical_location: 'Lorugum Campus (~1.5 km off Lodwar–Uganda Road), Loima Sub-County, Turkana County',
      po_box: 'P.O. Box 123 - 30500, Lodwar, Kenya',
      tveta_license_number: 'TVETA/PUBLIC/TVC/0005/2023',
      admissions_notice: 'Intakes: January, May & September | Apply via KUCCPS or Campus Office in Lorugum',
      logo_url: null,
    };
  }
}

// ----------------------------------------------------
// 2. DOWNLOADS
// ----------------------------------------------------
export async function fetchDownloadCategories() {
  try {
    const data = await fetchJson('/downloads/categories/');
    return [
      { id: 'all', label: 'All Documents' },
      ...data.map(c => ({ id: c.slug, label: c.name, count: c.document_count }))
    ];
  } catch (err) {
    console.warn('Backend unavailable, using fallback download categories:', err.message);
    return fallbackDownloadCategories;
  }
}

export async function fetchDownloads({ category = 'all', search = '' } = {}) {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search && search.trim()) params.append('search', search.trim());
    
    const query = params.toString() ? `?${params.toString()}` : '';
    const items = await fetchJson(`/downloads/${query}`);
    
    return items.map(doc => ({
      id: `doc-${doc.id}`,
      backendId: doc.id,
      category: doc.category_slug,
      format: doc.format || 'PDF',
      size: doc.size || 'N/A',
      title: doc.title,
      description: doc.description,
      date: doc.published_date,
      downloadUrl: doc.download_url,
      code: doc.code,
    }));
  } catch (err) {
    console.warn('Backend unavailable, using fallback downloads:', err.message);
    return fallbackDownloads.filter(doc => {
      if (category !== 'all' && doc.category !== category) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          doc.title.toLowerCase().includes(q) ||
          doc.description.toLowerCase().includes(q) ||
          doc.code.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }
}

// ----------------------------------------------------
// 3. ACADEMICS & COURSES
// ----------------------------------------------------
export async function fetchProgramCategories() {
  try {
    const data = await fetchJson('/programs/categories/');
    return [
      { id: 'all', label: 'All Courses' },
      ...data.map(d => ({ id: d.slug, label: d.name, shortLabel: d.short_label }))
    ];
  } catch (err) {
    console.warn('Backend unavailable, using fallback course categories:', err.message);
    return fallbackCourseCategories;
  }
}

export async function fetchPrograms({ department = 'all', level = 'all', intake = 'all', search = '' } = {}) {
  try {
    const params = new URLSearchParams();
    if (department && department !== 'all') params.append('department', department);
    if (level && level !== 'all') params.append('level', level);
    if (intake && intake !== 'all') params.append('intake', intake);
    if (search && search.trim()) params.append('search', search.trim());

    const query = params.toString() ? `?${params.toString()}` : '';
    const programs = await fetchJson(`/programs/${query}`);

    return programs.map(p => ({
      id: p.slug,
      backendId: p.id,
      code: p.code,
      department: p.department_slug,
      deptLabel: p.deptLabel || p.department_name?.toUpperCase(),
      title: p.title,
      qualificationLevel: p.qualificationLevel,
      knqfLevel: p.knqfLevel,
      duration: p.duration,
      examBoard: p.examBoard,
      examBoardDetail: p.examBoardDetail,
      badgeType: p.badgeType || 'info',
      intakes: p.intakes || ['Jan', 'May', 'Sept'],
      minRequirement: p.minRequirement,
      practicalRatio: p.practicalRatio,
      pathways: p.pathways,
      overview: p.overview,
      modules: p.modules || [],
      careerOpportunities: p.careerOpportunities || [],
      brochureUrl: p.brochure_url,
    }));
  } catch (err) {
    console.warn('Backend unavailable, using fallback courses:', err.message);
    return fallbackCourses;
  }
}

// ----------------------------------------------------
// 4. ORGANIZATION & DEPARTMENTS / MANAGEMENT
// ----------------------------------------------------
export async function fetchDepartmentDivisions() {
  try {
    const data = await fetchJson('/departments/divisions/');
    return data.map(div => ({
      id: div.slug,
      title: div.name,
      shortDesc: div.short_desc,
      color: div.color,
    }));
  } catch (err) {
    console.warn('Backend unavailable, using fallback about categories:', err.message);
    return fallbackAboutCategories;
  }
}

export async function fetchDepartments({ division = 'all', search = '' } = {}) {
  try {
    const params = new URLSearchParams();
    if (division && division !== 'all') params.append('division', division);
    if (search && search.trim()) params.append('search', search.trim());

    const query = params.toString() ? `?${params.toString()}` : '';
    const offices = await fetchJson(`/departments/${query}`);

    return offices.map(item => ({
      id: item.slug,
      backendId: item.id,
      categoryId: item.division_slug,
      categoryName: item.division_name,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      mandates: item.mandates || [],
      highlights: item.highlights || [],
      contactInfo: item.contact_info,
      actionText: item.action_text || 'Learn More',
      actionRoute: item.action_route || 'home',
      staff: item.staff || [],
      images: item.images || [],
    }));
  } catch (err) {
    console.warn('Backend unavailable, using fallback about items:', err.message);
    return fallbackAboutItems;
  }
}
