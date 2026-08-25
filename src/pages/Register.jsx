import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './Register.css';

const Register = () => {
  const { eventId } = useParams();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // formData holds text, dropdown, and checkbox array data. fileData holds File objects.
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState({});

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/uta5uto7/image/upload";
  const CLOUDINARY_PRESET = "robocet_preset";

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", eventId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const eventData = { id: docSnap.id, ...docSnap.data() };
          setEvent(eventData);
          
          if (eventData.formFields && eventData.formFields.length > 0) {
            const initialDynamicData = {};
            eventData.formFields.forEach(field => {
              if (field.type === 'checkbox') {
                initialDynamicData[field.id] = []; 
              } else if (field.type === 'dropdown') {
                initialDynamicData[field.id] = ''; 
              } else if (field.type !== 'image' && field.type !== 'header' && field.type !== 'display_image') {
                initialDynamicData[field.id] = '';
              }
            });
            setFormData(initialDynamicData);
          }
        } else {
          setError("Event not found. It may have been deleted or the link is invalid.");
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [eventId]);

  const handleTextChange = (e, fieldId) => {
    setFormData({
      ...formData,
      [fieldId]: e.target.value
    });
  };

  const handleCheckboxChange = (e, fieldId, option) => {
    const isChecked = e.target.checked;
    const currentSelections = formData[fieldId] || [];
    
    let newSelections;
    if (isChecked) {
      newSelections = [...currentSelections, option];
    } else {
      newSelections = currentSelections.filter(item => item !== option);
    }
    
    setFormData({
      ...formData,
      [fieldId]: newSelections
    });
  };

  const handleFileChange = (e, fieldId) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size > 5 * 1024 * 1024) {
        alert("File is too large. Please select an image under 5MB.");
        e.target.value = "";
        return;
      }
      setFileData({
        ...fileData,
        [fieldId]: e.target.files[0]
      });
    }
  };

  const uploadFileToCloudinary = async (file) => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", CLOUDINARY_PRESET);

    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formDataUpload,
    });

    if (!res.ok) throw new Error("Failed to upload image. Please check your connection.");
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Custom Validation for Checkboxes
    if (event.formFields) {
      for (let field of event.formFields) {
        if (field.type === 'checkbox' && field.required && (!formData[field.id] || formData[field.id].length === 0)) {
          setError(`Please select at least one option for: ${field.label}`);
          return;
        }
      }
    }

    setSubmitting(true);
    setError(null);
    
    try {
      const uploadedFileUrls = {};
      for (const fieldId in fileData) {
        const file = fileData[fieldId];
        if (file) {
          const url = await uploadFileToCloudinary(file);
          uploadedFileUrls[fieldId] = url;
        }
      }

      const finalSubmissionData = {
        ...formData,
        ...uploadedFileUrls,
        eventId: eventId,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "registrations"), finalSubmissionData);
      setSuccess(true);
      
    } catch (err) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  if (loading) {
    return <div className="register-container"><div className="loader">Loading event details...</div></div>;
  }

  if (error && !event) {
    return (
      <div className="register-container">
        <div className="register-card error-card">
          <h2>Oops!</h2>
          <p>{error}</p>
          <Link to="/" className="btn-primary">Return to Home</Link>
        </div>
      </div>
    );
  }

  if (event.status && event.status !== "Registration Open") {
    return (
      <div className="register-container">
        <div className="register-card error-card">
          <h2>Registration Closed</h2>
          <p>Sorry, the registration for {event.title} is currently closed.</p>
          <Link to="/" className="btn-primary">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>{event.title}</h1>
          <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
          {event.description && <p className="event-desc">{event.description}</p>}
        </div>

        {success ? (
          <div className="success-message">
            <div className="success-icon">?</div>
            <h2>Registration Successful!</h2>
            <p>Thank you for registering for {event.title}. We look forward to seeing you there!</p>
            <Link to="/" className="btn-outline">Return to Home</Link>
          </div>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
            {error && <div className="error-banner">{error}</div>}
            
            {(!event.formFields || event.formFields.length === 0) && (
              <div style={{textAlign:'center', color:'var(--text-secondary)', padding:'20px 0'}}>
                This form has not been set up yet.
              </div>
            )}

            {/* 100% Dynamic Custom Fields & Visual Elements */}
            {event.formFields && event.formFields.map(field => (
              <div className="form-group" key={field.id} style={{marginBottom: field.type === 'checkbox' ? '15px' : '20px'}}>
                
                {/* VISUAL ELEMENTS */}
                {field.type === 'header' && (
                  <div className="form-section-header" style={{marginTop: '30px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px'}}>
                    <h3 style={{margin: '0 0 5px 0', color: 'var(--accent-color)'}}>{field.label}</h3>
                    {field.description && <p style={{margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)'}}>{field.description}</p>}
                  </div>
                )}

                {field.type === 'display_image' && (
                  <div className="form-display-image" style={{textAlign: 'center', marginBottom: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px'}}>
                    {field.label && <h4 style={{marginBottom: '15px'}}>{field.label}</h4>}
                    <img src={field.imageUrl} alt={field.label || "Form graphic"} style={{maxWidth: '100%', maxHeight: '400px', borderRadius: '8px'}} />
                  </div>
                )}


                {/* DATA COLLECTION INPUTS */}
                {field.type !== 'checkbox' && field.type !== 'header' && field.type !== 'display_image' && (
                  <label htmlFor={field.id} style={{marginBottom: '8px'}}>
                    {field.label} {field.required && <span style={{color:'red'}}>*</span>}
                  </label>
                )}
                
                {field.type === 'text' && (
                  <input type="text" id={field.id} placeholder={`Enter ${field.label}`} value={formData[field.id] || ''} onChange={(e) => handleTextChange(e, field.id)} required={field.required} />
                )}

                {field.type === 'paragraph' && (
                  <textarea id={field.id} placeholder={`Enter ${field.label}`} value={formData[field.id] || ''} onChange={(e) => handleTextChange(e, field.id)} required={field.required} rows="4" style={{width:'100%', padding:'12px', background:'rgba(0,0,0,0.3)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'6px', color:'white', fontFamily:'inherit'}} />
                )}

                {field.type === 'dropdown' && (
                  <select id={field.id} value={formData[field.id] || ''} onChange={(e) => handleTextChange(e, field.id)} required={field.required} style={{width:'100%', padding:'12px', background:'rgba(0,0,0,0.3)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'6px', color:'white', fontSize:'1rem'}}>
                    <option value="" disabled>Select an option</option>
                    {(field.options || []).map((opt, i) => (
                      <option key={i} value={opt} style={{background:'#111', color:'white'}}>{opt}</option>
                    ))}
                  </select>
                )}

                {field.type === 'checkbox' && (
                  <div style={{marginBottom: '10px'}}>
                    <label style={{marginBottom: '10px', display: 'block'}}>
                      {field.label} {field.required && <span style={{color:'red'}}>*</span>}
                    </label>
                    <div className="checkbox-group" style={{display:'flex', flexDirection:'column', gap:'10px', background:'rgba(0,0,0,0.2)', padding:'15px', borderRadius:'6px'}}>
                      {(field.options || []).map((opt, i) => (
                        <div key={i} style={{display:'flex', alignItems:'center', gap:'10px'}}>
                          <input 
                            type="checkbox" 
                            id={`${field.id}_${i}`} 
                            checked={(formData[field.id] || []).includes(opt)} 
                            onChange={(e) => handleCheckboxChange(e, field.id, opt)} 
                            style={{width:'auto', cursor:'pointer'}} 
                          />
                          <label htmlFor={`${field.id}_${i}`} style={{margin:0, cursor:'pointer', fontWeight:'normal'}}>
                            {opt}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {field.type === 'image' && (
                  <div className="file-upload-wrapper" style={{background: 'rgba(0,0,0,0.2)', border: '1px dashed rgba(255,255,255,0.2)', padding: '10px', borderRadius: '6px'}}>
                    <input type="file" id={field.id} accept="image/*" onChange={(e) => handleFileChange(e, field.id)} required={field.required} style={{color: 'var(--text-secondary)'}} />
                  </div>
                )}
              </div>
            ))}

            {event.formFields && event.formFields.length > 0 && (
              <button type="submit" className="btn-primary submit-btn" disabled={submitting} style={{marginTop:'10px'}}>
                {submitting ? 'Uploading & Submitting...' : 'Register Now'}
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;

