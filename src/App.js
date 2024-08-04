// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import Create from './Components/Create';
import Edit from './Components/Edit';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import ItemDetails from './Components/ItemDetails';
import NotFound from './Components/NotFound';
import UserInfo from './Components/UserInfo'; // Import UserInfo component
import api from './axios';
import './App.css'; // Import your CSS file

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/posts'); // Fetch all posts
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create Post</Link>
            </li>
            <li>
              <Link to="/userinfo">User Info</Link> {/* UserInfo link */}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home items={items} setItems={setItems} />} />
          <Route path="/create" element={<Create setItems={setItems} />} />
          <Route path="/edit/:id" element={<Edit setItems={setItems} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/posts/:id" element={<ItemDetails />} />
          <Route path="/userinfo" element={<UserInfo />} /> {/* Add UserInfo route */}
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
