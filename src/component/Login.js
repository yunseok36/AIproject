import React, { useState } from 'react';
import './Login.css';
import logo from '../image/logo_footer.png'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !pw) {
      setError('이메일과 비밀번호를 모두 입력해 주세요.');
      return;
    }
    setError('');
    alert('로그인 시도됨 (백엔드 연동 전)');
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
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="input-row">
            <label htmlFor="login-pw">비밀번호</label>
            <input
              id="login-pw"
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button type="submit">로그인</button>
          {error && <div className="login-error">{error}</div>}
        </form>
        <div className="login-link-row">
          <span>아직 계정이 없으신가요?</span>
          <a href="#">회원가입</a>
        </div>
      </div>
    </div>
  );
}
