import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../image/logo.png";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    setUser(stored ? JSON.parse(stored) : null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/Login");
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/"><img src={logo} alt="Header Logo" className="logo" /></Link>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/About">ABOUT</Link></li>
          <li><Link to="/MoodCheck">MOOD CHECK</Link></li>
          <li><Link to="/MyPage">MY MOOD</Link></li>
          <li><Link to="/Contact">CONTACT</Link></li>
          {user ? (
            <li className="header-username">
              <span className="user-name">{user.name}님</span>
              <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
            </li>
          ) : (
            <li><Link to="/Login" className="login-button">LOGIN</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
