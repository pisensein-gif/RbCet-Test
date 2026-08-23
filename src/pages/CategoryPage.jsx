import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();

  // In a real application, you would fetch these from a backend API using the categoryId
  // For now, we use a placeholder array to show the UI structure
  const dummyEvents = [
    {
      id: 1,
      title: `Upcoming ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} 1`,
      description: `Join us for this exciting new ${categoryId} focusing on advanced robotics.`,
      date: "TBA",
      location: "CET Campus",
      status: "upcoming"
    },
    {
      id: 2,
      title: `Past ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} 2`,
      description: `A highly successful ${categoryId} where over 100 students participated.`,
      date: "Oct 2025",
      location: "CET Campus",
      status: "past"
    }
  ];

  return (
    <div className="category-page">
      <div className="category-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Back to Home
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
        {dummyEvents.length === 0 ? (
          <div className="empty-state">
            <h2>No {categoryId} found yet.</h2>
            <p>Check back later for updates!</p>
          </div>
        ) : (
          <div className="events-grid">
            {dummyEvents.map((evt, index) => (
              <motion.div 
                key={evt.id} 
                className="event-card glass-panel"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)" }}
              >
                <div className="event-content">
                  <div className={`status-badge ${evt.status}`}>
                    {evt.status.toUpperCase()}
                  </div>
                  <h3 className="event-title">{evt.title}</h3>
                  <p className="event-desc">{evt.description}</p>
                  <div className="event-meta">
                    <div className="meta-item">
                      <Calendar size={18} className="meta-icon" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="meta-item">
                      <MapPin size={18} className="meta-icon" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                  {evt.status === 'upcoming' ? (
                    <button className="btn-primary event-btn glow-btn">Register Now</button>
                  ) : (
                    <button className="btn-secondary event-btn">View Details</button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
