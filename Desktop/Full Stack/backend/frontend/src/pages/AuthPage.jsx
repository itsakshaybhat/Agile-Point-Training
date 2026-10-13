import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Lock, Mail, User, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, UserCheck, BookOpen } from 'lucide-react';

export const AuthPage = ({ showToast }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        showToast('Welcome back! Successfully logged in.', 'success');
      } else {
        await register(name, email, password);
        showToast('Account registered successfully! Welcome to EduConnect.', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Authentication failed. Please check credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Login Helper
  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    try {
      await login(demoEmail, demoPassword);
      showToast(`Logged in as ${demoEmail}`, 'success');
    } catch (err) {
      showToast(err.message || 'Demo login failed. Make sure database seed has run.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        background: 'radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.15) 0%, rgba(9, 13, 22, 1) 70%)',
      }}
    >
      <div
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '460px',
        }}
      >
        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, var(--primary) 0%, #4338ca 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 8px 24px var(--primary-glow)',
            }}
            className="animate-float"
          >
            <GraduationCap size={32} color="#ffffff" />
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Edu<span style={{ color: 'var(--primary)' }}>Connect</span>
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Interactive Educational Platform & Course Management
          </p>
        </div>

        {/* Card Container */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          {/* Tab Controls */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px',
              marginBottom: '1.5rem',
              border: '1px solid var(--border-color)',
            }}
          >
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: isLogin ? 'var(--primary)' : 'transparent',
                color: isLogin ? '#ffffff' : 'var(--text-muted)',
                transition: 'var(--transition-fast)',
              }}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: !isLogin ? 'var(--primary)' : 'transparent',
                color: !isLogin ? '#ffffff' : 'var(--text-muted)',
                transition: 'var(--transition-fast)',
              }}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User
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
                    required
                    placeholder="John Doe"
                    className="input-field"
                    style={{ paddingLeft: '40px' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail
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
                  type="email"
                  required
                  placeholder="student@educonnect.com"
                  className="input-field"
                  style={{ paddingLeft: '40px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock
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
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="input-field"
                  style={{ paddingLeft: '40px', paddingRight: '40px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-dim)',
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <span>{isLogin ? 'Sign In to Account' : 'Create Account'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* 1-Click Demo Accounts Bar */}
          {isLogin && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.65rem', textAlign: 'center' }}>
                ⚡ 1-CLICK DEMO LOGIN (TEST ROLES):
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('student@educonnect.com', 'password123')}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '6px', fontSize: '0.75rem', flexDirection: 'column', gap: '2px' }}
                >
                  <BookOpen size={14} color="var(--primary)" />
                  <span>Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('instructor@educonnect.com', 'password123')}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '6px', fontSize: '0.75rem', flexDirection: 'column', gap: '2px' }}
                >
                  <UserCheck size={14} color="var(--secondary)" />
                  <span>Instructor</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin@educonnect.com', 'password123')}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '6px', fontSize: '0.75rem', flexDirection: 'column', gap: '2px' }}
                >
                  <ShieldCheck size={14} color="var(--accent)" />
                  <span>Admin</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
