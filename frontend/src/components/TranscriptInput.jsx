function TranscriptInput({ transcript, setTranscript, title, setTitle, onAnalyze, loading, darkMode }) {
  return (
    <div className={`rounded-xl shadow-md p-6 space-y-4 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>

      <div>
        <label className={`block text-sm font-medium mb-1 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>Meeting Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Q4 Planning Meeting"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none
                      focus:ring-2 focus:ring-blue-500 ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>Meeting Transcript</label>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste your meeting transcript here..."
          rows={10}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none
                      focus:ring-2 focus:ring-blue-500 resize-none ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        />
      </div>

      <button
        onClick={onAnalyze}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                   hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
      >
        {loading ? '⏳ Analyzing with AI...' : '🚀 Analyze Meeting'}
      </button>

    </div>
  )
}

export default TranscriptInput