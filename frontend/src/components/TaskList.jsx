import React from 'react'
import TaskCard from './TaskCard'

const TaskList = ({ tasks, loading }) => {
  if (loading) {
    return <div className="loading">로딩 중...</div>
  }

  if (tasks.length === 0) {
    return <div className="empty-state">Task가 없습니다.</div>
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

export default TaskList

