require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Register (FR-01: restricts to @uoc.edu and allocates 1 introductory credit)
app.post('/api/auth/register', async (req, res) => {
  const { full_name, email } = req.body;
  if (!email || !email.toLowerCase().endsWith('@uoc.edu')) {
    return res.status(400).json({ error: 'Only @uoc.edu emails are allowed.' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO users (full_name, email)
       VALUES ($1, $2)
       RETURNING id, full_name, email, role, credit_balance`,
      [full_name, email.toLowerCase()]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email is already registered.' });
    }
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// Login (Temporary MVP lookup before wiring Firebase JWT verification)
app.post('/api/auth/login', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query(
      'SELECT id, full_name, email, role, credit_balance FROM users WHERE email = $1',
      [email.toLowerCase()]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Account not found. Please register first.' });
    }
    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`EduSwap API running on port ${PORT}`));
