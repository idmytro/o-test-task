import { format } from 'date-fns'
import { DAY_FORMAT } from '../constants'

export function getToday (): string {
  return format(new Date(), DAY_FORMAT)
}
