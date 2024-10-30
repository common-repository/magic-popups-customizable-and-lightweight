<script lang="ts" setup>
import { MenuItem } from '@headlessui/vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

</script>

<template>
  <MenuItem v-slot="{ active }" :disabled="disabled">
    <button
      class="tw-group tw-flex tw-items-center tw-w-full tw-px-2.5 tw-py-2 tw-transition-colors tw-duration-200"
      :class="{
        'tw-bg-primary-500 tw-text-white' : active,
        'tw-opacity-60 tw-cursor-not-allowed': disabled,
      }"
    >
      <slot :active="active" />
    </button>
  </MenuItem>
</template>
