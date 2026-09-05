const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateSummary(text) {

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: `Summarize the following text in exactly 5 numbered points.

Do not use *, -, or any markdown symbols.

Text:
${text}`
  });

  return response.text;
}

module.exports = generateSummary;