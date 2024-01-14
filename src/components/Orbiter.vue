<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'

import { useDataProvider } from '../composables/useDataProvider'
import OrbitList from './OrbitList.vue'

type Props = {
  width: number
  height: number
}

defineProps<Props>()

const {
  currentItems: items,
  changeCurrentDay,
} = useDataProvider()

const currentDayIndex = ref(0)

function handleCurrentDayChange () {
  const value = items.value[currentDayIndex.value]?.contact_date
  // console.log(currentDayIndex.value, value)

  changeCurrentDay(value)
}

function handleUp () {
  if (currentDayIndex.value === 0)
    return
  currentDayIndex.value--
  handleCurrentDayChange()
}

function handleDown () {
  currentDayIndex.value++
  handleCurrentDayChange()
}

onKeyStroke('ArrowDown', (e) => {
  e.preventDefault()
  handleDown()
})

onKeyStroke('ArrowUp', (e) => {
  e.preventDefault()
  handleUp()
})
</script>

<template>
  <div
    data-component="Orbiter"
    class="relative"
    :style="`width: ${width}px; height: ${height}px;`"
  >
    <OrbitList
      v-if="items"
      v-bind="{
        width,
        height,
        currentDayIndex,
        items,
      }"
    />
  </div>
</template>
