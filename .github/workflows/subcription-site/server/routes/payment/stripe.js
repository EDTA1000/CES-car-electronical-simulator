const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const router = express.Router();

router.post('/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: 'price_123', quantity: 1 }],
    mode: 'subscription',
    success_url: 'http://localhost:3000/dashboard',
    cancel_url: 'http://localhost:3000/',
  });
  res.json({ url: session.url });
});

module.exports = router;
