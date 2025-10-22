import React, { useState, useEffect } from 'react';

function FeedbackForm() {
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const backendURL = 'https://ces-backend-kltl.onrender.com';

  // دریافت نظرات از سرور
  useEffect(() => {
    fetch(`${backendURL}/api/feedback`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          setComments([]);
        }
      })
      .catch(err => {
        console.error('خطا در دریافت نظرات:', err);
        setComments([]);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setStatus('❌ لطفاً نظر خود را وارد کنید.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${backendURL}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment })
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments(prev => [newComment, ...prev]);
        setStatus('✅ نظر شما با موفقیت ثبت شد.');
        setComment('');
      } else {
        setStatus('❌ خطا در ثبت نظر.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ خطا در ارتباط با سرور.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#f9f9f9',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      marginTop: '40px',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <h2>📬 فرم انتقاد و پیشنهاد</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="نظر خود را بنویسید..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            marginBottom: '10px'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'در حال ارسال...' : 'ارسال نظر'}
        </button>
      </form>

      {status && (
        <p style={{ marginTop: '15px', color: status.includes('✅') ? 'green' : 'red' }}>
          {status}
        </p>
      )}

      <hr style={{ margin: '30px 0' }} />
      <h3>📣 نظرات ثبت‌شده:</h3>
      <ul style={{ paddingLeft: '20px' }}>
        {comments.length === 0 ? (
          <p>هنوز نظری ثبت نشده است.</p>
        ) : (
          comments.map((c, i) => (
            <li key={i} style={{ marginBottom: '8px' }}>
              🗨️ {typeof c === 'string' ? c : c.comment}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default FeedbackForm;
