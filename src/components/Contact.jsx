import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Contact Us</h2>
        
        <div className="contact-wrapper">
          <div className="contact-info">
            <motion.div 
              className="info-box glass-panel"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MapPin className="info-icon" size={32} />
              <h3>Our Address</h3>
              <p>RoboCET, College of Engineering Trivandrum<br/>Sreekaryam, Thiruvananthapuram - 695016</p>
            </motion.div>
            
            <div className="info-row">
              <motion.div 
                className="info-box glass-panel half"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Mail className="info-icon" size={32} />
                <h3>Email Us</h3>
                <p><a href="mailto:teamrobocet@gmail.com">teamrobocet@gmail.com</a></p>
              </motion.div>
              
              <motion.div 
                className="info-box glass-panel half"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3>Socials</h3>
                <div className="socials-row" style={{ display: 'flex', gap: '20px', marginTop: '10px', justifyContent: 'center' }}>
                  <a href="https://www.linkedin.com/company/robo-cet/" target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin className="info-icon" size={32} /></a>
                  <a href="https://www.instagram.com/teamrobocet/" target="_blank" rel="noopener noreferrer" className="social-link"><FaInstagram className="info-icon" size={32} /></a>
                  <a href="https://www.facebook.com/robocet/" target="_blank" rel="noopener noreferrer" className="social-link"><FaFacebook className="info-icon" size={32} /></a>
                  <a href="https://github.com/robocet" target="_blank" rel="noopener noreferrer" className="social-link"><FaGithub className="info-icon" size={32} /></a>
                </div>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="contact-form-container glass-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="form-header">
              <h3>Questions?</h3>
              <p>Fill this form and we'll get back to you</p>
            </div>
            
            <form className="contact-form">
              <div className="form-group row">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea rows="5" placeholder="Message" required></textarea>
              </div>
              <button type="submit" className="btn-primary form-submit-btn">Send Message</button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
