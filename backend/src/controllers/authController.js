import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/db.js';

// Register user
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (result.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to register user' });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

// Login user
export const login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (result.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, result[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  });
};

// Get user data
export const getUser = (req, res) => {
  const userId = req.user.id; // Assuming user ID is set in req.user by a middleware

  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(result[0]); // Return the user data
  });
};
