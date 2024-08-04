// controllers/ProtectedController.js
const Subscription = require("../../models/Subscripton");

const ProtectedController = {
  async getProtectedData(req, res) {
    try {
      const user = req.user;

      // Check if the user has a premium subscription
      const subscription = await Subscription.findOne({ user: user._id });

      if (!subscription || subscription.plan !== "premium") {
        return res
          .status(403)
          .json({ error: "Access denied. Premium subscription required." });
      }

      res.status(200).json({
        message: "This is protected data.",
        user: {
          id: user._id,
          email: user.email,
        },
        subscription,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  },
};

module.exports = ProtectedController;
