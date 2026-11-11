import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, useWindowDimensions, Image } from 'react-native';
import { MapPin, Phone, Mail, Clock, Download, ShieldCheck } from 'lucide-react';
import CollegeLogo from './CollegeLogo';
import defaultCrestImg from '../assets/Loima Technical College Crest.png';
import { useBranding } from '../context/BrandingContext';

export default function FooterSection({ onNavigate, onOpenInquiry, onOpenNotice }) {
  const { 
    institutionName, 
    physicalLocation, 
    helplinePhone, 
    helplinePhoneAlt, 
    emailInfo, 
    emailPrincipal, 
    tvetaLicense,
    logoUrl 
  } = useBranding();
  
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const crestSource = logoUrl 
    ? (typeof logoUrl === 'string' ? { uri: logoUrl } : logoUrl) 
    : defaultCrestImg;

  const quickLinks = [
    { label: 'Academic Programmes', action: () => onNavigate && onNavigate('courses') },
    { label: 'Fee Structure & Entry Criteria', action: () => onOpenNotice && onOpenNotice('notice-2') },
    { label: 'Government Bursaries & HELB', action: () => onOpenNotice && onOpenNotice('notice-2') },
    { label: 'Student Portal Access', action: () => alert('Student Portal Login: Please enter your Student Registration Number') },
    { label: 'Administration & Council', action: () => onNavigate && onNavigate('about', 'office-of-principal') },
    { label: 'Industrial Liaison Office', action: () => onNavigate && onNavigate('about', 'industrial-liaison') },
  ];

  const downloads = [
    { label: 'Course Brochure 2024/2025', action: () => onNavigate && onNavigate('downloads') },
    { label: 'Trainee Joining Instructions', action: () => onNavigate && onNavigate('downloads') },
    { label: 'HELB / KUCCPS Application Guide', action: () => onNavigate && onNavigate('downloads') },
    { label: 'Academic Calendar 2024/25', action: () => onNavigate && onNavigate('downloads') },
  ];

  const primaryPhone = helplinePhone || '+254 746 525 252';
  const altPhone = helplinePhoneAlt || '';
  const phoneDisplay = altPhone ? `${primaryPhone} / ${altPhone}` : primaryPhone;
  const rawPhone = primaryPhone.replace(/[^0-9+]/g, '');

  const primaryEmail = emailInfo || 'info@loimatvc.ac.ke';
  const altEmail = emailPrincipal || 'principal@loima-tvc.ac.ke';
  const emailDisplay = `${primaryEmail} / ${altEmail}`;

  return (
    <View style={styles.footerWrapper}>
      {/* Background Subtle Institutional Crest Watermark */}
      <View style={styles.bgCrestContainer} pointerEvents="none">
        <Image
          source={crestSource}
          style={styles.bgCrestWatermark}
          resizeMode="contain"
          // @ts-ignore
          accessibilityRole="presentation"
        />
      </View>

      {/* Sub-footer Regulatory Ribbon */}
      <View style={styles.subRibbon}>
        <View style={styles.ribbonContainer}>
          <Text style={styles.ribbonLeft}>
            MINISTRY OF EDUCATION • STATE DEPARTMENT FOR TVET
          </Text>
          <View style={styles.ribbonRight}>
            <Text style={styles.ribbonBadge}>• TVETA ACCREDITED</Text>
            <Text style={styles.ribbonBadge}>• TVET CDACC ASSESSMENT CENTRE</Text>
            <Text style={styles.ribbonBadge}>• KNEC & NITA ASSESSMENT</Text>
          </View>
        </View>
      </View>

      {/* Main 4-Column Footer */}
      <View style={styles.container}>
        <View style={styles.colsGrid}>
          
          {/* Column 1: Identity & Accreditation */}
          <View style={[styles.col, isTablet && styles.colTablet, isMobile && styles.colMobile]}>
            <CollegeLogo variant="dark" size="small" />
            <Text style={styles.colDescription}>
              A premier public technical and vocational institution delivering accredited, 
              competency-based education fostering self-reliance, innovation, and industrial agility.
            </Text>
            <View style={styles.tvetaBadge}>
              <ShieldCheck size={14} color="#FFA500" />
              <Text style={styles.tvetaBadgeText}>TVETA & CDACC ACCREDITED</Text>
            </View>
          </View>

          {/* Column 2: Quick Links */}
          <View style={[styles.col, isTablet && styles.colTablet, isMobile && styles.colMobile]}>
            <Text style={styles.colTitle}>Quick Links</Text>
            <View style={styles.linksList}>
              {quickLinks.map((item, i) => (
                <TouchableOpacity 
                  key={i} 
                  onPress={item.action} 
                  style={styles.linkItem} 
                  activeOpacity={0.7}
                  className="tvet-footer-link"
                  dataSet={{ class: 'tvet-footer-link' }}
                >
                  <Text 
                    style={styles.linkText}
                    // @ts-ignore
                    data-footer-text="true"
                    dataSet={{ footerText: 'true' }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Column 3: Downloads & Resources */}
          <View style={[styles.col, isTablet && styles.colTablet, isMobile && styles.colMobile]}>
            <Text style={styles.colTitle}>Downloads & Resources</Text>
            <View style={styles.linksList}>
              {downloads.map((item, i) => (
                <TouchableOpacity 
                  key={i} 
                  onPress={item.action} 
                  style={styles.linkItem} 
                  activeOpacity={0.7}
                  className="tvet-footer-link"
                  dataSet={{ class: 'tvet-footer-link' }}
                >
                  <Download size={13} color="#FFA500" />
                  <Text 
                    style={styles.linkText}
                    // @ts-ignore
                    data-footer-text="true"
                    dataSet={{ footerText: 'true' }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Column 4: Direct Contact */}
          <View style={[styles.col, isTablet && styles.colTablet, isMobile && styles.colMobile]}>
            <Text style={styles.colTitle}>Direct Contact</Text>
            <View style={styles.contactList}>
              <View style={styles.contactEntry}>
                <MapPin size={15} color="#FFA500" />
                <Text style={styles.contactEntryText}>
                  {physicalLocation || 'Lorugum (~1.5 km off Lodwar–Uganda Rd), P.O. Box 517 – 30500, Lodwar, Turkana County, Kenya'}
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.contactEntry} 
                onPress={() => Linking.openURL(`tel:${rawPhone}`)}
                activeOpacity={0.7}
                className="tvet-topbar-link"
              >
                <Phone size={15} color="#FFA500" />
                <Text style={styles.contactEntryText}>
                  {phoneDisplay}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.contactEntry} 
                onPress={() => Linking.openURL(`mailto:${primaryEmail}`)}
                activeOpacity={0.7}
                className="tvet-topbar-link"
              >
                <Mail size={15} color="#FFA500" />
                <Text style={styles.contactEntryText}>
                  {emailDisplay}
                </Text>
              </TouchableOpacity>

              <View style={styles.contactEntry}>
                <Clock size={15} color="#FFA500" />
                <Text style={styles.contactEntryText}>
                  Mon - Fri: 8:00 AM - 5:00 PM EAT
                </Text>
              </View>
            </View>
          </View>

        </View>

        {/* Bottom Copyright Bar */}
        <View style={styles.bottomBar}>
          <View style={styles.copyrightCol}>
            <Text style={styles.copyrightText}>
              © {new Date().getFullYear()} {institutionName || 'Loima Technical & Vocational College'}, Republic of Kenya. All rights reserved.
            </Text>
            <View style={styles.creditsRow}>
              <Text style={styles.creditsText}>Built by </Text>
              <TouchableOpacity 
                onPress={() => Linking.openURL('https://royalsoftwares.co.ke/')}
                activeOpacity={0.7}
                // @ts-ignore
                accessibilityRole="link"
                href="https://royalsoftwares.co.ke/"
                target="_blank"
                className="tvet-footer-link"
                dataSet={{ class: 'tvet-footer-link' }}
              >
                <Text 
                  style={styles.creditsLink}
                  // @ts-ignore
                  data-footer-text="true"
                  dataSet={{ footerText: 'true' }}
                >
                  Royal Software Solutions
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.legalLinks}>
            <TouchableOpacity className="tvet-footer-link" dataSet={{ class: 'tvet-footer-link' }}>
              <Text 
                style={styles.legalText}
                // @ts-ignore
                data-footer-text="true"
                dataSet={{ footerText: 'true' }}
              >
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <Text style={styles.legalDivider}>•</Text>
            <TouchableOpacity className="tvet-footer-link" dataSet={{ class: 'tvet-footer-link' }}>
              <Text 
                style={styles.legalText}
                // @ts-ignore
                data-footer-text="true"
                dataSet={{ footerText: 'true' }}
              >
                Terms of Use
              </Text>
            </TouchableOpacity>
            <Text style={styles.legalDivider}>•</Text>
            <TouchableOpacity className="tvet-footer-link" dataSet={{ class: 'tvet-footer-link' }}>
              <Text 
                style={styles.legalText}
                // @ts-ignore
                data-footer-text="true"
                dataSet={{ footerText: 'true' }}
              >
                Staff Portal
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerWrapper: {
    backgroundColor: '#0F3D24',
    borderTopWidth: 1,
    borderTopColor: '#0A2B19',
    position: 'relative',
    overflow: 'hidden',
  },
  bgCrestContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
    zIndex: 0,
    overflow: 'hidden',
  },
  bgCrestWatermark: {
    width: 480,
    height: 480,
    maxWidth: '85vw',
    maxHeight: '85%',
    opacity: 0.065,
  },
  subRibbon: {
    backgroundColor: '#0A2B19',
    borderBottomWidth: 1,
    borderBottomColor: '#14462E',
    paddingVertical: 12,
  },
  ribbonContainer: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  ribbonLeft: {
    fontSize: 11,
    fontWeight: '800',
    color: '#E0E0E0',
    letterSpacing: 0.6,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  ribbonRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flexWrap: 'wrap',
  },
  ribbonBadge: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  container: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 32,
  },
  colsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 32,
    marginBottom: 44,
  },
  col: {
    flex: 1,
    minWidth: 220,
  },
  colTablet: {
    flexBasis: '45%',
  },
  colMobile: {
    flexBasis: '100%',
  },
  colDescription: {
    fontSize: 12.5,
    lineHeight: 19,
    color: '#E0E0E0',
    marginTop: 14,
    marginBottom: 16,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  tvetaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 165, 0, 0.15)',
    borderWidth: 1,
    borderColor: '#FFA500',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  tvetaBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#FFA500',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  colTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#FFA500',
    paddingBottom: 6,
    alignSelf: 'flex-start',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  linksList: {
    gap: 10,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
  },
  linkText: {
    fontSize: 12.5,
    color: '#E0E0E0',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  contactList: {
    gap: 12,
  },
  contactEntry: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  contactEntryText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#E0E0E0',
    flex: 1,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: '#3D3D3D',
    paddingTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  copyrightCol: {
    flexDirection: 'column',
    gap: 4,
  },
  creditsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  creditsText: {
    fontSize: 11.5,
    color: '#8E9AA0',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  creditsLink: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFA500',
    fontFamily: "'Space Grotesk', sans-serif",
    textDecorationLine: 'underline',
    cursor: 'pointer',
  },
  copyrightText: {
    fontSize: 12,
    color: '#A0A0A0',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  legalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legalText: {
    fontSize: 11.5,
    color: '#E0E0E0',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  legalDivider: {
    color: '#707070',
    fontSize: 10,
  },
});
