import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './AchievementsPreview.css';

const AchievementsPreview = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const q = query(
          collection(db, "events"), 
          where("categoryId", "==", "achievements")
        );
        const querySnapshot = await getDocs(q);
        
        // Map, filter published, sort by date, and take top 3
        const data = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(a => a.isPublished === true)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3);
          
        setAchievements(data);
      } catch (err) {
        console.error("Failed to fetch achievements:", err);
      }
      setLoading(false);
    };

    fetchAchievements();
  }, []);

  if (loading) return null;

  return (
    <section className="achievements-preview section-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header" style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: '40px'}}>
          <div>
            <h2 className="section-title" style={{marginBottom: '10px'}}>Recent Victories</h2>
            <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', margin: 0}}>Milestones and awards from our robotics teams.</p>
          </div>
          <Link to="/achievements" className="view-all-link">
            Hall of Fame <ArrowRight size={18} />
          </Link>
        </div>

        <div className="achievements-preview-grid">
          {achievements.map((achv, index) => (
            <motion.div 
              key={achv.id} 
              className="achv-preview-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="achv-preview-image">
                <img src={achv.imageUrl} alt={achv.title} />
                <div className="trophy-badge-small"><Trophy size={16}/></div>
              </div>
              <div className="achv-preview-content">
                <p className="achv-date">{new Date(achv.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h3>{achv.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AchievementsPreview;


