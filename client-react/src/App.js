import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Subscribe from './pages/Subscribe';
import Verify from './pages/Verify';
import React, { useEffect, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';

function Home() {
  const navigate = useNavigate();
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    const paid = localStorage.getItem('ces-paid') === 'true';
    const expire = localStorage.getItem('ces-expire');

    if (paid && expire) {
      const now = new Date();
      const expireDate = new Date(expire);

      if (expireDate > now) {
        setHasPaid(true); // اشتراک هنوز معتبره
      } else {
        // اشتراک منقضی شده
        localStorage.removeItem('ces-paid');
        localStorage.removeItem('ces-expire');
        setHasPaid(false);
      }
    } else {
      setHasPaid(false);
   }
  }, []);

  return (
    <div className="App">
     <div className="ces-container">
      <div className="left-side">
       <img src={`${process.env.PUBLIC_URL}/wheel.png`} alt="Wheel" className="wheel" />
       <img src={`${process.env.PUBLIC_URL}/lightاning.png`} alt="Lightning" className="lightning" />
       </div>
         <img src={`${process.env.PUBLIC_URL}/CES.png`} alt="CES Logo" className="ces-logo" />
       </div>
      {!hasPaid && (
        <button
          className="subscribe-button"
          onClick={() => navigate('/subscribe')}
        >
          اشتراک
        </button>
      )}

      {hasPaid && (
        <p style={{ marginTop: '20px', color: 'green', fontSize: '1.2rem' }}>
          ✅ اشتراک شما فعال است. خوش آمدید!
        </p>
      )}

      {/* ✅ فرم انتقاد و پیشنهاد */}
      <div style={{ marginTop: '40px' }}>
        <FeedbackForm />
      </div>
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
