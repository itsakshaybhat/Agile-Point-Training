import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 size={18} className="text-emerald-400" />,
    error: <AlertCircle size={18} className="text-rose-400" />,
    info: <Info size={18} className="text-indigo-400" />,
  };

  const bgStyles = {
    success: 'rgba(16, 185, 129, 0.15)',
    error: 'rgba(239, 68, 68, 0.15)',
    info: 'rgba(99, 102, 241, 0.15)',
  };

  const borderStyles = {
    success: 'rgba(16, 185, 129, 0.3)',
    error: 'rgba(239, 68, 68, 0.3)',
    info: 'rgba(99, 102, 241, 0.3)',
  };

  return (
    <div
      className="animate-slide-up"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 18px',
        borderRadius: '10px',
        background: bgStyles[type] || bgStyles.info,
        border: `1px solid ${borderStyles[type] || borderStyles.info}`,
        backdropFilter: 'blur(12px)',
        color: '#ffffff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        maxWidth: '380px',
      }}
    >
      {icons[type]}
      <span style={{ fontSize: '0.9rem', fontWeight: 500, flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
};
