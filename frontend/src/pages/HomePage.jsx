import { useState } from 'react'
import toast from 'react-hot-toast'
import TranscriptInput from '../components/TranscriptInput'
import MeetingResult from '../components/MeetingResult'
import { analyzeMeeting } from '../services/api'

function HomePage() {
  const [transcript, setTranscript] = useState('')
  const [title,      setTitle]      = useState('')
  const [result,     setResult]     = useState(null)
  const [loading,    setLoading]    = useState(false)

  const handleAnalyze = async () => {
    if (!transcript.trim()) {
      // ← Red error toast instead of boring error text
      toast.error('Please paste a meeting transcript first.')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await analyzeMeeting(transcript, title)
      setResult(response.data)
      // ← Green success toast
      toast.success('Meeting analyzed successfully!')
    } catch (err) {
      // ← Red error toast
      toast.error(err.response?.data?.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Paste Your Meeting Transcript
        </h2>
        <p className="text-gray-500 mt-2">
          AI will instantly generate a summary, key points, and action items.
        </p>
      </div>

      <TranscriptInput
        transcript={transcript}   setTranscript={setTranscript}
        title={title}             setTitle={setTitle}
        onAnalyze={handleAnalyze} loading={loading}
      />

      {result && <MeetingResult meeting={result} />}
    </main>
  )
}

export default HomePage