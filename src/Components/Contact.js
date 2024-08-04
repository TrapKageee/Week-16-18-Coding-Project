import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous messages
    setSuccess('');
    setError('');

    axios.post('https://66a9e30e613eced4eba6af81.mockapi.io/contact', { message })
      .then(() => setSuccess('Message sent successfully!'))
      .catch((err) => {
        console.error('Error sending message:', err);
        setError('Failed to send message. Please try again.');
      });
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <button type="submit">Send</button>
      </form>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Contact;
