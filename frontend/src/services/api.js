import axios from 'axios';

// All backend calls go through this one file
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

export const analyzeMeeting  = (transcript, title) => api.post('/meetings', { transcript, title });
export const getAllMeetings   = ()                  => api.get('/meetings');
export const getMeetingById  = (id)                => api.get(`/meetings/${id}`);
export const toggleActionItem = (meetingId, index) => api.patch(`/meetings/${meetingId}/toggle/${index}`);