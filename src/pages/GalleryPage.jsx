import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import logo from '../assets/images/robocet.webp';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import './GalleryPage.css';

const AutoSlideshow = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="no-image" style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%', color:'rgba(255,255,255,0.5)'}}>No Images</div>;
  }

  return (
    <div style={{width: '100%', height: '100%', position: 'relative'}}>
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} slide ${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </AnimatePresence>
    </div>
  );
};

const GalleryPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

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
                  className="gallery-item glass-panel"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 255, 204, 0.15)" }}
                  onClick={() => {if(album.images?.length > 0) setSelectedAlbum(album)}}
                >
                  <div className="gallery-item-image" style={{position: 'relative'}}>
                    <AutoSlideshow images={album.images} title={album.title} />
                    <div style={{position:'absolute', top:'10px', right:'10px', background:'rgba(0,0,0,0.7)', padding:'4px 10px', borderRadius:'15px', fontSize:'0.8rem', color:'#fff', zIndex:10}}>
                      {album.images?.length || 0} Slides
                    </div>
                  </div>
                  <div className="gallery-item-info">
                    <h3>{album.title}</h3>
                    <p style={{margin: '5px 0 0 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '5px'}}>
                      <Calendar size={14}/> {new Date(album.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal with Slideshow */}
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
              style={{width: '90vw', maxWidth: '1000px', aspectRatio: '16/9', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{width:'100%', height:'80vh', overflow:'hidden', borderRadius:'12px', background:'#000', position:'relative', boxShadow: '0 0 50px rgba(0, 255, 204, 0.2)'}}>
                <AutoSlideshow images={selectedAlbum.images} title={selectedAlbum.title} />
              </div>
              <p className="lightbox-title" style={{marginTop: '20px'}}>{selectedAlbum.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
