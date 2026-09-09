const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateAnswer(question, content) {

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: `
Answer the user's question ONLY using the information from the PDF content.

PDF Content:
${content.substring(0, 5000)}

Question:
${question}
`
  });

  return response.text;
}

module.exports = generateAnswer;