import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, useWindowDimensions } from 'react-native';
import { 
  Layers, 
  Coins, 
  Landmark, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  Check 
} from 'lucide-react';
import { colors, typography } from '../../theme/colors';

export default function StatutoryStandardsSection({ onDownloadFeeSchedule }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1140;

  return (
    <View style={styles.section}>
      <View style={styles.container}>
        
        {/* Header Row */}
        <View style={[styles.headerRow, isMobile && styles.headerRowMobile]}>
          <View style={styles.headerLeft}>
            <Text style={styles.overline}>REGULATORY ACCREDITATION & FINANCING</Text>
            <Text style={[styles.title, isMobile && styles.titleMobile]}>
              Statutory Standards, Funding & Assessment
            </Text>
          </View>
          <Text style={styles.headerRightText}>
            All programmes adhere to the Ministry of Education curriculum guidelines under 
            the TVET Act. Trainees benefit from subsidized tuition, HELB upkeep loans, and CDACC certification.
          </Text>
        </View>

        {/* 4 Cards Grid */}
        <View style={styles.cardsGrid}>
          
          {/* Card 1: KNQF Qualification Levels */}
          <View style={[styles.card, isMobile && styles.cardMobile, isTablet && styles.cardTablet]}>
            <View style={styles.cardTop}>
              <View style={[styles.iconBox, { backgroundColor: colors.orange }]}>
                <Layers size={18} color={colors.white} />
              </View>
              <Text style={styles.cardTitle}>KNQF Qualification Levels</Text>
            </View>
            <Text style={styles.cardDesc}>
              The Kenya National Qualifications Framework guarantees seamless progression from artisan certificates to higher diplomas and degrees.
            </Text>

            <View style={styles.levelsTable}>
              <View style={styles.levelRow}>
                <Text style={styles.levelName}>Level 6: Diploma</Text>
                <Text style={styles.levelDuration}>KNEC/CDACC (2-3 Yrs)</Text>
              </View>
              <View style={styles.levelRow}>
                <Text style={styles.levelName}>Level 5: Craft Cert</Text>
                <Text style={styles.levelDuration}>1-2 Yrs (KCSE D)</Text>
              </View>
              <View style={styles.levelRow}>
                <Text style={styles.levelName}>Level 4: Artisan</Text>
                <Text style={styles.levelDuration}>Open Entry (1 Yr)</Text>
              </View>
            </View>
          </View>

          {/* Card 2: Approved Fee Policy */}
          <View style={[styles.card, isMobile && styles.cardMobile, isTablet && styles.cardTablet]}>
            <View style={styles.cardTop}>
              <View style={[styles.iconBox, { backgroundColor: colors.orange }]}>
                <Coins size={18} color={colors.white} />
              </View>
              <Text style={styles.cardTitle}>Approved Fee Policy</Text>
            </View>
            <Text style={styles.cardDesc}>
              Standardised Ministry of Education fee structure with approved tuition capitation for all Loima TVC trainees.
            </Text>

            <View style={styles.feeBreakdown}>
              <View style={styles.feeItem}>
                <Text style={styles.feeLabel}>Government Capitation:</Text>
                <Text style={styles.feeValHighlight}>Direct GoK Subsidy</Text>
              </View>
              <View style={styles.feeItem}>
                <Text style={styles.feeLabel}>Trainee Tuition Share:</Text>
                <Text style={styles.feeVal}>Affordable Subsidized Rates</Text>
              </View>
              <View style={styles.feeItem}>
                <Text style={styles.feeLabel}>Payment Schedule:</Text>
                <Text style={styles.feeVal}>3 Terms per Year</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.cardLink}
              onPress={onDownloadFeeSchedule}
              activeOpacity={0.7}
            >
              <Text style={styles.cardLinkText}>View Official Fee Schedule</Text>
              <ArrowRight size={13} color={colors.orange} />
            </TouchableOpacity>
          </View>

          {/* Card 3: HELB & HEF Funding */}
          <View style={[styles.card, isMobile && styles.cardMobile, isTablet && styles.cardTablet]}>
            <View style={styles.cardTop}>
              <View style={[styles.iconBox, { backgroundColor: colors.green }]}>
                <Landmark size={18} color={colors.white} />
              </View>
              <Text style={styles.cardTitle}>HELB & HEF Funding</Text>
            </View>
            <Text style={styles.cardDesc}>
              100% eligibility for the Higher Education Financing (HEF) Model and national financial aid:
            </Text>

            <View style={styles.fundingBullets}>
              <View style={styles.bulletItem}>
                <Check size={13} color={colors.green} />
                <Text style={styles.bulletText}>Government Scholarships up to 70% based on Means Testing</Text>
              </View>
              <View style={styles.bulletItem}>
                <Check size={13} color={colors.green} />
                <Text style={styles.bulletText}>HELB Tuition & Upkeep Loans available annually per trainee</Text>
              </View>
              <View style={styles.bulletItem}>
                <Check size={13} color={colors.green} />
                <Text style={styles.bulletText}>Turkana County bursaries & CDF vouchers processed</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.cardLink}
              onPress={() => Linking.openURL('https://hef.co.ke')}
              activeOpacity={0.7}
            >
              <Text style={styles.cardLinkText}>Apply via HEF Portal</Text>
              <ExternalLink size={12} color={colors.green} />
            </TouchableOpacity>
          </View>

          {/* Card 4: Certification Bodies */}
          <View style={[styles.card, isMobile && styles.cardMobile, isTablet && styles.cardTablet]}>
            <View style={styles.cardTop}>
              <View style={[styles.iconBox, { backgroundColor: colors.greenDeep }]}>
                <ShieldCheck size={18} color={colors.orange} />
              </View>
              <Text style={styles.cardTitle}>Certification Bodies</Text>
            </View>
            <Text style={styles.cardDesc}>
              Accredited assessment centers delivering globally respected technical credentials:
            </Text>

            <View style={styles.certPills}>
              <View style={styles.certPill}>
                <Text style={styles.certPillText}>• TVET CDACC: Competency CBET Standards</Text>
              </View>
              <View style={styles.certPill}>
                <Text style={styles.certPillText}>• KNEC: National Examination Board</Text>
              </View>
              <View style={styles.certPill}>
                <Text style={styles.certPillText}>• NITA: National Industrial Training & Apprenticeship</Text>
              </View>
            </View>

            <View style={styles.cardLinkStatic}>
              <ShieldCheck size={13} color={colors.textGreen} />
              <Text style={styles.cardLinkTextGreen}>TVETA Accredited: TVETA/PUBLIC/TVC/2021</Text>
            </View>
          </View>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.surfaceAlt,
    paddingVertical: 56,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  container: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 36,
    gap: 20,
  },
  headerRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1.2,
  },
  overline: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.orange,
    letterSpacing: 1.2,
    marginBottom: 6,
    fontFamily: typography.labelFont,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.charcoal,
    letterSpacing: -0.5,
    fontFamily: typography.headlineFont,
  },
  titleMobile: {
    fontSize: 23,
    lineHeight: 29,
  },
  headerRightText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    maxWidth: 440,
    fontFamily: typography.bodyFont,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  card: {
    width: 'calc(25% - 15px)',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 22,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTablet: {
    width: 'calc(50% - 10px)',
  },
  cardMobile: {
    width: '100%',
    padding: 18,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: colors.charcoal,
    fontFamily: typography.headlineFont,
  },
  cardDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.textSecondary,
    marginBottom: 14,
    fontFamily: typography.bodyFont,
  },
  levelsTable: {
    gap: 6,
    marginBottom: 14,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  levelName: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.charcoal,
    fontFamily: typography.headlineFont,
  },
  levelDuration: {
    fontSize: 10.5,
    color: colors.textMuted,
    fontFamily: typography.bodyFont,
  },
  feeBreakdown: {
    gap: 6,
    marginBottom: 14,
  },
  feeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontFamily: typography.bodyFont,
  },
  feeValHighlight: {
    fontSize: 11.5,
    fontWeight: '800',
    color: colors.orange,
    fontFamily: typography.headlineFont,
  },
  feeVal: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.charcoal,
    fontFamily: typography.bodyFont,
  },
  fundingBullets: {
    gap: 7,
    marginBottom: 14,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  bulletText: {
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.textSecondary,
    flex: 1,
    fontFamily: typography.bodyFont,
  },
  certPills: {
    gap: 6,
    marginBottom: 14,
  },
  certPill: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  certPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.charcoal,
    fontFamily: typography.bodyFont,
  },
  cardLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    cursor: 'pointer',
  },
  cardLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.orange,
    fontFamily: typography.labelFont,
  },
  cardLinkStatic: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  cardLinkTextGreen: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.textGreen,
    fontFamily: typography.labelFont,
  },
});
