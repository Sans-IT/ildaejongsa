// src/components/Program.js
import React from 'react';
import './Program.css';

const programs = [
  { 
    name: 'Kyokushin Karate', 
    description: 'Latihan bela diri yang fokus pada kekuatan fisik dan teknik pukulan yang keras.' 
  },
  { 
    name: 'Muay Thai', 
    description: 'Seni bela diri asal Thailand yang mengandalkan teknik pukulan, tendangan, siku, dan lutut.' 
  },
  { 
    name: 'Krav Maga', 
    description: 'Sistem bela diri yang berfokus pada pertahanan diri melawan serangan nyata dan situasi darurat.' 
  },
  { 
    name: 'Taekwondo', 
    description: 'Seni bela diri Korea yang terkenal dengan teknik tendangan tinggi dan kecepatan gerakannya.' 
  },
  { 
    name: 'Gulat', 
    description: 'Olahraga bela diri yang menekankan teknik pegang, guling, dan takedown.' 
  },
  { 
    name: 'Boxing', 
    description: 'Olahraga tinju yang fokus pada teknik pukulan tangan dan pertahanan dengan menggunakan sarung tangan.' 
  },
  { 
    name: 'Aikido', 
    description: 'Seni bela diri Jepang yang mengutamakan teknik pembalikan serangan dan penggunaan kekuatan lawan.' 
  },
  { 
    name: 'Wing Chun', 
    description: 'Sistem bela diri asal Cina yang fokus pada perkelahian jarak dekat dan teknik serangan cepat.' 
  },
];

const Program = () => {
  return (
    <div className="program-container">
      <h1>Program Kami</h1>
      <div className="programs">
        {programs.map((program, index) => (
          <div className="program-item" key={index}>
            <div className="program-inner">
              <div className="program-front">
                <h2>{program.name}</h2>
              </div>
              <div className="program-back">
                <p>{program.description}</p>
                <a href="/signup" className="more-info">Gabung sekarang</a> {/* Ubah ke elemen <a> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Program;
