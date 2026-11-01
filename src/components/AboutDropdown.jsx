import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { 
  Info, 
  Users, 
  GraduationCap, 
  Briefcase, 
  ChevronRight, 
  PhoneCall, 
  Download 
} from 'lucide-react';
import { aboutCategories, aboutItems } from '../data/aboutData';
import { colors, typography } from '../theme/colors';

export default function AboutDropdown({ onSelectOption, onClose, onOpenInquiry }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;

  const getCategoryItems = (catId) => {
    return aboutItems.filter((item) => item.categoryId === catId);
  };

  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'general-info':
        return <Info size={16} color={colors.orange} />;
      case 'administrators':
        return <Users size={16} color={colors.green} />;
      case 'academic-depts':
        return <GraduationCap size={16} color={colors.orange} />;
      case 'non-academic-depts':
        return <Briefcase size={16} color={colors.green} />;
      default:
        return <Info size={16} color={colors.orange} />;
    }
  };

  return (
    <View style={styles.dropdownContainer}>
      <View style={styles.innerContent}>
        
        {/* 4-Column Mega Menu Grid */}
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {aboutCategories.map((category) => {
            const items = getCategoryItems(category.id);
            return (
              <View key={category.id} style={styles.column}>
                {/* Column Header */}
                <View style={styles.columnHeader}>
                  <View style={styles.headerIconBox}>
                    {getCategoryIcon(category.id)}
                  </View>
                  <Text style={styles.columnTitle}>
                    {category.title}
                  </Text>
                </View>

                {/* Items List */}
                <View style={styles.itemsList}>
                  {items.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.itemRow}
                      onPress={() => {
                        if (onSelectOption) {
                          onSelectOption(item.id);
                        }
                        if (onClose) {
                          onClose();
                        }
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={styles.itemBullet} />
                      <Text style={styles.itemText} numberOfLines={1}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        {/* Bottom Banner Ribbon */}
        <View style={styles.bottomRibbon}>
          <View style={styles.ribbonLeft}>
            <View style={styles.ribbonDot} />
            <Text style={styles.ribbonText}>
              Need official institutional information or admissions advice?
            </Text>
          </View>

          <View style={styles.ribbonActions}>
            <TouchableOpacity 
              style={styles.ribbonActionBtn}
              onPress={() => {
                if (onClose) onClose();
                if (onOpenInquiry) onOpenInquiry();
              }}
              activeOpacity={0.8}
            >
              <PhoneCall size={13} color={colors.greenDeep} />
              <Text style={styles.ribbonActionText}>Speak with Admissions Desk</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 3,
    borderBottomColor: colors.greenDeep,
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
    width: '100%',
    zIndex: 999,
  },
  innerContent: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 20,
  },
  gridMobile: {
    flexDirection: 'column',
    gap: 20,
  },
  column: {
    flex: 1,
    minWidth: 220,
  },
  columnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.borderLight,
    marginBottom: 12,
  },
  headerIconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.charcoal,
    letterSpacing: -0.2,
    fontFamily: typography.headlineFont,
  },
  itemsList: {
    gap: 7,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  },
  itemBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.orange,
  },
  itemText: {
    fontSize: 12.5,
    color: colors.charcoal,
    fontWeight: '500',
    fontFamily: typography.bodyFont,
    flex: 1,
  },
  bottomRibbon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    flexWrap: 'wrap',
    gap: 12,
  },
  ribbonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ribbonDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.green,
  },
  ribbonText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
  },
  ribbonActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ribbonActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.orangeLight,
    borderWidth: 1,
    borderColor: colors.orangeMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    cursor: 'pointer',
  },
  ribbonActionText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.charcoal,
    fontFamily: typography.labelFont,
  },
});

