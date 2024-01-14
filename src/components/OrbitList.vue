<script setup lang="ts">
import type { ContactItemWithFormattedDate } from '../types'
import { useCircleSizes } from '../composables/useCircleSizes'
import OrbitCircle from './OrbitCircle.vue'

type Props = {
  items: (ContactItemWithFormattedDate | null)[]
  currentDayIndex: number
  width: number
  height: number
}

const props = defineProps<Props>()

const { cssVariables, getCircleSize } = useCircleSizes(
  computed(() => props.width),
)

function getCircleIndex (index: number): number {
  return index - props.currentDayIndex
}

function getCircleClass (index: number): string {
  const circleIndex = getCircleIndex(index)

  return circleIndex <= 0 || circleIndex >= 8 ? 'opacity-0' : 'opacity-100'
}

function getCircleStyle (index: number): string {
  const circleIndex = getCircleIndex(index)

  return `
    --circle-size: var(--circle${circleIndex});
    --items-count: ${props.items[index]?.array?.length};
    width: var(--circle-size);
    height: var(--circle-size);
  `
}

const logoMargin = computed(() => {
  const marginBase = 40
  return props.width * marginBase / 1920
})
</script>

<template>
  <div
    data-component="OrbitList"
    class="size-inherit bg-$black-100 relative overflow-y-hidden overflow-x-visible"
    :style="{
      ...cssVariables,
      '--logo-margin': `-${logoMargin}px`,
    }"
  >
    <ul
      class="transition-all duration-2000"
    >
      <li
        v-for="(item, index) in items"
        :key="index + 1"
      >
        <OrbitCircle
          v-if="item"
          v-bind="{
            item,
            index: getCircleIndex(index),
            size: getCircleSize(getCircleIndex(index)),
          }"
          :class="getCircleClass(index)"
          :style="getCircleStyle(index)"
        />
      </li>
    </ul>
    <div
      class="
        absolute
        left-50% top-100%
        w-75px
        -translate-x-1/2
        -translate-y-100%
        mt-$logo-margin
      "
    >
      <img src="/avatar-round.png" class="w-full">
    </div>
  </div>
</template>
