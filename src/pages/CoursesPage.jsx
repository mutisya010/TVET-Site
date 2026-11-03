import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  useWindowDimensions 
} from 'react-native';
import { 
  Search, 
  RotateCcw, 
  MapPin, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  X, 
  GraduationCap, 
  Layers, 
  Clock, 
  Coins, 
  Filter 
} from 'lucide-react';
import { allCatalogCourses } from '../data/coursesData';
import CourseCatalogCard from '../components/courses/CourseCatalogCard';
import StatutoryStandardsSection from '../components/courses/StatutoryStandardsSection';
import CourseCtaBanner from '../components/courses/CourseCtaBanner';
import ScrollReveal from '../components/common/ScrollReveal';
import { colors, typography } from '../theme/colors';
import collegeBannerImg from '../assets/College Banner_ Technology and Innovation.webp';

export default function CoursesPage({ onViewCourseDetails, onApplyCourse, onStartApplication }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedIntake, setSelectedIntake] = useState('all');

  const deptList = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'electrical', label: 'Electrical & Solar' },
    { id: 'automotive', label: 'Automotive & Mechanical' },
    { id: 'building', label: 'Building & Civil' },
    { id: 'ict-business', label: 'ICT & Business' },
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'hospitality', label: 'Hospitality' },
  ];

  const levelList = [
    { id: 'all', label: 'All Qualifications' },
    { id: 'diploma', label: 'Diploma (Level 6)' },
    { id: 'craft', label: 'Craft Cert (Level 5)' },
    { id: 'artisan', label: 'Artisan (Level 4)' },
  ];

  const intakeList = [
    { id: 'all', label: 'All Intakes' },
    { id: 'jan', label: 'January' },
    { id: 'may', label: 'May' },
    { id: 'sept', label: 'September' },
  ];

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDept('all');
    setSelectedLevel('all');
    setSelectedIntake('all');
  };

  const isFiltered = searchTerm.trim() !== '' || selectedDept !== 'all' || selectedLevel !== 'all' || selectedIntake !== 'all';

  // Compute department counts
  const getDeptCount = (deptId) => {
    if (deptId === 'all') return allCatalogCourses.length;
    return allCatalogCourses.filter((course) => {
      if (deptId === 'ict-business') {
        return course.department.includes('ict') || course.department.includes('business');
      }
      return course.department === deptId;
    }).length;
  };

  const filteredCourses = useMemo(() => {
    return allCatalogCourses.filter((course) => {
      // Search term matching
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = course.title?.toLowerCase().includes(query);
        const matchesCode = course.code?.toLowerCase().includes(query);
        const matchesDept = course.deptLabel?.toLowerCase().includes(query);
        const matchesReq = course.minRequirement?.toLowerCase().includes(query);
        const matchesPathways = course.pathways ? course.pathways.toLowerCase().includes(query) : false;
        if (!matchesTitle && !matchesCode && !matchesDept && !matchesReq && !matchesPathways) {
          return false;
        }
      }

      // Department filter
      if (selectedDept !== 'all') {
        const matchesDept = course.department === selectedDept || 
          (selectedDept === 'ict' && course.department.includes('ict')) ||
          (selectedDept === 'business' && course.department.includes('business')) ||
          (selectedDept === 'ict-business' && (course.department.includes('ict') || course.department.includes('business')));
        if (!matchesDept) return false;
      }

      // Level filter
      if (selectedLevel !== 'all') {
        const courseLevel = (course.qualificationLevel || '').toLowerCase();
        const knqf = (course.knqfLevel || '').toLowerCase();
        if (selectedLevel === 'diploma' && !courseLevel.includes('diploma') && !knqf.includes('level 6')) return false;
        if (selectedLevel === 'craft' && !courseLevel.includes('craft') && !knqf.includes('level 5')) return false;
        if (selectedLevel === 'artisan' && !courseLevel.includes('artisan') && !knqf.includes('level 4')) return false;
      }

      // Intake filter
      if (selectedIntake !== 'all') {
        const matchesIntake = course.intakes && course.intakes.some((i) => 
          i.toLowerCase().includes(selectedIntake.toLowerCase())
        );
        if (!matchesIntake) return false;
      }

      return true;
    });
  }, [searchTerm, selectedDept, selectedLevel, selectedIntake]);

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.container}>
        
        {/* ========================================================================= */}
        {/* ACADEMIC INSTITUTIONAL HERO BANNER */}
        {/* ========================================================================= */}
        <ScrollReveal animation="fade-up" duration={500}>
          <View style={[styles.heroBanner, isMobile && styles.heroBannerMobile]}>
            {/* Ambient Background with subtle blur of the authentic campus banner */}
            <Image
              source={collegeBannerImg }
              style={styles.heroBannerBgImage}
              resizeMode="cover"
              blurRadius={10}
            />
            {/* Deep institutional gradient overlay */}
            <View style={styles.heroBannerOverlay} />

            <View style={[styles.heroBannerInner, isMobile && styles.heroBannerInnerMobile]}>
              <View style={styles.heroBannerContent}>
                
                {/* Government & Location Tag */}
                <View style={styles.bannerTagRow}>
                  <View style={styles.bannerGovTag}>
                    <View style={styles.bannerGovDot} />
                    <Text style={styles.bannerGovTagText}>
                      MINISTRY OF EDUCATION • STATE DEPARTMENT FOR TVET
                    </Text>
                  </View>
                  <View style={styles.bannerLocationTag}>
                    <MapPin size={12} color={colors.orange} />
                    <Text style={styles.bannerLocationText}>Loima, Turkana County</Text>
                  </View>
                </View>

                {/* Banner Main Title */}
                <Text style={[styles.bannerMainTitle, isMobile && styles.bannerMainTitleMobile]}>
                  Courses & Programmes Catalog
                </Text>

                {/* Subtitle */}
                <Text style={[styles.bannerSubtitle, isMobile && styles.bannerSubtitleMobile]}>
                  Explore government-accredited Artisan, Craft Certificate, and Diploma qualifications at Loima TVC. 
                  70%+ hands-on practical workshop training engineered for industrial craftsmanship, direct self-employment, and national certifications.
                </Text>

                {/* Institutional Badges */}
                <View style={[styles.bannerBadgesRow, isMobile && styles.bannerBadgesRowMobile]}>
                  <View style={styles.bannerBadgeItem}>
                    <ShieldCheck size={14} color={colors.orange} />
                    <Text style={styles.bannerBadgeText}>TVETA/PUBLIC/TVC/2021</Text>
                  </View>
                  <View style={styles.bannerBadgeItem}>
                    <Award size={14} color={colors.orange} />
                    <Text style={styles.bannerBadgeText}>KNQF Levels 4, 5 & 6</Text>
                  </View>
                  <View style={styles.bannerBadgeItem}>
                    <CheckCircle2 size={14} color={colors.orange} />
                    <Text style={styles.bannerBadgeText}>CDACC Assessment Center</Text>
                  </View>
                  <View style={styles.bannerBadgeItem}>
                    <Coins size={14} color={colors.orange} />
                    <Text style={styles.bannerBadgeText}>HELB & GoK Capitation</Text>
                  </View>
                </View>

              </View>
            </View>

            {/* Quick Metrics Strip */}
            <View style={[styles.metricsStrip, isMobile && styles.metricsStripMobile]}>
              <View style={styles.metricBox}>
                <Text style={styles.metricNumber}>100%</Text>
                <Text style={styles.metricLabel}>Practical CBET Training</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricBox}>
                <Text style={styles.metricNumber}>HELB</Text>
                <Text style={styles.metricLabel}>Capitation & Tuition Loans</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricBox}>
                <Text style={styles.metricNumber}>3 Intakes</Text>
                <Text style={styles.metricLabel}>Jan • May • Sep Annually</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricBox}>
                <Text style={styles.metricNumber}>CDACC</Text>
                <Text style={styles.metricLabel}>National Examination Board</Text>
              </View>
            </View>

          </View>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* UNIFIED SEARCH & FILTER SUITE */}
        {/* ========================================================================= */}
        <View style={styles.filterCard}>
          
          {/* Top Search & Filter Bar */}
          <View style={[styles.filterTopRow, isMobile && styles.filterTopRowMobile]}>
            {/* Live Search Input */}
            <View style={styles.searchContainer}>
              <Search size={16} color={colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by keyword, code, or entry requirement..."
                placeholderTextColor={colors.charcoalFaint}
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
              {searchTerm ? (
                <TouchableOpacity onPress={() => setSearchTerm('')} activeOpacity={0.7}>
                  <X size={15} color={colors.textMuted} />
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Level Filter Segment */}
            <View style={styles.levelSegmentGroup}>
              {levelList.map((level) => {
                const isActive = selectedLevel === level.id;
                return (
                  <TouchableOpacity
                    key={level.id}
                    style={[styles.segmentBtn, isActive && styles.segmentBtnActive]}
                    onPress={() => setSelectedLevel(level.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.segmentBtnText, isActive && styles.segmentBtnTextActive]}>
                      {level.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Intake Filter Segment */}
            <View style={styles.intakeSegmentGroup}>
              {intakeList.map((intake) => {
                const isActive = selectedIntake === intake.id;
                return (
                  <TouchableOpacity
                    key={intake.id}
                    style={[styles.intakeBtn, isActive && styles.intakeBtnActive]}
                    onPress={() => setSelectedIntake(intake.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.intakeBtnText, isActive && styles.intakeBtnTextActive]}>
                      {intake.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Department Tabs Row */}
          <View style={styles.deptTabsRow}>
            <Text style={styles.deptTabsLabel}>DISCIPLINES:</Text>
            <View style={styles.deptPillsContainer}>
              {deptList.map((dept) => {
                const isActive = selectedDept === dept.id;
                const count = getDeptCount(dept.id);
                return (
                  <TouchableOpacity
                    key={dept.id}
                    style={[styles.deptPill, isActive && styles.deptPillActive]}
                    onPress={() => setSelectedDept(dept.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.deptPillText, isActive && styles.deptPillTextActive]}>
                      {dept.label}
                    </Text>
                    <View style={[styles.deptCountBadge, isActive && styles.deptCountBadgeActive]}>
                      <Text style={[styles.deptCountText, isActive && styles.deptCountTextActive]}>
                        {count}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Results Counter & Active Filter Dismissals */}
          <View style={styles.resultsHeaderRow}>
            <View style={styles.resultsCountBox}>
              <Text style={styles.resultsCountText}>
                Showing <Text style={styles.resultsCountBold}>{filteredCourses.length}</Text> Accredited Programmes
              </Text>
            </View>

            {isFiltered && (
              <View style={styles.activeFiltersRow}>
                {selectedDept !== 'all' && (
                  <TouchableOpacity 
                    style={styles.filterChip} 
                    onPress={() => setSelectedDept('all')}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.filterChipText}>
                      {deptList.find((d) => d.id === selectedDept)?.label}
                    </Text>
                    <X size={12} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}

                {selectedLevel !== 'all' && (
                  <TouchableOpacity 
                    style={styles.filterChip} 
                    onPress={() => setSelectedLevel('all')}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.filterChipText}>
                      {levelList.find((l) => l.id === selectedLevel)?.label}
                    </Text>
                    <X size={12} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}

                {selectedIntake !== 'all' && (
                  <TouchableOpacity 
                    style={styles.filterChip} 
                    onPress={() => setSelectedIntake('all')}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.filterChipText}>
                      Intake: {intakeList.find((i) => i.id === selectedIntake)?.label}
                    </Text>
                    <X size={12} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}

                <TouchableOpacity 
                  style={styles.resetBtn} 
                  onPress={handleResetFilters}
                  activeOpacity={0.8}
                >
                  <RotateCcw size={12} color={colors.orangeDark} />
                  <Text style={styles.resetBtnText}>Clear All</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

        </View>

        {/* ========================================================================= */}
        {/* COURSE CARDS CATALOG GRID */}
        {/* ========================================================================= */}
        <View style={styles.catalogGrid}>
          {filteredCourses.map((course) => (
            <CourseCatalogCard
              key={course.id}
              course={course}
              onViewDetails={onViewCourseDetails}
              onApplyNow={onApplyCourse}
            />
          ))}
        </View>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <View style={styles.emptyCard}>
            <GraduationCap size={40} color={colors.charcoalMuted} />
            <Text style={styles.emptyTitle}>No Matching Programmes Found</Text>
            <Text style={styles.emptySubtitle}>
              We couldn't find any courses matching your selected combination of discipline, qualification level, or keyword.
            </Text>
            <TouchableOpacity 
              style={styles.emptyResetBtn} 
              onPress={handleResetFilters}
              activeOpacity={0.85}
            >
              <RotateCcw size={14} color={colors.white} />
              <Text style={styles.emptyResetBtnText}>Reset All Filters</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>

      {/* Statutory Standards, Funding & Assessment Section */}
      <ScrollReveal animation="fade-up" duration={650}>
        <StatutoryStandardsSection 
          onDownloadFeeSchedule={onStartApplication} 
        />
      </ScrollReveal>

      {/* Course CTA Banner */}
      <ScrollReveal animation="fade-up" duration={650}>
        <CourseCtaBanner 
          onStartApplication={onStartApplication}
          onSpeakAdvisor={onStartApplication}
        />
      </ScrollReveal>
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: colors.white,
    flexGrow: 1,
    paddingVertical: 32,
  },
  container: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },

  /* Hero Banner */
  heroBanner: {
    position: 'relative',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.14)',
    elevation: 4,
    backgroundColor: colors.greenDeep,
  },
  heroBannerMobile: {
    borderRadius: 10,
    marginBottom: 18,
  },
  heroBannerBgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.18,
  },
  heroBannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(14, 48, 32, 0.92)',
    // @ts-ignore
    backgroundImage: 'linear-gradient(135deg, rgba(14, 48, 32, 0.96) 0%, rgba(20, 70, 46, 0.90) 50%, rgba(15, 23, 42, 0.94) 100%)',
  },
  heroBannerInner: {
    position: 'relative',
    zIndex: 2,
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 32,
  },
  heroBannerInnerMobile: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  heroBannerContent: {
    maxWidth: 880,
  },
  bannerTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  bannerGovTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 20,
  },
  bannerGovDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.orange,
  },
  bannerGovTagText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
    fontFamily: typography.labelFont,
  },
  bannerLocationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 9,
    paddingVertical: 4.5,
    borderRadius: 20,
  },
  bannerLocationText: {
    fontSize: 10.5,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '700',
    fontFamily: typography.labelFont,
  },
  bannerMainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.6,
    lineHeight: 38,
    marginBottom: 10,
    fontFamily: typography.headlineFont,
  },
  bannerMainTitleMobile: {
    fontSize: 24,
    lineHeight: 30,
  },
  bannerSubtitle: {
    fontSize: 13.5,
    lineHeight: 21,
    color: 'rgba(255, 255, 255, 0.90)',
    marginBottom: 20,
    fontFamily: typography.bodyFont,
  },
  bannerSubtitleMobile: {
    fontSize: 12.5,
    lineHeight: 19,
    marginBottom: 16,
  },
  bannerBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  bannerBadgesRowMobile: {
    gap: 6,
  },
  bannerBadgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  bannerBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.labelFont,
  },
  metricsStrip: {
    position: 'relative',
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(10, 30, 20, 0.85)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexWrap: 'wrap',
  },
  metricsStripMobile: {
    paddingVertical: 10,
  },
  metricBox: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  metricNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.orange,
    fontFamily: typography.headlineFont,
  },
  metricLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
    fontFamily: typography.bodyFont,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  /* Unified Search & Filter Suite */
  filterCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 18,
    marginBottom: 24,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  filterTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  filterTopRowMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 10,
  },
  searchContainer: {
    flex: 2,
    minWidth: 260,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  searchInput: {
    flex: 1,
    fontSize: 12.5,
    color: colors.charcoal,
    backgroundColor: 'transparent',
    borderWidth: 0,
    outline: 'none',
    fontFamily: typography.bodyFont,
  },
  levelSegmentGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 3,
    gap: 2,
    flexWrap: 'wrap',
  },
  segmentBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    cursor: 'pointer',
  },
  segmentBtnActive: {
    backgroundColor: colors.greenDeep,
  },
  segmentBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: typography.labelFont,
  },
  segmentBtnTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  intakeSegmentGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 3,
    gap: 2,
  },
  intakeBtn: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 6,
    cursor: 'pointer',
  },
  intakeBtnActive: {
    backgroundColor: colors.orange,
  },
  intakeBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: typography.labelFont,
  },
  intakeBtnTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  deptTabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    flexWrap: 'wrap',
  },
  deptTabsLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
    fontFamily: typography.labelFont,
  },
  deptPillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    flex: 1,
  },
  deptPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    cursor: 'pointer',
  },
  deptPillActive: {
    backgroundColor: colors.greenDeep,
    borderColor: colors.greenDeep,
  },
  deptPillText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: typography.labelFont,
  },
  deptPillTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  deptCountBadge: {
    backgroundColor: colors.border,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 10,
  },
  deptCountBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  deptCountText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.textSecondary,
    fontFamily: typography.labelFont,
  },
  deptCountTextActive: {
    color: colors.white,
  },

  /* Results Header */
  resultsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    flexWrap: 'wrap',
    gap: 10,
  },
  resultsCountBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultsCountText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
  },
  resultsCountBold: {
    fontWeight: '800',
    color: colors.greenDeep,
  },
  activeFiltersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    cursor: 'pointer',
  },
  filterChipText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: typography.labelFont,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.orangeLight,
    borderWidth: 1,
    borderColor: colors.orangeMuted,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    cursor: 'pointer',
  },
  resetBtnText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.orangeDark,
    fontFamily: typography.labelFont,
  },

  /* Course Cards Grid */
  catalogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'flex-start',
    marginBottom: 24,
  },

  /* Empty State */
  emptyCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.charcoal,
    marginTop: 14,
    marginBottom: 6,
    fontFamily: typography.headlineFont,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 480,
    lineHeight: 19,
    marginBottom: 18,
    fontFamily: typography.bodyFont,
  },
  emptyResetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.greenDeep,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 7,
    cursor: 'pointer',
  },
  emptyResetBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.white,
    fontFamily: typography.labelFont,
  },
});
