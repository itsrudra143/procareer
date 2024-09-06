const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
} = require("../controllers/authController.js");
const verifyToken = require("../middleware/verifyToken.js");
const upload = require("../middleware/fileUpload.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post(
  "/updateuserprofile",
  verifyToken,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateUserProfile
);

module.exports = router;
