import React from 'react';
import { motion } from 'framer-motion';
import { Network, Crosshair, Cpu } from 'lucide-react';
import teamImage from '../assets/images/Team.jpeg';
import './About.css';

const About = () => {
  const visions = [
    {
      title: "Knowledge Exchange",
      text: "This club is aimed at providing a tangible forum for discussions related to robotics. This initiative is mainly to provide a virtual home for its humble counterpart in the real world.",
      icon: Network
    },
    {
      title: "Mentorship",
      text: "One of the most important targets of the club is to induct the juniors into the art of robotics. It should never take a back seat. This will always be our strategic vision.",
      icon: Crosshair
    },
    {
      title: "Skill Development",
      text: "Apart from obvious opportunities for improving technical acumen, the club provides a nursery for project management, collaboration, team-building, web administration and organisational skill development.",
      icon: Cpu
    }
  ];

  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">About Us</h2>
        
        <div className="about-main-container glass-panel">
          
          {/* Top: Quote & Story Section */}
          <div className="about-intro-grid">
            <div className="about-intro-left">
              <div className="quote-box">
                <p className="quote-text">
                  "The true delight is in the <span className="highlight-text">finding out</span> rather than in the <span className="highlight-text">knowing</span>"
                </p>
              </div>
              <p className="about-lead-text">
                The Robotics Club of CET was founded to foster a culture of advanced technology, serving as a dedicated technical oasis for passionate engineers.
              </p>
            </div>
            
            <div className="about-intro-right">
              <p>
                Our mission is to augment knowledge in hobby robotics, empowering future generations to accelerate their learning and achieve greater heights—because <em>"we see further by standing on the shoulders of giants."</em>
              </p>
              <p>
                RoboCET is a collaborative platform to discuss ideas, solve problems, and document our activities. Join us, share your insights, and let's innovate together!
              </p>
              <div style={{ marginTop: '15px' }}>
                <a href="#team" className="btn-primary">Know More About Us</a>
              </div>
            </div>
          </div>

          {/* Premium Cybernetic Tech Frame Team Showcase */}
          <div className="about-team-showcase">
            <div className="cyber-frame-wrapper">
              {/* Glowing Tech Corner Brackets */}
              <div className="corner-bracket top-left"></div>
              <div className="corner-bracket top-right"></div>
              <div className="corner-bracket bottom-left"></div>
              <div className="corner-bracket bottom-right"></div>

              {/* Top Tech Header Bar */}
              <div className="cyber-frame-header">
                <div className="tech-indicator">
                  <span className="dot-pulse"></span>
                  <span className="tech-label">SYS.REC // 2026</span>
                </div>
                <span className="tech-title">TEAM ROBOCET • CET</span>
              </div>

              {/* Photo Display Window */}
              <div className="team-photo-frame">
                <img src={teamImage} alt="Team RoboCET" className="about-team-photo" />
                <div className="scanline-overlay"></div>
              </div>

              {/* Bottom Tech Bar */}
              <div className="cyber-frame-footer">
                <span className="tech-sub">COLLEGE OF ENGINEERING TRIVANDRUM</span>
                <span className="tech-tag">ROBOTICS CLUB</span>
              </div>
            </div>
          </div>

        </div>

        {/* Our Vision Section */}
        <h3 className="vision-subtitle">Our Vision</h3>
        <div className="vision-grid">
          {visions.map((vision, index) => (
            <motion.div 
              key={index} 
              className="vision-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10, borderColor: 'var(--accent-color)', boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)' }}
            >
              <div className="vision-icon-container">
                <vision.icon className="vision-icon" size={32} />
              </div>
              <h3 className="vision-card-title">{vision.title}</h3>
              <p className="vision-text">{vision.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
