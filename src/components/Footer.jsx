import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, ChevronRight } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';
import logo from '../assets/robocet.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-top-border"></div>
      
      <div className="footer-container">
        
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-logo-wrapper">
            <img src={logo} alt="RoboCET Logo" className="footer-logo" />
            
          </div>
          
          <div className="footer-socials">
            <a href="https://www.linkedin.com/company/robo-cet/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://www.instagram.com/teamrobocet/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/robocet/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://github.com/robocet" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/#home"><ChevronRight size={14}/> Home</a></li>
            <li><a href="/#about"><ChevronRight size={14}/> About Us</a></li>
            <li><a href="/#events"><ChevronRight size={14}/> Events & Workshops</a></li>
            <li><a href="/#team"><ChevronRight size={14}/> Execom</a></li>
            <li><a href="/#contact"><ChevronRight size={14}/> Contact</a></li>
          </ul>
        </div>

        {/* Categories Section */}
        <div className="footer-links">
          <h3>Explore</h3>
          <ul>
            <li><Link to="/category/workshops"><ChevronRight size={14}/> Workshops</Link></li>
            <li><Link to="/category/competitions"><ChevronRight size={14}/> Competitions</Link></li>
            <li><Link to="/category/exhibitions"><ChevronRight size={14}/> Exhibitions</Link></li>
            <li><Link to="/admin"><ChevronRight size={14}/> Admin Portal</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <MapPin size={18} className="contact-icon" />
            <p>College of Engineering Trivandrum<br/>Sreekaryam, Thiruvananthapuram</p>
          </div>
          <div className="contact-item">
            <Mail size={18} className="contact-icon" />
            <p><a href="mailto:teamrobocet@gmail.com">teamrobocet@gmail.com</a></p>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} <strong>RoboCET</strong>. All Rights Reserved.</p>
          <p className="designed-by">Designed & Built by RoboCET Tech Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

