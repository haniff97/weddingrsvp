<template>
  <div class="countdown-wrapper">
    <div class="countdown-inline">
      <span class="count-val" :class="{ pulse: units[0].pulse }">{{ units[0].value }}</span>
      <span class="count-sep">:</span>
      <span class="count-val" :class="{ pulse: units[1].pulse }">{{ units[1].value }}</span>
      <span class="count-sep">:</span>
      <span class="count-val" :class="{ pulse: units[2].pulse }">{{ units[2].value }}</span>
      <span class="count-sep">:</span>
      <span class="count-val" :class="{ pulse: units[3].pulse }">{{ units[3].value }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const WEDDING_DATE = new Date('2026-09-06T11:00:00+08:00')

const days = ref(0)
const hours = ref(0)
const mins = ref(0)
const secs = ref(0)

let timer = null

function pad(n) {
  return String(n).padStart(2, '0')
}

function updateCountdown() {
  const now = new Date()
  const diff = WEDDING_DATE - now

  if (diff <= 0) {
    days.value = '00'
    hours.value = '00'
    mins.value = '00'
    secs.value = '00'
    return
  }

  days.value = pad(Math.floor(diff / (1000 * 60 * 60 * 24)))
  hours.value = pad(Math.floor((diff / (1000 * 60 * 60)) % 24))
  mins.value = pad(Math.floor((diff / (1000 * 60)) % 60))
  secs.value = pad(Math.floor((diff / 1000) % 60))
}

const units = computed(() => [
  { label: 'DAYS', value: days.value, pulse: false },
  { label: 'HOURS', value: hours.value, pulse: false },
  { label: 'MINS', value: mins.value, pulse: false },
  { label: 'SECS', value: secs.value, pulse: true },
])

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.countdown-wrapper {
  width: 100%;
  text-align: center;
}

.countdown-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-marker);
  font-size: clamp(2rem, 8vw, 3rem);
  font-weight: 700;
  color: var(--crimson);
  letter-spacing: 0.1em;
}

.count-val {
  min-width: 1.2em;
}

.count-sep {
  opacity: 0.8;
}

.count-val.pulse {
  animation: count-pulse 1s ease-in-out infinite;
}
</style>
