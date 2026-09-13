const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/register", (req, res) => {

  const { name, email, password } = req.body;

  const sql =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(
    sql,
    [name, email, password],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "User registered successfully"
      });
    }
  );
});

module.exports = router;

router.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(
    sql,
    [email, password],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

if (result.length > 0) {

  res.json({
    success: true,
    message: "Login successful"
  });

} else {

  return res.status(401).json({
    success: false,
    message: "Invalid email or password"
  });

}
    }
  );
});