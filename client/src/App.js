// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [user, setUser] = useState({});
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    // Fetch user data when the component mounts
    fetch('/api/users/username', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const handlePost = () => {
    // Emit a new post event to the server
    socket.emit('new post', { user: user.username, text: newPost });
    setNewPost('');
  };

  return (
    <div className="App">
      <h1>Social Media Dashboard</h1>
      <div>
        <h2>My Profile</h2>
        <p>Username: {user.username}</p>
        <p>Followers: {user.followers.length}</p>
        <h3>My Posts</h3>
        <ul>
          {user.posts.map((post, index) => (
            <li key={index}>
              {post.text} - Likes: {post.likes} - Comments: {post.comments.length}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Create a New Post</h2>
        <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)}></textarea>
        <button onClick={handlePost}>Post</button>
      </div>
    </div>
  );
}

export default App;
