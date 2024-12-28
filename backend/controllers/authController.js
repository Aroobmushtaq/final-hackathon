const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklistModel');

// Logout Functionality
const logoutUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    // Add token to the blacklist
    await Blacklist.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
  };
  
  module.exports = { logoutUser };
  