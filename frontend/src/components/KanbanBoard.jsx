import React from 'react'
import TaskCard from './TaskCard'
import { TASK_STATUS } from '../utils/constants'

const KanbanBoard = ({ tasks, loading }) => {
  if (loading) {
    return <div className="loading">로딩 중...</div>
  }

  const columns = [
    { status: TASK_STATUS.TODO, title: '할 일' },
    { status: TASK_STATUS.IN_PROGRESS, title: '진행 중' },
    { status: TASK_STATUS.DONE, title: '완료' },
    { status: TASK_STATUS.BLOCKED, title: '차단됨' },
  ]

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status)
  }

  return (
    <div className="kanban-board">
      {columns.map(column => {
        const columnTasks = getTasksByStatus(column.status)
        return (
          <div key={column.status} className="kanban-column">
            <div className="kanban-column-header">
              <h3>{column.title}</h3>
              <span className="task-count">{columnTasks.length}</span>
            </div>
            <div className="kanban-column-content">
              {columnTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              {columnTasks.length === 0 && (
                <div className="empty-column">Task가 없습니다</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoard

