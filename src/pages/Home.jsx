// pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { reportLostItem, reportFoundItem, getMatchingItems } from '../services/api';
import './Home.css'; // Import CSS

const Home = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await getMatchingItems();
      setMatches(response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const handleReportLost = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      dateLost: formData.get('dateLost'),
      location: formData.get('location'),
    };
    try {
      await reportLostItem(data);
      alert('Lost item reported successfully!');
      fetchMatches();
    } catch (error) {
      console.error('Error reporting lost item:', error);
    }
  };

  const handleReportFound = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      dateFound: formData.get('dateFound'),
      location: formData.get('location'),
    };
    try {
      await reportFoundItem(data);
      alert('Found item reported successfully!');
      fetchMatches();
    } catch (error) {
      console.error('Error reporting found item:', error);
    }
  };

  return (
    <div className="home-container">
      <h1>Lost &amp; Found Portal</h1>

      <div className="section">
        <h2>Report Lost Item</h2>
        <form onSubmit={handleReportLost}>
          <input type="text" name="name" placeholder="Item Name" required />
          <input type="text" name="description" placeholder="Description" required />
          <input type="date" name="dateLost" required />
          <input type="text" name="location" placeholder="Location" required />
          <button type="submit">Report Lost</button>
        </form>
      </div>

      <div className="section">
        <h2>Report Found Item</h2>
        <form onSubmit={handleReportFound}>
          <input type="text" name="name" placeholder="Item Name" required />
          <input type="text" name="description" placeholder="Description" required />
          <input type="date" name="dateFound" required />
          <input type="text" name="location" placeholder="Location" required />
          <button type="submit">Report Found</button>
        </form>
      </div>

      <div className="section">
        <h2>Matching Items</h2>
        {matches.length === 0 && <p>No matching items found.</p>}
        {matches.map((match, index) => (
          <div key={index} className="match-item">
            <h3>Lost Item: {match.lostItem.name}</h3>
            <p>{match.lostItem.description}</p>
            <ul>
              {match.foundItems.map((foundItem) => (
                <li key={foundItem._id}>
                  <strong>Found Item:</strong> {foundItem.name} - {foundItem.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
