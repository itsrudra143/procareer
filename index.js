const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/db.js");
const authRoutes = require("./routes/auth.js");
const companyRoutes = require("./routes/company.js");
const verifyToken = require("./middleware/verifyToken.js");
const User = require("./models/User.js");
const Company = require("./models/Company.js");
const jwt = require("jsonwebtoken");
const Job = require("./models/Job.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
  let foundUser = null;
  let foundCompany = null;
  let foundJobs = null;
  if (req.cookies.token) {
    try {
      const decodedToken = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      );
      foundUser = await User.findById(decodedToken.id);
      foundCompany = await Company.findOne({ userId: foundUser._id });
      foundJobs = await Job.find();
    } catch (err) {
      console.log("Error verifying token:", err.message);
    }
  }
  res.render("pages/home", { foundUser, foundCompany, foundJobs });
});

app.get("/jobs", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const foundUser = await User.findById(userId);
  const foundCompany = await Company.findOne({ userId: userId });
  const foundJobs = await Job.find();
  console.log(foundCompany, foundUser, foundJobs);
  res.render("pages/jobs", { foundUser, foundCompany, foundJobs });
});

app.get("/postjob", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const foundUser = await User.findById(userId);
  res.render("pages/postjob", { foundUser });
});

app.get("/about", async (req, res) => {
  let foundUser = null;
  if (req.cookies.token) {
    try {
      const decodedToken = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      );
      foundUser = await User.findById(decodedToken.id);
    } catch (err) {
      console.log("Error verifying token:", err.message);
    }
  }
  res.render("pages/about", { foundUser });
});

app.get("/contact", async (req, res) => {
  let foundUser = null;
  if (req.cookies.token) {
    try {
      const decodedToken = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      );
      foundUser = await User.findById(decodedToken.id);
    } catch (err) {
      console.log("Error verifying token:", err.message);
    }
  }
  res.render("pages/contact", { foundUser });
});

app.get("/profile", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const foundUser = await User.findById(userId);
  res.render("pages/profile", { foundUser });
});

app.get("/register", async (req, res) => {
  let foundUser = null;
  if (req.cookies.token) {
    try {
      const decodedToken = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      );
      foundUser = await User.findById(decodedToken.id);
    } catch (err) {
      console.log("Error verifying token:", err.message);
    }
  }
  res.render("pages/register", { foundUser });
});

app.get("/login", async (req, res) => {
  let foundUser = null;
  if (req.cookies.token) {
    try {
      const decodedToken = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      );
      foundUser = await User.findById(decodedToken.id);
    } catch (err) {
      console.log("Error verifying token:", err.message);
    }
  }
  res.render("pages/login", { foundUser });
});

app.get("/job-details/:id", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.id;
  const foundUser = await User.findById(userId);
  const foundCompany = await Company.findOne({ userId: userId });
  const foundJob = await Job.findById(jobId);
  console.log(foundCompany, foundUser, foundJob);
  res.render("pages/job-details", { foundUser, foundCompany, foundJob });
});

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);

app.listen(port, () => {
  connectToDB();
  console.log(`Server is running on http://localhost:${port}`);
});
