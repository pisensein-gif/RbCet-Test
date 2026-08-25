import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroVideo from '../assets/videos/Hero2.mp4';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const heroVideoRef = useRef(null);

  // Guarantee preloader displays cleanly for at least 1.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1500);

    // Safety fallback: maximum 10s timeout in case of network stall
    const fallbackTimer = setTimeout(() => {
      setIsHeroReady(true);
      setMinTimeElapsed(true);
    }, 10000);

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

  // When BOTH the Hero video is buffered/ready AND min time has passed, complete preloading
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
          {/* Preloader Animation Video - Loops until hero video is ready */}
          <video 
            className="preloader-video"
            src="/videos/Loading.webm" 
            autoPlay 
            muted 
            loop 
            playsInline
          />

          {/* Hidden Hero Video Preloader to preload into browser cache */}
          <video
            ref={heroVideoRef}
            src={heroVideo}
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
          <p style={{
            position: 'absolute',
            bottom: '40px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Initializing Systems...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
