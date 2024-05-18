const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
const path = require('path');

const pipeline = promisify(require("stream").pipeline);

const router = express.Router();

const upload = multer();

router.post("/resume", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "File upload failed",
    });
  }
  
  const { file } = req;
  const extension = path.extname(file.originalname);
  if (extension !== ".pdf") {
    return res.status(400).json({
      message: "Invalid format",
    });
  }

  const filename = `${uuidv4()}_${Date.now()}${extension}`;

  fs.writeFile(
    `${__dirname}/../public/resume/${filename}`,
    file.buffer,
    (err) => {
      if (err) {
        console.error("Error while uploading:", err);
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }
      res.send({
        message: "File uploaded successfully",
        url: `/host/resume/${filename}`,
      });
    }
  );
});

router.post("/profile", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "File upload failed",
    });
  }

  const { file } = req;
  const extension = path.extname(file.originalname);
  if (
    extension !== ".jpg" &&
    extension !== ".png"
  ) {
    return res.status(400).json({
      message: "Invalid format",
    });
  }

  const filename = `${uuidv4()}_${Date.now()}${extension}`;

    fs.writeFile(
      `${__dirname}/../public/profile/${filename}`,
      file.buffer,
      (err) => {
        if (err) {
          console.error("Error while uploading:", err);
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }
        res.send({
          message: "Profile image uploaded successfully",
          url: `/host/profile/${filename}`,
        });
      }
    );
});

module.exports = router;
