import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const useTodoStore = create((set, get) => ({
  todos: [],
  filteredTodos: [],
  isLoading: false,
  filters: {
    status: 'all',
    priority: 'all',
    categoryId: 'all',
    search: '',
  },
  sortBy: 'createdAt',
  sortOrder: 'DESC',

  fetchTodos: async () => {
    set({ isLoading: true })
    try {
      const { filters, sortBy, sortOrder } = get()
      const params = {
        sortBy,
        sortOrder,
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.priority !== 'all' && { priority: filters.priority }),
        ...(filters.categoryId !== 'all' && { categoryId: filters.categoryId }),
        ...(filters.search && { search: filters.search }),
      }
      const response = await axios.get(`${API_URL}/todos`, { params })
      set({ todos: response.data.todos, filteredTodos: response.data.todos })
    } catch (error) {
      toast.error('Failed to fetch todos')
    } finally {
      set({ isLoading: false })
    }
  },

  createTodo: async (todoData) => {
    try {
      const response = await axios.post(`${API_URL}/todos`, todoData)
      set(state => ({ todos: [response.data.todo, ...state.todos] }))
      toast.success('Todo created successfully')
      return response.data.todo
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create todo')
      throw error
    }
  },

  updateTodo: async (id, todoData) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, todoData)
      set(state => ({
        todos: state.todos.map(todo => todo.id === id ? response.data.todo : todo)
      }))
      toast.success('Todo updated successfully')
      return response.data.todo
    } catch (error) {
      toast.error('Failed to update todo')
      throw error
    }
  },

  updateTodoStatus: async (id, status) => {
    try {
      const response = await axios.patch(`${API_URL}/todos/${id}/status`, { status })
      set(state => ({
        todos: state.todos.map(todo => todo.id === id ? response.data.todo : todo)
      }))
    } catch (error) {
      toast.error('Failed to update status')
    }
  },

  deleteTodo: async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`)
      set(state => ({
        todos: state.todos.filter(todo => todo.id !== id)
      }))
      toast.success('Todo moved to trash')
    } catch (error) {
      toast.error('Failed to delete todo')
    }
  },

  setFilters: (filters) => {
    set({ filters })
    get().fetchTodos()
  },

  setSort: (sortBy, sortOrder) => {
    set({ sortBy, sortOrder })
    get().fetchTodos()
  },
}))
