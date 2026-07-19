import { reactive } from 'vue'

export const store = reactive({
  guestMessages: [],
  loading: false,

  async loadMessages() {
    try {
      const res = await fetch('/api/messages')
      const data = await res.json()
      this.guestMessages = data.messages || []
    } catch (err) {
      console.error('Failed to load messages:', err)
    }
  },

  async addMessage(name, text, attending, guests, phone) {
    try {
      this.loading = true
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, attending, guests, phone, message: text }),
      })

      if (!res.ok) throw new Error('Failed to save RSVP')

      // Reload messages from server to get the updated list
      await this.loadMessages()
    } catch (err) {
      console.error('Failed to save RSVP:', err)
    } finally {
      this.loading = false
    }
  },
})
