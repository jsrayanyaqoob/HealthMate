import React from "react";

export default function Feedback() {
  const feedback = localStorage.getItem("feedback") || "No feedback available";

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-6">
      <div className="bg-white shadow-md rounded-2xl p-6 max-w-3xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">AI Feedback</h1>
        <p className="text-gray-700 whitespace-pre-line">{feedback}</p>
      </div>
    </div>
  );
}
