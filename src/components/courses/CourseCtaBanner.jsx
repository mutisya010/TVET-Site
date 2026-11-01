import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Sparkles, ArrowRight, MessageSquare } from 'lucide-react';

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
              <Sparkles size={12} color="#FFFFFF" />
              <Text style={styles.tagText}>ENROLLMENT OPEN FOR NEXT INTAKE COHORT</Text>
            </View>

            <Text style={[styles.title, isMobile && styles.titleMobile]}>
              Ready to Forge Your Technical Future?
            </Text>

            <Text style={styles.description}>
              Apply directly online or visit the Academic Registrar's Office at our Main Campus along the 
              Rumuruti-Doldol road. Have questions regarding entry requirements or course selection?
            </Text>
          </View>

          {/* Right Action Buttons */}
          <View style={[styles.rightCol, isMobile && styles.rightColMobile]}>
            <TouchableOpacity 
              style={styles.primaryBtn}
              onPress={onStartApplication}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>Start Application Form</Text>
              <ArrowRight size={15} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryBtn}
              onPress={onSpeakAdvisor}
              activeOpacity={0.85}
            >
              <MessageSquare size={15} color="#2E8B57" />
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
    backgroundColor: '#14462E',
    paddingVertical: 44,
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
    gap: 32,
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
    backgroundColor: '#FFA500',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 8,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  titleMobile: {
    fontSize: 23,
  },
  description: {
    fontSize: 13.5,
    lineHeight: 20,
    color: '#E0E0E0',
    maxWidth: 620,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
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
    backgroundColor: '#FFA500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 7,
    cursor: 'pointer',
    width: '100%',
    maxWidth: 300,
  },
  primaryBtnText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  secondaryBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 7,
    cursor: 'pointer',
    width: '100%',
    maxWidth: 300,
  },
  secondaryBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: "'Space Grotesk', sans-serif",
  },
});
