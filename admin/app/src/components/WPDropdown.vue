<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import type { PropType } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '210px',
  },
  anchor: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
  },
})
</script>

<template>
  <Menu as="div" class="tw-block tw-z-100">
    <MenuButton as="div">
      <slot name="trigger" />
    </MenuButton>
    <transition
      enter-active-class="tw-transition tw-duration-100 tw-ease-out"
      enter-from-class="tw-transform tw-scale-95 tw-opacity-0"
      enter-to-class="tw-transform tw-scale-100 tw-opacity-100"
      leave-active-class="tw-transition tw-duration-75 tw-ease-in"
      leave-from-class="tw-transform tw-scale-100 tw-opacity-100"
      leave-to-class="tw-transform tw-scale-95 tw-opacity-0"
    >
      <MenuItems
        class="!tw-absolute tw-bg-white tw-bg-opacity-70 tw-backdrop-filter tw-backdrop-blur tw-divide-y tw-divide-wp-border-500 tw-rounded-md tw-shadow-lg tw-overflow-hidden tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none tw-z-20"
        :class="{
          'tw-right-0 tw-origin-top-right': props.anchor === 'right',
          'tw-left-0 tw-origin-top-left': props.anchor === 'left',
        }"
        :style="{
          width: props.width,
        }"
      >
        <slot name="options" />
      </MenuItems>
    </transition>
  </Menu>
</template>
