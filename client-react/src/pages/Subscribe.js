import React, { useState } from 'react';

function Subscribe() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === '') {
      setError('لطفاً ایمیل را وارد کنید');
      setSubmitted(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setError('ایمیل وارد شده معتبر نیست');
      setSubmitted(false);
      return;
    }

    // اگر همه‌چیز درست بود:
    console.log('ایمیل معتبر ثبت شد:', email);
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="subscribe-page">
      <h1>صفحه اشتراک</h1>
      <p>لطفاً ایمیل خود را وارد کنید تا در خبرنامه CES عضو شوید.</p>

      <input
        type="email"
        placeholder="ایمیل شما"
        className="email-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="submit-button" onClick={handleSubmit}>
        ثبت‌نام
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {submitted && <p style={{ color: 'green', marginTop: '10px' }}>✅ ایمیل شما با موفقیت ثبت شد!</p>}
    </div>
  );
}

export default Subscribe;
