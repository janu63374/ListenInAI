const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/", (req, res) => {

  const { email, score, accuracy } = req.body;

  db.query(
    "INSERT INTO analytics (email, score, accuracy) VALUES (?, ?, ?)",
    [email, score, accuracy],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Failed to save analytics"
        });
      }

      res.json({
        message: "Analytics saved"
      });

    }
  );

});

module.exports = router;