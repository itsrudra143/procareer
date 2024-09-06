const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/register");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
