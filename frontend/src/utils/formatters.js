import { format, formatDistanceToNow, isPast } from 'date-fns'

export const formatDate = (date) => {
  if (!date) return '-'
  return format(new Date(date), 'yyyy-MM-dd HH:mm')
}

export const formatRelativeTime = (date) => {
  if (!date) return '-'
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const isOverdue = (dueDate) => {
  if (!dueDate) return false
  return isPast(new Date(dueDate))
}

