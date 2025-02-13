import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for the entire profile
  const [error, setError] = useState(null); // Error state for handling errors

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Replace with actual logged-in user info
        const userId = 1;
        const userResponse = await axios.get(`http://localhost:5000/api/users/${user_id}`);
        setUser(userResponse.data);

        const userPostsResponse = await axios.get(`http://localhost:5000/api/posts/user/${user_id}`);
        setPosts(userPostsResponse.data);
      } catch (err) {
        setError('Failed to load profile or posts. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false once the request finishes (either success or failure)
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Error message if any issue occurs
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      {user && (
        <div>
          <h2 className="font-semibold">{user.username}</h2>
          <p>{user.email}</p>
        </div>
      )}
      <h2 className="mt-4">My Posts</h2>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} onLike={() => {}} />
          ))
        ) : (
          <p>No posts available</p> // Message when there are no posts
        )}
      </div>
    </div>
  );
};

export default Profile;
