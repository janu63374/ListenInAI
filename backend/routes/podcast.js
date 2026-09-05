const express = require("express");
const router = express.Router();

const generatePodcast = require("../utils/podcastGenerator");

router.post("/", async (req, res) => {

  try {

    const { text } = req.body;

    const podcast = await generatePodcast(text);

    res.json({
      podcast
    });

  } catch (error) {

  console.log(error);

  res.status(500).json({
    message: error.message
  });

}
});

module.exports = router;