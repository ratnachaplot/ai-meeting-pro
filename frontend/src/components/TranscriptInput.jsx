function TranscriptInput({ transcript, setTranscript, title, setTitle, onAnalyze, loading }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Q4 Planning Meeting"
          className="w-full border border-gray-300 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Transcript</label>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste your meeting transcript here..."
          rows={10}
          className="w-full border border-gray-300 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <button
        onClick={onAnalyze}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                   hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? '⏳ Analyzing with AI...' : '🚀 Analyze Meeting'}
      </button>

    </div>
  )
}

export default TranscriptInput