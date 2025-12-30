import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useTaskStore from '../store/taskStore'
import { formatDate, formatRelativeTime } from '../utils/formatters'
import { CATEGORY_COLORS, STATUS_COLORS, IMPORTANCE_COLORS, URGENCY_COLORS } from '../utils/constants'

const TaskDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchTask, updateTask, deleteTask, loading } = useTaskStore()
  const [task, setTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})

  useEffect(() => {
    loadTask()
  }, [id])

  const loadTask = async () => {
    try {
      const taskData = await fetchTask(parseInt(id))
      setTask(taskData)
      setEditData({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        importance: taskData.importance,
        urgency: taskData.urgency,
      })
    } catch (error) {
      console.error('Failed to load task:', error)
    }
  }

  const handleUpdate = async () => {
    try {
      await updateTask(parseInt(id), editData)
      setIsEditing(false)
      loadTask()
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteTask(parseInt(id))
        navigate('/')
      } catch (error) {
        console.error('Failed to delete task:', error)
      }
    }
  }

  if (loading || !task) {
    return <div className="loading">로딩 중...</div>
  }

  return (
    <div className="task-detail">
      <div className="task-detail-header">
        <button onClick={() => navigate('/')}>← 목록으로</button>
        <div className="task-detail-actions">
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)}>수정</button>
              <button className="delete-button" onClick={handleDelete}>삭제</button>
            </>
          ) : (
            <>
              <button onClick={handleUpdate}>저장</button>
              <button onClick={() => setIsEditing(false)}>취소</button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="task-detail-edit">
          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>설명</label>
            <textarea
              value={editData.description || ''}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              rows={5}
            />
          </div>
          <div className="form-group">
            <label>상태</label>
            <select
              value={editData.status}
              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
          <div className="form-group">
            <label>중요도</label>
            <select
              value={editData.importance}
              onChange={(e) => setEditData({ ...editData, importance: e.target.value })}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="form-group">
            <label>긴급도</label>
            <select
              value={editData.urgency}
              onChange={(e) => setEditData({ ...editData, urgency: e.target.value })}
            >
              <option value="Urgent">Urgent</option>
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="task-detail-content">
          <h1>{task.title}</h1>
          
          <div className="task-detail-badges">
            <span 
              className="badge" 
              style={{ backgroundColor: CATEGORY_COLORS[task.category] }}
            >
              {task.category}
            </span>
            <span 
              className="badge" 
              style={{ backgroundColor: STATUS_COLORS[task.status] }}
            >
              {task.status}
            </span>
            <span 
              className="badge" 
              style={{ backgroundColor: IMPORTANCE_COLORS[task.importance] }}
            >
              중요도: {task.importance}
            </span>
            <span 
              className="badge" 
              style={{ backgroundColor: URGENCY_COLORS[task.urgency] }}
            >
              긴급도: {task.urgency}
            </span>
          </div>

          {task.description && (
            <div className="task-detail-section">
              <h3>설명</h3>
              <p>{task.description}</p>
            </div>
          )}

          {task.tags && (
            <div className="task-detail-section">
              <h3>태그</h3>
              <div className="tags">
                {task.tags.split(',').map((tag, idx) => (
                  <span key={idx} className="tag">#{tag.trim()}</span>
                ))}
              </div>
            </div>
          )}

          <div className="task-detail-section">
            <h3>정보</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">생성일:</span>
                <span className="info-value">{formatDate(task.created_at)}</span>
                <span className="info-relative">({formatRelativeTime(task.created_at)})</span>
              </div>
              <div className="info-item">
                <span className="info-label">수정일:</span>
                <span className="info-value">{formatDate(task.updated_at)}</span>
                <span className="info-relative">({formatRelativeTime(task.updated_at)})</span>
              </div>
              {task.due_date && (
                <div className="info-item">
                  <span className="info-label">마감일:</span>
                  <span className="info-value">{formatDate(task.due_date)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskDetail

