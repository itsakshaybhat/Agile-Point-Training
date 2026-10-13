import React from 'react';
import { parseCourseDescription } from '../utils/courseHelper';
import { BookOpen, User, Calendar, Edit3, Trash2, CheckCircle2, ArrowRight, Clock, Award, Tag } from 'lucide-react';

export const CourseCard = ({
  course,
  user,
  isEnrolled,
  onEnroll,
  onViewLessons,
  onEdit,
  onDelete,
}) => {
  const meta = parseCourseDescription(course.description);

  const isOwnerOrAdmin =
    user && (user.role === 'admin' || (user.role === 'instructor' && user.id === course.instructorId));

  const formattedDate = course.createdAt
    ? new Date(course.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <div className="glass-panel glass-panel-hover animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      {/* Category & Status Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '6px',
              background: 'rgba(99, 102, 241, 0.15)',
              color: 'var(--primary)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Tag size={10} /> {meta.category}
          </span>

          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Award size={10} /> {meta.level}
          </span>
        </div>

        {isEnrolled && (
          <span className="badge badge-enrolled">
            <CheckCircle2 size={12} /> Enrolled
          </span>
        )}
      </div>

      {/* Course Title */}
      <h3
        style={{
          fontSize: '1.15rem',
          fontWeight: 700,
          color: 'var(--text-main)',
          marginBottom: '0.5rem',
          lineHeight: '1.4',
        }}
      >
        {course.title}
      </h3>

      {/* Duration & Instructor */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} /> {meta.duration}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <User size={12} /> Instructor #{course.instructorId}
        </span>
      </div>

      {/* Description Overview */}
      <p
        style={{
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
          marginBottom: '1.25rem',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.5',
        }}
      >
        {meta.overview}
      </p>

      {/* Date Footer */}
      {formattedDate && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            color: 'var(--text-dim)',
            marginBottom: '1.25rem',
          }}
        >
          <Calendar size={12} /> Created {formattedDate}
        </div>
      )}

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: 'auto',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        {/* Enroll Button */}
        {!isEnrolled && user?.role === 'student' && (
          <button
            onClick={() => onEnroll(course.id)}
            className="btn btn-primary btn-sm"
            style={{ flex: 1 }}
          >
            <span>Enroll Now</span>
            <ArrowRight size={14} />
          </button>
        )}

        {/* View Lessons / Curriculum Button */}
        <button
          onClick={() => onViewLessons(course)}
          className="btn btn-secondary btn-sm"
          style={{ flex: !isEnrolled && user?.role === 'student' ? 'unset' : 1 }}
        >
          <BookOpen size={14} />
          <span>Curriculum</span>
        </button>

        {/* Edit & Delete for Owners/Admins */}
        {isOwnerOrAdmin && (
          <>
            <button
              onClick={() => onEdit(course)}
              className="btn btn-secondary btn-sm"
              title="Edit Course"
              style={{ padding: '0.4rem 0.6rem' }}
            >
              <Edit3 size={14} />
            </button>

            <button
              onClick={() => onDelete(course.id)}
              className="btn btn-danger btn-sm"
              title="Delete Course"
              style={{ padding: '0.4rem 0.6rem' }}
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
