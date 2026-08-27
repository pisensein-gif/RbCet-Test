import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowLeft, LogOut } from 'lucide-react';
import logo from '../assets/images/robocet.webp';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminOrRegisterPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/register');
  const isSubAdminPage = location.pathname.startsWith('/admin/') && location.pathname !== '/admin' && location.pathname !== '/admin-login';
  const isAdminPortal = location.pathname.startsWith('/admin') && location.pathname !== '/admin-login';

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin-login');
    } catch (err) {
      console.error(err);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Discover', href: '/#events' },
    { name: 'Achievements', href: '/achievements' },
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
          {isAdminPortal && auth.currentUser && (
            <button onClick={handleLogout} className="btn-outline small" style={{marginRight: '15px', display: 'flex', alignItems: 'center', gap: '5px'}}>
              <LogOut size={16} /> Logout
            </button>
          )}

          {isAdminOrRegisterPage ? (
            <Link to={isSubAdminPage ? "/admin" : "/"} className="nav-back-link">
              <ArrowLeft size={16} /> {isSubAdminPage ? "Back to Admin Hub" : "Back to Home"}
            </Link>
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


