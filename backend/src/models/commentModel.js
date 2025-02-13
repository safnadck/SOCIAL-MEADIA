import db from './db.js';

const CommentModel = {
  // Get comments for a specific post
  getByPostId: (postId, callback) => {
    db.query('SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC', [postId], callback);
  },

  // Create a new comment
  create: (postId, userId, content, callback) => {
    db.query('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', [postId, userId, content], callback);
  }
};

export default CommentModel;
