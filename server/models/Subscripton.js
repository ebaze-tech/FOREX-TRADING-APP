const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: String,
    enum: ["basic", "premium"],
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endDate: {
    type: Date,
    default: function () {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // One month from now
    },
    required: true,
  },
  amount: {
    type: Number,
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
