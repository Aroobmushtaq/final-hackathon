import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CollaboratorSelector({ onCollaboratorsSelected }) {
  const [users, setUsers] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(response.data); // List of users
      })
      .catch(() => {
        alert('Failed to fetch users');
      });
  }, [token]);

  const handleUserSelect = (userId) => {
    setSelectedCollaborators((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId); // Deselect
      }
      return [...prev, userId]; // Select
    });
  };

  const handleSubmit = () => {
    onCollaboratorsSelected(selectedCollaborators);
  };

  return (
    <div>
      <h3>Select Collaborators</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <input
              type="checkbox"
              onChange={() => handleUserSelect(user._id)}
              checked={selectedCollaborators.includes(user._id)}
            />
            {user.name}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Collaborators
      </button>
    </div>
  );
}

export default CollaboratorSelector;
