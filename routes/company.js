const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/fileUpload");
const {
  updateCompanyProfile,
  postJob,
} = require("../controllers/companyController");
const router = express.Router();

router.post(
  "/updatecompanyprofile",
  verifyToken,
  upload.fields([{ name: "logo", maxCount: 1 }]),
  updateCompanyProfile
);

router.post("/postjob", verifyToken, postJob);

module.exports = router;
