const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debugging

const SubscriptionAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("Auth Header: ", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authentication token is missing or malformed." });
    }
    const token = authHeader.replace("Bearer ", "");
    console.log("Token: ", token);

    if (!token) {
      return res.status(401).json({ error: "Token is missing." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token: ", decoded);

    const user = await User.findById(decoded.userId);
    console.log("User: ", user);

    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error: ", error); // Log error for debugging
    // console.log("Auth error: ", error); // Log error for debugging
    res.status(401).json({ error: "Not authorized to access this resource." });
  }
};

module.exports = SubscriptionAuth;
