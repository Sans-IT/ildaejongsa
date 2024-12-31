import React, { useState } from 'react'; 
import './Gallery.css';

const programs = [
  { 
    name: 'Karate', 
    images: [
      { src: '../Assets/img1a.jpeg', description: 'Latihan dasar Karate dengan teknik pukulan.' },
      { src: '../Assets/img1b.jpeg', description: 'Demonstrasi tendangan tinggi Karate.' }
    ]
  },
  { 
    name: 'Muay Thai', 
    images: [
      { src: '../Assets/img2a.jpeg', description: 'Teknik serangan siku dalam Muay Thai.' },
      { src: '../Assets/img2b.jpg', description: 'Latihan tendangan lutut khas Muay Thai.' }
    ]
  },
  { 
    name: 'Krav Maga', 
    images: [
      { src: '../Assets/img3a.jpeg', description: 'Teknik melumpuhkan lawan dengan cepat.' },
      { src: '../Assets/img3b.jpg', description: 'Simulasi pertahanan dari serangan frontal.' }
    ]
  },
  { 
    name: 'Taekwondo', 
    images: [
      { src: '../Assets/img4a.jpeg', description: 'Pertandingan Taekwondo dengan tendangan cepat.' },
      { src: '../Assets/img4b.jpeg', description: 'Latihan keseimbangan dan fleksibilitas.' }
    ]
  },
  { 
    name: 'Gulat', 
    images: [
      { src: '../Assets/img5a.jpeg', description: 'Teknik grappling untuk melumpuhkan lawan.' },
      { src: '../Assets/img5b.jpeg', description: 'Latihan ketahanan fisik dalam gulat.' }
    ]
  },
  { 
    name: 'Boxing', 
    images: [
      { src: '../Assets/img6a.jpeg', description: 'Latihan pukulan kombinasi dalam tinju.' },
      { src: '../Assets/img6b.jpeg', description: 'Sparring dalam sesi latihan tinju.' }
    ]
  },
  { 
    name: 'Aikido', 
    images: [
      { src: '../Assets/img7a.jpeg', description: 'Penggunaan energi lawan untuk pertahanan diri.' },
      { src: '../Assets/img7b.jpeg', description: 'Latihan teknik lemparan dalam Aikido.' }
    ]
  },
  { 
    name: 'Wing Chun', 
    images: [
      { src: '../Assets/img8a.jpeg', description: 'Latihan serangan cepat jarak dekat.' },
      { src: '../Assets/img8b.jpeg', description: 'Latihan blokade dan pertahanan.' }
    ]
  }
];

const Gallery = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (program) => {
    setSelectedProgram(program);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProgram(null);
  };

  const goToNextImage = () => {
    if (selectedProgram) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % selectedProgram.images.length
      );
    }
  };

  const goToPrevImage = () => {
    if (selectedProgram) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + selectedProgram.images.length) % selectedProgram.images.length
      );
    }
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Gallery</h1>
      <div className="gallery">
        {programs.map((program, index) => (
          <div className="gallery-item" key={index} onClick={() => openModal(program)}>
            <img src={program.images[0].src} alt={program.name} />
            <p>{program.name}</p>
          </div>
        ))}
      </div>

      {selectedProgram && (
        <div className="modal gallery-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-container">
              <img
                src={selectedProgram.images[currentImageIndex].src}
                alt={selectedProgram.name}
              />
              <button className="carousel-button prev" onClick={goToPrevImage}>
                &#8249;
              </button>
              <button className="carousel-button next" onClick={goToNextImage}>
                &#8250;
              </button>
            </div>
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            <div className="modal-description">
              <p>{selectedProgram.images[currentImageIndex].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
