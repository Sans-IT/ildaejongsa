import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Tambahkan ini
import './Profile.css';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [language, setLanguage] = useState('id');
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    status: "Anggota Aktif",
    contract: "Kyokushin Karate",
    profilePic: "https://via.placeholder.com/120"
  });

  const [preview, setPreview] = useState(null);
  const navigate = useNavigate(); // Inisialisasi navigasi

  const translations = {
    id: {
      editProfile: "Sunting Profil",
      saveChanges: "Simpan Perubahan",
      name: "Nama",
      email: "Email",
      phone: "Telepon",
      status: "Status",
      martialArtsContract: "Kontrak Beladiri",
      viewDetails: "Lihat Detail"
    },
    en: {
      editProfile: "Edit Profile",
      saveChanges: "Save Changes",
      name: "Name",
      email: "Email",
      phone: "Phone",
      status: "Status",
      martialArtsContract: "Martial Arts Contract",
      viewDetails: "View Details"
    },
  };

  // Fungsi untuk mengambil data profil dari backend
  const fetchProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Jika ada token autentikasi, pastikan ditambahkan di sini
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUserInfo({
          ...data, // Sesuaikan struktur data dengan respons API
        });
      } else {
        console.error('Error fetching profile:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fungsi untuk memperbarui data profil
  const updateProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (response.ok) {
        setIsEditing(false); // Kembali ke mode tampilan setelah menyimpan
      } else {
        console.error('Error updating profile:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchProfile(); // Ambil data profil saat pertama kali komponen dimuat
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // Fungsi navigasi ke Contract List
  const handleViewDetails = () => {
    navigate('/contractlist');
  };

  return (
    <div className="profile">
      <div className="language-switcher">
        <label>
          Pilih Bahasa: 
          <select value={language} onChange={handleLanguageChange}>
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </label>
      </div>
      <div className="profile-section">
        <div className="profile-pic-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            id="profilePicInput"
            className="profile-pic-input"
          />
          <img
            src={preview || userInfo.profilePic}
            alt="Profile"
            className="profile-pic"
            onClick={() => document.getElementById('profilePicInput').click()}
          />
        </div>

        <div className="profile-info">
          <h2>{userInfo.name}</h2>
          <p>{translations[language].status}: {userInfo.status}</p>
          <p>{translations[language].email}: {userInfo.email}</p>
          <p>{translations[language].phone}: {userInfo.phone}</p>
          <p>
            <strong>{translations[language].martialArtsContract}:</strong> {userInfo.contract}
            <button className="detail-button" onClick={handleViewDetails}>
              {translations[language].viewDetails}
            </button>
          </p>
        </div>

        {!isEditing && (
          <button className="edit-button-top" onClick={handleEditToggle}>
            {translations[language].editProfile}
          </button>
        )}

        {isEditing && (
          <div className="edit-container">
            <div className="edit-form">
              <label>{translations[language].name}</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
              />
              <label>{translations[language].email}</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />
              <label>{translations[language].phone}</label>
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
              />
              <button className="save-button" onClick={updateProfile}>
                {translations[language].saveChanges}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
