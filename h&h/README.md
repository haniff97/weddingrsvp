# 💍 Haniff & Hanini — Wedding Invitation Card

A beautiful, interactive digital wedding invitation built with Vue 3 + Vite. Designed as a mobile-first web app with rich animations, music, and a full RSVP system that stores guest data in Excel format.

**Wedding Date**: 6 September 2026

---

## ✨ Features

### 🎨 Design & UI
- **Mobile-first responsive design** with elegant serif & handwritten typography
- **Scroll-reveal animations** — sections fade in as guests scroll down
- **Photo strip carousel** with automatic slideshow
- **Countdown timer** overlaid on a custom composite image
- **Save the Date** globe animation with interactive calendar

### 🎵 Music
- **Background music player** with play/pause toggle
- Music auto-plays after the guest enters the invitation

### 📋 RSVP System
- **Interactive RSVP form** — guests can confirm attendance, number of guests, and leave a message
- **WhatsApp integration** — RSVP details are sent directly via WhatsApp
- **Server-side Excel storage** — all RSVPs are saved to `data/rsvp.xlsx` on the server
- **Guest Messages section** — scrollable card displaying messages from all guests in real time

### 🎁 Wedding Gift
- **Bank account details** with one-tap copy functionality
- Clean card layout matching the invitation's design system

### 📊 Data & Backend
- **Express.js API** (`server.js`) with two endpoints:
  - `POST /api/rsvp` — saves RSVP data to Excel
  - `GET /api/messages` — returns guest messages as JSON
- **ExcelJS** for reading/writing `.xlsx` files
- **Write queue** to prevent race conditions from concurrent submissions
- Excel file columns: `Timestamp | Name | Attending | Guests | Message`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vue 3 (Composition API, `<script setup>`) |
| Build Tool | Vite |
| Backend | Express.js (Node.js) |
| Data Storage | Excel (.xlsx) via ExcelJS |
| Styling | Vanilla CSS with CSS variables |
| Fonts | Google Fonts (Playfair Display, Inter, Caveat, Gaegu) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Development

```bash
# Install dependencies
npm install

# Start the backend server (port 3000)
node server.js

# Start the frontend dev server (port 5173, proxies /api to :3000)
npm run dev
```

### Production Build & Deploy

```bash
# Build the Vue frontend
npm run build

# Start the production server (serves both API + static files)
npm start
```

---

## 📁 Project Structure

```
wedding/
├── server.js              # Express backend (API + static file server)
├── data/
│   └── rsvp.xlsx          # Auto-generated Excel file with RSVP data
├── public/                # Static assets (images, music, fonts)
├── src/
│   ├── components/
│   │   ├── WelcomePage.vue     # Landing page with enter button
│   │   ├── MainContent.vue     # Main invitation (all sections)
│   │   ├── RsvpForm.vue        # RSVP form with WhatsApp integration
│   │   ├── CountdownTimer.vue  # Live countdown to wedding day
│   │   └── MusicPlayer.vue     # Background music player
│   ├── store.js           # Reactive state + API calls
│   ├── style.css          # Global design system (variables, typography)
│   └── App.vue            # Root component
├── package.json
├── vite.config.js         # Vite config with dev proxy
└── index.html
```

---

## 📝 License

Private — Built with ❤️ for Haniff & Hanini's wedding.
