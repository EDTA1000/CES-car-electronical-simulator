import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const { MERCHANT_ID, CALLBACK_URL } = process.env;

// 📥 ساخت لینک پرداخت
app.post('/api/payment', async (req, res) => {
  const { email } = req.body;

  try {
    const response = await axios.post('https://api.zarinpal.com/pg/v4/payment/request.json', {
      merchant_id: MERCHANT_ID,
      amount: 500000,
      callback_url: CALLBACK_URL,
      description: `پرداخت اشتراک CES برای ${email}`,
      metadata: { email },
    });

    const { data } = response;
    if (data?.data?.code === 100) {
      const authority = data.data.authority;
      const url = `https://www.zarinpal.com/pg/StartPay/${authority}`;
      res.json({ url });
    } else {
      res.status(400).json({ error: 'درخواست پرداخت ناموفق بود' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطا در ارتباط با زرین‌پال' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ CES Backend is running');
});

// 📝 لیست نظرات (موقت در حافظه)
let feedbacks = [];

// 📥 ثبت نظر جدید
app.post('/api/feedback', (req, res) => {
  const { comment } = req.body;

  if (!comment || comment.trim() === '') {
    return res.status(400).json({ error: 'نظر خالی است' });
  }

  const newComment = comment.trim();
  feedbacks.unshift(newComment); // اضافه به ابتدای لیست
  res.status(201).json(newComment);
});

// 📤 دریافت همه نظرات
app.get('/api/feedback', (req, res) => {
  res.json(feedbacks);
});

// 📤 بررسی وضعیت پرداخت
app.get('/api/verify', async (req, res) => {
  const { authority } = req.query;

  try {
    const response = await axios.post('https://api.zarinpal.com/pg/v4/payment/verify.json', {
      merchant_id: MERCHANT_ID,
      amount: 500000,
      authority,
    });

    const { data } = response;
    if (data?.data?.code === 100) {
      res.json({ success: true, ref_id: data.data.ref_id });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'خطا در بررسی پرداخت' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
