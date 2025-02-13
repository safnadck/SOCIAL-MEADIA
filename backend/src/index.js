import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js'; // Make sure this is imported correctly

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5174' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);  // Register comment routes

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
