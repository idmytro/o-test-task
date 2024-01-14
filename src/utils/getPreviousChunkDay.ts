import { addDays } from 'date-fns'
import { CHUNK_SIZE } from '../constants'
import { formatDay } from './formatDay'

export function getPreviousChunkDay (day: string): string {
  const date = day ? new Date(day) : new Date()

  return formatDay(addDays(date, -CHUNK_SIZE))
}
