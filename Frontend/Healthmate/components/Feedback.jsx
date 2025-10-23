// components/Feedback.jsx
import React, { useEffect, useState } from "react";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("aiFeedback");
    if (saved) setFeedback(saved);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">AI Feedback</h2>
      {feedback ? (
        <div className="bg-gray-100 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">
          {feedback}
        </div>
      ) : (
        <p className="text-gray-500">No feedback available yet.</p>
      )}
    </div>
  );
}
