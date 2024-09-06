const mongoose = require("mongoose");

// Define the schema for company profiles
const companyProfileSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
    },
    companyWebsite: {
      type: String,
    },
    companyEmail: {
      type: String,
    },
    companyPhone: {
      type: String,
    },
    companyAddress: {
      type: String,
    },
    companyDescription: {
      type: String,
    },
    logo: {
      type: String, // This would store the URL or path to the uploaded logo file
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile", // Reference to the UserProfile schema
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
const CompanyProfile = mongoose.model("CompanyProfile", companyProfileSchema);

module.exports = CompanyProfile;
