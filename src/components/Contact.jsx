import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section-container" style={{ paddingBottom: '100px' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Contact Us</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          We would love to hear from you! Whether you have a question about our events, workshops, or anything else, our team is ready to answer all your questions.
        </p>
        
        <div className="contact-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
          
          <motion.div 
            className="info-box glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ textAlign: 'center', padding: '40px 20px' }}
          >
            <MapPin className="info-icon" size={40} style={{ margin: '0 auto 20px auto', color: 'var(--accent-color)' }} />
            <h3>Our Address</h3>
            <p style={{ color: 'var(--text-secondary)' }}>RoboCET, College of Engineering Trivandrum<br/>Sreekaryam, Thiruvananthapuram - 695016</p>
          </motion.div>
          
          <motion.div 
            className="info-box glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ textAlign: 'center', padding: '40px 20px' }}
          >
            <Mail className="info-icon" size={40} style={{ margin: '0 auto 20px auto', color: 'var(--accent-color)' }} />
            <h3>Email Us</h3>
            <p><a href="mailto:teamrobocet@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>teamrobocet@gmail.com</a></p>
          </motion.div>
          
          <motion.div 
            className="info-box glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ textAlign: 'center', padding: '40px 20px' }}
          >
            <h3 style={{ marginBottom: '20px' }}>Connect With Us</h3>
                        <div className="socials-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', justifyContent: 'center' }}>
              <a href="https://www.linkedin.com/company/robo-cet/" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.05)', transition: '0.3s' }} onMouseOver={e => {e.currentTarget.style.color='#0077b5'; e.currentTarget.style.borderColor='#0077b5'; e.currentTarget.style.transform='translateY(-5px)';}} onMouseOut={e => {e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'; e.currentTarget.style.transform='translateY(0)';}}>
                <FaLinkedin size={40} />
              </a>
              <a href="https://www.instagram.com/teamrobocet/" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.05)', transition: '0.3s' }} onMouseOver={e => {e.currentTarget.style.color='#E1306C'; e.currentTarget.style.borderColor='#E1306C'; e.currentTarget.style.transform='translateY(-5px)';}} onMouseOut={e => {e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'; e.currentTarget.style.transform='translateY(0)';}}>
                <FaInstagram size={40} />
              </a>
              <a href="https://www.facebook.com/robocet/" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.05)', transition: '0.3s' }} onMouseOver={e => {e.currentTarget.style.color='#1877F2'; e.currentTarget.style.borderColor='#1877F2'; e.currentTarget.style.transform='translateY(-5px)';}} onMouseOut={e => {e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'; e.currentTarget.style.transform='translateY(0)';}}>
                <FaFacebook size={40} />
              </a>
              <a href="https://github.com/robocet" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.05)', transition: '0.3s' }} onMouseOver={e => {e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#fff'; e.currentTarget.style.transform='translateY(-5px)';}} onMouseOut={e => {e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'; e.currentTarget.style.transform='translateY(0)';}}>
                <FaGithub size={40} />
              </a>
            </div>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

