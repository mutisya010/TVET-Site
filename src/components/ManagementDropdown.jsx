import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react';
import { colors, typography } from '../theme/colors';

/**
 * ManagementDropdown component mirroring the official institution structure:
 * - Board of Governors
 * - Principal
 * - Deputy Principals (Administration / Academics)
 * - Office of The Registrar
 * - Dean of students
 */
export default function ManagementDropdown({ onSelectOption, onClose }) {
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

      {/* 1. Board of Governors */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleItemClick('board-of-governors')}
        activeOpacity={0.8}
      >
        <Text style={styles.menuText}>Board of Governors</Text>
      </TouchableOpacity>

      {/* 2. Principal */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleItemClick('office-of-principal')}
        activeOpacity={0.8}
      >
        <Text style={styles.menuText}>Principal</Text>
      </TouchableOpacity>

      {/* 3. Deputy Principals (with expandable sub-menu) */}
      <View 
        style={styles.submenuParent}
        // @ts-ignore
        onMouseEnter={() => setDeputySubmenuOpen(true)}
        // @ts-ignore
        onMouseLeave={() => setDeputySubmenuOpen(false)}
      >
        <TouchableOpacity
          style={[styles.menuItem, deputySubmenuOpen && styles.menuItemHovered]}
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

      {/* 4. Office of The Registrar */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleItemClick('office-of-registrar')}
        activeOpacity={0.8}
      >
        <Text style={styles.menuText}>Office of The Registrar</Text>
      </TouchableOpacity>

      {/* 5. Dean of students */}
      <TouchableOpacity
        style={[styles.menuItem, styles.menuItemLast]}
        onPress={() => handleItemClick('office-of-dean-of-trainees')}
        activeOpacity={0.8}
      >
        <Text style={styles.menuText}>Dean of students</Text>
      </TouchableOpacity>
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
    overflow: 'visible',
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
    justifyContent: 'space-between',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    transition: 'background-color 0.15s ease',
  },
  menuItemLast: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  menuItemHovered: {
    backgroundColor: '#1A5638',
  },
  menuText: {
    fontSize: 14.5,
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
    top: 0,
    left: '100%',
    width: 270,
    backgroundColor: '#113A26',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 4,
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35)',
    elevation: 14,
    zIndex: 10001,
    marginLeft: 2,
  },
  submenuLeftAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colors.orange,
  },
  submenuItem: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  submenuItemLast: {
    borderBottomWidth: 0,
  },
  submenuText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: typography.headlineFont,
  },
});

