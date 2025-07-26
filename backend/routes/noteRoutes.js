// const express = require('express');
// const { createNote, getNotes, updateNote, deleteNote ,addComment} = require('../controllers/noteController');
// const { protect } = require('../middleware/authMiddleware'); // Correct path to authMiddleware

// const router = express.Router();

// // Protect middleware can be used to secure the routes
// router.post('/', protect, createNote); // POST route to create a note
// router.post('/:noteId/comments', protect, addComment); // POST route to create a note
// router.get('/', protect, getNotes);    // GET route to retrieve notes
// router.put('/:noteId', protect, updateNote); // PUT route to update a note
// router.delete('/:noteId', protect, deleteNote); // DELETE route to delete a note

// module.exports = router;
const express = require('express');
const { createNote, getNotes, updateNote, deleteNote, addComment } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware'); // Correct path to authMiddleware

const router = express.Router();

// Protect middleware can be used to secure the routes
router.post('/', protect, createNote); // POST route to create a note
router.get('/', protect, getNotes); // GET route to retrieve notes
router.put('/:noteId', protect, updateNote); // PUT route to update a note
router.delete('/:noteId', protect, deleteNote); // DELETE route to delete a note

// Add comment to a note
router.post('/:noteId/comments', protect, addComment); // Route to add a comment to a note

// Get all comments for a note
router.get('/:noteId/comments', protect, async (req, res) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findById(noteId).populate('comments.user', 'name'); // Populate user details for each comment
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.json(note.comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
});

module.exports = router;
