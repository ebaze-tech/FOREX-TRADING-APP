const bcrypt = require("bcryptjs");
const UserModel = require("../../models/User");

class RegisterController {
  static async register(req, res) {
    console.log("Register route hit:", req.body);
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    
    try {
      // Validate the email pattern
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const passRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Email pattern mismatch!",
        });
      }
      if (!passRegex.test(password)) {
        return res.status(400).json({
          message:
            "Password pattern mismatch! Must contain at least a lowercase, uppercase and numeric character. It must be at least 6.",
        });
      }

      // Check if user already exists
      const emailCheck = await UserModel.findOne({ email });
      if (emailCheck) {
        return res.status(400).json({
          message: "User with this email already exists.",
        });
      }
      let usernameCheck = await UserModel.findOne({ username });
      if (usernameCheck) {
        return res.status(400).json({
          message: "Username already exists.",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await UserModel.create({
        email,
        password: hashedPassword,
        username,
      });

      res.status(201).json({
        newUser,
        message: "User registered successfully.",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = RegisterController;
