<script setup lang="ts">
import type { ContactItemWithFormattedDate } from '../types'
import { useContactTransform } from '../composables/useContactTransform'
import ContactItem from './ContactItem.vue'

type Props = {
  item: ContactItemWithFormattedDate
  index: number
  size: number
}

const props = defineProps<Props>()

const itemsCount = computed(() => {
  return (props.item.array?.length || 0) + 2
})

const transforms = useContactTransform(
  computed(() => props.size),
  itemsCount,
  computed(() => props.index),
)
</script>

<template>
  <div data-component="OrbitItem" class="OrbitItem rounded-full">
    <p
      class="transition-all duration-2000 text-18px -mt-15px pointer-events-none"
      :class="index === 1 ? 'opacity-100' : 'opacity-0'"
    >
      <span
        v-show="item.formatted_date"
        class="
        bg-black px-2px relative z-3
         font-helvetica text-#929292
        "
      >
        {{ item.formatted_date }}
      </span>
    </p>
    <ol
      class="
        circle-container |
        absolute inset-0 transition-all duration-2000
      "
    >
      <li v-show="false"></li>
      <li
        v-for="(contact, itemIndex) in item.array"
        :key="contact.id"
        class="transition-all duration-2000 overflow-hidden"
        style="box-shadow: 0 0 0 7px var(--black-100)"
        :style="`transform: ${transforms[itemIndex + 1]}`"
      >
        <ContactItem :data="contact" />
      </li>
      <li v-show="false"></li>
    </ol>
  </div>
</template>

<style>
.circle-container {
  --item-size: 60px;

  position: relative;
  width:  var(--circle-size);
  height: var(--circle-size);
  border-radius: 50%;
  padding: 0;
  list-style: none;
}

.circle-container li {
  background-color: #000;
  border-radius: 50%;
  display: block;
  position: absolute;
  top:  50%;
  left: 50%;
  margin: calc(-1 * (var(--item-size) / 2));
  width:  var(--item-size);
  height: var(--item-size);
}
</style>
