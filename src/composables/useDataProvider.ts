import { format } from 'date-fns'
import type { ContactItem, ContactItemWithFormattedDate } from '../types'

import { getToday } from '../utils/getToday'
import { getPreviousChunkDay } from '../utils/getPreviousChunkDay'
import { getDaysRange } from '../utils/getDaysRange'

export function useDataProvider () {
  const today = getToday()

  const days = reactive<Record<string, ContactItemWithFormattedDate>>({})
  const currentDay = ref(today)

  function saveItems (items: ContactItem[]): void {
    items.forEach((item) => {
      days[item.contact_date] = {
        ...item,
        formatted_date: item.contact_date === today
          ? 'Today'
          : format(new Date(item.contact_date), 'EEE d MMM'),
      }
    })
  }

  function fetchItems (date: string | undefined): void {
    if (!date)
      return

    const url = `https://xwmi-5dlx-wkyj.t7.xano.io/api:oUvfVMO5/receive_week?start_date=${date}`

    fetch(url)
      .then(response => response.json())
      .then((items: ContactItem[]) => {
        saveItems(items)
      })
  }

  fetchItems(today)
  fetchItems(getPreviousChunkDay(today))

  function changeCurrentDay (dayParam: string): void {
    currentDay.value = dayParam

    const prevDay = getPreviousChunkDay(currentDay.value)

    if (!days[currentDay.value])
      fetchItems(currentDay.value)

    if (!days[prevDay])
      fetchItems(prevDay)
  }

  const prevChunkDay = computed(() => {
    return getPreviousChunkDay(currentDay.value)
  })

  const currentItems = computed(() => {
    const prevDay = getPreviousChunkDay(currentDay.value)

    return getDaysRange(today, prevDay).map(day => ({ ...days[day] }))
  })

  return {
    changeCurrentDay,
    currentItems,
    prevChunkDay,
  }
}
