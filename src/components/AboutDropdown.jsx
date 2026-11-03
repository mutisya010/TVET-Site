import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react';
import { colors, typography } from '../theme/colors';

export default function AboutDropdown({ onSelectOption, onClose }) {
  const [deputySubmenuOpen, setDeputySubmenuOpen] = useState(false);

  const handleItemClick = (optionId) => {
    if (onSelectOption) {
      onSelectOption(optionId);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <View style={styles.dropdownBox}>
      {/* Top Gold / Amber Accent Stripe */}
      <View style={styles.topAccent} />

      {/* 1. Our History & Heritage */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleItemClick('our-history')}
        activeOpacity={0.8}
      >
        <Text style={styles.menuText}>Our History & Heritage</Text>
      </TouchableOpacity>

      {/* 2. Campus Life & Gallery */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleItemClick('gallery')}
        activeOpacity={0.8}
      >
        <Text style={styles.menuText}>Campus Life & Gallery</Text>
      </TouchableOpacity>

      {/* Divider / Group Header for Management */}
      <View style={styles.groupHeader}>
        <Text style={styles.groupHeaderText}>INSTITUTIONAL LEADERSHIP</Text>
      </View>

      {/* 3. Principal */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleItemClick('office-of-principal')}
        activeOpacity={0.8}
      >
        <Text style={styles.menuText}>Principal</Text>
      </TouchableOpacity>

      {/* 4. Deputy Principals (with flyout submenu) */}
      <View 
        style={styles.submenuParent}
        // @ts-ignore
        onMouseEnter={() => setDeputySubmenuOpen(true)}
        // @ts-ignore
        onMouseLeave={() => setDeputySubmenuOpen(false)}
      >
        <TouchableOpacity
          style={[styles.menuItem, styles.menuItemLast, deputySubmenuOpen && styles.menuItemHovered]}
          onPress={() => setDeputySubmenuOpen(!deputySubmenuOpen)}
          activeOpacity={0.8}
        >
          <Text style={[styles.menuText, deputySubmenuOpen && styles.menuTextHighlight]}>
            Deputy Principals
          </Text>
          <ChevronRight 
            size={14} 
            color={deputySubmenuOpen ? colors.orange : 'rgba(255, 255, 255, 0.85)'} 
          />
        </TouchableOpacity>

        {/* Submenu for Deputy Principals */}
        {deputySubmenuOpen && (
          <View style={styles.submenuFlyout}>
            <View style={styles.submenuLeftAccent} />
            <TouchableOpacity
              style={styles.submenuItem}
              onPress={() => handleItemClick('deputy-principal-admin')}
              activeOpacity={0.8}
            >
              <Text style={styles.submenuText}>Deputy Principal (Administration)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submenuItem, styles.submenuItemLast]}
              onPress={() => handleItemClick('deputy-principal-academics')}
              activeOpacity={0.8}
            >
              <Text style={styles.submenuText}>Deputy Principal (Academics)</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  groupHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.12)',
  },
  groupHeaderText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.orange,
    letterSpacing: 0.8,
    fontFamily: typography.labelFont,
  },
  menuItem: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  menuItemHovered: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
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
  menuTextHighlight: {
    color: colors.orange,
  },
  submenuParent: {
    position: 'relative',
  },
  submenuFlyout: {
    position: 'absolute',
    left: '100%',
    top: 0,
    width: 260,
    backgroundColor: colors.greenDeep,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '4px 12px 28px rgba(0, 0, 0, 0.35)',
    elevation: 14,
    marginLeft: 2,
    zIndex: 10001,
  },
  submenuLeftAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colors.orange,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  submenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
  },
  submenuItemLast: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  submenuText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: typography.headlineFont,
  },
});
