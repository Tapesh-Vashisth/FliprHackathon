import React from "react";

const Footer = () => {
    return (
        <div className="footer-main">
            <footer>
                <div className="footer-content">
                    <div className="logo"></div>
                    <nav className="footer-links">
                        <ul>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                            <li>
                                <a href="#">Destinations</a>
                            </li>
                            <li>
                                <a href="#">Travel Blog</a>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="copyright">
                    <p>&copy; 2023 Your Travel Website. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
