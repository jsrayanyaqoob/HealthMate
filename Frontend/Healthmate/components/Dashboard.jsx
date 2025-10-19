import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard.jsx";
import Feedback from "./Feedback.jsx";

export default function Dashboard({ onNavigate }) {
  const [page, setPage] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editUsername, setEditUsername] = useState("");

  // Load logged-in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setCurrentUser(user);
    else onNavigate("home"); // redirect if no user
  }, [onNavigate]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Fetch users error:", err);
      setUsers([]); // prevent crashing
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    onNavigate("home");
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // Open user (switch context)
  const handleOpen = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
    alert(`Logged in as ${user.name}`);
  };

  // Edit user
  const handleEdit = (user) => {
    setEditUser(user);
    setEditUsername(user.name);
  };

  const handleSaveEdit = async () => {
    if (!editUsername) return alert("Name cannot be empty");
    try {
      await fetch(`http://localhost:5000/api/users/${editUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editUsername }),
      });
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Edit failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex items-center relative">
        <h1 className="text-2xl font-bold text-blue-600">Healthcare</h1>

        <div className="flex gap-6 absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => setPage("dashboard")}
            className="text-gray-700 font-semibold hover:text-blue-600 transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => setPage("feedback")}
            className="text-gray-700 font-semibold hover:text-blue-600 transition"
          >
            Feedback
          </button>
          <button
            onClick={() => onNavigate("report")}
            className="text-gray-700 font-semibold hover:text-blue-600 transition"
          >
            Create Report
          </button>
          <button
            onClick={() => setPage("service")}
            className="text-gray-700 font-semibold hover:text-blue-600 transition"
          >
            Service
          </button>
          <button
            onClick={() => setPage("faq")}
            className="text-gray-700 font-semibold hover:text-blue-600 transition"
          >
            FAQ
          </button>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
            {currentUser?.name?.charAt(0) || "U"}
          </div>
          <span className="font-semibold text-gray-700">{currentUser?.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        {page === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {users.map((user) => (
                <ProfileCard
                  key={user._id}
                  title={user.name}
                  subtitle={user.email}
                  lastActivity={new Date(user.updatedAt || user.createdAt).toLocaleDateString()}
                  onEdit={() => handleEdit(user)}
                  onDelete={() => handleDelete(user._id)}
                  onOpen={() => handleOpen(user)}
                />
              ))}
            </div>
          </>
        )}

        {page === "feedback" && <Feedback />}
        {page === "service" && <div>Service Page</div>}
        {page === "faq" && <div>FAQ Page</div>}
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <input
              type="text"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
