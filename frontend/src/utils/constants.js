export const TASK_CATEGORIES = {
  TASK: '업무',
  REQUEST: '요청',
  ANNOUNCEMENT: '공지',
  QUESTION: '질문',
  DISCUSSION: '논의',
}

export const TASK_STATUS = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  BLOCKED: 'Blocked',
}

export const IMPORTANCE = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
}

export const URGENCY = {
  URGENT: 'Urgent',
  NORMAL: 'Normal',
  LOW: 'Low',
}

export const CATEGORY_COLORS = {
  [TASK_CATEGORIES.TASK]: '#3b82f6',
  [TASK_CATEGORIES.REQUEST]: '#f59e0b',
  [TASK_CATEGORIES.ANNOUNCEMENT]: '#10b981',
  [TASK_CATEGORIES.QUESTION]: '#8b5cf6',
  [TASK_CATEGORIES.DISCUSSION]: '#ec4899',
}

export const STATUS_COLORS = {
  [TASK_STATUS.TODO]: '#6b7280',
  [TASK_STATUS.IN_PROGRESS]: '#3b82f6',
  [TASK_STATUS.DONE]: '#10b981',
  [TASK_STATUS.BLOCKED]: '#ef4444',
}

export const IMPORTANCE_COLORS = {
  [IMPORTANCE.HIGH]: '#ef4444',
  [IMPORTANCE.MEDIUM]: '#f59e0b',
  [IMPORTANCE.LOW]: '#6b7280',
}

export const URGENCY_COLORS = {
  [URGENCY.URGENT]: '#ef4444',
  [URGENCY.NORMAL]: '#3b82f6',
  [URGENCY.LOW]: '#6b7280',
}

