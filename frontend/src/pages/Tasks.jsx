import React, { useEffect, useState, useRef } from 'react'
import useTaskStore from '../store/taskStore'
import TaskList from '../components/TaskList'
import KanbanBoard from '../components/KanbanBoard'
import FilterBar from '../components/FilterBar'

const Tasks = () => {
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
  
  const [viewMode, setViewMode] = useState('kanban') // 'list' or 'kanban'
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
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
    }
  }

  return (
    <div className="tasks-page notion-style">
      {/* 미니멀 헤더 */}
      <div className="notion-header">
        <h2 className="notion-title">Task Board</h2>
      </div>
      
      {/* 도구 바 */}
      <div className="notion-toolbar">
        <div className="notion-view-toggle">
          <button
            className={`notion-view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            ☰
          </button>
          <button
            className={`notion-view-btn ${viewMode === 'kanban' ? 'active' : ''}`}
            onClick={() => setViewMode('kanban')}
            title="Board View"
          >
            ▦
          </button>
        </div>
        <div className="notion-actions">
          <button 
            className="notion-btn icon-btn"
            onClick={() => setShowSearch(!showSearch)}
            title="Search"
          >
            🔍
          </button>
          <button 
            className={`notion-btn ${showFilterDropdown ? 'active' : ''}`}
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            Filter
          </button>
          <button className="notion-btn primary">+ New</button>
        </div>
      </div>

      {/* 검색 바 (토글) */}
      {showSearch && (
        <div className="notion-search-bar">
          <input
            type="text"
            placeholder="Search..."
            className="notion-search"
            value={filters.search || ''}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            autoFocus
          />
        </div>
      )}

      {/* 필터 드롭다운 */}
      {showFilterDropdown && stats && (
        <div className="notion-filter-dropdown">
          <div className="notion-filter-dropdown-content">
            <div className="notion-filter-section">
              <div className="notion-filter-section-title">Status</div>
              <div className="notion-filter-options">
                <button
                  className={`notion-filter-option ${!filters.status ? 'active' : ''}`}
                  onClick={() => {
                    handleStatCardClick('all', null)
                    setShowFilterDropdown(false)
                  }}
                >
                  <span>All</span>
                  <span className="filter-count">{stats.total}</span>
                </button>
                <button
                  className={`notion-filter-option ${filters.status === 'Todo' ? 'active' : ''}`}
                  onClick={() => {
                    handleStatCardClick('status', 'Todo')
                    setShowFilterDropdown(false)
                  }}
                >
                  <span>Todo</span>
                  <span className="filter-count">{stats.by_status.todo}</span>
                </button>
                <button
                  className={`notion-filter-option ${filters.status === 'In Progress' ? 'active' : ''}`}
                  onClick={() => {
                    handleStatCardClick('status', 'In Progress')
                    setShowFilterDropdown(false)
                  }}
                >
                  <span>In Progress</span>
                  <span className="filter-count">{stats.by_status.in_progress}</span>
                </button>
                <button
                  className={`notion-filter-option ${filters.status === 'Done' ? 'active' : ''}`}
                  onClick={() => {
                    handleStatCardClick('status', 'Done')
                    setShowFilterDropdown(false)
                  }}
                >
                  <span>Done</span>
                  <span className="filter-count">{stats.by_status.done}</span>
                </button>
                <button
                  className={`notion-filter-option ${filters.status === 'Blocked' ? 'active' : ''}`}
                  onClick={() => {
                    handleStatCardClick('status', 'Blocked')
                    setShowFilterDropdown(false)
                  }}
                >
                  <span>Blocked</span>
                  <span className="filter-count">{stats.by_status.blocked}</span>
                </button>
              </div>
            </div>
            {(filters.category || filters.status || filters.search) && (
              <div className="notion-filter-dropdown-footer">
                <button className="notion-filter-clear" onClick={() => {
                  resetFilters()
                  setShowFilterDropdown(false)
                }}>
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 활성 필터 표시 */}
      {filters.status && (
        <div className="notion-active-filters">
          <span className="notion-active-filter-chip">
            {filters.status}
            <button onClick={() => handleFilterChange({ status: '' })}>×</button>
          </span>
        </div>
      )}

      {/* 고급 필터 (접을 수 있음) */}
      {filters.category && (
        <div className="notion-advanced-filters">
          <FilterBar 
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>
      )}

      {error && (
        <div className="error-message" style={{ padding: '1rem', background: '#fee', color: '#c33', margin: '1rem', borderRadius: '8px' }}>
          에러: {error}
        </div>
      )}

      {/* 칸반 보드 */}
      <div className="notion-board-container">
        {viewMode === 'list' ? (
          <TaskList tasks={tasks} loading={loading} />
        ) : (
          <KanbanBoard tasks={tasks} loading={loading} stats={stats} />
        )}
      </div>
    </div>
  )
}

export default Tasks

