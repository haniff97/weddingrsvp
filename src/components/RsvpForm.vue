<template>
  <div class="rsvp-form card">
    <div v-if="!submitted">
      <form @submit.prevent="handleSubmit" id="rsvp-form">
        <div class="form-group">
          <label for="rsvp-name" class="form-label">Name</label>
          <input
            id="rsvp-name"
            v-model="form.name"
            type="text"
            class="form-input"
            placeholder="Your full name"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Attendance</label>
          <div class="radio-group">
            <label class="radio-label" for="attending-yes">
              <input type="radio" id="attending-yes" v-model="form.attending" value="yes" />
              <span class="radio-custom"></span>
              Yes, I'll be there! 🎉
            </label>
            <label class="radio-label" for="attending-no">
              <input type="radio" id="attending-no" v-model="form.attending" value="no" />
              <span class="radio-custom"></span>
              Sorry, can't make it 😢
            </label>
          </div>
        </div>

        <div class="form-group" v-if="form.attending === 'yes'">
          <label for="rsvp-guests" class="form-label">Number of Guests</label>
          <select id="rsvp-guests" v-model="form.guests" class="form-input">
            <option value="1">1 person</option>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
            <option value="5+">5+ people</option>
          </select>
        </div>

        <div class="form-group">
          <label for="rsvp-message" class="form-label">Message (optional)</label>
          <textarea
            id="rsvp-message"
            v-model="form.message"
            class="form-input form-textarea"
            placeholder="Send your warm wishes..."
            rows="3"
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary submit-btn" id="rsvp-submit-btn">
          Send RSVP 💌
        </button>
      </form>
    </div>

    <!-- Submitted state -->
    <div v-else class="submitted-state">
      <div class="success-icon">💑</div>
      <h3 class="success-title">Thank you!</h3>
      <p class="success-msg">
        {{ form.attending === 'yes'
          ? `We can't wait to celebrate with you, ${form.name}! 🎉`
          : `We'll miss you, ${form.name}! Thank you for the wishes. 💕` }}
      </p>
      <button class="btn btn-outline reset-btn" @click="reset" id="rsvp-reset-btn">Submit another</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { store } from '../store.js'

const submitted = ref(false)

const form = reactive({
  name: '',
  attending: 'yes',
  guests: '1',
  message: '',
})

async function handleSubmit() {
  // Build WhatsApp message
  const attending = form.attending === 'yes'
    ? `✅ Yes, attending with ${form.guests} person(s)`
    : '❌ Unable to attend'

  const msg = [
    `*Wedding RSVP — Haniff & Hanini (6.9.26)*`,
    ``,
    `👤 Name: ${form.name}`,
    `📅 Attendance: ${attending}`,
    form.message ? `💬 Message: ${form.message}` : null,
  ].filter(Boolean).join('\n')

  const waNumber = '60173289264' // Replace with actual WhatsApp number
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`
  window.open(waUrl, '_blank')
  
  // Save RSVP to server (Excel file)
  await store.addMessage(form.name, form.message, form.attending, form.guests)
  
  submitted.value = true
}

function reset() {
  submitted.value = false
  Object.assign(form, { name: '', attending: 'yes', guests: '1', message: '' })
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
</style>
