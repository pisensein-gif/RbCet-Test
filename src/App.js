import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import KnowMore from './pages/KnowMore';
import GalleryPage from './pages/GalleryPage';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Admin from './pages/Admin';
import AdminCategory from './pages/AdminCategory';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <Router>
          <ScrollToTop />
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/know-more" element={<KnowMore />} />
              <Route path="/about" element={<KnowMore />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/events/:categoryId" element={<CategoryPage />} />
              <Route path="/register/:eventId" element={<Register />} />
              
              {/* Admin Auth Routes */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/admin/:categoryId" element={
                <ProtectedRoute>
                  <AdminCategory />
                </ProtectedRoute>
              } />
            </Routes>
            <Footer />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;

