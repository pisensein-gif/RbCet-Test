import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Image as ImageIcon, X, Trash2, Eye, EyeOff } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminCategory.css';
import './AdminAchievement.css'; // Extra styles if needed

const AdminAchievement = () => {
  const [achievements, setAchievements] = useState([]);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  
  const [newAchievement, setNewAchievement] = useState({ title: '', date: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/uta5uto7/image/upload";
  const CLOUDINARY_PRESET = "robocet_preset";

  useEffect(() => {
    fetchAchievements();
    setIsControlPanelOpen(false);
  }, []);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "events"), where("categoryId", "==", "achievements"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setAchievements(data);
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
    setLoading(true);
    setError(null);
    try {
      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", CLOUDINARY_PRESET);
        const uploadRes = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
        if (!uploadRes.ok) throw new Error("Failed to upload image.");
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
      }

      const newAchvData = {
        title: newAchievement.title,
        date: newAchievement.date,
        description: newAchievement.description,
        imageUrl: imageUrl,
        categoryId: "achievements",
        isPublished: false,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, "events"), newAchvData);
      setAchievements([{ id: docRef.id, ...newAchvData, createdAt: new Date() }, ...achievements]);
      setNewAchievement({ title: '', date: '', description: '' });
      setImageFile(null);
      setIsCreateModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleDeleteAchievement = async (id, e) => {
    e.stopPropagation(); 
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      try {
        await deleteDoc(doc(db, "events", id));
        setAchievements(achievements.filter(a => a.id !== id));
        if (selectedAchievement?.id === id) setIsControlPanelOpen(false);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const openControlPanel = (achv) => {
    setSelectedAchievement(achv);
    setIsControlPanelOpen(true);
  };

  const updateSetting = async (field, value) => {
    try {
      const docRef = doc(db, "events", selectedAchievement.id);
      await updateDoc(docRef, { [field]: value });
      const updated = { ...selectedAchievement, [field]: value };
      setSelectedAchievement(updated);
      setAchievements(achievements.map(a => a.id === selectedAchievement.id ? updated : a));
    } catch (err) {
      setError("Failed to update: " + err.message);
    }
  };

  return (
    <div className="admin-category-page admin-achievement-page">
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/admin" className="back-link">
            <ArrowLeft size={20} /> Back to Hub
          </Link>
          <h1 style={{ margin: 0 }}>Achievements Dashboard</h1>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="dashboard-grid">
        {achievements.map((achv, index) => (
          <motion.div 
            key={achv.id}
            className="admin-event-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => openControlPanel(achv)}
          >
            <div className="card-image-wrapper">
              {achv.imageUrl ? (
                <img src={achv.imageUrl} alt={achv.title} />
              ) : (
                <div className="placeholder-img"><ImageIcon size={40} /></div>
              )}
              <div className={`status-badge ${achv.isPublished ? 'published' : 'draft'}`}>
                {achv.isPublished ? 'Published' : 'Draft'}
              </div>
              <button className="delete-btn" onClick={(e) => handleDeleteAchievement(achv.id, e)}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="card-info">
              <h3>{achv.title}</h3>
              <p>{new Date(achv.date).toLocaleDateString('en-IN')}</p>
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
          <h3>Add Achievement</h3>
        </motion.div>
      </div>

      <AnimatePresence>
        {isControlPanelOpen && selectedAchievement && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsControlPanelOpen(false)}
          >
            <motion.div 
              className="modal-content control-panel-modal glass-panel"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setIsControlPanelOpen(false)}>
                <X size={24} />
              </button>
              
              <div className="control-panel-header">
                <h2>{selectedAchievement.title}</h2>
              </div>

              <div className="cp-settings-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="setting-box">
                  <h3>Visibility</h3>
                  <div className="toggle-wrapper">
                    <button 
                      className={`toggle-btn ${selectedAchievement.isPublished ? 'active' : ''}`}
                      onClick={() => updateSetting('isPublished', !selectedAchievement.isPublished)}
                    >
                      {selectedAchievement.isPublished ? <Eye size={18}/> : <EyeOff size={18}/>}
                      {selectedAchievement.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </div>
                </div>

                <div className="setting-box">
                  <h3>Edit Title</h3>
                  <input 
                    type="text" 
                    value={selectedAchievement.title || ''}
                    onChange={(e) => updateSetting('title', e.target.value)}
                    style={{width:'100%', padding:'10px', background:'rgba(0,0,0,0.4)', border:'1px solid rgba(255,255,255,0.1)', color:'white', borderRadius:'6px'}}
                  />
                </div>
                
                <div className="setting-box" style={{gridColumn: '1 / -1'}}>
                  <h3>Edit Description</h3>
                  <textarea 
                    value={selectedAchievement.description || ''}
                    onChange={(e) => updateSetting('description', e.target.value)}
                    style={{width:'100%', padding:'10px', background:'rgba(0,0,0,0.4)', border:'1px solid rgba(255,255,255,0.1)', color:'white', borderRadius:'6px'}}
                    rows={4}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              
              <h2>Add New Achievement</h2>
              <form onSubmit={handleCreateSubmit} className="modal-form">
                <div className="form-group">
                  <label>Title (e.g. 1st Place at TechFest)</label>
                  <input type="text" value={newAchievement.title} onChange={e => setNewAchievement({...newAchievement, title: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Date of Achievement</label>
                  <input type="date" value={newAchievement.date} onChange={e => setNewAchievement({...newAchievement, date: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    value={newAchievement.description} 
                    onChange={e => setNewAchievement({...newAchievement, description: e.target.value})} 
                    rows={4}
                    placeholder="Briefly describe the team's success..."
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Achievement Image</label>
                  <div className="file-upload-wrapper">
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                  </div>
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Uploading & Saving...' : 'Add Achievement'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAchievement;
