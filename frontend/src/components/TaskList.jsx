import React from 'react'
import TaskCard from './TaskCard'

const TaskList = ({ tasks, loading }) => {
  if (loading) {
    return (
      <div className="loading" style={{ padding: '2rem', textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
        로딩 중...
      </div>
    )
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>Task가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="task-list" style={{ padding: '1rem', background: '#f9fafb', minHeight: '200px' }}>
      {tasks.map((task, index) => (
        <TaskCard key={task.id || index} task={task} />
      ))}
    </div>
  )
}

export default TaskList

