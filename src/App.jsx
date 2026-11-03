import React, { useState, useRef } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Linking, 
  useWindowDimensions 
} from 'react-native';
import { MessageCircle } from 'lucide-react';

import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import RegulatoryRibbon from './components/RegulatoryRibbon';
import CoursesSection from './components/CoursesSection';
import WhyTrainSection from './components/WhyTrainSection';
import CampusShowcaseSection from './components/CampusShowcaseSection';
import NoticesSection from './components/NoticesSection';
import AdmissionsCTASection from './components/AdmissionsCTASection';
import FooterSection from './components/FooterSection';
import CourseModal from './components/CourseModal';
import NoticeModal from './components/NoticeModal';
import ScrollReveal from './components/common/ScrollReveal';
import CoursesPage from './pages/CoursesPage';
import DownloadsPage from './pages/DownloadsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import { noticesData } from './data/noticesData';

export default function App() {
  const { width } = useWindowDimensions();

  // Active page route: 'home' | 'about' | 'courses' | 'downloads' | 'contact'
  const [currentPage, setCurrentPage] = useState('home');

  // Selected option for About Page
  const [selectedAboutOptionId, setSelectedAboutOptionId] = useState('our-history');

  // Modal states
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseModalVisible, setCourseModalVisible] = useState(false);

  const [selectedNotice, setSelectedNotice] = useState(null);
  const [noticeModalVisible, setNoticeModalVisible] = useState(false);

  const scrollViewRef = useRef(null);

  const scrollToTop = () => {
    if (scrollViewRef.current && scrollViewRef.current.scrollTo) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId) => {
    if (typeof document !== 'undefined') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavigate = (navId, extraId) => {
    if (navId === 'home') {
      setCurrentPage('home');
      scrollToTop();
    } else if (navId === 'about') {
      setCurrentPage('about');
      if (extraId) {
        setSelectedAboutOptionId(extraId);
      }
      scrollToTop();
    } else if (navId === 'courses') {
      setCurrentPage('courses');
      scrollToTop();
    } else if (navId === 'downloads') {
      setCurrentPage('downloads');
      scrollToTop();
    } else if (navId === 'contact') {
      setCurrentPage('contact');
      scrollToTop();
    }
  };

  const handleOpenInquiry = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => scrollToSection('admissions-section'), 120);
    } else {
      scrollToSection('admissions-section');
    }
  };

  const handleOpenCourseModal = (course) => {
    setSelectedCourse(course);
    setCourseModalVisible(true);
  };

  const handleApplyCourse = (course) => {
    setCourseModalVisible(false);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => scrollToSection('admissions-section'), 120);
    } else {
      scrollToSection('admissions-section');
    }
  };

  const handleOpenNotice = (noticeOrId) => {
    if (typeof noticeOrId === 'string') {
      const found = noticesData.find((n) => n.id === noticeOrId);
      setSelectedNotice(found || noticesData[0]);
    } else {
      setSelectedNotice(noticeOrId);
    }
    setNoticeModalVisible(true);
  };

  const handleDownloadDoc = (doc) => {
    handleOpenNotice('notice-2');
  };

  const handleBookVisit = () => {
    Linking.openURL('https://wa.me/254759437978?text=Hello%20Loima%20TVC,%20I%20would%20like%20to%20book%20a%20guided%20campus%20visit');
  };

  const handleFloatingWhatsApp = () => {
    Linking.openURL('https://wa.me/254759437978?text=Hello%20Loima%20TVC%20Admissions,%20I%20have%20an%20enquiry');
  };

  return (
    <View style={styles.rootContainer}>
      {/* 1. Top Announcement / Helpline Bar */}
      <TopBar onOpenInquiry={handleOpenInquiry} />

      {/* 2. Main Navigation Bar with About Us & Courses Mega-Menus */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate} 
        onOpenInquiry={handleOpenInquiry} 
        onSelectCourse={handleOpenCourseModal}
      />

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollArea} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Render page based on currentPage */}
        {currentPage === 'home' && (
          <>
            {/* Hero Section (staggered entrance internally) */}
            <HeroSection 
              onExploreCourses={() => {
                setCurrentPage('courses');
                scrollToTop();
              }}
              onApplyNow={handleOpenInquiry}
            />

            {/* Key Metrics & Stats Bar (staggered cards internally) */}
            <StatsBar />

            {/* Accredited Regulatory Ribbon */}
            <ScrollReveal animation="fade-up" delay={50} duration={600}>
              <RegulatoryRibbon />
            </ScrollReveal>

            {/* Featured Programme Categories (staggered cards internally) */}
            <CoursesSection 
              onSelectCourse={handleOpenCourseModal}
              onApplyCourse={handleApplyCourse}
              onViewAllCourses={() => {
                setCurrentPage('courses');
                scrollToTop();
              }}
            />

            {/* Institutional Advantages: Why Train with Loima TVC (staggered feature cards internally) */}
            <WhyTrainSection onInquire={handleOpenInquiry} />

            {/* Campus Life & Workshop Showcase (staggered cards internally) */}
            <CampusShowcaseSection 
              onBookVisit={handleBookVisit}
              onViewWorkshops={() => {
                setCurrentPage('courses');
                scrollToTop();
              }}
            />

            {/* Academic Registry Notices & Circulars (staggered cards internally) */}
            <NoticesSection onOpenNotice={handleOpenNotice} />

            {/* Ready to Build Career CTA Section */}
            <ScrollReveal animation="fade-up" delay={60} duration={700}>
              <AdmissionsCTASection onApplySuccess={handleOpenInquiry} />
            </ScrollReveal>
          </>
        )}

        {currentPage === 'about' && (
          <ScrollReveal animation="fade-up" duration={600}>
            <AboutPage 
              initialOptionId={selectedAboutOptionId}
              onNavigate={handleNavigate}
              onOpenInquiry={handleOpenInquiry}
            />
          </ScrollReveal>
        )}

        {currentPage === 'courses' && (
          <ScrollReveal animation="fade-up" duration={600}>
            <CoursesPage 
              onViewCourseDetails={handleOpenCourseModal}
              onApplyCourse={handleApplyCourse}
              onStartApplication={handleOpenInquiry}
            />
          </ScrollReveal>
        )}

        {currentPage === 'downloads' && (
          <ScrollReveal animation="fade-up" duration={600}>
            <DownloadsPage
              onDownloadDoc={handleDownloadDoc}
            />
          </ScrollReveal>
        )}

        {currentPage === 'contact' && (
          <ScrollReveal animation="fade-up" duration={600}>
            <ContactPage 
              onNavigate={handleNavigate}
            />
          </ScrollReveal>
        )}

        {/* Footer & Regulatory Sub-footer */}
        <ScrollReveal animation="fade-up" duration={650}>
          <FooterSection 
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
            onOpenNotice={handleOpenNotice}
          />
        </ScrollReveal>
      </ScrollView>

      {/* Floating WhatsApp Action Pill */}
      <TouchableOpacity 
        style={styles.floatingWhatsApp}
        onPress={handleFloatingWhatsApp}
        activeOpacity={0.85}
      >
        <MessageCircle size={22} color="#ffffff" />
      </TouchableOpacity>

      {/* Interactive Course Details Modal */}
      <CourseModal 
        visible={courseModalVisible}
        course={selectedCourse}
        onClose={() => setCourseModalVisible(false)}
        onApplyCourse={handleApplyCourse}
      />

      {/* Interactive Notice Circular Modal */}
      <NoticeModal 
        visible={noticeModalVisible}
        notice={selectedNotice}
        onClose={() => setNoticeModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    minHeight: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  scrollArea: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
  floatingWhatsApp: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#2E8B57',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 999,
    cursor: 'pointer',
  },
});
