// pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { resolveItem, getMatchingItems } from '../services/api';
import './Admin.css'; // Import the CSS file

const Admin = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await getMatchingItems();
      setMatches(response.data);
    } catch (error) {
      console.error('Error fetching matched items:', error);
    }
  };

  // Resolve an item (lost or found)
  const handleResolve = async (itemId) => {
    try {
      await resolveItem(itemId);
      alert('Item resolved successfully!');
      fetchMatches();
    } catch (error) {
      console.error('Error resolving item:', error);
      alert('Error resolving item.');
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <div className="admin-section">
        <h2>Matched Items</h2>
        {matches.length === 0 && <p>No matched items found.</p>}
        {matches.map((match, index) => (
          <div key={index} className="match-item">
            <h3>Lost Item: {match.lostItem.name}</h3>
            <p>{match.lostItem.description}</p>
            <button onClick={() => handleResolve(match.lostItem._id)}>
              Resolve Lost Item
            </button>
            <ul>
              {match.foundItems.map((foundItem) => (
                <li key={foundItem._id}>
                  <span>
                    <strong>Found Item:</strong> {foundItem.name} - {foundItem.description}
                  </span>
                  <button onClick={() => handleResolve(foundItem._id)}>
                    Resolve Found Item
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
