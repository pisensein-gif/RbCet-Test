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

          {/* Full Panoramic Team Photo Showcase (100% Complete View) */}
          <div className="about-team-showcase">
            <div className="team-photo-frame">
              <img src={teamImage} alt="Team RoboCET" className="about-team-photo" />
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
