import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass-panel">
      <div className="footer-container">
        <div className="footer-left">
          <div className="copyright">
            &copy; {new Date().getFullYear()} <strong><span>RoboCET</span></strong>. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
