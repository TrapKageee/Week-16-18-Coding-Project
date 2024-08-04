import React, { useState } from 'react';
import api from '../axios'; // Import your configured axios instance
import { useNavigate } from 'react-router-dom';

const Create = ({ setItems }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/posts', { title, body }); // Use `api` instead of `axios`
      setItems(prevItems => [response.data, ...prevItems]); // Add newly created post to the list

      // Redirect to homepage
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Body:</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Create;
