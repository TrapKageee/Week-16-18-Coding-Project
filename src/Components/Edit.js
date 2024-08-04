import React, { useEffect, useState } from 'react';
import api from '../axios'; // Import your configured axios instance
import { useParams, useNavigate } from 'react-router-dom';

const Edit = ({ setItems }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
        setTitle(response.data.title);
        setBody(response.data.body);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Post not found');
        } else {
          setError('An error occurred');
        }
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedPost = { title, body };
      const response = await api.put(`/posts/${id}`, updatedPost);
      // Update the items list in the parent component
      setItems(prevItems => prevItems.map(item => (item.id === id ? response.data : item)));
      navigate('/');
    } catch (err) {
      console.error('Error updating post:', err);
      setError('An error occurred while updating the post');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Edit;
