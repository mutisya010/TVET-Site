import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, typography } from '../theme/colors';
import defaultLogoImg from '../assets/Loima Technical College Crest.png';
import { useBranding } from '../context/BrandingContext';

export default function CollegeLogo({ variant = 'light', size = 'normal', showText = true }) {
  const { shortName, acronymBadge, tagline, logoUrl, institutionName } = useBranding();
  const isDark = variant === 'dark';
  const isSmall = size === 'small';

  const imageSource = logoUrl 
    ? (typeof logoUrl === 'string' ? { uri: logoUrl } : logoUrl)
    : defaultLogoImg;

  return (
    <View style={styles.container}>
      {/* Official Institutional Logo Emblem */}
      <View style={[
        styles.emblemContainer, 
        isSmall && styles.emblemSmall,
        isDark && styles.emblemDark
      ]}>
        <Image 
          source={imageSource} 
          style={[styles.logoImage, isSmall && styles.logoImageSmall]}
          resizeMode="contain"
          // @ts-ignore
          accessibilityLabel={`${institutionName || 'Loima Technical and Vocational College'} Official Logo`}
        />
      </View>

      {/* College Brand Typography */}
      {showText && (
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, isDark && styles.titleDark, isSmall && styles.titleSmall]}>
              {shortName || 'LOIMA'}
            </Text>
            {acronymBadge ? (
              <View style={styles.tvcBadge}>
                <Text style={styles.tvcText}>{acronymBadge}</Text>
              </View>
            ) : null}
          </View>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark, isSmall && styles.subtitleSmall]}>
            {tagline || 'TECHNICAL & VOCATIONAL COLLEGE'}
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
    borderColor: 'rgba(255, 255, 255, 0.25)',
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
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontFamily: typography.headlineFont,
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 1.5,
  },
  titleDark: {
    color: '#FFFFFF',
  },
  titleSmall: {
    fontSize: 18,
    letterSpacing: 1,
  },
  tvcBadge: {
    backgroundColor: colors.green,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  tvcText: {
    fontFamily: typography.headlineFont,
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: typography.bodyFont,
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1.2,
    marginTop: 1,
  },
  subtitleDark: {
    color: '#E2E8F0',
  },
  subtitleSmall: {
    fontSize: 8.5,
    letterSpacing: 0.8,
  },
});
