# 🤖 AI Meeting Minutes Pro

> A full stack AI-powered web application that automatically analyzes meeting transcripts and generates structured summaries, key discussion points, and actionable tasks — powered by LLaMA 3.3 70B via Groq API.

---

## 🌐 Live Demo

| | Link |
|---|---|
| **Frontend** | https://ai-meeting-pro.vercel.app |
| **Backend API** | https://ai-meeting-backend-8yv9.onrender.com |

> ⚠️ The backend is hosted on Render's free tier — the first request may take 15-20 seconds to wake up. Subsequent requests are fast.

---

## 📸 Features

- 📋 **AI Analysis** — Paste any meeting transcript and get an instant structured summary
- 💡 **Key Points** — Automatically extracted discussion points
- ✅ **Action Items** — Tasks with assigned owners and deadlines extracted by AI
- 🔄 **Toggle Tasks** — Mark action items as complete or incomplete
- 🗑️ **Delete Meetings** — Remove meetings from history
- 🔍 **Smart Search** — Search meetings by title or keyword with live text highlighting
- 📅 **Meeting History** — View and manage all past analyzed meetings
- 🔔 **Toast Notifications** — Real-time success and error feedback

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI library with component-based architecture |
| Vite | Fast build tool and dev server |
| React Router v6 | Client-side routing between pages |
| Tailwind CSS v3 | Utility-first CSS styling |
| Axios | HTTP requests to backend API |
| React Hot Toast | Toast notification system |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Web framework for REST API |
| Mongoose | MongoDB ODM for schema and validation |
| Groq SDK | AI inference API client |
| dotenv | Environment variable management |
| CORS | Cross-origin request handling |

### Database & AI
| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud NoSQL database |
| LLaMA 3.3 70B | AI model for meeting analysis via Groq |

### Deployment
| Service | What's Deployed |
|---|---|
| Vercel | Frontend (React app) |
| Render | Backend (Node.js server) |
| MongoDB Atlas | Database (cloud) |

---

## 📁 Project Structure

```
ai-meeting-pro/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection
│   │   ├── controllers/
│   │   │   └── meetingController.js # Business logic + AI integration
│   │   ├── models/
│   │   │   └── Meeting.js          # Mongoose schema
│   │   ├── routes/
│   │   │   └── meetingRoutes.js    # API route definitions
│   │   └── app.js                  # Express app configuration
│   ├── .env.example                # Environment variable template
│   ├── package.json
│   └── server.js                   # Server entry point
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Header.jsx
│       │   ├── TranscriptInput.jsx
│       │   ├── MeetingResult.jsx
│       │   └── ActionItem.jsx
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   └── HistoryPage.jsx
│       ├── services/
│       │   └── api.js              # Centralized API calls
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

---

## ⚙️ Run Locally

### Prerequisites
- Node.js v18 or higher
- MongoDB Atlas account (free)
- Groq API key (free at console.groq.com)

### Step 1 — Clone the Repository
```bash
git clone https://github.com/ratnachaplot/ai-meeting-pro.git
cd ai-meeting-pro
```

### Step 2 — Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

Start the backend:
```bash
npm run dev
# Server runs on http://localhost:5000
```

### Step 3 — Setup Frontend
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

### Step 4 — Open in Browser
```
http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/meetings` | Analyze transcript with AI and save |
| `GET` | `/api/meetings` | Get all meetings (history) |
| `GET` | `/api/meetings/:id` | Get single meeting by ID |
| `PATCH` | `/api/meetings/:id/toggle/:index` | Toggle action item complete/incomplete |
| `DELETE` | `/api/meetings/:id` | Delete a meeting |

---

## 🧠 How It Works

```
User pastes transcript → clicks Analyze
         ↓
React sends POST request to Express backend
         ↓
Backend builds a structured prompt
         ↓
Groq API (LLaMA 3.3 70B) analyzes the transcript
         ↓
AI returns JSON with summary, key points, action items
         ↓
Backend saves to MongoDB and returns result
         ↓
React renders the structured output instantly
```

---

## 💡 Key Implementation Details

- **Prompt Engineering** — Carefully crafted prompts instruct the AI to return strictly formatted JSON, with a cleaning step to handle any markdown formatting
- **MVC Architecture** — Routes, Controllers, and Models are separated for clean, maintainable code
- **Service Layer** — All API calls centralized in `api.js` for easy maintenance
- **Security** — API keys stored as environment variables, never exposed to the frontend
- **Error Handling** — Try-catch on all async operations with meaningful error messages

---

## 🚀 Deployment

### Backend — Render.com
```
Root Directory: backend
Build Command:  npm install
Start Command:  node server.js
Environment Variables: MONGO_URI, GROQ_API_KEY, NODE_ENV=production
```

### Frontend — Vercel.com
```
Root Directory:   frontend
Framework:        Vite
Build Command:    npm run build
Output Directory: dist
```

---

## 🔮 Future Improvements

- [ ] User authentication with JWT
- [ ] Audio file upload with Whisper transcription
- [ ] Export meeting minutes to PDF
- [ ] Email delivery of meeting summaries
- [ ] Rate limiting and API security
- [ ] Dark mode toggle

---

## 👨‍💻 Author

**Ratna Chaplot**
- GitHub: [@ratnachaplot](https://github.com/ratnachaplot)
- Live Project: [ai-meeting-pro.vercel.app](https://ai-meeting-pro.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).