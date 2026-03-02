import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Header({ darkMode, setDarkMode, setIsLoggedIn }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <header className={`${
      darkMode ? 'bg-gray-900' : 'bg-blue-600'
    } text-white shadow-lg transition-colors`}>
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <h1 className="text-lg font-bold">🤖 AI Meeting Pro</h1>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-6">
              <Link to="/" className="hover:text-blue-200 transition-colors text-sm">
                New Meeting
              </Link>
              <Link to="/history" className="hover:text-blue-200 transition-colors text-sm">
                History
              </Link>
            </nav>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-lg hover:scale-110 transition-transform"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="flex items-center gap-3 border-l border-blue-400 pl-4">
              <span className="text-blue-100 text-sm">👤 {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-blue-700 hover:bg-blue-800 px-3 py-1
                           rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile — dark mode + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-lg hover:scale-110 transition-transform"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>

        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className={`md:hidden mt-3 pb-3 border-t ${
            darkMode ? 'border-gray-700' : 'border-blue-500'
          }`}>
            <div className="flex flex-col gap-3 pt-3">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-200 transition-colors text-sm"
              >
                🏠 New Meeting
              </Link>
              <Link
                to="/history"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-200 transition-colors text-sm"
              >
                📅 History
              </Link>
              <div className={`border-t pt-3 ${
                darkMode ? 'border-gray-700' : 'border-blue-500'
              }`}>
                <p className="text-blue-100 text-sm mb-2">👤 {user.name}</p>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2
                             rounded-lg text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  )
}

export default Header