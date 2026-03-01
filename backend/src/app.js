const express = require('express');
const cors = require('cors');
const meetingRoutes = require('./routes/meetingRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Temporarily allow ALL origins to test if CORS is the issue
app.use(cors({
  origin: [
    'http://localhost:5173', // React dev server
    'https://ai-meeting-pro.vercel.app' // Production frontend
  ],
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);

app.get('/health', (req, res) => {
  res.json({ status: '✅ Server is running!' });
});

module.exports = app;