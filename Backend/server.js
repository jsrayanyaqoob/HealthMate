const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/reports", async (req, res) => {
  const { title, type, description } = req.body;

  if (!title || !type || !description)
    return res.status(400).json({ message: "All fields are required" });

  // Create a prompt for Gemini
  const userPrompt = `Title: ${title}\nType: ${type}\nDescription: ${description}\nProvide a concise report response based on this.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: { text: userPrompt },
          temperature: 0.7,
          max_output_tokens: 256,
        }),
      }
    );

    const data = await response.json();

    // Extract the text response from Gemini
    const aiResponse =
      data.candidates?.[0]?.content?.[0]?.text || "No response from AI";

    // You can also save this report to your MongoDB if you want
    // const newReport = await Report.create({ title, type, description, aiResponse });

    res.json({ report: { aiResponse } });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ message: "Failed to generate AI response" });
  }
});





// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/healthmate")
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });



// User Schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    unique: true, 
    required: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

// Report Schema
const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Medical', 'Financial', 'Technical', 'Other']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  aiResponse: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Report = mongoose.model("Report", reportSchema);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Signup endpoint
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "User with this email already exists" 
      });
    }

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password.trim()
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Signup error:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error during signup"
    });
  }
});

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password are required" 
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // Check password (plain text for now)
    if (user.password !== password.trim()) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
});

// Submit report endpoint
app.post("/api/reports", async (req, res) => {
  try {
    const { title, type, description } = req.body;

    // Validation
    if (!title || !type || !description) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Create report
    const newReport = new Report({
      title: title.trim(),
      type,
      description: description.trim(),
      aiResponse: "Thank you for your report. We have received it and will review it shortly. For immediate assistance, please contact our support team."
    });

    await newReport.save();

    res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      report: {
        id: newReport._id,
        title: newReport.title,
        type: newReport.type,
        description: newReport.description,
        aiResponse: newReport.aiResponse,
        status: newReport.status,
        createdAt: newReport.createdAt
      }
    });

  } catch (error) {
    console.error("Report submission error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during report submission"
    });
  }
});

// Get all users endpoint
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email createdAt");
    res.json({
      success: true,
      count: users.length,
      users: users
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users"
    });
  }
});

// Get all reports endpoint
app.get("/api/reports", async (req, res) => {
  try {
    const reports = await Report.find({}, "title type description aiResponse status createdAt")
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: reports.length,
      reports: reports
    });
  } catch (error) {
    console.error("Get reports error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching reports"
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth/`);
  console.log(`📝 Report endpoints: http://localhost:${PORT}/api/reports`);
});