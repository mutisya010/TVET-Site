import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  useWindowDimensions, 
  Linking 
} from 'react-native';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  Navigation, 
  ExternalLink, 
  Calendar, 
  Compass, 
  ChevronRight
} from 'lucide-react';
import { colors, typography } from '../theme/colors';
import ScrollReveal from '../components/common/ScrollReveal';

export default function ContactPage({ onNavigate }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const isMobile = width < 768;

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    category: 'admissions',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.message.trim()) {
      alert('Please fill in your name, mobile number, and inquiry message.');
      return;
    }
    const generatedRef = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefCode(generatedRef);
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      category: 'admissions',
      subject: '',
      message: '',
    });
    setSubmitted(false);
  };

  const handleOpenGoogleMaps = () => {
    Linking.openURL('https://www.google.com/maps/search/?api=1&query=Loima+Technical+and+Vocational+College');
  };

  const handleOpenWhatsApp = (customMsg) => {
    const text = encodeURIComponent(customMsg || 'Hello Loima TVC, I have an inquiry regarding admissions and programmes');
    Linking.openURL(`https://wa.me/254759437978?text=${text}`);
  };

  const handleCall = (phoneNum) => {
    Linking.openURL(`tel:${phoneNum}`);
  };

  const handleEmail = (emailAddr) => {
    Linking.openURL(`mailto:${emailAddr}`);
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.contentWrap}>
        
        {/* ========================================================================= */}
        {/* 1. BREADCRUMB & PAGE HEADER */}
        {/* ========================================================================= */}
        <View style={styles.headerBlock}>
          <View style={styles.breadcrumbRow}>
            <Text style={styles.breadcrumbMuted}>Home</Text>
            <ChevronRight size={12} color={colors.textMuted} />
            <Text style={styles.breadcrumbMuted}>Institutional Directory</Text>
            <ChevronRight size={12} color={colors.textMuted} />
            <Text style={styles.breadcrumbActive}>Contact & Location</Text>
          </View>

          <View style={styles.titleArea}>
            <View style={styles.authorityPillRow}>
              <View style={styles.authorityPill}>
                <ShieldCheck size={13} color={colors.greenDeep} />
                <Text style={styles.authorityPillText}>OFFICIAL LIAISON & INQUIRIES DESK</Text>
              </View>
              <View style={styles.statusPill}>
                <View style={styles.statusDot} />
                <Text style={styles.statusPillText}>Campus Desks Open (8:00 AM - 5:00 PM)</Text>
              </View>
            </View>

            <Text style={[styles.mainTitle, isMobile && styles.mainTitleMobile]}>
              Connect with Loima TVC
            </Text>
            
            <Text style={styles.leadSubtitle}>
              Whether you are seeking guidance on new admissions, KUCCPS placement transfers, statutory 
              capitation funding, or booking a physical guided tour of our workshops, our administrative 
              and academic teams are here to assist you.
            </Text>
          </View>
        </View>

        {/* ========================================================================= */}
        {/* INQUIRY FORM (Left) + PHYSICAL CAMPUS & VISITS (Right) */}
        {/* ========================================================================= */}
        <View style={[styles.splitSection, (isTablet || isMobile) && styles.splitSectionStacked]}>
          
          {/* LEFT: Direct Message / Inquiry Form Card */}
          <View style={styles.formContainerColumn}>
            <View style={styles.formCard}>
              <View style={styles.formHeader}>
                <View style={styles.formIconBadge}>
                  <Send size={18} color="#FFFFFF" />
                </View>
                <View style={styles.formHeaderText}>
                  <Text style={styles.formHeading}>Send an Official Inquiry</Text>
                  <Text style={styles.formSub}>
                    Submit your query directly to our admissions or registry team. We typically respond within 24 business hours.
                  </Text>
                </View>
              </View>

              {submitted ? (
                <View style={styles.successStateBox}>
                  <View style={styles.successCircle}>
                    <CheckCircle2 size={36} color="#166534" />
                  </View>
                  <Text style={styles.successTitle}>Inquiry Successfully Received!</Text>
                  <Text style={styles.successDesc}>
                    Thank you, <Text style={styles.boldText}>{formData.fullName}</Text>. Your request has been assigned official tracking reference:
                  </Text>
                  <View style={styles.refPill}>
                    <Text style={styles.refPillText}>{refCode}</Text>
                  </View>
                  <Text style={styles.successSub}>
                    An admissions officer will get in touch with you via your mobile number ({formData.phone}) or email address.
                  </Text>

                  <View style={styles.successActionsRow}>
                    <TouchableOpacity 
                      style={styles.successWhatsAppBtn}
                      onPress={() => handleOpenWhatsApp(`Hello, I have submitted an official inquiry with reference code: ${refCode}`)}
                      activeOpacity={0.85}
                    >
                      <MessageSquare size={14} color="#FFFFFF" />
                      <Text style={styles.successWhatsAppText}>Follow Up on WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.newInquiryBtn}
                      onPress={handleResetForm}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.newInquiryText}>Submit Another Inquiry</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.formFieldsGroup}>
                  
                  {/* Row 1: Full Name & Mobile */}
                  <View style={[styles.formRow, isMobile && styles.formRowMobile]}>
                    <View style={styles.inputCol}>
                      <Text style={styles.fieldLabel}>Full Legal Name *</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="e.g. Kelvin Lemayian"
                        placeholderTextColor="#94A3B8"
                        value={formData.fullName}
                        onChangeText={(t) => handleInputChange('fullName', t)}
                      />
                    </View>

                    <View style={styles.inputCol}>
                      <Text style={styles.fieldLabel}>Mobile / WhatsApp Number *</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="e.g. +254 716 189 084 / +254 759 437 978"
                        placeholderTextColor="#94A3B8"
                        value={formData.phone}
                        onChangeText={(t) => handleInputChange('phone', t)}
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View>

                  {/* Row 2: Email & Category */}
                  <View style={[styles.formRow, isMobile && styles.formRowMobile]}>
                    <View style={styles.inputCol}>
                      <Text style={styles.fieldLabel}>Email Address</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="e.g. applicant@gmail.com"
                        placeholderTextColor="#94A3B8"
                        value={formData.email}
                        onChangeText={(t) => handleInputChange('email', t)}
                        keyboardType="email-address"
                      />
                    </View>

                    <View style={styles.inputCol}>
                      <Text style={styles.fieldLabel}>Inquiry Subject Category *</Text>
                      <View style={styles.categoryPillsSelect}>
                        {[
                          { id: 'admissions', label: 'Admissions' },
                          { id: 'transfers', label: 'KUCCPS Transfers' },
                          { id: 'fees', label: 'Fees & HELB' },
                          { id: 'general', label: 'General' },
                        ].map((cat) => (
                          <TouchableOpacity
                            key={cat.id}
                            style={[
                              styles.miniPill,
                              formData.category === cat.id && styles.miniPillActive
                            ]}
                            onPress={() => handleInputChange('category', cat.id)}
                            activeOpacity={0.7}
                          >
                            <Text style={[
                              styles.miniPillText,
                              formData.category === cat.id && styles.miniPillTextActive
                            ]}>
                              {cat.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </View>

                  {/* Subject Line */}
                  <View style={styles.fullWidthCol}>
                    <Text style={styles.fieldLabel}>Subject Line</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g. Inquiry regarding Craft Certificate in Electrical Engineering admission"
                      placeholderTextColor="#94A3B8"
                      value={formData.subject}
                      onChangeText={(t) => handleInputChange('subject', t)}
                    />
                  </View>

                  {/* Message */}
                  <View style={styles.fullWidthCol}>
                    <Text style={styles.fieldLabel}>Your Detailed Message / Question *</Text>
                    <TextInput
                      style={[styles.textInput, styles.textArea]}
                      placeholder="Write your questions regarding qualifications, fee capitation, hostel booking, or reporting dates here..."
                      placeholderTextColor="#94A3B8"
                      value={formData.message}
                      onChangeText={(t) => handleInputChange('message', t)}
                      multiline
                      numberOfLines={5}
                    />
                  </View>

                  {/* Privacy note & Submit */}
                  <View style={styles.formFooterRow}>
                    <View style={styles.privacyNote}>
                      <ShieldCheck size={14} color={colors.greenDeep} />
                      <Text style={styles.privacyText}>
                        Your details are protected under Government Data Protection Regulations.
                      </Text>
                    </View>

                    <TouchableOpacity 
                      style={styles.submitBtn}
                      onPress={handleSubmit}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.submitBtnText}>Transmit Inquiry</Text>
                      <Send size={15} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>

                </View>
              )}

            </View>
          </View>

          {/* RIGHT: Campus Location, Directions & Tour Booking */}
          <View style={[styles.locationColumn, (isTablet || isMobile) && styles.locationColumnFull]}>
            
            {/* Campus Photo & Interactive Location Card */}
            <View style={styles.locationCard}>
              <View style={styles.campusImageWrapper}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80' }} 
                  style={styles.campusImage}
                  // @ts-ignore
                  accessibilityLabel="Loima TVC Main Campus"
                />
                <View style={styles.campusImageOverlay}>
                  <View style={styles.pinPill}>
                    <MapPin size={13} color="#FFFFFF" />
                    <Text style={styles.pinPillText}>Main Campus</Text>
                  </View>
                  <Text style={styles.campusTagline}>Lorugum, Turkana County</Text>
                </View>
              </View>

              <View style={styles.locationCardBody}>
                <Text style={styles.locationTitle}>Physical Address & Directions</Text>
                
                <View style={styles.addressBox}>
                  <View style={styles.addressLine}>
                    <MapPin size={16} color={colors.greenDeep} style={styles.addressIcon} />
                    <View style={styles.addressTexts}>
                      <Text style={styles.addressPrimary}>Loima Technical and Vocational College</Text>
                      <Text style={styles.addressSecondary}>Lorugum (~1.5 km from shopping centre, off Lodwar–Uganda Rd), Loima Sub-County, Turkana County</Text>
                      <Text style={styles.addressPostal}>P.O. Box 517 – 30500, Lodwar, Kenya</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.directionsHeading}>How to Reach Our Campus:</Text>
                <View style={styles.directionsList}>
                  <View style={styles.dirItem}>
                    <Compass size={14} color="#D97706" />
                    <Text style={styles.dirText}>
                      <Text style={styles.boldText}>Public Transit (Matatu):</Text> Board Lorugum / Loima-bound public service vehicles from Lodwar town stage; alight at Loima TVC College Main Gate (~1.5 km from Lorugum shopping centre along Lodwar–Uganda Road).
                    </Text>
                  </View>
                  <View style={styles.dirItem}>
                    <Navigation size={14} color={colors.greenDeep} />
                    <Text style={styles.dirText}>
                      <Text style={styles.boldText}>Personal Vehicle:</Text> Direct all-weather road access along the Lodwar–Uganda (Lodwar–Moroto) corridor with secure on-campus parking in Lorugum.
                    </Text>
                  </View>
                </View>

                {/* Map & Tour Action Buttons */}
                <View style={styles.locationActions}>
                  <TouchableOpacity 
                    style={styles.mapBtn}
                    onPress={handleOpenGoogleMaps}
                    activeOpacity={0.8}
                  >
                    <ExternalLink size={14} color={colors.greenDeep} />
                    <Text style={styles.mapBtnText}>Open in Google Maps</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.tourBtn}
                    onPress={() => handleOpenWhatsApp('Hello Loima TVC Admissions, I would like to schedule an in-person guided tour of your technical workshops')}
                    activeOpacity={0.85}
                  >
                    <Calendar size={14} color="#FFFFFF" />
                    <Text style={styles.tourBtnText}>Book Workshop Tour</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>

            {/* Quick Emergency / 24-7 Security Desk Card */}
            <View style={styles.securityDeskCard}>
              <View style={styles.securityHeader}>
                <ShieldCheck size={18} color="#D97706" />
                <Text style={styles.securityTitle}>24/7 Campus Security & Emergency Hotline</Text>
              </View>
              <Text style={styles.securityDesc}>
                For on-campus safety, late arrival guidance, or lost-and-found queries:
              </Text>
              <TouchableOpacity style={styles.securityPhoneTouch} onPress={() => handleCall('+254759437978')}>
                <Phone size={14} color="#D97706" />
                <Text style={styles.securityPhoneText}>Campus Security Gate: +254 716 189 084 / +254 759 437 978</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>

        {/* ========================================================================= */}
        {/* 4. FREQUENTLY ASKED INQUIRIES (FAQ Quick Cards) */}
        {/* ========================================================================= */}
        <ScrollReveal animation="fade-up" duration={650} style={styles.faqBlock}>
          <Text style={styles.faqMainTitle}>Common Inquiries Before Contacting Us</Text>
          <View style={styles.faqGrid}>
            
            <ScrollReveal animation="fade-up" delay={50} duration={550} style={[styles.faqCard, isMobile && styles.faqCardMobile]}>
              <Text style={styles.faqQuestion}>How do I apply for admissions at Loima TVC?</Text>
              <Text style={styles.faqAnswer}>
                You can apply through two approved pathways: 1) Online Placement via the Kenya Universities and Colleges Central Placement Service (KUCCPS Student Portal: students.kuccps.net) or the admissions section on our website; 2) Manual Application by downloading official forms from our website or collecting them in person directly from the College Administration Office in Lorugum.
              </Text>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100} duration={550} style={[styles.faqCard, isMobile && styles.faqCardMobile]}>
              <Text style={styles.faqQuestion}>What is the official KUCCPS institution code for Loima TVC?</Text>
              <Text style={styles.faqAnswer}>
                Our verified KUCCPS institution code is <Text style={styles.boldText}>1478111</Text>. You can select this code directly on the student portal during national placement or inter-institutional transfers.
              </Text>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150} duration={550} style={[styles.faqCard, isMobile && styles.faqCardMobile]}>
              <Text style={styles.faqQuestion}>How does the Government capitation subsidy work?</Text>
              <Text style={styles.faqAnswer}>
                All eligible Kenyan trainees enrolling in accredited Artisan, Craft, and Diploma courses receive the annual government tuition subsidy directly from the Ministry of Education, leaving an affordable trainee balance.
              </Text>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200} duration={550} style={[styles.faqCard, isMobile && styles.faqCardMobile]}>
              <Text style={styles.faqQuestion}>Is accommodation available for out-of-county students?</Text>
              <Text style={styles.faqAnswer}>
                Yes. The college provides assistance in hostel placement through verified, secure student hostels situated immediately adjacent to the college perimeter, supervised by the Dean of Trainees.
              </Text>
            </ScrollReveal>

          </View>
        </ScrollReveal>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#F8FAFC',
    minHeight: '100%',
    paddingVertical: 40,
  },
  contentWrap: {
    maxWidth: 1260,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },

  /* 1. Header */
  headerBlock: {
    marginBottom: 36,
  },
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  breadcrumbMuted: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: typography.bodyFont,
  },
  breadcrumbActive: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.greenDeep,
    fontFamily: typography.labelFont,
  },
  titleArea: {
    maxWidth: 840,
  },
  authorityPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  authorityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  authorityPillText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: colors.greenDeep,
    letterSpacing: 0.8,
    fontFamily: typography.labelFont,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#166534',
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: typography.labelFont,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.6,
    marginBottom: 12,
    fontFamily: typography.headlineFont,
  },
  mainTitleMobile: {
    fontSize: 28,
  },
  leadSubtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
  },

  /* 2. Split Section */
  splitSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 28,
    marginBottom: 48,
  },
  splitSectionStacked: {
    flexDirection: 'column',
    gap: 32,
  },

  /* Left Form Column */
  formContainerColumn: {
    flex: 1,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 28,
    boxShadow: '0 6px 20px rgba(15, 23, 42, 0.04)',
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 18,
  },
  formIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.greenDeep,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formHeaderText: {
    flex: 1,
  },
  formHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    fontFamily: typography.headlineFont,
    marginBottom: 4,
  },
  formSub: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    fontFamily: typography.bodyFont,
  },
  formFieldsGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 14,
  },
  formRowMobile: {
    flexDirection: 'column',
    gap: 14,
  },
  inputCol: {
    flex: 1,
  },
  fullWidthCol: {
    width: '100%',
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
    fontFamily: typography.labelFont,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13.5,
    color: colors.textPrimary,
    fontFamily: typography.bodyFont,
    outlineWidth: 0,
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },
  categoryPillsSelect: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  miniPill: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    cursor: 'pointer',
  },
  miniPillActive: {
    backgroundColor: colors.greenDeep,
    borderColor: colors.greenDeep,
  },
  miniPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: typography.labelFont,
  },
  miniPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  formFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 14,
    flexWrap: 'wrap',
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    minWidth: 240,
  },
  privacyText: {
    fontSize: 11,
    color: colors.textMuted,
    fontFamily: typography.bodyFont,
  },
  submitBtn: {
    backgroundColor: colors.greenDeep,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 8,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(20, 70, 46, 0.2)',
  },
  submitBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.headlineFont,
  },

  /* Form Success State */
  successStateBox: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  successCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
    fontFamily: typography.headlineFont,
    textAlign: 'center',
  },
  successDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 480,
    fontFamily: typography.bodyFont,
  },
  boldText: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  refPill: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 16,
  },
  refPillText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#166534',
    letterSpacing: 1,
    fontFamily: 'monospace, system-ui',
  },
  successSub: {
    fontSize: 12.5,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 440,
    marginBottom: 24,
    fontFamily: typography.bodyFont,
  },
  successActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  successWhatsAppBtn: {
    backgroundColor: '#166534',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 7,
    cursor: 'pointer',
  },
  successWhatsAppText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.labelFont,
  },
  newInquiryBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 7,
    cursor: 'pointer',
  },
  newInquiryText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: typography.labelFont,
  },

  /* Right Location Column */
  locationColumn: {
    width: 440,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  locationColumnFull: {
    width: '100%',
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(15, 23, 42, 0.04)',
  },
  campusImageWrapper: {
    position: 'relative',
    height: 190,
    width: '100%',
    backgroundColor: '#0F172A',
  },
  campusImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  campusImageOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backdropFilter: 'blur(6px)',
  },
  pinPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pinPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.labelFont,
  },
  campusTagline: {
    fontSize: 10.5,
    color: '#CBD5E1',
    fontFamily: typography.bodyFont,
  },
  locationCardBody: {
    padding: 22,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
    fontFamily: typography.headlineFont,
  },
  addressBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  addressLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  addressIcon: {
    marginTop: 2,
  },
  addressTexts: {
    flex: 1,
  },
  addressPrimary: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    fontFamily: typography.headlineFont,
  },
  addressSecondary: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    fontFamily: typography.bodyFont,
  },
  addressPostal: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 2,
    fontFamily: typography.bodyFont,
  },
  directionsHeading: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
    fontFamily: typography.labelFont,
  },
  directionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 18,
  },
  dirItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  dirText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    flex: 1,
    fontFamily: typography.bodyFont,
  },
  locationActions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  mapBtn: {
    flex: 1,
    minWidth: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingVertical: 10,
    borderRadius: 7,
    cursor: 'pointer',
  },
  mapBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.greenDeep,
    fontFamily: typography.labelFont,
  },
  tourBtn: {
    flex: 1,
    minWidth: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.greenDeep,
    paddingVertical: 10,
    borderRadius: 7,
    cursor: 'pointer',
  },
  tourBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.labelFont,
  },

  /* Security Desk Card */
  securityDeskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  securityTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    fontFamily: typography.headlineFont,
  },
  securityDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
    fontFamily: typography.bodyFont,
  },
  securityPhoneTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
  },
  securityPhoneText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    fontFamily: typography.labelFont,
  },

  /* 4. FAQ Block */
  faqBlock: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 32,
    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.03)',
  },
  faqMainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 20,
    fontFamily: typography.headlineFont,
  },
  faqGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  faqCard: {
    width: 'calc(50% - 10px)',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 18,
  },
  faqCardMobile: {
    width: '100%',
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 6,
    fontFamily: typography.headlineFont,
  },
  faqAnswer: {
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
  },
});

