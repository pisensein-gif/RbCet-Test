import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Events from '../components/Events';

import Team from '../components/Team';
import Contact from '../components/Contact';
import Gallery from '../components/Gallery';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <div className="white-strip"></div>
      <About />
      <Events />
      
      <Team />
      <Gallery />
      <Contact />
    </div>
  );
};

export default Home;


