export function getDaysDiff (from: string, to: string): number {
  const fromTime = new Date(from).getTime()
  const toTime = new Date(to).getTime()

  return (fromTime - toTime) / (1000 * 3600 * 24)
}
