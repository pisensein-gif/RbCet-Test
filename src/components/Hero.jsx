import React from 'react';
import heroVideo from '../assets/videos/Hero2.mp4';
import heroVideoMob from '../assets/videos/Hero_mob.mp4';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      {/* Background Video Elements */}
      <div className="hero-background">
        {/* Desktop Video */}
        <video 
          className="hero-video-bg hero-video-desktop" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Mobile Video */}
        <video 
          className="hero-video-bg hero-video-mobile" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={heroVideoMob} type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default Hero;
