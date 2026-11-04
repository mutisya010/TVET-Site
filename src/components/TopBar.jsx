import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Phone, MessageCircle, Megaphone } from 'lucide-react';
import { colors, typography } from '../theme/colors';
import { useBranding } from '../context/BrandingContext';

export default function TopBar({ onOpenInquiry }) {
  const { admissionsNotice, helplinePhone, whatsappNumber } = useBranding();

  const handleCall = () => {
    const rawNumber = (helplinePhone || '+254746525252').replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${rawNumber}`);
  };

  const handleWhatsApp = () => {
    const rawNumber = (whatsappNumber || '+254746525252').replace(/[^0-9]/g, '');
    Linking.openURL(`https://wa.me/${rawNumber}?text=Hello,%20I%20would%20like%20to%20enquire%20about%20admissions`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {/* Left Notice */}
        <TouchableOpacity 
          style={styles.noticeLeft} 
          onPress={onOpenInquiry}
          activeOpacity={0.8}
        >
          <View style={styles.badge}>
            <Megaphone size={14} color={colors.orange} />
            <Text style={styles.badgeText}>Admissions Notice:</Text>
          </View>
          <Text style={styles.noticeText} numberOfLines={1}>
            {admissionsNotice || 'Intakes: January, May & September | Apply via KUCCPS or Campus Office in Lorugum'}
          </Text>
        </TouchableOpacity>

        {/* Right Contact Quick Links */}
        <View style={styles.contactRight}>
          <TouchableOpacity style={styles.contactItem} onPress={handleCall} activeOpacity={0.7}>
            <Phone size={13} color={colors.green} />
            <Text style={styles.contactLabel}>Helpline: </Text>
            <Text style={styles.contactValue}>{helplinePhone || '+254 746 525 252'}</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.contactItem} onPress={handleWhatsApp} activeOpacity={0.7}>
            <MessageCircle size={13} color={colors.green} />
            <Text style={styles.contactLabel}>WhatsApp: </Text>
            <Text style={[styles.contactValue, styles.whatsAppColor]}>{whatsappNumber || '+254 746 525 252'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greenLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.greenMuted,
    paddingVertical: 7,
    paddingHorizontal: 16,
    zIndex: 50,
  },
  inner: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  noticeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textOrange,
    fontFamily: typography.headlineFont,
  },
  noticeText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textPrimary,
    fontFamily: typography.bodyFont,
  },
  contactRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactLabel: {
    fontSize: 11.5,
    color: colors.textSecondary,
    fontWeight: '500',
    fontFamily: typography.bodyFont,
  },
  contactValue: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: typography.labelFont,
  },
  whatsAppColor: {
    color: colors.green,
    fontWeight: '800',
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: colors.border,
  },
});
