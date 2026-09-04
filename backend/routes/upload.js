const db = require("../db");
const express = require("express");
const multer = require("multer");
const extractText = require("../utils/pdfExtractor");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "uploads/");
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("pdf"), async (req, res) => {

  const fileName = req.file.filename;
  const filePath = req.file.path;
  const extractedText = await extractText(filePath);

  const sql = `
    INSERT INTO documents
    (file_name, file_path)
    VALUES (?, ?)
  `;

  
  db.query(
    sql,
    [fileName, filePath],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "PDF uploaded successfully",
        text: extractedText
      });
    }
  );

});

module.exports = router;