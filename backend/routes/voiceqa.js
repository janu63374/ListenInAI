const express = require("express");
const generateAnswer = require("../utils/voiceQAGenerator");

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { question, content } = req.body;

    const answer = await generateAnswer(
      question,
      content
    );

    res.json({
      answer
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Voice Q&A failed"
    });

  }

});

module.exports = router;