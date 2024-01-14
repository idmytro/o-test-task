import { format } from 'date-fns'
import { DAY_FORMAT } from '../constants'
import { getDaysDiff } from './getDaysDiff'

export function getChunkDate (today: string, currentDay: string) {
  const diff = getDaysDiff(today, currentDay)
}
