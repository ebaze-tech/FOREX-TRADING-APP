const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/AuthRoutes");
// const postRoutes = require("./routes/PostRoutes");
const passwordRoutes = require("./routes/PasswordRoutes");
// const subscriptionRoutes = require("./routes/SubscriptionRoutes");
const subscriptionRoutes = require("./routes/SubscriptionRoutes");
const dotenv = require("dotenv");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { JWT_SECRET } = process.env;
dotenv.config();

const allowedOrigins = ["https://forex-trading-murex.vercel.app"];

// Session middleware
app.use(
  session({
    secret: process.env.JWT_SECRET, // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // true in production
      httpOnly: true,
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
// app.use("/api/post", postRoutes);
app.use("/api/auth", passwordRoutes);
// app.use("/api/subscription", subscriptionRoutes);
app.use("/api/subscription", subscriptionRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

const PORT = process.env.PORT || 8080;

// Database and server connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log("MongoDB connected. ");
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });
