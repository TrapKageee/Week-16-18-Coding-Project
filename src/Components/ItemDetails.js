// src/Components/ItemDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../axios'; // Import your configured axios instance

const ItemDetails = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/posts/${id}`); // Fetch the specific post by ID
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching the post details:', error);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.body}</p>
      <p>By: {item.user || 'Unknown'}</p> {/* Display user */}
    </div>
  );
};

export default ItemDetails;
