import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { BookOpen, Briefcase, Award, Wrench } from 'lucide-react';
import ScrollReveal from './common/ScrollReveal';

export default function StatsBar() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const stats = [
    {
      value: '15+',
      label: 'Accredited Courses',
      sub: 'Artisan, Craft & Diploma',
      icon: BookOpen,
      iconColor: '#FFA500',
      iconBg: '#FFF8ED',
    },
    {
      value: '100%',
      label: 'Industry Attachment',
      sub: 'Fully Monitored & Supervised',
      icon: Briefcase,
      iconColor: '#2E8B57',
      iconBg: '#E8F5EE',
    },
    {
      value: 'TVETA',
      label: '& CDACC Certified',
      sub: 'National Qualifications Framework',
      icon: Award,
      iconColor: '#2E8B57',
      iconBg: '#E8F5EE',
    },
    {
      value: '4+',
      label: 'Modern Workshops',
      sub: 'Fully equipped practical labs',
      icon: Wrench,
      iconColor: '#FFA500',
      iconBg: '#FFF8ED',
    },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={[styles.inner, isMobile && styles.innerMobile]}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const isLast = idx === stats.length - 1;
            return (
              <ScrollReveal 
                key={idx}
                animation="fade-up"
                delay={idx * 80}
                duration={550}
                style={[
                  styles.statCard, 
                  isMobile && styles.statCardMobile,
                  !isLast && !isMobile && styles.statBorderRight
                ]}
              >
                <View style={[styles.iconWrapper, { backgroundColor: stat.iconBg }]}>
                  <Icon size={20} color={stat.iconColor} />
                </View>
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <Text style={styles.statSub}>{stat.sub}</Text>
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
  wrapper: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 24,
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
    flexWrap: 'wrap',
  },
  innerMobile: {
    flexDirection: 'column',
    gap: 18,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
  },
  statCardMobile: {
    width: '100%',
    paddingHorizontal: 8,
  },
  statBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#F0F0F0',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 1,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  statSub: {
    fontSize: 11,
    color: '#475569',
    marginTop: 1,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
});
