import { useState } from 'react'
import ActionItem from './ActionItem'
import { toggleActionItem } from '../services/api'

function MeetingResult({ meeting: initialMeeting, darkMode }) {
  const [meeting, setMeeting] = useState(initialMeeting)

  const handleToggle = async (index) => {
    try {
      const response = await toggleActionItem(meeting._id, index)
      setMeeting(response.data)
    } catch (error) {
      console.error('Failed to toggle:', error)
    }
  }

  return (
    <div className="mt-8 space-y-6">

      {/* Summary */}
      <div className={`rounded-xl p-6 border ${
        darkMode
          ? 'bg-blue-900/30 border-blue-700'
          : 'bg-blue-50 border-blue-100'
      }`}>
        <h3 className={`text-xl font-bold mb-2 ${
          darkMode ? 'text-blue-300' : 'text-blue-800'
        }`}>📋 Summary</h3>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
          {meeting.summary}
        </p>
      </div>

      {/* Key Points */}
      <div className={`rounded-xl shadow-md p-6 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-xl font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>💡 Key Points</h3>
        <ul className="space-y-2">
          {meeting.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Items */}
      <div className={`rounded-xl shadow-md p-6 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-xl font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>✅ Action Items</h3>
        <div className="space-y-3">
          {meeting.actionItems.map((item, index) => (
            <ActionItem
              key={index}
              item={item}
              onToggle={() => handleToggle(index)}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default MeetingResult