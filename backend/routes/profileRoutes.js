const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected Route to get user profile
router.get('/profile', protect, (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
});

module.exports = router;
