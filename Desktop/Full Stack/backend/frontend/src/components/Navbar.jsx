import React from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, LayoutDashboard, BookOpen, User, LogOut } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'courses', label: 'Courses Catalog', icon: <BookOpen size={18} /> },
    { id: 'profile', label: 'My Account', icon: <User size={18} /> },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(9, 13, 22, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand */}
        <div
          onClick={() => setActiveTab('dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary) 0%, #4338ca 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px var(--primary-glow)',
            }}
          >
            <GraduationCap size={22} color="#ffffff" />
          </div>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
              Edu<span style={{ color: 'var(--primary)' }}>Connect</span>
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="btn btn-sm"
              style={{
                background: activeTab === item.id ? 'var(--bg-tertiary)' : 'transparent',
                color: activeTab === item.id ? 'var(--primary)' : 'var(--text-muted)',
                border: activeTab === item.id ? '1px solid var(--border-highlight)' : '1px solid transparent',
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Info & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className={`badge badge-${user.role || 'student'}`}>
                {user.role || 'student'}
              </span>

              <button
                onClick={logout}
                className="btn btn-danger btn-sm"
                title="Logout Account"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
