import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { CoursesPage } from './pages/CoursesPage';
import { ProfilePage } from './pages/ProfilePage';

const MainApp = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          fontWeight: 600,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div className="pulse-glow" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', margin: '0 auto 1rem' }} />
          <span>Loading EduConnect...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <AuthPage showToast={showToast} />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} showToast={showToast} />}
        {activeTab === 'courses' && <CoursesPage showToast={showToast} />}
        {activeTab === 'profile' && <ProfilePage showToast={showToast} />}
      </main>

      <Footer />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
