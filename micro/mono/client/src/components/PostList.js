import React, { useState, useEffect } from 'react';
import './PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/posts`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
          data.forEach(p => fetchComments(p.id));
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchComments = async (postId) => {
      try {
        const response = await fetch(`/posts/${postId}/comments`);
        if (response.ok) {
          const data = await response.json();
          setComments(prev => ({ ...prev, [postId]: data }));
        }
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            <div className="comments">
              <h4>Comments:</h4>
              {comments[post.id]?.length > 0 ? (
                <ul>
                  {comments[post.id].map((c, i) => (
                    <li key={i}>{c.content}</li>
                  ))}
                </ul>
              ) : (
                <p>No comments yet</p>
              )}
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newComment[post.id]) return;
                try {
                  const res = await fetch(`/posts/${post.id}/comments`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      postId: post.id,
                      content: newComment[post.id]
                    })
                  });
                  if (res.ok) {
                    const comment = await res.json();
                    setComments(prev => ({
                      ...prev,
                      [post.id]: [...(prev[post.id] || []), comment]
                    }));
                    setNewComment({ ...newComment, [post.id]: '' });
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment[post.id] || ''}
                onChange={(e) =>
                  setNewComment({ ...newComment, [post.id]: e.target.value })
                }
              />
              <button type="submit">Comment</button>
            </form>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;
