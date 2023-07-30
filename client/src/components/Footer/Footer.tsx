import React from "react";

const Footer = () => {
    return (
        <div className="footer-main">
        Your website content goes here
        <footer>
            <div className="footer-content">
                <div className="logo">
                    {/* <!-- Replace the img URL with your logo image --> */}
                    <img src="your-logo.png" alt="Travel Logo" />
                </div>
                <nav className="footer-links">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Destinations</a></li>
                        <li><a href="#">Travel Blog</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </nav>
                <div className="social-media">
                    {/* <!-- Replace the links with your social media profiles --> */}
                    <a href="#" target="_blank"><img src="facebook-icon.png" alt="Facebook"/></a>
                    <a href="#" target="_blank"><img src="twitter-icon.png" alt="Twitter"/></a>
                    <a href="#" target="_blank"><img src="instagram-icon.png" alt="Instagram"/></a>
                </div>
            </div>
            <div className="testimonials">
                <div className="testimonial-carousel">
                    <h3>What Our Customers Say</h3>
                    {/* Add your customer testimonials or reviews here as individual items */}
                    <div className="testimonial-item">
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut dolor vitae purus dignissim egestas."</p>
                        <span>- John Doe</span>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut dolor vitae purus dignissim egestas."</p>
                        <span>- John Doe</span>
                    </div>
                    {/* Add more testimonials as needed */}
                </div>
            </div>
            <div className="copyright">
                <p>&copy; 2023 Your Travel Website. All rights reserved.</p>
            </div>
        </footer>
        </div>
    );
};

export default Footer;
