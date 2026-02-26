import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllMeetings } from '../services/api'

function HistoryPage() {
  const [meetings, setMeetings] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await getAllMeetings()
        setMeetings(response.data)
      } catch (error) {
        console.error('Failed to fetch meetings:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMeetings()
  }, []) // Empty array = run once on page load

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-xl">Loading your meetings...</p>
      </div>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Meeting History</h2>

      {meetings.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>No meetings yet.</p>
          <Link to="/" className="mt-4 text-blue-500 underline block">Analyze your first meeting →</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {meetings.map((meeting) => (
            <div key={meeting._id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{meeting.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(meeting.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                </div>
                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                  {meeting.actionItems.length} action items
                </span>
              </div>
              <p className="text-gray-600 mt-3">{meeting.summary}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default HistoryPage