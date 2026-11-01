import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { ExternalLink } from 'lucide-react';
import { showcaseData } from '../data/showcaseData';
import ScrollReveal from './common/ScrollReveal';

export default function CampusShowcaseSection({ onBookVisit }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const getTagColor = (id) => {
    switch (id) {
      case 'electrical-bay':
        return '#F59E0B';
      case 'digital-center':
        return '#2E8B57';
      case 'mechanical-bay':
        return '#14462E';
      case 'civil-yard':
        return '#2E8B57';
      default:
        return '#F59E0B';
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.container}>
        
        {/* Header Row */}
        <View style={[styles.headerRow, isMobile && styles.headerRowMobile]}>
          <View style={styles.headerLeft}>
            <Text style={styles.overline}>OUR WORKSHOPS & LIFE</Text>
            <Text style={[styles.title, isMobile && styles.titleMobile]}>
              Campus Life & Workshop Showcase
            </Text>
            <Text style={styles.subtitle}>
              Explore our purpose-built technical training workshops designed to mirror 
              the actual working ways and industrial plants.
            </Text>
          </View>

          {/* Right Action: Book a Guided Campus Visit */}
          <TouchableOpacity 
            style={styles.bookVisitBtn}
            onPress={onBookVisit}
            activeOpacity={0.8}
          >
            <Text style={styles.bookVisitText}>Book a Guided Campus Visit</Text>
            <ExternalLink size={14} color="#FFA500" />
          </TouchableOpacity>
        </View>

        {/* 4 Showcase Cards Grid */}
        <View style={styles.cardsGrid}>
          {showcaseData.map((item, idx) => (
            <ScrollReveal 
              key={item.id} 
              animation="fade-up"
              delay={idx * 100}
              duration={600}
              style={[
                styles.showcaseCard,
                isTablet && styles.showcaseCardTablet,
                isMobile && styles.showcaseCardMobile
              ]}
            >
              {/* Image Container with Tag Badge */}
              <View style={styles.imageBox}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={[styles.tagBadge, { backgroundColor: getTagColor(item.id) }]}>
                  <Text style={styles.tagText}>{item.tag}</Text>
                </View>
              </View>

              {/* Text Content */}
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            </ScrollReveal>
          ))}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFFFFF',
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
  bookVisitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    cursor: 'pointer',
  },
  bookVisitText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#166534',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  showcaseCard: {
    width: 'calc(25% - 15px)',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
    elevation: 2,
  },
  showcaseCardTablet: {
    width: 'calc(50% - 10px)',
  },
  showcaseCardMobile: {
    width: '100%',
  },
  imageBox: {
    width: '100%',
    height: 180,
    position: 'relative',
    backgroundColor: '#14462E',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  tagBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.4,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  cardDescription: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#475569',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
});
