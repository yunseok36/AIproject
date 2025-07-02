import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../image/logo_footer.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChangeEmail = e => {
    setEmail(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleChangePw = e => {
    setPw(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !pw) {
      setError('이메일과 비밀번호를 모두 입력해 주세요.');
      setSuccess('');
      return;
    }
    setError('');
    setSuccess('');
    fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: pw
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === '로그인 성공') {
          // ✅ localStorage에 로그인 정보 저장
          localStorage.setItem('user', JSON.stringify({
            name: data.name,
            email: email
          }));
          navigate('/'); // 메인페이지로 이동!
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

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-logo-row">
          <span className="logo-img-svg">
            <img src={logo} alt="로고" className="logo-img" />
          </span>
          <div>
            <span className="login-logo-title">MOODI·TREE</span>
            <div className="login-logo-desc">내 마음을 읽는 AI, 맞춤 콘텐츠 추천 플랫폼</div>
          </div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-title">다시 만나 반가워요!</div>
          <div className="input-row">
            <label htmlFor="login-email">이메일 주소</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={handleChangeEmail}
              autoComplete="username"
            />
          </div>
          <div className="input-row">
            <label htmlFor="login-pw">비밀번호</label>
            <input
              id="login-pw"
              type="password"
              value={pw}
              onChange={handleChangePw}
              autoComplete="current-password"
            />
          </div>
          <button type="submit">로그인</button>
          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}
        </form>
        <div className="login-link-row">
          <span>아직 계정이 없으신가요?</span>
          <Link to="/Join">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
