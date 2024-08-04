const express = require("express");
const {
  forgotPassword,
} = require("../controllers/Password/PasswordController");
const {
  resetPassword,
} = require("../controllers/Password/ResetPasswordController");
const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
