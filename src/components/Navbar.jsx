import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/robocet.webp';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isAdminOrRegisterPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/register');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Events', href: '/#events' },
    { name: 'Execom', href: '/#team' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="RoboCET Logo" className="navbar-logo-img" />
          </Link>
        </div>
        
        {/* Desktop Menu - Hidden on Admin/Register Pages */}
        {!isAdminOrRegisterPage && (
          <ul className="navbar-links desktop-menu">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        )}

        {/* Right Actions */}
        <div className="navbar-right">
          {isAdminOrRegisterPage ? (
            <Link to="/" className="btn-outline sponsor-btn" style={{ textDecoration: 'none' }}>Go back to home</Link>
          ) : (
            <button className="btn-primary sponsor-btn">Sponsor US</button>
          )}
          
          {/* Mobile Menu Toggle - Hidden on Admin/Register Pages */}
          {!isAdminOrRegisterPage && (
            <div className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu - Hidden on Admin/Register Pages */}
      {!isAdminOrRegisterPage && (
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open glass-panel' : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
