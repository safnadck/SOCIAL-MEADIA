import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onPostCreated(response.data);
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto mt-8 p-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border rounded-md"
        rows="4"
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full p-2 border rounded-md"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Post</button>
    </form>
  );
};

export default PostForm;
