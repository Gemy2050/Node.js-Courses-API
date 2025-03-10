const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const verifyToken = require("../middlewares/verifyToken");
const multer = require("multer");
const appError = require("../utils/appError");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const filename = `user-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType !== "image") {
    return cb(appError.create("Only image is allowed", 400));
  }
  cb(null, true);
};

const upload = multer({ storage: diskStorage, fileFilter });

router.get("/", verifyToken, usersController.getAllUsers);
router.post("/register", upload.single("avatar"), usersController.register);
router.post("/login", usersController.login);

module.exports = router;
