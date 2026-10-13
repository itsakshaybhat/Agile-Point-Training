import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { CourseCard } from '../components/CourseCard';
import { LessonModal } from '../components/LessonModal';
import { PaymentModal } from '../components/PaymentModal';
import { Search, Filter, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Modal } from '../components/Modal';

export const CoursesPage = ({ showToast }) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 9, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);

  const [enrolledIds, setEnrolledIds] = useState(new Set());
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollingCourse, setEnrollingCourse] = useState(null);

  // Edit Modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.getCourses({
        page,
        limit: 9,
        sortBy,
        order,
      });
      if (res.success && res.data) {
        setCourses(res.data.data || []);
        if (res.data.meta) setMeta(res.data.meta);
      }
    } catch (err) {
      showToast(err.message || 'Failed to load courses', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page, sortBy, order]);

  const handleOpenEnrollment = (courseId) => {
    const targetCourse = courses.find((c) => c.id === courseId);
    if (targetCourse) {
      setEnrollingCourse(targetCourse);
    }
  };

  const handleOpenEdit = (course) => {
    setEditingCourseId(course.id);
    setTitle(course.title);
    setDescription(course.description || '');
    setEditModalOpen(true);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      await api.updateCourse(editingCourseId, title, description);
      showToast('Course updated successfully!', 'success');
      setEditModalOpen(false);
      fetchCourses();
    } catch (err) {
      showToast(err.message || 'Failed to update course', 'error');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await api.deleteCourse(courseId);
      showToast('Course deleted', 'success');
      fetchCourses();
    } catch (err) {
      showToast(err.message || 'Failed to delete course', 'error');
    }
  };

  // Filter client side search
  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>Explore Courses Catalog</h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          Discover expert-crafted full stack, database, and backend developer tracks.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '1rem 1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)',
            }}
          />
          <input
            type="text"
            placeholder="Search courses by title or keyword..."
            className="input-field"
            style={{ paddingLeft: '40px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sort Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Filter size={16} /> Sort by:
          </div>
          <select
            className="input-field"
            style={{ padding: '0.5rem 0.85rem', width: 'auto', fontSize: '0.875rem' }}
            value={`${sortBy}-${order}`}
            onChange={(e) => {
              const [s, o] = e.target.value.split('-');
              setSortBy(s);
              setOrder(o);
            }}
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          Loading courses...
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3.5rem 2rem', color: 'var(--text-muted)' }}>
          <BookOpen size={44} color="var(--text-dim)" style={{ marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.25rem' }}>No Courses Found</h3>
          <p style={{ fontSize: '0.9rem' }}>Try adjusting your search criteria or clear the search bar.</p>
        </div>
      ) : (
        <div className="grid-cards">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              user={user}
              isEnrolled={enrolledIds.has(course.id)}
              onEnroll={handleOpenEnrollment}
              onViewLessons={(c) => setSelectedCourse(c)}
              onEdit={handleOpenEdit}
              onDelete={handleDeleteCourse}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {meta.totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2.5rem',
          }}
        >
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="btn btn-secondary btn-sm"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Page {meta.page} of {meta.totalPages}
          </span>

          <button
            disabled={page >= meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="btn btn-secondary btn-sm"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Lesson Details Modal */}
      {selectedCourse && (
        <LessonModal
          course={selectedCourse}
          user={user}
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          showToast={showToast}
        />
      )}

      {/* Payment & Enrollment Modal */}
      {enrollingCourse && (
        <PaymentModal
          course={enrollingCourse}
          user={user}
          isOpen={!!enrollingCourse}
          onClose={() => setEnrollingCourse(null)}
          onEnrollSuccess={(id) => setEnrolledIds((prev) => new Set([...prev, id]))}
          showToast={showToast}
        />
      )}

      {/* Edit Course Modal */}
      {editModalOpen && (
        <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Course Details">
          <form onSubmit={handleUpdateCourse}>
            <div className="form-group">
              <label className="form-label">Course Title</label>
              <input
                type="text"
                required
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="input-field"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setEditModalOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
