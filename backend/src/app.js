const express = require('express');
const cors = require('cors');
const meetingRoutes = require('./routes/meetingRoutes');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ai-meeting-pro.vercel.app/'  // ← you'll know exact URL after deploying
  ],
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));

app.use(express.json());

app.use('/api/meetings', meetingRoutes);

app.get('/health', (req, res) => {
  res.json({ status: '✅ Server is running!' });
});

module.exports = app;