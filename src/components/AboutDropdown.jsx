import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography } from '../theme/colors';

export default function AboutDropdown({ onSelectOption, onClose }) {
  const handleItemClick = (optionId) => {
    if (onSelectOption) {
      onSelectOption(optionId);
    }
    if (onClose) {
      onClose();
    }
  };

  const aboutLinks = [
    { id: 'our-history', label: 'Our History & Heritage' },
    { id: 'gallery', label: 'Campus Life & Gallery' },
  ];

  return (
    <View style={styles.dropdownBox}>
      <View style={styles.topAccent} />

      {aboutLinks.map((item, idx) => {
        const isLast = idx === aboutLinks.length - 1;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, isLast && styles.menuItemLast]}
            onPress={() => handleItemClick(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownBox: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: 250,
    backgroundColor: colors.greenDeep,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.3)',
    elevation: 12,
    zIndex: 10000,
    marginTop: 4,
  },
  topAccent: {
    height: 3,
    backgroundColor: colors.orange,
    width: '100%',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  menuItem: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  menuItemLast: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.headlineFont,
    letterSpacing: 0.2,
  },
});
