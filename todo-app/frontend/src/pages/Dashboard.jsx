import { useEffect, useState } from 'react'
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react'
import { useTodoStore } from '../store/todoStore'
import { format, isToday, isPast } from 'date-fns'

export default function Dashboard() {
  const { todos, fetchTodos } = useTodoStore()
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  })

  useEffect(() => {
    fetchTodos()
  }, [])

  useEffect(() => {
    const completed = todos.filter(t => t.status === 'completed').length
    const pending = todos.filter(t => t.status !== 'completed' && !t.isDeleted).length
    const overdue = todos.filter(t => 
      t.dueDate && isPast(new Date(t.dueDate)) && t.status !== 'completed'
    ).length

    setStats({
      total: todos.length,
      completed,
      pending,
      overdue,
    })
  }, [todos])

  const todayTodos = todos.filter(t => 
    t.dueDate && isToday(new Date(t.dueDate)) && t.status !== 'completed'
  )

  const statCards = [
    { title: 'Total Tasks', value: stats.total, icon: CheckCircle2, color: 'blue' },
    { title: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'green' },
    { title: 'Pending', value: stats.pending, icon: Clock, color: 'yellow' },
    { title: 'Overdue', value: stats.overdue, icon: AlertCircle, color: 'red' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back! Here's your task overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            yellow: 'bg-yellow-100 text-yellow-600',
            red: 'bg-red-100 text-red-600',
          }
          
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Today's Tasks</h2>
        </div>
        <div className="p-6">
          {todayTodos.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No tasks due today</p>
          ) : (
            <div className="space-y-3">
              {todayTodos.map(todo => (
                <div key={todo.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{todo.title}</h3>
                    <p className="text-sm text-gray-600">
                      Due: {format(new Date(todo.dueDate), 'h:mm a')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    todo.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                    todo.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {todo.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
