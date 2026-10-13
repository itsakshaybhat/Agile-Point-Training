import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, setAccessToken, getAccessToken } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          const res = await api.getProfile();
          if (res.success && res.data) {
            setUser(res.data);
          } else {
            setAccessToken(null);
          }
        } catch {
          // Token expired or invalid
          setAccessToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    if (res.success && res.data?.accessToken) {
      setAccessToken(res.data.accessToken);
      // Fetch user profile immediately
      const profileRes = await api.getProfile();
      if (profileRes.success && profileRes.data) {
        setUser(profileRes.data);
      }
      return profileRes.data;
    }
  };

  const register = async (name, email, password) => {
    const res = await api.register(name, email, password);
    if (res.success) {
      // Auto login after successful registration
      return await login(email, password);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {
      // Ignore network/logout error and clear local state anyway
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const logoutAll = async () => {
    try {
      await api.logoutAll();
    } catch {
      // Ignore
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const updateProfile = async (name) => {
    const res = await api.updateProfile(name);
    if (res.success && res.data) {
      setUser((prev) => ({ ...prev, name: res.data.name }));
      return res.data;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    const res = await api.changePassword(currentPassword, newPassword);
    if (res.success) {
      setAccessToken(null);
      setUser(null);
    }
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        logoutAll,
        updateProfile,
        changePassword,
        refreshProfile: async () => {
          const res = await api.getProfile();
          if (res.success) setUser(res.data);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
