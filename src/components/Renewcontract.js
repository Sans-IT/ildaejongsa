import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Renewcontract.css';

function RenewContract() {
  const [selectedMartialArt, setSelectedMartialArt] = useState('');
  const [renewalDuration, setRenewalDuration] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [customSchedule, setCustomSchedule] = useState('');
  const [useCustomSchedule, setUseCustomSchedule] = useState(false);
  const navigate = useNavigate();

  const martialArtOptions = {
    'Kyokushin Karate': 'Senin & Rabu 19:00-20:00',
    'Muay Thai': 'Selasa & Kamis 17:00-18:00',
    'Krav Maga': 'Sabtu & Minggu 15:00-17:00',
    'Taekwondo': 'Senin & Rabu 18:00-19:00',
    'Gulat': 'Selasa & Kamis 16:00-17:30',
    'Boxing': 'Senin & Jumat 17:00-18:30',
    'Aikido': 'Sabtu 13:00-15:00',
    'Wing Chun': 'Jumat 18:00-19:30',
  };

  const durationOptions = {
    '1 Bulan': 500000,
    '3 Bulan': 1400000,
    '6 Bulan': 2700000,
  };

  const paymentMethods = ['Transfer Bank', 'Kartu Kredit', 'E-Wallet'];

  const generateOtp = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setIsOtpSent(true);
    alert(`Kode OTP Anda adalah: ${generatedOtp}`);
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === otp) {
      setIsVerified(true);
      alert('Verifikasi berhasil! Silakan lanjutkan.');
    } else {
      alert('Kode OTP salah, silakan coba lagi.');
    }
  };

  const handleMartialArtChange = (e) => setSelectedMartialArt(e.target.value);
  const handleDurationChange = (e) => {
    const duration = e.target.value;
    setRenewalDuration(duration);
    setTotalCost(durationOptions[duration] || 0);
  };
  const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);
  const handleCustomScheduleChange = (e) => setCustomSchedule(e.target.value);
  const handleUseCustomScheduleToggle = (e) => setUseCustomSchedule(e.target.checked);

  const savePaymentHistory = (details) => {
    const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
    paymentHistory.push(details);
    localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMartialArt && renewalDuration && paymentMethod && isVerified) {
      const schedule = useCustomSchedule ? customSchedule : martialArtOptions[selectedMartialArt];
      const contractDetails = {
        martialArt: selectedMartialArt,
        duration: renewalDuration,
        cost: totalCost,
        schedule: schedule,
        paymentMethod: paymentMethod,
      };

      // Simpan ke localStorage untuk Contract List
      localStorage.setItem('contractDetails', JSON.stringify(contractDetails));

      // Simpan riwayat pembayaran
      const paymentDetails = {
        martialArt: selectedMartialArt,
        duration: renewalDuration,
        paymentMethod: paymentMethod,
        cost: totalCost,
        date: new Date().toLocaleString(),
      };
      savePaymentHistory(paymentDetails);

      alert(
        `Kontrak ${selectedMartialArt} diperpanjang selama ${renewalDuration} dengan biaya Rp${totalCost.toLocaleString()}.\nJadwal: ${schedule}\nMetode Pembayaran: ${paymentMethod}`
      );
      navigate('/contractlist');
    } else {
      alert('Silakan lengkapi semua informasi dan verifikasi kode OTP.');
    }
  };

  return (
    <div className="renew-contract">
      <h1>Perpanjang Kontrak</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="martialArt">Pilih Jenis Beladiri:</label>
        <select id="martialArt" value={selectedMartialArt} onChange={handleMartialArtChange} required>
          <option value="">-- Pilih Beladiri --</option>
          {Object.keys(martialArtOptions).map((art) => (
            <option key={art} value={art}>
              {art}
            </option>
          ))}
        </select>

        <label htmlFor="duration">Durasi Perpanjangan:</label>
        <select id="duration" value={renewalDuration} onChange={handleDurationChange} required>
          <option value="">-- Pilih Durasi --</option>
          {Object.keys(durationOptions).map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </select>

        <label htmlFor="paymentMethod">Metode Pembayaran:</label>
        <select id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange} required>
          <option value="">-- Pilih Metode Pembayaran --</option>
          {paymentMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>

        <div className="cost-summary">
          <p><strong>Biaya Total:</strong> Rp{totalCost.toLocaleString()}</p>
        </div>

        {!isOtpSent && <button type="button" className="otp-btn" onClick={generateOtp}>Kirim Kode OTP</button>}

        {isOtpSent && !isVerified && (
          <div className="otp-verification">
            <label htmlFor="otp">Masukkan Kode OTP:</label>
            <input type="text" id="otp" value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} required />
            <button type="button" onClick={handleVerifyOtp}>Verifikasi OTP</button>
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={!isVerified}>Perpanjang Kontrak</button>
      </form>
    </div>
  );
}

export default RenewContract;
  