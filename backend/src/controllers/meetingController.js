const Meeting = require('../models/Meeting');
const Groq = require('groq-sdk');

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// ─────────────────────────────────────────────────────
// CONTROLLER 1: Analyze transcript with AI
// ─────────────────────────────────────────────────────
const analyzeMeeting = async (req, res) => {
  try {
    const { transcript, title } = req.body;

    if (!transcript) {
      return res.status(400).json({ message: 'Transcript is required' });
    }

    const prompt = `
      You are an expert meeting analyst.
      Analyze this meeting transcript and return ONLY a JSON object
      with exactly this structure. No extra text. No markdown. No code blocks.
      {
        "summary": "2-3 sentence overview of the meeting",
        "keyPoints": ["point 1", "point 2", "point 3"],
        "actionItems": [
          {
            "task": "what needs to be done",
            "assignee": "person responsible or TBD",
            "deadline": "deadline if mentioned or TBD"
          }
        ]
      }
      Transcript: ${transcript}
    `;

    // Call Groq API — same structure as OpenAI
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Free, fast, very capable model
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1000
    });

    const aiText = completion.choices[0].message.content;

    // Clean response in case of any backticks
    const cleaned = aiText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(cleaned);

    const newMeeting = await Meeting.create({
      title: title || 'Untitled Meeting',
      transcript,
      summary:     parsed.summary,
      keyPoints:   parsed.keyPoints,
      actionItems: parsed.actionItems
    });

    res.status(201).json(newMeeting);

  } catch (error) {
    console.error('Error analyzing meeting:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─────────────────────────────────────────────────────
// CONTROLLER 2: Get all meetings
// ─────────────────────────────────────────────────────
const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({})
      .sort({ createdAt: -1 })
      .select('-transcript');
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─────────────────────────────────────────────────────
// CONTROLLER 3: Get one meeting by ID
// ─────────────────────────────────────────────────────
const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─────────────────────────────────────────────────────
// CONTROLLER 4: Toggle action item done/undone
// ─────────────────────────────────────────────────────
const toggleActionItem = async (req, res) => {
  try {
    const { meetingId, itemIndex } = req.params;

    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    meeting.actionItems[itemIndex].completed =
      !meeting.actionItems[itemIndex].completed;

    await meeting.save();
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─────────────────────────────────────────────────────
// CONTROLLER 5: Delete a meeting by ID
// ─────────────────────────────────────────────────────
const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // Delete the meeting from MongoDB
    await Meeting.findByIdAndDelete(req.params.id);

    // 200 = success, send confirmation message
    res.status(200).json({ message: 'Meeting deleted successfully' });

  } catch (error) {
    console.error('Error deleting meeting:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  analyzeMeeting,
  getAllMeetings,
  getMeetingById,
  toggleActionItem,
  deleteMeeting
};