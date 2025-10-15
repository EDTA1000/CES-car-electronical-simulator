import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } else {
      alert('ثبت‌نام ناموفق');
    }
  };

  return (
    <div>
      <h2>ثبت‌نام</h2>
      <input type="email" placeholder="ایمیل" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="رمز عبور" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>ثبت‌نام</button>
    </div>
  );
}
