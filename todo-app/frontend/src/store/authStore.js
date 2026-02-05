import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true })
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      },

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const response = await axios.post(`${API_URL}/auth/login`, { email, password })
          get().setAuth(response.data.user, response.data.token)
          toast.success('Login successful!')
          return true
        } catch (error) {
          toast.error(error.response?.data?.error || 'Login failed')
          return false
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (email, password, name) => {
        set({ isLoading: true })
        try {
          const response = await axios.post(`${API_URL}/auth/register`, { email, password, name })
          get().setAuth(response.data.user, response.data.token)
          toast.success('Registration successful!')
          return true
        } catch (error) {
          toast.error(error.response?.data?.error || 'Registration failed')
          return false
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
        delete axios.defaults.headers.common['Authorization']
        toast.success('Logged out successfully')
      },

      updateProfile: async (data) => {
        try {
          const response = await axios.put(`${API_URL}/auth/me`, data)
          set({ user: response.data.user })
          toast.success('Profile updated successfully')
          return true
        } catch (error) {
          toast.error(error.response?.data?.error || 'Update failed')
          return false
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
)

// Set auth header if token exists
const token = useAuthStore.getState().token
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
