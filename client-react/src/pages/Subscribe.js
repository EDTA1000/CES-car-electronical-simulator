import React, { useState } from 'react';

function Subscribe() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError('لطفاً ایمیل را وارد کنید');
      setLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setError('ایمیل وارد شده معتبر نیست');
      setLoading(false);
      return;
    }

    // 🔐 رمز مخفی برای عبور از پرداخت
if (email.trim() === 'danial.alinasiri1389@gmail.com') {
  const expireDays = 30;
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + expireDays);
  localStorage.setItem('ces-paid', 'true');
  localStorage.setItem('ces-expire', expireDate.toISOString());
  window.location.href = '/CES-car-electronical-simulator/';
  return;
}
    try {
      const res = await fetch('https://ces-backend-kltl.onrender.com/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('خطا در دریافت لینک پرداخت');
      }
    } catch (err) {
      console.error(err);
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
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
        disabled={loading}
      />
      <button className="submit-button" onClick={handleSubmit} disabled={loading}>
        {loading ? 'در حال پردازش...' : 'پرداخت ۵۰۰٬۰۰۰ تومان'}
      </button>
      {error && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}
const expireDays = 30; // مثلا اشتراک ۳۰ روزه
const expireDate = new Date();
expireDate.setDate(expireDate.getDate() + expireDays);
localStorage.setItem('ces-paid', 'true');
localStorage.setItem('ces-expire', expireDate.toISOString());
export default Subscribe;
