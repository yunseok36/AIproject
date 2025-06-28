import React from "react";
import logo from "../image/logo_footer.png";
import iconDiscord from "../image/discord.png";
import iconInstagram from "../image/instagram.png";
import iconTwitter from "../image/twitter.png";
import iconFacebook from "../image/facebook.png";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-section">
                    <img src={logo} alt="footer-logo"/>
                </div>
                <div className="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Mood Check</li>
                        <li>My Mood</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li>Marketing</li>
                        <li>Market Expansion</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Customer Support</h4>
                    <ul>
                        <li>FAQ</li>
                        <li>Contact Us</li>
                        <li>Feedback</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Resources</h4>
                    <ul>
                        <li>Blog</li>
                        <li>Tutorials</li>
                        <li>Case Studies</li>
                        <li>Documentation</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-left">
                    <div className="footer-links">
                        <span className="link-information">Privacy policy</span>
                        <span>|</span>
                        <span className="link-information">Terms and Conditions</span>
                        <span>|</span>
                        <span className="link-information">Cookie Settings</span>
                    </div>
                    <div className="footer-right">
                        © 2025 MOODI · TREE All rights reserved.
                    </div> 
                </div>
                <div className="footer-icons">
                        <img src={iconFacebook} alt="Facebook" />
                        <img src={iconTwitter} alt="Twitter" />
                        <img src={iconDiscord} alt="Discord" />
                        <img src={iconInstagram} alt="Instagram" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;