<template>
  <div class="wp-loading-bar tw-relative tw-block tw-w-full tw-bg-white tw-overflow-hidden tw-h-[4px]">
    <div class="wp-loading-bar__bar !tw-absolute tw-block tw-bg-primary-500 tw-h-[4px]" />
  </div>
</template>

<style scoped>
.wp-loading-bar {
  height: 4px;
}

.wp-loading-bar__bar {
  left: -50%;
  width: 50%;
  height: 4px;
  animation: wpLoadingBarAnimation 1500ms linear infinite;
}

@keyframes wpLoadingBarAnimation {
  from {
    left: -50%;
    width: 50%;
  }
  50% {
    width: 30%;
  }
  70% {
    width: 70%;
  }
  80% {
    left: 50%;
  }
  95% {
    left: 120%;
  }
  to {
    left: 100%;
  }
}
</style>
