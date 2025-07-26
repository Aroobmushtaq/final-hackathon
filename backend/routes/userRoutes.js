const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Import protect middleware
const { logoutUser } = require('../controllers/authController'); // Import logout controller
const User=require("../models/userModel")
const router = express.Router();
router.get('/', protect, async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  });
// Routes
router.post('/register', registerUser); // User registration route
router.post('/login', loginUser);       // User login route
router.post('/logout', protect, logoutUser); // Logout route (requires authentication)

module.exports = router;
