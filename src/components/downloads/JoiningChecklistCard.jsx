import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle2, ListChecks } from 'lucide-react';
import { colors, typography } from '../../theme/colors';

export default function JoiningChecklistCard() {
  const checklist = [
    'KCSE Result Slip / Leaving Certificate',
    'National ID Card / Birth Certificate',
    'Two colored passport-sized photographs',
    'Certified Medical Examination Report',
  ];

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <ListChecks size={18} color={colors.green} />
        </View>
        <Text style={styles.title}>Joining Document Checklist</Text>
      </View>

      <Text style={styles.subtitle}>
        When submitting your physical admission docket, please present original and clear copies of:
      </Text>

      {/* Checklist Items */}
      <View style={styles.list}>
        {checklist.map((item, index) => (
          <View key={index} style={styles.checkItem}>
            <CheckCircle2 size={15} color={colors.green} style={styles.checkIcon} />
            <Text style={styles.checkText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 22,
    marginBottom: 20,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: colors.greenLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.charcoal,
    fontFamily: typography.headlineFont,
  },
  subtitle: {
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.textSecondary,
    marginBottom: 14,
    fontFamily: typography.bodyFont,
  },
  list: {
    gap: 8,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  checkIcon: {
    flexShrink: 0,
  },
  checkText: {
    fontSize: 11.5,
    color: colors.charcoal,
    fontWeight: '600',
    fontFamily: typography.bodyFont,
  },
});
