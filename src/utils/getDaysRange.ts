import { addDays } from 'date-fns'
import { formatDay } from './formatDay'

export function getDaysRange (from: string, to: string): string[] {
  const days = []
  let current = from
  current = formatDay(addDays(new Date(current), +1))

  while (current >= to) {
    days.push(current)
    current = formatDay(addDays(new Date(current), -1))
  }
  return days
}
