import React, { useMemo } from 'react'
import TaskCard from './TaskCard'

const TaskList = ({ tasks, loading }) => {
  // 최신순으로 정렬 (created_at 기준, 없으면 updated_at)
  const sortedTasks = useMemo(() => {
    if (!tasks || tasks.length === 0) return []
    
    return [...tasks].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at) : (a.updated_at ? new Date(a.updated_at) : new Date(0))
      const dateB = b.created_at ? new Date(b.created_at) : (b.updated_at ? new Date(b.updated_at) : new Date(0))
      return dateB - dateA // 최신순 (내림차순)
    })
  }, [tasks])

  if (loading) {
    return (
      <div className="loading" style={{ padding: '2rem', textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
        로딩 중...
      </div>
    )
  }

  if (!sortedTasks || sortedTasks.length === 0) {
    return (
      <div className="empty-state">
        <p>Task가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="notion-task-list">
      {sortedTasks.map((task, index) => (
        <TaskCard key={task.id || index} task={task} />
      ))}
    </div>
  )
}

export default TaskList

