import { Navigate } from 'react-router-dom'

// If user is not logged in → redirect to login page
// If user is logged in → show the page normally
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute