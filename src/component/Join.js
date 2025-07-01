import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Join.css';
import logo from '../image/logo_footer.png';

export default function Join() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ 모달 관련 state
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.passwordConfirm) {
      setError('모든 항목을 입력해 주세요.');
      setSuccess('');
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      setSuccess('');
      return;
    }
    setError('');
    setSuccess('');
    fetch('http://localhost:4000/api/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === '회원가입 성공') {
          setShowModal(true); // ✅ 모달 알림 열기!
          setError('');
        } else {
          setError(data.message);
          setSuccess('');
        }
      })
      .catch(() => {
        setError('서버 연결 오류');
        setSuccess('');
      });
  };

  // ✅ 모달 닫기 및 로그인 페이지 이동
  const closeModal = () => {
    setShowModal(false);
    navigate('/Login'); // 로그인 페이지로 이동
  };

  return (
    <div className="join-bg">
      <div className="join-container">
        <div className="join-logo-row">
          <span className="logo-img-svg">
            <img src={logo} alt="로고" className="logo-img" />
          </span>
          <div className="logo-texts">
            <span className="join-logo-title">MOODI·TREE</span>
            <div className="join-logo-desc">내 마음을 읽는 AI, 맞춤 콘텐츠 추천 플랫폼</div>
          </div>
        </div>
        <div className="join-title">
          오늘의 감정, 오늘의 추천 <b>MOODI·TREE</b>에서 시작하세요.
        </div>
        <form className="join-form" onSubmit={handleSubmit}>
          <div className="input-row">
            <label htmlFor="join-name">이름</label>
            <input
              id="join-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>
          <div className="input-row">
            <label htmlFor="join-email">이메일 주소</label>
            <input
              id="join-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>
          <div className="input-row">
            <label htmlFor="join-password">비밀번호</label>
            <input
              id="join-password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
          <div className="input-row">
            <label htmlFor="join-passwordConfirm">비밀번호 확인</label>
            <input
              id="join-passwordConfirm"
              name="passwordConfirm"
              type="password"
              value={form.passwordConfirm}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
          <button type="submit">회원가입</button>
          {error && <div className="join-error">{error}</div>}
          {success && <div className="join-success">{success}</div>}
        </form>
        <div className="join-link-row">
          <span>이미 계정이 있으신가요?</span>
          <Link to="/Login">로그인</Link>
        </div>
        {/* ✅ 모달 알림 */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal-box">
              <div style={{ fontSize: "18px", marginBottom: "12px", color: "#36795A", fontWeight: "bold" }}>
                회원가입이 완료되었습니다!
              </div>
              <button onClick={closeModal}>로그인 화면으로 이동</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
