const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

class LoginController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid email." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password." });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: req.body.rememberMe ? "1h" : "30m",
      });

      console.log("Generated Token: ", token); // Debugging

      res.status(200).json({
        message: "Login successful.",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        },
        token,
      });
    } catch (err) {
      console.error("Login error: ", err); // Debugging
      res.status(500).json({ error: "Server error." });
    }
  }

  static logout(req, res) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }
      // For JWT, client needs to delete the token on logout
      res.status(200).json({ message: "Logout successful." });
    });
  }
}

module.exports = LoginController;
