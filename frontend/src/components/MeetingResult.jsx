import { useState } from 'react'
import ActionItem from './ActionItem'
import { toggleActionItem } from '../services/api'

function MeetingResult({ meeting: initialMeeting }) {
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
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-bold text-blue-800 mb-2">📋 Summary</h3>
        <p className="text-gray-700">{meeting.summary}</p>
      </div>

      {/* Key Points */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Key Points</h3>
        <ul className="space-y-2">
          {meeting.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">✅ Action Items</h3>
        <div className="space-y-3">
          {meeting.actionItems.map((item, index) => (
            <ActionItem key={index} item={item} onToggle={() => handleToggle(index)} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default MeetingResult