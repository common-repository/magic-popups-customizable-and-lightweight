<script setup lang="ts">

</script>
<template>
  <div class="wrap">
    <div id="poststuff">
      <router-view v-slot="{ Component }">
        <transition name="page-transition" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style>
#app {
  position: relative;
  display: block;
  width: 100%;
}

#app svg {
  display: inline;
  vertical-align: middle;
}
</style>

<style scoped>
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 200ms linear;
}

.page-transition-enter-from {
  opacity: 0;
}

.page-transition-leave-to {
  opacity: 0;
}
</style>
