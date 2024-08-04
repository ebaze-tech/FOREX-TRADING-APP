const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const Subscription = require("../models/Subscripton");
const router = express.Router();

router.use(bodyParser.json());

router.post("/paystack-webhook", async (req, res) => {
  const { event, data } = req.body;

  // Verify the event and data if needed
  // Handle the event
  if (event === "charge.success") {
    const subscriptionId = data.subscription_id; 
    try {
      const subscription = await Subscription.findById(subscriptionId);
      if (subscription) {
        subscription.status = "active"; // Update subscription status
        await subscription.save();
      }
      res.status(200).json({ message: "Subscription updated successfully." });
    } catch (error) {
      res.status(500).json({ error: "Server error." });
    }
  } else if (event === "charge.failed") {
    // Handle payment failure
    res.status(200).json({ message: "Payment failed." });
  } else {
    res.status(400).json({ message: "Unknown event." });
  }
});

module.exports = router;
