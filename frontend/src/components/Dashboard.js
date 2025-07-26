import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NotesImage from "../components/images/Online Course.png";

function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setNotes(response.data);
        setFilteredNotes(response.data); // Initialize filtered notes
      })
      .catch(() => {
        setError("Error fetching notes");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = notes.filter(
      (note) =>
        note.subject.toLowerCase().includes(value) || // Search by subject
        note.title.toLowerCase().includes(value) || 
        note.content.toLowerCase().includes(value)
    );
    setFilteredNotes(filtered); // Update the filtered notes based on the search term
  };

  const handleAddComment = (noteId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .post(
        `http://localhost:5000/api/notes/${noteId}/comments`,
        { content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const updatedNotes = notes.map((note) =>
          note._id === noteId ? { ...note, comments: response.data } : note
        );
        setNotes(updatedNotes);
        setFilteredNotes(updatedNotes); // Update filtered notes after adding the comment
        setCommentText("");
        setSelectedNoteId(null);
      })
      .catch(() => {
        setError("Error adding comment");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center text-white shadow-lg">
        <h1 className="text-2xl font-bold">Collaborative Notes</h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline"></Link>
          <Link
            to="/create-note"
            className="hover:bg-purple-700 px-4 py-2 rounded transition"
          >
            Create Notes
          </Link>
          <Link
            to="/notes"
            className="hover:bg-purple-700 px-4 py-2 rounded transition"
          >
            Edit Notes
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* About Section */}
      <div className="p-16 my-10 bg-white shadow-lg rounded-lg flex flex-col sm:flex-row items-center gap-10">
        <div className="sm:w-1/2">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Collaborative Notes is a platform designed to make teamwork
            efficient and organized. Users can create, edit, and share notes
            with collaborators, leave comments, and stay updated. This tool is
            ideal for group projects, study sessions, or professional tasks.
          </p>
        </div>
        <div className="sm:w-80 ml-28">
          <img
            src={NotesImage}
            alt="Collaborative Notes"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>

      {/* Search Section */}
      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Search Notes</h2>
        <p className="text-gray-600 mb-6">
          Quickly find the notes you're looking for by typing the subject name in the search box.
        </p>
        <input
          type="text"
          placeholder="Search by subject..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-3 rounded-lg w-full sm:w-1/2 shadow focus:ring focus:ring-purple-300"
        />
      </div>

      {/* Notes List */}
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">All Notes</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="border border-gray-300 rounded-lg p-6 bg-white shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-800">{note.title}</h3>
              <p className="mt-2 text-gray-600">{note.content}</p>
              <p className="mt-2 text-sm text-gray-500">
                <strong>Subject:</strong> {note.subject} {/* Display the subject */}
              </p>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700">Comments:</h4>
                <ul className="ml-4 list-disc space-y-2">
                  {note.comments?.map((comment) => (
                    <li key={comment._id} className="text-gray-800">
                      <span className="font-bold">{comment.user.name}:</span>{" "}
                      {comment.comment}
                    </li>
                  ))}
                </ul>

                {selectedNoteId === note._id && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-300"
                    />
                    <button
                      onClick={() => handleAddComment(note._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-green-600 transition"
                    >
                      Submit Comment
                    </button>
                  </div>
                )}

                <button
                  onClick={() =>
                    setSelectedNoteId(selectedNoteId === note._id ? null : note._id)
                  }
                  className="mt-2 text-purple-600 hover:underline"
                >
                  {selectedNoteId === note._id ? "Cancel" : "Add Comment"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 mt-10">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link to="/privacy-policy" className="hover:text-gray-200 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-gray-200 text-sm">
              Terms of Service
            </Link>
          </div>
          <div className="text-sm">
            <p>&copy; 2024 Collaborative Notes. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
