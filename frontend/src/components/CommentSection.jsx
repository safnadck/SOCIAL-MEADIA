// src/components/CommentSection.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/comments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await axiosInstance.post(
        '/comments',
        { postId, content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prevComments) => [
        ...prevComments,
        response.data, // Add the new comment
      ]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <form onSubmit={handleSubmitComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Post Comment</button>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
