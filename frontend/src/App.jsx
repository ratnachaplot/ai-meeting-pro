import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toaster shows toast popups anywhere in the app */}
      <Toaster position="top-right" />
      <Header />
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </div>
  )
}

export default App