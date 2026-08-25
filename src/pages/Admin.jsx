import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Admin.css';
import '../components/Events.css'; // Reuse the beautiful card styles

const Admin = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "workshop",
      title: "Workshops",
      description: "Manage robotics, AI, and hardware workshops.",
      image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "competition",
      title: "Competitions",
      description: "Manage Hackathons and RoboWars events.",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "project",
      title: "Projects",
      description: "Manage student-made robotics projects.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "article",
      title: "Articles",
      description: "Manage technical blogs and documentation.",
      image: "https://images.unsplash.com/photo-1504164996022-09080787b6b3?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "talk-sessions",
      title: "Talk Sessions",
      description: "Manage guest lectures and industry panels.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <div className="admin-dashboard">
            <div className="admin-header" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px'}}>
        <Link to="/" className="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> 
          Back to Home
        </Link>
        <h1>Admin Category Hub</h1>
      </div>

      <div className="admin-category-selector">
        <p className="admin-instruction">Select a category to manage its events and registrations.</p>
        
        <div className="events-grid" style={{ marginTop: '40px' }}>
          {categories.map((cat, index) => (
            <motion.div 
              key={index} 
              className="event-category-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigate(`/admin/${cat.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-bg-wrapper">
                <img src={cat.image} alt={cat.title} className="card-bg-img" />
                <div className="card-gradient-overlay"></div>
              </div>
              
              <div className="card-content">
                <div className="card-header">
                  <span className="card-meta">Manage</span>
                  <h3 className="card-title">{cat.title}</h3>
                </div>
                <div className="card-body">
                  <p className="card-desc">{cat.description}</p>
                  <div className="btn-explore">
                    Enter <span className="arrow">?</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;


