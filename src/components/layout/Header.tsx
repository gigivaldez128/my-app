import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if student is authenticated by reading the token in localStorage
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="navbar">
        <div className="container navbar__container">
          <Link to="/" className="navbar__brand">
            <img src="/logo/logo.svg" alt="TaraEskwela Logo" className="navbar__logo" />
            <span className="navbar__brand-text">
              Tara<em>Eskwela</em>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar__nav">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="navbar__actions">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn--ghost">My Portal</Link>
                <button onClick={handleLogout} className="btn btn--primary">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn--ghost">Sign In</Link>
                <Link to="/register" className="btn btn--primary">Apply Now</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`navbar__toggle${mobileMenuOpen ? ' navbar__toggle--open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="navbar__toggle-bar"></span>
            <span className="navbar__toggle-bar"></span>
            <span className="navbar__toggle-bar"></span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer${mobileMenuOpen ? ' mobile-drawer--open' : ''}`}>
        <nav className="mobile-drawer__nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-drawer__link${isActive ? ' mobile-drawer__link--active' : ''}`}
              >
                {link.name}
              </Link>
            );
          })}
          <hr className="mobile-drawer__divider" />
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn btn--ghost btn--full">My Portal</Link>
              <button onClick={handleLogout} className="btn btn--primary btn--full" style={{ marginTop: '10px' }}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost btn--full">Sign In</Link>
              <Link to="/register" className="btn btn--primary btn--full">Apply Now</Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
