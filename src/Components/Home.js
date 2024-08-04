// src/Components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import api from '../axios'; // Import your configured axios instance
import './Home.css'; // Import your CSS file for styling

const Home = ({ items, setItems }) => {
  const handleDelete = (id) => {
    api.delete(`/posts/${id}`)
      .then(() => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
      })
      .catch(error => console.error("There was an error deleting the item!", error));
  };

  return (
    <div className="home-container">
      <h1>Home</h1>
      <Link to="/create" className="create-link">Create New Item</Link>
      <ul className="post-list">
        {items.map(item => (
          <li key={item.id} className="post-item">
            <h2>
              <Link to={`/posts/${item.id}`} className="post-title">{item.title}</Link> {/* Link to ItemDetails */}
            </h2>
            <p className="post-body">{item.body}</p>
            <p className="post-user">By: {item.user || 'Unknown'}</p> {/* Display user */}
            <Link to={`/edit/${item.id}`} className="edit-link">Edit</Link>
            <button onClick={() => handleDelete(item.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
