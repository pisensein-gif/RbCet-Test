import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Info } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './CategoryPage.css';
import logo from '../assets/images/robocet.webp';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(
          collection(db, "events"), 
          where("categoryId", "==", categoryId)
        );
        
        const querySnapshot = await getDocs(q);
        
        // Map, filter published only, and sort locally
        const eventsData = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(evt => evt.isPublished === true)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setEvents(eventsData);
      } catch (err) {
        console.error(err);
        if (err.message.includes("indexes")) {
          setError("Firebase requires an index for this query. Admin must create it in the console.");
        } else {
          setError("Failed to load events. Please try again later.");
        }
      }
      setLoading(false);
    };

    fetchEvents();
  }, [categoryId]);

  return (
    <div className="category-page">
      <div className="category-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Home
        </Link>
        <motion.h1 
          className="category-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {categoryId.toUpperCase()}
        </motion.h1>
        <p className="category-subtitle">
          Explore our past achievements and register for upcoming {categoryId}.
        </p>
      </div>

      <div className="category-content section-container">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              className="category-loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.img 
                src={logo} 
                alt="RoboCET Logo" 
                className="loader-logo"
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.7, 1, 0.7],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <p>Loading {categoryId}...</p>
            </motion.div>
          ) : error ? (
             <motion.div 
              key="error"
              className="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 style={{color: '#ff3333'}}>Error Loading Events</h2>
              <p>{error}</p>
            </motion.div>
          ) : events.length === 0 ? (
            <motion.div 
              key="empty"
              className="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2>No public {categoryId} found.</h2>
              <p>Check back later for updates!</p>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              className="events-grid-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {events.map((evt, index) => {
                const isOpen = !evt.status || evt.status === "Registration Open";
                const isFinished = evt.status === "Workshop Finished" || evt.status === "Registration Closed";
                
                return (
                  <motion.div 
                    key={evt.id} 
                    className="event-card glass-panel"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)" }}
                    style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                  >
                    <div className="public-card-image">
                      {evt.imageUrl ? (
                        <img src={evt.imageUrl} alt={evt.title} />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                      
                      {!isOpen && (
                        <div className={`event-status-badge ${evt.status === "Workshop Finished" ? 'finished' : 'closed'}`}>
                          {evt.status}
                        </div>
                      )}
                    </div>
                    
                    <div className="event-content" style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 className="event-title" style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>{evt.title}</h3>
                      <div className="event-meta" style={{ marginBottom: '20px', flex: 1 }}>
                        <div className="meta-item" style={{ color: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Calendar size={18} className="meta-icon" />
                          <span>{new Date(evt.date).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>
                      
                      {isOpen ? (
                        evt.externalLink ? (
                          <a href={evt.externalLink} target="_blank" rel="noreferrer" className="btn-primary event-btn glow-btn" style={{ textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%' }}>
                            Register Now
                          </a>
                        ) : (
                          <Link to={`/register/${evt.id}`} className="btn-primary event-btn glow-btn" style={{ textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%' }}>
                            Register Now
                          </Link>
                        )
                      ) : evt.linkedGalleryId ? (
                        <Link to={`/gallery?albumId=${evt.linkedGalleryId}`} className="btn-primary event-btn glow-btn" style={{ textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%', background: 'linear-gradient(45deg, #00ffcc, #0088cc)', color: '#000', border: 'none' }}>
                          View Event Gallery
                        </Link>
                      ) : (
                        <div className="event-btn-disabled">
                          <Info size={16} style={{marginRight: '8px'}}/>
                          {evt.status}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CategoryPage;
