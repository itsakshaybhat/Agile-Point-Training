import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Shield, Mail, Calendar, LogOut, CheckCircle } from 'lucide-react';

export const ProfilePage = ({ showToast }) => {
  const { user, updateProfile, changePassword, logoutAll } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [updatingName, setUpdatingName] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    setUpdatingName(true);
    try {
      await updateProfile(name);
      showToast('Profile name updated successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to update name', 'error');
    } finally {
      setUpdatingName(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setUpdatingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      showToast('Password changed! Please log in again.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to change password', 'error');
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleLogoutAll = async () => {
    if (!window.confirm('Are you sure you want to log out from all active devices?')) return;
    try {
      await logoutAll();
      showToast('Logged out from all sessions.', 'info');
    } catch (err) {
      showToast(err.message || 'Failed to log out all sessions', 'error');
    }
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>Account Settings & Profile</h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          Manage your personal details, role credentials, and active security sessions.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* User Card */}
        <div
          className="glass-panel"
          style={{
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#ffffff',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff' }}>{user?.name}</h3>
              <span className={`badge badge-${user?.role || 'student'}`}>{user?.role || 'student'}</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mail size={14} /> {user?.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Shield size={14} /> User ID #{user?.id}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} /> Joined {formattedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Update Profile Name Form */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} color="var(--primary)" />
            Update Display Name
          </h4>

          <form onSubmit={handleUpdateName}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" disabled={updatingName} className="btn btn-primary btn-sm">
                {updatingName ? 'Saving...' : 'Save Profile Name'}
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={18} color="var(--accent)" />
            Change Password
          </h4>

          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="input-field"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="input-field"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" disabled={updatingPassword} className="btn btn-primary btn-sm">
                {updatingPassword ? 'Updating...' : 'Change Password'}
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone / Session Security */}
        <div
          className="glass-panel"
          style={{
            padding: '1.75rem',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            background: 'rgba(239, 68, 68, 0.04)',
          }}
        >
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fca5a5', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={18} /> Security & Session Management
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Revoke all active refresh tokens and log out from every web browser or device.
          </p>

          <button onClick={handleLogoutAll} className="btn btn-danger btn-sm">
            Logout All Devices
          </button>
        </div>
      </div>
    </div>
  );
};
