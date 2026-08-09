const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const db = require('../db')

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email, and password are required' })
  }
  // hash before storing — the DB should never see a plain-text password
  const passwordHash = await bcrypt.hash(password, 10)
  try {
    const insert = db.prepare(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)'
    )
    const result = insert.run(name, email, passwordHash)
    const token = jwt.sign({ userId: result.lastInsertRowid }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    res.json({ token, name })
  } catch (err) {
    // UNIQUE constraint on email fails here if the address is taken
    res.status(400).json({ error: 'Email already in use' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  if (!user) return res.status(401).json({ error: 'Invalid email or password' })

  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) return res.status(401).json({ error: 'Invalid email or password' })

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, name: user.name })
})

module.exports = router