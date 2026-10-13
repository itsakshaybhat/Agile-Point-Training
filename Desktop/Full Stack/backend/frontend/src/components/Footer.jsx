import React from 'react';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-primary)',
        padding: '2rem 1.5rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
        }}
      >
        <p>© 2026 EduConnect Platform. Powered by Fastify, MySQL & React.</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Crafted with <Heart size={14} className="text-rose-500" fill="currentColor" color="#ef4444" /> for full stack mastery.
        </p>
      </div>
    </footer>
  );
};
