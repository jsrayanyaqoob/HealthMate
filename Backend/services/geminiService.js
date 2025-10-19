const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async generateFeedbackResponse(reportData) {
    try {
      const { title, type, description } = reportData;
      
      const prompt = `
        You are a helpful AI assistant for a health and wellness platform. 
        A user has submitted a report with the following details:
        
        Title: ${title}
        Type: ${type}
        Description: ${description}
        
        Please provide a helpful, professional response that:
        1. Acknowledges their concern
        2. Provides relevant advice or suggestions based on the report type
        3. Offers encouragement and support
        4. Keeps the response concise but informative (2-3 paragraphs max)
        
        If this is a medical report, remind them to consult with healthcare professionals.
        If it's technical, provide troubleshooting suggestions.
        If it's financial, offer general financial wellness tips.
        
        Make the response warm, supportive, and actionable.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }
}

module.exports = new GeminiService();
