import React, { useEffect, useState } from "react";
import { Trash2, Edit3, FolderOpen, LogOut } from "lucide-react";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  // Simulated current user
  const currentUser = {
    name: "Rayan Yaqoob",
    email: "rayan@example.com",
  };

  // 🧠 Fetch all users from DB
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✍️ Edit user name
  const handleEdit = async (id) => {
    if (!newName.trim()) return alert("Name required");
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Updated!");
        setEditingId(null);
        setNewName("");
        fetchUsers();
      }
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  // 🗑️ Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        alert("Deleted");
        fetchUsers();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // 🚪 Logout (placeholder)
  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col">
      {/* 🧭 Navbar */}
      <header className="bg-white shadow-md py-3 px-8 flex justify-between items-center">
        {/* Left - Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-pink-600">HealthMate</h1>
        </div>

        {/* Middle - Nav Links */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-700 hover:text-pink-600 font-medium">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-pink-600 font-medium">
            Report
          </a>
          <a href="#" className="text-gray-700 hover:text-pink-600 font-medium">
            Feedback
          </a>
          <a href="#" className="text-gray-700 hover:text-pink-600 font-medium">
            About
          </a>
        </nav>

        {/* Right - User Avatar + Logout */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-pink-600 border border-pink-500 px-3 py-1 rounded-lg hover:bg-pink-50 transition"
          >
            <LogOut size={16} /> Logout
          </button>
          <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-semibold">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* 🧍 Cards */}
      <main className="flex-grow px-8 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between h-50"
          >
            <div className="flex justify-between items-start">
              {/* Left */}
              <div>
                <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-semibold mb-3">
                  {u.name?.charAt(0).toUpperCase() || "?"}
                </div>

                {editingId === u._id ? (
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                ) : (
                  <h2 className="text-lg font-semibold text-gray-800">
                    {u.name || "(no name)"}
                  </h2>
                )}
                <p className="text-gray-500 text-sm mt-1">{u._id}</p>
              </div>

              {/* Right - Last Activity */}
              <div className="text-sm text-gray-400 text-right">
                Last Activity:{" "}
                <span className="font-medium text-gray-600">
                  {new Date(u.updatedAt || u.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              {editingId === u._id ? (
                <button
                  onClick={() => handleEdit(u._id)}
                  className="flex items-center gap-1 px-3 py-1 border border-green-500 text-green-600 rounded-lg text-sm hover:bg-green-50 transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(u._id);
                    setNewName(u.name);
                  }}
                  className="flex items-center gap-1 px-3 py-1 border border-pink-500 text-pink-600 rounded-lg text-sm hover:bg-pink-50 transition"
                >
                  <Edit3 size={16} /> Edit
                </button>
              )}

              <button
                onClick={() => handleDelete(u._id)}
                className="flex items-center gap-1 px-3 py-1 border border-pink-500 text-pink-600 rounded-lg text-sm hover:bg-pink-50 transition"
              >
                <Trash2 size={16} /> Delete
              </button>

              <button className="flex items-center gap-1 px-3 py-1 border border-pink-500 text-pink-600 rounded-lg text-sm hover:bg-pink-50 transition">
                <FolderOpen size={16} /> Open
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
