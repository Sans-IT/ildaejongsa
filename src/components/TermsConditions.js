import React from 'react';
import './TermsConditions.css';

function TermsConditions() {
    return (
        <div className="terms-conditions-container">
            <h1>Syarat & Ketentuan</h1>
            <p><strong>Terakhir diperbarui: [tanggal terkini]</strong></p>
            <section>
                <h2>1. Penggunaan Situs</h2>
                <p>- Gunakan situs ini secara sah dan sesuai aturan.</p>
                <p>- Konten hanya untuk penggunaan pribadi dan non-komersial.</p>
            </section>
            <section>
                <h2>2. Hak Kekayaan Intelektual</h2>
                <p>- Semua konten dilindungi hak cipta. Tidak boleh disalin tanpa izin.</p>
            </section>
            <section>
                <h2>3. Batas Tanggung Jawab</h2>
                <p>- Kami tidak bertanggung jawab atas kerusakan akibat penggunaan situs.</p>
            </section>
        </div>
    );
}

export default TermsConditions;
