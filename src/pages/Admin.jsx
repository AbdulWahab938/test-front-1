// pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { resolveItem, getMatchingItems } from '../services/api';

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
    <div>
      <h1>Admin Panel</h1>
      <h2>Matched Items</h2>
      {matches.length === 0 && <p>No matched items found.</p>}
      {matches.map((match, index) => (
        <div key={index}>
          <h3>Lost Item: {match.lostItem.name}</h3>
          <p>{match.lostItem.description}</p>
          <button onClick={() => handleResolve(match.lostItem._id)}>
            Resolve Lost Item
          </button>
          <ul>
            {match.foundItems.map((foundItem) => (
              <li key={foundItem._id}>
                <strong>Found Item:</strong> {foundItem.name} - {foundItem.description}
                <button onClick={() => handleResolve(foundItem._id)}>
                  Resolve Found Item
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Admin;
