import React from 'react'
import { TASK_CATEGORIES, TASK_STATUS, IMPORTANCE, URGENCY } from '../utils/constants'

const FilterBar = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>검색</label>
        <input
          type="text"
          placeholder="제목 또는 설명 검색..."
          value={filters.search || ''}
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>

      <div className="filter-group">
        <label>카테고리</label>
        <select
          value={filters.category || ''}
          onChange={(e) => onFilterChange({ category: e.target.value })}
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
          onChange={(e) => onFilterChange({ status: e.target.value })}
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
          onChange={(e) => onFilterChange({ importance: e.target.value })}
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
          onChange={(e) => onFilterChange({ urgency: e.target.value })}
        >
          <option value="">전체</option>
          {Object.values(URGENCY).map(urg => (
            <option key={urg} value={urg}>{urg}</option>
          ))}
        </select>
      </div>

      <button className="reset-button" onClick={onReset}>
        필터 초기화
      </button>
    </div>
  )
}

export default FilterBar

