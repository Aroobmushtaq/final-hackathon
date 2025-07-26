import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiUsers } from "react-icons/fi";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("You need to be logged in to view your notes");
      return;
    }

    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUsers(response.data))
      .catch(() => setError("Failed to load users"));

    axios
      .get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setNotes(response.data))
      .catch(() => setError("Failed to load notes"));
  }, [token]);

  const handleEditChange = (e) => {
    setEditNote({
      ...editNote,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditCollaboratorChange = (e) => {
    const { value, checked } = e.target;
    setEditNote({
      ...editNote,
      collaborators: checked
        ? [...editNote.collaborators, value]
        : editNote.collaborators.filter((collab) => collab !== value),
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/notes/${editNote._id}`, editNote, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setNotes(
          notes.map((note) =>
            note._id === editNote._id ? response.data : note
          )
        );
        setEditNote(null);
      })
      .catch(() => setError("Error updating note"));
  };

  const handleDelete = (noteId) => {
    axios
      .delete(`http://localhost:5000/api/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setNotes(notes.filter((note) => note._id !== noteId)))
      .catch(() => setError("Error deleting note"));
  };

  const getCollaboratorNames = (collaborators) => {
    return collaborators
      .map((collaboratorId) => {
        const user = users.find((user) => user._id === collaboratorId);
        return user ? user.name : "Unknown";
      })
      .join(", ");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-between items-center bg-blue-600 p-4 text-white">
        <Link to="/dashboard" className="text-lg font-semibold">
          Dashboard
        </Link>
        <Link
          to="/login"
          className="bg-red-500 px-4 py-2 rounded-md text-sm hover:bg-red-600"
        >
          Logout
        </Link>
      </nav>

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Notes</h2>
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {editNote && (
          <form
            onSubmit={handleUpdate}
            className="mt-4 bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-3">Edit Note</h3>
            <input
              type="text"
              name="title"
              value={editNote.title}
              onChange={handleEditChange}
              placeholder="Note Title"
              className="w-full px-3 py-2 border rounded-md text-sm mb-3"
            />
            <textarea
              name="content"
              value={editNote.content}
              onChange={handleEditChange}
              placeholder="Note Content"
              rows="3"
              className="w-full px-3 py-2 border rounded-md text-sm mb-3"
            />
            <input
              type="text"
              name="subject"
              value={editNote.subject}
              onChange={handleEditChange}
              placeholder="Subject"
              className="w-full px-3 py-2 border rounded-md text-sm mb-3"
            />
            <div className="mb-3">
              <span className="block font-medium text-sm mb-1">
                Collaborators
              </span>
              {users.map((user) => (
                <div key={user._id} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    value={user._id}
                    checked={editNote.collaborators.includes(user._id)}
                    onChange={handleEditCollaboratorChange}
                    className="mr-2"
                  />
                  <span className="text-sm">{user.name}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditNote(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <li
              key={note._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2"
            >
              <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
              <p className="text-sm text-gray-600">{note.content}</p>
              <p className="text-sm text-gray-500">
                <strong>Subject:</strong> {note.subject}
              </p>
              <p className="text-sm text-gray-500">
                <FiUsers className="inline mr-1" />
                {getCollaboratorNames(note.collaborators)}
              </p>
              <div className="flex justify-between space-x-2">
                <button
                  onClick={() => setEditNote(note)}
                  className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-md text-sm hover:bg-yellow-600"
                >
                  <FiEdit className="inline mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="flex-1 bg-red-500 text-white px-3 py-2 rounded-md text-sm hover:bg-red-600"
                >
                  <FiTrash2 className="inline mr-1" />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notes;
