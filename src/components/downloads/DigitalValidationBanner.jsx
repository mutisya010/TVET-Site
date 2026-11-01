import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { QrCode, Sparkles } from 'lucide-react';
import { colors, typography } from '../../theme/colors';

export default function DigitalValidationBanner() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.bannerWrapper}>
      <View style={[styles.inner, isMobile && styles.innerMobile]}>
        
        {/* Left Green Content Area */}
        <View style={styles.leftCol}>
          <View style={styles.tagBadge}>
            <Sparkles size={11} color={colors.white} />
            <Text style={styles.tagText}>TRAINEE VERIFICATION</Text>
          </View>

          <Text style={styles.title}>
            Digital Document Validation & KUCCPS Reporting
          </Text>

          <Text style={styles.description}>
            All downloadable admission letters and fee payment slips can be cross-verified instantly 
            at the Campus Registrar Desk with unique barcode headers.
          </Text>

          <View style={styles.footerNote}>
            <QrCode size={14} color={colors.orange} />
            <Text style={styles.footerNoteText}>
              Instant QR scanner available at College Main Gate
            </Text>
          </View>
        </View>

        {/* Right Photo of Admissions Desk */}
        <View style={[styles.rightCol, isMobile && styles.rightColMobile]}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerWrapper: {
    backgroundColor: colors.greenDeep,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.greenDark,
    boxShadow: '0 8px 24px rgba(20, 70, 46, 0.15)',
    elevation: 3,
  },
  inner: {
    flexDirection: 'row',
  },
  innerMobile: {
    flexDirection: 'column',
  },
  leftCol: {
    flex: 1.15,
    padding: 24,
    justifyContent: 'center',
  },
  tagBadge: {
    backgroundColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  tagText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
    fontFamily: typography.labelFont,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.white,
    lineHeight: 22,
    marginBottom: 8,
    fontFamily: typography.headlineFont,
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 16,
    fontFamily: typography.bodyFont,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerNoteText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
    fontFamily: typography.labelFont,
  },
  rightCol: {
    flex: 0.85,
    minHeight: 180,
    backgroundColor: colors.greenDark,
  },
  rightColMobile: {
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
