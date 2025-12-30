import React from 'react'
import { TASK_CATEGORIES, TASK_STATUS, IMPORTANCE, URGENCY } from '../utils/constants'

const FilterBar = ({ filters, onFilterChange, onReset }) => {
  const handleFilterChange = (key, value) => {
    if (!onFilterChange) {
      console.error('FilterBar: onFilterChange 함수가 없습니다')
      return
    }
    try {
      onFilterChange({ [key]: value })
    } catch (error) {
      console.error('FilterBar: 필터 변경 에러', error)
    }
  }

  const handleReset = () => {
    if (!onReset) {
      console.error('FilterBar: onReset 함수가 없습니다')
      return
    }
    try {
      onReset()
    } catch (error) {
      console.error('FilterBar: 필터 초기화 에러', error)
    }
  }

  return (
    <div className="filter-bar" style={{ position: 'relative', zIndex: 1 }}>
      <div className="filter-group">
        <label>검색</label>
        <input
          type="text"
          placeholder="제목 또는 설명 검색..."
          value={filters.search || ''}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>카테고리</label>
        <select
          value={filters.category || ''}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          style={{ cursor: 'pointer', zIndex: 10 }}
        >
          <option value="">전체</option>
          {Object.values(TASK_CATEGORIES).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>상태</label>
        <select
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          style={{ cursor: 'pointer', zIndex: 10 }}
        >
          <option value="">전체</option>
          {Object.values(TASK_STATUS).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>중요도</label>
        <select
          value={filters.importance || ''}
          onChange={(e) => handleFilterChange('importance', e.target.value)}
          style={{ cursor: 'pointer', zIndex: 10 }}
        >
          <option value="">전체</option>
          {Object.values(IMPORTANCE).map(imp => (
            <option key={imp} value={imp}>{imp}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>긴급도</label>
        <select
          value={filters.urgency || ''}
          onChange={(e) => handleFilterChange('urgency', e.target.value)}
          style={{ cursor: 'pointer', zIndex: 10 }}
        >
          <option value="">전체</option>
          {Object.values(URGENCY).map(urg => (
            <option key={urg} value={urg}>{urg}</option>
          ))}
        </select>
      </div>

      <button 
        className="reset-button" 
        onClick={handleReset}
        style={{ cursor: 'pointer', zIndex: 10 }}
      >
        필터 초기화
      </button>
    </div>
  )
}

export default FilterBar

