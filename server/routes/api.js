const express = require("express");
const router = express.Router();

// --- MOCK DATA ---
const mockUserSession = {
  userId: "user123",
  shippingAddress: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
  },
};

/**
 * Endpoint to provide data for the checkout page.
 */
router.get("/checkout/session", (req, res) => {
  const { TARGET_ZIP_CODES } = require("../config");
  const userZipCode = mockUserSession.shippingAddress.zipCode;
  const showSpecialInstructions = TARGET_ZIP_CODES.includes(userZipCode);
  res.json({
    userInfo: mockUserSession,
    showSpecialInstructions: showSpecialInstructions,
  });
});

/**
 * Endpoint to receive a placed order.
 */
router.post("/orders", (req, res) => {
  const { orderItems, deliveryInstructions, specialInstructionsNote } = req.body;

  let finalInstructions = deliveryInstructions || "";
  if (specialInstructionsNote) {
    finalInstructions += ` | Special Instructions: ${specialInstructionsNote}`;
  }

  console.log("--- ORDER RECEIVED ---");
  console.log("Final Delivery Instructions to save:", finalInstructions);
  res.status(201).json({ message: "Order created successfully!", finalInstructions });
});

/**
 * This endpoint will receive feedback from a driver about a specific delivery.
 */
router.post("/feedback", (req, res) => {
  const { orderId, rating, comments } = req.body;

  if (!orderId || !rating) {
    return res.status(400).json({ error: "Order ID and rating are required." });
  }

  console.log("--- DRIVER FEEDBACK RECEIVED ---");
  console.log(`Order ID: ${orderId}`);
  console.log(`Rating (1=Bad, 5=Good): ${rating}`);
  console.log(`Comments: ${comments || "No comments."}`);
  res.status(200).json({ message: `Feedback for order ${orderId} has been recorded.` });
});

module.exports = router;

