import api from './api'

export const taskService = {
  // Task 목록 조회
  getTasks: async (filters = {}) => {
    const params = new URLSearchParams()
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        params.append(key, filters[key])
      }
    })
    const queryString = params.toString()
    const url = `/api/tasks${queryString ? `?${queryString}` : ''}/`
    const response = await api.get(url)
    return response.data
  },

  // Task 상세 조회
  getTask: async (id) => {
    const response = await api.get(`/api/tasks/${id}`)
    return response.data
  },

  // Task 생성
  createTask: async (taskData) => {
    const response = await api.post('/api/tasks', taskData)
    return response.data
  },

  // Task 업데이트
  updateTask: async (id, taskData) => {
    const response = await api.put(`/api/tasks/${id}`, taskData)
    return response.data
  },

  // Task 삭제
  deleteTask: async (id) => {
    await api.delete(`/api/tasks/${id}`)
  },

  // 대시보드 통계
  getDashboardStats: async () => {
    const response = await api.get('/api/dashboard/stats')
    return response.data
  },
}

