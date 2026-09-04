const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateSummary(text) {

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `Summarize the following text in 5 bullet points:

${text}`
  });

  return response.text;
}

module.exports = generateSummary;