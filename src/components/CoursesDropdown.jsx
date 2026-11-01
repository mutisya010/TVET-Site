import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { 
  Zap, 
  Car, 
  HardHat, 
  Monitor, 
  Sprout, 
  Utensils, 
  ArrowRight, 
  BookOpen, 
  Award,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { academicDepartments, allCatalogCourses } from '../data/coursesData';
import { colors, typography } from '../theme/colors';

export default function CoursesDropdown({ onSelectCourse, onClose, onViewAllCourses, onOpenInquiry }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;

  const getDepartmentIcon = (iconName, color) => {
    switch (iconName) {
      case 'Zap':
        return <Zap size={16} color={color || '#D97706'} />;
      case 'Car':
        return <Car size={16} color={color || '#14462E'} />;
      case 'HardHat':
        return <HardHat size={16} color={color || '#D97706'} />;
      case 'Monitor':
        return <Monitor size={16} color={color || '#166534'} />;
      case 'Sprout':
        return <Sprout size={16} color={color || '#166534'} />;
      case 'Utensils':
        return <Utensils size={16} color={color || '#B45309'} />;
      default:
        return <BookOpen size={16} color={color || '#14462E'} />;
    }
  };

  const getCourseBadge = (level) => {
    if (level.includes('Level 6') || level.includes('Diploma')) {
      return { label: 'Dip (L6)', bg: '#F0FDF4', color: '#166534', border: '#BBF7D0' };
    }
    if (level.includes('Level 5') || level.includes('Craft') || level.includes('Certificate')) {
      return { label: 'Craft (L5)', bg: '#FFFBEB', color: '#B45309', border: '#FDE68A' };
    }
    return { label: 'Art (L4)', bg: '#F1F5F9', color: '#334155', border: '#CBD5E1' };
  };

  return (
    <View style={styles.dropdownContainer}>
      <View style={styles.innerContent}>
        
        {/* Top Header Label */}
        <View style={styles.topMegaHeader}>
          <View style={styles.megaHeaderLeft}>
            <Award size={15} color={colors.greenDeep} />
            <Text style={styles.megaHeaderTitle}>
              ACCREDITED ACADEMIC PROGRAMMES BY DEPARTMENT
            </Text>
          </View>
          <Text style={styles.megaHeaderHint}>
            Click any course to view full curriculum, entry criteria, duration, and fees
          </Text>
        </View>

        {/* 6-Department Mega Menu Grid */}
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {academicDepartments.map((dept) => {
            const deptCourses = allCatalogCourses.filter((c) => dept.courseIds.includes(c.id));

            return (
              <View key={dept.id} style={styles.column}>
                {/* Department Header */}
                <View style={styles.deptHeader}>
                  <View style={[styles.deptIconBox, { backgroundColor: dept.tagBg }]}>
                    {getDepartmentIcon(dept.icon, dept.tagColor)}
                  </View>
                  <View style={styles.deptHeaderText}>
                    <Text style={styles.deptTitle} numberOfLines={1}>
                      {dept.shortTitle || dept.title}
                    </Text>
                    <Text style={styles.deptSub} numberOfLines={1}>
                      {dept.description}
                    </Text>
                  </View>
                </View>

                {/* Courses List */}
                <View style={styles.coursesList}>
                  {deptCourses.map((course) => {
                    const badge = getCourseBadge(course.knqfLevel || course.qualificationLevel);

                    return (
                      <TouchableOpacity
                        key={course.id}
                        style={styles.courseItemRow}
                        onPress={() => {
                          if (onClose) onClose();
                          if (onSelectCourse) onSelectCourse(course);
                        }}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.levelTag, { backgroundColor: badge.bg, borderColor: badge.border }]}>
                          <Text style={[styles.levelTagText, { color: badge.color }]}>
                            {badge.label}
                          </Text>
                        </View>
                        <Text style={styles.courseTitleText} numberOfLines={1}>
                          {course.title}
                        </Text>
                        <ChevronRight size={12} color="#94A3B8" style={styles.chevron} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>

        {/* Bottom Banner Ribbon */}
        <View style={styles.bottomRibbon}>
          <View style={styles.ribbonLeft}>
            <ShieldCheck size={16} color="#FFFFFF" />
            <Text style={styles.ribbonText}>
              All programmes accredited by TVETA & CDACC • National Government Capitation & HELB Supported
            </Text>
          </View>

          <View style={styles.ribbonActions}>
            <TouchableOpacity 
              style={styles.ribbonActionBtn}
              onPress={() => {
                if (onClose) onClose();
                if (onViewAllCourses) onViewAllCourses();
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.ribbonActionBtnText}>Browse Full 15+ Course Catalog</Text>
              <ArrowRight size={13} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.applyFastBtn}
              onPress={() => {
                if (onClose) onClose();
                if (onOpenInquiry) onOpenInquiry();
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.applyFastBtnText}>Apply Online</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 3,
    borderBottomColor: colors.greenDeep,
    boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)',
    elevation: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  innerContent: {
    maxWidth: 1260,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 14,
  },
  topMegaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    flexWrap: 'wrap',
    gap: 10,
  },
  megaHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  megaHeaderTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.greenDeep,
    letterSpacing: 1,
    fontFamily: typography.labelFont,
  },
  megaHeaderHint: {
    fontSize: 11.5,
    color: colors.textMuted,
    fontFamily: typography.bodyFont,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 16,
  },
  gridMobile: {
    flexDirection: 'column',
    gap: 16,
  },
  column: {
    width: 'calc(33.333% - 14px)',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
  },
  deptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 8,
  },
  deptIconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deptHeaderText: {
    flex: 1,
    overflow: 'hidden',
  },
  deptTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    fontFamily: typography.headlineFont,
  },
  deptSub: {
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 1,
    fontFamily: typography.bodyFont,
  },
  coursesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  courseItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    cursor: 'pointer',
  },
  levelTag: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  levelTagText: {
    fontSize: 9.5,
    fontWeight: '800',
    fontFamily: typography.labelFont,
  },
  courseTitleText: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '600',
    flex: 1,
    fontFamily: typography.bodyFont,
  },
  chevron: {
    marginLeft: 2,
  },

  /* Bottom Ribbon */
  bottomRibbon: {
    backgroundColor: colors.greenDeep,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    flexWrap: 'wrap',
  },
  ribbonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: 280,
  },
  ribbonText: {
    fontSize: 12,
    color: '#E2E8F0',
    fontWeight: '600',
    fontFamily: typography.bodyFont,
  },
  ribbonActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ribbonActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    cursor: 'pointer',
  },
  ribbonActionBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.labelFont,
  },
  applyFastBtn: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    cursor: 'pointer',
  },
  applyFastBtnText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: typography.labelFont,
  },
});

