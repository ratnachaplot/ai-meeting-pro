const mongoose = require('mongoose');

// Blueprint for one action item inside a meeting
const actionItemSchema = new mongoose.Schema({
  task:      { type: String, required: true },
  assignee:  { type: String, default: 'TBD' },
  deadline:  { type: String, default: 'TBD' },
  completed: { type: Boolean, default: false }
});

// Blueprint for a full meeting document
const meetingSchema = new mongoose.Schema({
  // ← NEW: link each meeting to a user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title:       { type: String, default: 'Untitled Meeting' },
  transcript:  { type: String, required: true },
  summary:     { type: String, required: true },
  keyPoints:   [String],           // Array of strings
  actionItems: [actionItemSchema], // Array of action item objects
  createdAt:   { type: Date, default: Date.now }
});

// 'Meeting' → MongoDB will create a collection called 'meetings'
const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;