export function useCircleSizes (width: Ref<number>) {
  const circle7 = computed(() => width.value / 4)
  const step = computed(() => (width.value - circle7.value) / 6 - 10)

  const circle8 = computed(() => circle7.value - step.value * 1)
  const circle6 = computed(() => circle7.value + step.value * 1)
  const circle5 = computed(() => circle7.value + step.value * 2)
  const circle4 = computed(() => circle7.value + step.value * 3)
  const circle3 = computed(() => circle7.value + step.value * 4)
  const circle2 = computed(() => circle7.value + step.value * 5)
  const circle1 = computed(() => circle7.value + step.value * 6)
  const circle0 = computed(() => circle7.value + step.value * 7)

  const circleSizesArray = computed(() => [
    circle0.value,
    circle1.value,
    circle2.value,
    circle3.value,
    circle4.value,
    circle5.value,
    circle6.value,
    circle7.value,
    circle8.value,
  ])

  const cssVariables = computed(() => {
    return {
      '--circle8': `${circle8.value}px`,
      '--circle7': `${circle7.value}px`,
      '--circle6': `${circle6.value}px`,
      '--circle5': `${circle5.value}px`,
      '--circle4': `${circle4.value}px`,
      '--circle3': `${circle3.value}px`,
      '--circle2': `${circle2.value}px`,
      '--circle1': `${circle1.value}px`,
      '--circle0': `${circle0.value}px`,
    }
  })

  function getCircleSize (index: number): number {
    if (index > 8)
      return 9999999
    if (index < 0)
      return 0

    return circleSizesArray.value[index]
  }

  return {
    cssVariables,
    getCircleSize,
    circle8,
    circle7,
    circle6,
    circle5,
    circle4,
    circle3,
    circle2,
    circle1,
    circle0,
  }
}
