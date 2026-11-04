import React, { useState, useMemo, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Linking,
  useWindowDimensions 
} from 'react-native';
import { Search, RotateCcw, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { downloadsData as fallbackDownloads, downloadCategories as fallbackCategories } from '../data/downloadsData';
import { fetchDownloads, fetchDownloadCategories } from '../services/api';
import { useBranding } from '../context/BrandingContext';
import DownloadDocumentCard from '../components/downloads/DownloadDocumentCard';
import ScrollReveal from '../components/common/ScrollReveal';
import { colors, typography } from '../theme/colors';

export default function DownloadsPage({ onDownloadDoc }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { whatsappNumber, tvetaLicense } = useBranding();

  // Categories & Documents state
  const [categories, setCategories] = useState(fallbackCategories);
  const [documents, setDocuments] = useState(fallbackDownloads);
  const [isLoading, setIsLoading] = useState(false);

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Load categories and initial docs from Django backend
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const [cats, docs] = await Promise.all([
          fetchDownloadCategories(),
          fetchDownloads({ category: 'all', search: '' }),
        ]);
        if (isMounted) {
          if (cats && cats.length) setCategories(cats);
          if (docs && docs.length) setDocuments(docs);
        }
      } catch (err) {
        console.warn('Using local fallback downloads data:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      // Keyword matching
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = doc.title ? doc.title.toLowerCase().includes(query) : false;
        const matchesDesc = doc.description ? doc.description.toLowerCase().includes(query) : false;
        const matchesCode = doc.code ? doc.code.toLowerCase().includes(query) : false;
        if (!matchesTitle && !matchesDesc && !matchesCode) {
          return false;
        }
      }

      // Category filter
      if (activeCategory !== 'all' && doc.category !== activeCategory) {
        return false;
      }

      return true;
    });
  }, [documents, searchTerm, activeCategory]);

  const handleDownload = (doc) => {
    if (onDownloadDoc) {
      onDownloadDoc(doc);
    } else if (doc.downloadUrl && doc.downloadUrl !== '#') {
      Linking.openURL(doc.downloadUrl);
    } else {
      alert(`Downloading ${doc.title} (${doc.size} • ${doc.format})...`);
    }
  };

  const handleOpenRegistryWhatsApp = () => {
    const rawNumber = (whatsappNumber || '+254759437978').replace(/[^0-9]/g, '');
    Linking.openURL(`https://wa.me/${rawNumber}?text=Hello%20Registry,%20I%20need%20assistance%20with%20an%20official%20download%20or%20joining%20form.`);
  };

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.container}>
        
        {/* Minimalist Centered Header */}
        <View style={styles.headerBlock}>
          <View style={styles.overlineRow}>
            <View style={styles.overlineDot} />
            <Text style={styles.overlineText}>
              ACADEMIC & ADMINISTRATIVE REGISTRY
            </Text>
          </View>

          <Text style={[styles.mainTitle, isMobile && styles.mainTitleMobile]}>
            Downloads & Documents
          </Text>

          <Text style={styles.mainSubtitle}>
            Official institutional publications, admission packets, TVETA accreditation licenses, 
            and approved student guidelines. All documents are digitally certified.
          </Text>
        </View>

        {/* Minimal Search & Filter Bar */}
        <View style={styles.filterSection}>
          <View style={styles.searchBarWrapper}>
            <Search size={16} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by document title, code, or keyword (e.g., 'KUCCPS', 'Medical')..."
              placeholderTextColor={colors.textLight}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            {searchTerm ? (
              <TouchableOpacity onPress={() => setSearchTerm('')} activeOpacity={0.7} style={styles.clearBtn}>
                <RotateCcw size={13} color={colors.textMuted} />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Minimal Category Filter Pills */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.categoryPillsRow}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === 'all' 
                ? documents.length 
                : documents.filter(d => d.category === cat.id).length;

              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catPill, isActive && styles.catPillActive]}
                  onPress={() => setActiveCategory(cat.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.catPillText, isActive && styles.catPillTextActive]}>
                    {cat.label} ({count})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Results Counter Bar */}
        <View style={styles.resultsMetaRow}>
          <Text style={styles.resultsCountText}>
            Showing <Text style={styles.countBold}>{filteredDocs.length}</Text> {filteredDocs.length === 1 ? 'official document' : 'official documents'}
          </Text>
          {(activeCategory !== 'all' || searchTerm) ? (
            <TouchableOpacity onPress={() => { setSearchTerm(''); setActiveCategory('all'); }} activeOpacity={0.7}>
              <Text style={styles.resetFilterLink}>Reset Filters</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Minimalist Single-Column Documents List */}
        <View style={styles.docsList}>
          {filteredDocs.map((doc, idx) => (
            <ScrollReveal 
              key={doc.id} 
              animation="fade-up" 
              delay={idx * 40} 
              duration={500}
            >
              <DownloadDocumentCard
                doc={doc}
                onDownload={handleDownload}
              />
            </ScrollReveal>
          ))}
        </View>

        {/* Empty State */}
        {filteredDocs.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No matching documents found</Text>
            <Text style={styles.emptySub}>
              We couldn't find any document matching your keyword. Please check your spelling or clear the filter.
            </Text>
            <TouchableOpacity 
              style={styles.emptyResetBtn}
              onPress={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.emptyResetBtnText}>View All Documents</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Minimalist Support & Accreditation Footer Strip */}
        <View style={[styles.supportFooter, isMobile && styles.supportFooterMobile]}>
          <View style={styles.supportLeft}>
            <View style={styles.shieldIconBox}>
              <ShieldCheck size={18} color={colors.greenDeep} />
            </View>
            <View style={styles.supportTextCol}>
              <Text style={styles.supportHeading}>Statutory TVETA Certification</Text>
              <Text style={styles.supportBody}>
                Registered & licensed under TVET Act No. 29 of 2013 ({tvetaLicense || 'TVETA/PUBLIC/TVC/0005/2023'}). All materials are official certified publications.
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.supportRightBtn}
            onPress={handleOpenRegistryWhatsApp}
            activeOpacity={0.8}
          >
            <MessageSquare size={14} color={colors.greenDeep} />
            <Text style={styles.supportRightBtnText}>Admissions Registry Help</Text>
            <ArrowRight size={13} color={colors.greenDeep} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    paddingVertical: 44,
  },
  container: {
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  headerBlock: {
    marginBottom: 28,
  },
  overlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  overlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.orange,
  },
  overlineText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: colors.orange,
    letterSpacing: 0.8,
    fontFamily: typography.labelFont,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 8,
    fontFamily: typography.headlineFont,
  },
  mainTitleMobile: {
    fontSize: 26,
  },
  mainSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    maxWidth: 720,
    fontFamily: typography.bodyFont,
  },
  filterSection: {
    marginBottom: 20,
    gap: 14,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: colors.textPrimary,
    outlineWidth: 0,
    fontFamily: typography.bodyFont,
  },
  clearBtn: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: colors.surfaceMuted,
  },
  categoryPillsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  catPillActive: {
    backgroundColor: colors.greenLight,
    borderColor: colors.green,
  },
  catPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: typography.labelFont,
  },
  catPillTextActive: {
    color: colors.green,
    fontWeight: '700',
  },
  resultsMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  resultsCountText: {
    fontSize: 12.5,
    color: colors.textMuted,
    fontFamily: typography.bodyFont,
  },
  countBold: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  resetFilterLink: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.orange,
    textDecorationLine: 'underline',
    fontFamily: typography.labelFont,
  },
  docsList: {
    gap: 10,
    marginBottom: 44,
  },
  emptyBox: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 44,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
    fontFamily: typography.headlineFont,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 420,
    marginBottom: 16,
    lineHeight: 19,
    fontFamily: typography.bodyFont,
  },
  emptyResetBtn: {
    backgroundColor: colors.green,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  emptyResetBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
    fontFamily: typography.labelFont,
  },
  supportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.greenLight,
    borderWidth: 1,
    borderColor: colors.greenMuted,
    borderRadius: 12,
    padding: 18,
    gap: 16,
    flexWrap: 'wrap',
  },
  supportFooterMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  supportLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 260,
  },
  shieldIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.greenMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportTextCol: {
    flex: 1,
  },
  supportHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.greenDeep,
    marginBottom: 2,
    fontFamily: typography.headlineFont,
  },
  supportBody: {
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
  },
  supportRightBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.greenMuted,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
  },
  supportRightBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.greenDeep,
    fontFamily: typography.labelFont,
  },
});
