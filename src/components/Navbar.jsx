import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { ChevronDown, ChevronUp, ArrowRight, Menu, X, User } from 'lucide-react';
import CollegeLogo from './CollegeLogo';
import AboutDropdown from './AboutDropdown';
import CoursesDropdown from './CoursesDropdown';
import { academicDepartments, allCatalogCourses } from '../data/coursesData';
import { colors, typography } from '../theme/colors';

export default function Navbar({ currentPage = 'home', onNavigate, onOpenInquiry, onSelectCourse }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Dropdown states for Desktop
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  // Accordion states for Mobile
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const [mobileDeputyExpanded, setMobileDeputyExpanded] = useState(false);
  const [mobileCoursesExpanded, setMobileCoursesExpanded] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us', hasDropdown: true },
    { id: 'courses', label: 'Courses & Programmes', hasDropdown: true },
    { id: 'downloads', label: 'Downloads' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setCoursesDropdownOpen(false);
    if (onNavigate) {
      onNavigate(id);
    }
  };

  const handleSelectAboutOption = (optionId) => {
    setAboutDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate('about', optionId);
    }
  };

  const handleSelectCourseItem = (course) => {
    setCoursesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectCourse) {
      onSelectCourse(course);
    }
  };

  return (
    <View 
      style={styles.navWrapper}
      // @ts-ignore
      onMouseLeave={() => {
        setAboutDropdownOpen(false);
        setCoursesDropdownOpen(false);
      }}
    >
      <View style={styles.container}>
        <View style={styles.inner}>
          
          {/* Logo on Left */}
          <TouchableOpacity 
            onPress={() => handleNavClick('home')} 
            activeOpacity={0.8}
            style={styles.logoTouch}
            className="tvet-clickable"
            dataSet={{ class: 'tvet-clickable' }}
          >
            <CollegeLogo />
          </TouchableOpacity>

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <View style={styles.linksContainer}>
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                const isAbout = item.id === 'about';
                const isCourses = item.id === 'courses';
                const isDropdownOpen = 
                  (isAbout && aboutDropdownOpen) || 
                  (isCourses && coursesDropdownOpen);

                return (
                  <View 
                    key={item.id} 
                    style={styles.navItemWrapper}
                    // @ts-ignore
                    onMouseEnter={() => {
                      if (isAbout) {
                        setAboutDropdownOpen(true);
                        setCoursesDropdownOpen(false);
                      } else if (isCourses) {
                        setCoursesDropdownOpen(true);
                        setAboutDropdownOpen(false);
                      } else {
                        setAboutDropdownOpen(false);
                        setCoursesDropdownOpen(false);
                      }
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (isAbout) {
                          setAboutDropdownOpen(!aboutDropdownOpen);
                          setCoursesDropdownOpen(false);
                          handleNavClick('about');
                        } else if (isCourses) {
                          setCoursesDropdownOpen(!coursesDropdownOpen);
                          setAboutDropdownOpen(false);
                        } else {
                          handleNavClick(item.id);
                        }
                      }}
                      style={[
                        styles.navLink, 
                        isActive && styles.navLinkActive,
                        isDropdownOpen && styles.navLinkHover,
                        (isCourses && coursesDropdownOpen) && styles.navLinkManagementOpen
                      ]}
                      activeOpacity={0.7}
                      className="tvet-nav-link"
                      // @ts-ignore
                      data-active={isActive ? "true" : "false"}
                      dataSet={{ class: 'tvet-nav-link', active: isActive ? 'true' : 'false' }}
                    >
                      <Text 
                        style={[
                          styles.navText, 
                          (isActive || isDropdownOpen) && styles.navTextActive,
                          (isCourses && coursesDropdownOpen) && styles.navTextHighlight
                        ]}
                        // @ts-ignore
                        data-nav-text="true"
                        dataSet={{ navText: 'true' }}
                      >
                        {item.label}
                      </Text>
                      {item.hasDropdown && (
                        <ChevronDown 
                          size={14} 
                          color={
                            (isCourses && coursesDropdownOpen)
                              ? colors.orange 
                              : ((isActive || isDropdownOpen) ? colors.white : colors.textMuted)
                          } 
                        />
                      )}
                    </TouchableOpacity>

                    {/* Anchored Dropdown for About Us (Combined with Management) */}
                    {isAbout && aboutDropdownOpen && (
                      <AboutDropdown 
                        onSelectOption={handleSelectAboutOption}
                        onClose={() => setAboutDropdownOpen(false)}
                      />
                    )}

                    {/* Anchored Dropdown for Courses & Programmes */}
                    {isCourses && coursesDropdownOpen && (
                      <CoursesDropdown 
                        onSelectCourse={handleSelectCourseItem}
                        onClose={() => setCoursesDropdownOpen(false)}
                        onViewAllCourses={() => {
                          setCoursesDropdownOpen(false);
                          handleNavClick('courses');
                        }}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          )}

          {/* Right Action CTA Button & Profile Avatar */}
          <View style={styles.rightActions}>
            {!isMobile ? (
              <View style={styles.actionGroup}>
                <TouchableOpacity
                  style={styles.ctaButton}
                  onPress={onOpenInquiry}
                  activeOpacity={0.85}
                  className="tvet-btn-primary"
                  dataSet={{ class: 'tvet-btn-primary' }}
                >
                  <Text style={styles.ctaText}>Apply / Enquire Now</Text>
                  <ArrowRight size={15} color={colors.white} />
                </TouchableOpacity>

                {/* Profile Avatar Icon */}
                <TouchableOpacity 
                  style={styles.userAvatarBtn}
                  onPress={() => alert('Loima TVC Trainee & Staff Portal')}
                  activeOpacity={0.8}
                  className="tvet-avatar-btn"
                  dataSet={{ class: 'tvet-avatar-btn' }}
                >
                  <User size={16} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.menuToggle}
                onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
                activeOpacity={0.7}
              >
                {mobileMenuOpen ? (
                  <X size={24} color={colors.textPrimary} />
                ) : (
                  <Menu size={24} color={colors.textPrimary} />
                )}
              </TouchableOpacity>
            )}
          </View>

        </View>

        {/* ========================================================================= */}
        {/* MOBILE MENU DRAWER */}
        {/* ========================================================================= */}
        {isMobile && mobileMenuOpen && (
          <View style={styles.mobileDropdown}>
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const isAbout = item.id === 'about';
              const isCourses = item.id === 'courses';
              const isExpanded = 
                (isAbout && mobileAboutExpanded) || 
                (isCourses && mobileCoursesExpanded);

              return (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => {
                      if (isAbout) {
                        setMobileAboutExpanded(!mobileAboutExpanded);
                        setMobileCoursesExpanded(false);
                      } else if (isCourses) {
                        setMobileCoursesExpanded(!mobileCoursesExpanded);
                        setMobileAboutExpanded(false);
                      } else {
                        handleNavClick(item.id);
                      }
                    }}
                    style={[styles.mobileNavItem, isActive && styles.mobileNavItemActive]}
                  >
                    <Text style={[styles.mobileNavText, isActive && styles.mobileNavTextActive]}>
                      {item.label}
                    </Text>
                    {item.hasDropdown && (
                      isExpanded ? (
                        <ChevronUp size={15} color={isActive ? colors.textGreen : colors.textMuted} />
                      ) : (
                        <ChevronDown size={15} color={isActive ? colors.textGreen : colors.textMuted} />
                      )
                    )}
                  </TouchableOpacity>

                  {/* Mobile About Accordion with Leadership */}
                  {isAbout && mobileAboutExpanded && (
                    <View style={styles.mobileAccordionBox}>
                      <TouchableOpacity 
                        style={styles.mobileAllBtn}
                        onPress={() => handleNavClick('about')}
                      >
                        <Text style={styles.mobileAllBtnText}>View All About Us Sections →</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.mobileOptRow}
                        onPress={() => handleSelectAboutOption('our-history')}
                      >
                        <View style={styles.mobileOptDot} />
                        <Text style={styles.mobileOptText}>Our History & Heritage</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.mobileOptRow}
                        onPress={() => handleSelectAboutOption('gallery')}
                      >
                        <View style={styles.mobileOptDot} />
                        <Text style={styles.mobileOptText}>Campus Life & Gallery</Text>
                      </TouchableOpacity>

                      {/* Leadership Section */}
                      <View style={{ marginTop: 8, marginBottom: 4, paddingHorizontal: 12 }}>
                        <Text style={{ fontSize: 10, fontWeight: '800', color: colors.orange, letterSpacing: 0.8 }}>
                          INSTITUTIONAL LEADERSHIP
                        </Text>
                      </View>

                      {/* Principal */}
                      <TouchableOpacity
                        style={styles.mobileOptRow}
                        onPress={() => handleSelectAboutOption('office-of-principal')}
                      >
                        <View style={[styles.mobileOptDot, { backgroundColor: colors.orange }]} />
                        <Text style={styles.mobileOptText}>Principal</Text>
                      </TouchableOpacity>

                      {/* Deputy Principals (Expandable) */}
                      <TouchableOpacity
                        style={[styles.mobileOptRow, styles.mobileDeputyRow]}
                        onPress={() => setMobileDeputyExpanded(!mobileDeputyExpanded)}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                          <View style={[styles.mobileOptDot, { backgroundColor: colors.orange }]} />
                          <Text style={[styles.mobileOptText, { fontWeight: '700' }]}>Deputy Principals</Text>
                        </View>
                        {mobileDeputyExpanded ? (
                          <ChevronUp size={14} color={colors.orange} />
                        ) : (
                          <ChevronDown size={14} color={colors.textMuted} />
                        )}
                      </TouchableOpacity>

                      {mobileDeputyExpanded && (
                        <View style={styles.mobileSubIndent}>
                          <TouchableOpacity
                            style={styles.mobileSubRow}
                            onPress={() => handleSelectAboutOption('deputy-principal-admin')}
                          >
                            <Text style={styles.mobileSubText}>• Deputy Principal (Administration)</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.mobileSubRow}
                            onPress={() => handleSelectAboutOption('deputy-principal-academics')}
                          >
                            <Text style={styles.mobileSubText}>• Deputy Principal (Academics)</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}

                  {/* Mobile Courses Accordion grouped by Department */}
                  {isCourses && mobileCoursesExpanded && (
                    <View style={styles.mobileAccordionBox}>
                      <TouchableOpacity 
                        style={styles.mobileAllBtn}
                        onPress={() => handleNavClick('courses')}
                      >
                        <Text style={styles.mobileAllBtnText}>View Complete Course Directory →</Text>
                      </TouchableOpacity>

                      {academicDepartments.map((dept) => {
                        const deptCourses = allCatalogCourses.filter((c) => dept.courseIds.includes(c.id));
                        return (
                          <View key={dept.id} style={styles.mobileCatBlock}>
                            <Text style={styles.mobileCatTitle}>{dept.title.toUpperCase()}</Text>
                            <View style={styles.mobileCatItems}>
                              {deptCourses.map((c) => (
                                <TouchableOpacity
                                  key={c.id}
                                  style={styles.mobileOptRow}
                                  onPress={() => handleSelectCourseItem(c)}
                                >
                                  <View style={[styles.mobileOptDot, { backgroundColor: colors.orange }]} />
                                  <Text style={styles.mobileOptText}>{c.title}</Text>
                                </TouchableOpacity>
                              ))}
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  )}

                </View>
              );
            })}

            <TouchableOpacity
              style={styles.mobileCta}
              onPress={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
            >
              <Text style={styles.mobileCtaText}>Apply / Enquire Now</Text>
              <ArrowRight size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navWrapper: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    position: 'sticky',
    top: 0,
    zIndex: 9999,
    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)',
    elevation: 3,
  },
  container: {
    width: '100%',
    position: 'relative',
  },
  inner: {
    maxWidth: 1260,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoTouch: {
    flexShrink: 0,
  },
  linksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  navItemWrapper: {
    position: 'relative',
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  navLinkActive: {
    backgroundColor: colors.greenDeep,
  },
  navLinkHover: {
    backgroundColor: colors.greenDeep,
  },
  navLinkManagementOpen: {
    backgroundColor: colors.greenDeep,
  },
  navText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: typography.headlineFont,
  },
  navTextActive: {
    color: colors.white,
  },
  navTextHighlight: {
    color: colors.white,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ctaButton: {
    backgroundColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 6,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(245, 158, 11, 0.3)',
    elevation: 2,
  },
  ctaText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
    fontFamily: typography.headlineFont,
  },
  userAvatarBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  menuToggle: {
    padding: 6,
    cursor: 'pointer',
  },
  mobileDropdown: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    boxShadow: '0 8px 16px rgba(15, 23, 42, 0.08)',
  },
  mobileNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  mobileNavItemActive: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  mobileNavText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: typography.headlineFont,
  },
  mobileNavTextActive: {
    color: colors.greenDeep,
    fontWeight: '800',
  },
  mobileAccordionBox: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  mobileAllBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: 8,
  },
  mobileAllBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.greenDeep,
    fontFamily: typography.headlineFont,
  },
  mobileOptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  mobileOptDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.greenDeep,
  },
  mobileOptText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: typography.bodyFont,
  },
  mobileDeputyRow: {
    justifyContent: 'space-between',
  },
  mobileSubIndent: {
    paddingLeft: 18,
    paddingVertical: 4,
    gap: 4,
  },
  mobileSubRow: {
    paddingVertical: 6,
  },
  mobileSubText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.charcoalLight,
    fontFamily: typography.bodyFont,
  },
  mobileCatBlock: {
    marginBottom: 10,
  },
  mobileCatTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: 4,
    paddingHorizontal: 6,
    fontFamily: typography.labelFont,
  },
  mobileCatItems: {
    gap: 2,
  },
  mobileCta: {
    backgroundColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 12,
  },
  mobileCtaText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: typography.headlineFont,
  },
});
