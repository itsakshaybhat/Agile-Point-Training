/**
 * EduConnect API Client
 * Clean, lightweight fetch wrapper for interacting with Fastify backend.
 */

let accessToken = localStorage.getItem('edu_access_token') || null;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';

export const setAccessToken = (token) => {
  accessToken = token;
  if (token) {
    localStorage.setItem('edu_access_token', token);
  } else {
    localStorage.removeItem('edu_access_token');
  }
};

export const getAccessToken = () => accessToken;

async function request(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const config = {
    ...options,
    headers,
    credentials: 'include', // Include HttpOnly refreshToken cookies
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  let response = await fetch(url, config);

  // If 401 Unauthorized, attempt refresh token once
  if (response.status === 401 && !options._retry && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh')) {
    options._retry = true;
    try {
      const refreshUrl = `${API_BASE_URL}/api/v1/auth/refresh`;

      const refreshRes = await fetch(refreshUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        const newToken = refreshData.data?.accessToken;
        if (newToken) {
          setAccessToken(newToken);
          headers['Authorization'] = `Bearer ${newToken}`;
          config.headers = headers;
          response = await fetch(url, config);
        }
      } else {
        setAccessToken(null);
      }
    } catch {
      setAccessToken(null);
    }
  }

  if (response.status === 204) {
    return { success: true };
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.message || `API Error: ${response.statusText}`;
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  // Auth API
  register: (name, email, password) => request('/api/v1/auth/register', { method: 'POST', body: { name, email, password } }),
  login: (email, password) => request('/api/v1/auth/login', { method: 'POST', body: { email, password } }),
  logout: () => request('/api/v1/auth/logout', { method: 'POST' }),
  logoutAll: () => request('/api/v1/auth/logout-all', { method: 'POST' }),
  getMe: () => request('/api/v1/me', { method: 'GET' }),

  // Profile API
  getProfile: () => request('/api/v1/profile', { method: 'GET' }),
  updateProfile: (name) => request('/api/v1/profile', { method: 'PATCH', body: { name } }),
  changePassword: (currentPassword, newPassword) => request('/api/v1/profile/password', { method: 'PATCH', body: { currentPassword, newPassword } }),

  // Courses API
  getCourses: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/api/v1/courses${query ? `?${query}` : ''}`, { method: 'GET' });
  },
  getCourse: (id) => request(`/api/v1/courses/${id}`, { method: 'GET' }),
  createCourse: (title, description) => request('/api/v1/courses', { method: 'POST', body: { title, description } }),
  updateCourse: (id, title, description) => request(`/api/v1/courses/${id}`, { method: 'PATCH', body: { title, description } }),
  deleteCourse: (id) => request(`/api/v1/courses/${id}`, { method: 'DELETE' }),

  // Lessons API
  getLessons: (courseId) => request(`/api/v1/courses/${courseId}/lessons`, { method: 'GET' }),
  createLesson: (courseId, title, content, lessonOrder) => request(`/api/v1/courses/${courseId}/lessons`, { method: 'POST', body: { title, content, lessonOrder } }),
  updateLesson: (lessonId, title, content, lessonOrder) => request(`/api/v1/lessons/${lessonId}`, { method: 'PATCH', body: { title, content, lessonOrder } }),
  deleteLesson: (lessonId) => request(`/api/v1/lessons/${lessonId}`, { method: 'DELETE' }),

  // Enrollment API
  enrollCourse: (courseId) => request(`/api/v1/courses/${courseId}/enroll`, { method: 'POST' }),

  // Health API
  getHealth: () => request('/health', { method: 'GET' }),
};
