import db from './db.js';

const UserModel = {
  // Find user by email
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  // Register a new user
  create: (username, email, password, callback) => {
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], callback);
  },

  // Find user by ID
  findById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  }
};

export default UserModel;
