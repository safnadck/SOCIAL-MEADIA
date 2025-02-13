import React from 'react';
import { useState } from 'react';
import CommentSection from './CommentSection';

const PostCard = ({ post, onLike }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <span className="font-bold">{post.username}</span>
        <span className="text-gray-500">{new Date(post.created_at).toLocaleString()}</span>
      </div>
      <p className="mt-2">{post.content}</p>
      {post.image && <img src={post.image} alt="post" className="w-full mt-2 rounded-lg" />}
      <div className="flex justify-between items-center mt-3">
        <button onClick={onLike} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {post.likes} Like{post.likes > 1 ? 's' : ''}
        </button>
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
      </div>
      {showComments && <CommentSection postId={post.id} />}
    </div>
  );
};

export default PostCard;
