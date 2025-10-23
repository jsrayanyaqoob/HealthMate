// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const Report = require('./models/Report')
// const router = express.Router();

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // ================== MongoDB ==================
// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/healthmate")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ Mongo error:", err.message));

// // ================== Schemas ==================
// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, unique: true, required: true, lowercase: true, trim: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);

// // ================== Routes ==================

// // Health check
// app.get("/api/health", (req, res) => {
//   res.json({ success: true, message: "Server running", time: new Date() });
// });

// // 🧠 Get all users (to show their IDs on dashboard)
// app.get("/api/users", async (req, res) => {
//   try {
//     const users = await User.find({}, "_id name email createdAt").sort({ createdAt: -1 });
//     res.json({ success: true, users });
//   } catch (err) {
//     console.error("Get users error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // 🗑️ Delete a user by ID
// app.delete("/api/users/:id", async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "User deleted" });
//   } catch (err) {
//     console.error("Delete user error:", err);
//     res.status(500).json({ success: false, message: "Failed to delete" });
//   }
// });

// // ✍️ Edit user name
// app.put("/api/users/:id", async (req, res) => {
//   try {
//     const { name } = req.body;
//     const updated = await User.findByIdAndUpdate(
//       req.params.id,
//       { name },
//       { new: true }
//     );
//     res.json({ success: true, user: updated });
//   } catch (err) {
//     console.error("Edit user error:", err);
//     res.status(500).json({ success: false, message: "Failed to edit" });
//   }
// });

// // ================== Signup Route ==================
// app.post("/api/auth/signup", async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     // Create new user
//     const newUser = await User.create({ name, email, password });

//     res.status(201).json({
//       message: "Signup successful!",
//       user: { id: newUser._id, name: newUser.name, email: newUser.email },
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error during signup" });
//   }
// });


// // ================== Login Route ==================
// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     res.status(200).json({
//       message: "Login successful!",
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error during login" });
//   }
// });

// app.post("/api/reports", async (req, res) => {
//   try {
//     const { title, type, description } = req.body;
//     // save report to DB or just return the object
//     res.json({ success: true, report: { title, type, description } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Failed to add report" });
//   }
// });

// app.use(router)

// router.post("/api/feedback", async (req, res) => {
//   const { report } = req.body;
//   if (!report) return res.status(400).json({ success: false, message: "No report provided" });

//   try {
//     const response = await fetch("https://api.openai.com/v1/responses", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
//   },
//   body: JSON.stringify({
//     model: "gemini-1.5",
//     input: `Analyze this medical report and provide a concise explanation:\n\n${report.description}`
//   }),
// });


//     const data = await response.json();
//     const aiText = data?.choices?.[0]?.message?.content || "No response";

//     res.json({ success: true, feedback: aiText });
//   } catch (err) {
//     console.error("Gemini error:", err.message);
//     res.status(500).json({ success: false, message: "Failed to get AI feedback" });
//   }
// });

// module.exports = router;


// // ================== Start ==================
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });









// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const ReportRoutes = require("./routes/ReportRoutes");
const authRoutes = require("./routes/AuthRoutes");
const usersRoutes = require("./routes/userRoutes")

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/healthmate")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err.message));

// Routes
app.use("/api/reports", ReportRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server running fine" });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
