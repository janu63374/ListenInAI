const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateQuiz(text) {

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: `
Generate exactly 5 multiple choice questions.

Return ONLY a valid JSON array.

Example:

[
  {
    "question": "What is TCP?",
    "options": [
      "Network Layer",
      "Transport Layer",
      "Data Link Layer",
      "Physical Layer"
    ],
    "answer": "Transport Layer"
  }
]

Text:
${text.substring(0, 3000)}
`
  });

  return response.text;
}

module.exports = generateQuiz;