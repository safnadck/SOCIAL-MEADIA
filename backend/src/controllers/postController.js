import PostModel from '../models/postModel.js';

// Get all posts
export const getPosts = (req, res) => {
  PostModel.getAll((err, posts) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching posts' });
    }
    res.status(200).json(posts);
  });
};

// Create a new post
export const createPost = (req, res) => {
  const { userId, content, image } = req.body;

  PostModel.create(userId, content, image, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating post' });
    }
    res.status(201).json({ message: 'Post created successfully', postId: result.insertId });
  });
};

// Like a post
export const likePost = (req, res) => {
  const { postId } = req.params;

  PostModel.getById(postId, (err, post) => {
    if (err || !post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newLikes = post.likes + 1;
    PostModel.updateLikes(postId, newLikes, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating likes' });
      }
      res.status(200).json({ message: 'Post liked successfully' });
    });
  });
};
