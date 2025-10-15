import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    // بررسی اعتبار توکن و وضعیت اشتراک
    fetch('http://localhost:5000/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setMessage(data.message))
      .catch(() => navigate('/login'));
  }, []);

  return (
    <div>
      <h2>داشبورد</h2>
      <p>{message || 'در حال بارگذاری...'}</p>
    </div>
  );
}
