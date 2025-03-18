// services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://testbackendmern.onrender.com';

// Check localStorage for an existing token
const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // If token exists, include it in the Authorization header
    ...(token && { 'Authorization': `Bearer ${token}` }),
  },
});

// Helper function to update the token in axios and localStorage
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export const login = (credentials) => api.post('/api/auth/login', credentials);
export const reportLostItem = (data) => api.post('/api/lostfound/report-lost', data);
export const reportFoundItem = (data) => api.post('/api/lostfound/report-found', data);
export const getMatchingItems = () => api.get('/api/lostfound/match-items');
export const resolveItem = (itemId) => api.put(`/api/lostfound/resolve/${itemId}`);

export default api;
