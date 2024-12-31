import React, { useRef, useState } from "react";
import './Profilecoach.css'; // Gaya untuk laman instruktur

const ProfileCoach = () => {
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleProfilePicClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Membuka input file ketika gambar diklik
    }
  };

  return (
    <div className="profile-coach-page">
      <div className="profile-container">
        <h1 className="profile-header">Profil Instruktur</h1>
        
        {/* Foto Profil */}
        <div className="profile-pic-section">
          <div className="profile-pic-wrapper" onClick={handleProfilePicClick}>
            <img
              src={profilePic || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="profile-pic-input"
          />
        </div>
        
        {/* Info Pribadi */}
        <div className="profile-info">
          <h2 className="section-title">Informasi Pribadi</h2>
          <p className="info-item"><strong>Nama:</strong> [Nama Instruktur]</p>
          <p className="info-item">
            <strong>Email:</strong>{" "}
            <a href="mailto:maikelstwan@gmail.com" className="info-link">maikelstwan@gmail.com</a>
          </p>
          <p className="info-item">
            <strong>Nomor Telepon:</strong>{" "}
            <a href="tel:+6281234567890" className="info-link">+62 812-3456-7890</a>
          </p>
          
          {/* Keahlian Beladiri */}
          <p className="info-item">
            <strong>Keahlian Beladiri:</strong> Kyokushin Karate
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCoach;
