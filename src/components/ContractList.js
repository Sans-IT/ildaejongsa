import React, { useEffect, useState } from 'react';
import './ContractList.css';

function ContractList() {
  const [contractDetails, setContractDetails] = useState([]);

  useEffect(() => {
    const martialArt = localStorage.getItem('userContract') || 'Kyokushin Karate';
    const schedules = JSON.parse(localStorage.getItem('martialArtSchedules')) || {};
    const schedule = schedules[martialArt] || 'Belum ada jadwal';

    // Menambahkan masa aktif dan masa tenggang dari localStorage
    const activePeriod = localStorage.getItem('contractActivePeriod') || '1 Tahun';
    const gracePeriod = localStorage.getItem('contractGracePeriod') || '1 Bulan';

    setContractDetails([
      { title: 'Jenis Beladiri', value: martialArt },
      { title: 'Jadwal', value: schedule },
      { title: 'Masa Aktif', value: activePeriod },
      { title: 'Masa Tenggang', value: gracePeriod }
    ]);
  }, []);

  return (
    <div className="contract-list">
      <h1>Contract List</h1>
      {/* Bagian Kontrak Utama */}
      <div className="contract-details-section">
        <h2>Detail Kontrak Utama</h2>
        <ul>
          {contractDetails.map((detail, index) => (
            <li key={index}>
              <strong>{detail.title}:</strong> {detail.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContractList;
