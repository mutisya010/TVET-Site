import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Linking, 
  useWindowDimensions,
  ActivityIndicator 
} from 'react-native';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { coursesData } from '../data/coursesData';

export default function AdmissionsCTASection({ initialCourse = null }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 960;

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [educationLevel, setEducationLevel] = useState('KCSE Certificate (Form Four)');
  const [selectedCourse, setSelectedCourse] = useState(
    initialCourse ? initialCourse.title : 'Electrical & Electronics Engineering'
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const educationOptions = [
    'KCSE Certificate (Form Four)',
    'KCPE Certificate (Primary Leaver)',
    'Artisan Certificate Holder',
    'Craft Certificate Holder',
    'Diploma / Degree Holder (Skills Upgrade)',
  ];

  const handleSubmit = () => {
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.length < 9) {
      setErrorMessage('Please enter a valid WhatsApp or phone number');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setFullName('');
    setPhone('');
    setNotes('');
    setSubmitted(false);
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/254711000000?text=Hello%20Admissions%20Office,%20I%20would%20like%20to%20apply%20to%20Laikipia%20North%20TVC');
  };

  const handleCall = () => {
    Linking.openURL('tel:+254700000000');
  };

  return (
    <View style={styles.section} id="admissions-section">
      <View style={styles.container}>
        <View style={[styles.inner, isMobile && styles.innerMobile]}>
          
          {/* Left Column: Admissions Info & Fast Contact */}
          <View style={[styles.leftCol, isMobile && styles.leftColMobile]}>
            <View style={styles.tagBadge}>
              <Sparkles size={12} color="#FFFFFF" />
              <Text style={styles.tagBadgeText}>ADMISSIONS OPEN FOR ALL</Text>
            </View>

            <Text style={[styles.title, isMobile && styles.titleMobile]}>
              Ready to Build a Rewarding Technical Career?
            </Text>

            <Text style={styles.description}>
              Reach our admissions officers directly via WhatsApp, cellular call, or submit 
              this express registration form. We guide you through course selection, 
              KUCCPS confirmation, and capitation funding.
            </Text>

            {/* Direct Contact Buttons */}
            <View style={[styles.buttonsRow, isMobile && styles.buttonsRowMobile]}>
              <TouchableOpacity
                style={styles.whatsAppBtn}
                onPress={handleWhatsApp}
                activeOpacity={0.85}
              >
                <MessageCircle size={16} color="#FFFFFF" />
                <Text style={styles.whatsAppBtnText}>WhatsApp Admissions</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.callBtn}
                onPress={handleCall}
                activeOpacity={0.85}
              >
                <Phone size={16} color="#FFFFFF" />
                <Text style={styles.callBtnText}>+254 700 000 000</Text>
              </TouchableOpacity>
            </View>

            {/* Sub Contact Info */}
            <View style={styles.metaInfoList}>
              <View style={styles.metaItem}>
                <Mail size={15} color="#FFA500" />
                <Text style={styles.metaText}>admissions@laikipianorthtvc.ac.ke</Text>
              </View>
              <View style={styles.metaItem}>
                <MapPin size={15} color="#FFA500" />
                <Text style={styles.metaText}>Doldol, Samburu Highway, Laikipia County</Text>
              </View>
            </View>
          </View>

          {/* Right Column: Direct Application & Course Enquiry Form */}
          <View style={[styles.rightCol, isMobile && styles.rightColMobile]}>
            <View style={styles.formCard}>
              
              {!submitted ? (
                <>
                  <Text style={styles.formTitle}>Direct Application & Course Enquiry</Text>
                  <Text style={styles.formSubtitle}>
                    Fill in your details for quick admissions assistance and fee structures.
                  </Text>

                  {errorMessage ? (
                    <View style={styles.errorBox}>
                      <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                  ) : null}

                  {/* Form Row: Full Name & Phone */}
                  <View style={[styles.inputRow, isMobile && styles.inputRowMobile]}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Full Name*</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g. Samuel Kiprono"
                        placeholderTextColor="#707070"
                        value={fullName}
                        onChangeText={setFullName}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Primary WhatsApp Number*</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="0712 345 678"
                        placeholderTextColor="#707070"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                      />
                    </View>
                  </View>

                  {/* Form Field: Education Level */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Highest Level of Completed Education*</Text>
                    <select
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      style={{
                        height: 42,
                        padding: '0 12px',
                        borderRadius: 6,
                        border: '1px solid #E2E8F0',
                        fontSize: 13,
                        color: '#0F172A',
                        backgroundColor: '#FFFFFF',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        outline: 'none',
                        width: '100%',
                      }}
                    >
                      {educationOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </View>

                  {/* Form Field: Course of Interest */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Intended Programme of Interest*</Text>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      style={{
                        height: 42,
                        padding: '0 12px',
                        borderRadius: 6,
                        border: '1px solid #E2E8F0',
                        fontSize: 13,
                        color: '#0F172A',
                        backgroundColor: '#FFFFFF',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        outline: 'none',
                        width: '100%',
                      }}
                    >
                      {coursesData.map((c) => (
                        <option key={c.id} value={c.title}>{c.title} ({c.level || c.duration})</option>
                      ))}
                    </select>
                  </View>

                  {/* Form Field: Questions / Notes */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Questions / Previous Grade / Optional Notes</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      placeholder="Inquire about hostel spaces, sponsorship eligibility, or KUCCPS code..."
                      placeholderTextColor="#707070"
                      multiline
                      numberOfLines={3}
                      value={notes}
                      onChangeText={setNotes}
                    />
                  </View>

                  {/* Submit Button */}
                  <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    activeOpacity={0.85}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                      <>
                        <Text style={styles.submitBtnText}>Submit Expression of Interest</Text>
                        <ArrowRight size={16} color="#FFFFFF" />
                      </>
                    )}
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.successContainer}>
                  <View style={styles.successIconBox}>
                    <CheckCircle2 size={40} color="#2E8B57" />
                  </View>
                  <Text style={styles.successTitle}>Application Request Received!</Text>
                  <Text style={styles.successMessage}>
                    Thank you, <Text style={styles.boldText}>{fullName}</Text>. Our Admissions Officer 
                    will contact you via WhatsApp at <Text style={styles.boldText}>{phone}</Text> within 
                    2 hours with course brochure, fee capitation details, and joining forms.
                  </Text>
                  <View style={styles.successRefBox}>
                    <Text style={styles.successRefLabel}>Application Tracking Ref:</Text>
                    <Text style={styles.successRefCode}>
                      LNTVC-{Math.floor(100000 + Math.random() * 900000)}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                    <Text style={styles.resetBtnText}>Submit Another Enquiry</Text>
                  </TouchableOpacity>
                </View>
              )}

            </View>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#14462E',
    paddingVertical: 64,
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
    gap: 48,
  },
  innerMobile: {
    flexDirection: 'column',
    gap: 36,
  },
  leftCol: {
    flex: 1.1,
    alignItems: 'flex-start',
  },
  leftColMobile: {
    width: '100%',
  },
  tagBadge: {
    backgroundColor: '#FFA500',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 16,
  },
  tagBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    lineHeight: 42,
    marginBottom: 14,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  titleMobile: {
    fontSize: 28,
    lineHeight: 34,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: '#E0E0E0',
    marginBottom: 24,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 28,
    flexWrap: 'wrap',
  },
  buttonsRowMobile: {
    width: '100%',
  },
  whatsAppBtn: {
    backgroundColor: '#2E8B57',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 7,
    cursor: 'pointer',
  },
  whatsAppBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  callBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 7,
    cursor: 'pointer',
  },
  callBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  metaInfoList: {
    gap: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 12.5,
    color: '#E0E0E0',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  rightCol: {
    flex: 1.1,
    width: '100%',
  },
  rightColMobile: {
    width: '100%',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  formSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    marginBottom: 20,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  errorBox: {
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: '#FFD0D0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 14,
  },
  errorText: {
    fontSize: 12,
    color: '#D32F2F',
    fontWeight: '600',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputRowMobile: {
    flexDirection: 'column',
    gap: 0,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13.5,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 7,
    marginTop: 6,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)',
    elevation: 3,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  successIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  successMessage: {
    fontSize: 13.5,
    lineHeight: 20,
    color: '#334155',
    textAlign: 'center',
    marginBottom: 18,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  boldText: {
    fontWeight: '700',
    color: '#0F172A',
  },
  successRefBox: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  successRefLabel: {
    fontSize: 11,
    color: '#707070',
    fontWeight: '600',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  successRefCode: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFA500',
    letterSpacing: 1,
    marginTop: 2,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  resetBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resetBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFA500',
    fontFamily: "'Space Grotesk', sans-serif",
  },
});
