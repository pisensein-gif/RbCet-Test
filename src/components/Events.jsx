import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Events.css';

const Events = () => {
  const categories = [
    {
      id: "workshop",
      title: "Workshops",
      description: "Hands-on sessions diving into robotics, AI, and hardware.",
      image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80",
      eventCount: "12+ Events"
    },
    {
      id: "competition",
      title: "Competitions",
      description: "Hackathons, RoboWars, and algorithmic challenges.",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80",
      eventCount: "5+ Upcoming"
    },
    {
      id: "project",
      title: "Projects",
      description: "Showcases of incredible student-made robotics projects.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      eventCount: "Ongoing"
    },
    {
      id: "article",
      title: "Articles",
      description: "Technical blogs, research papers, and club documentation.",
      image: "https://images.unsplash.com/photo-1504164996022-09080787b6b3?auto=format&fit=crop&w=800&q=80",
      eventCount: "Weekly Reads"
    },
    {
      ,
    {
      id: "achievements",
      title: "Achievements",
      description: "Our team's victories and milestones.",
      image: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?auto=format&fit=crop&w=800&q=80",
      eventCount: "Hall of Fame"
    }
  ];

  const navigate = useNavigate();

  return (
    <section id="events" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Events Hub</h2>
        
        <div className="events-grid">
          {categories.map((cat, index) => (
            <motion.div 
              key={index} 
              className="event-category-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigate(`/events/${cat.id}`)}
            >
              <div className="card-bg-wrapper">
                <img src={cat.image} alt={cat.title} className="card-bg-img" />
                <div className="card-gradient-overlay"></div>
              </div>
              
              <div className="card-content">
                <div className="card-header">
                  <span className="card-meta">{cat.eventCount}</span>
                  <h3 className="card-title">{cat.title}</h3>
                </div>
                <div className="card-body">
                  <p className="card-desc">{cat.description}</p>
                  <div className="btn-explore">
                    Explore <span className="arrow">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Events;

