<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String as PropType<'primary' | 'secondary'>,
    default: 'primary',
  },
  as: {
    type: String as PropType<'button' | 'a'>,
    default: 'button',
  },
})

const computedClasses = computed(() => {
  return {
    'button button-primary': props.variant === 'primary',
    'button button-secondary': props.variant === 'secondary',
  }
})

</script>
<template>
  <button v-if="props.as === 'button'" :class="computedClasses">
    <div class="tw-flex tw-justify-center tw-items-center">
      <slot />
    </div>
  </button>
  <a v-else-if="props.as === 'a'" :class="computedClasses">
    <slot />
  </a>
</template>

<style scoped>
.button {
  min-height: none !important;
  padding: 2px 10px !important;
}
</style>
