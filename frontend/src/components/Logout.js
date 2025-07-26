// src/components/Logout.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Redirect to the login page
    navigate('/login');
  }, [navigate]);

  return <p>Logging out...</p>;
}

export default Logout;
