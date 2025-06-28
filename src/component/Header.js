import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../image/logo.png"; // 로고 이미지 경로에 맞게 조정하세요

function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/"><img src={logo} alt="Header Logo" className="logo" /></Link>
            </div>
            <nav className="nav">
                <ul className="nav-list">
                    <li><Link to="/ABOUT">ABOUT</Link></li>
                    <li><Link to="/MOOD CHECK">MOOD CHECK</Link></li>
                    <li><Link to="/MY MOOD">MY MOOD</Link></li>
                    <li><Link to="/CONTACT">CONTACT</Link></li>
                    <li><Link to="/LOGIN" className="login-button">LOGIN</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
