import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import ExcelJS from 'exceljs'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Paths
const DATA_DIR = path.join(__dirname, 'data')
const EXCEL_PATH = path.join(DATA_DIR, 'rsvp.xlsx')

// Middleware
app.use(express.json())

// Serve static Vue build
app.use(express.static(path.join(__dirname, 'dist')))

// ─── Helpers ───────────────────────────────────────────

// Simple write queue to prevent concurrent Excel file access
let writeQueue = Promise.resolve()
function enqueue(fn) {
  writeQueue = writeQueue.then(fn).catch(fn)
  return writeQueue
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

async function getWorkbook() {
  const workbook = new ExcelJS.Workbook()
  if (fs.existsSync(EXCEL_PATH)) {
    await workbook.xlsx.readFile(EXCEL_PATH)
  }
  return workbook
}

function getOrCreateSheet(workbook) {
  let sheet = workbook.getWorksheet('RSVP')
  if (!sheet) {
    sheet = workbook.addWorksheet('RSVP')
    // Header row
    sheet.columns = [
      { header: 'Timestamp', key: 'timestamp', width: 22 },
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Attending', key: 'attending', width: 12 },
      { header: 'Guests', key: 'guests', width: 10 },
      { header: 'Message', key: 'message', width: 50 },
    ]
    // Style header row
    const headerRow = sheet.getRow(1)
    headerRow.font = { bold: true }
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE9DBDD' },
    }
  }
  return sheet
}

// ─── API Routes ────────────────────────────────────────

// POST /api/rsvp — Save a new RSVP entry
app.post('/api/rsvp', async (req, res) => {
  try {
    const { name, attending, guests, message } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Name is required' })
    }

    await enqueue(async () => {
      ensureDataDir()
      const workbook = await getWorkbook()
      const sheet = getOrCreateSheet(workbook)

      const now = new Date()
      const timestamp = now.toLocaleString('en-MY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })

      sheet.addRow([
        timestamp,
        name || 'Anonymous',
        attending === 'yes' ? 'Yes' : 'No',
        guests || '1',
        message || '',
      ])

      await workbook.xlsx.writeFile(EXCEL_PATH)

      console.log(`[RSVP] ${name} — ${attending === 'yes' ? 'Attending' : 'Not attending'}`)
    })

    res.json({ success: true })
  } catch (err) {
    console.error('[RSVP ERROR]', err)
    res.status(500).json({ error: 'Failed to save RSVP' })
  }
})

// GET /api/messages — Get all guest messages
app.get('/api/messages', async (req, res) => {
  try {
    if (!fs.existsSync(EXCEL_PATH)) {
      return res.json({ messages: [] })
    }

    const workbook = await getWorkbook()
    const sheet = workbook.getWorksheet('RSVP')

    if (!sheet) {
      return res.json({ messages: [] })
    }

    const messages = []
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return // Skip header

      // Columns: 1=Timestamp, 2=Name, 3=Attending, 4=Guests, 5=Message
      const message = row.getCell(5).value
      if (!message || String(message).trim() === '') return // Skip entries without messages

      messages.push({
        id: rowNumber,
        name: String(row.getCell(2).value || 'Anonymous'),
        date: String(row.getCell(1).value || ''),
        attending: String(row.getCell(3).value).toLowerCase() === 'yes',
        text: String(message),
      })
    })

    // Return newest first
    messages.reverse()

    res.json({ messages })
  } catch (err) {
    console.error('[MESSAGES ERROR]', err)
    res.status(500).json({ error: 'Failed to read messages' })
  }
})

// SPA fallback — serve index.html for all other routes
app.get('{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// ─── Start ─────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Wedding server running on http://localhost:${PORT}`)
})
