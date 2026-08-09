const express = require('express')
const router = express.Router()
const db = require('../db')
const { requireAuth } = require('../middleware/requireAuth')

router.use(requireAuth) // every route below requires a valid token

router.get('/', (req, res) => {
  const subjects = db.prepare('SELECT * FROM subjects WHERE user_id = ?').all(req.userId)
  res.json({ subjects })
})

router.post('/', (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'name is required' })
  const result = db
    .prepare('INSERT INTO subjects (user_id, name) VALUES (?, ?)')
    .run(req.userId, name)
  res.json({ id: result.lastInsertRowid, name })
})

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM subjects WHERE id = ? AND user_id = ?').run(req.params.id, req.userId)
  res.json({ success: true })
})

module.exports = router

// server.js additions
app.use('/api/auth', require('./routes/auth'))
app.use('/api/subjects', require('./routes/subjects'))