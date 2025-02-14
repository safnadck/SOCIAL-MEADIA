import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');  // Initially empty
  const [loading, setLoading] = useState(true);  // State for loading
  const [error, setError] = useState(null);  // State for error handling

  // Fetch posts and username on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('username');  // Get username from localStorage

      console.log('Fetched username from localStorage:', user);  // Debugging line to check value

      if (user) {
        setUsername(user);  // Set the username state if it exists
      } else {
        console.log('Username not found in localStorage');  // If no username found
      }

      try {
        const response = await axiosInstance.get('/posts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data && Array.isArray(response.data)) {
          setPosts(response.data); // Assuming the response is an array of posts
        } else {
          setError('Failed to load posts. No posts found.');
        }
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        setError('Failed to fetch posts. Please try again later.');
        setLoading(false);  // Set loading to false if there's an error
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);  // Empty dependency array means this runs only on mount

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to the feed
  };

  const handleLikePost = async (postId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axiosInstance.patch(`/posts/${postId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Ensure the server responded with a success, then update the likes
      if (response.status === 200) {
        const updatedPosts = posts.map(post =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        );
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div>
      {/* Display personalized greeting if username exists */}
      <h1 className='text-[20px] font-bold text-red-500'>
        {username ? 'Hello, Guest!': ""}  {/* Fallback to 'Guest' */}
      </h1>

      <PostForm onPostCreated={handlePostCreated} />

      {loading ? (
        <div>Loading posts...</div>  // Or a spinner here
      ) : error ? (
        <div className="error-message">{error}</div>  // Show error message if fetch fails
      ) : (
        <div className="post-feed">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onLike={() => handleLikePost(post.id)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
