const express = require("express");
const db = require("../db");

const router = express.Router();

router.delete("/:id", (req, res) => {

  const id = req.params.id;

  const sql =
    "DELETE FROM history WHERE id = ?";

  db.query(
    sql,
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "History deleted successfully"
      });

    }
  );

});

module.exports = router;