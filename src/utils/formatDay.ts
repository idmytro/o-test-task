import { format } from 'date-fns'
import { DAY_FORMAT } from '../constants'

export function formatDay (day: Date): string {
  return format(day, DAY_FORMAT)
}
