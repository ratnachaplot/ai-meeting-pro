import axios from 'axios';

// All backend calls go through this one file
const api = axios.create({
  baseURL: 'https://ai-meeting-backend-8yv9.onrender.com/api',
  headers: { 'Content-Type': 'application/json' }
});

// Automatically attach token to every request
// This runs before every single API call
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const signup = (name, email, password) =>
  api.post('/auth/signup', { name, email, password });

export const login = (email, password) =>
  api.post('/auth/login', { email, password });

export const analyzeMeeting  = (transcript, title) => api.post('/meetings', { transcript, title });
export const getAllMeetings   = ()                  => api.get('/meetings');
export const getMeetingById  = (id)                => api.get(`/meetings/${id}`);
export const toggleActionItem = (meetingId, index) => api.patch(`/meetings/${meetingId}/toggle/${index}`);
export const deleteMeeting    = (id)                => api.delete(`/meetings/${id}`);