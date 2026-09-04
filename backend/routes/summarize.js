const express = require("express");
const router = express.Router();

const generateSummary = require("../utils/gemini");

router.post("/", async (req, res) => {

  try {

    const { text } = req.body;

    const summary = await generateSummary(text);

    res.json({
      summary
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Summary generation failed"
    });
  }

});

module.exports = router;