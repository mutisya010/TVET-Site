import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Sparkles, ArrowRight, MessageSquare, MapPin } from 'lucide-react';
import { colors, typography } from '../../theme/colors';

export default function CourseCtaBanner({ onStartApplication, onSpeakAdvisor }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.bannerWrapper}>
      <View style={styles.container}>
        <View style={[styles.inner, isMobile && styles.innerMobile]}>
          
          {/* Left Text Column */}
          <View style={styles.leftCol}>
            <View style={styles.tagBadge}>
              <Sparkles size={12} color={colors.white} />
              <Text style={styles.tagText}>ENROLLMENT OPEN FOR NEXT INTAKE COHORT</Text>
            </View>

            <Text style={[styles.title, isMobile && styles.titleMobile]}>
              Ready to Forge Your Technical Career?
            </Text>

            <Text style={styles.description}>
              Apply directly online or visit the Academic Registrar's Office at our Main Campus in Loima, 
              Turkana County. Need guidance regarding entry requirements, HELB funding, or course selection?
            </Text>

            <View style={styles.locationPill}>
              <MapPin size={12} color={colors.orange} />
              <Text style={styles.locationPillText}>Loima Technical and Vocational College • Main Campus, Loima</Text>
            </View>
          </View>

          {/* Right Action Buttons */}
          <View style={[styles.rightCol, isMobile && styles.rightColMobile]}>
            <TouchableOpacity 
              style={styles.primaryBtn}
              onPress={onStartApplication}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>Start Online Application</Text>
              <ArrowRight size={15} color={colors.white} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryBtn}
              onPress={onSpeakAdvisor}
              activeOpacity={0.85}
            >
              <MessageSquare size={15} color={colors.orange} />
              <Text style={styles.secondaryBtnText}>Speak with an Admissions Advisor</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerWrapper: {
    backgroundColor: colors.greenDeep,
    paddingVertical: 48,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
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
    gap: 36,
  },
  innerMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 24,
  },
  leftCol: {
    flex: 1.3,
  },
  tagBadge: {
    backgroundColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.6,
    fontFamily: typography.labelFont,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.5,
    marginBottom: 10,
    fontFamily: typography.headlineFont,
  },
  titleMobile: {
    fontSize: 22,
    lineHeight: 28,
  },
  description: {
    fontSize: 13.5,
    lineHeight: 21,
    color: 'rgba(255, 255, 255, 0.88)',
    maxWidth: 620,
    fontFamily: typography.bodyFont,
    marginBottom: 14,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  locationPillText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    fontFamily: typography.labelFont,
  },
  rightCol: {
    flex: 0.9,
    gap: 12,
    alignItems: 'flex-end',
  },
  rightColMobile: {
    width: '100%',
    alignItems: 'stretch',
  },
  primaryBtn: {
    backgroundColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 8,
    cursor: 'pointer',
    width: '100%',
    maxWidth: 320,
  },
  primaryBtnText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: colors.white,
    fontFamily: typography.labelFont,
  },
  secondaryBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 8,
    cursor: 'pointer',
    width: '100%',
    maxWidth: 320,
  },
  secondaryBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
    fontFamily: typography.labelFont,
  },
});
