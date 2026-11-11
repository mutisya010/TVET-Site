import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchBranding } from '../services/api';
import defaultLogoImg from '../assets/Loima Technical College Crest.png';

const BrandingContext = createContext(null);

export function BrandingProvider({ children }) {
  const [branding, setBranding] = useState({
    institutionName: 'Loima Technical and Vocational College',
    shortName: 'LOIMA',
    acronymBadge: 'TVC',
    tagline: 'TECHNICAL & VOCATIONAL COLLEGE',
    subTagline: 'Centre of Excellence in Technical & Vocational Training',
    primaryColor: '#2E8B57',
    primaryDark: '#14462E',
    accentColor: '#F59E0B',
    accentHover: '#D97706',
    helplinePhone: '+254 746 525 252',
    helplinePhoneAlt: '',
    whatsappNumber: '+254 746 525 252',
    emailInfo: 'info@loima-tvc.ac.ke',
    emailPrincipal: 'principal@loima-tvc.ac.ke',
    physicalLocation: 'Lorugum Campus (~1.5 km off Lodwar–Uganda Road), Loima Sub-County, Turkana County',
    poBox: 'P.O. Box 123 - 30500, Lodwar, Kenya',
    tvetaLicense: 'TVETA/PUBLIC/TVC/0005/2023',
    admissionsNotice: 'Intakes: January, May & September | Apply via KUCCPS or Campus Office in Lorugum',
    logoUrl: defaultLogoImg,
    isLoading: true,
  });

  const loadBranding = async () => {
    try {
      const data = await fetchBranding();
      if (data) {
        setBranding({
          institutionName: data.institution_name || 'Loima Technical and Vocational College',
          shortName: data.short_name || 'LOIMA',
          acronymBadge: data.acronym_badge || 'TVC',
          tagline: data.tagline || 'TECHNICAL & VOCATIONAL COLLEGE',
          subTagline: data.sub_tagline || '',
          primaryColor: data.primary_color || '#2E8B57',
          primaryDark: data.primary_dark || '#14462E',
          accentColor: data.accent_color || '#F59E0B',
          accentHover: data.accent_hover || '#D97706',
          helplinePhone: data.helpline_phone || '+254 746 525 252',
          helplinePhoneAlt: data.helpline_phone_alt || '',
          whatsappNumber: data.whatsapp_number || '+254 746 525 252',
          emailInfo: data.email_info || 'info@loima-tvc.ac.ke',
          emailPrincipal: data.email_principal || 'principal@loima-tvc.ac.ke',
          physicalLocation: data.physical_location || 'Lorugum Campus, Loima Sub-County, Turkana County',
          poBox: data.po_box || 'P.O. Box 123 - 30500, Lodwar, Kenya',
          tvetaLicense: data.tveta_license_number || 'TVETA/PUBLIC/TVC/0005/2023',
          admissionsNotice: data.admissions_notice || 'Intakes: January, May & September | Apply via KUCCPS or Campus Office in Lorugum',
          logoUrl: data.logo_url || defaultLogoImg,
          isLoading: false,
        });

        // Set CSS variables for web elements
        if (typeof document !== 'undefined' && document.documentElement) {
          if (data.primary_color) {
            document.documentElement.style.setProperty('--color-primary', data.primary_color);
          }
          if (data.primary_dark) {
            document.documentElement.style.setProperty('--color-primary-dark', data.primary_dark);
          }
          if (data.accent_color) {
            document.documentElement.style.setProperty('--color-accent', data.accent_color);
          }
        }
      }
    } catch (err) {
      console.warn('Failed to load dynamic branding:', err);
      setBranding(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    loadBranding();
  }, []);

  return (
    <BrandingContext.Provider value={{ ...branding, refreshBranding: loadBranding }}>
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding() {
  const context = useContext(BrandingContext);
  if (!context) {
    return {
      institutionName: 'Loima Technical and Vocational College',
      shortName: 'LOIMA',
      acronymBadge: 'TVC',
      tagline: 'TECHNICAL & VOCATIONAL COLLEGE',
      subTagline: 'Centre of Excellence in Technical & Vocational Training',
      primaryColor: '#2E8B57',
      primaryDark: '#14462E',
      accentColor: '#F59E0B',
      accentHover: '#D97706',
      helplinePhone: '+254 746 525 252',
      helplinePhoneAlt: '',
      whatsappNumber: '+254 746 525 252',
      emailInfo: 'info@loima-tvc.ac.ke',
      emailPrincipal: 'principal@loima-tvc.ac.ke',
      physicalLocation: 'Lorugum Campus (~1.5 km off Lodwar–Uganda Road), Loima Sub-County, Turkana County',
      poBox: 'P.O. Box 123 - 30500, Lodwar, Kenya',
      tvetaLicense: 'TVETA/PUBLIC/TVC/0005/2023',
      admissionsNotice: 'Intakes: January, May & September | Apply via KUCCPS or Campus Office in Lorugum',
      logoUrl: defaultLogoImg,
      isLoading: false,
      refreshBranding: () => {},
    };
  }
  return context;
}
