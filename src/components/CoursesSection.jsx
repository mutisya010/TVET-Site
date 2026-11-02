import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { 
  Zap, 
  Car, 
  HardHat, 
  Monitor, 
  Utensils, 
  Sprout, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  BookOpen,
  Award
} from 'lucide-react';
import { allCatalogCourses } from '../data/coursesData';
import { colors, typography } from '../theme/colors';
import ScrollReveal from './common/ScrollReveal';

const categorySpotlights = {
  all: {
    tag: 'HANDS-ON TECHNICAL TRAINING',
    tagColor: colors.greenDeep,
    title: 'Modern Engineering & Workshop Labs',
    description: 'Over 70% of Loima TVC curriculum is practical workshop mastery. Trainees train with modern industrial machinery, EPRA-certified test panels, and commercial software suites.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    stats: [
      { label: 'Practical Ratio', val: '70% CBET' },
      { label: 'Govt Subsidy', val: 'Supported' },
      { label: 'Attachment', val: '100% Supervised' },
    ],
    highlight: 'Industry-supervised Competency-Based Education & Training (CBET)',
  },
  engineering: {
    tag: 'ENGINEERING & TECHNOLOGY BAY',
    tagColor: colors.orange,
    title: 'Electrical, Solar PV & Automotive Diagnostics',
    description: 'Fully equipped electrical power laboratories, EPRA-compliant solar micro-grid installations, heavy-duty welding rigs, and computerized motor vehicle diagnostic bays.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
    stats: [
      { label: 'Licensing', val: 'EPRA C1 & T2' },
      { label: 'Facilities', val: 'OBD & MIG/TIG' },
      { label: 'Attachment', val: 'Automotive Garages' },
    ],
    highlight: 'Direct pathway to EPRA wireman and certified garage technician licensing',
  },
  'ict-business': {
    tag: 'DIGITAL & BUSINESS STUDIES',
    tagColor: colors.green,
    title: 'High-Speed Broadband ICT & Enterprise Hub',
    description: 'Ultra-modern computing labs with dedicated dual-display workstations, Cisco networking racks, and computerized QuickBooks & Sage ERP business management suites.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    stats: [
      { label: 'Digital Lab', val: '40+ Dedicated PCs' },
      { label: 'Software', val: 'ERP, SQL & Cloud' },
      { label: 'Accreditation', val: 'CDACC & KASNEB' },
    ],
    highlight: 'Equipped for cloud engineering, network routing, and corporate financial systems',
  },
  'agri-civil': {
    tag: 'CIVIL INFRASTRUCTURE & AGRIBUSINESS',
    tagColor: colors.greenDeep,
    title: 'Greenhouse Horticulture & Civil Construction',
    description: 'Outdoor testing yards featuring computerized level surveying instruments, reinforced concrete curing testbeds, sanitary plumbing rigs, and automated greenhouse drip irrigation.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    stats: [
      { label: 'NCA Standards', val: 'Site Supervision' },
      { label: 'Farming Practice', val: 'Greenhouse & Drip' },
      { label: 'Certification', val: 'KNEC & CDACC' },
    ],
    highlight: 'Hands-on construction and climate-resilient dryland agricultural technologies',
  },
};

const coursePathwaysMap = {
  'electrical-craft': ['Solar PV Micro-grid', 'EPRA Wireman', 'Industrial Motor Wiring'],
  'automotive-diploma': ['OBD Diagnostics', 'Heavy Commercial Fleet', 'Engine Overhaul'],
  'ict-diploma': ['Cloud Infrastructure', 'Cisco LAN/WAN', 'Cybersecurity Protocols'],
  'building-craft': ['Site Surveying & Levelling', 'Concrete Formwork', 'NCA Site Clerk'],
  'agri-certificate': ['Greenhouse Drip Irrigation', 'Dairy & Silage', 'Agribusiness Cooperatives'],
  'business-diploma': ['QuickBooks ERP', 'Supply Chain Operations', 'Corporate Taxation'],
  'plumbing-artisan': ['Pressurized Piping', 'Drainage Systems', 'Solar Water Heating'],
  'welding-artisan': ['MIG/TIG Specialized Welding', 'Structural Steel', 'Metal Studio Fabrication'],
};

export default function CoursesSection({ onSelectCourse, onApplyCourse, onViewAllCourses }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const isMobile = width < 768;

  const [activeCategory, setActiveCategory] = useState('all');

  // Filter programmes
  const filteredCourses = allCatalogCourses.filter((c) => {
    if (activeCategory === 'all') {
      // Show top 6 flagship courses in default view
      return [
        'electrical-craft',
        'automotive-diploma',
        'ict-diploma',
        'building-craft',
        'agri-certificate',
        'business-diploma',
      ].includes(c.id);
    }
    if (activeCategory === 'engineering') {
      return ['electrical-craft', 'automotive-diploma', 'welding-artisan'].includes(c.id);
    }
    if (activeCategory === 'ict-business') {
      return ['ict-diploma', 'business-diploma'].includes(c.id);
    }
    if (activeCategory === 'agri-civil') {
      return ['building-craft', 'plumbing-artisan', 'agri-certificate'].includes(c.id);
    }
    return true;
  });

  const currentSpotlight = categorySpotlights[activeCategory] || categorySpotlights.all;

  const getCourseIcon = (id) => {
    switch (id) {
      case 'electrical-craft':
      case 'electrical-engineering':
        return <Zap size={18} color="#D97706" />;
      case 'automotive-diploma':
      case 'automotive-engineering':
      case 'welding-artisan':
        return <Car size={18} color="#14462E" />;
      case 'building-craft':
      case 'plumbing-artisan':
      case 'building-civil-technology':
        return <HardHat size={18} color="#D97706" />;
      case 'ict-diploma':
      case 'ict-computer-studies':
        return <Monitor size={18} color="#166534" />;
      case 'business-diploma':
      case 'hospitality-institutional-mgmt':
        return <Utensils size={18} color="#14462E" />;
      case 'agri-certificate':
      case 'agriculture-agribusiness':
        return <Sprout size={18} color="#166534" />;
      default:
        return <Zap size={18} color="#D97706" />;
    }
  };

  const getIconBg = (id) => {
    switch (id) {
      case 'electrical-craft':
      case 'building-craft':
        return '#FFFBEB';
      case 'automotive-diploma':
      case 'welding-artisan':
      case 'business-diploma':
        return '#F0FDF4';
      case 'ict-diploma':
      case 'agri-certificate':
      case 'plumbing-artisan':
        return '#F0FDF4';
      default:
        return '#FFFBEB';
    }
  };

  const getLevelBadge = (level) => {
    if (level.includes('Level 6') || level.includes('Diploma')) {
      return { bg: '#F0FDF4', border: '#BBF7D0', text: '#166534', label: 'Diploma • Level 6' };
    }
    if (level.includes('Level 5') || level.includes('Craft') || level.includes('Certificate')) {
      return { bg: '#FFFBEB', border: '#FDE68A', text: '#B45309', label: 'Craft • Level 5' };
    }
    return { bg: '#F1F5F9', border: '#CBD5E1', text: '#334155', label: 'Artisan • Level 4' };
  };

  return (
    <View style={styles.section} id="courses-section">
      <View style={styles.container}>
        
        {/* Section Top Header */}
        <View style={styles.headerBlock}>
          <View style={styles.headerTitleArea}>
            <View style={styles.overlineRow}>
              <Sparkles size={14} color={colors.textOrange} />
              <Text style={styles.overline}>ACCREDITED TVET PATHWAYS</Text>
            </View>
            <Text style={[styles.mainTitle, isMobile && styles.mainTitleMobile]}>
              Featured Programme Categories
            </Text>
            <Text style={styles.leadSubtitle}>
              Acquire government-subsidized, industry-standard competencies. Choose from accredited Artisan, 
              Craft Certificate, and Diploma qualifications aligned with KNQF and TVET CDACC frameworks.
            </Text>
          </View>

          {/* Interactive Filter Pills */}
          <View style={[styles.filterBar, isMobile && styles.filterBarMobile]}>
            {[
              { id: 'all', label: 'All Pathways (6)' },
              { id: 'engineering', label: 'Engineering & Tech (3)' },
              { id: 'ict-business', label: 'ICT & Business (2)' },
              { id: 'agri-civil', label: 'Agri & Civil (3)' },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setActiveCategory(cat.id)}
                  style={[styles.filterPill, isActive && styles.filterPillActive]}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Asymmetrical Split Section Layout: Photo on the Side + Redesigned Programme Listings */}
        <View style={[styles.splitLayout, (isTablet || isMobile) && styles.splitLayoutStacked]}>
          
          {/* ========================================================================= */}
          {/* PHOTO ON THE SIDE: High-Impact Visual Showcase Column */}
          {/* ========================================================================= */}
          <View style={[styles.photoColumn, (isTablet || isMobile) && styles.photoColumnFull]}>
            <View style={styles.photoCard}>
              
              {/* Photo Area with Floating Glass Badges */}
              <View style={styles.imageWrapper}>
                <Image 
                  source={{ uri: currentSpotlight.imageUrl }} 
                  style={styles.spotlightImage}
                  // @ts-ignore
                  accessibilityLabel={currentSpotlight.title}
                />
                
                {/* Top Overlay Badges */}
                <View style={styles.imageOverlayTop}>
                  <View style={styles.glassPill}>
                    <View style={styles.livePulseDot} />
                    <Text style={styles.glassPillText}>CBET Practical Training</Text>
                  </View>

                  <View style={styles.accreditedPill}>
                    <ShieldCheck size={12} color="#FFFFFF" />
                    <Text style={styles.accreditedPillText}>TVETA Certified</Text>
                  </View>
                </View>

                {/* Bottom Image Tag */}
                <View style={styles.imageCaptionBar}>
                  <Text style={styles.imageCaptionText}>
                    Loima TVC Workshop Bay • Live Practical Session
                  </Text>
                </View>
              </View>

              {/* Photo Card Body Details */}
              <View style={styles.photoBody}>
                <View style={styles.tagBadgeRow}>
                  <Text style={[styles.spotlightTag, { color: currentSpotlight.tagColor }]}>
                    {currentSpotlight.tag}
                  </Text>
                </View>

                <Text style={styles.spotlightHeading}>
                  {currentSpotlight.title}
                </Text>

                <Text style={styles.spotlightDesc}>
                  {currentSpotlight.description}
                </Text>

                {/* Highlight Strip */}
                <View style={styles.highlightStrip}>
                  <Sparkles size={14} color={colors.greenDeep} />
                  <Text style={styles.highlightStripText}>
                    {currentSpotlight.highlight}
                  </Text>
                </View>

                {/* 3-Column Mini Metrics Box */}
                <View style={styles.metricsBox}>
                  {currentSpotlight.stats.map((stat, sIdx) => (
                    <View 
                      key={sIdx} 
                      style={[
                        styles.metricCol, 
                        sIdx < currentSpotlight.stats.length - 1 && styles.metricColDivider
                      ]}
                    >
                      <Text style={styles.metricVal}>{stat.val}</Text>
                      <Text style={styles.metricLabel}>{stat.label}</Text>
                    </View>
                  ))}
                </View>

                {/* Action CTA Button */}
                <TouchableOpacity
                  style={styles.exploreAllBtn}
                  onPress={onViewAllCourses}
                  activeOpacity={0.85}
                >
                  <Text style={styles.exploreAllBtnText}>
                    Explore Full 15+ Programme Catalog
                  </Text>
                  <ArrowRight size={16} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.fundingHintRow}>
                  <CheckCircle2 size={13} color={colors.greenDeep} />
                  <Text style={styles.fundingHintText}>
                    100% Eligible for National Govt Capitation & HELB/TVET Loans
                  </Text>
                </View>
              </View>

            </View>
          </View>

          {/* ========================================================================= */}
          {/* PROGRAMME CATEGORIES LISTING: Clean, Modern 2-Column Responsive Grid */}
          {/* ========================================================================= */}
          <View style={[styles.listingsColumn, (isTablet || isMobile) && styles.listingsColumnFull]}>
            <View style={styles.programmesGrid}>
              {filteredCourses.map((course, idx) => {
                const badgeInfo = getLevelBadge(course.knqfLevel || course.qualificationLevel);
                const pathways = coursePathwaysMap[course.id] || [];

                return (
                  <ScrollReveal 
                    key={course.id} 
                    animation="fade-up"
                    delay={idx * 60}
                    duration={550}
                    style={[
                      styles.programmeCard,
                      isMobile && styles.programmeCardMobile
                    ]}
                  >
                    {/* Top Row: Icon + Department + Qualification Badge */}
                    <View style={styles.cardHeaderRow}>
                      <View style={styles.headerLeftMeta}>
                        <View style={[styles.iconContainer, { backgroundColor: getIconBg(course.id) }]}>
                          {getCourseIcon(course.id)}
                        </View>
                        <Text style={styles.deptLabelText} numberOfLines={1}>
                          {course.deptLabel || course.dept}
                        </Text>
                      </View>

                      <View style={[styles.levelPill, { backgroundColor: badgeInfo.bg, borderColor: badgeInfo.border }]}>
                        <Text style={[styles.levelPillText, { color: badgeInfo.text }]}>
                          {badgeInfo.label}
                        </Text>
                      </View>
                    </View>

                    {/* Course Title */}
                    <TouchableOpacity 
                      onPress={() => onSelectCourse && onSelectCourse(course)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.courseHeadline} numberOfLines={2}>
                        {course.title}
                      </Text>
                    </TouchableOpacity>

                    {/* Key Programme Specs */}
                    <View style={styles.specsRow}>
                      <View style={styles.specItem}>
                        <Clock size={12.5} color={colors.textMuted} />
                        <Text style={styles.specItemText}>{course.duration || '2 Years'}</Text>
                      </View>
                      <View style={styles.specDot} />
                      <View style={styles.specItem}>
                        <CheckCircle2 size={12.5} color={colors.greenDeep} />
                        <Text style={styles.specItemText}>{course.minRequirement}</Text>
                      </View>
                    </View>

                    {/* Pathway Tags */}
                    {pathways.length > 0 && (
                      <View style={styles.pathwayTagsRow}>
                        {pathways.map((p, pIdx) => (
                          <View key={pIdx} style={styles.pathwayTag}>
                            <Text style={styles.pathwayTagText}>#{p}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Card Divider */}
                    <View style={styles.cardDivider} />

                    {/* Card Footer: Capitation Badge + Actions */}
                    <View style={styles.cardFooter}>
                      <View style={styles.subsidyBadge}>
                        <Text style={styles.subsidyText}>Govt Subsidized</Text>
                      </View>

                      <View style={styles.actionsGroup}>
                        <TouchableOpacity 
                          style={styles.detailsBtn}
                          onPress={() => onSelectCourse && onSelectCourse(course)}
                          activeOpacity={0.7}
                        >
                          <BookOpen size={12} color={colors.textSecondary} />
                          <Text style={styles.detailsBtnText}>Curriculum</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                          style={styles.applyActionBtn}
                          onPress={() => onApplyCourse && onApplyCourse(course)}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.applyActionText}>Apply</Text>
                          <ArrowRight size={12} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    </View>

                  </ScrollReveal>
                );
              })}
            </View>

            {/* Bottom Quick Action Banner */}
            <View style={styles.catalogPromptCard}>
              <View style={styles.promptLeft}>
                <Award size={20} color={colors.greenDeep} />
                <View>
                  <Text style={styles.promptTitle}>Need assistance choosing your career pathway?</Text>
                  <Text style={styles.promptSub}>Our academic registrar team is ready to guide you on KUCCPS placement and course selection.</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.promptBtn}
                onPress={onViewAllCourses}
                activeOpacity={0.8}
              >
                <Text style={styles.promptBtnText}>View All 15+ Courses</Text>
                <ArrowRight size={13} color={colors.greenDeep} />
              </TouchableOpacity>
            </View>

          </View>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 64,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  container: {
    maxWidth: 1260,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },

  /* Section Header */
  headerBlock: {
    marginBottom: 40,
  },
  headerTitleArea: {
    maxWidth: 780,
    marginBottom: 20,
  },
  overlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  overline: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textOrange,
    letterSpacing: 1.2,
    fontFamily: typography.labelFont,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.6,
    marginBottom: 12,
    fontFamily: typography.headlineFont,
  },
  mainTitleMobile: {
    fontSize: 26,
  },
  leadSubtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
  },

  /* Filter Bar */
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  filterBarMobile: {
    gap: 6,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    cursor: 'pointer',
  },
  filterPillActive: {
    backgroundColor: colors.greenDeep,
    borderColor: colors.greenDeep,
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: typography.labelFont,
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  /* Split Layout */
  splitLayout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 28,
  },
  splitLayoutStacked: {
    flexDirection: 'column',
    gap: 32,
  },

  /* Left Photo Column */
  photoColumn: {
    width: '38%',
    minWidth: 340,
  },
  photoColumnFull: {
    width: '100%',
    minWidth: '100%',
  },
  photoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.05)',
    elevation: 3,
  },
  imageWrapper: {
    position: 'relative',
    height: 260,
    width: '100%',
    backgroundColor: '#0F172A',
    overflow: 'hidden',
  },
  spotlightImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlayTop: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  glassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backdropFilter: 'blur(8px)',
  },
  livePulseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  glassPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.labelFont,
  },
  accreditedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.greenDeep,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  accreditedPillText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.labelFont,
  },
  imageCaptionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    backdropFilter: 'blur(4px)',
  },
  imageCaptionText: {
    fontSize: 10.5,
    fontWeight: '500',
    color: '#E2E8F0',
    fontFamily: typography.bodyFont,
  },
  photoBody: {
    padding: 24,
  },
  tagBadgeRow: {
    marginBottom: 6,
  },
  spotlightTag: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily: typography.labelFont,
  },
  spotlightHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 26,
    marginBottom: 10,
    fontFamily: typography.headlineFont,
  },
  spotlightDesc: {
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.textSecondary,
    marginBottom: 16,
    fontFamily: typography.bodyFont,
  },
  highlightStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
    marginBottom: 18,
  },
  highlightStripText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
    flex: 1,
    fontFamily: typography.bodyFont,
  },
  metricsBox: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  metricCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  metricColDivider: {
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  metricVal: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
    fontFamily: typography.headlineFont,
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: 10.5,
    color: colors.textMuted,
    fontFamily: typography.labelFont,
    textAlign: 'center',
  },
  exploreAllBtn: {
    backgroundColor: colors.greenDeep,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(20, 70, 46, 0.2)',
  },
  exploreAllBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.headlineFont,
  },
  fundingHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 14,
  },
  fundingHintText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: typography.bodyFont,
  },

  /* Right Listings Column */
  listingsColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  listingsColumnFull: {
    width: '100%',
  },
  programmesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  programmeCard: {
    width: 'calc(50% - 8px)',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
    elevation: 1,
  },
  programmeCardMobile: {
    width: '100%',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  headerLeftMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deptLabelText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.3,
    fontFamily: typography.labelFont,
    flex: 1,
  },
  levelPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
  },
  levelPillText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
    fontFamily: typography.labelFont,
  },
  courseHeadline: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: 8,
    fontFamily: typography.headlineFont,
    cursor: 'pointer',
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specItemText: {
    fontSize: 11.5,
    color: colors.textSecondary,
    fontWeight: '600',
    fontFamily: typography.bodyFont,
  },
  specDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
  },
  pathwayTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  pathwayTag: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pathwayTagText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#475569',
    fontFamily: typography.bodyFont,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  subsidyBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
  },
  subsidyText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#166534',
    fontFamily: typography.labelFont,
  },
  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
  },
  detailsBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: typography.labelFont,
  },
  applyActionBtn: {
    backgroundColor: colors.greenDeep,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    cursor: 'pointer',
  },
  applyActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.labelFont,
  },

  /* Bottom Prompt Card */
  catalogPromptCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    flexWrap: 'wrap',
  },
  promptLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 260,
  },
  promptTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: colors.textPrimary,
    fontFamily: typography.headlineFont,
  },
  promptSub: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
    marginTop: 2,
  },
  promptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    cursor: 'pointer',
  },
  promptBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.greenDeep,
    fontFamily: typography.labelFont,
  },
});
