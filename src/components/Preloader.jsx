import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setTimeout(() => {
      onComplete();
    }, 500); // Wait for the fade-out animation to finish
  };

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div 
          className="preloader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <video 
            className="preloader-video"
            src="/videos/Loading.mp4" 
            autoPlay 
            muted 
            playsInline
            onEnded={handleVideoEnd}
            onError={onComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
