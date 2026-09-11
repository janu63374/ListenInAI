const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateAnswer(question, content) {

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: `
Answer the question based on the text.

IMPORTANT:
- Do not use *, **, #, -, or any markdown symbols.
- Return plain text only.
- Use simple paragraphs and bullet points without special formatting.

PDF Content:
${content.substring(0, 5000)}

Question:
${question}
`
  });

  return response.text;
}

module.exports = generateAnswer;