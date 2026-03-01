import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Header({ darkMode, setDarkMode, setIsLoggedIn }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)  // ← updates App state immediately
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <header className={`${darkMode ? 'bg-gray-900' : 'bg-blue-600'} text-white shadow-lg transition-colors`}>
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🤖 AI Meeting Pro</h1>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6">
            <Link to="/"        className="hover:text-blue-200 transition-colors">New Meeting</Link>
            <Link to="/history" className="hover:text-blue-200 transition-colors">History</Link>
          </nav>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl hover:scale-110 transition-transform"
            title="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <div className="flex items-center gap-3 border-l border-blue-400 pl-6">
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
      </div>
    </header>
  )
}

export default Header