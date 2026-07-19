<template>
  <div class="music-player-wrapper">
    <div class="music-player-card">
      <div class="player-image">
        <img src="/us.png" alt="Our Photo" />
      </div>
      
      <div class="player-content">
        <!-- Progress bar -->
        <div class="progress-container">
          <div class="progress-bar-wrap" @click="seek($event)">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }">
                <div class="progress-handle"></div>
              </div>
            </div>
          </div>
          <div class="time-display">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>

        <div class="player-controls">
          <button class="ctrl-btn loop-btn" title="Loop">
            <!-- Repeat icon -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
          </button>

          <button class="ctrl-btn" @click="skip(-15)" title="Back 15s" id="music-back-btn">
            <!-- Skip back -->
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 20L9 12l10-8v16zM5 19h2V5H5v14z"/>
            </svg>
          </button>
          
          <button class="ctrl-btn play-btn" @click="togglePlay" :id="isPlaying ? 'pause-btn' : 'play-btn'">
            <!-- Play/Pause -->
            <svg v-if="!isPlaying" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg v-else width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>
          
          <button class="ctrl-btn" @click="skip(15)" title="Forward 15s" id="music-forward-btn">
            <!-- Skip forward -->
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 4l10 8-10 8V4zm14 1v14h-2V5h2z"/>
            </svg>
          </button>

          <button class="ctrl-btn shuffle-btn" title="Shuffle">
            <!-- Shuffle icon -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="22" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <p class="player-hint">Click play button to listen our song..</p>
    
    <!-- Hidden YouTube iframe -->
    <div style="position: absolute; width: 0; height: 0; overflow: hidden; opacity: 0; pointer-events: none;">
      <div id="yt-player"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)
const ytPlayer = ref(null)
let progressTimer = null

onMounted(() => {
  // Load YouTube IFrame API
  if (!window.YT) {
    const tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }

  // Ensure global callback exists
  window.onYouTubeIframeAPIReady = initPlayer
  
  // If already loaded by another component
  if (window.YT && window.YT.Player) {
    initPlayer()
  }
})

onUnmounted(() => {
  if (progressTimer) cancelAnimationFrame(progressTimer)
  if (ytPlayer.value) ytPlayer.value.destroy()
})

function initPlayer() {
  ytPlayer.value = new window.YT.Player('yt-player', {
    height: '1',
    width: '1',
    videoId: 'sBiSqt8k3U4',
    playerVars: {
      start: 3,
      autoplay: 0,
      controls: 0,
      showinfo: 0,
      rel: 0,
      modestbranding: 1
    },
    events: {
      onReady: (event) => {
        duration.value = event.target.getDuration()
      },
      onStateChange: (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
          isPlaying.value = true
          updateProgress()
        } else {
          isPlaying.value = false
          if (progressTimer) cancelAnimationFrame(progressTimer)
        }
      }
    }
  })
}

function updateProgress() {
  if (isPlaying.value && ytPlayer.value && ytPlayer.value.getCurrentTime) {
    currentTime.value = ytPlayer.value.getCurrentTime()
    progress.value = duration.value ? (currentTime.value / duration.value) * 100 : 0
    progressTimer = requestAnimationFrame(updateProgress)
  }
}

function togglePlay() {
  if (!ytPlayer.value || !ytPlayer.value.playVideo) return
  if (isPlaying.value) {
    ytPlayer.value.pauseVideo()
  } else {
    ytPlayer.value.playVideo()
  }
}

function skip(seconds) {
  if (!ytPlayer.value || !ytPlayer.value.getCurrentTime) return
  const current = ytPlayer.value.getCurrentTime()
  ytPlayer.value.seekTo(Math.max(0, Math.min(duration.value, current + seconds)), true)
}

function seek(event) {
  if (!ytPlayer.value || !duration.value) return
  const rect = event.currentTarget.getBoundingClientRect()
  const ratio = (event.clientX - rect.left) / rect.width
  const newTime = ratio * duration.value
  ytPlayer.value.seekTo(newTime, true)
}

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
</script>

<style scoped>
.music-player-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  width: 100%;
}

.music-player-card {
  background-color: #1a1918;
  border-radius: 20px;
  display: flex;
  padding: 16px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  gap: 24px;
}

@media (max-width: 480px) {
  .music-player-card {
    padding: 12px;
    gap: 16px;
    border-radius: 16px;
  }
}

.player-image {
  flex-shrink: 0;
  width: 140px;
  height: 140px;
}

@media (max-width: 480px) {
  .player-image {
    width: 100px;
    height: 100px;
  }
}

.player-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

@media (max-width: 480px) {
  .player-image img {
    border-radius: 12px;
  }
}

.player-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 8px;
}

/* Progress bar */
.progress-container {
  margin-bottom: 24px;
}

@media (max-width: 480px) {
  .progress-container {
    margin-bottom: 16px;
  }
}

.progress-bar-wrap {
  cursor: pointer;
  padding: 8px 0;
}

.progress-bar {
  height: 4px;
  background-color: #ffffff;
  border-radius: 2px;
  position: relative;
}

.progress-fill {
  height: 100%;
  background-color: #b92025; /* Red matching image */
  border-radius: 2px;
  position: relative;
  transition: width 0.1s linear;
}

.progress-handle {
  width: 12px;
  height: 12px;
  background-color: #b92025;
  border-radius: 50%;
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
}

.time-display {
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 0.95rem;
  margin-top: 8px;
  font-family: var(--font-sans, sans-serif);
  letter-spacing: 0.02em;
}

@media (max-width: 480px) {
  .time-display {
    font-size: 0.8rem;
  }
}

/* Controls */
.player-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.ctrl-btn {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, color 0.2s;
  padding: 4px;
}

.ctrl-btn:hover {
  transform: scale(1.1);
}

.play-btn {
  color: #ffffff;
}

.loop-btn, .shuffle-btn {
  color: #e0e0e0;
}

/* Hint text */
.player-hint {
  font-family: var(--font-marker, 'Marker Felt', sans-serif);
  font-size: 1.5rem;
  color: #1a1918;
  margin-top: 24px;
  letter-spacing: 0.03em;
  text-align: center;
}

@media (max-width: 480px) {
  .player-hint {
    font-size: 1.25rem;
    margin-top: 16px;
  }
}
</style>
