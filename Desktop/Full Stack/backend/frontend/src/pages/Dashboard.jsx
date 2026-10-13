import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { CourseCard } from '../components/CourseCard';
import { LessonModal } from '../components/LessonModal';
import { PaymentModal } from '../components/PaymentModal';
import { Modal } from '../components/Modal';
import { BookOpen, Award, Plus, Sparkles, UserCheck, Search, CheckCircle2 } from 'lucide-react';

export const Dashboard = ({ setActiveTab, showToast }) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Lesson Viewer Modal State
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Payment Enrollment Modal State
  const [enrollingCourse, setEnrollingCourse] = useState(null);

  // Create Course Modal State (For Instructor / Admin)
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  // Edit Course Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await api.getCourses({ limit: 50 });
      if (res.success && res.data?.data) {
        setCourses(res.data.data);
      }
    } catch (err) {
      showToast(err.message || 'Failed to fetch dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleOpenEnrollment = (courseId) => {
    const targetCourse = courses.find((c) => c.id === courseId);
    if (targetCourse) {
      setEnrollingCourse(targetCourse);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.createCourse(title, description);
      showToast('Course created successfully!', 'success');
      setCreateModalOpen(false);
      setTitle('');
      setDescription('');
      fetchDashboardData();
    } catch (err) {
      showToast(err.message || 'Failed to create course', 'error');
    } finally {
      setCreating(false);
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
      fetchDashboardData();
    } catch (err) {
      showToast(err.message || 'Failed to update course', 'error');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course? All associated lessons will be removed.')) return;
    try {
      await api.deleteCourse(courseId);
      showToast('Course deleted successfully', 'success');
      fetchDashboardData();
    } catch (err) {
      showToast(err.message || 'Failed to delete course', 'error');
    }
  };

  const myCourses =
    user?.role === 'instructor'
      ? courses.filter((c) => c.instructorId === user.id)
      : courses;

  const enrolledCoursesList = courses.filter((c) => enrolledIds.has(c.id));

  return (
    <div className="animate-fade-in">
      {/* Hero Welcome Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2.5rem 2rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(20, 184, 166, 0.1) 100%)',
          border: '1px solid var(--border-highlight)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className={`badge badge-${user?.role || 'student'}`}>{user?.role || 'student'} Portal</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>— Dashboard Overview</span>
          </div>

          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Welcome back, <span style={{ color: 'var(--primary)' }}>{user?.name || 'Learner'}</span> 👋
          </h2>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '600px' }}>
            {user?.role === 'instructor'
              ? 'Manage your created courses, build interactive lesson modules, and empower your students.'
              : 'Explore cutting-edge courses, track your curriculum progress, and build full-stack skills.'}
          </p>
        </div>

        {/* Quick Action Button */}
        <div>
          {user?.role === 'instructor' || user?.role === 'admin' ? (
            <button onClick={() => setCreateModalOpen(true)} className="btn btn-primary" style={{ padding: '0.85rem 1.4rem' }}>
              <Plus size={18} />
              <span>Create New Course</span>
            </button>
          ) : (
            <button onClick={() => setActiveTab('courses')} className="btn btn-primary" style={{ padding: '0.85rem 1.4rem' }}>
              <Search size={18} />
              <span>Browse Catalog</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid-stats">
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>{courses.length}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Platform Courses</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(20, 184, 166, 0.15)', color: 'var(--secondary)' }}>
            <Award size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
              {user?.role === 'instructor' ? myCourses.length : enrolledIds.size}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {user?.role === 'instructor' ? 'Courses Created' : 'Enrolled Courses'}
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent)' }}>
            <UserCheck size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', textTransform: 'capitalize' }}>
              {user?.role || 'student'} Session
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>JWT Secured</div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Section for Students */}
      {user?.role === 'student' && enrolledCoursesList.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
            <CheckCircle2 size={20} color="var(--success)" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff' }}>
              My Enrolled Courses ({enrolledCoursesList.length})
            </h3>
          </div>

          <div className="grid-cards">
            {enrolledCoursesList.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                user={user}
                isEnrolled={true}
                onEnroll={() => {}}
                onViewLessons={(c) => setSelectedCourse(c)}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteCourse}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Courses Catalog Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="var(--primary)" />
          {user?.role === 'instructor' ? 'My Created Courses' : 'Featured Learning Paths'}
        </h3>

        <button onClick={() => setActiveTab('courses')} className="btn btn-secondary btn-sm">
          View All Courses
        </button>
      </div>

      {/* Course Cards Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
          Loading courses catalog...
        </div>
      ) : myCourses.length === 0 ? (
        <div
          className="glass-panel"
          style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)' }}
        >
          <BookOpen size={40} color="var(--text-dim)" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.25rem' }}>No Courses Found</h4>
          <p style={{ fontSize: '0.9rem' }}>
            {user?.role === 'instructor'
              ? "You haven't created any courses yet. Click 'Create New Course' to get started!"
              : 'Explore the full catalog to find courses to enroll in.'}
          </p>
        </div>
      ) : (
        <div className="grid-cards">
          {myCourses.slice(0, 6).map((course) => (
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

      {/* Create Course Modal */}
      {createModalOpen && (
        <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Create New Course">
          <form onSubmit={handleCreateCourse}>
            <div className="form-group">
              <label className="form-label">Course Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Master Fastify & MySQL REST APIs"
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                placeholder="Describe what students will learn in this course..."
                className="input-field"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setCreateModalOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={creating} className="btn btn-primary">
                {creating ? 'Creating...' : 'Publish Course'}
              </button>
            </div>
          </form>
        </Modal>
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
