<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import Orbiter from './components/Orbiter.vue'

const { width: windowW, height: windowH } = useWindowSize()

const sizes = computed(() => {
  const widthIsBase = (windowW.value / 16) < (windowH.value / 9)

  return widthIsBase
    ? {
        width: windowW.value,
        height: windowW.value * (9 / 16),
      }
    : {
        width: windowH.value * (16 / 9),
        height: windowH.value,
      }
})
</script>

<template>
  <div
    class="
      App |
      w-screen h-screen bg-$black-100 bg-opacity-100
      flex justify-center items-center
    "
  >
    <Orbiter v-bind="sizes" />
  </div>
</template>
