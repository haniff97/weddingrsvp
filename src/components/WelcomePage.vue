<template>
  <div class="welcome-page">
    <!-- The PNG image replacing the previous code -->
    <img src="/welcome.png" alt="Selamat Datang ke Majlis Perkahwinan Kami" class="welcome-image" />
    
    <!-- CTA Button -->
    <button class="open-btn" @click="$emit('open')" id="open-invitation-btn">
      Buka Jemputan
    </button>
  </div>
</template>

<script setup>
defineEmits(['open'])
</script>

<style scoped>
.welcome-page {
  min-height: 100vh;
  background-color: var(--cream, #FDFBF7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.welcome-image {
  width: 100%;
  max-width: 480px;
  height: auto;
  object-fit: contain;
  margin-bottom: 24px;
}

/* Open button */
.open-btn {
  padding: 14px 40px;
  font-size: 1.4rem;
  border-radius: 12px;
  letter-spacing: 0.08em;
  font-family: var(--font-marker, sans-serif);
  background-color: #8b1a1a;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.open-btn:hover {
  transform: translateY(-3px) scale(1.02);
}
</style>
