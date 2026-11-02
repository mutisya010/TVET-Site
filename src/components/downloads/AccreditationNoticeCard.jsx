import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ShieldCheck, Award } from 'lucide-react';
import { colors, typography } from '../../theme/colors';
import logoImg from '../../assets/logo.png';

export default function AccreditationNoticeCard() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoBadgeContainer}>
          <Image 
            source={{ uri: logoImg }} 
            style={styles.accreditLogo}
            resizeMode="contain"
            // @ts-ignore
            accessibilityLabel="Loima TVC Logo"
          />
        </View>
        <View style={styles.headerTitles}>
          <Text style={styles.overline}>STATUTORY AUTHORITY</Text>
          <Text style={styles.title}>Accreditation Notice</Text>
        </View>
      </View>

      {/* Main Notice Body */}
      <Text style={styles.bodyText}>
        Loima Technical and Vocational College is fully registered and licensed by the 
        Technical and Vocational Education and Training Authority (TVETA) under TVET Act No. 29 of 2013.
      </Text>

      {/* Official Registry Table */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableKey}>Registration No:</Text>
          <Text style={styles.tableVal}>TVETA/PUBLIC/TVC/2021</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableKey}>Assessment Centre:</Text>
          <Text style={styles.tableVal}>TVET CDACC Certified</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableKey}>Framework:</Text>
          <Text style={styles.tableVal}>KNQF Level 3, 4, 5 & 6</Text>
        </View>
      </View>

      {/* Certification Guarantee Banner */}
      <View style={styles.guaranteeBox}>
        <Award size={15} color={colors.orange} style={styles.guaranteeIcon} />
        <Text style={styles.guaranteeText}>
          All Craft, Artisan, and Diploma certificates awarded meet full national standards 
          for employment in public and private sectors.
        </Text>
      </View>

      {/* Footer Stamp Status */}
      <View style={styles.footerRow}>
        <Text style={styles.stampLabel}>Statutory Stamp Status:</Text>
        <View style={styles.activePill}>
          <View style={styles.greenDot} />
          <Text style={styles.activeText}>Active Validated 2026</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.greenDeep,
    borderWidth: 1,
    borderColor: colors.greenDark,
    borderRadius: 12,
    padding: 22,
    marginBottom: 20,
    boxShadow: '0 8px 24px rgba(20, 70, 46, 0.15)',
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoBadgeContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    marginRight: 12,
  },
  accreditLogo: {
    width: '100%',
    height: '100%',
  },
  headerTitles: {
    flex: 1,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overline: {
    fontSize: 9.5,
    fontWeight: '800',
    color: colors.orange,
    letterSpacing: 0.6,
    fontFamily: typography.labelFont,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
    fontFamily: typography.headlineFont,
  },
  bodyText: {
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 14,
    fontFamily: typography.bodyFont,
  },
  table: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    padding: 10,
    gap: 7,
    marginBottom: 14,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableKey: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: typography.labelFont,
  },
  tableVal: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.white,
    fontFamily: typography.headlineFont,
  },
  guaranteeBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 6,
    padding: 10,
    marginBottom: 14,
  },
  guaranteeIcon: {
    marginTop: 1,
    flexShrink: 0,
  },
  guaranteeText: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.white,
    flex: 1,
    fontFamily: typography.bodyFont,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
  },
  stampLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    fontFamily: typography.labelFont,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.orange,
  },
  activeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4ADE80',
    fontFamily: typography.labelFont,
  },
});
