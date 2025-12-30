import React, { useEffect, useState, useRef } from 'react'
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
  const prevFiltersRef = useRef(JSON.stringify(filters))
  const isInitialMountRef = useRef(true)

  useEffect(() => {
    fetchTasks()
    fetchStats()
    isInitialMountRef.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // 초기 마운트 시에는 실행하지 않음
    if (isInitialMountRef.current) {
      prevFiltersRef.current = JSON.stringify(filters)
      return
    }
    
    // 필터가 실제로 변경되었는지 확인
    const currentFiltersString = JSON.stringify(filters)
    if (prevFiltersRef.current === currentFiltersString) {
      return
    }
    
    prevFiltersRef.current = currentFiltersString
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleStatCardClick = (type, value) => {
    if (type === 'all') {
      // 전체 클릭 시 필터 초기화
      resetFilters()
    } else if (type === 'status') {
      // 상태 카드 클릭 시 해당 상태로 필터링
      const newStatus = filters.status === value ? '' : value // 이미 선택된 상태면 해제
      handleFilterChange({ status: newStatus })
    } else if (type === 'urgency') {
      // 긴급도 카드 클릭 시 긴급도로 필터링
      const newUrgency = filters.urgency === 'Urgent' ? '' : 'Urgent'
      handleFilterChange({ urgency: newUrgency })
    }
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
          <div 
            className="stat-card"
            onClick={() => handleStatCardClick('all', null)}
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div className="stat-label">전체</div>
            <div className="stat-value">{stats.total}</div>
          </div>
          <div 
            className={`stat-card ${filters.status === 'Todo' ? 'active' : ''}`}
            onClick={() => handleStatCardClick('status', 'Todo')}
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div className="stat-label">할 일</div>
            <div className="stat-value">{stats.by_status.todo}</div>
          </div>
          <div 
            className={`stat-card ${filters.status === 'In Progress' ? 'active' : ''}`}
            onClick={() => handleStatCardClick('status', 'In Progress')}
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div className="stat-label">진행 중</div>
            <div className="stat-value">{stats.by_status.in_progress}</div>
          </div>
          <div 
            className={`stat-card ${filters.status === 'Done' ? 'active' : ''}`}
            onClick={() => handleStatCardClick('status', 'Done')}
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div className="stat-label">완료</div>
            <div className="stat-value">{stats.by_status.done}</div>
          </div>
          <div 
            className={`stat-card ${filters.status === 'Blocked' ? 'active' : ''}`}
            onClick={() => handleStatCardClick('status', 'Blocked')}
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div className="stat-label">차단됨</div>
            <div className="stat-value">{stats.by_status.blocked}</div>
          </div>
          <div 
            className={`stat-card urgent ${filters.urgency === 'Urgent' ? 'active' : ''}`}
            onClick={() => handleStatCardClick('urgency', 'Urgent')}
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
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

      <div className="dashboard-content" style={{ padding: '1rem', background: '#fff', borderRadius: '8px', minHeight: '400px' }}>
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

