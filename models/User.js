const mongoose = require("mongoose");

// Define the schema for user profiles
const userProfileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
    },
    graduationDetails: {
      tenthPercentage: {
        type: String,
      },
      twelfthPercentage: {
        type: String,
      },
      graduationYear: {
        type: String,
      },
      graduationInstitution: {
        type: String,
      },
      graduationCGPA: {
        type: String,
      },
    },
    keySkills: {
      type: [String], // Array of strings for multiple skills
      default: [],
    },
    resume: {
      type: String, // This would store the URL or path to the uploaded resume file
      required: false,
    },
    profilePic: {
      type: String, // This would store the URL or path to the uploaded resume file
      required: false,
    },
    summary: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["employee", "employer"],
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
