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
  Download 
} from 'lucide-react';
import { allCatalogCourses } from '../data/coursesData';
import CourseCatalogCard from '../components/courses/CourseCatalogCard';
import StatutoryStandardsSection from '../components/courses/StatutoryStandardsSection';
import CourseCtaBanner from '../components/courses/CourseCtaBanner';
import ScrollReveal from '../components/common/ScrollReveal';

export default function CoursesPage({ onViewCourseDetails, onApplyCourse, onStartApplication }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedIntake, setSelectedIntake] = useState('all');

  const deptPills = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'electrical', label: 'Electrical & Solar' },
    { id: 'automotive', label: 'Automotive & Mechanical' },
    { id: 'building', label: 'Building & Civil' },
    { id: 'ict-business', label: 'ICT & Business' },
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'hospitality', label: 'Hospitality' },
  ];

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDept('all');
    setSelectedLevel('all');
    setSelectedIntake('all');
  };

  const filteredCourses = useMemo(() => {
    return allCatalogCourses.filter((course) => {
      // Search term matching
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesCode = course.code.toLowerCase().includes(query);
        const matchesDept = course.deptLabel.toLowerCase().includes(query);
        const matchesPathways = course.pathways ? course.pathways.toLowerCase().includes(query) : false;
        if (!matchesTitle && !matchesCode && !matchesDept && !matchesPathways) {
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
      if (selectedLevel !== 'all' && course.qualificationLevel.toLowerCase() !== selectedLevel.toLowerCase()) {
        return false;
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

  const handleExportCatalog = () => {
    alert('Exporting LNTVC Complete Course Brochure (PDF)...');
  };

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.container}>
        
        {/* Top Academic Header Section */}
        <View style={[styles.headerSection, isMobile && styles.headerSectionMobile]}>
          <View style={styles.headerLeft}>
            {/* Academic Directory Pill */}
            <View style={styles.pillRow}>
              <View style={styles.directoryBadge}>
                <Text style={styles.directoryBadgeText}>OFFICIAL ACADEMIC DIRECTORY</Text>
              </View>
              <Text style={styles.criteriaBadge}>2024/2025 Criteria</Text>
            </View>

            {/* Page Title & Description */}
            <Text style={[styles.title, isMobile && styles.titleMobile]}>
              Courses & Programmes Catalog
            </Text>
            <Text style={styles.subtitle}>
              Government-accredited Artisan, Craft Certificate, and Diploma qualifications aligned 
              with TVET CDACC and KNQF standards. Practical, industry-based training engineered 
              for self-employment and immediate industrial placement.
            </Text>

            {/* 4 Counter Metrics Row */}
            <View style={[styles.metricsRow, isMobile && styles.metricsRowMobile]}>
              <View style={styles.metricItem}>
                <Text style={styles.metricVal}>100%</Text>
                <Text style={styles.metricSub}>Practical Guaranteed</Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={styles.metricVal}>HELB</Text>
                <Text style={styles.metricSub}>Capitation & Upkeep</Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={styles.metricVal}>3 Terms</Text>
                <Text style={styles.metricSub}>Per Academic Year</Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={styles.metricVal}>CDACC</Text>
                <Text style={styles.metricSub}>Dual Assessment</Text>
              </View>
            </View>
          </View>

          {/* Right Workshop Highlight Card */}
          <View style={[styles.headerRight, isMobile && styles.headerRightMobile]}>
            <View style={styles.cbetCard}>
              <View style={styles.cbetImageBox}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
                  }}
                  style={styles.cbetImage}
                  resizeMode="cover"
                />
                <View style={styles.cbetBadge}>
                  <Text style={styles.cbetBadgeText}>TVET CDACC CENTER #LNTVC409</Text>
                </View>
              </View>
              <View style={styles.cbetContent}>
                <Text style={styles.cbetTitle}>Competency-Based Education (CBET)</Text>
                <Text style={styles.cbetDesc}>
                  70% hands-on workshop practice combined with 30% theory. Trainees acquire real-world 
                  competence under industry benchmark standard equipment.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Search, Filter & Quick Department Pills Section */}
        <View style={styles.filterSectionCard}>
          {/* Main Search Row with Export & Reset */}
          <View style={[styles.searchRow, isMobile && styles.searchRowMobile]}>
            <View style={styles.searchBarBox}>
              <Search size={16} color="#707070" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by keyword (e.g., Electrical, ICT, Plumbing, Masonry, Solar)..."
                placeholderTextColor="#A0A0A0"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>

            <View style={styles.searchButtons}>
              <TouchableOpacity 
                style={styles.exportBtn}
                onPress={handleExportCatalog}
                activeOpacity={0.8}
              >
                <Download size={14} color="#FFFFFF" />
                <Text style={styles.exportBtnText}>Export Catalog</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.resetBtn}
                onPress={handleResetFilters}
                activeOpacity={0.8}
              >
                <RotateCcw size={13} color="#707070" />
                <Text style={styles.resetBtnText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 3 Select Dropdowns Row */}
          <View style={[styles.dropdownsRow, isMobile && styles.dropdownsRowMobile]}>
            {/* Filter 1: Department */}
            <View style={styles.dropdownGroup}>
              <Text style={styles.dropdownLabel}>Filter by Department</Text>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                style={styles.selectHtml}
              >
                <option value="all">All Departments (6)</option>
                <option value="ict">ICT & Informatics</option>
                <option value="electrical">Electrical & Electronics</option>
                <option value="automotive">Automotive & Mechanical</option>
                <option value="building">Building & Civil</option>
                <option value="agriculture">Agriculture & Bio-Resources</option>
                <option value="business">Business & Commerce</option>
              </select>
            </View>

            {/* Filter 2: Qualification Level */}
            <View style={styles.dropdownGroup}>
              <Text style={styles.dropdownLabel}>Qualification Level</Text>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                style={styles.selectHtml}
              >
                <option value="all">All Levels (Artisan, Craft, Diploma)</option>
                <option value="artisan">Artisan Certificate (KNQF Level 4)</option>
                <option value="craft">Craft Certificate (KNQF Level 5)</option>
                <option value="diploma">Diploma (KNQF Level 6)</option>
              </select>
            </View>

            {/* Filter 3: Intake Season */}
            <View style={styles.dropdownGroup}>
              <Text style={styles.dropdownLabel}>Intake Season</Text>
              <select
                value={selectedIntake}
                onChange={(e) => setSelectedIntake(e.target.value)}
                style={styles.selectHtml}
              >
                <option value="all">All Intakes (Jan / May / Sept)</option>
                <option value="jan">January Intake</option>
                <option value="may">May Intake</option>
                <option value="sept">September Intake</option>
              </select>
            </View>
          </View>

          {/* Quick Department Pills */}
          <View style={styles.deptPillsRow}>
            {deptPills.map((pill) => {
              const isActive = selectedDept === pill.id;
              return (
                <TouchableOpacity
                  key={pill.id}
                  style={[styles.deptPillBtn, isActive && styles.deptPillActive]}
                  onPress={() => setSelectedDept(pill.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.deptPillText, isActive && styles.deptPillTextActive]}>
                    {pill.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Results Counter */}
        <View style={styles.resultsBar}>
          <Text style={styles.resultsCountText}>
            Showing <Text style={styles.countBold}>{filteredCourses.length}</Text> Accredited Programmes
          </Text>
        </View>

        {/* Course Cards Catalog Grid */}
        <View style={styles.catalogGrid}>
          {filteredCourses.map((course, idx) => (
            <ScrollReveal key={course.id} animation="fade-up" delay={idx * 50} duration={550}>
              <CourseCatalogCard
                course={course}
                onViewDetails={onViewCourseDetails}
                onApplyNow={onApplyCourse}
              />
            </ScrollReveal>
          ))}
        </View>

        {/* Empty Search State */}
        {filteredCourses.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No matching programmes found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search keyword or clearing the filters.</Text>
            <TouchableOpacity style={styles.emptyResetBtn} onPress={handleResetFilters}>
              <Text style={styles.emptyResetText}>Reset All Filters</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>

      {/* Statutory Standards, Funding & Assessment Section */}
      <ScrollReveal animation="fade-up" duration={650}>
        <StatutoryStandardsSection 
          onDownloadFeeSchedule={handleExportCatalog} 
        />
      </ScrollReveal>

      {/* Course CTA Banner */}
      <ScrollReveal animation="zoom-in" duration={650}>
        <CourseCtaBanner 
          onStartApplication={onStartApplication}
          onSpeakAdvisor={() => alert('Connecting to LNTVC Admissions Advisor via WhatsApp (+254 759 437 978)...')}
        />
      </ScrollReveal>
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    paddingTop: 32,
  },
  container: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 32,
  },
  headerSectionMobile: {
    flexDirection: 'column',
    gap: 24,
  },
  headerLeft: {
    flex: 1.25,
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  directoryBadge: {
    backgroundColor: '#14462E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  directoryBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.6,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  criteriaBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.6,
    marginBottom: 8,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  titleMobile: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 14.5,
    lineHeight: 22,
    color: '#475569',
    marginBottom: 20,
    maxWidth: 620,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  metricsRowMobile: {
    gap: 10,
  },
  metricItem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minWidth: 120,
    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
    elevation: 1,
  },
  metricVal: {
    fontSize: 16,
    fontWeight: '900',
    color: '#166534',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  metricSub: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 2,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  headerRight: {
    flex: 0.95,
    width: '100%',
  },
  headerRightMobile: {
    width: '100%',
  },
  cbetCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.06)',
    elevation: 3,
  },
  cbetImageBox: {
    height: 140,
    position: 'relative',
    backgroundColor: '#14462E',
  },
  cbetImage: {
    width: '100%',
    height: '100%',
  },
  cbetBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(20, 70, 46, 0.92)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cbetBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  cbetContent: {
    padding: 14,
  },
  cbetTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  cbetDesc: {
    fontSize: 11.5,
    lineHeight: 17,
    color: '#475569',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  filterSectionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    marginBottom: 14,
  },
  searchRowMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  searchBarBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    backgroundColor: 'transparent',
    borderWidth: 0,
    outline: 'none',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  searchButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 6,
    cursor: 'pointer',
  },
  exportBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 6,
    cursor: 'pointer',
  },
  resetBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  dropdownsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  dropdownsRowMobile: {
    flexDirection: 'column',
  },
  dropdownGroup: {
    flex: 1,
  },
  dropdownLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  selectHtml: {
    height: 38,
    padding: '0 10px',
    borderRadius: 6,
    border: '1px solid #E2E8F0',
    fontSize: 12.5,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: 'none',
    width: '100%',
  },
  deptPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  deptPillBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    cursor: 'pointer',
  },
  deptPillActive: {
    backgroundColor: '#14462E',
    borderColor: '#14462E',
  },
  deptPillText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#334155',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  deptPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  resultsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  resultsCountText: {
    fontSize: 12.5,
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  countBold: {
    fontWeight: '800',
    color: '#0F172A',
  },
  catalogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    marginBottom: 40,
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    marginVertical: 20,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  emptyResetBtn: {
    backgroundColor: '#14462E',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 6,
  },
  emptyResetText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: "'Space Grotesk', sans-serif",
  },
});
