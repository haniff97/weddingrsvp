<template>
  <div class="dot-nav">
    <a 
      v-for="section in sections" 
      :key="section.id" 
      :href="'#' + section.id"
      class="dot"
      :class="{ active: activeSection === section.id }"
      @click.prevent="scrollTo(section.id)"
    >
      <span class="dot-label">{{ section.name }}</span>
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sections = [
  { id: 'save-the-date', name: 'Start' },
  { id: 'bride-groom', name: 'Bride & Groom' },
  { id: 'wedding-party', name: 'Reception' },
  { id: 'schedule-section', name: 'Itinerary' },
  { id: 'reservation-section', name: 'RSVP' },
  { id: 'gift-section', name: 'Gifts' }
]

const activeSection = ref('save-the-date')
let observer = null

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    // Only update if it's intersecting and taking up a good chunk of the viewport
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, { threshold: 0.2, rootMargin: '-10% 0px -50% 0px' })

  sections.forEach(sec => {
    const el = document.getElementById(sec.id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.dot-nav {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9998;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--cream-dark, #ede6e0);
  border: 1px solid var(--crimson, #8b1a1a);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.dot:hover, .dot.active {
  background-color: var(--crimson, #8b1a1a);
  transform: scale(1.3);
}

.dot-label {
  position: absolute;
  right: 16px;
  background: var(--white, #fff);
  padding: 2px 6px;
  border-radius: 6px;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--crimson, #8b1a1a);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateX(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(139, 26, 26, 0.15);
}

.dot:hover .dot-label {
  opacity: 1;
  transform: translateX(0);
}

/* Hide labels on small screens to prevent overlap, but keep the dots */
@media (max-width: 768px) {
  .dot-label {
    display: none;
  }
  .dot-nav {
    right: 12px;
  }
}
</style>
