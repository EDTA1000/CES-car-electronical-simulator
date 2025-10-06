const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = []; // دیتابیس ساده

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed, subscription: false });
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  res.json({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).send('نامعتبر');
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
