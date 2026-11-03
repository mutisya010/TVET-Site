import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { colors, typography } from '../theme/colors';
import crestImg from '../assets/Loima Technical College Crest.png';
import slide1 from '../assets/College Banner_ Technology and Innovation.webp';
import slide2 from '../assets/Loima Technical College Façade.webp';
import slide3 from '../assets/Bright Workshop Training Room.webp';
import slide5 from '../assets/Lomia Technical College Exterior.webp';
import slide6 from '../assets/Collaborative Training Room Meeting.webp';

/**
 * 6 Hero Slides showcasing Loima TVC's Campus & Practical TVET Workshops.
 * Clean, unobstructed photo carousel rotating automatically every 3 seconds.
 */
const heroSlides = [
  { id: 'banner',        image: slide1 },
  { id: 'facade',        image: slide2 },
  { id: 'workshop1',     image: slide3 },
  { id: 'workshop2',     image: slide3 },
  { id: 'exterior',      image: slide5 },
  { id: 'training-room', image: slide6 },
];

export default function HeroSection({ onExploreCourses, onApplyNow }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 960;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 3 seconds (3000ms)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, currentSlideIndex]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <View style={styles.sectionWrapper}>
      {/* Background Soft Green/Orange Glow */}
      <View style={styles.bgGlow} />

      {/* Subtle School Crest Watermark in Background */}
      <View style={styles.bgCrestContainer} pointerEvents="none">
        <Image
          source={typeof crestImg === 'string' ? { uri: crestImg } : crestImg}
          style={styles.bgCrestWatermark}
          resizeMode="contain"
          // @ts-ignore
          accessibilityRole="presentation"
        />
      </View>

      <View style={styles.container}>
        <View style={[styles.inner, isMobile && styles.innerMobile]}>
          
          {/* Left Column: Heading, Badges, Text, CTAs */}
          <View style={[styles.leftCol, isMobile && styles.leftColMobile]}>
            {/* National TVET Status Pill Badge */}
            <View style={styles.govBadge}>
              <View style={styles.govDot} />
              <Text style={styles.govBadgeText}>
                MINISTRY OF EDUCATION • STATE DEPARTMENT FOR TVET
              </Text>
            </View>

            {/* Main Hero Headline */}
            <Text style={[styles.headline, isMobile && styles.headlineMobile]}>
              Empowering Youth with Practical Technical & Vocational Skills for the Modern Industry.
            </Text>

            {/* Sub-paragraph */}
            <Text style={styles.paragraph}>
              Loima Technical and Vocational College provides accredited Competency-Based 
              Education and Training (CBET). We equip students with job-ready technical expertise, 
              subsidised by national capitation and tailored for immediate employment.
            </Text>

            {/* Action Buttons */}
            <View style={[styles.buttonRow, isMobile && styles.buttonRowMobile]}>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={onExploreCourses}
                activeOpacity={0.85}
              >
                <Compass size={17} color={colors.white} />
                <Text style={styles.primaryBtnText}>Explore Courses (15)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={onApplyNow}
                activeOpacity={0.85}
              >
                <Text style={styles.secondaryBtnText}>Apply for Admission</Text>
                <ArrowRight size={16} color={colors.white} />
              </TouchableOpacity>
            </View>

            {/* KUCCPS Trust Subtext */}
            <View style={styles.trustRow}>
              <ShieldCheck size={16} color={colors.green} />
              <Text style={styles.trustText}>
                KUCCPS Placement & Self-Sponsored • TVETA Reg: <Text style={styles.trustBold}>TVETA/PUBLIC/TVC/0005/2023</Text> • Lorugum, Turkana
              </Text>
            </View>
          </View>

          {/* Right Column: Hero Auto-Rotating Image Carousel (Clean & Unobstructed) */}
          <View style={[styles.rightCol, isMobile && styles.rightColMobile]}>
            <View 
              style={styles.imageCardWrapper}
              // @ts-ignore
              onMouseEnter={() => setIsPaused(true)}
              // @ts-ignore
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Stack of Rotating Images with Smooth Cross-Fade */}
              {heroSlides.map((slide, idx) => {
                const isActive = currentSlideIndex === idx;
                return (
                  <View
                    key={slide.id}
                    style={[
                      styles.slideLayer,
                      isActive ? styles.slideLayerActive : styles.slideLayerInactive,
                    ]}
                  >
                    <Image
                      source={typeof slide.image === 'string' ? { uri: slide.image } : slide.image}
                      style={styles.heroImage}
                      resizeMode="cover"
                    />
                  </View>
                );
              })}

              {/* Minimalist Slide Indicator Dots at Bottom-Center */}
              <View style={styles.carouselIndicators}>
                {heroSlides.map((_, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setCurrentSlideIndex(idx)}
                    style={[
                      styles.indicatorDot,
                      currentSlideIndex === idx && styles.indicatorDotActive,
                    ]}
                    activeOpacity={0.7}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </View>

              {/* Left / Right Quick Navigation Arrows */}
              <TouchableOpacity
                style={[styles.sliderArrowBtn, styles.sliderArrowLeft]}
                onPress={handlePrevSlide}
                activeOpacity={0.8}
                aria-label="Previous Slide"
              >
                <ChevronLeft size={16} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.sliderArrowBtn, styles.sliderArrowRight]}
                onPress={handleNextSlide}
                activeOpacity={0.8}
                aria-label="Next Slide"
              >
                <ChevronRight size={16} color="#FFFFFF" />
              </TouchableOpacity>

            </View>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionWrapper: {
    backgroundColor: colors.white,
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 36,
    paddingBottom: 48,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bgGlow: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 450,
    height: 450,
    borderRadius: 225,
    backgroundColor: 'rgba(46, 139, 87, 0.08)',
    pointerEvents: 'none',
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
    width: 540,
    height: 540,
    maxWidth: '85vw',
    maxHeight: '85%',
    opacity: 0.075,
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
    gap: 40,
  },
  innerMobile: {
    flexDirection: 'column',
    gap: 32,
  },
  leftCol: {
    flex: 1.05,
  },
  leftColMobile: {
    width: '100%',
  },
  govBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: colors.greenLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  govDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.green,
  },
  govBadgeText: {
    color: colors.greenDeep,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
    fontFamily: typography.labelFont,
  },
  headline: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '900',
    color: colors.charcoal,
    letterSpacing: -0.8,
    marginBottom: 16,
    fontFamily: typography.headlineFont,
  },
  headlineMobile: {
    fontSize: 30,
    lineHeight: 36,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSecondary,
    marginBottom: 24,
    fontFamily: typography.bodyFont,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  buttonRowMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 10,
  },
  primaryBtn: {
    backgroundColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)',
    elevation: 3,
    cursor: 'pointer',
  },
  primaryBtnText: {
    color: colors.white,
    fontSize: 13.5,
    fontWeight: '800',
    fontFamily: typography.headlineFont,
  },
  secondaryBtn: {
    backgroundColor: colors.greenDeep,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.greenDark,
    cursor: 'pointer',
  },
  secondaryBtnText: {
    color: colors.white,
    fontSize: 13.5,
    fontWeight: '700',
    fontFamily: typography.labelFont,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
  },
  trustText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
  },
  trustBold: {
    fontWeight: '800',
    color: colors.textPrimary,
  },
  rightCol: {
    flex: 0.95,
    width: '100%',
  },
  rightColMobile: {
    width: '100%',
  },
  imageCardWrapper: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(20, 70, 46, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: '#0F2B1D',
    aspectRatio: 16 / 11,
    minHeight: 290,
  },
  slideLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 0.65s ease-in-out',
  },
  slideLayerActive: {
    opacity: 1,
    zIndex: 1,
  },
  slideLayerInactive: {
    opacity: 0,
    zIndex: 0,
    pointerEvents: 'none',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  carouselIndicators: {
    position: 'absolute',
    bottom: 14,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  indicatorDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  indicatorDotActive: {
    width: 20,
    backgroundColor: colors.orange,
    borderRadius: 3.5,
  },
  sliderArrowBtn: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -16 }],
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(10, 35, 22, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.15s ease',
  },
  sliderArrowLeft: {
    left: 10,
  },
  sliderArrowRight: {
    right: 10,
  },
});
