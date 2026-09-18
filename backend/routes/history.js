const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/details/:id", (req, res) => {

  const id = req.params.id;

  const sql =
    "SELECT * FROM history WHERE id = ?";

  db.query(
    sql,
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);

    }
  );

});

router.get("/", (req, res) => {

  const { email } = req.query;

  const query = `
    SELECT *
    FROM history
    WHERE email = ?
    ORDER BY created_at DESC
  `;

  db.query(
    query,
    [email],
    (err, results) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);

    }
  );

});

module.exports = router;