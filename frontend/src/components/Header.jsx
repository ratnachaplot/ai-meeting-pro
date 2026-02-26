import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🤖 AI Meeting Pro</h1>
        <nav className="flex gap-6">
          <Link to="/"        className="hover:text-blue-200 transition-colors">New Meeting</Link>
          <Link to="/history" className="hover:text-blue-200 transition-colors">History</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header