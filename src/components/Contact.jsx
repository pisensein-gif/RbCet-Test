import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section-container contact-section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Contact Us</h2>
        <p className="contact-intro">
          We would love to hear from you! Whether you have a question about our events, workshops, or anything else, our team is ready to answer all your questions.
        </p>
        
        <div className="contact-cards-grid">
          
          <motion.div 
            className="info-box glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MapPin className="info-icon" size={36} />
            <h3>Our Address</h3>
            <p>
              <a 
                href="https://share.google/d1dlYjJZevE9AElHZ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link"
              >
                RoboCET, College of Engineering Trivandrum<br/>Sreekaryam, Thiruvananthapuram - 695016
              </a>
            </p>
          </motion.div>
          
          <motion.div 
            className="info-box glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Mail className="info-icon" size={36} />
            <h3>Email Us</h3>
            <p>
              <a 
                href="mailto:teamrobocet@gmail.com"
                className="contact-link"
              >
                teamrobocet@gmail.com
              </a>
            </p>
          </motion.div>
          
          <motion.div 
            className="info-box glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3>Connect With Us</h3>
            <div className="socials-touch-grid">
              <a href="https://www.linkedin.com/company/robo-cet/" target="_blank" rel="noopener noreferrer" className="social-touch-box linkedin">
                <FaLinkedin size={36} />
              </a>
              <a href="https://www.instagram.com/teamrobocet/" target="_blank" rel="noopener noreferrer" className="social-touch-box instagram">
                <FaInstagram size={36} />
              </a>
              <a href="https://www.facebook.com/robocet/" target="_blank" rel="noopener noreferrer" className="social-touch-box facebook">
                <FaFacebook size={36} />
              </a>
              <a href="https://github.com/robocet" target="_blank" rel="noopener noreferrer" className="social-touch-box github">
                <FaGithub size={36} />
              </a>
            </div>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
