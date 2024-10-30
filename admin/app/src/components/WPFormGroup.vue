<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  for: {
    type: String,
    default: '',
  },
  state: {
    type: String as PropType<'' | 'error' | 'success'>,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
})

</script>

<template>
  <div
    class="form-group input-text-wrap tw-relative tw-block tw-w-full" :class="{
      'form-group--required': required
    }"
  >
    <label v-if="props.title" class="tw-relative tw-block tw-w-full" :for="props.for">
      <span class="tw-relative tw-block tw-w-full tw-font-semibold">
        {{ props.title }}
      </span>
      <span
        v-if="props.description" class="tw-relative tw-block tw-w-full tw-text-xs tw-font-normal" :class="{
          'tw-text-gray-500': props.state === '',
          'tw-text-red-500': props.state === 'error',
          'tw-text-green-500': props.state === 'success',
        }"
      >
        {{ props.description }}
      </span>
    </label>
    <div class="tw-relative tw-block tw-w-full tw-mt-1">
      <slot />
    </div>
  </div>
</template>
<style scoped>
.form-group--required label span:nth-child(1)::after {
  content: '*';
  @apply tw-text-red-500 tw-ml-1;
}
</style>
