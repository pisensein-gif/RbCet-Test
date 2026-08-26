import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import logo from '../assets/images/robocet.webp';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import './GalleryPage.css';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "gallery"));
      const querySnapshot = await getDocs(q);
      const imgData = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setImages(imgData);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="gallery-page-container">
      <div className="gallery-page-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <motion.h1 
          className="gallery-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          GALLERY
        </motion.h1>
        <p className="gallery-header-subtitle">
          MEMORIES & SNAPSHOTS FROM ROBOCET
        </p>
      </div>

      <div className="gallery-page-content section-container">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              className="gallery-loading-card glass-panel"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{marginTop: '50px'}}
            >
              <div className="logo-glow-wrapper">
                <motion.img 
                  src={logo} 
                  alt="RoboCET Logo" 
                  className="gallery-loading-logo"
                  animate={{ 
                    scale: [1, 1.08, 1],
                    y: [0, -8, 0],
                    filter: [
                      "drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))",
                      "drop-shadow(0 0 30px rgba(255, 255, 255, 0.6))",
                      "drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="loading-text-container">
                <motion.h1 className="gallery-loading-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Gallery Loading<span className="dots-pulse">...</span>
                </motion.h1>
                <p className="gallery-subtitle">FETCHING PHOTO REPOSITORY</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div key="error" className="empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 style={{color: '#ff3333'}}>Error Loading Gallery</h2>
              <p>{error}</p>
            </motion.div>
          ) : images.length === 0 ? (
            <motion.div key="empty" className="empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2>No photos in the gallery yet.</h2>
              <p>Check back later for updates!</p>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              className="public-gallery-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {images.map((img, index) => (
                <motion.div 
                  key={img.id} 
                  className="gallery-item glass-panel"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 255, 204, 0.15)" }}
                  onClick={() => setSelectedImage(img)}
                >
                  <div className="gallery-item-image">
                    <img src={img.imageUrl} alt={img.title} loading="lazy" />
                  </div>
                  {img.title && img.title !== "Untitled" && (
                    <div className="gallery-item-info">
                      <h3>{img.title}</h3>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage.imageUrl} alt={selectedImage.title} className="lightbox-img" />
              {selectedImage.title && selectedImage.title !== "Untitled" && (
                <p className="lightbox-title">{selectedImage.title}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
