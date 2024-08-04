const express = require("express");
const router = express.Router();
const Register = require("../controllers/Register/Register");
const Login = require("../controllers/Login/Login");
// const Logout = require("../controllers/Logout/Logout");

router.post("/register", Register.register);
router.post("/login", Login.login);
router.post("/logout", Login.logout);

module.exports = router;

