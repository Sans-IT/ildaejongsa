import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
    return (
        <div className="privacy-policy-container">
            <h1>Kebijakan Privasi</h1>
            <p><strong>Terakhir diperbarui: [tanggal terkini]</strong></p>
            <section>
                <h2>1. Informasi yang Kami Kumpulkan</h2>
                <p>- Informasi Pribadi: Nama, alamat email, nomor telepon, dll.</p>
                <p>- Data Aktivitas: Alamat IP, jenis perangkat, dan aktivitas penelusuran.</p>
            </section>
            <section>
                <h2>2. Penggunaan Informasi</h2>
                <p>Kami menggunakan informasi Anda untuk layanan, pemberitahuan, dan keamanan.</p>
            </section>
            <section>
                <h2>3. Keamanan Data</h2>
                <p>Kami melindungi data Anda dari akses tidak sah dengan langkah teknis dan organisasi.</p>
            </section>
        </div>
    );
}

export default PrivacyPolicy;
