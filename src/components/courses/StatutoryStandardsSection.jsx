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
            <Text style={styles.overline}>REGULATORY FRAMEWORK & FINANCING</Text>
            <Text style={[styles.title, isMobile && styles.titleMobile]}>
              Statutory Standards, Funding & Assessment
            </Text>
          </View>
          <Text style={styles.headerRightText}>
            All courses comply with the Ministry of Education curriculum guidelines under 
            the Technical and Vocational Education and Training Act of 2013.
          </Text>
        </View>

        {/* 4 Cards Grid */}
        <View style={styles.cardsGrid}>
          
          {/* Card 1: KNQF Qualification Levels */}
          <View style={[styles.card, isMobile && styles.cardMobile, isTablet && styles.cardTablet]}>
            <View style={styles.cardTop}>
              <View style={[styles.iconBox, { backgroundColor: '#FFA500' }]}>
                <Layers size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.cardTitle}>KNQF Qualification Levels</Text>
            </View>
            <Text style={styles.cardDesc}>
              The Kenya National Qualifications Framework guarantees progression from artisan to university degrees.
            </Text>

            <View style={styles.levelsTable}>
              <View style={styles.levelRow}>
                <Text style={styles.levelName}>Level 6: Diploma</Text>
                <Text style={styles.levelDuration}>KNEC/CDACC (2-3 Yrs)</Text>
              </View>
              <View style={styles.levelRow}>
                <Text style={styles.levelName}>Level 5: Craft Cert</Text>
                <Text style={styles.levelDuration}>1-2 Yrs</Text>
              </View>
              <View style={styles.levelRow}>
                <Text style={styles.levelName}>Level 4: Artisan</Text>
                <Text style={styles.levelDuration}>Open entry KCSE/KCPE (1 Yr)</Text>
              </View>
            </View>
          </View>

          {/* Card 2: Approved Fee Policy */}
          <View style={[styles.card, isMobile && styles.cardMobile, isTablet && styles.cardTablet]}>
            <View style={styles.cardTop}>
              <View style={[styles.iconBox, { backgroundColor: '#FFA500' }]}>
                <Coins size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.cardTitle}>Approved Fee Policy</Text>
            </View>
            <Text style={styles.cardDesc}>
              Standardised Ministry of Education fee structure with approved tuition capitation for all Loima TVC trainees.
            </Text>

            <View style={styles.feeBreakdown}>
              <View style={styles.feeItem}>
                <Text style={styles.feeLabel}>Government Capitation:</Text>
                <Text style={styles.feeValHighlight}>Direct Subsidy</Text>
              </View>
              <View style={styles.feeItem}>
                <Text style={styles.feeLabel}>Trainee Tuition Share:</Text>
                <Text style={styles.feeVal}>Subsidized Rates</Text>
              </View>
              <View style={styles.feeItem}>
                <Text style={styles.feeLabel}>Installment System:</Text>
                <Text style={styles.feeVal}>3 Terms per Year</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.cardLink}
              onPress={onDownloadFeeSchedule}
              activeOpacity={0.7}
            >
              <Text style={styles.cardLinkText}>Download Fee Schedule (PDF)</Text>
              <ArrowRight size={13} color="#FFA500" />
            </TouchableOpacity>
          </View>

          {/* Card 3: HELB & HEF Funding */}
          <View style={[styles.card, isMobile && styles.cardMobile, isTablet && styles.cardTablet]}>
            <View style={styles.cardTop}>
              <View style={[styles.iconBox, { backgroundColor: '#2E8B57' }]}>
                <Landmark size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.cardTitle}>HELB & HEF Funding</Text>
            </View>
            <Text style={styles.cardDesc}>
              100% eligibility for the New Higher Education Funding (HEF) Model:
            </Text>

            <View style={styles.fundingBullets}>
              <View style={styles.bulletItem}>
                <Check size={13} color="#2E8B57" />
                <Text style={styles.bulletText}>Government Scholarships up to 70% based on Means Testing</Text>
              </View>
              <View style={styles.bulletItem}>
                <Check size={13} color="#2E8B57" />
                <Text style={styles.bulletText}>HELB Tuition & Upkeep Loans available annually per trainee</Text>
              </View>
              <View style={styles.bulletItem}>
                <Check size={13} color="#2E8B57" />
                <Text style={styles.bulletText}>County bursaries & CDF vouchers processed seamlessly</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.cardLink}
              onPress={() => Linking.openURL('https://hef.co.ke')}
              activeOpacity={0.7}
            >
              <Text style={styles.cardLinkText}>Apply via HEF Portal</Text>
              <ExternalLink size={12} color="#2E8B57" />
            </TouchableOpacity>
          </View>

          {/* Card 4: Certification Bodies */}
          <View style={[styles.card, isMobile && styles.cardMobile, isTablet && styles.cardTablet]}>
            <View style={styles.cardTop}>
              <View style={[styles.iconBox, { backgroundColor: '#14462E' }]}>
                <ShieldCheck size={18} color="#F59E0B" />
              </View>
              <Text style={styles.cardTitle}>Certification Bodies</Text>
            </View>
            <Text style={styles.cardDesc}>
              Accredited assessment centers delivering globally respected credentials:
            </Text>

            <View style={styles.certPills}>
              <View style={styles.certPill}>
                <Text style={styles.certPillText}>• TVET CDACC: Competency CBET</Text>
              </View>
              <View style={styles.certPill}>
                <Text style={styles.certPillText}>• KNEC: National Board Certified</Text>
              </View>
              <View style={styles.certPill}>
                <Text style={styles.certPillText}>• NITA: National Industrial Training</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.cardLink}
              onPress={() => alert('Loima TVC is fully registered and accredited by TVETA under Registration No: TVETA/PUBLIC/TVC/0212')}
              activeOpacity={0.7}
            >
              <Text style={styles.cardLinkText}>Registry Accreditation Status</Text>
              <ArrowRight size={13} color="#FFA500" />
            </TouchableOpacity>
          </View>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FAF9F6',
    paddingVertical: 56,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
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
    color: '#FFA500',
    letterSpacing: 1.2,
    marginBottom: 6,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  titleMobile: {
    fontSize: 24,
  },
  headerRightText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    color: '#64748B',
    maxWidth: 420,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  card: {
    width: 'calc(25% - 15px)',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)',
    elevation: 2,
  },
  cardTablet: {
    width: 'calc(50% - 10px)',
  },
  cardMobile: {
    width: '100%',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#0F172A',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  cardDesc: {
    fontSize: 11.5,
    lineHeight: 16,
    color: '#64748B',
    marginBottom: 14,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  levelsTable: {
    gap: 6,
    marginBottom: 14,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  levelName: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  levelDuration: {
    fontSize: 10,
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  feeBreakdown: {
    gap: 5,
    marginBottom: 14,
  },
  feeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feeLabel: {
    fontSize: 10.5,
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  feeValHighlight: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F59E0B',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  feeVal: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  fundingBullets: {
    gap: 6,
    marginBottom: 14,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  bulletText: {
    fontSize: 11,
    lineHeight: 15,
    color: '#334155',
    flex: 1,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  certPills: {
    gap: 6,
    marginBottom: 14,
  },
  certPill: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  certPillText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  cardLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    cursor: 'pointer',
  },
  cardLinkText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFA500',
    fontFamily: "'Space Grotesk', sans-serif",
  },
});
