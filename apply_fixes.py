import sys

def replace_in_file(filepath, search_str, replace_str):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if search_str in content:
        content = content.replace(search_str, replace_str)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

# GalleryPage.jsx
replace_in_file('src/pages/GalleryPage.jsx', "style={{width: '90vw', maxWidth: '1000px', aspectRatio: '16/9', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}", 'className="lightbox-content"')
replace_in_file('src/pages/GalleryPage.jsx', "style={{width:'100%', height:'80vh', overflow:'hidden', borderRadius:'12px', background:'#000', position:'relative', boxShadow: '0 0 50px rgba(0, 255, 204, 0.2)'}}", 'className="lightbox-img-wrapper"')

# GalleryPage.css
replace_in_file('src/pages/GalleryPage.css', '/* Lightbox Styles */', '''/* Lightbox Styles */
.lightbox-img-wrapper {
  width: 100%;
  height: 80vh;
  overflow: hidden;
  border-radius: 12px;
  background: #000;
  position: relative;
  box-shadow: 0 0 50px rgba(0, 255, 204, 0.2);
}''')

replace_in_file('src/pages/GalleryPage.css', '.lightbox-content {', '''.lightbox-content {
  width: 90vw;
  max-width: 1000px;
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;''')

replace_in_file('src/pages/GalleryPage.css', '''@media (max-width: 768px) {
  .gallery-title {
    font-size: 2.5rem;
  }
  .public-gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    padding: 10px;
  }
  .gallery-loading-card {
    padding: 40px 20px;
  }
  .gallery-loading-title {
    font-size: 1.8rem;
  }
}''', '''@media (max-width: 768px) {
  .gallery-title {
    font-size: 2.2rem;
  }
  .public-gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
    padding: 10px;
  }
  .gallery-loading-card {
    padding: 40px 20px;
  }
  .gallery-loading-title {
    font-size: 1.8rem;
  }
  .lightbox-content {
    aspect-ratio: auto;
    width: 95vw;
  }
  .lightbox-img-wrapper {
    height: 50vh;
  }
  .lightbox-title {
    font-size: 1.2rem;
    text-align: center;
    margin-top: 15px;
  }
}''')

# Events.css
replace_in_file('src/components/Events.css', '''@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 25px;
  }
  
  .event-category-card {
    height: 380px;
  }

  .card-content {
    padding: 20px;
  }

  .card-title {
    font-size: 1.5rem;
    margin-bottom: 6px;
  }

  /* Automatically show details on mobile touch screens */
  .card-header {
    transform: translateY(0);
  }

  .card-body {
    opacity: 1;
    transform: translateY(0);
    max-height: 250px;
  }

  .card-desc {
    font-size: 0.88rem;
    margin-bottom: 14px;
    line-height: 1.4;
  }

  .card-gradient-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.5) 30%,
      rgba(0, 0, 0, 0.96) 90%
    );
  }
}''', '''@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 25px;
  }
  
  .event-category-card {
    height: auto;
    min-height: 340px;
  }

  .card-content {
    padding: 15px;
  }

  .card-title {
    font-size: 1.5rem;
    margin-bottom: 6px;
  }

  .card-header {
    transform: translateY(0);
  }

  .card-body {
    opacity: 1;
    transform: translateY(0);
    max-height: 250px;
  }

  .card-desc {
    font-size: 0.88rem;
    margin-bottom: 14px;
    line-height: 1.4;
  }

  .card-gradient-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.5) 30%,
      rgba(0, 0, 0, 0.96) 90%
    );
  }
}''')

# Hero.css
replace_in_file('src/components/Hero.css', '''@media (max-width: 768px) {
  .hero-video-desktop {
    display: none;
  }
  
  .hero-video-mobile {
    display: block;
  }
}''', '''@media (max-width: 768px) {
  .hero-title {
    font-size: clamp(2.5rem, 8vw, 4rem) !important;
  }
  .hero-subtitle {
    font-size: clamp(1rem, 4vw, 1.5rem) !important;
    padding: 0 15px;
  }
  .hero-video-desktop {
    display: none;
  }
  .hero-video-mobile {
    display: block;
  }
}''')

# About.css
replace_in_file('src/components/About.css', '''@media (max-width: 768px) {
  .about-main-container {
    padding: 20px 14px;
  }
  .quote-text {
    font-size: 1.35rem;
  }
  .about-lead-text, .about-intro-right {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  .cyber-frame-wrapper {
    padding: 12px 10px;
  }
  .cyber-frame-header, .cyber-frame-footer {
    font-size: 0.68rem;
    letter-spacing: 1px;
  }
  .vision-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .vision-card {
    padding: 30px 20px;
  }
}''', '''@media (max-width: 768px) {
  .about-main-container {
    padding: 20px 14px;
  }
  .quote-text {
    font-size: clamp(1.1rem, 5vw, 1.35rem);
  }
  .about-lead-text, .about-intro-right {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  .cyber-frame-wrapper {
    padding: 12px 10px;
  }
  .cyber-frame-header, .cyber-frame-footer {
    font-size: 0.68rem;
    letter-spacing: 1px;
  }
  .vision-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .vision-card {
    padding: 30px 20px;
  }
  .vision-subtitle {
    font-size: clamp(1.5rem, 6vw, 1.8rem);
    margin: 50px 0 30px;
  }
}''')

# AchievementsPage.css
replace_in_file('src/pages/AchievementsPage.css', '''@media (min-width: 768px) {
  .achievement-card {
    flex-direction: row;
    height: 300px;
  }''', '''@media (max-width: 767px) {
  .achievement-image-container {
    aspect-ratio: 2/1; 
  }
  .achievements-page {
    padding: 80px 15px 40px;
  }
  .achievements-title {
    font-size: 2.2rem;
  }
  .achievement-details {
    padding: 20px 15px;
  }
  .achv-title {
    font-size: 1.4rem;
  }
}

@media (min-width: 768px) {
  .achievement-card {
    flex-direction: row;
    height: 300px;
  }''')

# Gallery.css (needs two block replacements)
replace_in_file('src/components/Gallery.css', '''@media (max-width: 768px) {
  .gallery-collage {
    padding: 30px 10px;
  }

  .gallery-item {
    width: 160px;
    height: 200px;
    margin: -10px -15px;
  }

  .photo-frame {
    padding: 8px 8px 26px 8px;
  }

  .gallery-btn-wrapper {
    margin-top: 35px;
    margin-left: 0;
    width: 100%;
  }

  .view-more-btn {
    width: 100%;
    max-width: 280px;
    text-align: center;
    font-size: 0.95rem;
  }
}''', '''@media (max-width: 768px) {
  .gallery-collage {
    padding: 30px 10px;
    gap: 15px;
  }

  .gallery-item {
    width: clamp(140px, 45vw, 180px);
    height: auto;
    aspect-ratio: 4/5;
    margin: 0;
  }

  .photo-frame {
    padding: 8px 8px 26px 8px;
  }

  .gallery-btn-wrapper {
    margin-top: 35px;
    margin-left: 0;
    width: 100%;
  }

  .view-more-btn {
    width: 100%;
    max-width: 280px;
    text-align: center;
    font-size: 0.95rem;
  }
}''')

replace_in_file('src/components/Gallery.css', '''@media (max-width: 480px) {
  .gallery-item {
    width: 140px;
    height: 175px;
    margin: -8px -12px;
  }
}''', '''@media (max-width: 480px) {
  .gallery-item {
    width: clamp(130px, 42vw, 160px);
    height: auto;
    aspect-ratio: 3/4;
    margin: 0;
  }
}''')

