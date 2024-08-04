import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} My Website</p>
      <p>
        <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> 
      </p>
    </footer>
  );
};

export default Footer;
