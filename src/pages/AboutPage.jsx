import React, { useState, useMemo, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  ScrollView, 
  useWindowDimensions, 
  Linking 
} from 'react-native';
import { 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  Info, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Award,
  Building2,
  Camera
} from 'lucide-react';
import { aboutCategories, aboutItems } from '../data/aboutData';
import { colors, typography } from '../theme/colors';
import ScrollReveal from '../components/common/ScrollReveal';
import laikipiaBannerImg from '../assets/Laikipia-north-banner-300x200.webp';

export default function AboutPage({ initialOptionId = 'our-history', onNavigate, onOpenInquiry }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 960;

  const [selectedId, setSelectedId] = useState(initialOptionId);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // If initialOptionId changes externally, update selectedId
  useEffect(() => {
    if (initialOptionId) {
      setSelectedId(initialOptionId);
    }
  }, [initialOptionId]);

  // Filtered items for the sidebar
  const filteredItems = useMemo(() => {
    return aboutItems.filter((item) => {
      if (activeCategory !== 'all' && item.categoryId !== activeCategory) {
        return false;
      }
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.categoryName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }
      return true;
    });
  }, [activeCategory, searchTerm]);

  // Active item details
  const activeItem = useMemo(() => {
    const found = aboutItems.find((i) => i.id === selectedId);
    return found || aboutItems[0];
  }, [selectedId]);

  const handleActionClick = () => {
    if (activeItem.actionRoute === 'courses') {
      if (onNavigate) onNavigate('courses');
    } else if (activeItem.actionRoute === 'downloads') {
      if (onNavigate) onNavigate('downloads');
    } else if (activeItem.actionRoute === 'home') {
      if (onNavigate) onNavigate('home');
    } else {
      if (onOpenInquiry) onOpenInquiry();
      else if (onNavigate) onNavigate('home');
    }
  };

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.container}>
        
        {/* ========================================================================= */}
        {/* FIRST SECTION: INSTITUTIONAL HERO BANNER WITH CAMPUS IMAGE */}
        {/* ========================================================================= */}
        <ScrollReveal animation="fade-up" duration={500}>
          <View style={[styles.heroBanner, isMobile && styles.heroBannerMobile]}>
            {/* Ambient Background with subtle blur of the authentic campus banner */}
            <Image
              source={laikipiaBannerImg || { uri: '/Images/Laikipia-north-banner-300x200.webp' }}
              style={styles.heroBannerBgImage}
              resizeMode="cover"
              blurRadius={10}
            />
            {/* Deep institutional gradient overlay */}
            <View style={styles.heroBannerOverlay} />

            {/* Split Content: Narrative on Left + Real Photo Showcase on Right */}
            <View style={[styles.heroBannerInner, isMobile && styles.heroBannerInnerMobile]}>
              
              {/* Left Column: Heading, Badges, Details */}
              <View style={[styles.heroBannerLeft, isMobile && styles.heroBannerLeftMobile]}>
                <View style={styles.bannerTagRow}>
                  <View style={styles.bannerGovTag}>
                    <View style={styles.bannerGovDot} />
                    <Text style={styles.bannerGovTagText}>
                      MINISTRY OF EDUCATION • STATE DEPARTMENT FOR TVET
                    </Text>
                  </View>
                  <View style={styles.bannerLocationTag}>
                    <MapPin size={12} color={colors.orange} />
                    <Text style={styles.bannerLocationText}>Rumuruti, Laikipia County</Text>
                  </View>
                </View>

                <Text style={[styles.bannerMainTitle, isMobile && styles.bannerMainTitleMobile]}>
                  About Laikipia North TVC
                </Text>

                <Text style={[styles.bannerSubtitle, isMobile && styles.bannerSubtitleMobile]}>
                  A premier national centre of technical and vocational excellence established to empower 
                  youth with competency-based craftsmanship, industrial innovation, and self-reliance.
                </Text>

                {/* Institutional Key Fact Badges */}
                <View style={[styles.bannerBadgesRow, isMobile && styles.bannerBadgesRowMobile]}>
                  <View style={styles.bannerBadgeItem}>
                    <ShieldCheck size={14} color={colors.orange} />
                    <Text style={styles.bannerBadgeText}>TVETA/PUBLIC/TVC/2021</Text>
                  </View>
                  <View style={styles.bannerBadgeItem}>
                    <Award size={14} color={colors.orange} />
                    <Text style={styles.bannerBadgeText}>KNQF Levels 4, 5 & 6</Text>
                  </View>
                  <View style={styles.bannerBadgeItem}>
                    <CheckCircle2 size={14} color={colors.orange} />
                    <Text style={styles.bannerBadgeText}>CDACC Assessment Center</Text>
                  </View>
                  <View style={styles.bannerBadgeItem}>
                    <Building2 size={14} color={colors.orange} />
                    <Text style={styles.bannerBadgeText}>35+ Acre Campus Complex</Text>
                  </View>
                </View>
              </View>

              {/* Right Column: Featured Authentic Photo Card */}
              <View style={[styles.heroBannerPhotoCol, isMobile && styles.heroBannerPhotoColMobile]}>
                <View style={styles.heroPhotoFrame}>
                  <Image
                    source={laikipiaBannerImg || { uri: '/Images/Laikipia-north-banner-300x200.webp' }}
                    style={styles.heroPhotoImg}
                    resizeMode="cover"
                  />
                  {/* Amber bottom accent line */}
                  <View style={styles.heroPhotoAccentBar} />

                  <View style={styles.heroPhotoCaption}>
                    <Camera size={12} color={colors.orange} />
                    <Text style={styles.heroPhotoCaptionText} numberOfLines={1}>
                      LNTVC Administration Block & Trainees
                    </Text>
                  </View>
                </View>
              </View>

            </View>
          </View>
        </ScrollReveal>

        {/* Category Filter Pills Section */}
        <View style={styles.filterBarSection}>
          <Text style={styles.filterBarTitle}>EXPLORE BY SECTOR OR GOVERNANCE DIVISION</Text>
          <View style={styles.categoryPillsRow}>
            <TouchableOpacity
              style={[styles.catPill, activeCategory === 'all' && styles.catPillActive]}
              onPress={() => setActiveCategory('all')}
              activeOpacity={0.8}
            >
              <Text style={[styles.catPillText, activeCategory === 'all' && styles.catPillTextActive]}>
                All Options ({aboutItems.length})
              </Text>
            </TouchableOpacity>

            {aboutCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = aboutItems.filter((i) => i.categoryId === cat.id).length;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catPill, isActive && styles.catPillActive]}
                  onPress={() => setActiveCategory(cat.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.catPillText, isActive && styles.catPillTextActive]}>
                    {cat.title} ({count})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Master Two-Column Content Layout */}
        <View style={[styles.layoutRow, isMobile && styles.layoutRowMobile]}>
          
          {/* Left Column: Search & Options List (~32%) */}
          <View style={[styles.sidebarCol, isMobile && styles.sidebarColMobile]}>
            
            {/* Search Input */}
            <View style={styles.searchBox}>
              <Search size={15} color={colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search departments, offices or info..."
                placeholderTextColor={colors.charcoalFaint}
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
              {searchTerm ? (
                <TouchableOpacity onPress={() => setSearchTerm('')}>
                  <RotateCcw size={13} color={colors.textMuted} />
                </TouchableOpacity>
              ) : null}
            </View>

            {/* List of Options */}
            <View style={styles.optionsListContainer}>
              {filteredItems.map((item) => {
                const isSelected = item.id === activeItem.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.optionItem, isSelected && styles.optionItemActive]}
                    onPress={() => setSelectedId(item.id)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.optionItemContent}>
                      <Text style={[styles.optionCategoryLabel, isSelected && styles.optionCategoryLabelActive]}>
                        {item.categoryName.toUpperCase()}
                      </Text>
                      <Text style={[styles.optionItemTitle, isSelected && styles.optionItemTitleActive]}>
                        {item.title}
                      </Text>
                    </View>
                    <ChevronRight 
                      size={16} 
                      color={isSelected ? colors.white : colors.textMuted} 
                    />
                  </TouchableOpacity>
                );
              })}

              {filteredItems.length === 0 && (
                <View style={styles.noResultsBox}>
                  <Text style={styles.noResultsText}>No matching options found</Text>
                  <TouchableOpacity 
                    style={styles.resetBtn} 
                    onPress={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                    }}
                  >
                    <Text style={styles.resetBtnText}>Clear Search</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

          </View>

          {/* Right Column: In-depth Explanation & Image Showcase (~68%) */}
          <ScrollReveal animation="fade-up" duration={600} style={[styles.contentCol, isMobile && styles.contentColMobile]}>
            
            {/* Header of Active Item */}
            <View style={styles.activeHeader}>
              <View style={styles.badgeRow}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>
                    {activeItem.categoryName}
                  </Text>
                </View>

                <View style={styles.codeBadge}>
                  <Sparkles size={11} color={colors.charcoal} />
                  <Text style={styles.codeBadgeText}>Verified LNTVC Section</Text>
                </View>
              </View>

              <Text style={styles.detailTitle}>{activeItem.title}</Text>
              <Text style={styles.detailSubtitle}>{activeItem.subtitle}</Text>
            </View>

            {/* Photo Gallery Grid with Captions */}
            <View style={styles.gallerySection}>
              <View style={[styles.galleryGrid, isMobile && styles.galleryGridMobile]}>
                {activeItem.images.map((img, idx) => (
                  <View 
                    key={idx} 
                    style={[
                      styles.galleryCard, 
                      activeItem.images.length === 1 && styles.galleryCardFull,
                      idx === 0 && activeItem.images.length === 3 && styles.galleryCardLarge
                    ]}
                  >
                    <Image
                      source={{ uri: img.url }}
                      style={styles.galleryImage}
                      resizeMode="cover"
                    />
                    <View style={styles.galleryCaptionBox}>
                      <Text style={styles.galleryCaptionText}>{img.caption}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Detailed Explanation Text */}
            <View style={styles.explanationSection}>
              <Text style={styles.sectionHeading}>Overview & Mandate</Text>
              <Text style={styles.descriptionParagraph}>
                {activeItem.description}
              </Text>
            </View>

            {/* Key Mandates & Statutory Objectives */}
            <View style={styles.mandatesSection}>
              <Text style={styles.sectionHeading}>Core Responsibilities & Objectives</Text>
              <View style={styles.mandatesList}>
                {activeItem.mandates.map((m, idx) => (
                  <View key={idx} style={styles.mandateCard}>
                    <CheckCircle2 size={16} color={colors.green} style={styles.mandateIcon} />
                    <Text style={styles.mandateText}>{m}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Quick Facts / Specifications Grid */}
            <View style={styles.highlightsSection}>
              <Text style={styles.sectionHeading}>Key Facts & Standards</Text>
              <View style={styles.highlightsGrid}>
                {activeItem.highlights.map((h, idx) => (
                  <View key={idx} style={styles.highlightCard}>
                    <Text style={styles.highlightLabel}>{h.label}</Text>
                    <Text style={styles.highlightVal}>{h.value}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Contact & Contextual Action Footer Card */}
            <View style={styles.contactActionCard}>
              <View style={styles.contactLeft}>
                <View style={styles.contactHeaderRow}>
                  <Info size={16} color={colors.orange} />
                  <Text style={styles.contactCardTitle}>Direct Office Liaison</Text>
                </View>
                <Text style={styles.contactDetailsText}>
                  {activeItem.contactInfo}
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.actionBtn}
                onPress={handleActionClick}
                activeOpacity={0.85}
              >
                <Text style={styles.actionBtnText}>{activeItem.actionText}</Text>
                <ArrowRight size={15} color={colors.white} />
              </TouchableOpacity>
            </View>

          </ScrollReveal>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: colors.white,
    flexGrow: 1,
    paddingVertical: 32,
  },
  container: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  /* First Section: Hero Banner with Authentic Campus Image */
  heroBanner: {
    position: 'relative',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 24,
    minHeight: 310,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.14)',
    elevation: 4,
    backgroundColor: colors.greenDeep,
    justifyContent: 'center',
  },
  heroBannerMobile: {
    minHeight: 280,
    borderRadius: 10,
    marginBottom: 18,
  },
  heroBannerBgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.18,
  },
  heroBannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(14, 48, 32, 0.92)',
    // @ts-ignore
    backgroundImage: 'linear-gradient(135deg, rgba(14, 48, 32, 0.96) 0%, rgba(20, 70, 46, 0.90) 50%, rgba(15, 23, 42, 0.94) 100%)',
  },
  heroBannerInner: {
    position: 'relative',
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 28,
    paddingHorizontal: 32,
    gap: 28,
  },
  heroBannerInnerMobile: {
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 20,
  },
  heroBannerLeft: {
    flex: 1.25,
    minWidth: 300,
  },
  heroBannerLeftMobile: {
    minWidth: '100%',
  },
  bannerTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  bannerGovTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  bannerGovDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.orange,
  },
  bannerGovTagText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
    fontFamily: typography.labelFont,
  },
  bannerLocationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
  },
  bannerLocationText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.orange,
    fontFamily: typography.labelFont,
  },
  bannerMainTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 10,
    fontFamily: typography.headlineFont,
    // @ts-ignore
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bannerMainTitleMobile: {
    fontSize: 23,
    marginBottom: 8,
    lineHeight: 28,
  },
  bannerSubtitle: {
    fontSize: 14.5,
    lineHeight: 22,
    color: '#E2E8F0',
    maxWidth: 760,
    marginBottom: 18,
    fontFamily: typography.bodyFont,
  },
  bannerSubtitleMobile: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  bannerBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  bannerBadgesRowMobile: {
    gap: 8,
  },
  bannerBadgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  bannerBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F8FAFC',
    fontFamily: typography.labelFont,
  },

  /* Right Column: Authentic Photo Showcase Frame */
  heroBannerPhotoCol: {
    flex: 0.95,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  heroBannerPhotoColMobile: {
    width: '100%',
    marginTop: 4,
  },
  heroPhotoFrame: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(245, 158, 11, 0.55)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
    backgroundColor: '#0E3020',
  },
  heroPhotoImg: {
    width: '100%',
    height: 220,
    aspectRatio: 1.5,
  },
  heroPhotoAccentBar: {
    height: 3,
    backgroundColor: colors.orange,
    width: '100%',
  },
  heroPhotoCaption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(10, 30, 20, 0.92)',
  },
  heroPhotoCaptionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F8FAFC',
    fontFamily: typography.labelFont,
  },
  filterBarSection: {
    marginBottom: 22,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterBarTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
    fontFamily: typography.labelFont,
    marginBottom: 10,
  },
  categoryPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    cursor: 'pointer',
  },
  catPillActive: {
    backgroundColor: colors.greenDeep,
    borderColor: colors.greenDeep,
  },
  catPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: typography.labelFont,
  },
  catPillTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  layoutRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 28,
  },
  layoutRowMobile: {
    flexDirection: 'column',
    gap: 24,
  },
  sidebarCol: {
    flex: 1,
    minWidth: 280,
  },
  sidebarColMobile: {
    width: '100%',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 14,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 12.5,
    color: colors.charcoal,
    backgroundColor: 'transparent',
    borderWidth: 0,
    outline: 'none',
    fontFamily: typography.bodyFont,
  },
  optionsListContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
    maxHeight: 680,
    overflowY: 'auto',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  },
  optionItemActive: {
    backgroundColor: colors.greenDeep,
    borderBottomColor: colors.greenDark,
  },
  optionItemContent: {
    flex: 1,
    paddingRight: 8,
  },
  optionCategoryLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
    fontFamily: typography.labelFont,
  },
  optionCategoryLabelActive: {
    color: '#FFF8ED',
  },
  optionItemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.charcoal,
    fontFamily: typography.headlineFont,
  },
  optionItemTitleActive: {
    color: colors.white,
  },
  noResultsBox: {
    padding: 24,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 12.5,
    color: colors.textMuted,
    marginBottom: 10,
    fontFamily: typography.bodyFont,
  },
  resetBtn: {
    backgroundColor: colors.greenDeep,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  resetBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.white,
    fontFamily: typography.labelFont,
  },
  contentCol: {
    flex: 2.1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 26,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contentColMobile: {
    width: '100%',
    padding: 16,
  },
  activeHeader: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: colors.orangeLight,
    borderWidth: 1,
    borderColor: colors.orangeMuted,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.charcoal,
    letterSpacing: 0.4,
    fontFamily: typography.labelFont,
  },
  codeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
  },
  codeBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.charcoal,
    fontFamily: typography.labelFont,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.charcoal,
    marginBottom: 6,
    lineHeight: 30,
    fontFamily: typography.headlineFont,
  },
  detailSubtitle: {
    fontSize: 13.5,
    lineHeight: 19,
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
  },
  gallerySection: {
    marginBottom: 24,
  },
  galleryGrid: {
    flexDirection: 'row',
    gap: 14,
    flexWrap: 'wrap',
  },
  galleryGridMobile: {
    flexDirection: 'column',
  },
  galleryCard: {
    flex: 1,
    minWidth: 220,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
  },
  galleryCardFull: {
    minWidth: '100%',
  },
  galleryCardLarge: {
    minWidth: '100%',
  },
  galleryImage: {
    width: '100%',
    height: 180,
  },
  galleryCaptionBox: {
    padding: 8,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  galleryCaptionText: {
    fontSize: 11,
    lineHeight: 15,
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
  },
  explanationSection: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.charcoal,
    marginBottom: 10,
    letterSpacing: -0.2,
    fontFamily: typography.headlineFont,
  },
  descriptionParagraph: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.charcoalLight,
    fontFamily: typography.bodyFont,
  },
  mandatesSection: {
    marginBottom: 24,
  },
  mandatesList: {
    gap: 8,
  },
  mandateCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 6,
    padding: 10,
  },
  mandateIcon: {
    marginTop: 2,
    flexShrink: 0,
  },
  mandateText: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.charcoal,
    fontFamily: typography.bodyFont,
    flex: 1,
  },
  highlightsSection: {
    marginBottom: 24,
  },
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  highlightCard: {
    flex: 1,
    minWidth: 130,
    backgroundColor: colors.greenLight,
    borderWidth: 1,
    borderColor: colors.greenMuted,
    borderRadius: 8,
    padding: 12,
  },
  highlightLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: typography.labelFont,
  },
  highlightVal: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.greenDeep,
    fontFamily: typography.headlineFont,
  },
  contactActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.greenDeep,
    borderRadius: 10,
    padding: 16,
    gap: 16,
    flexWrap: 'wrap',
  },
  contactLeft: {
    flex: 1,
    minWidth: 220,
  },
  contactHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  contactCardTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.white,
    fontFamily: typography.headlineFont,
  },
  contactDetailsText: {
    fontSize: 11.5,
    lineHeight: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: typography.bodyFont,
  },
  actionBtn: {
    backgroundColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    cursor: 'pointer',
  },
  actionBtnText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.white,
    fontFamily: typography.labelFont,
  },
});

