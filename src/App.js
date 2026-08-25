import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Admin from './pages/Admin';
import AdminCategory from './pages/AdminCategory';
import Register from './pages/Register';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events/:categoryId" element={<CategoryPage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/:categoryId" element={<AdminCategory />} />
              <Route path="/register/:eventId" element={<Register />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
