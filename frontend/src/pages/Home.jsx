import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  
  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('username');
      setUsername(user);

      try {
        const response = await axiosInstance.get('/posts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to the feed
  };

  const handleLikePost = async (postId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axiosInstance.patch(`/posts/${post_id}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Optionally refetch the posts or update the like count locally
      const updatedPosts = posts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div>
      <h1>Hello, {username}!</h1>  {/* Display personalized greeting */}
      <PostForm onPostCreated={handlePostCreated} />
      <div className="post-feed">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={() => handleLikePost(post.id)} />
        ))}
      </div>
    </div>
  );
};

export default Home;
