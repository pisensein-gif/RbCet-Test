import React from 'react';
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

const Gallery = () => {
  return (
    <section id="gallery" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Gallery</h2>
        
        <div className="gallery-collage">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className={`gallery-item item-${index + 1}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              <div className="photo-frame">
                <img src={src} alt={`Gallery ${index + 1}`} />
              </div>
            </motion.div>
          ))}
          
          <div className="gallery-btn-wrapper">
            <motion.a 
              href="#" 
              className="btn-primary view-more-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View More
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Gallery;
