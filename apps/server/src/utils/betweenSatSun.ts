import { endOfWeek, startOfWeek } from 'date-fns'

export const betweenSaturdayAndSunday = (date = new Date()) => {
  const startDate = startOfWeek(date)
  const endDate = endOfWeek(date)
  return { arr: [startDate, endDate], startDate, endDate }
}

console.log(betweenSaturdayAndSunday().arr)
