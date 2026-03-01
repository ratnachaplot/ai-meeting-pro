import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  // useState so React re-renders when login status changes
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token') // true if token exists, false if not
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Show Header only when logged in */}
      {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            isLoggedIn
              ? <Navigate to="/" />
              : <LoginPage setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn
              ? <Navigate to="/" />
              : <SignupPage setIsLoggedIn={setIsLoggedIn} />
          }
        />

        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute><HomePage /></ProtectedRoute>
        } />
        <Route path="/history" element={
          <ProtectedRoute><HistoryPage /></ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App