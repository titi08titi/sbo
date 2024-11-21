export const splitPeriod = (period: string) => {
  if (!period) {
    throw new Error('Invalid period. Expected format is month-year.')
  }
  const parts = period.split('-')
  if (parts.length !== 2) {
    throw new Error('Invalid period format. Expected format is month-year.')
  }
  const month = parts[1]
  const year = parts[0]
  return { month, year }
}
