import React, { useState, useMemo } from 'react';
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
import { downloadsData, downloadCategories } from '../data/downloadsData';
import DownloadDocumentCard from '../components/downloads/DownloadDocumentCard';
import ScrollReveal from '../components/common/ScrollReveal';
import { colors, typography } from '../theme/colors';

export default function DownloadsPage({ onDownloadDoc }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredDocs = useMemo(() => {
    return downloadsData.filter((doc) => {
      // Keyword matching
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(query);
        const matchesDesc = doc.description.toLowerCase().includes(query);
        const matchesCode = doc.code.toLowerCase().includes(query);
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
  }, [searchTerm, activeCategory]);

  const handleDownload = (doc) => {
    if (onDownloadDoc) {
      onDownloadDoc(doc);
    } else {
      alert(`Downloading ${doc.title} (${doc.size} • ${doc.format})...`);
    }
  };

  const handleOpenRegistryWhatsApp = () => {
    Linking.openURL('https://wa.me/254759437978?text=Hello%20Loima%20TVC%20Registry,%20I%20need%20assistance%20with%20an%20official%20download%20or%20joining%20form.');
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
            {downloadCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === 'all' 
                ? downloadsData.length 
                : downloadsData.filter(d => d.category === cat.id).length;

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
                Registered & licensed under TVET Act No. 29 of 2013 (TVETA/PUBLIC/TVC/2021). All materials are official certified publications.
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
    color: colors.textMuted,
    maxWidth: 720,
    fontFamily: typography.bodyFont,
  },
  filterSection: {
    marginBottom: 20,
    gap: 12,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 46,
    gap: 10,
    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: colors.textPrimary,
    fontFamily: typography.bodyFont,
    outlineStyle: 'none',
  },
  clearBtn: {
    padding: 4,
  },
  categoryPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  catPill: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    color: '#FFFFFF',
    fontWeight: '700',
  },
  resultsMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  resultsCountText: {
    fontSize: 12.5,
    color: colors.textMuted,
    fontFamily: typography.bodyFont,
  },
  countBold: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  resetFilterLink: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.orange,
    cursor: 'pointer',
    fontFamily: typography.labelFont,
  },
  docsList: {
    marginBottom: 36,
  },
  emptyBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
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
    maxWidth: 440,
    marginBottom: 18,
    fontFamily: typography.bodyFont,
  },
  emptyResetBtn: {
    backgroundColor: colors.greenDeep,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 6,
    cursor: 'pointer',
  },
  emptyResetBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.labelFont,
  },
  supportFooter: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  supportFooterMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 14,
  },
  supportLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  shieldIconBox: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  supportTextCol: {
    flex: 1,
  },
  supportHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
    fontFamily: typography.headlineFont,
  },
  supportBody: {
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.textMuted,
    fontFamily: typography.bodyFont,
  },
  supportRightBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 6,
    cursor: 'pointer',
    flexShrink: 0,
  },
  supportRightBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.greenDeep,
    fontFamily: typography.labelFont,
  },
});
