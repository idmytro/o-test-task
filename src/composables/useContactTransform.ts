/*
    $angle: (180 / ($item-count - 1) );
    $rot: 180;

    @for $i from 1 through $item-count {
      &:nth-of-type(#{$i}) {
        transform: rotate($rot * 1deg) translate(calc($circle-size / 2)) rotate($rot * -1deg);
      }

      $rot: $rot + $angle;
    }
*/

// const circleSize = 60

function regularDistribution (circleSizeParam: number, itemsCountParam: number): string[] {
  let rot = 180
  const angle = 180 / (itemsCountParam - 1)
  const resultValue: string[] = []
  for (let i = 1; i <= itemsCountParam; i++) {
    const transformValue = `rotate(${rot}deg) translate(${circleSizeParam / 2}px) rotate(${-rot}deg)`
    resultValue.push(transformValue)
    rot += angle
  }
  return resultValue
}

function extendedDistribution (circleSizeParam: number, itemsCountParam: number): string[] {
  const firstHalf = Math.ceil(itemsCountParam / 2)
  const secondHalf = itemsCountParam - firstHalf

  let rot = 180
  const angle = 180 / (itemsCountParam + 1)
  const resultValue: string[] = []
  for (let i = 1; i <= firstHalf; i++) {
    const transformValue = `rotate(${rot}deg) translate(${circleSizeParam / 2}px) rotate(${-rot}deg)`
    resultValue.push(transformValue)
    rot += angle
  }
  rot += angle
  if (firstHalf === secondHalf)
    rot += angle

  for (let i = 1; i <= secondHalf; i++) {
    const transformValue = `rotate(${rot}deg) translate(${circleSizeParam / 2}px) rotate(${-rot}deg)`
    resultValue.push(transformValue)
    rot += angle
  }
  return resultValue
}

export function useContactTransform (
  circleSize: Ref<number>,
  itemsCount: Ref<number>,
  circleIndex: Ref<number>,
) {
  const result = ref<string[]>([])

  watch(
    [circleSize, itemsCount],
    ([newCircleSize, newItemsCount]) => {
      result.value = circleIndex.value <= 1
        ? extendedDistribution(newCircleSize, newItemsCount)
        : regularDistribution(newCircleSize, newItemsCount)
    },
    { immediate: true },
  )

  return result
}
