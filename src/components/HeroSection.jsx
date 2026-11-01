import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { ArrowRight, Compass, ShieldCheck, Award } from 'lucide-react';
import { colors, typography } from '../theme/colors';

export default function HeroSection({ onExploreCourses, onApplyNow }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 960;

  return (
    <View style={styles.sectionWrapper}>
      {/* Background Soft Green/Orange Glow */}
      <View style={styles.bgGlow} />

      <View style={styles.container}>
        <View style={[styles.inner, isMobile && styles.innerMobile]}>
          
          {/* Left Column: Heading, Badges, Text, CTAs */}
          <View style={[styles.leftCol, isMobile && styles.leftColMobile]}>
            {/* National TVET Status Pill Badge */}
            <View style={styles.govBadge}>
              <View style={styles.govDot} />
              <Text style={styles.govBadgeText}>
                MINISTRY OF EDUCATION • STATE DEPARTMENT FOR TVET
              </Text>
            </View>

            {/* Main Hero Headline */}
            <Text style={[styles.headline, isMobile && styles.headlineMobile]}>
              Empowering Youth with Practical Technical & Vocational Skills for the Modern Industry.
            </Text>

            {/* Sub-paragraph */}
            <Text style={styles.paragraph}>
              Laikipia North Technical and Vocational College provides accredited Competency-Based 
              Education and Training (CBET). We equip students with job-ready technical expertise, 
              subsidised by national capitation and tailored for immediate employment.
            </Text>

            {/* Action Buttons */}
            <View style={[styles.buttonRow, isMobile && styles.buttonRowMobile]}>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={onExploreCourses}
                activeOpacity={0.85}
              >
                <Compass size={17} color={colors.white} />
                <Text style={styles.primaryBtnText}>Explore Courses (15)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={onApplyNow}
                activeOpacity={0.85}
              >
                <Text style={styles.secondaryBtnText}>Apply for Admission</Text>
                <ArrowRight size={16} color={colors.white} />
              </TouchableOpacity>
            </View>

            {/* KUCCPS Trust Subtext */}
            <View style={styles.trustRow}>
              <ShieldCheck size={16} color={colors.green} />
              <Text style={styles.trustText}>
                KUCCPS Institution Code: <Text style={styles.trustBold}>1478111</Text> • Government Placed & Self-Sponsored
              </Text>
            </View>
          </View>

          {/* Right Column: Hero Workshop Image + Overlays */}
          <View style={[styles.rightCol, isMobile && styles.rightColMobile]}>
            <View style={styles.imageCardWrapper}>
              {/* Main Workshop Image */}
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
                }}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <View style={styles.imageOverlayGradient} />

              {/* Tag Pill on Image */}
              <View style={styles.imageTagBadge}>
                <View style={styles.livePulse} />
                <Text style={styles.imageTagText}>
                  HANDS-ON WORKSHOP TRAINING & 100% CBET
                </Text>
              </View>

              {/* Floating White Overlay Card: 100% Industry Attachment */}
              <View style={styles.floatingCard}>
                <View style={styles.floatingIconBox}>
                  <Award size={22} color={colors.green} />
                </View>
                <View style={styles.floatingContent}>
                  <Text style={styles.floatingStat}>100%</Text>
                  <Text style={styles.floatingLabel}>Industry Attachment</Text>
                  <Text style={styles.floatingSub}>All qualified trainees placed in industry</Text>
                </View>
              </View>
            </View>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionWrapper: {
    backgroundColor: colors.white,
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 36,
    paddingBottom: 48,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bgGlow: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 450,
    height: 450,
    borderRadius: 225,
    backgroundColor: 'rgba(46, 139, 87, 0.08)',
    pointerEvents: 'none',
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
    gap: 40,
  },
  innerMobile: {
    flexDirection: 'column',
    gap: 32,
  },
  leftCol: {
    flex: 1.15,
    alignItems: 'flex-start',
  },
  leftColMobile: {
    width: '100%',
  },
  govBadge: {
    backgroundColor: colors.greenLight,
    borderWidth: 1,
    borderColor: colors.greenMuted,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 5.5,
    borderRadius: 20,
    marginBottom: 16,
  },
  govDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.green,
  },
  govBadgeText: {
    color: colors.textGreen,
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.6,
    fontFamily: typography.labelFont,
  },
  headline: {
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 46,
    color: colors.textPrimary,
    letterSpacing: -0.8,
    marginBottom: 16,
    fontFamily: typography.headlineFont,
  },
  headlineMobile: {
    fontSize: 28,
    lineHeight: 34,
  },
  paragraph: {
    fontSize: 14.5,
    lineHeight: 23,
    color: colors.textSecondary,
    marginBottom: 24,
    maxWidth: 580,
    fontFamily: typography.bodyFont,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  buttonRowMobile: {
    width: '100%',
    flexDirection: 'column',
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
    cursor: 'pointer',
  },
  primaryBtnText: {
    color: colors.white,
    fontSize: 13.5,
    fontWeight: '800',
    fontFamily: typography.headlineFont,
  },
  secondaryBtn: {
    backgroundColor: colors.greenDeep,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.greenDark,
    cursor: 'pointer',
  },
  secondaryBtnText: {
    color: colors.white,
    fontSize: 13.5,
    fontWeight: '700',
    fontFamily: typography.labelFont,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
  },
  trustText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
  },
  trustBold: {
    fontWeight: '800',
    color: colors.textPrimary,
  },
  rightCol: {
    flex: 0.95,
    width: '100%',
  },
  rightColMobile: {
    width: '100%',
  },
  imageCardWrapper: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(20, 70, 46, 0.12)',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    aspectRatio: 16 / 11,
    minHeight: 280,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlayGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 70, 46, 0.15)',
  },
  imageTagBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.greenDeep,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  livePulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.orange,
    animation: 'pulseGlow 2s ease-in-out infinite',
  },
  imageTagText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: typography.labelFont,
  },
  floatingCard: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    left: 14,
    maxWidth: 290,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'flex-end',
    animation: 'floatGentle 4.5s ease-in-out infinite',
  },
  floatingIconBox: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: colors.greenLight,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  floatingContent: {
    flex: 1,
  },
  floatingStat: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.greenDeep,
    lineHeight: 22,
    fontFamily: typography.headlineFont,
  },
  floatingLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    color: colors.textPrimary,
    fontFamily: typography.labelFont,
  },
  floatingSub: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 1,
    fontFamily: typography.bodyFont,
  },
});
