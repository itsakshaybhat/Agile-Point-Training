import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { api } from '../api/client';
import { parseCourseDescription } from '../utils/courseHelper';
import { Plus, Edit, Trash, BookOpen, ChevronDown, ChevronUp, FileText, CheckCircle2, Clock, Tag, Award, HelpCircle } from 'lucide-react';

export const LessonModal = ({ course, user, isOpen, onClose, showToast }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedLessonId, setExpandedLessonId] = useState(null);

  // Lesson Form Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [lessonOrder, setLessonOrder] = useState(1);
  const [formOpen, setFormOpen] = useState(false);

  const meta = course ? parseCourseDescription(course.description) : null;

  const isOwnerOrAdmin =
    user && (user.role === 'admin' || (user.role === 'instructor' && user.id === course?.instructorId));

  const fetchLessons = async () => {
    if (!course) return;
    setLoading(true);
    try {
      const res = await api.getLessons(course.id);
      if (res.success && Array.isArray(res.data)) {
        const sorted = res.data.sort((a, b) => a.lesson_order - b.lesson_order);
        setLessons(sorted);
        if (sorted.length > 0 && !expandedLessonId) {
          setExpandedLessonId(sorted[0].id); // Auto expand first module
        }
      }
    } catch (err) {
      showToast(err.message || 'Failed to load lessons', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && course) {
      fetchLessons();
    }
  }, [isOpen, course]);

  const openCreateForm = () => {
    setIsEditing(false);
    setEditingLessonId(null);
    setTitle('');
    setContent('');
    setLessonOrder(lessons.length + 1);
    setFormOpen(true);
  };

  const openEditForm = (lesson) => {
    setIsEditing(true);
    setEditingLessonId(lesson.id);
    setTitle(lesson.title);
    setContent(lesson.content || '');
    setLessonOrder(lesson.lesson_order);
    setFormOpen(true);
  };

  const handleSaveLesson = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.updateLesson(editingLessonId, title, content, parseInt(lessonOrder, 10));
        showToast('Lesson updated successfully!', 'success');
      } else {
        await api.createLesson(course.id, title, content, parseInt(lessonOrder, 10));
        showToast('New lesson created!', 'success');
      }
      setFormOpen(false);
      fetchLessons();
    } catch (err) {
      showToast(err.message || 'Failed to save lesson', 'error');
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm('Are you sure you want to delete this lesson module?')) return;
    try {
      await api.deleteLesson(lessonId);
      showToast('Lesson module deleted!', 'success');
      fetchLessons();
    } catch (err) {
      showToast(err.message || 'Failed to delete lesson', 'error');
    }
  };

  if (!course) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Curriculum: ${course.title}`} maxWidth="780px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Rich Course Summary Box */}
        {meta && (
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-student" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Tag size={10} /> {meta.category}
              </span>
              <span className="badge badge-instructor" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={10} /> {meta.level}
              </span>
              <span className="badge badge-admin" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={10} /> {meta.duration}
              </span>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '0.85rem', lineHeight: '1.6' }}>
              {meta.overview}
            </p>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.85rem' }}>
              <HelpCircle size={14} color="var(--primary)" />
              <span><strong>Prerequisites:</strong> {meta.prerequisites}</span>
            </div>

            {meta.outcomes.length > 0 && (
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
                  🎯 Learning Outcomes:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.4rem' }}>
                  {meta.outcomes.map((outcome, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      <CheckCircle2 size={13} color="var(--success)" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modules Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={18} color="var(--primary)" />
            Course Modules & Lessons ({lessons.length})
          </h4>

          {isOwnerOrAdmin && (
            <button onClick={openCreateForm} className="btn btn-primary btn-sm">
              <Plus size={14} />
              <span>Add Module</span>
            </button>
          )}
        </div>

        {/* Lessons List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
            Loading course modules...
          </div>
        ) : lessons.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <BookOpen size={36} color="var(--text-dim)" style={{ marginBottom: '0.5rem' }} />
            <p style={{ color: 'var(--text-muted)' }}>No lesson modules found in this course curriculum.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {lessons.map((lesson) => {
              const isExpanded = expandedLessonId === lesson.id;
              return (
                <div
                  key={lesson.id}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.9rem 1.2rem',
                      cursor: 'pointer',
                      background: isExpanded ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--primary)',
                        }}
                      >
                        {lesson.lesson_order}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        {lesson.title}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {isOwnerOrAdmin && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditForm(lesson);
                            }}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '4px 8px' }}
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteLesson(lesson.id);
                            }}
                            className="btn btn-danger btn-sm"
                            style={{ padding: '4px 8px' }}
                          >
                            <Trash size={13} />
                          </button>
                        </>
                      )}
                      {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div
                      className="animate-fade-in"
                      style={{
                        padding: '1.25rem',
                        borderTop: '1px solid var(--border-color)',
                        background: 'rgba(15, 23, 42, 0.7)',
                        color: 'var(--text-main)',
                        fontSize: '0.92rem',
                        lineHeight: '1.7',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
                        <FileText size={16} /> Module Material:
                      </div>
                      <p style={{ whiteSpace: 'pre-wrap' }}>
                        {lesson.content || 'Detailed text material and exercises for this module.'}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Lesson Modal */}
      {formOpen && (
        <Modal
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          title={isEditing ? 'Edit Module' : 'Add New Module'}
          maxWidth="520px"
        >
          <form onSubmit={handleSaveLesson}>
            <div className="form-group">
              <label className="form-label">Module Order (1, 2, 3...)</label>
              <input
                type="number"
                min="1"
                required
                className="input-field"
                value={lessonOrder}
                onChange={(e) => setLessonOrder(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Module Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Module 1: Introduction to Concepts"
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Module Content & Notes</label>
              <textarea
                placeholder="Write lesson topics, code examples, or notes..."
                className="input-field"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setFormOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isEditing ? 'Save Changes' : 'Create Module'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </Modal>
  );
};
