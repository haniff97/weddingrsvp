<template>
  <div id="app-root">
    <Transition name="page" mode="out-in">
      <WelcomePage v-if="!isOpen" key="welcome" @open="openInvitation" />
      <MainContent v-else key="main" />
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WelcomePage from './components/WelcomePage.vue'
import MainContent from './components/MainContent.vue'

const isOpen = ref(false)

function openInvitation() {
  isOpen.value = true
  // Scroll to top of main content
  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
}
</script>

<style>
#app-root {
  min-height: 100vh;
  position: relative;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
