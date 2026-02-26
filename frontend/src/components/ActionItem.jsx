function ActionItem({ item, onToggle }) {
  return (
    <div className={`p-4 rounded-lg border-l-4 transition-all
      ${item.completed ? 'bg-green-50 border-green-500 opacity-70' : 'bg-gray-50 border-blue-500'}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className={`font-medium ${item.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {item.task}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            👤 {item.assignee}  •  📅 {item.deadline}
          </p>
        </div>
        <button
          onClick={onToggle}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
            ${item.completed
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
        >
          {item.completed ? '↩️ Undo' : '✓ Done'}
        </button>
      </div>
    </div>
  )
}

export default ActionItem