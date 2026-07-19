<template>
  <div class="rsvp-form card">
    <div v-if="!submitted">
      <form @submit.prevent="handleSubmit" id="rsvp-form">
        <div class="form-group">
          <label for="rsvp-name" class="form-label">Nama</label>
          <input
            id="rsvp-name"
            v-model="form.name"
            type="text"
            class="form-input"
            placeholder="Nama penuh anda"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Kehadiran</label>
          <div class="radio-group">
            <label class="radio-label" for="attending-yes">
              <input type="radio" id="attending-yes" v-model="form.attending" value="yes" />
              <span class="radio-custom"></span>
              Ya, saya akan hadir! 🎉
            </label>
            <label class="radio-label" for="attending-no">
              <input type="radio" id="attending-no" v-model="form.attending" value="no" />
              <span class="radio-custom"></span>
              Maaf, tidak dapat hadir 😢
            </label>
          </div>
        </div>

        <div class="form-group" v-if="form.attending === 'yes'">
          <label for="rsvp-phone" class="form-label">Nombor Telefon</label>
          <input
            id="rsvp-phone"
            v-model="form.phone"
            type="tel"
            class="form-input"
            placeholder="Nombor telefon anda"
            required
          />
        </div>

        <div class="form-group" v-if="form.attending === 'yes'">
          <label for="rsvp-guests" class="form-label">Jumlah Kehadiran</label>
          <select id="rsvp-guests" v-model="form.guests" class="form-input">
            <option value="1">1 orang</option>
            <option value="2">2 orang</option>
            <option value="3">3 orang</option>
            <option value="4">4 orang</option>
            <option value="5+">5+ orang</option>
          </select>
        </div>

        <div class="form-group">
          <label for="rsvp-message" class="form-label">Ucapan (Pilihan)</label>
          <textarea
            id="rsvp-message"
            v-model="form.message"
            class="form-input form-textarea"
            placeholder="Titipkan ucapan buat pengantin..."
            rows="3"
          ></textarea>
        </div>

        <div class="submit-actions">
          <button type="submit" class="btn btn-primary submit-btn" @click="submitType = 'rsvp'">
            Hantar RSVP 💌
          </button>
          <button type="submit" class="btn btn-outline wa-btn mt-3" @click="submitType = 'wa'">
            <span>💬</span> Terus ke WhatsApp
          </button>
        </div>
      </form>
    </div>

    <!-- Submitted state -->
    <div v-else class="submitted-state">
      <div class="success-icon">💑</div>
      <h3 class="success-title">Terima kasih!</h3>
      <p class="success-msg">
        {{ form.attending === 'yes'
          ? `Kami tidak sabar untuk meraikan hari bahagia ini bersama anda, ${form.name}! 🎉`
          : `Ketidakhadiran anda amat dirasai, ${form.name}! Terima kasih atas ucapan anda. 💕` }}
      </p>
      <div class="submitted-actions">
        <button class="btn btn-outline reset-btn" @click="reset" id="rsvp-reset-btn">Hantar RSVP lain</button>
      </div>
    </div>

    <!-- WhatsApp Modal -->
    <div v-if="showWaModal" class="modal-overlay" @click="showWaModal = false">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="showWaModal = false">&times;</button>
        <h3 class="modal-title">Hubungi</h3>
        <div class="contact-info">
          <p class="contact-name">En. Hasnan</p>
          <p class="contact-sub">(Ayah Pengantin)</p>
        </div>
        <div class="modal-actions">
          <a :href="waLink" target="_blank" rel="noopener" class="btn btn-primary wa-btn" @click="showWaModal = false">
            <span>💬</span> Terus ke WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { store } from '../store.js'

const submitted = ref(false)
const waLink = ref('')
const showWaModal = ref(false)
const submitType = ref('rsvp')

const form = reactive({
  name: '',
  attending: 'yes',
  phone: '',
  guests: '1',
  message: '',
})

async function handleSubmit() {
  // Build WhatsApp message
  const attending = form.attending === 'yes'
    ? `✅ Ya, hadir berserta ${form.guests} orang`
    : '❌ Tidak dapat hadir'

  const msg = [
    `*Pengesahan Kehadiran (RSVP) — Haniff & Hanini (6.9.26)*`,
    ``,
    `👤 Nama: ${form.name}`,
    form.attending === 'yes' ? `📱 No. Tel: ${form.phone}` : null,
    `📅 Kehadiran: ${attending}`,
    form.message ? `💬 Ucapan: ${form.message}` : null,
  ].filter(Boolean).join('\n')
  
  const waNumber = '60173289264' // Replace with actual WhatsApp number
  waLink.value = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`

  // Save RSVP to server (Excel file)
  await store.addMessage(form.name, form.message, form.attending, form.guests, form.phone)
  
  submitted.value = true

  if (submitType.value === 'wa') {
    showWaModal.value = true
  }
}

function reset() {
  submitted.value = false
  Object.assign(form, { name: '', attending: 'yes', phone: '', guests: '1', message: '' })
}
</script>

<style scoped>
.form-group {
  margin-bottom: 18px;
}

.form-label {
  display: block;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--crimson);
  margin-bottom: 6px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--cream-dark);
  border-radius: 10px;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--text-dark);
  background: var(--cream);
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  appearance: none;
}

.form-input:focus {
  border-color: var(--crimson);
  box-shadow: 0 0 0 3px rgba(139,26,26,0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

/* Radio buttons */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--text-dark);
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 10px;
  border: 2px solid var(--cream-dark);
  transition: border-color 0.2s, background 0.2s;
}

.radio-label:has(input:checked) {
  border-color: var(--crimson);
  background: var(--crimson-pale);
}

.radio-label input {
  display: none;
}

.radio-custom {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--cream-dark);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.2s;
}

.radio-label:has(input:checked) .radio-custom {
  border-color: var(--crimson);
  background: var(--crimson);
  box-shadow: inset 0 0 0 3px var(--white);
}

.submit-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.submit-btn {
  width: 100%;
  justify-content: center;
  border-radius: 10px;
  font-size: 1.1rem;
  padding: 14px;
}

/* Submitted state */
.submitted-state {
  text-align: center;
  padding: 20px 0;
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 12px;
  animation: bounce-in 0.6s ease;
}

.success-title {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  color: var(--crimson);
  margin-bottom: 10px;
}

.success-msg {
  font-family: var(--font-sans);
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.reset-btn {
  font-size: 0.9rem;
  padding: 10px 28px;
}

.submitted-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.wa-btn {
  width: 100%;
  justify-content: center;
  border-radius: 10px;
  font-size: 1rem;
  padding: 12px;
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

.contact-info {
  margin-bottom: 24px;
}

.contact-name {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.contact-sub {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--text-muted);
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
