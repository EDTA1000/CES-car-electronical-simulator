import React, { useEffect, useState } from 'react';

function Verify() {
  const [status, setStatus] = useState('در حال بررسی پرداخت...');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const authority = query.get('Authority');
    const statusParam = query.get('Status');

    if (statusParam !== 'OK') {
      setStatus('پرداخت لغو شد یا ناموفق بود.');
      return;
    }

    fetch(`https://your-backend.com/api/verify?authority=${authority}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('✅ پرداخت با موفقیت انجام شد! خوش آمدید.');
          // می‌تونی اینجا کاربر رو به صفحه اصلی ببری:
          // window.location.href = '/CES-car-electronical-simulator/';
        } else {
          setStatus('❌ پرداخت ناموفق بود.');
        }
      })
      .catch(() => setStatus('خطا در بررسی پرداخت.'));
  }, []);

  return (
    <div className="subscribe-page">
      <h1>{status}</h1>
    </div>
  );
}

export default Verify;
