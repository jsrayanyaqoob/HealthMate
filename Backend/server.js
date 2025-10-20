const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ================== MongoDB ==================
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/healthmate")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err.message));

// ================== Schemas ==================
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// ================== Routes ==================

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server running", time: new Date() });
});

// 🧠 Get all users (to show their IDs on dashboard)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "_id name email createdAt").sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 🗑️ Delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
});

// ✍️ Edit user name
app.put("/api/users/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.json({ success: true, user: updated });
  } catch (err) {
    console.error("Edit user error:", err);
    res.status(500).json({ success: false, message: "Failed to edit" });
  }
});

// ================== Start ==================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
