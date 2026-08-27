# -*- coding: utf-8 -*-
import sys

team_jsx = '''import React from 'react';
import { motion } from 'framer-motion';
import './Team.css';

import imgStaffAdvisor from '../assets/execom/Staff_Advisor.png';
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
  const staffAdvisor = { 
    name: "Dr. Kiran R", 
    role: "Staff Advisor", 
    img: imgStaffAdvisor,
    objectPosition: "center 20%"
  };

  const leadership = [
    { name: "Don Joseph Chacko", role: "Vice Chairperson", img: imgDon },
    { name: "Gautham", role: "Chairperson", img: imgGautham },
    { name: "Afsal V N", role: "G-Sec", img: imgAfsal, objectPosition: "center 15%" },
  ];

  const restOfTeam = [
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

  const TeamCard = ({ member, index, isLarge = false, isAdvisor = false }) => (
    <motion.div 
      className={`team-card ${isLarge ? 'large' : ''} ${isAdvisor ? 'advisor-card' : ''}`}
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
          {/* Row 1: Staff Advisor */}
          <div className="execom-row-advisor">
            <TeamCard member={staffAdvisor} index={0} isLarge={true} isAdvisor={true} />
          </div>
          
          {/* Row 2: Leadership Trio (Vice Chairperson, Chairperson, G-Sec) */}
          <div className="execom-row-leadership">
            {leadership.map((member, index) => (
              <TeamCard key={index} member={member} index={index} isLarge={true} />
            ))}
          </div>

          {/* Rest of Execom Grid */}
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
'''

with open('src/components/Team.jsx', 'w', encoding='utf-8') as f:
    f.write(team_jsx)

# Update Team.css
team_css = '''.execom-hierarchy-container {
  display: flex;
  flex-direction: column;
  gap: 45px;
  margin-top: 40px;
}

.execom-row-advisor {
  display: flex;
  justify-content: center;
}

.execom-row-leadership {
  display: flex;
  justify-content: center;
  gap: 35px;
  flex-wrap: wrap;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
  margin-top: 15px;
}

.team-card {
  position: relative;
  background-color: #121214;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 40px 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease, border-color 0.4s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.team-card.large {
  width: 300px;
  padding: 45px 20px 35px;
}

.team-card.advisor-card {
  border-color: rgba(0, 255, 204, 0.2);
  box-shadow: 0 8px 30px rgba(0, 255, 204, 0.08);
}

.team-card.advisor-card .team-image-wrapper {
  border-color: var(--accent-color);
  box-shadow: 0 0 20px rgba(0, 255, 204, 0.3);
}

.team-card:hover, .team-card:active {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.2);
}

@keyframes avatarFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.team-image-wrapper {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 24px;
  border: 2px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
  background-color: #000;
  animation: avatarFloat 4s ease-in-out infinite;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* Stagger the animation slightly for a natural look */
.team-card:nth-child(even) .team-image-wrapper {
  animation-delay: 1s;
}
.team-card:nth-child(3n) .team-image-wrapper {
  animation-delay: 2s;
}

.team-card.large .team-image-wrapper {
  width: 155px;
  height: 155px;
}

.team-card:hover .team-image-wrapper, .team-card:active .team-image-wrapper {
  border-color: var(--accent-color);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.25);
}

.team-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  filter: brightness(0.95);
  transition: filter 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s ease;
}

.team-card:hover .team-img, .team-card:active .team-img {
  filter: brightness(1.1);
  transform: scale(1.06);
}

.team-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 4rem;
  color: var(--accent-color);
  background-color: #1a1a1d;
}

.team-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.team-name {
  font-size: 1.25rem;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: 0.2px;
}

.team-role {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1.5px;
}

.team-accent-line {
  width: 30px;
  height: 2px;
  background-color: var(--accent-color);
  margin-top: 16px;
  opacity: 0.3;
  transition: width 0.4s ease, opacity 0.4s ease;
}

.team-card:hover .team-accent-line, .team-card:active .team-accent-line {
  width: 60px;
  opacity: 1;
}

/* Tablet & Mobile Responsiveness */
@media (max-width: 1024px) {
  .execom-row-leadership {
    gap: 20px;
  }
}

@media (max-width: 900px) {
  .team-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .execom-hierarchy-container {
    gap: 24px;
    margin-top: 30px;
  }

  .execom-row-advisor, .execom-row-leadership {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
  }
  
  .team-card.large, .team-card {
    width: 100%;
    max-width: 320px;
    padding: 30px 16px 24px;
  }

  .team-image-wrapper {
    width: 120px;
    height: 120px;
    margin-bottom: 16px;
  }

  .team-card.large .team-image-wrapper {
    width: 135px;
    height: 135px;
  }

  .team-name {
    font-size: 1.1rem;
    margin-bottom: 6px;
  }

  .team-role {
    font-size: 0.75rem;
    letter-spacing: 1px;
  }

  .team-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    justify-items: center;
  }
}

@media (max-width: 480px) {
  .team-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .team-card {
    max-width: 100%;
  }
}
'''

with open('src/components/Team.css', 'w', encoding='utf-8') as f:
    f.write(team_css)

print("Team component updated with Staff Advisor and centered Chairperson!")
