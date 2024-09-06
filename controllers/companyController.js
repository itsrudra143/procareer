const dotenv = require("dotenv");
const cloudinary = require("../config/cloudinary.js");
const fs = require("fs");
const Company = require("../models/Company.js");
const Job = require("../models/Job.js");

dotenv.config();

const updateCompanyProfile = async (req, res) => {
  const userId = req.user.id;
  const {
    companyName,
    companyWebsite,
    companyEmail,
    companyPhone,
    companyAddress,
    companyDescription,
  } = req.body;
  const logo = req.files["logo"] ? req.files["logo"][0] : null;
  try {
    let logoUrl = "";
    if (logo) {
      const logoUpload = await cloudinary.v2.uploader.upload(logo.path, {
        use_filename: true,
        resource_type: "auto",
        folder: "company",
      });
      logoUrl = logoUpload.url;
    }

    const foundCompany = await Company.findOne({ userId: userId });
    if (!foundCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    const updatedCompany = await Company.findByIdAndUpdate(foundCompany._id, {
      companyName: companyName || foundCompany.companyName,
      companyWebsite: companyWebsite || foundCompany.companyWebsite,
      companyEmail: companyEmail || foundCompany.companyEmail,
      companyPhone: companyPhone || foundCompany.companyPhone,
      companyAddress: companyAddress || foundCompany.companyAddress,
      companyDescription: companyDescription || foundCompany.companyDescription,
      logo: logoUrl || foundCompany.logo,
    });
    return res.status(200).json(updatedCompany);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  } finally {
    if (logo) fs.unlinkSync(logo.path);
  }
};

const postJob = async (req, res) => {
  const userId = req.user.id;
  const {
    jobTitle,
    jobDescription,
    jobRequirements,
    jobLocation,
    jobType,
    salaryRange,
    applicationDeadline,
    contactEmail,
  } = req.body;

  try {
    const foundCompany = await Company.findOne({ userId: userId });
    console.log("Received job data:", req.body); // Log incoming data

    if (!foundCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    let jobReqArr = [];
    if (jobRequirements && typeof jobRequirements === "string") {
      jobReqArr = jobRequirements
        .split(",")
        .map((req) => req.trim())
        .filter((req) => req !== "");
    } else if (Array.isArray(jobRequirements)) {
      jobReqArr = jobRequirements.filter((req) => req !== "");
    }

    console.log("Processed job requirements:", jobReqArr);

    const newJob = new Job({
      jobTitle,
      jobDescription,
      jobRequirements: jobReqArr,
      jobLocation,
      jobType,
      salaryRange,
      applicationDeadline,
      contactEmail,
      companyId: foundCompany._id,
      jobCompanyLogo: foundCompany.logo,
      jobCompanyName: foundCompany.companyName,
      jobCompanyDesc: foundCompany.companyDescription,
    });

    const savedJob = await newJob.save();
    console.log("Saved job:", savedJob);

    res.redirect("/jobs");
  } catch (error) {
    console.error("Error in postJob:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.toString() });
  }
};

module.exports = { updateCompanyProfile, postJob };
