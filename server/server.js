const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/AuthRoutes");
const passwordRoutes = require("./routes/PasswordRoutes");
const subscriptionRoutes = require("./routes/SubscriptionRoutes");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security Middleware
app.use(helmet());

// Logging Middleware
app.use(morgan("combined"));

const allowedOrigins = ["https://forex-trading-git-master-toluwanimi-faramades-projects.vercel.app/"];

// Session middleware
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Ensure this is true for production
      httpOnly: true,
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport.config")(passport);

// CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/api/auth", authRoutes);
app.use("/api/auth", passwordRoutes);
app.use("/api/subscription", subscriptionRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 8080;

// Database and server connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log("MongoDB connected.");
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });