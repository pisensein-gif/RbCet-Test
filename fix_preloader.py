# -*- coding: utf-8 -*-
import sys

preloader_jsx = '''import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroVideo from '../assets/videos/Hero3.mp4';
import heroVideoMob from '../assets/videos/Hero_mob.mp4';
import loadingWebm from '../assets/videos/Loading.webm';
import loadingMp4 from '../assets/videos/Loading.mp4';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const heroVideoRef = useRef(null);

  // Detect mobile or desktop screen
  const targetHeroVideo = typeof window !== 'undefined' && window.innerWidth <= 768 
    ? heroVideoMob 
    : heroVideo;

  // Guarantee preloader displays cleanly for at least 1.8s
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1800);

    // Safety fallback: maximum 8s timeout in case of slow mobile network
    const fallbackTimer = setTimeout(() => {
      setIsHeroReady(true);
      setMinTimeElapsed(true);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Check if hero video is already cached/buffered
  useEffect(() => {
    if (heroVideoRef.current && heroVideoRef.current.readyState >= 3) {
      setIsHeroReady(true);
    }
  }, []);

  // When BOTH the target Hero video is buffered AND min time has passed, complete preloading
  useEffect(() => {
    if (isHeroReady && minTimeElapsed && isPlaying) {
      const exitTimer = setTimeout(() => {
        setIsPlaying(false);
        setTimeout(() => {
          onComplete();
        }, 600); // Allow fade-out animation
      }, 300);

      return () => clearTimeout(exitTimer);
    }
  }, [isHeroReady, minTimeElapsed, isPlaying, onComplete]);

  const handleHeroLoaded = () => {
    setIsHeroReady(true);
  };

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div 
          className="preloader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Preloader Animation Video with WebM & MP4 fallback */}
          <video 
            className="preloader-video"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src={loadingWebm} type="video/webm" />
            <source src={loadingMp4} type="video/mp4" />
          </video>

          {/* Hidden Hero Video Preloader to preload exact device video into browser cache */}
          <video
            ref={heroVideoRef}
            src={targetHeroVideo}
            preload="auto"
            muted
            playsInline
            onLoadedData={handleHeroLoaded}
            onCanPlay={handleHeroLoaded}
            onCanPlayThrough={handleHeroLoaded}
            onError={handleHeroLoaded}
            style={{ display: 'none' }}
          />

          {/* Clean Loading indicator text */}
          <p className="preloader-status-text">
            Initializing Systems...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
'''

with open('src/components/Preloader.jsx', 'w', encoding='utf-8') as f:
    f.write(preloader_jsx)

# Update Preloader.css
preloader_css = '''.preloader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

.preloader-video {
  width: 85vw;
  max-width: 380px;
  height: auto;
  max-height: 380px;
  object-fit: contain;
}

.preloader-status-text {
  position: absolute;
  bottom: 45px;
  color: rgba(255, 255, 255, 0.7);
  font-family: var(--font-heading);
  font-size: 0.85rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  text-align: center;
}

@media (max-width: 768px) {
  .preloader-video {
    max-width: 280px;
    max-height: 280px;
  }
  .preloader-status-text {
    bottom: 35px;
    font-size: 0.75rem;
    letter-spacing: 2px;
  }
}
'''

with open('src/components/Preloader.css', 'w', encoding='utf-8') as f:
    f.write(preloader_css)

print("Preloader updated with bundled video imports successfully!")
