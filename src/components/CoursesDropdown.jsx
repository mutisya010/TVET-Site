import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { academicDepartments, allCatalogCourses } from '../data/coursesData';
import { colors, typography } from '../theme/colors';

/**
 * CoursesDropdown component mirroring the official institution structure:
 * - Vertical list of academic departments anchored directly below "Courses & Programmes"
 * - Deep institutional green (#14462E) with warm amber accent (#F59E0B)
 * - Hover / tap revealing adjacent flyout sub-menu displaying the accredited courses
 * - Direct click on any course opens the CourseModal with full curriculum details
 * - "View Complete Course Directory →" footer button
 */
export default function CoursesDropdown({ onSelectCourse, onClose, onViewAllCourses }) {
  const [activeDeptId, setActiveDeptId] = useState(null);

  const getCourseBadge = (level) => {
    if (!level) return { label: 'Dip (L6)', bg: 'rgba(245, 158, 11, 0.2)', color: '#FBBF24', border: 'rgba(245, 158, 11, 0.4)' };
    if (level.includes('Level 6') || level.includes('Diploma')) {
      return { label: 'Dip (L6)', bg: 'rgba(245, 158, 11, 0.2)', color: '#FBBF24', border: 'rgba(245, 158, 11, 0.45)' };
    }
    if (level.includes('Level 5') || level.includes('Craft') || level.includes('Certificate')) {
      return { label: 'Craft (L5)', bg: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', border: 'rgba(56, 189, 248, 0.45)' };
    }
    return { label: 'Artisan (L4)', bg: 'rgba(148, 163, 184, 0.2)', color: '#E2E8F0', border: 'rgba(148, 163, 184, 0.4)' };
  };

  const handleCourseClick = (course) => {
    if (onSelectCourse) {
      onSelectCourse(course);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleViewAll = () => {
    if (onViewAllCourses) {
      onViewAllCourses();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <View 
      style={styles.dropdownBox}
      // @ts-ignore
      onMouseLeave={() => setActiveDeptId(null)}
    >
      {/* Top Gold / Amber Accent Stripe */}
      <View style={styles.topAccent} />

      {/* 6 Academic Departments */}
      {academicDepartments.map((dept, index) => {
        const isHovered = activeDeptId === dept.id;
        const deptCourses = allCatalogCourses.filter((c) => dept.courseIds.includes(c.id));
        const flyoutOffsetTop = index >= 4 ? -80 : 0;

        return (
          <View
            key={dept.id}
            style={styles.submenuParent}
            // @ts-ignore
            onMouseEnter={() => setActiveDeptId(dept.id)}
          >
            {/* Department Row */}
            <TouchableOpacity
              style={[styles.menuItem, isHovered && styles.menuItemHovered]}
              onPress={() => setActiveDeptId(isHovered ? null : dept.id)}
              activeOpacity={0.8}
            >
              <Text 
                style={[styles.menuText, isHovered && styles.menuTextHighlight]}
                numberOfLines={1}
              >
                {dept.title}
              </Text>
              <ChevronRight
                size={14}
                color={isHovered ? colors.orange : 'rgba(255, 255, 255, 0.75)'}
              />
            </TouchableOpacity>

            {/* Submenu Flyout for Department's Courses */}
            {isHovered && (
              <View 
                style={[
                  styles.submenuFlyout, 
                  { top: flyoutOffsetTop }
                ]}
              >
                <View style={styles.submenuLeftAccent} />

                {/* Submenu Header */}
                <View style={styles.flyoutHeaderBox}>
                  <Text style={styles.flyoutHeaderTitle} numberOfLines={1}>
                    {dept.shortTitle ? dept.shortTitle.toUpperCase() : dept.title.toUpperCase()}
                  </Text>
                  <Text style={styles.flyoutHeaderSub}>
                    {deptCourses.length} Accredited Programmes • Click to View Details
                  </Text>
                </View>

                {/* Courses List */}
                <View style={styles.flyoutCoursesList}>
                  {deptCourses.map((course, cIdx) => {
                    const badge = getCourseBadge(course.knqfLevel || course.qualificationLevel);
                    const isLast = cIdx === deptCourses.length - 1;

                    return (
                      <TouchableOpacity
                        key={course.id}
                        style={[styles.courseRow, isLast && styles.courseRowLast]}
                        onPress={() => handleCourseClick(course)}
                        activeOpacity={0.8}
                      >
                        <View style={styles.courseRowTop}>
                          <View style={[styles.badge, { backgroundColor: badge.bg, borderColor: badge.border }]}>
                            <Text style={[styles.badgeText, { color: badge.color }]}>
                              {badge.label}
                            </Text>
                          </View>
                          <Text style={styles.courseDurationText}>
                            {course.duration}
                          </Text>
                        </View>

                        <Text style={styles.courseTitle} numberOfLines={2}>
                          {course.title}
                        </Text>

                        <View style={styles.courseRowBottom}>
                          <CheckCircle2 size={11} color="rgba(255, 255, 255, 0.6)" />
                          <Text style={styles.examBoardText}>
                            {course.examBoard || 'TVET CDACC / KNEC'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        );
      })}

      {/* 7. View Complete Course Directory Link */}
      <TouchableOpacity
        style={styles.viewAllRow}
        onPress={handleViewAll}
        activeOpacity={0.8}
      >
        <View style={styles.viewAllLeft}>
          <BookOpen size={14} color={colors.orange} />
          <Text style={styles.viewAllText}>View Complete Course Directory</Text>
        </View>
        <ArrowRight size={13} color={colors.orange} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownBox: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: 320,
    backgroundColor: colors.greenDeep,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.32)',
    elevation: 12,
    zIndex: 10000,
    overflow: 'visible',
    marginTop: 4,
  },
  topAccent: {
    height: 3,
    backgroundColor: colors.orange,
    width: '100%',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  submenuParent: {
    position: 'relative',
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    transition: 'background-color 0.15s ease',
  },
  menuItemHovered: {
    backgroundColor: '#1A5638',
  },
  menuText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.headlineFont,
    letterSpacing: 0.15,
    flex: 1,
    paddingRight: 8,
  },
  menuTextHighlight: {
    color: colors.orange,
  },

  /* Flyout Submenu */
  submenuFlyout: {
    position: 'absolute',
    left: '100%',
    width: 360,
    backgroundColor: '#113A26',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
    elevation: 16,
    zIndex: 10002,
    marginLeft: 2,
    overflow: 'hidden',
  },
  submenuLeftAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colors.orange,
    zIndex: 2,
  },
  flyoutHeaderBox: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  flyoutHeaderTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.orange,
    fontFamily: typography.labelFont,
    letterSpacing: 0.8,
  },
  flyoutHeaderSub: {
    fontSize: 10.5,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: typography.bodyFont,
    marginTop: 2,
  },
  flyoutCoursesList: {
    paddingVertical: 4,
  },
  courseRow: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    transition: 'background-color 0.15s ease',
  },
  courseRowLast: {
    borderBottomWidth: 0,
  },
  courseRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    fontFamily: typography.labelFont,
    letterSpacing: 0.3,
  },
  courseDurationText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.65)',
    fontFamily: typography.bodyFont,
  },
  courseTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.headlineFont,
    lineHeight: 17,
    marginBottom: 4,
  },
  courseRowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  examBoardText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: typography.bodyFont,
  },

  /* View All Row at Bottom of Main Dropdown */
  viewAllRow: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    cursor: 'pointer',
  },
  viewAllLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewAllText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.orange,
    fontFamily: typography.headlineFont,
    letterSpacing: 0.2,
  },
});
