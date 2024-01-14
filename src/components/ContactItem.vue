<script setup lang="ts">
import {
  HoverCardContent,
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
} from 'radix-vue'
import { formatDistanceToNow } from 'date-fns'
import type { ContactData } from '../types'

type Props = {
  data: ContactData
}

const props = defineProps<Props>()

const hoverState = ref(false)

const clampState = ref(true)

watchEffect(() => {
  if (hoverState.value === false)
    clampState.value = true
})

const date = computed(() => {
  const date = new Date(props.data.created_at)

  return `${date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'EST',
  })} EST`
})

const daysAgo = computed(() => {
  const date = new Date(props.data.created_at)

  return formatDistanceToNow(date, { addSuffix: true })
})
</script>

<template>
  <HoverCardRoot v-model:open="hoverState" :close-delay="1000">
    <HoverCardTrigger class="block cursor-pointer size-60px">
      <div class="rounded-full p-1px bg-gradient-to-b from-white size-full">
        <img :src="data.img" class="object-cover h-full w-full rounded-full">
      </div>
    </HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent
        class="
          data-[side=right]:animate-slideLeftAndFade
          data-[side=left]:animate-slideRightAndFade
          data-[side=top]:animate-slideDownAndFade
          data-[state=open]:transition-all
          -ml-1px
          data-[side=bottom]:-mt-60px
          data-[side=top]:-mb-60px
          data-[side=top]:duration-0
          w-502px
          bg-gradient-to-b from-#B5B5B5 to-#2C2C2C p-1px
          rounded-10px
        "
        :data-side-offset="5"
        align="start"
        sticky="always"
      >
        <div class="bg-$black-100 rounded-9px p-10px font-inter">
          <div class="flex gap-15px">
            <div class="size-100px rounded-full p-1px bg-gradient-linear from-white">
              <img :src="data.img" class="object-cover h-full w-full rounded-full">
            </div>
            <div class="lh-[1.21] space-y-5px flex-grow">
              <p class="font-700 text-16px">
                {{ data.name }}
              </p>
              <p class="font-400 text-12px">
                {{ data.position }}
              </p>
              <p class="font-400 text-12px">
                {{ data.city }}
              </p>
            </div>
            <div>
              <img src="/avatar-square.png" class="w-50px">
            </div>
          </div>

          <div class="text-16px p-10px space-y-10px">
            <div class="flex justify-between color-#929292 font-400">
              <p>{{ date }}</p>
              <p>{{ daysAgo }}</p>
            </div>
            <p class="font-700">
              {{ data._orbits_last_message.message_head }}
            </p>
            <p class="font-300" :class="clampState ? 'line-clamp-1' : ''">
              {{ data._orbits_last_message.message }}
            </p>
            <button
              type="button"
              class="border-none focus:outline-none flex gap-10px items-center bg-transparent font-300"
              @click="clampState = !clampState"
            >
              <span>{{ clampState ? 'MORE' : 'LESS' }}</span>
              <span :class="clampState ? '' : 'rotate-180'">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 0.75L7 6.75L13 0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
