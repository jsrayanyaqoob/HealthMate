// routes/ReportRoutes.js
const express = require("express");
const router = express.Router();
const { getGeminiFeedback } = require("../services/geminiService");

// POST: Add a new report and get AI feedback
router.post("/", async (req, res) => {
  try {
    const { title, type, description } = req.body;

    if (!title || !type || !description)
      return res.status(400).json({ success: false, message: "Missing fields" });

    // Get AI feedback
    const feedback = await getGeminiFeedback(description);

    res.json({
      success: true,
      report: { title, type, description },
      feedback,
    });
  } catch (err) {
    console.error("Report error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
