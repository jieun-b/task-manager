import { create } from 'zustand'
import { taskService } from '../services/taskService'

const useTaskStore = create((set, get) => ({
  tasks: [],
  stats: null,
  filters: {
    category: '',
    status: '',
    importance: '',
    urgency: '',
    search: '',
  },
  loading: false,
  error: null,

  // Task 목록 가져오기
  fetchTasks: async (filters = {}) => {
    set({ loading: true, error: null })
    try {
      const currentFilters = { ...get().filters, ...filters }
      console.log('Fetching tasks with filters:', currentFilters)
      const tasks = await taskService.getTasks(currentFilters)
      console.log('Tasks received:', tasks.length)
      set({ tasks, filters: currentFilters, loading: false, error: null })
    } catch (error) {
      console.error('Error fetching tasks:', error)
      const errorMessage = error.response?.data?.detail || error.message || 'Task 목록을 가져오는데 실패했습니다.'
      set({ error: errorMessage, loading: false, tasks: [] })
    }
  },

  // Task 상세 가져오기
  fetchTask: async (id) => {
    set({ loading: true, error: null })
    try {
      const task = await taskService.getTask(id)
      set({ loading: false })
      return task
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  // Task 생성
  createTask: async (taskData) => {
    set({ loading: true, error: null })
    try {
      const newTask = await taskService.createTask(taskData)
      set(state => ({ 
        tasks: [newTask, ...state.tasks], 
        loading: false 
      }))
      return newTask
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  // Task 업데이트
  updateTask: async (id, taskData) => {
    set({ loading: true, error: null })
    try {
      const updatedTask = await taskService.updateTask(id, taskData)
      set(state => ({
        tasks: state.tasks.map(task => 
          task.id === id ? updatedTask : task
        ),
        loading: false
      }))
      return updatedTask
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  // Task 삭제
  deleteTask: async (id) => {
    set({ loading: true, error: null })
    try {
      await taskService.deleteTask(id)
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id),
        loading: false
      }))
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  // 통계 가져오기
  fetchStats: async () => {
    try {
      console.log('Fetching stats...')
      const stats = await taskService.getDashboardStats()
      console.log('Stats received:', stats)
      set({ stats, error: null })
    } catch (error) {
      console.error('Error fetching stats:', error)
      const errorMessage = error.response?.data?.detail || error.message || '통계를 가져오는데 실패했습니다.'
      set({ error: errorMessage })
    }
  },

  // 필터 설정
  setFilters: (filters) => {
    set(state => ({
      filters: { ...state.filters, ...filters }
    }))
  },

  // 필터 초기화
  resetFilters: () => {
    set({
      filters: {
        category: '',
        status: '',
        importance: '',
        urgency: '',
        search: '',
      }
    })
  },
}))

export default useTaskStore

