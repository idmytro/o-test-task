<script setup lang="ts">
import type { ContactItemWithFormattedDate } from '../types'
import OrbitItem from './OrbitItem.vue'

type Props = {
  item: ContactItemWithFormattedDate | null
  index: number
  size: number
}

defineProps<Props>()
</script>

<template>
  <div
    v-if="item"
    class="
      circle |
      absolute top-100% left-50% -translate-x-1/2 -translate-y-1/2 -mt-30px
      transition-all duration-2000 rounded-full
    "
  >
    <OrbitItem
      v-if="item"
      v-bind="{
        item,
        index,
        size,
      }"
      class="z-3 text-center absolute inset-0"
    />
  </div>
</template>

<style>
.circle::before,
.circle::after {
  position: absolute;
  content: '';
  border-radius: 100%;
}

.circle::before {
  inset: 0;
  z-index: 2;
  background-color: black;
}

.circle::after {
  inset: -1px;
  z-index: 1;
  background: linear-gradient(#fff 0%, #fff0 50%);
}
</style>
