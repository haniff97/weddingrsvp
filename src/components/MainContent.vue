<template>
  <div class="main-content" ref="mainRef">
    <DotNavigation />

    <!-- ===== SECTION 1: SAVE THE DATE HERO ===== -->
    <section class="hero-section" id="save-the-date">
      <!-- Save the date image replacing the previous SVG string and title -->
      <img src="/savethedate.png" alt="Save the Date" class="save-the-date-image" />

      <div class="section reveal" data-delay="0">

        <div class="names-banner reveal" data-delay="100">
          <p class="banner-names">Hanini + Haniff</p>
        </div>

        <!-- Quran verse -->
        <div class="verse-block reveal" data-delay="200">
          <p class="verse-arabic">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً</p>
          <p class="verse-text">
            "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought."
          </p>
          <p class="verse-ref">— Surah Ar-Rum: 21</p>
        </div>
      </div>
    </section>

    <!-- ===== SECTION 2: MUSIC PLAYER ===== -->
    <section id="music-section">
      <div class="section reveal" data-delay="0">
        <MusicPlayer />
      </div>
    </section>

    <!-- ===== SECTION 3: BRIDE & GROOM ===== -->
    <section id="bride-groom" class="bride-groom-section">
      <div class="section reveal" data-delay="0" style="display: flex; flex-direction: column; align-items: center;">
        <p class="invitation-text">With joy and gratitude, we invite you<br/>to celebrate our wedding reception.</p>
        <img src="/brideandgroom.svg" alt="Bride & Groom" class="bride-groom-image" />
        <img src="/name.svg" alt="Haniff and Hanini" class="names-image" />
      </div>
    </section>

    <!-- ===== SECTION 4: SAVE THE DATE ACCENT ===== -->
    <section id="date-accent" class="date-accent-section">
      <div class="section reveal" data-delay="0" style="display: flex; justify-content: center; align-items: center;">
        <img src="/savethedateglobe.svg" alt="Save the Date Globe" class="save-the-date-globe" />
      </div>
    </section>

    <!-- ===== SECTION 5: CALENDAR ===== -->
    <section id="calendar-section">
      <div class="section reveal" data-delay="0" style="display: flex; justify-content: center; align-items: center;">
        <img src="/date.svg" alt="Date" class="date-image" />
      </div>
    </section>

    <!-- ===== SECTION 6: WEDDING PARTY ===== -->
    <section id="wedding-party">
      <div class="section reveal" data-delay="0">
        <h2 class="section-title text-center">Wedding Reception</h2>
        <div class="divider"></div>

        <div class="party-details card reveal" data-delay="100">
          <div class="detail-row">
            <span class="detail-icon">📅</span>
            <div>
              <p class="detail-label">Date</p>
              <p class="detail-value">Sunday, September 6, 2026</p>
            </div>
          </div>
          <div class="detail-row">
            <span class="detail-icon">🕐</span>
            <div>
              <p class="detail-label">Time</p>
              <p class="detail-value">11:00 AM – 4:00 PM</p>
            </div>
          </div>
          <div class="detail-row">
            <span class="detail-icon">📍</span>
            <div>
              <p class="detail-label">Location</p>
              <p class="detail-value">
                Inara Gerbang Hall<br/>
                Lot 6589, Lorong Bakti, Jln Bawal, Kampung Sungai Udang,<br/>
                41250 Klang, Selangor
              </p>
            </div>
          </div>
        </div>

        <button
          class="btn btn-primary location-btn"
          id="see-location-btn"
          @click="showLocationModal = true"
        >
          📍 View Location
        </button>
      </div>
    </section>

    <!-- ===== SECTION 7: SCHEDULE ===== -->
    <section id="schedule-section">
      <div class="section reveal" data-delay="0">
        <h2 class="section-title text-center">Itinerary</h2>
        <div class="divider"></div>

        <div class="schedule-timeline">
          <div class="timeline-item reveal" data-delay="0" v-for="(item, i) in schedule" :key="i">
            <div class="timeline-time">{{ item.time }}</div>
            <div class="timeline-dot"></div>
            <div class="timeline-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SECTION 8: RESERVATION / RSVP ===== -->
    <section id="reservation-section">
      <div class="section reveal" data-delay="0">
        <h2 class="section-title text-center">Attendance Confirmation (RSVP)</h2>
        <div class="divider"></div>
        <p class="section-intro">Please confirm your attendance by August 30, 2026</p>
        <RsvpForm />
      </div>
    </section>

    <!-- ===== SECTION 8.5: GUEST MESSAGES ===== -->
    <section id="guest-messages-section">
      <div class="section reveal" data-delay="100">
        <div class="guest-messages-card">
          <h2 class="marker-title guest-msg-title">Guest Messages</h2>
          
          <div class="messages-list" v-if="store.guestMessages.length > 0">
            <div class="guest-message-card" v-for="msg in store.guestMessages" :key="msg.id">
              <div class="msg-header">
                <span class="msg-name">{{ msg.name }}</span>
                <span class="msg-status" v-if="msg.attending">✓ Attending</span>
              </div>
              <p class="msg-text">{{ msg.text }}</p>
            </div>
          </div>
          
          <div class="empty-messages text-center" v-else>
            <p>Your sincere wishes will be displayed here.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SECTION 9: WEDDING GIFT ===== -->
    <section id="gift-section">
      <div class="section reveal" data-delay="0">
        <h2 class="section-title text-center">Wedding Gift</h2>
        <div class="divider"></div>

        <div class="gift-intro reveal" data-delay="100">
          <p class="gift-text">
            Your presence on our special day is truly enough.
          </p>
          <p class="gift-text" style="margin-top: 10px;">
            For those who wish to give a gift, a contribution towards our new beginning would be warmly received.
          </p>
          <p class="gift-text" style="margin-top: 10px;">
            Thank you for being part of our celebration 🤍
          </p>
        </div>

        <!-- Bank card -->
        <div class="bank-card reveal" data-delay="150">
          <div class="bank-logo">
            <span class="bank-name-label">Public Bank</span>
          </div>
          <div class="bank-details">
            <div class="bank-row">
              <span class="bank-label">Account No.</span>
              <span class="bank-value" id="bank-account-no">4942779523</span>
              <button class="copy-btn" @click="copyAccount" id="copy-account-btn" :title="copied ? 'Copied!' : 'Copy'">
                {{ copied ? '✓' : '⎘' }}
              </button>
            </div>
            <div class="bank-row">
              <span class="bank-label">Account Name</span>
              <span class="bank-value">Marisya Hanini</span>
              <button
                class="qr-btn-inline"
                id="show-qr-btn"
                @click="showQrModal = true"
              >
                📱 QR
              </button>
            </div>
          </div>
        </div>

        <!-- WhatsApp Number button (disabled for now)
        <a
          href="https://wa.me/60123456789"
          target="_blank"
          rel="noopener"
          class="btn btn-primary wa-btn"
          id="whatsapp-gift-btn"
        >
          <span>💬</span> WhatsApp Number
        </a>
        -->
      </div>
    </section>

    <!-- ===== SECTION 10: COUNTDOWN & CLOSING ===== -->
    <section id="countdown-closing-section">
      <div class="section reveal" data-delay="0" style="display: flex; flex-direction: column; align-items: center; max-width: 1000px; padding: 40px 20px;">
        <div class="composite-container">
          <img src="/ours.png" alt="Our Big Day Awaits" class="ours-composite-image" />
          <div class="countdown-overlay">
            <CountdownTimer class="timer-component" />
            <div class="countdown-labels">
              <span>DAYS</span>
              <span>HOURS</span>
              <span>MINS</span>
              <span>SECS</span>
            </div>
          </div>
        </div>
        <!-- Hearts animation -->
        <div class="floating-hearts">
          <span class="fheart h1">♥</span>
          <span class="fheart h2">♥</span>
          <span class="fheart h3">♥</span>
          <span class="fheart h4">♥</span>
          <span class="fheart h5">♥</span>
        </div>

        <!-- Bottom tagline -->
        <p class="closing-tagline">#HANINeedAHaniff</p>
      </div>
    </section>

    <!-- Location Modal -->
    <div v-if="showLocationModal" class="modal-overlay" @click="showLocationModal = false">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="showLocationModal = false">&times;</button>
        <h3 class="modal-title">Choose Map App</h3>
        <div class="map-options">
          <a
            href="https://www.google.com/maps/search/?api=1&query=INARA+GERBANG+HALL+LOT+6589+LORONG+BAKTI+JIN+BAWAL+KAMPUNG+SUNGAI+UDANG+41250+KLANG+SELANGOR"
            target="_blank"
            rel="noopener"
            class="btn btn-primary map-btn google-map-btn"
          >
            Google Maps
          </a>
          <a
            href="https://waze.com/ul?q=INARA+GERBANG+HALL"
            target="_blank"
            rel="noopener"
            class="btn btn-primary map-btn waze-btn"
          >
            Waze
          </a>
        </div>
      </div>
    </div>

    <!-- QR Code Modal -->
    <div v-if="showQrModal" class="modal-overlay" @click="showQrModal = false">
      <div class="modal-content qr-modal" @click.stop>
        <button class="modal-close" @click="showQrModal = false">&times;</button>
        <h3 class="modal-title">Scan to Pay</h3>
        <div class="qr-image-wrapper">
          <img src="/qr.JPG" alt="Payment QR Code" class="qr-image" />
        </div>
        <a
          href="/qr.JPG"
          download="WeddingGift_QR.jpg"
          class="btn btn-primary save-qr-btn"
        >
          💾 Save QR Code
        </a>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MusicPlayer from './MusicPlayer.vue'
import RsvpForm from './RsvpForm.vue'
import CountdownTimer from './CountdownTimer.vue'
import DotNavigation from './DotNavigation.vue'
import { store } from '../store.js'

const mainRef = ref(null)
const copied = ref(false)
const showLocationModal = ref(false)
const showQrModal = ref(false)

const schedule = [
  { time: '11:00 AM', desc: 'Event Begins' },
  { time: '12:30 PM', desc: 'Arrival of Bride & Groom' },
  { time: '04:00 PM', desc: 'Event Ends' },
]

const photoStrip = [
  { src: '/photos/strip1.jpg', alt: 'Couple photo 1' },
  { src: '/photos/strip2.jpg', alt: 'Couple photo 2' },
  { src: '/photos/strip3.jpg', alt: 'Couple photo 3' },
]

function copyAccount() {
  navigator.clipboard.writeText('4942779523').then(() => {
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  })
}

// Scroll-reveal using IntersectionObserver
let observer = null

onMounted(() => {
  // Load guest messages from server
  store.loadMessages()

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0')
        setTimeout(() => {
          entry.target.classList.add('visible')
        }, delay)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.main-content {
  background: var(--cream);
  min-height: 100vh;
}

/* ===== HERO ===== */
.hero-section {
  background: var(--cream);
  position: relative;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-section .section {
  padding-bottom: 20px;
}

#music-section .section {
  padding-top: 0;
  padding-bottom: 0;
}

.bride-groom-section .section {
  padding-top: 10px;
  padding-bottom: 20px;
}

.date-accent-section .section {
  padding-top: 20px;
  padding-bottom: 20px;
}

#calendar-section .section {
  padding-top: 20px;
  padding-bottom: 20px;
}

#wedding-party .section {
  padding-top: 30px;
  padding-bottom: 20px;
}

#schedule-section .section {
  padding-top: 30px;
  padding-bottom: 20px;
}

#reservation-section .section {
  padding-top: 30px;
  padding-bottom: 30px;
}

#guest-messages-section .section {
  padding-top: 20px;
}

.save-the-date-image {
  width: 100%;
  max-width: 480px;
  height: auto;
  object-fit: contain;
  margin: 0 auto 20px;
  display: block;
}

.string-deco {
  width: 100%;
  height: 60px;
  padding: 0 20px;
}

.string-deco svg {
  width: 100%;
  height: 100%;
}

.save-the-date-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-marker);
  font-size: clamp(2.8rem, 12vw, 4.2rem);
  font-weight: 700;
  color: var(--crimson);
  text-transform: uppercase;
  line-height: 1.05;
  text-align: center;
}

.accent-sm .save-the-date-title {
  font-size: clamp(2rem, 9vw, 3rem);
}

/* Names banner */
.names-banner {
  margin-top: -100px; 
  margin-bottom: 80px;
  text-align: center;
}

.banner-names {
  font-family: var(--font-marker);
  font-size: clamp(1.6rem, 6vw, 2.2rem);
  color: var(--crimson);
  font-weight: 600;
  letter-spacing: 0.06em;
}

/* Verse */
.verse-block {
  background: var(--white);
  border-radius: 16px;
  padding: 24px 20px;
  margin-top: 20px;
  box-shadow: var(--shadow);
  text-align: center;
}

.verse-arabic {
  font-size: 1.05rem;
  line-height: 2;
  color: var(--crimson);
  margin-bottom: 12px;
  direction: rtl;
  font-weight: 500;
}

.verse-text {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 8px;
}

.verse-ref {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--crimson);
}

/* ===== BRIDE & GROOM ===== */
.invitation-text {
  font-size: 1rem;
  text-align: center;
  color: #1a1918;
  margin-bottom: 24px;
  line-height: 1.4;
  letter-spacing: 0.05em;
}

.bride-groom-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: contain;
  margin-bottom: 24px;
}

.names-image {
  width: 100%;
  max-width: 480px;
  height: auto;
  object-fit: contain;
}

.section-header {
  text-align: center;
  margin-bottom: 28px;
}

.rope-deco {
  width: 160px;
  margin: 0 auto 8px;
}

.section-title {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: var(--crimson);
  font-weight: 700;
}

.person-card {
  text-align: center;
  margin-bottom: 12px;
}

.person-photo-wrap {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.person-photo-frame {
  width: 200px;
  height: 240px;
  border-radius: 120px 120px 80px 80px;
  overflow: hidden;
  border: 5px solid var(--crimson);
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg, #c8956b 0%, #a57050 100%);
}

.person-photo-frame.scalloped {
  border-radius: 20px;
  background: transparent;
}

.person-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

/* Corner deco on photo */
.photo-corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: var(--crimson);
  border-style: solid;
  pointer-events: none;
}

.photo-corner.tl { top: -4px; left: -4px; border-width: 3px 0 0 3px; border-radius: 4px 0 0 0; }
.photo-corner.tr { top: -4px; right: -4px; border-width: 3px 3px 0 0; border-radius: 0 4px 0 0; }
.photo-corner.bl { bottom: -4px; left: -4px; border-width: 0 0 3px 3px; border-radius: 0 0 0 4px; }
.photo-corner.br { bottom: -4px; right: -4px; border-width: 0 3px 3px 0; border-radius: 0 0 4px 0; }

.person-name {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.person-desc {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 6px;
}

.person-parents {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--crimson);
  margin-top: 2px;
}

.ampersand-divider {
  text-align: center;
  font-family: var(--font-serif);
  font-size: 3rem;
  font-style: italic;
  color: var(--crimson);
  opacity: 0.5;
  margin: 4px 0;
  line-height: 1;
}

/* ===== DATE ACCENT ===== */
.date-accent-section {
  /* Removed background and dashed lines to blend seamlessly */
}

.save-the-date-globe {
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: contain;
}

/* ===== CALENDAR ===== */
.date-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: contain;
}

.calendar-wrap {
  background: var(--white);
  border-radius: 20px;
  padding: 28px 20px 20px;
  box-shadow: var(--shadow-lg);
  text-align: center;
  border: 2px solid rgba(139,26,26,0.1);
}

.cal-header {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  margin-bottom: 16px;
}

.cal-header span {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  text-align: center;
}

.cal-main-day {
  color: var(--crimson) !important;
}

.cal-dates {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  align-items: center;
  margin-bottom: 16px;
}

.cal-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
}

.side-date {
  font-size: 2.8rem;
  color: var(--text-muted);
  font-weight: 400;
  opacity: 0.5;
}

.main-date {
  background: var(--crimson);
  border-radius: 16px;
  padding: 16px 24px;
  margin: 0 8px;
  box-shadow: var(--shadow-lg);
  position: relative;
}

.main-date.circled {
  background: transparent;
  border: 3px dashed var(--crimson);
  border-radius: 50%;
  padding: 20px 24px;
  box-shadow: none;
}

.main-date.circled .date-num {
  color: var(--crimson);
}

.main-date.circled .d-day-badge {
  color: var(--crimson);
}

.date-num {
  font-size: 3.8rem;
  font-weight: 700;
  color: var(--white);
  line-height: 1;
}

.d-day-badge {
  display: block;
  font-family: var(--font-hand);
  font-size: 0.9rem;
  color: rgba(255,255,255,0.9);
  margin-top: 4px;
}

.cal-month {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-style: italic;
  color: var(--text-muted);
  margin-top: 24px;
}

/* ===== GUEST MESSAGES ===== */
.guest-messages-card {
  background: var(--cream-dark);
  border-radius: 20px;
  padding: 24px 20px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.guest-msg-title {
  font-family: var(--font-marker);
  font-size: 2.2rem;
  color: #6a2c2c;
  text-align: left;
  margin-bottom: 20px;
  margin-left: 10px;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 6px;
}

/* Custom Scrollbar for messages */
.messages-list::-webkit-scrollbar {
  width: 6px;
}
.messages-list::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.05);
  border-radius: 4px;
}
.messages-list::-webkit-scrollbar-thumb {
  background: rgba(139,26,26,0.2);
  border-radius: 4px;
}
.messages-list::-webkit-scrollbar-thumb:hover {
  background: rgba(139,26,26,0.4);
}

.guest-message-card {
  background: var(--white);
  border-radius: 12px;
  padding: 14px 16px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(139, 26, 26, 0.05);
}

.empty-messages {
  padding: 20px 0;
  opacity: 0.8;
}

.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.msg-name {
  font-family: var(--font-sans);
  font-weight: 700;
  color: var(--text-dark);
  font-size: 1.05rem;
}

.msg-status {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: #27ae60;
  font-weight: 700;
}

.msg-date {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: #666;
  margin-top: 2px;
  margin-bottom: 8px;
}

.msg-text {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--text-dark);
  line-height: 1.4;
  word-break: break-word;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

/* ===== GIFT ===== */
.party-details {
  margin: 20px 0;
}

.detail-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid var(--cream-dark);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.detail-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--crimson);
  margin-bottom: 2px;
}

.detail-value {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  color: var(--text-dark);
  line-height: 1.5;
}

.location-btn {
  display: block;
  text-align: center;
  width: 100%;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1rem;
}

/* ===== SCHEDULE ===== */
.schedule-timeline {
  margin-top: 20px;
  position: relative;
}

.schedule-timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(139,26,26,0.15);
  transform: translateX(-50%);
}

.timeline-item {
  display: grid;
  grid-template-columns: 1fr 32px 1fr;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  position: relative;
}

.timeline-item:nth-child(odd) .timeline-time {
  text-align: right;
}

.timeline-item:nth-child(odd) .timeline-desc {
  text-align: left;
}

.timeline-item:nth-child(even) .timeline-time {
  text-align: right;
}

.timeline-item:nth-child(even) .timeline-desc {
  text-align: left;
}

.timeline-time {
  font-family: var(--font-hand);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--crimson);
}

.timeline-dot {
  width: 16px;
  height: 16px;
  background: var(--crimson);
  border-radius: 50%;
  border: 3px solid var(--cream);
  box-shadow: 0 0 0 2px var(--crimson);
  justify-self: center;
  flex-shrink: 0;
  z-index: 1;
}

.timeline-desc {
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--text-dark);
  font-weight: 500;
}

/* ===== SECTION INTRO ===== */
.section-intro {
  text-align: center;
  font-family: var(--font-sans);
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-bottom: 20px;
  font-style: italic;
}

/* ===== WEDDING GIFT ===== */
.gift-text {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.7;
}

.bank-card {
  background: var(--white);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow);
  margin: 20px 0;
  border: 2px solid rgba(139,26,26,0.1);
  display: flex;
  flex-direction: column;
}

.bank-logo {
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--cream-dark);
}

.bank-name-label {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--crimson);
  letter-spacing: 0.05em;
}

.bank-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.bank-label {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  min-width: 110px;
}

.bank-value {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  color: var(--text-dark);
  font-weight: 600;
  flex: 1;
}

.copy-btn {
  background: var(--crimson-pale);
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--crimson);
  transition: background 0.2s;
}

.copy-btn:hover {
  background: var(--crimson);
  color: var(--white);
}

.wa-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  width: 100%;
  border-radius: 12px;
  font-size: 1rem;
}

/* ===== COUNTDOWN & CLOSING ===== */
.composite-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  container-type: inline-size;
}

.ours-composite-image {
  width: 100%;
  height: auto;
  display: block;
}

.countdown-overlay {
  position: absolute;
  top: 23%;
  left: 6%;
  width: 50%;
  display: flex;
  flex-direction: column;
}

.countdown-overlay :deep(.countdown-inline) {
  font-size: 7cqi !important;
}

.countdown-labels {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
  margin-top: 1cqi;
  color: var(--crimson);
  font-size: 1.8cqi;
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 0 2cqi;
}

.floating-hearts {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 24px 0 16px;
}

.fheart {
  color: var(--crimson);
  font-size: 1.5rem;
  animation: heart-beat 1.5s ease-in-out infinite;
}

.h1 { animation-delay: 0s; font-size: 1rem; opacity: 0.5; }
.h2 { animation-delay: 0.2s; font-size: 1.4rem; opacity: 0.7; }
.h3 { animation-delay: 0.1s; font-size: 1.8rem; }
.h4 { animation-delay: 0.3s; font-size: 1.4rem; opacity: 0.7; }
.h5 { animation-delay: 0.15s; font-size: 1rem; opacity: 0.5; }

.closing-tagline {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
  text-align: center;
}

/* ===== Mobile tweaks ===== */
@media (max-width: 480px) {
  .person-photo-frame {
    width: 160px;
    height: 196px;
  }
}
/* ===== MODAL ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: var(--white);
  padding: 30px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
  box-shadow: var(--shadow-lg);
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.8rem;
  color: var(--text-muted);
  cursor: pointer;
  line-height: 1;
}

.modal-title {
  font-family: var(--font-serif);
  color: var(--crimson);
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.map-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.map-btn {
  display: block;
  text-decoration: none;
  border-radius: 12px;
  padding: 12px;
  font-size: 1.1rem;
  font-weight: 600;
}

.google-map-btn {
  background-color: #4285F4;
  color: white;
}

.waze-btn {
  background-color: #33ccff;
  color: white;
}

/* ===== QR BUTTON & MODAL ===== */
.qr-btn-inline {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--crimson);
  background: var(--crimson-pale);
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.qr-btn-inline:hover {
  background: var(--crimson);
  color: var(--white);
}

.qr-modal {
  max-width: 360px;
}

.qr-image-wrapper {
  background: var(--white);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.qr-image {
  width: 100%;
  max-width: 280px;
  height: auto;
  border-radius: 8px;
  object-fit: contain;
}

.save-qr-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  border-radius: 12px;
  padding: 10px 24px;
  text-decoration: none;
}
</style>
