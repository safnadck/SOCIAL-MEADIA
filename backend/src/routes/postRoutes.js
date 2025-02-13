import { Router } from 'express';
import { getPosts, createPost, likePost } from '../controllers/postController.js';  // Correct import

const router = Router();

// Route to get all posts
router.get('/', getPosts);

// Route to create a new post
router.post('/', createPost);

// Route to like a post
router.put('/:postId/like', likePost);

export default router;
