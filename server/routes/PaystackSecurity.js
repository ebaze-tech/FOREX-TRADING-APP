const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

router.post("/paystack-webhook", (req, res) => {
  const signature = req.headers["x-paystack-signature"];
  const hmac = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (signature === hmac) {
    // Proceed with handling the event
  } else {
    res.status(400).json({ error: "Invalid signature." });
  }
});
