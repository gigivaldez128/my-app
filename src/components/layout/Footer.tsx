import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__brand-col">
          <Link to="/" className="navbar__brand">
            <img src="/logo/logo.svg" alt="TaraEskwela Logo" className="navbar__logo" />
            <span className="navbar__brand-text">
              Tara<em>Eskwela</em>
            </span>
          </Link>
          <p className="footer__tagline">
            Shaping curious minds, empowering compassionate leaders, and fostering academic excellence since 1998.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook" className="footer__social-link">📘</a>
            <a href="#" aria-label="Twitter" className="footer__social-link">🕊️</a>
            <a href="#" aria-label="Instagram" className="footer__social-link">📸</a>
            <a href="#" aria-label="LinkedIn" className="footer__social-link">💼</a>
          </div>
        </div>

        <div className="footer__links-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Academic Programs</Link></li>
            <li><Link to="/contact">Admissions & Contact</Link></li>
            <li><Link to="/register">Online Application</Link></li>
          </ul>
        </div>

        <div className="footer__contact-col">
          <h3>Contact Information</h3>
          <p><strong>📍 Address:</strong> 123 Academy Drive, Quezon City, Metro Manila 1100</p>
          <p><strong>📞 Phone:</strong> +63 2 8888 0000 | +63 917 000 1234</p>
          <p><strong>✉️ Email:</strong> admissions@taraeskwela.edu.ph</p>
          <p><strong>🕐 Office Hours:</strong> Mon - Fri 7:30 AM - 5:00 PM</p>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-container">
          <p>&copy; {new Date().getFullYear()} Tara Eskwela. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
