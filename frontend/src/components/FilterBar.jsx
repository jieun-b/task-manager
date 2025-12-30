import React from 'react'
import { TASK_CATEGORIES } from '../utils/constants'

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
    <div className="notion-advanced-filter-bar">
      <div className="notion-filter-group">
        <select
          value={filters.category || ''}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="notion-filter-select"
        >
          <option value="">Category</option>
          {Object.values(TASK_CATEGORIES).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FilterBar

