import React, { useState } from 'react';

function Subscribe() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError('لطفاً ایمیل را وارد کنید');
      return;
    }

    // 🔐 رمز مخفی برای عبور از پرداخت
    if (email.trim() === 'danial.alinasiri1389@gmail.com') {
      localStorage.setItem('ces-paid', 'true'); // فعال‌سازی اشتراک
      window.location.href = '/CES-car-electronical-simulator/';
      return;
    }

    if (!emailRegex.test(email)) {
      setError('ایمیل وارد شده معتبر نیست');
      return;
    }

    try {
      const res = await fetch(''http://localhost:3001/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // ریدایرکت به درگاه زرین‌پال
      } else {
        setError('خطا در دریافت لینک پرداخت');
      }
    } catch (err) {
      console.error(err);
      setError('خطا در ارتباط با سرور');
    }
  };

  return (
    <div className="subscribe-page">
      <h1>صفحه اشتراک</h1>
      <p>لطفاً ایمیل خود را وارد کنید تا به درگاه پرداخت منتقل شوید.</p>
      <input
        type="email"
        placeholder="ایمیل شما"
        className="email-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="submit-button" onClick={handleSubmit}>
        پرداخت ۵۰۰٬۰۰۰ تومان
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Subscribe;
