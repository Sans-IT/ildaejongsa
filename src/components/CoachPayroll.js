import React from "react";
import './CoachPayroll.css'; // Gaya untuk halaman Coach Payroll

const CoachPayroll = () => {
  return (
    <div className="coach-payroll-page">
      <h1>Riwayat Pembayaran Gaji Instruktur</h1>
      <table className="payroll-table">
        <thead>
          <tr>
            <th>Bulan</th>
            <th>Tanggal Pembayaran</th>
            <th>Jumlah Pembayaran</th>
            <th>Status Pembayaran</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Januari 2024</td>
            <td>01-01-2024</td>
            <td>Rp 5.000.000</td>
            <td>Berhasil</td>
          </tr>
          <tr>
            <td>Februari 2024</td>
            <td>01-02-2024</td>
            <td>Rp 5.000.000</td>
            <td>Berhasil</td>
          </tr>
          <tr>
            <td>Maret 2024</td>
            <td>01-03-2024</td>
            <td>Rp 5.000.000</td>
            <td>Gagal</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CoachPayroll;
