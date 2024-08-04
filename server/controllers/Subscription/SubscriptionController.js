const Subscription = require("../../models/Subscripton");
const User = require("../../models/User");
const axios = require("axios");

require("dotenv").config();

class SubscriptionController {
  // Create a subscription
  static async createSubscription(req, res) {
    const { plan } = req.body;
    const userId = req.user._id; // Assumes `req.user` is set by authentication middleware

    console.log("Received Plan:", plan);
    // console.log("Received Start Date:", startDate);

    console.log("User ID:", userId);

    if (!plan) {
      return res.status(400).json({ error: "Plan is required." });
    }

    try {
      const startDate = new Date(); // Parse the startDate
      const endDate = new Date(startDate); // Initialize endDate with startDate

      if (plan.toLowerCase() === "premium") {
        // Case-insensitive check
        endDate.setMonth(endDate.getMonth() + 1);
      }

      const amount = plan.toLowerCase() === "premium" ? 5000000 : 1000;
      console.log("Calculated Amount:", amount);

      const subscription = new Subscription({
        userId,
        plan,
        startDate,
        endDate,
        status: "pending",
        amount: amount,
      });

      console.log("Subscription Amount:", subscription.amount);

      await subscription.save();

      // Initialize Paystack payment
      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email: req.user.email, // User's email
          amount: subscription.amount * 100, // Amount based on plan, example values
          callback_url: `${process.env.CLIENT_URL}/payment/callback`,
          metadata: {
            subscriptionId: subscription._id,
          },
          reference: subscription._id.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        subscription.status = "initiated";
        await subscription.save();
        return res.status(200).json({
          message: "Subscription created and payment initialized",
          paymentUrl: response.data.data.authorization_url,
        });
      } else {
        return res.status(400).json({
          error: "Failed to initialize payment",
          data: response.data,
        });
      }
    } catch (error) {
      console.error("Error creating subscription:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        return res
          .status(error.response.status)
          .json({ error: error.response.data });
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request data:", error.request);
        return res
          .status(504)
          .json({ error: "No response received from Paystack" });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("General error message:", error.message);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  // Handle Paystack payment callback
  static async paymentCallback(req, res) {
    const { reference } = req.body;

    if (!reference) {
      return res
        .status(400)
        .json({ error: "Transaction reference is required." });
    }

    try {
      // Verify payment
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      const { data } = response.data;
      if (data.status === "success") {
        const subscriptionId = data.metadata.subscriptionId;
        const subscription = await Subscription.findById(subscriptionId);

        if (subscription) {
          subscription.status = "paid"; 
          await subscription.save();
          console.log("Paystack response: ", response.data);
          return res.json({
            success: true,
            message: "Payment verified successfully.",
          });
        } else {
          res.status(404).json({ error: "Subscription not found." });
        }
      } else {
        res.status(400).json({ error: "Payment verification failed." });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ error: "Server error." });
    }
  }

  // Get a user's subscription details
  static async getSubscription(req, res) {
    const userId = req.user._id; // Assumes `req.user` is set by authentication middleware

    try {
      const subscription = await Subscription.findOne({ userId });
      if (!subscription) {
        return res.status(404).json({
          error: "Subscription not found.",
        });
      }
      res.status(200).json({ subscription });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Server error. Could not get subscription." });
    }
  }

  static async getAllSubscriptions(req, res) {
    try {
      const subscriptions = await Subscription.find(); // Fetch all subscriptions
      res.status(200).json({ subscriptions });
    } catch (error) {
      console.error("Error fetching subscriptions:", error.message);
      res
        .status(500)
        .json({ error: "Server error. Could not get all subscriptions." });
    }
  }

  // Update a subscription
  static async updateSubscription(req, res) {
    const { plan } = req.body;
    const userId = req.user._id; // Assumes `req.user` is set by authentication middleware

    try {
      const subscription = await Subscription.findOne({ userId });
      if (!subscription) {
        return res.status(404).json({ error: "Subscription not found." });
      }

      subscription.plan = plan;
      subscription.endDate = new Date();
      if (plan.toLowerCase() === "premium") {
        subscription.endDate.setMonth(subscription.endDate.getMonth() + 1);
      }

      await subscription.save();
      res.status(200).json({
        message: "Subscription updated successfully.",
        subscription,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Server error. Could not update subscription." });
    }
  }

  // Delete a subscription
  static async deleteSubscription(req, res) {
    const userId = req.user._id; // Assumes `req.user` is set by authentication middleware

    try {
      const subscription = await Subscription.findOneAndDelete({ userId });
      if (!subscription) {
        return res.status(404).json({ error: "Subscription not found." });
      }
      res.status(200).json({ message: "Subscription deleted successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Server error. Could not delete subscription." });
    }
  }
}

module.exports = SubscriptionController;
