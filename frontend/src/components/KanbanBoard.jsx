import React from 'react'
import TaskCard from './TaskCard'
import { TASK_STATUS } from '../utils/constants'

const KanbanBoard = ({ tasks, loading, stats }) => {
  if (loading) {
    return <div className="loading">로딩 중...</div>
  }

  const columns = [
    { status: TASK_STATUS.TODO, title: 'Todo' },
    { status: TASK_STATUS.IN_PROGRESS, title: 'In Progress' },
    { status: TASK_STATUS.DONE, title: 'Done' },
    { status: TASK_STATUS.BLOCKED, title: 'Blocked' },
  ]

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status)
  }

  const getCountForStatus = (status) => {
    if (!stats) return 0
    const statusMap = {
      [TASK_STATUS.TODO]: stats.by_status.todo,
      [TASK_STATUS.IN_PROGRESS]: stats.by_status.in_progress,
      [TASK_STATUS.DONE]: stats.by_status.done,
      [TASK_STATUS.BLOCKED]: stats.by_status.blocked,
    }
    return statusMap[status] || 0
  }

  return (
    <div className="notion-kanban-board">
      {columns.map(column => {
        const columnTasks = getTasksByStatus(column.status)
        const count = getCountForStatus(column.status)
        
        return (
          <div key={column.status} className="notion-kanban-column">
            <div className="notion-column-header">
              <span className="notion-column-title">{column.title}</span>
              <span className="notion-column-count">{count}</span>
            </div>
            <div className="notion-column-content">
              {columnTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              {columnTasks.length === 0 && (
                <div className="notion-empty-column">No tasks</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoard

