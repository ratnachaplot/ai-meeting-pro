# 🤖 AI Meeting Minutes Pro

A full stack AI-powered web app that analyzes meeting transcripts 
and automatically generates summaries, key points, and action items.

## Tech Stack
- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **AI:** LLaMA 3.3 70B via Groq API
- **Deployment:** Vercel (frontend) + Render (backend)

## Live Demo
- Frontend: https://ai-meeting-pro.vercel.app
- Backend: https://ai-meeting-backend.onrender.com

## Features
- Paste any meeting transcript and get AI analysis instantly
- Auto-generates meeting summary, key points, and action items
- Track action items as complete or incomplete
- View full meeting history

## Run Locally

### Backend
cd backend
npm install
# Create .env file with your keys (see .env.example)
npm run dev

### Frontend
cd frontend
npm install
npm run dev