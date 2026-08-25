import React from 'react';
import { motion } from 'framer-motion';
import './Team.css';

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
  const teamMembers = [
    { name: "Gautham", role: "Chairperson", img: imgGautham },
    { name: "Don Joseph Chacko", role: "Vice Chairperson", img: imgDon },
    { name: "Afsal V N", role: "G-Sec", img: imgAfsal, objectPosition: "center 15%" },
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

  const chairperson = teamMembers.find(m => m.role === "Chairperson");
  const viceChairperson = teamMembers.find(m => m.role === "Vice Chairperson");
  const gSec = teamMembers.find(m => m.role === "G-Sec");
  const restOfTeam = teamMembers.filter(m => !["Chairperson", "Vice Chairperson", "G-Sec"].includes(m.role));

  const TeamCard = ({ member, index, isLarge = false }) => (
    <motion.div 
      className={`team-card ${isLarge ? 'large' : ''}`}
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
          <div className="execom-row-1">
            {chairperson && <TeamCard member={chairperson} index={0} isLarge={true} />}
          </div>
          
          <div className="execom-row-2">
            {viceChairperson && <TeamCard member={viceChairperson} index={0} isLarge={true} />}
            {gSec && <TeamCard member={gSec} index={1} isLarge={true} />}
          </div>

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
