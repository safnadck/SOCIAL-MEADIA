import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object to handle form submission
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    // Debugging: Log the form data
    console.log('Form Data:', formData);

    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');  // Assuming userId is stored in localStorage

      // Append userId to formData
      formData.append('userId', userId);

      // Send POST request to create a post
      const response = await axios.post('http://localhost:5002/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle success response: notify the parent component of the new post
      onPostCreated(response.data);
      
      // Clear the form fields
      setContent('');
      setImage(null);
    } catch (error) {
      // Log detailed error message for debugging
      console.error('Error creating post:', error.response ? error.response.data : error.message);
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
        Post
      </button>
    </form>
  );
};

export default PostForm;
