// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel'); // Make sure the User model is correctly imported

// // Protect routes using JWT
// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1]; // Extract token from header
//       const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

//       // Attach the user to the request object (excluding password)
//       req.user = await User.findById(decoded.id).select('-password');
//       next(); // Allow the request to continue
//     } catch (error) {
//       console.error(error);
//       res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   } else {
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// module.exports = { protect };
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Import User model for validation

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token and attach it to the request object
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
