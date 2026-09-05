const express = require("express");
const generateQuiz = require("../utils/quizGenerator");

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { text } = req.body;

    const quizText = await generateQuiz(text);

    const quiz = JSON.parse(
      quizText.replace(/```json|```/g, "")
    );

   res.json({ quiz });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Quiz generation failed"
    });

  }

});

module.exports = router;