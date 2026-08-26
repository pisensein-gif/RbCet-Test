import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, X } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminGallery.css';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newImage, setNewImage] = useState({ title: '' });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/uta5uto7/image/upload";
  const CLOUDINARY_PRESET = "robocet_preset";

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "gallery"));
      const querySnapshot = await getDocs(q);
      const imgData = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setImages(imgData);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size > 5 * 1024 * 1024) {
        alert("File is too large. Please select an image under 5MB.");
        e.target.value = "";
        return;
      }
      setImageFile(e.target.files[0]);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
        alert("Please select an image file.");
        return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", CLOUDINARY_PRESET);
      const uploadRes = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
      if (!uploadRes.ok) throw new Error("Failed to upload image.");
      const uploadData = await uploadRes.json();
      
      const newImageData = {
        title: newImage.title || "Untitled",
        imageUrl: uploadData.secure_url,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, "gallery"), newImageData);
      setImages([{ id: docRef.id, ...newImageData, createdAt: {seconds: Date.now()/1000} }, ...images]);
      
      setNewImage({ title: '' });
      setImageFile(null);
      setIsCreateModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleDeleteImage = async (id, e) => {
    e.stopPropagation(); 
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteDoc(doc(db, "gallery", id));
        setImages(images.filter(img => img.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="admin-gallery-page">
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/admin" className="back-link">
            <ArrowLeft size={20} /> Back to Hub
          </Link>
          <h1 style={{ margin: 0 }}>Gallery Dashboard</h1>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="dashboard-grid">
        {images.map((img, index) => (
          <motion.div 
            key={img.id}
            className="admin-event-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="card-image-wrapper gallery-image-wrapper">
              <img src={img.imageUrl} alt={img.title} />
              <button className="delete-btn" onClick={(e) => handleDeleteImage(img.id, e)}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="card-info">
              <h3>{img.title}</h3>
            </div>
          </motion.div>
        ))}

        <motion.div 
          className="admin-event-card create-new-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={48} className="plus-icon" />
          <h3>Upload Image</h3>
        </motion.div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCreateModalOpen(false)}
          >
            <motion.div 
              className="modal-content glass-panel"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setIsCreateModalOpen(false)}>
                <X size={24} />
              </button>
              
              <h2>Upload to Gallery</h2>
              <form onSubmit={handleCreateSubmit} className="modal-form">
                <div className="form-group">
                  <label>Title / Caption (Optional)</label>
                  <input type="text" value={newImage.title} onChange={e => setNewImage({...newImage, title: e.target.value})} placeholder="e.g. RoboWars Finale 2026" />
                </div>
                <div className="form-group">
                  <label>Image File</label>
                  <div className="file-upload-wrapper">
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                  </div>
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Uploading...' : 'Upload Image'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminGallery;

