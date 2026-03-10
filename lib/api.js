import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ai-travel-backend-reed.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login    = (data) => api.post('/auth/login', data);
export const logout   = ()     => api.post('/auth/logout');
export const getMe    = ()     => api.get('/auth/me');

// Trips
export const createTrip = (data) => api.post('/trips', data);
export const getTrips   = ()     => api.get('/trips');
export const getTrip    = (id)   => api.get(`/trips/${id}`);
export const deleteTrip = (id)   => api.delete(`/trips/${id}`);

// AI
export const generateAITrip = (id) => api.post(`/ai/generate-trip/${id}`);

export default api;
