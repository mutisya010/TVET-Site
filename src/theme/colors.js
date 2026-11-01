// Balanced Color System: Green, White & Orange
// Green: Institutional anchor, prestige, nature & accreditation (#14462E deep, #2E8B57 primary, #16A34A vibrant)
// White: Crisp, modern, open surfaces and spacious cards (#FFFFFF, #F8FAFC)
// Orange: Focused energetic accent, CTAs, highlight badges (#F59E0B / #FFA500)
// High-legibility modern slate typography (No Charcoal #2D2D2D)

export const colors = {
  // Institutional Green (Authoritative, Prestigious, TVET Accreditation)
  greenDeep: '#14462E',      // Dark institutional green for headers, ribbons & footer
  greenDark: '#1A5638',
  green: '#2E8B57',          // Primary SeaGreen
  greenMedium: '#227A4B',
  greenBright: '#16A34A',    // Accent vibrant green
  greenLight: '#F0FDF4',     // Soft green tinted background
  greenMuted: '#DCFCE7',     // Green border / pill background
  greenHover: '#1B6A3E',

  // Focused Orange (Attention, CTAs & Spotlight Badges)
  primary: '#F59E0B',        // Balanced warm amber orange
  orange: '#F59E0B',
  orangeVibrant: '#FFA500',
  orangeHover: '#D97706',
  orangeDark: '#B45309',
  orangeLight: '#FFFBEB',    // Soft amber tint
  orangeMuted: '#FEF3C7',

  // White & Light Clean Surfaces
  white: '#FFFFFF',
  surface: '#FFFFFF',
  background: '#FFFFFF',
  surfaceAlt: '#F8FAFC',     // Clean soft slate neutral
  surfaceMuted: '#F1F5F9',
  surfaceHover: '#F8FAFC',

  // Clean Typography & Slate Neutrals (Zero Charcoal #2D2D2D)
  textPrimary: '#0F172A',    // Deep slate navy-black (crisp & modern)
  textSecondary: '#334155',  // Medium slate
  textMuted: '#64748B',      // Subtle muted slate
  textLight: '#94A3B8',      // Faint placeholder slate
  textWhite: '#FFFFFF',
  textGreen: '#166534',
  textOrange: '#B45309',

  // Legacy Charcoal aliases mapped to Deep Green and Clean Slate to prevent breakage
  charcoal: '#0F172A',
  charcoalDark: '#14462E',
  charcoalLight: '#1A5638',
  charcoalMuted: '#64748B',
  charcoalFaint: '#94A3B8',

  // Borders & Dividers
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderGreen: '#2E8B57',
  borderGreenMuted: '#DCFCE7',
  borderOrange: '#F59E0B',
  borderCharcoal: '#14462E',
};

export const typography = {
  headlineFont: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  bodyFont: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  labelFont: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};
