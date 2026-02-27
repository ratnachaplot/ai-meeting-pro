const express = require('express');
const cors = require('cors');
const meetingRoutes = require('./routes/meetingRoutes');

const app = express();

// Temporarily allow ALL origins to test if CORS is the issue
app.use(cors());

app.use(express.json());

app.use('/api/meetings', meetingRoutes);

app.get('/health', (req, res) => {
  res.json({ status: '✅ Server is running!' });
});

module.exports = app;