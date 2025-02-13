import db from './db.js';

const PostModel = {
  // Get all posts
  getAll: (callback) => {
    db.query('SELECT * FROM posts ORDER BY created_at DESC', callback);
  },

  // Get posts by user ID
  getByUserId: (userId, callback) => {
    db.query('SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC', [userId], callback);
  },

  // Create a new post
  create: (userId, content, image, callback) => {
    db.query('INSERT INTO posts (user_id, content, image) VALUES (?, ?, ?)', [userId, content, image], callback);
  },

  // Update the number of likes for a post
  updateLikes: (postId, newLikes, callback) => {
    db.query('UPDATE posts SET likes = ? WHERE id = ?', [newLikes, postId], callback);
  }
};

export default PostModel;
