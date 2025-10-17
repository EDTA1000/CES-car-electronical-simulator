import React from 'react';

function Subscribe() {
  return (
    <div className="subscribe-page">
      <h1>صفحه اشتراک</h1>
      <p>لطفاً ایمیل خود را وارد کنید تا در خبرنامه CES عضو شوید.</p>
      <input type="email" placeholder="ایمیل شما" className="email-input" />
      <button className="submit-button">ثبت‌نام</button>
    </div>
  );
}

export default Subscribe;
