const mongoose = require("mongoose");

// Define the schema for job postings
const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
    },
    jobDescription: {
      type: String,
    },
    jobRequirements: {
      type: [String], // Array of strings to hold various requirements
      default: [],
    },
    jobLocation: {
      type: String,
    },
    jobType: {
      type: String, // e.g., Full-time, Part-time, Internship
      enum: ["Full-time", "Part-time", "Internship"],
    },
    jobCompanyLogo: {
      type: String,
    },
    jobCompanyName: {
      type: String,
    },
    jobCompanyDesc: {
      type: String,
    },
    salaryRange: {
      type: String, // e.g., "$50,000 - $70,000 per year"
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyProfile", // Reference to the CompanyProfile schema
      required: true,
    },
    postedDate: {
      type: String,
      default: () =>
        new Date()
          .toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
          .replace(/(\d+) (\w+), (\d+)/, "$1 $2, $3"),
    },
    applicationDeadline: {
      type: Date,
    },
    contactEmail: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
