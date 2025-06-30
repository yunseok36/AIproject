import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../image/logo.png";

function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/"><img src={logo} alt="Header Logo" className="logo" /></Link>
            </div>
            <nav className="nav">
                <ul className="nav-list">
                    <li><Link to="/About">ABOUT</Link></li>
                    <li><Link to="/MoodCheck">MOOD CHECK</Link></li>
                    <li><Link to="/MyMood">MY MOOD</Link></li>
                    <li><Link to="/Contact">CONTACT</Link></li>
                    <li><Link to="/Login" className="login-button">LOGIN</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
