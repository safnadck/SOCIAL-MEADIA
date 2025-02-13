import { Router } from 'express';
import { getComments, addComment } from '../controllers/commentController.js';  // Correct import

const router = Router();

// Route to get comments for a specific post
router.get('/:postId', getComments);

// Route to add a new comment to a post
router.post('/:postId', addComment);

export default router;
