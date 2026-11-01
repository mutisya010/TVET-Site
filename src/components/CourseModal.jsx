import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, useWindowDimensions } from 'react-native';
import { X, CheckCircle2, Clock, Award, BookOpen, ArrowRight, ShieldCheck, Briefcase } from 'lucide-react';

export default function CourseModal({ visible, course, onClose, onApplyCourse }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (!course) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalCard, isMobile && styles.modalCardMobile]}>
          
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerTitleArea}>
              <View style={styles.badgeRow}>
                <View style={styles.badgePill}>
                  <Text style={styles.badgeText}>{course.knqfLevel || course.badge}</Text>
                </View>
                <Text style={styles.deptText}>{course.deptLabel || course.dept}</Text>
              </View>
              <Text style={styles.modalTitle}>{course.title}</Text>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Modal Scrollable Body */}
          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* Quick Specs */}
            <View style={styles.quickSpecsRow}>
              <View style={styles.specBox}>
                <Award size={16} color="#2E8B57" />
                <Text style={styles.specLabel}>Certification</Text>
                <Text style={styles.specVal}>{course.examBoardDetail || course.examBoard}</Text>
              </View>
              <View style={styles.specBox}>
                <Clock size={16} color="#FFA500" />
                <Text style={styles.specLabel}>Intake Cycles</Text>
                <Text style={styles.specVal}>{course.intakes ? course.intakes.join(', ') : 'Jan, May, Sept'}</Text>
              </View>
              <View style={styles.specBox}>
                <BookOpen size={16} color="#166534" />
                <Text style={styles.specLabel}>KNQF Framework</Text>
                <Text style={styles.specVal}>{course.knqfLevel || course.level}</Text>
              </View>
            </View>

            {/* Entry Requirement */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionHeading}>Minimum Entry Criteria</Text>
              <View style={styles.criteriaBox}>
                <ShieldCheck size={18} color="#2E8B57" />
                <Text style={styles.criteriaText}>{course.minRequirement}</Text>
              </View>
            </View>

            {/* Overview */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionHeading}>Programme Overview</Text>
              <Text style={styles.overviewText}>{course.overview || course.description}</Text>
            </View>

            {/* Key Curriculum Modules */}
            {course.modules && (
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionHeading}>Key Curriculum & Workshop Modules</Text>
                <View style={styles.modulesGrid}>
                  {course.modules.map((m, idx) => (
                    <View key={idx} style={styles.moduleItem}>
                      <CheckCircle2 size={15} color="#FFA500" />
                      <Text style={styles.moduleText}>{m}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Career Opportunities */}
            {course.careerOpportunities && (
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionHeading}>Career & Industrial Employment</Text>
                <View style={styles.careersGrid}>
                  {course.careerOpportunities.map((career, cIdx) => (
                    <View key={cIdx} style={styles.careerItem}>
                      <Briefcase size={14} color="#FFA500" />
                      <Text style={styles.careerText}>{career}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>

          {/* Modal Footer Actions */}
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.applyActionBtn}
              onPress={() => {
                onClose();
                onApplyCourse(course);
              }}
            >
              <Text style={styles.applyActionText}>Apply for this Programme</Text>
              <ArrowRight size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    width: '100%',
    maxWidth: 680,
    maxHeight: '90%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalCardMobile: {
    maxWidth: '100%',
    maxHeight: '95%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitleArea: {
    flex: 1,
    paddingRight: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  badgePill: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  deptText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  closeBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  modalBody: {
    padding: 22,
    flexGrow: 1,
  },
  quickSpecsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  specBox: {
    flex: 1,
    minWidth: 160,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
  },
  specLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  specVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  sectionBlock: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  criteriaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    padding: 12,
    borderRadius: 8,
  },
  criteriaText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#166534',
    flex: 1,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  overviewText: {
    fontSize: 13.5,
    lineHeight: 21,
    color: '#334155',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  modulesGrid: {
    gap: 8,
  },
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  moduleText: {
    fontSize: 12.5,
    color: '#0F172A',
    fontWeight: '500',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  careersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  careerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  careerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  modalFooter: {
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 7,
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  applyActionBtn: {
    backgroundColor: '#14462E',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 7,
    shadowColor: '#14462E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  applyActionText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: "'Space Grotesk', sans-serif",
  },
});
