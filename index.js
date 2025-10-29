const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', require('./server/routes/auth'));
app.use('/payment/stripe', require('./server/routes/payment/stripe'));
app.use('/payment/zarinpal', require('./server/routes/payment/zarinpal'));

app.listen(5000, () => console.log('Server running on port 5000'));
