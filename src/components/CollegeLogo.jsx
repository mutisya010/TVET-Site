import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, typography } from '../theme/colors';
import logoImg from '../assets/logo.png';

export default function CollegeLogo({ variant = 'light', size = 'normal', showText = true }) {
  const isDark = variant === 'dark';
  const isSmall = size === 'small';

  return (
    <View style={styles.container}>
      {/* Official Institutional Logo Emblem */}
      <View style={[
        styles.emblemContainer, 
        isSmall && styles.emblemSmall,
        isDark && styles.emblemDark
      ]}>
        <Image 
          source={{ uri: logoImg }} 
          style={[styles.logoImage, isSmall && styles.logoImageSmall]}
          resizeMode="contain"
          // @ts-ignore
          accessibilityLabel="Loima Technical and Vocational College Official Logo"
        />
      </View>

      {/* College Brand Typography */}
      {showText && (
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, isDark && styles.titleDark, isSmall && styles.titleSmall]}>
              LOIMA
            </Text>
            <View style={styles.tvcBadge}>
              <Text style={styles.tvcText}>TVC</Text>
            </View>
          </View>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark, isSmall && styles.subtitleSmall]}>
            TECHNICAL & VOCATIONAL COLLEGE
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emblemContainer: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 3,
    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.08)',
  },
  emblemSmall: {
    width: 38,
    height: 38,
    borderRadius: 8,
    padding: 2,
  },
  emblemDark: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  logoImageSmall: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    color: colors.textPrimary,
    fontFamily: typography.headlineFont,
  },
  titleDark: {
    color: colors.white,
  },
  titleSmall: {
    fontSize: 16,
  },
  tvcBadge: {
    backgroundColor: colors.orange,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tvcText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
    fontFamily: typography.headlineFont,
  },
  subtitle: {
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: colors.textSecondary,
    marginTop: 2,
    fontFamily: typography.labelFont,
  },
  subtitleDark: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  subtitleSmall: {
    fontSize: 8.5,
  },
});
