import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Report() {
  const [formData, setFormData] = useState({
    reportTitle: "",
    testName: "",
    files: [],
    hospital: "",
    doctor: "",
    date: "",
    price: "",
    notes: "",
  });

  const [aiResponse, setAiResponse] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFiles = (e) => {
    setFormData({ ...formData, files: e.target.files });
  };

  // Submit report
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for backend / Cloudinary
    const data = new FormData();
    data.append("reportTitle", formData.reportTitle);
    data.append("testName", formData.testName);
    data.append("hospital", formData.hospital);
    data.append("doctor", formData.doctor);
    data.append("date", formData.date);
    data.append("price", formData.price);
    data.append("notes", formData.notes);

    // Append files
    for (let i = 0; i < formData.files.length; i++) {
      data.append("files", formData.files[i]);
    }

    try {
      // Send to your backend
      const res = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        // Set AI response
        setAiResponse(result.aiResponse);
        alert("Report submitted successfully!");
      } else {
        alert(result.message || "Failed to submit report");
      }
    } catch (err) {
      console.error("Error submitting report:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-orange-50 px-8 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Submit a Report</h2>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <input
          type="text"
          name="reportTitle"
          value={formData.reportTitle}
          onChange={handleChange}
          placeholder="Report Title (Optional)"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <input
          type="text"
          name="testName"
          value={formData.testName}
          onChange={handleChange}
          placeholder="Test Name"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <input
          type="file"
          name="files"
          multiple
          onChange={handleFiles}
          className="w-full"
        />
        <input
          type="text"
          name="hospital"
          value={formData.hospital}
          onChange={handleChange}
          placeholder="Hospital Name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <input
          type="text"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          placeholder="Doctor Name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional Notes"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold hover:opacity-90 transition"
        >
          Submit Report
        </button>
      </motion.form>

      {/* AI Response */}
      {aiResponse && (
        <div className="mt-10 max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Response</h3>
          <p className="text-gray-700">{aiResponse}</p>
        </div>
      )}
    </div>
  );
}
