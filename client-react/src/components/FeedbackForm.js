import React, { useState } from 'react';

function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    if (!message.trim()) {
      setStatus('لطفاً پیام خود را وارد کنید');
      return;
    }

    try {
      // اگر بک‌اند آماده باشه، اینجا می‌تونی پیام رو ارسال کنی
      // await fetch('/api/feedback', { method: 'POST', body: JSON.stringify({ message }) })

      setStatus('✅ پیام شما با موفقیت ثبت شد. ممنون از همراهی‌تان!');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus('❌ خطا در ارسال پیام. لطفاً دوباره تلاش کنید.');
    }
  };

  return (
    <div className="feedback-form">
      <h2>📬 انتقاد و پیشنهاد</h2>
      <p>اگر نظری، پیشنهادی یا انتقادی دارید، خوشحال می‌شویم بشنویم:</p>
      <textarea
        placeholder="پیام خود را بنویسید..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        className="feedback-textarea"
      />
      <button onClick={handleSubmit} className="submit-button">
        ارسال پیام
      </button>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default FeedbackForm;
