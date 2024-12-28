// const mongoose = require('mongoose');

// const noteSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     subject: { type: String, required: true }, // Add subject field
//     collaborators: { type: [String], required: false },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the note
//   },
//   { timestamps: true } // Automatically add createdAt and updatedAt fields
// );

// const Note = mongoose.model('Note', noteSchema);
// module.exports = Note;

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    subject: { type: String, required: true }, // Subject field added
    collaborators: { type: [String], required: false }, // Collaborators as an array of strings (can be changed to ObjectId if you want to reference User model)
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the note
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now },
      }
    ], // Embedded comments
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
