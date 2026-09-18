const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/", (req, res) => {

  const { historyId, summary } = req.body;

  const sql =
    "UPDATE history SET summary = ? WHERE id = ?";

  db.query(
    sql,
    [summary, historyId],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Summary saved"
      });

    }
  );

});

module.exports = router;