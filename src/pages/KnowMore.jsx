import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import logo from '../assets/images/robocet.webp';
import './KnowMore.css';

const KnowMore = () => {
  return (
    <div className="know-more-page">
      <div className="know-more-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>

      <div className="know-more-content">
        <motion.div 
          className="know-more-card glass-panel"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Animated RoboCET Logo */}
          <div className="logo-glow-wrapper">
            <motion.img 
              src={logo} 
              alt="RoboCET Logo" 
              className="know-more-logo"
              animate={{ 
                scale: [1, 1.08, 1],
                y: [0, -8, 0],
                filter: [
                  "drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))",
                  "drop-shadow(0 0 30px rgba(255, 255, 255, 0.6))",
                  "drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))"
                ]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </div>

          {/* Animated "History Loading" text with pulsing dots and terminal effect */}
          <div className="loading-text-container">
            <motion.h1 
              className="history-loading-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              History Loading<span className="dots-pulse">...</span>
            </motion.h1>
            
            <p className="history-subtitle">
              ARCHIVES & LEGACY INITIATING // ROBO-CHRONICLES
            </p>
          </div>

          {/* Futuristic Progress Track */}
          <div className="history-progress-track">
            <motion.div 
              className="history-progress-bar"
              animate={{ 
                x: ["-100%", "100%"]
              }}
              transition={{ 
                duration: 2.2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </div>

          <div style={{ marginTop: '30px' }}>
            <Link to="/" className="btn-primary glow-btn">
              Explore Current Events
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowMore;
