import { CheckCircle2, Circle, Trash2, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { useTodoStore } from '../../store/todoStore'

export default function TodoItem({ todo }) {
  const { updateTodoStatus, deleteTodo } = useTodoStore()

  const toggleComplete = () => {
    const newStatus = todo.status === 'completed' ? 'to_do' : 'completed'
    updateTodoStatus(todo.id, newStatus)
  }

  const priorityColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-orange-100 text-orange-700',
    urgent: 'bg-red-100 text-red-700',
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
      <div className="flex items-start space-x-4">
        <button
          onClick={toggleComplete}
          className="flex-shrink-0 mt-1 focus:outline-none"
        >
          {todo.status === 'completed' ? (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400 hover:text-blue-600" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${
                todo.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {todo.description}
                </p>
              )}
            </div>
            
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-4 text-red-600 hover:text-red-700 focus:outline-none"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>

            {todo.category && (
              <span
                className="px-2 py-1 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: todo.category.color + '20',
                  color: todo.category.color,
                }}
              >
                {todo.category.name}
              </span>
            )}

            {todo.dueDate && (
              <span className="inline-flex items-center px-2 py-1 text-xs text-gray-600">
                <Clock className="w-3 h-3 mr-1" />
                {format(new Date(todo.dueDate), 'MMM d, yyyy')}
              </span>
            )}

            {todo.tags && todo.tags.map(tag => (
              <span key={tag.id} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
