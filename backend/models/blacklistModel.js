const mongoose = require('mongoose');

// Schema to store blacklisted tokens
const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true }, // Token expiration date
});

module.exports = mongoose.model('Blacklist', blacklistSchema);
