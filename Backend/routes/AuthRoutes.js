// routes/AuthRoutes.js
const express = require("express"); 
const User = require("../models/User");
const router = express.Router();

// 🟢 Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // Save plain password directly
    const newUser = new User({
      name,
      email,
      password, // not hashed
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// 🔵 Login Route
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(401).json({ message: "Invalid email or password" });

//     // Compare directly (plain password)
//     if (user.password !== password)
//       return res.status(401).json({ message: "Invalid email or password" });

//     // Return user info (without password)
//     const { password: _, ...userData } = user.toObject();
//     res.status(200).json({ message: "Login successful", user: userData });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error during login" });
//   }
// });



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🟢 Login request received:", email, password);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found for email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("✅ User found:", user.email);

    if (user.password !== password) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});




module.exports = router;
