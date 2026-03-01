# 🤖 AI Meeting Minutes Pro

> A full stack AI-powered web application that automatically analyzes meeting transcripts and generates structured summaries, key discussion points, and actionable tasks — with secure JWT authentication so every user has their own private meeting history.

---

## 🌐 Live Demo

| | Link |
|---|---|
| **Frontend** | https://ai-meeting-pro.vercel.app |
| **Backend API** | https://ai-meeting-backend-8yv9.onrender.com |

> ⚠️ Backend is on Render's free tier — first request may take 15-20 seconds to wake up.

---

## ✨ Features

### Core
- 📋 **AI Analysis** — Paste any meeting transcript and get instant structured output
- 💡 **Key Points** — Automatically extracted discussion points
- ✅ **Action Items** — Tasks with assigned owners and deadlines extracted by AI
- 🔄 **Toggle Tasks** — Mark action items as complete or incomplete
- 🗑️ **Delete Meetings** — Remove meetings from history
- 🔍 **Smart Search** — Search by title or keyword with live text highlighting
- 📅 **Meeting History** — View and manage all past analyzed meetings
- 🔔 **Toast Notifications** — Real-time success and error feedback

### Authentication
- 🔐 **JWT Authentication** — Secure stateless auth with JSON Web Tokens
- 👤 **Private Data** — Every user sees only their own meetings
- 🔒 **Password Hashing** — Passwords encrypted with bcrypt (never stored in plain text)
- 🛡️ **Protected Routes** — Unauthenticated users redirected to login automatically
- 🚪 **Logout** — Clears token and session securely

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI library with component-based architecture |
| Vite | Fast build tool and dev server |
| React Router v6 | Client-side routing and protected routes |
| Tailwind CSS v3 | Utility-first CSS styling |
| Axios | HTTP requests with JWT interceptor |
| React Hot Toast | Toast notification system |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Web framework for REST API |
| Mongoose | MongoDB ODM for schema and validation |
| Groq SDK | AI inference API client |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT token creation and verification |
| dotenv | Environment variable management |
| CORS | Cross-origin request handling |

### Database & AI
| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud NoSQL database |
| LLaMA 3.3 70B | AI model for meeting analysis via Groq |

### Deployment
| Service | What is Deployed |
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
│   │   │   └── db.js                   # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js       # Signup and Login logic
│   │   │   └── meetingController.js    # AI integration + CRUD
│   │   ├── middleware/
│   │   │   └── authMiddleware.js       # JWT token verification
│   │   ├── models/
│   │   │   ├── User.js                 # User schema
│   │   │   └── Meeting.js              # Meeting schema (with userId)
│   │   ├── routes/
│   │   │   ├── authRoutes.js           # /api/auth endpoints
│   │   │   └── meetingRoutes.js        # /api/meetings endpoints
│   │   └── app.js                      # Express configuration
│   ├── .env.example
│   ├── package.json
│   └── server.js                       # Server entry point
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Header.jsx              # Nav + logout button
│       │   ├── ProtectedRoute.jsx      # Auth guard component
│       │   ├── TranscriptInput.jsx
│       │   ├── MeetingResult.jsx
│       │   └── ActionItem.jsx
│       ├── pages/
│       │   ├── LoginPage.jsx
│       │   ├── SignupPage.jsx
│       │   ├── HomePage.jsx
│       │   └── HistoryPage.jsx
│       ├── services/
│       │   └── api.js                  # Axios + JWT interceptor
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

Create a `.env` file in the backend folder (see `.env.example`):
```
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_long_random_secret_key
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
# Runs on http://localhost:5000
```

### Step 3 — Setup Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Step 4 — Open in Browser
```
http://localhost:5173
```
Create an account and start analyzing meetings!

---

## 🔌 API Endpoints

### Auth (Public)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT token |

### Meetings (Protected — requires Bearer token)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/meetings` | Analyze transcript with AI and save |
| `GET` | `/api/meetings` | Get all meetings for logged-in user only |
| `GET` | `/api/meetings/:id` | Get single meeting by ID |
| `PATCH` | `/api/meetings/:id/toggle/:index` | Toggle action item complete/incomplete |
| `DELETE` | `/api/meetings/:id` | Delete a meeting |

---

## 🔐 Authentication Flow

```
User Signup or Login
        ↓
Backend verifies credentials
        ↓
JWT token created (expires in 7 days)
        ↓
Token stored in localStorage on frontend
        ↓
Axios interceptor attaches token to every request header
        ↓
Backend middleware verifies token on all protected routes
        ↓
userId extracted from token → only that user's data returned
```

---

## 🧠 How AI Analysis Works

```
User pastes transcript → clicks Analyze
        ↓
React sends POST /api/meetings with JWT token in header
        ↓
Auth middleware verifies token → extracts userId
        ↓
Controller builds structured prompt for AI
        ↓
Groq API (LLaMA 3.3 70B) analyzes the transcript
        ↓
AI returns JSON with summary, keyPoints, actionItems
        ↓
Backend saves to MongoDB with userId attached
        ↓
Returns saved meeting object to frontend
        ↓
React re-renders with structured output instantly
```

---

## 💡 Key Implementation Details

- **JWT Auth** — Stateless authentication using signed tokens — no session storage needed on the server
- **bcrypt Hashing** — Passwords hashed with 10 salt rounds — irreversible, safe even if DB is compromised
- **Axios Interceptor** — Single centralized place to attach JWT to every outgoing API request automatically
- **Protected Routes** — `ProtectedRoute` component checks localStorage for token and redirects unauthenticated users to login
- **Per-User Data Isolation** — Every database query filters by `userId` from the JWT — users can never access each other's data
- **Prompt Engineering** — Carefully crafted prompts instruct the AI to return strictly formatted JSON, with a cleaning step to handle markdown wrapping
- **MVC Architecture** — Routes, Controllers, Models, and Middleware all separated for clean, maintainable code

---

## 🚀 Deployment

### Backend — Render.com
```
Root Directory:  backend
Build Command:   npm install
Start Command:   node server.js

Environment Variables:
  MONGO_URI     = your_mongodb_connection_string
  GROQ_API_KEY  = your_groq_api_key
  JWT_SECRET    = your_secret_key
  NODE_ENV      = production
```

### Frontend — Vercel.com
```
Root Directory:   frontend
Framework:        Vite
Build Command:    npm run build
Output Directory: dist
```

---

## 🐛 Real Challenges Faced & Solved

| Challenge | How I Solved It |
|---|---|
| AI returning markdown instead of JSON | Added `.replace()` cleaning step + explicit prompt instructions to return only valid JSON |
| Linux case-sensitivity breaking Render deployment | Used `git mv` to properly rename `meeting.js` → `Meeting.js` |
| CORS blocking frontend API requests | Configured explicit origin whitelist in Express CORS middleware |
| Render not loading environment variables | Added `NODE_ENV` check to skip dotenv in production |
| MongoDB Atlas blocking Render server IPs | Set Network Access to `0.0.0.0/0` in Atlas dashboard |
| AI model deprecation errors mid-project | Debugged error messages and migrated from deprecated models to `llama-3.3-70b-versatile` |
| Groq quota exceeded on Gemini | Switched AI provider from Google Gemini to Groq — faster and more reliable on free tier |

---

## 🔮 Future Improvements

- [ ] Audio file upload with Whisper API transcription
- [ ] Export meeting minutes to PDF
- [ ] Email delivery of meeting summaries
- [ ] Forgot password and reset password flow
- [ ] Rate limiting to prevent API abuse
- [ ] Meeting tags and categories

