import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Users, 
  Eye, 
  Cpu, 
  Zap, 
  Mail, 
  MapPin, 
  Sparkles
} from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';
import './SponsorPage.css';
import '../components/Contact.css';

const SponsorPage = () => {
  const perks = [
    {
      icon: <Users size={28} className="perk-icon" />,
      title: "Premier Talent Pipeline",
      desc: "Direct access to top-tier engineering minds, roboticists, and programmers for internships, hiring, and research collaborations."
    },
    {
      icon: <Eye size={28} className="perk-icon" />,
      title: "Massive Brand Exposure",
      desc: "High-visibility branding across our combat robots, hackathon banners, official club merchandise, website, and tech symposiums."
    },
    {
      icon: <Cpu size={28} className="perk-icon" />,
      title: "Innovation & Joint R&D",
      desc: "Collaborate on groundbreaking student-led hardware projects, AI models, and real-world robotics automation solutions."
    },
    {
      icon: <Zap size={28} className="perk-icon" />,
      title: "Tech Workshops & Demos",
      desc: "Host exclusive keynote workshops, industry tech talks, and product demonstrations with eager engineering students."
    }
  ];

  return (
    <div className="sponsor-page-container">
      {/* Header Section */}
      <div className="sponsor-header-section">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <motion.div 
          className="sponsor-header-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="sponsor-pill">
            <Sparkles size={16} /> PARTNERSHIP & SPONSORSHIP
          </div>
          <h1 className="sponsor-main-title">
            FUEL THE FUTURE OF <span className="highlight-text">ROBOTICS</span>
          </h1>
          <p className="sponsor-lead-subtitle">
            Partner with RoboCET - the flagship robotics and innovation club of College of Engineering Trivandrum. 
            Empower student innovators and showcase your brand to the next generation of engineers.
          </p>
        </motion.div>
      </div>


      {/* Why Sponsor Us Grid */}
      <section className="section-container">
        <div className="section-header-center">
          <h2 className="section-title">Why Partner With RoboCET?</h2>
          <p className="section-subtitle">A mutually beneficial ecosystem connecting industry leaders with high-impact engineering talent.</p>
        </div>

        <div className="perks-grid">
          {perks.map((perk, idx) => (
            <motion.div 
              key={idx}
              className="perk-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6, borderColor: "rgba(0, 255, 204, 0.4)" }}
            >
              <div className="perk-icon-wrapper">{perk.icon}</div>
              <h3 className="perk-title">{perk.title}</h3>
              <p className="perk-desc">{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section (Same as Home) */}
      <section className="section-container sponsor-contact-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-intro">
            Interested in partnering or sponsoring RoboCET? Connect with our team and let us build something extraordinary together.
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
    </div>
  );
};

export default SponsorPage;
