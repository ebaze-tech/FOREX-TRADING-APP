const express = require("express");
const router = express.Router();
const SubscriptionController = require("../controllers/Subscription/SubscriptionController");
const SubscriptionAuth = require("../middleware/SubscriptionAuth"); // Authentication middleware

// Create a subscription
router.post(
  "/create/subscription",
  SubscriptionAuth,
  SubscriptionController.createSubscription
);

// Get subscription details
router.get(
  "/get/subscription",
  SubscriptionAuth,
  SubscriptionController.getSubscription
);

// Update subscription
router.put(
  "/update/subscription",
  SubscriptionAuth,
  SubscriptionController.updateSubscription
);

// Delete subscription
router.delete(
  "/delete/subscription",
  SubscriptionAuth,
  SubscriptionController.deleteSubscription
);

router.get(
  "/all/subscriptions",
  SubscriptionAuth,
  SubscriptionController.getAllSubscriptions
);

router.post("/payment/verify", SubscriptionController.paymentCallback);

module.exports = router;
