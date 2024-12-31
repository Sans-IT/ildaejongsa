import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    useEffect(() => {
        const fadeInElements = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        fadeInElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleScrollToPrograms = () => {
        const programsSection = document.getElementById('program-highlights');
        if (programsSection) {
            programsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="home-hero-section fade-in">
                <div className="hero-content">
                    <div className="hero-left">
                        <h1>Bangkitkan Potensi dengan Seni Bela Diri</h1>
                        <p>
                            Temukan perjalanan disiplin, fokus, dan kekuatan.
                            Program pelatihan kami membantu Anda mencapai potensi fisik dan mental terbaik.
                        </p>
                        <button className="cta-button" onClick={handleScrollToPrograms}>
                            Gabung Sekarang
                        </button>
                    </div>
                    <div className="hero-right">
                        <img src="/Assets/BGG.jpg" alt="Seni Bela Diri" className="hero-image" />
                    </div>
                </div>
            </section>

            {/* About Us */}
            <section className="about-highlight fade-in">
                <h2>Tentang Kami</h2>
                <p>
                    IL DAE JONG SA adalah tempat untuk membangun disiplin, fokus, dan kekuatan
                    melalui pelatihan seni bela diri.
                </p>
                <Link to="/about-us" className="learn-more-button">
                    Pelajari Lebih Lanjut
                </Link>
            </section>

            {/* Program Highlights */}
            <section id="program-highlights" className="program-highlights fade-in">
                <h2 className="programs-title">Program Kami</h2>
                <div className="program-cards">
                    <Link to="/program" className="program-card">
                        <h3>Program Pemula</h3>
                        <p>
                            Mulai belajar dasar-dasar seni bela diri dan kembangkan disiplin diri Anda.
                        </p>
                    </Link>
                    <Link to="/program" className="program-card">
                        <h3>Latihan Lanjutan</h3>
                        <p>
                            Tingkatkan kemampuan Anda dengan pelatihan intensif di tingkat lanjut.
                        </p>
                    </Link>
                    <Link to="/program" className="program-card">
                        <h3>Kebugaran & Kondisi</h3>
                        <p>
                            Tingkatkan kebugaran dan kekuatan fisik untuk kesehatan dan seni bela diri.
                        </p>
                    </Link>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonial-section fade-in">
                <h2>Apa Kata Mereka</h2>
                <blockquote>
                    "IL DAE JONG SA benar-benar mengubah hidup saya. Saya merasa lebih kuat secara mental dan fisik."
                    <span>- Sarah, Peserta</span>
                </blockquote>
                <blockquote>
                    "Mengajar di sini selama 5 tahun telah memberikan pengalaman yang luar biasa.
                    Melihat orang-orang tetap semangat belajar seni bela diri sangat memotivasi saya."
                    <span>- Mark, Pelatih Krav Maga</span>
                </blockquote>
            </section>

            {/* Call to Action Section */}
            <section className="cta-highlight fade-in">
                <h2>Siap Memulai?</h2>
                <p>
                    Gabung sekarang dan rasakan manfaat seni bela diri dalam hidup Anda!
                </p>
                <Link to="/program" className="cta-button">
                    Daftar Sekarang
                </Link>
            </section>

            {/* Footer */}
            <footer className="footer fade-in">
                <div className="footer-container">
                    <p>&copy; {new Date().getFullYear()} IL DAE JONG SA. Semua Hak Dilindungi.</p>
                    <div className="footer-links">
                        <Link to="/privacy-policy">Kebijakan Privasi</Link>
                        <Link to="/terms-of-service">Syarat & Ketentuan</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
