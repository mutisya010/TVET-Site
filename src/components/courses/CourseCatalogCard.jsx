import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Clock, Award, ArrowRight, BookOpen, GraduationCap, Sparkles, Layers } from 'lucide-react';
import { colors, typography } from '../../theme/colors';

export default function CourseCatalogCard({ course, onViewDetails, onApplyNow }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1140;

  // Determine qualification level badge styles
  const isDiploma = course.qualificationLevel?.toLowerCase().includes('diploma') || course.knqfLevel?.includes('Level 6');
  const isCraft = course.qualificationLevel?.toLowerCase().includes('craft') || course.knqfLevel?.includes('Level 5');
  const isArtisan = course.qualificationLevel?.toLowerCase().includes('artisan') || course.knqfLevel?.includes('Level 4');

  const getLevelBadgeStyle = () => {
    if (isDiploma) return styles.badgeDiploma;
    if (isCraft) return styles.badgeCraft;
    return styles.badgeArtisan;
  };

  const getLevelTextStyle = () => {
    if (isDiploma) return styles.textDiploma;
    if (isCraft) return styles.textCraft;
    return styles.textArtisan;
  };

  // Extract up to 3 career/skills keywords from pathways or modules
  const pathwaysList = course.pathways 
    ? course.pathways.split(',').map((p) => p.trim()).filter(Boolean).slice(0, 3)
    : [];

  return (
    <View 
      style={[
        styles.card,
        isMobile && styles.cardMobile,
        isTablet && styles.cardTablet
      ]}
      className="tvet-card-interactive"
      dataSet={{ class: 'tvet-card-interactive' }}
    >
      {/* Top Header Row: Category Badge & KNQF Level */}
      <View style={styles.topRow}>
        <View style={styles.deptBadge}>
          <Text style={styles.deptBadgeText}>{course.deptLabel || course.department?.toUpperCase()}</Text>
        </View>

        <View style={[styles.levelBadge, getLevelBadgeStyle()]}>
          <Text style={[styles.levelBadgeText, getLevelTextStyle()]}>
            {course.knqfLevel || course.qualificationLevel}
          </Text>
        </View>
      </View>

      {/* Course Title & Code Header */}
      <View style={styles.titleArea}>
        <TouchableOpacity onPress={() => onViewDetails && onViewDetails(course)} activeOpacity={0.8}>
          <Text 
            style={styles.title} 
            numberOfLines={2}
            // @ts-ignore
            data-card-title="true"
            dataSet={{ cardTitle: 'true' }}
          >
            {course.title}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.codeRow}>
          <Text style={styles.codeText}>Code: {course.code}</Text>
          <View style={styles.dotSeparator} />
          <Text style={styles.examBoardText}>{course.examBoard}</Text>
        </View>
      </View>

      {/* Meta Highlights Strip */}
      <View style={styles.metaStrip}>
        <View style={styles.metaItem}>
          <Clock size={13} color={colors.textMuted} />
          <Text style={styles.metaText}>{course.duration}</Text>
        </View>

        <View style={styles.metaDivider} />

        <View style={styles.metaItem}>
          <Sparkles size={13} color={colors.orange} />
          <Text style={styles.metaText}>
            {course.practicalRatio ? course.practicalRatio.split('/')[0].trim() : '70% Practical'}
          </Text>
        </View>

        <View style={styles.metaDivider} />

        <View style={styles.metaItem}>
          <Layers size={13} color={colors.green} />
          <Text style={styles.metaText}>
            {course.intakes ? `${course.intakes.join('/')} Intakes` : '3 Intakes'}
          </Text>
        </View>
      </View>

      {/* Entry Requirement Box */}
      <View style={styles.requirementCard}>
        <View style={styles.requirementHeader}>
          <GraduationCap size={13} color={colors.greenDark} />
          <Text style={styles.requirementLabel}>Minimum Entry Requirement</Text>
        </View>
        <Text style={styles.requirementText} numberOfLines={2}>
          {course.minRequirement}
        </Text>
      </View>

      {/* Pathways / Competency Tags */}
      {pathwaysList.length > 0 && (
        <View style={styles.pathwaysRow}>
          {pathwaysList.map((tag, idx) => (
            <View key={idx} style={styles.pathwayPill}>
              <Text style={styles.pathwayPillText} numberOfLines={1}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Action Buttons Row */}
      <View style={styles.actionsRow}>
        <TouchableOpacity 
          style={styles.detailsBtn}
          onPress={() => onViewDetails && onViewDetails(course)}
          activeOpacity={0.8}
          className="tvet-btn-outline"
          dataSet={{ class: 'tvet-btn-outline' }}
        >
          <BookOpen size={13} color={colors.greenDeep} />
          <Text style={styles.detailsBtnText}>Details</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.applyBtn}
          onPress={() => onApplyNow && onApplyNow(course)}
          activeOpacity={0.85}
          className="tvet-btn-secondary"
          dataSet={{ class: 'tvet-btn-secondary' }}
        >
          <Text style={styles.applyBtnText}>Apply Now</Text>
          <ArrowRight size={13} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 'calc(33.333% - 16px)',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
  },
  cardTablet: {
    width: 'calc(50% - 12px)',
  },
  cardMobile: {
    width: '100%',
    padding: 16,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 12,
  },
  deptBadge: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 5,
  },
  deptBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    fontFamily: typography.labelFont,
  },
  levelBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: 5,
    borderWidth: 1,
  },
  badgeDiploma: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  textDiploma: {
    color: '#1D4ED8',
    fontWeight: '800',
    fontSize: 10,
    fontFamily: typography.labelFont,
  },
  badgeCraft: {
    backgroundColor: colors.orangeLight,
    borderColor: colors.orangeMuted,
  },
  textCraft: {
    color: colors.orangeDark,
    fontWeight: '800',
    fontSize: 10,
    fontFamily: typography.labelFont,
  },
  badgeArtisan: {
    backgroundColor: colors.greenLight,
    borderColor: colors.greenMuted,
  },
  textArtisan: {
    color: colors.textGreen,
    fontWeight: '800',
    fontSize: 10,
    fontFamily: typography.labelFont,
  },
  levelBadgeText: {
    fontSize: 10,
    fontFamily: typography.labelFont,
  },
  titleArea: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.charcoal,
    lineHeight: 22,
    fontFamily: typography.headlineFont,
    marginBottom: 6,
    cursor: 'pointer',
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  codeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    fontFamily: typography.labelFont,
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.textLight,
  },
  examBoardText: {
    fontSize: 11,
    color: colors.textMuted,
    fontFamily: typography.bodyFont,
  },
  metaStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
  },
  metaDivider: {
    width: 1,
    height: 12,
    backgroundColor: colors.border,
  },
  requirementCard: {
    backgroundColor: colors.greenLight,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.greenMuted,
    marginBottom: 12,
  },
  requirementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  requirementLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textGreen,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    fontFamily: typography.labelFont,
  },
  requirementText: {
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.charcoal,
    fontWeight: '600',
    fontFamily: typography.bodyFont,
  },
  pathwaysRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  pathwayPill: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  pathwayPillText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
    fontFamily: typography.bodyFont,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  detailsBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 7,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    cursor: 'pointer',
  },
  detailsBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.greenDeep,
    fontFamily: typography.labelFont,
  },
  applyBtn: {
    flex: 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 7,
    backgroundColor: colors.greenDeep,
    cursor: 'pointer',
  },
  applyBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    fontFamily: typography.labelFont,
  },
});
