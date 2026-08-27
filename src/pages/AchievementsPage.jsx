import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Calendar } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './AchievementsPage.css';
import logo from '../assets/images/robocet.webp';

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(
          collection(db, "events"), 
          where("categoryId", "==", "achievements")
        );
        
        const querySnapshot = await getDocs(q);
        
        const data = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(a => a.isPublished === true)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setAchievements(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load achievements. Please try again later.");
      }
      setLoading(false);
    };

    fetchAchievements();
  }, []);

  return (
    <div className="achievements-page">
      <div className="achievements-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Home
        </Link>
        <motion.h1 
          className="achievements-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          HALL OF FAME
        </motion.h1>
        <p className="achievements-subtitle">
          Celebrating the victories, awards, and milestones of our robotics teams.
        </p>
      </div>

      <div className="achievements-content section-container">
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
              <p>Loading Achievements...</p>
            </motion.div>
          ) : error ? (
             <motion.div 
              key="error"
              className="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 style={{color: '#ff3333'}}>Error Loading Data</h2>
              <p>{error}</p>
            </motion.div>
          ) : achievements.length === 0 ? (
            <motion.div 
              key="empty"
              className="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Trophy size={64} style={{color: 'rgba(255,255,255,0.2)', marginBottom: '20px'}}/>
              <h2>No achievements posted yet.</h2>
              <p>Our teams are working hard on the next big win!</p>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              className="achievements-timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {achievements.map((achv, index) => (
                <motion.div 
                  key={achv.id} 
                  className="achievement-card glass-panel"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="achievement-image-container">
                    <img src={achv.imageUrl} alt={achv.title} />
                    <div className="trophy-badge"><Trophy size={20}/></div>
                  </div>
                  <div className="achievement-details">
                    <div className="achv-date">
                      <Calendar size={14}/> 
                      {new Date(achv.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h3 className="achv-title">{achv.title}</h3>
                    <p className="achv-desc">{achv.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AchievementsPage;
