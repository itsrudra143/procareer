const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cloudinary = require("../config/cloudinary.js");
const fs = require("fs");
const Company = require("../models/Company.js");

dotenv.config();
const registerUser = async (req, res) => {
  const { email, password, phone, role, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      phone,
      role,
      firstName,
      lastName,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    if (user.role === "employer") {
      const company = new Company({
        userId: user._id,
      });
      await company.save();
    }

    res
      .status(201)
      .json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    res.json({ message: "Logged in successfully", userId: user._id });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    keySkills,
    summary,
    tenthPercentage,
    twelfthPercentage,
    graduationYear,
    graduationInstitution,
    graduationCGPA,
  } = req.body;
  const pfp = req.files["profilePic"] ? req.files["profilePic"][0] : null;
  const resumeFile = req.files["resume"] ? req.files["resume"][0] : null;
  try {
    let pfpUrl = "";
    if (pfp) {
      const pfpUpload = await cloudinary.v2.uploader.upload(pfp.path, {
        use_filename: true,
        resource_type: "auto",
        folder: "user",
      });
      pfpUrl = pfpUpload.url;
    }

    let resumeUrl = "";
    if (resumeFile) {
      const resumeUpload = await cloudinary.v2.uploader.upload(
        resumeFile.path,
        {
          use_filename: true,
          resource_type: "auto",
          folder: "user",
        }
      );
      resumeUrl = resumeUpload.url;
    }

    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    let keySkillsArr = undefined;
    if (keySkills) {
      keySkillsArr = keySkills.split(",").map((keySkill) => keySkill.trim());
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName: firstName || foundUser.firstName,
        lastName: lastName || foundUser.lastName,
        email: email || foundUser.email,
        phone: phone || foundUser.phone,
        dob: dob || foundUser.dob,
        profilePic: pfpUrl || foundUser.profilePic,
        resume: resumeUrl || foundUser.resume,
        keySkills: keySkillsArr || foundUser.keySkills,
        summary: summary || foundUser.summary,
        graduationDetails: {
          tenthPercentage:
            tenthPercentage || foundUser.graduationDetails.tenthPercentage,
          twelfthPercentage:
            twelfthPercentage || foundUser.graduationDetails.twelfthPercentage,
          graduationYear:
            graduationYear || foundUser.graduationDetails.graduationYear,
          graduationInstitution:
            graduationInstitution ||
            foundUser.graduationDetails.graduationInstitution,
          graduationCGPA:
            graduationCGPA || foundUser.graduationDetails.graduationCGPA,
        },
      },
      { new: true } // Option to return the updated user
    );
    res.redirect("/");
    // return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  } finally {
    if (pfp) fs.unlinkSync(pfp.path);
    if (resumeFile) fs.unlinkSync(resumeFile.path);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
};
