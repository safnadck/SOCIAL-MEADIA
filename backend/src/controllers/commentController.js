import CommentModel from '../models/commentModel.js';

// Get comments for a specific post
export const getComments = (req, res) => {
  const { postId } = req.params;

  CommentModel.getByPostId(postId, (err, comments) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching comments' });
    }
    res.status(200).json(comments);
  });
};

// Add a comment to a specific post
export const addComment = (req, res) => {
  const { postId } = req.params;
  const { userId, content } = req.body;

  CommentModel.create(postId, userId, content, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding comment' });
    }
    res.status(201).json({ message: 'Comment added successfully' });
  });
};
