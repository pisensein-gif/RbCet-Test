import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, X } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, serverTimestamp, query } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminGallery.css';

const AdminGallery = () => {
  const [albums, setAlbums] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  
  const [newAlbum, setNewAlbum] = useState({ title: '', date: '' });
  const [imageFile, setImageFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/uta5uto7/image/upload";
  const CLOUDINARY_PRESET = "robocet_preset";

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "gallery_albums"));
      const querySnapshot = await getDocs(q);
      const albumData = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setAlbums(albumData);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const newAlbumData = {
        title: newAlbum.title,
        date: newAlbum.date,
        images: [],
        createdAt: serverTimestamp()
      };
      const docRef = await addDoc(collection(db, "gallery_albums"), newAlbumData);
      setAlbums([{ id: docRef.id, ...newAlbumData }, ...albums]);
      setNewAlbum({ title: '', date: '' });
      setIsCreateModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleDeleteAlbum = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Delete this entire slideshow album?")) {
      try {
        await deleteDoc(doc(db, "gallery_albums", id));
        setAlbums(albums.filter(a => a.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const openControlPanel = (album) => {
    setSelectedAlbum(album);
    setIsControlPanelOpen(true);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size > 5 * 1024 * 1024) {
        alert("File too large. Under 5MB.");
        e.target.value = "";
        return;
      }
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddImageToAlbum = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Select an image first.");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", CLOUDINARY_PRESET);
      const uploadRes = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
      if (!uploadRes.ok) throw new Error("Failed to upload");
      const uploadData = await uploadRes.json();
      
      const updatedImages = [...(selectedAlbum.images || []), uploadData.secure_url];
      await updateDoc(doc(db, "gallery_albums", selectedAlbum.id), { images: updatedImages });
      
      const updatedAlbum = { ...selectedAlbum, images: updatedImages };
      setSelectedAlbum(updatedAlbum);
      setAlbums(albums.map(a => a.id === selectedAlbum.id ? updatedAlbum : a));
      setImageFile(null);
      document.getElementById('album-img-upload').value = "";
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  const handleRemoveImageFromAlbum = async (imgUrl) => {
    if (!window.confirm("Remove this image from the slideshow?")) return;
    try {
      const updatedImages = selectedAlbum.images.filter(url => url !== imgUrl);
      await updateDoc(doc(db, "gallery_albums", selectedAlbum.id), { images: updatedImages });
      const updatedAlbum = { ...selectedAlbum, images: updatedImages };
      setSelectedAlbum(updatedAlbum);
      setAlbums(albums.map(a => a.id === selectedAlbum.id ? updatedAlbum : a));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="admin-gallery-page">
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/admin" className="back-link">
            <ArrowLeft size={20} /> Back to Hub
          </Link>
          <h1 style={{ margin: 0 }}>Gallery Slideshows</h1>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="dashboard-grid">
        {albums.map((album, index) => (
          <motion.div 
            key={album.id}
            className="admin-event-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => openControlPanel(album)}
            style={{cursor: 'pointer'}}
          >
            <div className="card-image-wrapper gallery-image-wrapper">
              {album.images && album.images.length > 0 ? (
                <img src={album.images[0]} alt={album.title} />
              ) : (
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%', background:'rgba(0,0,0,0.5)', color:'rgba(255,255,255,0.5)'}}>
                  Empty Slideshow
                </div>
              )}
              <div className="status-badge published" style={{top:'10px', left:'auto', right:'10px'}}>{album.images?.length || 0} Slides</div>
              <button className="delete-btn" onClick={(e) => handleDeleteAlbum(album.id, e)} style={{left:'10px'}}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="card-info">
              <h3>{album.title}</h3>
              <p>{new Date(album.date).toLocaleDateString('en-IN')}</p>
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
          <h3>Create Slideshow</h3>
        </motion.div>
      </div>

      {/* Control Panel Modal */}
      <AnimatePresence>
        {isControlPanelOpen && selectedAlbum && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsControlPanelOpen(false)}
          >
            <motion.div 
              className="modal-content control-panel-modal glass-panel"
              style={{maxWidth: '800px'}}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setIsControlPanelOpen(false)}>
                <X size={24} />
              </button>
              
              <div className="control-panel-header">
                <h2>Slideshow: {selectedAlbum.title}</h2>
              </div>

              <div style={{padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', marginBottom: '20px'}}>
                <form onSubmit={handleAddImageToAlbum} style={{display:'flex', gap:'15px', alignItems:'flex-end'}}>
                  <div className="form-group" style={{flex: 1, margin: 0}}>
                    <label>Add New Slide Image</label>
                    <div className="file-upload-wrapper" style={{padding: '8px'}}>
                      <input id="album-img-upload" type="file" accept="image/*" onChange={handleImageChange} required />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary" disabled={loading} style={{height: '45px'}}>
                    {loading ? 'Uploading...' : 'Add Slide'}
                  </button>
                </form>
              </div>

              <div className="album-images-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px'}}>
                {selectedAlbum.images && selectedAlbum.images.length > 0 ? (
                  selectedAlbum.images.map((imgUrl, i) => (
                    <div key={i} style={{position: 'relative', aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden', background:'#000'}}>
                      <img src={imgUrl} alt={`Slide ${i}`} style={{width:'100%', height:'100%', objectFit:'contain'}} />
                      <button 
                        onClick={() => handleRemoveImageFromAlbum(imgUrl)}
                        style={{position:'absolute', top:'5px', right:'5px', background:'rgba(255,0,0,0.8)', border:'none', color:'white', padding:'5px', borderRadius:'50%', cursor:'pointer'}}
                      >
                        <Trash2 size={14}/>
                      </button>
                      <div style={{position:'absolute', bottom:'5px', left:'5px', background:'rgba(0,0,0,0.7)', padding:'2px 8px', borderRadius:'10px', fontSize:'0.75rem'}}>Slide {i+1}</div>
                    </div>
                  ))
                ) : (
                  <p style={{color:'rgba(255,255,255,0.5)', gridColumn:'1/-1'}}>No slides in this album yet.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Album Modal */}
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
              
              <h2>Create New Slideshow</h2>
              <form onSubmit={handleCreateAlbum} className="modal-form">
                <div className="form-group">
                  <label>Slideshow Title</label>
                  <input type="text" value={newAlbum.title} onChange={e => setNewAlbum({...newAlbum, title: e.target.value})} placeholder="e.g. Workshop 2026" required />
                </div>
                <div className="form-group">
                  <label>Event Date</label>
                  <input type="date" value={newAlbum.date} onChange={e => setNewAlbum({...newAlbum, date: e.target.value})} required />
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Slideshow'}
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
