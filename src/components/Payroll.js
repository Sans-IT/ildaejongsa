import React, { useEffect, useState } from 'react';
import './Payroll.css';

function Payroll() {
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    // Simulasi pengambilan data riwayat pembayaran dari localStorage atau API
    const storedHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
    setPaymentHistory(storedHistory);
  }, []);

  return (
    <div className="payroll">
      <h1>Riwayat Pembayaran</h1>
      {paymentHistory.length > 0 ? (
        <ul>
          {paymentHistory.map((payment, index) => (
            <li key={index}>
              <p><strong>Jenis Beladiri:</strong> {payment.martialArt}</p>
              <p><strong>Durasi:</strong> {payment.duration}</p>
              <p><strong>Status:</strong> {payment.status}</p>
              <p><strong>Jumlah:</strong> Rp{payment.amount.toLocaleString()}</p>
              <p><strong>Tanggal:</strong> {payment.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Belum ada riwayat pembayaran.</p>
      )}
    </div>
  );
}

export default Payroll;
