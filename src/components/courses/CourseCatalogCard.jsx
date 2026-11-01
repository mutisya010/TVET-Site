import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { ChevronRight } from 'lucide-react';

export default function CourseCatalogCard({ course, onViewDetails, onApplyNow }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1140;

  const isLevel4 = course.knqfLevel === 'KNQF Level 4';

  return (
    <View 
      style={[
        styles.card,
        isMobile && styles.cardMobile,
        isTablet && styles.cardTablet
      ]}
    >
      {/* Top Header Row: Category Badge & KNQF Level */}
      <View style={styles.topRow}>
        <View style={styles.deptBadge}>
          <Text style={styles.deptBadgeText}>{course.deptLabel}</Text>
        </View>

        <View style={[styles.knqfBadge, isLevel4 && styles.knqfBadgeLevel4]}>
          <Text style={[styles.knqfBadgeText, isLevel4 && styles.knqfTextLevel4]}>
            {course.knqfLevel}
          </Text>
        </View>
      </View>

      {/* Course Title & Code Subline */}
      <TouchableOpacity onPress={() => onViewDetails(course)} activeOpacity={0.8}>
        <Text style={styles.title}>{course.title}</Text>
      </TouchableOpacity>
      <Text style={styles.subline}>
        {course.duration} • {course.examBoard} • Code: {course.code}
      </Text>

      {/* Technical Specifications Grid (2 Columns) */}
      <View style={styles.specsGrid}>
        {/* Left Column */}
        <View style={styles.specColLeft}>
          {course.intakes && (
            <View style={styles.specItem}>
              <Text style={styles.specKey}>Intake Cycles:</Text>
              <Text style={styles.specVal}>{course.intakes.join(', ')}</Text>
            </View>
          )}

          {course.epraLicensing && (
            <View style={styles.specItem}>
              <Text style={styles.specKey}>EPRA Licensing:</Text>
              <Text style={styles.specVal}>{course.epraLicensing}</Text>
            </View>
          )}

          {course.workshopFocus && (
            <View style={styles.specItem}>
              <Text style={styles.specKey}>Workshop Focus:</Text>
              <Text style={styles.specVal}>{course.workshopFocus}</Text>
            </View>
          )}

          {course.ncaAccreditation && (
            <View style={styles.specItem}>
              <Text style={styles.specKey}>NCA Status:</Text>
              <Text style={styles.specVal}>{course.ncaAccreditation}</Text>
            </View>
          )}

          {course.softwareSkills && (
            <View style={styles.specItem}>
              <Text style={styles.specKey}>Software Skills:</Text>
              <Text style={styles.specVal}>{course.softwareSkills}</Text>
            </View>
          )}

          {course.practicalFarm && (
            <View style={styles.specItem}>
              <Text style={styles.specKey}>Practical Farm:</Text>
              <Text style={styles.specVal}>{course.practicalFarm}</Text>
            </View>
          )}

          {course.equipment && (
            <View style={styles.specItem}>
              <Text style={styles.specKey}>Equipment:</Text>
              <Text style={styles.specVal}>{course.equipment}</Text>
            </View>
          )}

          <View style={styles.specItem}>
            <Text style={styles.specKey}>Requirement:</Text>
            <Text style={styles.specVal}>{course.minRequirement}</Text>
          </View>
        </View>

        {/* Right Column */}
        <View style={styles.specColRight}>
          <View style={styles.specItem}>
            <Text style={styles.specKey}>Practical Ratio:</Text>
            <Text style={styles.specVal}>
              {course.practicalRatio || course.handsOnRatio || '70% Practical'}
            </Text>
          </View>

          <View style={styles.specItem}>
            <Text style={styles.specKey}>Exam Board:</Text>
            <Text style={styles.specVal}>
              {course.examBoardDetail || course.examBoard}
            </Text>
          </View>

          {course.fieldPlacement && (
            <View style={styles.specItem}>
              <Text style={styles.specKey}>Field Placement:</Text>
              <Text style={styles.specVal}>{course.fieldPlacement}</Text>
            </View>
          )}

          {course.industrialAttachment && (
            <View style={styles.specItem}>
              <Text style={styles.specKey}>Attachment:</Text>
              <Text style={styles.specVal}>{course.industrialAttachment}</Text>
            </View>
          )}

          {course.labFacilities && (
            <View style={styles.specItem}>
              <Text style={styles.specKey}>Lab Facilities:</Text>
              <Text style={styles.specVal}>{course.labFacilities}</Text>
            </View>
          )}

          {course.certification && (
            <View style={styles.specItem}>
              <Text style={styles.specKey}>Certification:</Text>
              <Text style={styles.specVal}>{course.certification}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Pathways Sub-section */}
      <View style={styles.pathwaysBox}>
        <Text style={styles.pathwaysText}>
          <Text style={styles.pathwaysBold}>Pathways: </Text>
          {course.pathways}
        </Text>
      </View>

      {/* Split Action Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.viewCurriculumBtn}
          onPress={() => onViewDetails(course)}
          activeOpacity={0.85}
        >
          <Text style={styles.viewCurriculumText}>View Course Details</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.arrowBtn}
          onPress={() => onApplyNow(course)}
          activeOpacity={0.85}
        >
          <ChevronRight size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 'calc(33.333% - 16px)',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  cardTablet: {
    width: 'calc(50% - 10px)',
  },
  cardMobile: {
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  deptBadge: {
    backgroundColor: '#FFF8ED',
    borderWidth: 1,
    borderColor: '#FFE8CC',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 4,
  },
  deptBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#CC8400',
    letterSpacing: 0.5,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  knqfBadge: {
    backgroundColor: '#14462E',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 4,
  },
  knqfBadgeLevel4: {
    backgroundColor: '#F59E0B',
  },
  knqfBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.4,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  knqfTextLevel4: {
    color: '#FFFFFF',
  },
  title: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
    lineHeight: 22,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  subline: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 14,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  specsGrid: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  specColLeft: {
    flex: 1.1,
    gap: 5,
  },
  specColRight: {
    flex: 0.9,
    gap: 5,
    borderLeftWidth: 1,
    borderLeftColor: '#E0E0E0',
    paddingLeft: 8,
  },
  specItem: {
    marginBottom: 2,
  },
  specKey: {
    fontSize: 9.5,
    color: '#707070',
    fontWeight: '600',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  specVal: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 14,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  pathwaysBox: {
    marginBottom: 16,
    flexGrow: 1,
  },
  pathwaysText: {
    fontSize: 11.5,
    lineHeight: 17,
    color: '#334155',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  pathwaysBold: {
    fontWeight: '700',
    color: '#0F172A',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    height: 38,
  },
  viewCurriculumBtn: {
    flex: 1,
    backgroundColor: '#14462E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    cursor: 'pointer',
  },
  viewCurriculumText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  arrowBtn: {
    width: 38,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
});
