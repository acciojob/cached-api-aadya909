
import React, { useState, useEffect, useMemo } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);        // All posts
  const [loading, setLoading] = useState(true);  // Loading state
  const [userId, setUserId] = useState('');      // Input to filter posts

  // Fetch all posts once
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Only run on mount

  // Memoize filtered posts based on userId input
  const filteredPosts = useMemo(() => {
    if (!userId) return posts;
    return posts.filter(post => post.userId === Number(userId));
  }, [posts, userId]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Post List</h2>
      
      <label>
        Filter by User ID:
        <input
          type="number"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          placeholder="Enter userId (e.g., 1)"
          style={{ marginLeft: '10px' }}
        />
      </label>

      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))
          ) : (
            <p>No posts found for the given User ID.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default PostList;

