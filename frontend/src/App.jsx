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
  const token = localStorage.getItem('token')

  // Dark mode state — false = light, true = dark
  const [darkMode, setDarkMode] = useState(false)

  return (
    // Apply dark class to entire app based on darkMode state
    <div className={`min-h-screen transition-colors ${
      darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Toaster position="top-right" />

      {/* Pass darkMode and setDarkMode to Header */}
      {token && <Header darkMode={darkMode} setDarkMode={setDarkMode} />}

      <Routes>
        {/* Public routes */}
        <Route path="/login"  element={token ? <Navigate to="/" /> : <LoginPage  darkMode={darkMode} />} />
        <Route path="/signup" element={token ? <Navigate to="/" /> : <SignupPage darkMode={darkMode} />} />

        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage darkMode={darkMode} />
          </ProtectedRoute>
        } />
        <Route path="/history" element={
          <ProtectedRoute>
            <HistoryPage darkMode={darkMode} />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App