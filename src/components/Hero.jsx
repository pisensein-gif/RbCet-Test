import React from 'react';
import heroVideo from '../assets/videos/Hero2.mp4';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      {/* Background Video Elements */}
      <div className="hero-background">
        <video className="hero-video-bg" autoPlay loop muted playsInline>
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default Hero;

