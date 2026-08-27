# -*- coding: utf-8 -*-
import sys

# 1. Update Team.jsx
team_jsx = '''import React from 'react';
import { motion } from 'framer-motion';
import './Team.css';

import imgStaffAdvisor from '../assets/execom/Staff_Advisor.png';
import imgGautham from '../assets/execom/Gautham_syam.webp';
import imgDon from '../assets/execom/DON JOSEPH CHACKO.webp';
import imgAfsal from '../assets/execom/Afsal V N.webp';
import imgAkash from '../assets/execom/akash.webp';
import imgBlesson from '../assets/execom/Blesson.webp';
import imgPrithvika from '../assets/execom/Prithvika.webp';
import imgSheheer from '../assets/execom/Sheheer.webp';
import imgAkul from '../assets/execom/Akul.webp';
import imgRohann from '../assets/execom/Rohann.webp';
import imgNoel from '../assets/execom/Noel Thomas Joshy.webp';
import imgGovindh from '../assets/execom/Govindh J.webp';
import imgBharath from '../assets/execom/Bharath R.webp';
import imgSreesanth from '../assets/execom/Sreesanth.webp';
import imgAaryan from '../assets/execom/AARYAN SAJ.webp';
import imgNohid from '../assets/execom/Nohid John.webp';
import imgSisira from '../assets/execom/Sisira_thomas.webp';
import imgSam from '../assets/execom/SamBCletus.webp';
import imgKailasnath from '../assets/execom/Kailasnath_A.webp';
import imgAnavadya from '../assets/execom/Anavadya Pradeep.webp';

const Team = () => {
  const staffAdvisor = { 
    name: "Dr. Kiran R", 
    role: "Staff Advisor", 
    img: imgStaffAdvisor,
    objectPosition: "center 20%"
  };

  const leadership = [
    { name: "Don Joseph Chacko", role: "Vice Chairperson", img: imgDon },
    { name: "Gautham", role: "Chairperson", img: imgGautham },
    { name: "Afsal V N", role: "G-Sec", img: imgAfsal, objectPosition: "center 15%" },
  ];

  const restOfTeam = [
    { name: "Akash", role: "Treasurer", img: imgAkash },
    { name: "Blesson", role: "Tech Head", img: imgBlesson },
    { name: "Prithvika", role: "Women In Tech", img: imgPrithvika },
    { name: "Sheheer", role: "Robotics Head", img: imgSheheer },
    { name: "Akul", role: "Robotics Head", img: imgAkul },
    { name: "Rohann", role: "Project Head", img: imgRohann },
    { name: "Noel Thomas Joshy", role: "Project Head", img: imgNoel },
    { name: "Govindh J", role: "Media & Design Head", img: imgGovindh },
    { name: "Bharath R", role: "Media & Design Head", img: imgBharath },
    { name: "Sreesanth", role: "Event Head", img: imgSreesanth },
    { name: "Aaryan Saj", role: "Sponsorship Head", img: imgAaryan },
    { name: "Nohid John", role: "Competitions Head", img: imgNohid },
    { name: "Sisira Thomas", role: "Workshop Head", img: imgSisira },
    { name: "Sam B Cletus", role: "Documentation Head", img: imgSam },
    { name: "Kailasnath A", role: "Inventory Manager", img: imgKailasnath },
    { name: "Anavadya Pradeep", role: "Web Admin", img: imgAnavadya },
  ];

  const TeamCard = ({ member, index, isLarge = false, isAdvisor = false }) => {
    const roleSlug = member.role.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return (
      <motion.div 
        className={`team-card ${isLarge ? 'large' : ''} ${isAdvisor ? 'advisor-card' : ''} role-${roleSlug}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      >
        <div className="team-image-wrapper">
          {member.img ? (
            <img 
              src={member.img} 
              alt={member.name} 
              className="team-img" 
              style={member.objectPosition ? { objectPosition: member.objectPosition } : {}}
            />
          ) : (
            <div className="team-placeholder">
              {member.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="team-info">
          <h3 className="team-name">{member.name}</h3>
          <p className="team-role">{member.role}</p>
          <div className="team-accent-line"></div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="team" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Execom 2026</h2>
        <div className="execom-hierarchy-container">
          {/* Row 1: Staff Advisor */}
          <div className="execom-row-advisor">
            <TeamCard member={staffAdvisor} index={0} isLarge={true} isAdvisor={true} />
          </div>
          
          {/* Row 2: Leadership Trio (Vice Chairperson, Chairperson, G-Sec on desktop; Chairperson -> Vice Chair -> G-Sec on mobile) */}
          <div className="execom-row-leadership">
            {leadership.map((member, index) => (
              <TeamCard key={index} member={member} index={index} isLarge={true} />
            ))}
          </div>

          {/* Rest of Execom Grid */}
          <div className="team-grid">
            {restOfTeam.map((member, index) => (
              <TeamCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Team;
'''

with open('src/components/Team.jsx', 'w', encoding='utf-8') as f:
    f.write(team_jsx)

# 2. Update Team.css with mobile order
team_css = '''.execom-hierarchy-container {
  display: flex;
  flex-direction: column;
  gap: 45px;
  margin-top: 40px;
}

.execom-row-advisor {
  display: flex;
  justify-content: center;
}

.execom-row-leadership {
  display: flex;
  justify-content: center;
  gap: 35px;
  flex-wrap: wrap;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
  margin-top: 15px;
}

.team-card {
  position: relative;
  background-color: #121214;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 40px 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease, border-color 0.4s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.team-card.large {
  width: 300px;
  padding: 45px 20px 35px;
}

.team-card.advisor-card {
  border-color: rgba(0, 255, 204, 0.2);
  box-shadow: 0 8px 30px rgba(0, 255, 204, 0.08);
}

.team-card.advisor-card .team-image-wrapper {
  border-color: var(--accent-color);
  box-shadow: 0 0 20px rgba(0, 255, 204, 0.3);
}

.team-card:hover, .team-card:active {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.2);
}

@keyframes avatarFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.team-image-wrapper {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 24px;
  border: 2px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
  background-color: #000;
  animation: avatarFloat 4s ease-in-out infinite;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* Stagger the animation slightly for a natural look */
.team-card:nth-child(even) .team-image-wrapper {
  animation-delay: 1s;
}
.team-card:nth-child(3n) .team-image-wrapper {
  animation-delay: 2s;
}

.team-card.large .team-image-wrapper {
  width: 155px;
  height: 155px;
}

.team-card:hover .team-image-wrapper, .team-card:active .team-image-wrapper {
  border-color: var(--accent-color);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.25);
}

.team-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  filter: brightness(0.95);
  transition: filter 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s ease;
}

.team-card:hover .team-img, .team-card:active .team-img {
  filter: brightness(1.1);
  transform: scale(1.06);
}

.team-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 4rem;
  color: var(--accent-color);
  background-color: #1a1a1d;
}

.team-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.team-name {
  font-size: 1.25rem;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: 0.2px;
}

.team-role {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1.5px;
}

.team-accent-line {
  width: 30px;
  height: 2px;
  background-color: var(--accent-color);
  margin-top: 16px;
  opacity: 0.3;
  transition: width 0.4s ease, opacity 0.4s ease;
}

.team-card:hover .team-accent-line, .team-card:active .team-accent-line {
  width: 60px;
  opacity: 1;
}

/* Tablet & Mobile Responsiveness */
@media (max-width: 1024px) {
  .execom-row-leadership {
    gap: 20px;
  }
}

@media (max-width: 900px) {
  .team-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .execom-hierarchy-container {
    gap: 24px;
    margin-top: 30px;
  }

  .execom-row-advisor, .execom-row-leadership {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
  }

  /* On mobile: Chairperson appears right after Staff Advisor, then Vice Chairperson, then G-Sec */
  .execom-row-leadership .role-chairperson {
    order: 1 !important;
  }
  .execom-row-leadership .role-vice-chairperson {
    order: 2 !important;
  }
  .execom-row-leadership .role-g-sec {
    order: 3 !important;
  }
  
  .team-card.large, .team-card {
    width: 100%;
    max-width: 320px;
    padding: 30px 16px 24px;
  }

  .team-image-wrapper {
    width: 120px;
    height: 120px;
    margin-bottom: 16px;
  }

  .team-card.large .team-image-wrapper {
    width: 135px;
    height: 135px;
  }

  .team-name {
    font-size: 1.1rem;
    margin-bottom: 6px;
  }

  .team-role {
    font-size: 0.75rem;
    letter-spacing: 1px;
  }

  .team-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    justify-items: center;
  }
}

@media (max-width: 480px) {
  .team-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .team-card {
    max-width: 100%;
  }
}
'''

with open('src/components/Team.css', 'w', encoding='utf-8') as f:
    f.write(team_css)

# 3. Update GalleryPage.jsx (2s interval and remove date/time)
gallery_page_jsx = '''import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
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
    }, 2000); // 2s automatic transition
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
          transition={{ duration: 0.4 }}
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

# 4. Update Gallery.css (Home page collage overlap on mobile)
gallery_css = '''.gallery-collage {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
}

.collage-item {
  width: 260px;
  height: 320px;
  margin: -20px -30px;
  position: relative;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.photo-frame {
  background-color: #ffffff;
  padding: 12px 12px 38px 12px;
  border-radius: 4px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.45);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.photo-frame.elevated {
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 255, 255, 0.2);
  border-color: #ffffff;
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
  display: block;
}

.gallery-btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 80px;
  z-index: 10;
}

.view-more-btn {
  padding: 12px 30px;
  font-size: 1.1rem;
  font-family: var(--font-heading);
  letter-spacing: 1px;
  -webkit-tap-highlight-color: transparent;
}

/* Tablet & Mobile Responsiveness */
@media (max-width: 992px) {
  .collage-item {
    width: 220px;
    height: 270px;
    margin: -15px -20px;
  }
}

@media (max-width: 768px) {
  .gallery-collage {
    padding: 30px 10px;
    gap: 0;
  }

  .collage-item {
    width: 175px;
    height: 225px;
    margin: -14px -18px;
  }

  .photo-frame {
    padding: 8px 8px 24px 8px;
  }

  .gallery-btn-wrapper {
    margin-top: 40px;
    margin-left: 0;
    width: 100%;
  }

  .view-more-btn {
    width: 100%;
    max-width: 280px;
    text-align: center;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .collage-item {
    width: 148px;
    height: 190px;
    margin: -12px -15px;
  }
}
'''

with open('src/components/Gallery.css', 'w', encoding='utf-8') as f:
    f.write(gallery_css)

print("All requested updates written successfully!")
