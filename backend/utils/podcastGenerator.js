const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generatePodcast(text) {

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: `
Create a podcast conversation between Host and Guest.

Rules:
- Use exactly "Host:" and "Guest:"
- Every dialogue line must start with Host: or Guest:
- Educational tone
- Easy to understand
- Host asks questions
- Guest explains concepts
- Around 10 exchanges
- Keep responses concise and engaging

Content:
${text}
`
  });

  return response.text;
}

module.exports = generatePodcast;