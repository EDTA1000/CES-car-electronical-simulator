import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Subscribe from './pages/Subscribe';
import Verify from './pages/Verify';
import React, { useEffect, useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    const paid = localStorage.getItem('ces-paid') === 'true';
    setHasPaid(paid);
  }, []);

  return (
    <div className="App">
      <div className="ces-container">
        <img src="/CES.png" alt="CES Logo" className="ces-logo" />
        <img src="/wheel.png" alt="Wheel" className="wheel" />
        <img src="/lighting.png" alt="Lightning" className="lightning" />
      </div>

      {/* اگر پرداخت انجام نشده بود، دکمه اشتراک نمایش داده می‌شود */}
      {!hasPaid && (
        <button
          className="subscribe-button"
          onClick={() => navigate('/subscribe')}
        >
          اشتراک
        </button>
      )}

      {/* اگر پرداخت انجام شده بود، پیام خوش‌آمد نمایش داده می‌شود */}
      {hasPaid && (
        <p style={{ marginTop: '20px', color: 'green', fontSize: '1.2rem' }}>
          ✅ اشتراک شما فعال است. خوش آمدید!
        </p>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/CES-car-electronical-simulator">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
