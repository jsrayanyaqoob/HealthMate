const fetch = require("node-fetch");

async function getGeminiFeedback(description) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze this medical report and give clear feedback:\n\n${description}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error Response:", data);
      return "Error fetching AI feedback.";
    }

    const feedback =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI could not generate feedback.";
    return feedback;
  } catch (err) {
    console.error("Gemini API error:", err.message);
    return "Error fetching AI feedback.";
  }
}

module.exports = { getGeminiFeedback };
