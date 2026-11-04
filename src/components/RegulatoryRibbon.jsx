import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { ShieldCheck } from 'lucide-react';
import { colors, typography } from '../theme/colors';

export default function RegulatoryRibbon() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const accreditors = [
    'TVETA REG: TVETA/PUBLIC/TVC/0005/2023',
    'CDACC ASSESSMENT CENTRE: 02300008',
    'KNEC EXAMINATION CENTRE',
    'NITA CERTIFIED TRADES',
    'KUCCPS & HEF/HELB FUNDING',
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={[styles.inner, isMobile && styles.innerMobile]}>
          {/* Left Title */}
          <View style={styles.titleRow}>
            <ShieldCheck size={16} color={colors.orange} />
            <Text style={styles.titleText}>ACCREDITED HIGHER REGULATORY BODIES</Text>
          </View>

          {/* Right Badges */}
          <View style={[styles.badgesRow, isMobile && styles.badgesRowMobile]}>
            {accreditors.map((item, index) => (
              <View key={index} style={styles.pillBadge}>
                <View style={styles.bulletDot} />
                <Text style={styles.pillText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.greenDeep,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.greenDark,
  },
  container: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  innerMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.8,
    fontFamily: typography.headlineFont,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  badgesRowMobile: {
    width: '100%',
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.orange,
  },
  pillText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 0.3,
    fontFamily: typography.labelFont,
  },
});
