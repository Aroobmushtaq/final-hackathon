const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/auth');
const { hashPassword } = require('../utils/hashPassword');

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const createdUser = await user.save();

    // Send response with token
    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      token: generateToken(createdUser._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Compare password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Send response with token
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};


module.exports = { registerUser, loginUser };
