import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { FileText, Download } from 'lucide-react';
import { colors, typography } from '../../theme/colors';

export default function DownloadDocumentCard({ doc, onDownload }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={[styles.itemRow, isMobile && styles.itemRowMobile]}>
      {/* File Type Icon Badge */}
      <View style={styles.iconContainer}>
        <FileText size={20} color={colors.greenDeep} />
      </View>

      {/* Main Content Area */}
      <View style={styles.contentCol}>
        {/* Meta Pills: Code • Format • Size • Date */}
        <View style={styles.metaRow}>
          <Text style={styles.codeBadge}>{doc.code}</Text>
          <Text style={styles.dotSeparator}>•</Text>
          <Text style={styles.metaFormat}>{doc.format}</Text>
          <Text style={styles.dotSeparator}>•</Text>
          <Text style={styles.metaSize}>{doc.size}</Text>
          <Text style={styles.dotSeparator}>•</Text>
          <Text style={styles.metaDate}>{doc.date}</Text>
        </View>

        {/* Document Title */}
        <TouchableOpacity onPress={() => onDownload(doc)} activeOpacity={0.7}>
          <Text style={styles.title}>{doc.title}</Text>
        </TouchableOpacity>

        {/* Document Description */}
        <Text style={styles.description}>{doc.description}</Text>
      </View>

      {/* Action Download Button */}
      <TouchableOpacity 
        style={[styles.downloadBtn, isMobile && styles.downloadBtnMobile]}
        onPress={() => onDownload(doc)}
        activeOpacity={0.85}
      >
        <Download size={14} color="#FFFFFF" />
        <Text style={styles.downloadBtnText}>Download</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
  },
  itemRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 16,
    gap: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  contentCol: {
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 5,
  },
  codeBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.orange,
    letterSpacing: 0.4,
    fontFamily: typography.labelFont,
  },
  dotSeparator: {
    fontSize: 10,
    color: '#94A3B8',
  },
  metaFormat: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    fontFamily: typography.labelFont,
  },
  metaSize: {
    fontSize: 11,
    color: colors.textMuted,
    fontFamily: typography.bodyFont,
  },
  metaDate: {
    fontSize: 11,
    color: colors.textMuted,
    fontFamily: typography.bodyFont,
  },
  title: {
    fontSize: 15.5,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: 4,
    fontFamily: typography.headlineFont,
  },
  description: {
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textMuted,
    fontFamily: typography.bodyFont,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.greenDeep,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    flexShrink: 0,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(20, 70, 46, 0.12)',
  },
  downloadBtnMobile: {
    width: '100%',
    justifyContent: 'center',
  },
  downloadBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    fontFamily: typography.labelFont,
  },
});
