import React, { useEffect, useState } from 'react'
import useTaskStore from '../store/taskStore'
import TaskList from '../components/TaskList'
import KanbanBoard from '../components/KanbanBoard'
import FilterBar from '../components/FilterBar'

const Dashboard = () => {
  const { 
    tasks, 
    stats, 
    filters, 
    loading, 
    error,
    fetchTasks, 
    fetchStats, 
    setFilters, 
    resetFilters 
  } = useTaskStore()
  
  const [viewMode, setViewMode] = useState('list') // 'list' or 'kanban'

  useEffect(() => {
    fetchTasks()
    fetchStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>대시보드</h2>
        <div className="view-toggle">
          <button 
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            리스트
          </button>
          <button 
            className={viewMode === 'kanban' ? 'active' : ''}
            onClick={() => setViewMode('kanban')}
          >
            칸반
          </button>
        </div>
      </div>

      {stats && (
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-label">전체</div>
            <div className="stat-value">{stats.total}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">할 일</div>
            <div className="stat-value">{stats.by_status.todo}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">진행 중</div>
            <div className="stat-value">{stats.by_status.in_progress}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">완료</div>
            <div className="stat-value">{stats.by_status.done}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">차단됨</div>
            <div className="stat-value">{stats.by_status.blocked}</div>
          </div>
          <div className="stat-card urgent">
            <div className="stat-label">긴급</div>
            <div className="stat-value">{stats.urgent_count}</div>
          </div>
        </div>
      )}

      <FilterBar 
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />

      {error && (
        <div className="error-message" style={{ padding: '1rem', background: '#fee', color: '#c33', margin: '1rem' }}>
          에러: {error}
        </div>
      )}

      <div className="dashboard-content">
        {viewMode === 'list' ? (
          <TaskList tasks={tasks} loading={loading} />
        ) : (
          <KanbanBoard tasks={tasks} loading={loading} />
        )}
      </div>
    </div>
  )
}

export default Dashboard

