import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Gallery.css';

import img1 from '../assets/gallery/1.webp';
import img2 from '../assets/gallery/2.webp';
import img3 from '../assets/gallery/3.webp';
import img4 from '../assets/gallery/4.webp';
import img5 from '../assets/gallery/5.webp';
import img6 from '../assets/gallery/6.webp';
import img7 from '../assets/gallery/7.webp';

const images = [img1, img2, img3, img4, img5, img6, img7];

// Natural scatter rotations and base stacking
const photoConfigs = [
  { rotate: -8, y: 0, z: 2 },
  { rotate: 5, y: 20, z: 3 },
  { rotate: -4, y: -10, z: 1 },
  { rotate: 10, y: 0, z: 4 },
  { rotate: -6, y: 15, z: 2 },
  { rotate: 3, y: -20, z: 5 },
  { rotate: -12, y: 0, z: 3 }
];

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="gallery" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Gallery</h2>
        
        <div className="gallery-collage" onMouseLeave={() => setHoveredIndex(null)}>
          {images.map((src, index) => {
            const isHovered = hoveredIndex === index;
            const config = photoConfigs[index] || { rotate: 0, y: 0, z: 1 };
            
            return (
              <motion.div
                key={index}
                className="collage-item"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  zIndex: isHovered ? 50 : config.z
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{
                  scale: isHovered ? 1.18 : 1,
                  y: isHovered ? -15 : config.y,
                  rotate: isHovered ? 0 : config.rotate
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <div className={`photo-frame ${isHovered ? 'elevated' : ''}`}>
                  <img src={src} alt={`RoboCET Gallery ${index + 1}`} />
                </div>
              </motion.div>
            );
          })}
          
          <div className="gallery-btn-wrapper">
            <Link 
              to="/gallery" 
              className="btn-primary view-more-btn"
            >
              View More
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Gallery;
