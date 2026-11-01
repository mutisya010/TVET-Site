import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { noticesData } from '../data/noticesData';
import ScrollReveal from './common/ScrollReveal';

export default function NoticesSection({ onOpenNotice }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const getNoticeBadgeColors = (category) => {
    switch (category) {
      case 'IMPORTANT':
      case 'CAMPUS NEWS':
        return { color: '#166534', bg: '#F0FDF4' };
      case 'FEES & FUNDING':
        return { color: '#2E8B57', bg: '#E8F5EE' };
      case 'ADMISSIONS':
      case 'ACADEMIC CIRCULAR':
        return { color: '#D97706', bg: '#FFFBEB' };
      default:
        return { color: '#166534', bg: '#F0FDF4' };
    }
  };

  return (
    <View style={styles.section} id="notices-section">
      <View style={styles.container}>
        
        {/* Header Row */}
        <View style={[styles.headerRow, isMobile && styles.headerRowMobile]}>
          <View style={styles.headerLeft}>
            <Text style={styles.overline}>ACADEMIC REGISTRY</Text>
            <Text style={[styles.title, isMobile && styles.titleMobile]}>
              Latest Notices & Intake Deadlines
            </Text>
            <Text style={styles.subtitle}>
              Official announcements regarding intakes, fee structures, and KUCCPS 
              application updates directly from the Principal's office.
            </Text>
          </View>

          {/* Right Status */}
          <View style={styles.registryStatus}>
            <Clock size={14} color="#64748B" />
            <Text style={styles.registryStatusText}>Updated Weekly by Registry</Text>
          </View>
        </View>

        {/* 3 Notice Cards */}
        <View style={styles.noticesGrid}>
          {noticesData.slice(0, 3).map((item, idx) => {
            const badgeColors = getNoticeBadgeColors(item.category);
            return (
              <ScrollReveal 
                key={item.id} 
                animation="fade-up"
                delay={idx * 100}
                duration={600}
                style={[
                  styles.noticeCard, 
                  isMobile && styles.noticeCardMobile
                ]}
              >
                {/* Card Header: Tag & Date */}
                <View style={styles.cardHeader}>
                  <View style={[styles.categoryBadge, { backgroundColor: badgeColors.bg }]}>
                    <Text style={[styles.categoryBadgeText, { color: badgeColors.color }]}>
                      {item.category}
                    </Text>
                  </View>
                  <View style={styles.dateRow}>
                    <Calendar size={12} color="#64748B" />
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>

                {/* Title */}
                <TouchableOpacity
                  onPress={() => onOpenNotice && onOpenNotice(item)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.noticeTitle}>{item.title}</Text>
                </TouchableOpacity>

                {/* Excerpt */}
                <Text style={styles.noticeExcerpt} numberOfLines={3}>
                  {item.excerpt}
                </Text>

                {/* Card Footer: Source / Action */}
                <View style={styles.cardFooter}>
                  <Text style={styles.authorText}>REF: {item.refNo || item.author}</Text>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => onOpenNotice && onOpenNotice(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.actionBtnText}>{item.actionLabel || 'Read Circular'}</Text>
                    <ArrowRight size={13} color="#D97706" />
                  </TouchableOpacity>
                </View>
              </ScrollReveal>
            );
          })}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FAF9F6',
    paddingVertical: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  container: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 36,
    gap: 20,
  },
  headerRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
  },
  headerLeft: {
    flex: 1,
    maxWidth: 680,
  },
  overline: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFA500',
    letterSpacing: 1.2,
    marginBottom: 6,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
    marginBottom: 8,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  titleMobile: {
    fontSize: 26,
  },
  subtitle: {
    fontSize: 14.5,
    lineHeight: 22,
    color: '#475569',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  browseAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
    cursor: 'pointer',
  },
  browseAllBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#14462E',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  registryStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
  },
  registryStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  noticesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  noticeCard: {
    width: 'calc(33.333% - 14px)',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 22,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)',
    elevation: 2,
  },
  noticeCardMobile: {
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 4,
  },
  categoryBadgeText: {
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
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  noticeTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
    lineHeight: 22,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  noticeExcerpt: {
    fontSize: 13,
    lineHeight: 20,
    color: '#475569',
    marginBottom: 18,
    flexGrow: 1,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    cursor: 'pointer',
  },
  actionBtnText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#D97706',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  bottomCtaRow: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewFullPortalBtn: {
    backgroundColor: '#14462E',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 8,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(20, 70, 46, 0.2)',
  },
  viewFullPortalText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: "'Space Grotesk', sans-serif",
  },
});
