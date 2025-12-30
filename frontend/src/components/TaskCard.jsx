import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate, isOverdue } from '../utils/formatters'
import { CATEGORY_COLORS, STATUS_COLORS } from '../utils/constants'

const TaskCard = ({ task }) => {
  if (!task) {
    console.error('TaskCard: task 데이터가 없습니다')
    return <div style={{ padding: '1rem', background: '#fee', color: '#c33' }}>Task 데이터가 없습니다.</div>
  }

  try {
    const categoryColor = CATEGORY_COLORS[task.category] || '#6b7280'
    const statusColor = STATUS_COLORS[task.status] || '#6b7280'
    
    let overdue = false
    try {
      overdue = task.due_date && isOverdue(task.due_date) && task.status !== 'Done'
    } catch (e) {
      console.warn('TaskCard: isOverdue 계산 에러', e)
    }

    let formattedDueDate = task.due_date
    try {
      if (task.due_date) {
        formattedDueDate = formatDate(task.due_date)
      }
    } catch (e) {
      console.warn('TaskCard: 날짜 포맷 에러', e)
    }
    
    return (
      <Link to={`/tasks/${task.id}`} className="task-card" style={{ display: 'block', marginBottom: '1rem', textDecoration: 'none' }}>
        <div className="task-card-header">
          <h3 className="task-card-title">{task.title}</h3>
          <span 
            className="task-card-category" 
            style={{ backgroundColor: categoryColor }}
          >
            {task.category}
          </span>
        </div>
        
        {task.description && (
          <p className="task-card-description">{task.description}</p>
        )}
        
        <div className="task-card-meta">
          <div className="task-card-badges">
            <span 
              className="badge badge-status" 
              style={{ backgroundColor: statusColor }}
            >
              {task.status}
            </span>
          </div>
          
          {task.tags && (
            <div className="task-card-tags">
              {task.tags.split(',').map((tag, idx) => (
                <span key={idx} className="tag">#{tag.trim()}</span>
              ))}
            </div>
          )}
          
          {task.due_date && (
            <div className={`task-card-due ${overdue ? 'overdue' : ''}`}>
              마감: {formattedDueDate}
              {overdue && <span className="overdue-badge">지연됨</span>}
            </div>
          )}
        </div>
      </Link>
    )
  } catch (error) {
    console.error('TaskCard 렌더링 에러:', error)
    return (
      <div style={{ padding: '1rem', background: '#fee', color: '#c33', border: '1px solid #c33', borderRadius: '4px', marginBottom: '1rem' }}>
        <strong>Task 렌더링 에러:</strong> {error.message}
      </div>
    )
  }
}

export default TaskCard

