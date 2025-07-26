import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiEdit, FiClipboard, FiTag, FiUser } from "react-icons/fi";

function CreateNote() {
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    subject: "",
    collaborators: [],
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("You need to be logged in to create notes");
      return;
    }

    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch(() => {
        setError("Failed to load users");
      });
  }, [token]);

  const handleInputChange = (e) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  };

  const handleCollaboratorChange = (e) => {
    const { value, checked } = e.target;
    setNewNote({
      ...newNote,
      collaborators: checked
        ? [...newNote.collaborators, value]
        : newNote.collaborators.filter((collab) => collab !== value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const collaboratorsArray =
      typeof newNote.collaborators === "string"
        ? newNote.collaborators
            .split(",")
            .map((collaborator) => collaborator.trim())
        : newNote.collaborators;

    const noteData = {
      ...newNote,
      collaborators: collaboratorsArray,
    };

    axios
      .post("http://localhost:5000/api/notes", noteData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate("/notes");
      })
      .catch(() => {
        setError("Error creating note");
      });
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-4 w-96">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Create Note
        </h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm text-gray-700 mb-1">
              <FiEdit className="inline mr-1" />
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              value={newNote.title}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm text-gray-700 mb-1"
            >
              <FiClipboard className="inline mr-1" />
              Content
            </label>
            <textarea
              name="content"
              id="content"
              placeholder="Enter content"
              value={newNote.content}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm text-gray-700 mb-1"
            >
              <FiTag className="inline mr-1" />
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Enter subject"
              value={newNote.subject}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              <FiUser className="inline mr-1" />
              Collaborators
            </label>
            <div className="h-24 overflow-y-auto border rounded p-2">
              {users.map((user) => (
                <div key={user._id} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    value={user._id}
                    checked={newNote.collaborators.includes(user._id)}
                    onChange={handleCollaboratorChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{user.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600"
            >
              Create
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-500 text-white py-2 rounded text-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
