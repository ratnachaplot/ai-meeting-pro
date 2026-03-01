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
  const [darkMode,    setDarkMode]    = useState(false)
  const [isLoggedIn,  setIsLoggedIn]  = useState(!!localStorage.getItem('token'))

  return (
    <div className={`min-h-screen transition-colors ${
      darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Toaster position="top-right" />

      {isLoggedIn && <Header darkMode={darkMode} setDarkMode={setDarkMode} setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        <Route path="/login"
          element={isLoggedIn
            ? <Navigate to="/" />
            : <LoginPage darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup"
          element={isLoggedIn
            ? <Navigate to="/" />
            : <SignupPage darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} />}
        />
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