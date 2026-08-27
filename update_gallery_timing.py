# -*- coding: utf-8 -*-
import sys

gallery_page_jsx = '''import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import logo from '../assets/images/robocet.webp';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import './GalleryPage.css';

const AutoSlideshow = ({ images, title, isLightbox = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // 4s automatic transition
    return () => clearInterval(interval);
  }, [images]);

  const handleManualChange = (e, direction) => {
    e.stopPropagation();
    if (!images || images.length <= 1) return;
    setCurrentIndex((prev) => {
      const nextIndex = prev + direction;
      if (nextIndex < 0) return images.length - 1;
      if (nextIndex >= images.length) return 0;
      return nextIndex;
    });
  };

  if (!images || images.length === 0) {
    return (
      <div className="no-image" style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%', color:'rgba(255,255,255,0.4)', gap:'8px'}}>
        <ImageIcon size={20} /> No Images
      </div>
    );
  }

  const showControls = isLightbox || isHovered;

  return (
    <div 
      className="slideshow-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} slide ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={isLightbox ? "slideshow-img-lightbox" : "slideshow-img-cover"}
        />
      </AnimatePresence>

      {/* Slide Counter Badge */}
      {images.length > 1 && (
        <div className="slide-counter-badge">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Navigation Arrows */}
      {images.length > 1 && (showControls || isLightbox) && (
        <>
          <button 
            className="slideshow-nav-btn prev-btn"
            onClick={(e) => handleManualChange(e, -1)}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={isLightbox ? 28 : 20} />
          </button>
          <button 
            className="slideshow-nav-btn next-btn"
            onClick={(e) => handleManualChange(e, 1)}
            aria-label="Next Slide"
          >
            <ChevronRight size={isLightbox ? 28 : 20} />
          </button>
        </>
      )}

      {/* Dots Indicator in Lightbox */}
      {isLightbox && images.length > 1 && (
        <div className="lightbox-dots-container">
          {images.map((_, idx) => (
            <span 
              key={idx}
              className={`lightbox-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const GalleryPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  
  const location = useLocation();

  useEffect(() => {
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (albums.length > 0) {
      const searchParams = new URLSearchParams(location.search);
      const linkedAlbumId = searchParams.get('albumId');
      if (linkedAlbumId) {
        const foundAlbum = albums.find(a => a.id === linkedAlbumId);
        if (foundAlbum && foundAlbum.images?.length > 0) {
          setSelectedAlbum(foundAlbum);
        }
      }
    }
  }, [albums, location.search]);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "gallery_albums"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setAlbums(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="gallery-page-container">
      <div className="gallery-page-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Home
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

      <div className="gallery-page-content">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              className="gallery-loading-card glass-panel"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
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
                <motion.h2 className="gallery-loading-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Gallery Loading<span className="dots-pulse">...</span>
                </motion.h2>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div key="error" className="empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 style={{color: '#ff3333'}}>Error Loading Gallery</h2>
              <p>{error}</p>
            </motion.div>
          ) : albums.length === 0 ? (
            <motion.div key="empty" className="empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2>No slideshows in the gallery yet.</h2>
              <p>Check back later for updates!</p>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              className="public-gallery-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {albums.map((album, index) => (
                <motion.div 
                  key={album.id} 
                  className="gallery-album-card glass-panel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6, boxShadow: "0 12px 35px rgba(0, 255, 204, 0.18)" }}
                  onClick={() => {if(album.images?.length > 0) setSelectedAlbum(album)}}
                >
                  <div className="gallery-album-image">
                    <AutoSlideshow images={album.images} title={album.title} isLightbox={false} />
                  </div>
                  <div className="gallery-album-info">
                    <h3>{album.title}</h3>
                    {album.date && (
                      <p className="gallery-album-date">
                        <Calendar size={13}/> {new Date(album.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAlbum(null)}
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="lightbox-close-btn"
                onClick={() => setSelectedAlbum(null)}
                aria-label="Close Lightbox"
              >
                <X size={22} />
              </button>

              {/* Main Slideshow Container */}
              <div className="lightbox-img-wrapper">
                <AutoSlideshow 
                  images={selectedAlbum.images} 
                  title={selectedAlbum.title} 
                  isLightbox={true} 
                />
              </div>

              {/* Album Title */}
              <h3 className="lightbox-title">{selectedAlbum.title}</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
'''

with open('src/pages/GalleryPage.jsx', 'w', encoding='utf-8') as f:
    f.write(gallery_page_jsx)

print("GalleryPage updated with 4s interval and clean date tag!")
