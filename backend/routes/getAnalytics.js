const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {

  const { email } = req.query;

const query = `
  SELECT
    COUNT(*) AS totalQuizzes,
    MAX(score) AS bestScore,
    ROUND(AVG(accuracy)) AS averageAccuracy
  FROM analytics
  WHERE email = ?
`;

db.query(
  query,
  [email],
  (err, results) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Failed to fetch analytics"
      });
    }

    res.json(results[0]);

  });

});

module.exports = router;