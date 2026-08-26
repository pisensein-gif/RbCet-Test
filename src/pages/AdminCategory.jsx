import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Image as ImageIcon, X, Trash2, Settings, Users, Eye, EyeOff, Edit3, GripVertical, AlertTriangle, Download, ExternalLink } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminCategory.css';

const AdminCategory = () => {
  const { categoryId } = useParams();
  
  const [events, setEvents] = useState([]);
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const [isFormBuilderOpen, setIsFormBuilderOpen] = useState(false);
  
  // Create State
  const [newEvent, setNewEvent] = useState({ title: '', date: '', externalLink: '' });
  const [imageFile, setImageFile] = useState(null);
  
  // Control Panel State
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  
  // Form Builder State
  const [builderFields, setBuilderFields] = useState([]);
  const [newField, setNewField] = useState({ label: '', type: 'text', required: true, options: [], description: '', imageUrl: '' });
  const [newOption, setNewOption] = useState('');
  const [isAdminUploading, setIsAdminUploading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/uta5uto7/image/upload";
  const CLOUDINARY_PRESET = "robocet_preset";

  useEffect(() => {
    fetchEvents();
    setIsControlPanelOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "events"), where("categoryId", "==", categoryId));
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setEvents(eventsData);
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

      const newEventData = {
        title: newEvent.title,
        date: newEvent.date,
        imageUrl: imageUrl,
        externalLink: newEvent.externalLink || "",
        categoryId: categoryId,
        isPublished: false,
        status: "Registration Open",
        formFields: [], 
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, "events"), newEventData);
      setEvents([{ id: docRef.id, ...newEventData, createdAt: new Date() }, ...events]);
      setNewEvent({ title: '', date: '', externalLink: '' });
      setImageFile(null);
      setIsCreateModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleDeleteEvent = async (id, e) => {
    e.stopPropagation(); 
    if (window.confirm("Are you sure you want to delete this event? This will also orphan all registration data.")) {
      try {
        await deleteDoc(doc(db, "events", id));
        setEvents(events.filter(ev => ev.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const fetchRegistrations = async (eventId) => {
    try {
      const q = query(collection(db, "registrations"), where("eventId", "==", eventId));
      const querySnapshot = await getDocs(q);
      const regData = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setRegistrations(regData);
    } catch (err) {
      console.error(err);
    }
  };

  const openControlPanel = async (event) => {
    setSelectedEvent(event);
    setIsControlPanelOpen(true);
    setRegistrations([]); 
    if (!event.externalLink) {
      await fetchRegistrations(event.id);
    }
  };

  const updateEventSetting = async (field, value) => {
    try {
      const eventRef = doc(db, "events", selectedEvent.id);
      await updateDoc(eventRef, { [field]: value });
      const updatedEvent = { ...selectedEvent, [field]: value };
      setSelectedEvent(updatedEvent);
      setEvents(events.map(ev => ev.id === selectedEvent.id ? updatedEvent : ev));
    } catch (err) {
      setError("Failed to update event: " + err.message);
    }
  };

  // Registration Deletion
  const handleDeleteRegistration = async (regId) => {
    if (window.confirm("Delete this single registration? Firebase data will be removed. Associated Cloudinary files will remain orphaned.")) {
      try {
        await deleteDoc(doc(db, "registrations", regId));
        setRegistrations(registrations.filter(r => r.id !== regId));
      } catch (err) {
        setError("Failed to delete registration: " + err.message);
      }
    }
  };

  const handleDeleteAllRegistrations = async () => {
    if (window.confirm("WARNING: This will permanently delete ALL registrations for this event from Firebase. Associated Cloudinary files will remain orphaned. Are you completely sure?")) {
      try {
        const promises = registrations.map(reg => deleteDoc(doc(db, "registrations", reg.id)));
        await Promise.all(promises);
        setRegistrations([]);
      } catch (err) {
        setError("Failed to delete all registrations: " + err.message);
      }
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (registrations.length === 0) return;

    // 1. Get Headers
    const inputFields = (selectedEvent?.formFields || []).filter(f => f.type !== 'header' && f.type !== 'display_image');
    const headers = inputFields.map(f => f.label);
    
    // 2. Map Rows
    const csvRows = [];
    csvRows.push(headers.map(header => `"${header.replace(/"/g, '""')}"`).join(','));

    registrations.forEach(reg => {
      const row = inputFields.map(f => {
        let val = reg[f.id] || '';
        if (Array.isArray(val)) val = val.join(', ');
        if (typeof val === 'boolean') val = val ? 'Yes' : 'No';
        const safeVal = String(val).replace(/"/g, '""');
        return `"${safeVal}"`;
      });
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedEvent.title.replace(/\s+/g, '_')}_Registrations.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Form Builder Handlers
  const openFormBuilder = () => {
    setBuilderFields(selectedEvent.formFields || []);
    setIsFormBuilderOpen(true);
  };

  const addOptionToNewField = () => {
    if (!newOption.trim()) return;
    setNewField({ ...newField, options: [...newField.options, newOption.trim()] });
    setNewOption('');
  };

  const removeOptionFromNewField = (idx) => {
    const updatedOptions = [...newField.options];
    updatedOptions.splice(idx, 1);
    setNewField({ ...newField, options: updatedOptions });
  };

  const handleAdminImageUpload = async (e) => {
    if (!e.target.files[0]) return;
    if (e.target.files[0].size > 5 * 1024 * 1024) {
      alert("File is too large. Please select an image under 5MB.");
      e.target.value = "";
      return;
    }
    setIsAdminUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", e.target.files[0]);
      formDataUpload.append("upload_preset", CLOUDINARY_PRESET);
      const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formDataUpload });
      if (!res.ok) throw new Error("Failed to upload image");
      const data = await res.json();
      setNewField({ ...newField, imageUrl: data.secure_url });
    } catch (err) {
      alert(err.message);
    }
    setIsAdminUploading(false);
  };

  const handleAddFieldToBuilder = () => {
    if (newField.type !== 'display_image' && !newField.label.trim()) {
        alert("Please provide a label or title for this field.");
        return;
    }
    if ((newField.type === 'dropdown' || newField.type === 'checkbox') && newField.options.length === 0) {
      alert("Please add at least one option for this field.");
      return;
    }
    if (newField.type === 'display_image' && !newField.imageUrl) {
      alert("Please upload an image first.");
      return;
    }

    const fieldId = `field_${Date.now()}`;
    const fieldToAdd = { ...newField, id: fieldId };
    setBuilderFields([...builderFields, fieldToAdd]);
    setNewField({ label: '', type: 'text', required: true, options: [], description: '', imageUrl: '' });
  };

  const removeFieldFromBuilder = (id) => {
    setBuilderFields(builderFields.filter(f => f.id !== id));
  };

  const saveFormBuilder = () => {
    updateEventSetting('formFields', builderFields);
    setIsFormBuilderOpen(false);
  };

  const renderTableCell = (value) => {
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'string' && value.startsWith('http')) {
      return <a href={value} target="_blank" rel="noreferrer" style={{color:'var(--accent-color)'}}>View File</a>;
    }
    return value || '-';
  };

  const inputFields = (selectedEvent?.formFields || []).filter(f => f.type !== 'header' && f.type !== 'display_image');

  return (
    <div className="admin-category-page">
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/admin" className="back-link">
            <ArrowLeft size={20} /> Back to Hub
          </Link>
          <h1 style={{ margin: 0 }}>{categoryId.toUpperCase()} Dashboard</h1>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="dashboard-grid">
        {events.map((event, index) => (
          <motion.div 
            key={event.id}
            className="admin-event-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => openControlPanel(event)}
          >
            <div className="card-image-wrapper">
              {event.imageUrl ? (
                <img src={event.imageUrl} alt={event.title} />
              ) : (
                <div className="placeholder-img"><ImageIcon size={40} /></div>
              )}
              <div className={`status-badge ${event.isPublished ? 'published' : 'draft'}`}>
                {event.isPublished ? 'Published' : 'Draft'}
              </div>
              <button className="delete-btn" onClick={(e) => handleDeleteEvent(event.id, e)}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="card-info">
              <h3>{event.title}</h3>
              <p>{new Date(event.date).toLocaleDateString('en-IN')}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span className="mini-status">{event.status || 'Registration Open'}</span>
                <span className="settings-link"><Settings size={16}/> Manage</span>
              </div>
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
          <h3>Create New</h3>
        </motion.div>
      </div>

      {/* Control Panel Modal */}
      <AnimatePresence>
        {isControlPanelOpen && selectedEvent && !isFormBuilderOpen && (
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
                <h2>{selectedEvent.title}</h2>
                {!selectedEvent.externalLink && (
                  <div className="cp-actions" style={{display:'flex', gap:'10px'}}>
                    <button onClick={openFormBuilder} className="btn-primary small" style={{display:'flex', alignItems:'center', gap:'5px'}}>
                      <Edit3 size={16}/> Edit Form
                    </button>
                    <a href={`/register/${selectedEvent.id}`} target="_blank" rel="noreferrer" className="btn-outline small">View Form</a>
                  </div>
                )}
              </div>

              <div className="cp-settings-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                <div className="setting-box">
                  <h3>Visibility</h3>
                  <div className="toggle-wrapper">
                    <button 
                      className={`toggle-btn ${selectedEvent.isPublished ? 'active' : ''}`}
                      onClick={() => updateEventSetting('isPublished', !selectedEvent.isPublished)}
                    >
                      {selectedEvent.isPublished ? <Eye size={18}/> : <EyeOff size={18}/>}
                      {selectedEvent.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </div>
                </div>

                <div className="setting-box">
                  <h3>Event Status</h3>
                  <select 
                    className="status-dropdown"
                    value={selectedEvent.status || 'Registration Open'}
                    onChange={(e) => updateEventSetting('status', e.target.value)}
                  >
                    <option value="Registration Open">Registration Open</option>
                    <option value="Registration Closed">Registration Closed</option>
                    <option value="Workshop Finished">Workshop Finished</option>
                  </select>
                </div>
                
                <div className="setting-box">
                  <h3>External Reg Link (Optional)</h3>
                  <input 
                    type="url" 
                    placeholder="https://google.com/forms..."
                    value={selectedEvent.externalLink || ''}
                    onChange={(e) => updateEventSetting('externalLink', e.target.value)}
                    style={{width:'100%', padding:'10px', background:'rgba(0,0,0,0.4)', border:'1px solid rgba(255,255,255,0.1)', color:'white', borderRadius:'6px'}}
                  />
                  <p className="setting-desc" style={{fontSize: '0.75rem'}}>Overrides the internal form.</p>
                </div>
              </div>

              {/* Registrations List */}
              <div className="registrations-section" style={{ marginTop: '30px' }}>
                {selectedEvent.externalLink ? (
                  <div style={{textAlign: 'center', padding: '40px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px'}}>
                    <ExternalLink size={48} color="rgba(255,255,255,0.2)" style={{marginBottom: '10px'}}/>
                    <h3>External Link Active</h3>
                    <p style={{color: 'var(--text-secondary)'}}>Registrations are being handled externally via:<br/><a href={selectedEvent.externalLink} target="_blank" rel="noreferrer" style={{color: 'var(--accent-color)'}}>{selectedEvent.externalLink}</a></p>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                        <Users size={20}/> Registrations ({registrations.length})
                      </h3>
                      {registrations.length > 0 && (
                        <div style={{display:'flex', gap:'10px'}}>
                          <button onClick={exportToCSV} className="btn-primary small" style={{display:'flex', alignItems:'center', gap:'5px'}}>
                            <Download size={14}/> Export CSV
                          </button>
                          <button onClick={handleDeleteAllRegistrations} className="btn-danger small" style={{display:'flex', alignItems:'center', gap:'5px'}}>
                            <AlertTriangle size={14}/> Delete All
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="registrations-table-container">
                      {registrations.length === 0 ? (
                        <p className="empty-state">No one has registered yet.</p>
                      ) : (
                        <div style={{ overflowX: 'auto' }}>
                          <table className="registrations-table" style={{ whiteSpace: 'nowrap' }}>
                            <thead>
                              <tr>
                                {inputFields.map(f => (
                                  <th key={f.id}>{f.label}</th>
                                ))}
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {registrations.map(reg => (
                                <tr key={reg.id}>
                                  {inputFields.map(f => (
                                    <td key={f.id}>{renderTableCell(reg[f.id])}</td>
                                  ))}
                                  <td>
                                    <button onClick={() => handleDeleteRegistration(reg.id)} style={{background:'transparent', border:'none', color:'#ff4444', cursor:'pointer'}} title="Delete Registration">
                                      <Trash2 size={16}/>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Builder Modal */}
      <AnimatePresence>
        {isFormBuilderOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content form-builder-modal glass-panel"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="control-panel-header">
                <h2>100% Custom Form Builder</h2>
                <div className="cp-actions" style={{display:'flex', gap:'10px'}}>
                  <button onClick={() => setIsFormBuilderOpen(false)} className="btn-outline small">Cancel</button>
                  <button onClick={saveFormBuilder} className="btn-primary small">Save Form</button>
                </div>
              </div>

              <div className="form-builder-body" style={{display:'flex', gap:'30px'}}>
                
                {/* Left Side: Live Preview / Field List */}
                <div className="form-preview" style={{flex: 1}}>
                  <h3>Form Layout</h3>
                  {builderFields.length === 0 && (
                    <div className="mock-field" style={{textAlign:'center', padding:'30px'}}>
                      Your form is completely empty. Add fields from the right panel! <br/>
                      (Don't forget to add a Name and Email field!)
                    </div>
                  )}

                  <div className="custom-fields-list">
                    {builderFields.map((field) => (
                      <div key={field.id} className="builder-field-item">
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                          <GripVertical size={16} color="#666" />
                          <div>
                            <strong>{field.label || (field.type === 'display_image' && 'Image Display')}</strong> 
                            <span style={{fontSize:'0.8rem', color:'#888'}}> ({field.type}) {field.required && '*'}</span>
                          </div>
                        </div>
                        <button onClick={() => removeFieldFromBuilder(field.id)} className="icon-btn-danger"><Trash2 size={16}/></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Add Field Tools */}
                <div className="add-field-panel" style={{flex: 1, background:'rgba(0,0,0,0.2)', padding:'20px', borderRadius:'12px', border:'1px solid rgba(255,255,255,0.05)'}}>
                  <h3>Add Form Element</h3>
                  <div className="form-group" style={{marginTop:'15px'}}>
                    <label>Element Type</label>
                    <select 
                      value={newField.type} 
                      onChange={e => setNewField({...newField, type: e.target.value, options: [], imageUrl: ''})}
                      className="builder-input"
                    >
                      <optgroup label="Data Collection (Inputs)">
                        <option value="text">Short Text</option>
                        <option value="paragraph">Paragraph (Long Text)</option>
                        <option value="checkbox">Checkbox (Multi-Select Options)</option>
                        <option value="dropdown">Dropdown (Single-Select Options)</option>
                        <option value="image">File Upload (Student uploads Image)</option>
                      </optgroup>
                      <optgroup label="Visual Elements (Display Only)">
                        <option value="header">Section Header (Text)</option>
                        <option value="display_image">Display Image (e.g. QR Code)</option>
                      </optgroup>
                    </select>
                  </div>

                  {newField.type !== 'display_image' && (
                    <div className="form-group" style={{marginTop:'15px'}}>
                      <label>{newField.type === 'header' ? 'Section Title' : 'Field Question / Label'}</label>
                      <input 
                        type="text" 
                        placeholder={newField.type === 'header' ? "e.g. Payment Details" : "e.g. Full Name"} 
                        value={newField.label} 
                        onChange={e => setNewField({...newField, label: e.target.value})}
                        className="builder-input"
                      />
                    </div>
                  )}

                  {newField.type === 'header' && (
                    <div className="form-group" style={{marginTop:'15px'}}>
                      <label>Section Description (Optional)</label>
                      <textarea 
                        placeholder="e.g. Please complete your payment before filling the fields below." 
                        value={newField.description} 
                        onChange={e => setNewField({...newField, description: e.target.value})}
                        className="builder-input"
                        rows="3"
                      />
                    </div>
                  )}

                  {newField.type === 'display_image' && (
                    <div className="form-group" style={{marginTop:'15px'}}>
                      <label>Upload Image to Display (QR Code, etc.)</label>
                      <div className="file-upload-wrapper" style={{background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '6px'}}>
                        <input type="file" accept="image/*" onChange={handleAdminImageUpload} />
                      </div>
                      {isAdminUploading && <p style={{color:'var(--accent-color)', fontSize:'0.8rem', marginTop:'5px'}}>Uploading image securely...</p>}
                      {newField.imageUrl && <p style={{color:'#00ffcc', fontSize:'0.8rem', marginTop:'5px'}}>Image uploaded successfully! Ready to add.</p>}
                    </div>
                  )}

                  {(newField.type === 'dropdown' || newField.type === 'checkbox') && (
                    <div className="form-group" style={{marginTop:'15px'}}>
                      <label>Options for {newField.type}</label>
                      <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
                        <input 
                          type="text" 
                          placeholder="e.g. Option A" 
                          value={newOption}
                          onChange={e => setNewOption(e.target.value)}
                          className="builder-input"
                        />
                        <button onClick={addOptionToNewField} className="btn-outline small">Add</button>
                      </div>
                      <div className="options-list">
                        {newField.options.map((opt, i) => (
                          <div key={i} style={{display:'flex', justifyContent:'space-between', background:'rgba(255,255,255,0.05)', padding:'5px 10px', borderRadius:'4px', marginBottom:'5px', fontSize:'0.9rem'}}>
                            {opt}
                            <button onClick={() => removeOptionFromNewField(i)} style={{background:'transparent', border:'none', color:'#ff4444', cursor:'pointer'}}><X size={14}/></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {newField.type !== 'header' && newField.type !== 'display_image' && (
                    <div className="form-group" style={{marginTop:'15px', flexDirection:'row', alignItems:'center', gap:'10px'}}>
                      <input 
                        type="checkbox" 
                        id="req-check"
                        checked={newField.required} 
                        onChange={e => setNewField({...newField, required: e.target.checked})} 
                        style={{width:'auto'}}
                      />
                      <label htmlFor="req-check" style={{margin:0}}>Required Field</label>
                    </div>
                  )}

                  <button onClick={handleAddFieldToBuilder} className="btn-primary" disabled={isAdminUploading} style={{width:'100%', marginTop:'20px'}}>
                    Add Element to Form
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Event Modal */}
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
              
              <h2>Create {categoryId}</h2>
              <form onSubmit={handleCreateSubmit} className="modal-form">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>External Registration Link (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://docs.google.com/forms..." 
                    value={newEvent.externalLink || ''} 
                    onChange={e => setNewEvent({...newEvent, externalLink: e.target.value})} 
                  />
                  <p style={{fontSize:'0.75rem', color:'var(--text-secondary)', marginTop:'5px'}}>If provided, students will be redirected here instead of using the built-in form.</p>
                </div>
                <div className="form-group">
                  <label>Cover Image</label>
                  <div className="file-upload-wrapper">
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                  </div>
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Uploading & Saving...' : 'Create Event'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCategory;



