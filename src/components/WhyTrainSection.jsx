import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { 
  Cpu, 
  Banknote, 
  Wrench, 
  Handshake, 
  GraduationCap, 
  Users, 
  Award, 
  ArrowRight 
} from 'lucide-react';
import ScrollReveal from './common/ScrollReveal';

export default function WhyTrainSection({ onOpenNotice, onOpenInquiry }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 960;

  const keyStrengths = [
    {
      title: 'Competency-Based Curriculum (CBET)',
      text: 'Compliant with national industry standards, emphasizing 70% practical work in real workshops and 30% theoretical foundation.',
      icon: Cpu,
    },
    {
      title: 'Government Subsidies & HELB/KUCCPS Loans',
      text: 'Eligible for national government capitation support, plus student maintenance grants and HELB financing.',
      icon: Banknote,
    },
    {
      title: 'Modern Workshop Machinery',
      text: 'High-precision lathes, computerized lab stations, inverter multi-purpose welding sets, and solar equipment wiring benches.',
      icon: Wrench,
    },
    {
      title: 'Direct Industry Internship Partnerships',
      text: 'Guaranteed linkage to active internships through formal memorandums with regional manufacturers, contractors, and enterprises.',
      icon: Handshake,
    },
  ];

  const featureCards = [
    {
      title: 'Affordable Education',
      text: 'Subsidised tuition with bursary and government capitation support via HELB, county bursaries and constituency funds.',
      linkText: 'Transparent Fee Schedules',
      icon: Banknote,
      iconColor: '#FFA500',
      iconBg: '#FFF8ED',
      action: () => onOpenNotice && onOpenNotice('notice-2'),
    },
    {
      title: 'Experienced Trainers',
      text: 'Certified by the Public Service Commission and TVETA with extensive field exposure in respective corporate trades.',
      linkText: 'Meet Trainers Directory',
      icon: Users,
      iconColor: '#2E8B57',
      iconBg: '#E8F5EE',
      action: onOpenInquiry,
    },
    {
      title: 'Inclusive Campus Life',
      text: 'Secure compound, active sports tournaments, cultural activities, dining facilities, on-site co-ed counseling mentorship and student associations.',
      linkText: 'Check Student Affairs',
      icon: GraduationCap,
      iconColor: '#FFA500',
      iconBg: '#FFF8ED',
      action: onOpenInquiry,
    },
    {
      title: 'National Certification',
      text: 'Graduate with nationally and internationally recognized credentials accredited by KNEC and CDACC, and recognized across East Africa.',
      linkText: 'Accreditation Details',
      icon: Award,
      iconColor: '#2E8B57',
      iconBg: '#E8F5EE',
      action: () => onOpenNotice && onOpenNotice('notice-3'),
    },
  ];

  return (
    <View style={styles.section}>
      <View style={styles.container}>
        <View style={[styles.inner, isMobile && styles.innerMobile]}>
          
          {/* Left Column: Heading and Strengths */}
          <ScrollReveal 
            animation="fade-up" 
            duration={650}
            style={[styles.leftCol, isMobile && styles.leftColMobile]}
          >
            <Text style={styles.overline}>INSTITUTIONAL ADVANTAGE</Text>
            <Text style={[styles.title, isMobile && styles.titleMobile]}>
              Why Train with Loima TVC?
            </Text>
            <Text style={styles.paragraph}>
              We bridge the gap between classroom theory and heavy industry demands. 
              Our training framework is nestled in modern competency-based systems, 
              ensuring each trainee graduates with verifiable hands-on mastery.
            </Text>

            {/* Strengths List */}
            <View style={styles.strengthsList}>
              {keyStrengths.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <View key={idx} style={styles.strengthItem}>
                    <View style={styles.iconCircle}>
                      <Icon size={16} color="#FFA500" />
                    </View>
                    <View style={styles.strengthContent}>
                      <Text style={styles.strengthTitle}>{item.title}</Text>
                      <Text style={styles.strengthText}>{item.text}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollReveal>

          {/* Right Column: 2x2 Feature Grid */}
          <View style={[styles.rightCol, isMobile && styles.rightColMobile]}>
            <View style={styles.cardsGrid}>
              {featureCards.map((card, cIdx) => {
                const CardIcon = card.icon;
                return (
                  <ScrollReveal 
                    key={cIdx} 
                    animation="fade-up"
                    delay={cIdx * 90}
                    duration={600}
                    style={styles.featureCard}
                  >
                    <View style={[styles.cardIconBox, { backgroundColor: card.iconBg }]}>
                      <CardIcon size={20} color={card.iconColor} />
                    </View>
                    <Text style={styles.cardTitle}>{card.title}</Text>
                    <Text style={styles.cardText}>{card.text}</Text>
                    <TouchableOpacity 
                      style={styles.cardLink}
                      onPress={card.action}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.cardLinkText}>{card.linkText}</Text>
                      <ArrowRight size={13} color="#FFA500" />
                    </TouchableOpacity>
                  </ScrollReveal>
                );
              })}
            </View>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FAF9F6',
    paddingVertical: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  container: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 48,
  },
  innerMobile: {
    flexDirection: 'column',
    gap: 36,
  },
  leftCol: {
    flex: 1.1,
  },
  leftColMobile: {
    width: '100%',
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
    marginBottom: 14,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  titleMobile: {
    fontSize: 26,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 23,
    color: '#334155',
    marginBottom: 28,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  strengthsList: {
    gap: 20,
  },
  strengthItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  strengthContent: {
    flex: 1,
  },
  strengthTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  strengthText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  rightCol: {
    flex: 1,
  },
  rightColMobile: {
    width: '100%',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureCard: {
    width: 'calc(50% - 8px)',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 180,
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)',
    elevation: 2,
  },
  cardIconBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  cardText: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#64748B',
    marginBottom: 14,
    flexGrow: 1,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  cardLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    cursor: 'pointer',
  },
  cardLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFA500',
    fontFamily: "'Space Grotesk', sans-serif",
  },
});
