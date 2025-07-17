export const convertToLocalTime = (utcTime: string) => {
  if (!utcTime) return ''
  const date = new Date(utcTime)
  return date.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}
