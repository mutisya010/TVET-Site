import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image, useWindowDimensions } from 'react-native';
import { X, Calendar, Printer, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function NoticeModal({ visible, notice, onClose }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (!notice) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalCard, isMobile && styles.modalCardMobile]}>
          
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <View style={styles.metaRow}>
                <View style={[styles.badgePill, { backgroundColor: '#FFFBEB' }]}>
                  <Text style={[styles.badgeText, { color: '#D97706' }]}>
                    {notice.category}
                  </Text>
                </View>
                <View style={styles.dateRow}>
                  <Calendar size={13} color="#64748B" />
                  <Text style={styles.dateText}>{notice.date}</Text>
                </View>
              </View>
              <Text style={styles.modalTitle}>{notice.title}</Text>
              <Text style={styles.authorText}>
                Issued by: {notice.author} {notice.refNo ? `• REF: ${notice.refNo}` : ''}
              </Text>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            <View style={styles.circularPaper}>
              <View style={styles.circularHeader}>
                <Image 
                  source={{ uri: logoImg }} 
                  style={styles.circularLogo} 
                  resizeMode="contain"
                  // @ts-ignore
                  accessibilityLabel="Loima TVC Official Crest"
                />
                <Text style={styles.officialHeader}>
                  LOIMA TECHNICAL AND VOCATIONAL COLLEGE
                </Text>
                <Text style={styles.officialSub}>
                  P.O. Box 90 - 10400 Nanyuki | Ministry of Education, Kenya
                </Text>
              </View>

              <View style={styles.divider} />

              <Text style={styles.circularText}>
                {notice.fullContent ? notice.fullContent.trim() : notice.excerpt}
              </Text>

              <View style={styles.officialStampBox}>
                <View style={styles.stampCircle}>
                  <Text style={styles.stampText}>OFFICIAL REGISTRY</Text>
                  <Text style={styles.stampTextSub}>LOIMA TVC</Text>
                  <Text style={styles.stampDate}>{notice.date}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.printBtn} 
              onPress={() => window.print ? window.print() : alert('Printing circular...')}
            >
              <Printer size={15} color="#0F172A" />
              <Text style={styles.printBtnText}>Print Official Notice</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeModalBtn} onPress={onClose}>
              <Text style={styles.closeModalText}>Close Circular</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    width: '100%',
    maxWidth: 720,
    maxHeight: '90%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalCardMobile: {
    maxWidth: '100%',
    maxHeight: '95%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flex: 1,
    paddingRight: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  authorText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  closeBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  modalBody: {
    padding: 22,
    backgroundColor: '#F8FAFC',
    flexGrow: 1,
  },
  circularPaper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  circularHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  circularLogo: {
    width: 52,
    height: 52,
    marginBottom: 8,
  },
  officialHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  officialSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    textAlign: 'center',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 14,
  },
  circularText: {
    fontSize: 13,
    lineHeight: 22,
    color: '#334155',
    whiteSpace: 'pre-line',
    fontFamily: 'monospace, system-ui',
  },
  officialStampBox: {
    marginTop: 24,
    alignItems: 'flex-end',
  },
  stampCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-12deg' }],
    backgroundColor: 'rgba(245, 158, 11, 0.06)',
    padding: 8,
  },
  stampText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
    textAlign: 'center',
    letterSpacing: 0.5,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  stampTextSub: {
    fontSize: 9,
    fontWeight: '700',
    color: '#B45309',
    textAlign: 'center',
    marginTop: 2,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  stampDate: {
    fontSize: 9,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 4,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  modalFooter: {
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  printBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  printBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  closeModalBtn: {
    backgroundColor: '#14462E',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 7,
  },
  closeModalText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: "'Space Grotesk', sans-serif",
  },
});
