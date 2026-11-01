import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { ChevronDown, ChevronUp, ArrowRight, Menu, X, User, ChevronRight } from 'lucide-react';
import CollegeLogo from './CollegeLogo';
import AboutDropdown from './AboutDropdown';
import ManagementDropdown from './ManagementDropdown';
import CoursesDropdown from './CoursesDropdown';
import { aboutCategories, aboutItems } from '../data/aboutData';
import { academicDepartments, allCatalogCourses } from '../data/coursesData';
import { colors, typography } from '../theme/colors';

export default function Navbar({ currentPage = 'home', onNavigate, onOpenInquiry, onSelectCourse }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Dropdown states for Desktop
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [managementDropdownOpen, setManagementDropdownOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  // Accordion states for Mobile
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const [mobileManagementExpanded, setMobileManagementExpanded] = useState(false);
  const [mobileDeputyExpanded, setMobileDeputyExpanded] = useState(false);
  const [mobileCoursesExpanded, setMobileCoursesExpanded] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us', hasDropdown: true },
    { id: 'management', label: 'Management', hasDropdown: true },
    { id: 'courses', label: 'Courses & Programmes', hasDropdown: true },
    { id: 'downloads', label: 'Downloads' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setManagementDropdownOpen(false);
    setCoursesDropdownOpen(false);
    if (id === 'management') {
      if (onNavigate) {
        onNavigate('about', 'board-of-governors');
      }
    } else if (onNavigate) {
      onNavigate(id);
    }
  };

  const handleSelectAboutOption = (optionId) => {
    setAboutDropdownOpen(false);
    setManagementDropdownOpen(false);
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
        setManagementDropdownOpen(false);
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
          >
            <CollegeLogo />
          </TouchableOpacity>

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <View style={styles.linksContainer}>
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                const isAbout = item.id === 'about';
                const isManagement = item.id === 'management';
                const isCourses = item.id === 'courses';
                const isDropdownOpen = 
                  (isAbout && aboutDropdownOpen) || 
                  (isManagement && managementDropdownOpen) || 
                  (isCourses && coursesDropdownOpen);

                return (
                  <View 
                    key={item.id} 
                    style={styles.navItemWrapper}
                    // @ts-ignore
                    onMouseEnter={() => {
                      if (isAbout) {
                        setAboutDropdownOpen(true);
                        setManagementDropdownOpen(false);
                        setCoursesDropdownOpen(false);
                      } else if (isManagement) {
                        setManagementDropdownOpen(true);
                        setAboutDropdownOpen(false);
                        setCoursesDropdownOpen(false);
                      } else if (isCourses) {
                        setCoursesDropdownOpen(true);
                        setAboutDropdownOpen(false);
                        setManagementDropdownOpen(false);
                      } else {
                        setAboutDropdownOpen(false);
                        setManagementDropdownOpen(false);
                        setCoursesDropdownOpen(false);
                      }
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (isAbout) {
                          setAboutDropdownOpen(!aboutDropdownOpen);
                          setManagementDropdownOpen(false);
                          setCoursesDropdownOpen(false);
                          handleNavClick('about');
                        } else if (isManagement) {
                          setManagementDropdownOpen(!managementDropdownOpen);
                          setAboutDropdownOpen(false);
                          setCoursesDropdownOpen(false);
                        } else if (isCourses) {
                          setCoursesDropdownOpen(!coursesDropdownOpen);
                          setAboutDropdownOpen(false);
                          setManagementDropdownOpen(false);
                        } else {
                          handleNavClick(item.id);
                        }
                      }}
                      style={[
                        styles.navLink, 
                        isActive && styles.navLinkActive,
                        isDropdownOpen && styles.navLinkHover,
                        ((isManagement && managementDropdownOpen) || (isCourses && coursesDropdownOpen)) && styles.navLinkManagementOpen
                      ]}
                      activeOpacity={0.7}
                    >
                      <Text style={[
                        styles.navText, 
                        (isActive || isDropdownOpen) && styles.navTextActive,
                        ((isManagement && managementDropdownOpen) || (isCourses && coursesDropdownOpen)) && styles.navTextHighlight
                      ]}>
                        {item.label}
                      </Text>
                      {item.hasDropdown && (
                        <ChevronDown 
                          size={14} 
                          color={
                            ((isManagement && managementDropdownOpen) || (isCourses && coursesDropdownOpen))
                              ? colors.orange 
                              : ((isActive || isDropdownOpen) ? colors.white : colors.textMuted)
                          } 
                        />
                      )}
                    </TouchableOpacity>

                    {/* Anchored Dropdown for About Us */}
                    {isAbout && aboutDropdownOpen && (
                      <AboutDropdown 
                        onSelectOption={handleSelectAboutOption}
                        onClose={() => setAboutDropdownOpen(false)}
                      />
                    )}

                    {/* Anchored Dropdown for Management (Mirroring Sample) */}
                    {isManagement && managementDropdownOpen && (
                      <ManagementDropdown 
                        onSelectOption={handleSelectAboutOption}
                        onClose={() => setManagementDropdownOpen(false)}
                      />
                    )}

                    {/* Anchored Dropdown for Courses & Programmes (Mirroring Sample) */}
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
                >
                  <Text style={styles.ctaText}>Apply / Enquire Now</Text>
                  <ArrowRight size={15} color={colors.white} />
                </TouchableOpacity>

                {/* Profile Avatar Icon */}
                <TouchableOpacity 
                  style={styles.userAvatarBtn}
                  onPress={() => alert('LNTVC Trainee & Staff Portal')}
                  activeOpacity={0.8}
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
              const isManagement = item.id === 'management';
              const isCourses = item.id === 'courses';
              const isExpanded = 
                (isAbout && mobileAboutExpanded) || 
                (isManagement && mobileManagementExpanded) || 
                (isCourses && mobileCoursesExpanded);

              return (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => {
                      if (isAbout) {
                        setMobileAboutExpanded(!mobileAboutExpanded);
                        setMobileManagementExpanded(false);
                        setMobileCoursesExpanded(false);
                      } else if (isManagement) {
                        setMobileManagementExpanded(!mobileManagementExpanded);
                        setMobileAboutExpanded(false);
                        setMobileCoursesExpanded(false);
                      } else if (isCourses) {
                        setMobileCoursesExpanded(!mobileCoursesExpanded);
                        setMobileAboutExpanded(false);
                        setMobileManagementExpanded(false);
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

                  {/* Mobile About Accordion */}
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
                        onPress={() => handleSelectAboutOption('service-charter')}
                      >
                        <View style={styles.mobileOptDot} />
                        <Text style={styles.mobileOptText}>Citizens Service Charter</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.mobileOptRow}
                        onPress={() => handleSelectAboutOption('brochures')}
                      >
                        <View style={styles.mobileOptDot} />
                        <Text style={styles.mobileOptText}>LNTVC Brochures</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.mobileOptRow}
                        onPress={() => handleSelectAboutOption('gallery')}
                      >
                        <View style={styles.mobileOptDot} />
                        <Text style={styles.mobileOptText}>Campus Life & Gallery</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.mobileOptRow}
                        onPress={() => handleSelectAboutOption('complaints-feedback')}
                      >
                        <View style={styles.mobileOptDot} />
                        <Text style={styles.mobileOptText}>Complaints & Feedback</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Mobile Management Accordion (Mirroring Sample) */}
                  {isManagement && mobileManagementExpanded && (
                    <View style={styles.mobileAccordionBox}>
                      {/* 1. Board of Governors */}
                      <TouchableOpacity
                        style={styles.mobileOptRow}
                        onPress={() => handleSelectAboutOption('board-of-governors')}
                      >
                        <View style={[styles.mobileOptDot, { backgroundColor: colors.orange }]} />
                        <Text style={styles.mobileOptText}>Board of Governors</Text>
                      </TouchableOpacity>

                      {/* 2. Principal */}
                      <TouchableOpacity
                        style={styles.mobileOptRow}
                        onPress={() => handleSelectAboutOption('office-of-principal')}
                      >
                        <View style={[styles.mobileOptDot, { backgroundColor: colors.orange }]} />
                        <Text style={styles.mobileOptText}>Principal</Text>
                      </TouchableOpacity>

                      {/* 3. Deputy Principals (Expandable) */}
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

                      {/* 4. Office of The Registrar */}
                      <TouchableOpacity
                        style={styles.mobileOptRow}
                        onPress={() => handleSelectAboutOption('office-of-registrar')}
                      >
                        <View style={[styles.mobileOptDot, { backgroundColor: colors.orange }]} />
                        <Text style={styles.mobileOptText}>Office of The Registrar</Text>
                      </TouchableOpacity>

                      {/* 5. Dean of students */}
                      <TouchableOpacity
                        style={styles.mobileOptRow}
                        onPress={() => handleSelectAboutOption('office-of-dean-of-trainees')}
                      >
                        <View style={[styles.mobileOptDot, { backgroundColor: colors.orange }]} />
                        <Text style={styles.mobileOptText}>Dean of students</Text>
                      </TouchableOpacity>
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
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
    cursor: 'pointer',
  },
  navLinkActive: {
    backgroundColor: colors.greenDeep,
  },
  navLinkHover: {
    backgroundColor: colors.greenDeep,
  },
  navLinkManagementOpen: {
    backgroundColor: colors.greenDeep,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  navText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: typography.bodyFont,
  },
  navTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  navTextHighlight: {
    color: colors.orange,
    fontWeight: '800',
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
    borderRadius: 7,
    boxShadow: '0 3px 8px rgba(245, 158, 11, 0.25)',
    elevation: 3,
    cursor: 'pointer',
  },
  ctaText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: colors.white,
    fontFamily: typography.headlineFont,
  },
  userAvatarBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  menuToggle: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.surfaceMuted,
  },
  desktopDropdownAbsolute: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    zIndex: 9999,
  },
  mobileDropdown: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 20,
    paddingVertical: 12,
    maxHeight: 520,
    overflowY: 'auto',
  },
  mobileNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    cursor: 'pointer',
  },
  mobileNavItemActive: {
    backgroundColor: colors.greenLight,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  mobileNavText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: typography.bodyFont,
  },
  mobileNavTextActive: {
    color: colors.textGreen,
    fontWeight: '700',
  },
  mobileAccordionBox: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mobileAllBtn: {
    backgroundColor: colors.greenDeep,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 12,
    alignItems: 'center',
  },
  mobileAllBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
    fontFamily: typography.labelFont,
  },
  mobileCatBlock: {
    marginBottom: 12,
  },
  mobileCatTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 6,
    fontFamily: typography.headlineFont,
  },
  mobileCatItems: {
    gap: 6,
    paddingLeft: 6,
  },
  mobileOptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  mobileOptDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.orange,
  },
  mobileOptText: {
    fontSize: 12.5,
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
  },
  mobileDeputyRow: {
    justifyContent: 'space-between',
    paddingRight: 6,
  },
  mobileSubIndent: {
    paddingLeft: 20,
    paddingVertical: 4,
    gap: 4,
  },
  mobileSubRow: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  mobileSubText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: typography.bodyFont,
  },
  mobileCta: {
    backgroundColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    cursor: 'pointer',
  },
  mobileCtaText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.white,
    fontFamily: typography.headlineFont,
  },
});
