const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/pay', async (req, res) => {
  const response = await axios.post('https://api.zarinpal.com/pg/v4/payment/request.json', {
    merchant_id: process.env.ZARINPAL_MERCHANT_ID,
    amount: 10000,
    callback_url: 'http://localhost:5000/payment/zarinpal/verify',
    description: 'اشتراک ماهانه',
  });
  const { authority } = response.data.data;
  res.json({ url: `https://www.zarinpal.com/pg/StartPay/${authority}` });
});

router.get('/verify', async (req, res) => {
  const { Authority } = req.query;
  const response = await axios.post('https://api.zarinpal.com/pg/v4/payment/verify.json', {
    merchant_id: process.env.ZARINPAL_MERCHANT_ID,
    amount: 10000,
    authority: Authority,
  });
  if (response.data.data.code === 100) {
    res.redirect('http://localhost:3000/dashboard');
  } else {
    res.send('پرداخت ناموفق');
  }
});

module.exports = router;
