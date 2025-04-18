import type { Schedule } from '@/types/Schedule'

export const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatSchedule = (schedule: Schedule) => {
  if (!schedule.days.length) return 'Not scheduled'
  return `${schedule.days.join(', ')} at ${schedule.time || 'TBA'}`
}
