import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Headphones, Phone, Mail, MessageCircle, Info } from 'lucide-react';
import { colors, typography } from '../../theme/colors';

export default function DownloadHelpdeskCard() {
  const handleCall = () => {
    Linking.openURL('tel:+254700000000');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:admissions@loimatvc.ac.ke');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/254711000000?text=Hello%20Loima%20TVC%20Document%20Desk,%20I%20need%20help%20downloading%20admission%20materials');
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Headphones size={18} color={colors.orange} />
        </View>
        <Text style={styles.title}>Download Helpdesk & Admissions Support</Text>
      </View>

      <Text style={styles.description}>
        Experiencing challenges downloading documents or opening PDF files on your smartphone? 
        Our admissions ICT team is on standby to assist you directly.
      </Text>

      {/* Support Contact List */}
      <View style={styles.contactList}>
        <TouchableOpacity style={styles.contactItem} onPress={handleCall} activeOpacity={0.7}>
          <Phone size={14} color={colors.orange} />
          <View>
            <Text style={styles.contactLabel}>Helpline Support</Text>
            <Text style={styles.contactVal}>+254 700 000 000</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleEmail} activeOpacity={0.7}>
          <Mail size={14} color={colors.orange} />
          <View>
            <Text style={styles.contactLabel}>Registrar Email</Text>
            <Text style={styles.contactVal}>admissions@loimatvc.ac.ke</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleWhatsApp} activeOpacity={0.7}>
          <MessageCircle size={14} color={colors.green} />
          <View>
            <Text style={styles.contactLabel}>WhatsApp Document Desk</Text>
            <Text style={[styles.contactVal, styles.whatsAppText]}>+254 711 000 000</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Physical Collection Notice Banner */}
      <View style={styles.noticeBanner}>
        <Info size={15} color={colors.orangeDark} style={styles.noticeIcon} />
        <Text style={styles.noticeText}>
          Physical copies can be collected at the Admissions Office, Main Campus 
          (Monday – Friday, 8:00 AM – 5:00 PM).
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 22,
    marginBottom: 20,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: colors.orangeLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.charcoal,
    flex: 1,
    fontFamily: typography.headlineFont,
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    marginBottom: 16,
    fontFamily: typography.bodyFont,
  },
  contactList: {
    gap: 10,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 6,
    padding: 10,
  },
  contactLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
    fontFamily: typography.labelFont,
  },
  contactVal: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.charcoal,
    fontFamily: typography.headlineFont,
  },
  whatsAppText: {
    color: colors.green,
  },
  noticeBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: colors.orangeLight,
    borderWidth: 1,
    borderColor: colors.orangeMuted,
    borderRadius: 6,
    padding: 12,
  },
  noticeIcon: {
    marginTop: 1,
    flexShrink: 0,
  },
  noticeText: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.charcoal,
    flex: 1,
    fontFamily: typography.bodyFont,
  },
});
