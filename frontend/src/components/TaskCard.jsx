import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate, isOverdue } from '../utils/formatters'
import { CATEGORY_COLORS, STATUS_COLORS, IMPORTANCE_COLORS, URGENCY_COLORS } from '../utils/constants'

const TaskCard = ({ task }) => {
  const categoryColor = CATEGORY_COLORS[task.category] || '#6b7280'
  const statusColor = STATUS_COLORS[task.status] || '#6b7280'
  const importanceColor = IMPORTANCE_COLORS[task.importance] || '#6b7280'
  const urgencyColor = URGENCY_COLORS[task.urgency] || '#6b7280'
  const overdue = task.due_date && isOverdue(task.due_date) && task.status !== 'Done'

  return (
    <Link to={`/tasks/${task.id}`} className="task-card">
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
          <span 
            className="badge badge-importance" 
            style={{ backgroundColor: importanceColor }}
          >
            중요도: {task.importance}
          </span>
          <span 
            className="badge badge-urgency" 
            style={{ backgroundColor: urgencyColor }}
          >
            긴급도: {task.urgency}
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
            마감: {formatDate(task.due_date)}
            {overdue && <span className="overdue-badge">지연됨</span>}
          </div>
        )}
      </div>
    </Link>
  )
}

export default TaskCard

