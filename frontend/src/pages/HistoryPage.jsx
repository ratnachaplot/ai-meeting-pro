import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllMeetings, deleteMeeting } from '../services/api'

function HistoryPage({ darkMode }) {
  const [meetings, setMeetings] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await getAllMeetings()
        setMeetings(response.data)
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Failed to load meetings')
      } finally {
        setLoading(false)
      }
    }
    fetchMeetings()
  }, [])

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this meeting?')
    if (!confirmed) return
    try {
      await deleteMeeting(id)
      setMeetings(meetings.filter(m => m._id !== id))
      toast.success('Meeting deleted successfully!')
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Failed to delete meeting.')
    }
  }

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(search.toLowerCase()) ||
    meeting.summary.toLowerCase().includes(search.toLowerCase())
  )

  const highlightText = (text, query) => {
    if (!query.trim()) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 rounded px-0.5">
          {part}
        </mark>
      ) : part
    )
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Loading your meetings...
        </p>
      </div>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Meeting History
        </h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {filteredMeetings.length} {filteredMeetings.length === 1 ? 'Meeting' : 'Meetings'}
        </span>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search by title or keyword..."
          className={`w-full border rounded-xl px-4 py-3 focus:outline-none
                      focus:ring-2 focus:ring-blue-500 shadow-sm ${
            darkMode
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* No meetings */}
      {meetings.length === 0 ? (
        <div className="text-center py-20">
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No meetings yet.
          </p>
          <Link to="/" className="mt-4 text-blue-500 underline block">
            Analyze your first meeting →
          </Link>
        </div>

      ) : filteredMeetings.length === 0 ? (
        <div className="text-center py-20">
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No meetings found for
          </p>
          <p className="text-blue-500 font-medium mt-1">"{search}"</p>
          <button onClick={() => setSearch('')} className="mt-4 text-blue-500 underline block mx-auto">
            Clear search
          </button>
        </div>

      ) : (
        <div className="grid gap-4">
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting._id}
              className={`rounded-xl shadow-md p-6 border-2 border-transparent
                          hover:border-blue-100 transition-all ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {highlightText(meeting.title, search)}
                  </h3>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(meeting.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                    {meeting.actionItems.length} action items
                  </span>
                  <button
                    onClick={() => handleDelete(meeting._id)}
                    className="bg-red-100 text-red-600 hover:bg-red-200
                               px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
              <p className={`mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {highlightText(meeting.summary, search)}
              </p>
              {search && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-400">Matched:</span>
                  <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">
                    "{search}"
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default HistoryPage