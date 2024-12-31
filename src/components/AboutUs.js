import React, { useEffect } from 'react';
import { FaMedal, FaUsers, FaTrophy, FaGlobe, FaQuestionCircle } from 'react-icons/fa';
import './AboutUs.css';
import historyImage from './assets/history.jpg';
import founderImage from './assets/founders.jpg';
import achievementImage from './assets/achievements.jpg';
import futureImage from './assets/future.jpg';

function AboutUs() {
    useEffect(() => {
        const fadeInElements = document.querySelectorAll('.fade-slide');
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        fadeInElements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="about-us-container">
            {/* About Section */}
            <section className="about-section fade-slide">
                <h1>Tentang IL DAE JONG SA</h1>
                <p>
                    IL DAE JONG SA adalah pusat seni bela diri yang memiliki misi dan visi untuk melatih generasi baru dalam mencapai kedisiplinan, kekuatan, dan kepercayaan diri melalui seni bela diri. Setiap hari, kami mendedikasikan diri untuk membantu individu mengeksplorasi dan mengasah potensi mereka.
                </p>
            </section>

            {/* History Section */}
            <section className="history-section fade-slide">
                <h2><FaUsers /> Sejarah Kami</h2>
                <div className="section-content">
                    <img src={historyImage} alt="Sejarah Kami" className="section-image" />
                    <p>
                        Didirikan pada tahun 1985 oleh sekumpulan praktisi seni bela diri berpengalaman, IL DAE JONG SA telah berkembang menjadi akademi terkemuka di Asia Tenggara. Dalam perjalanan kami, banyak tantangan yang kami hadapi, tetapi komitmen kami untuk terus membangun komunitas yang kuat tetap menjadi pilar utama kesuksesan kami.
                    </p>
                </div>
            </section>

            {/* Mission and Vision Section */}
            <section className="mission-vision-section fade-slide">
                <div className="mission">
                    <h2><FaMedal /> Misi Kami</h2>
                    <p>
                        Kami bertujuan untuk menumbuhkan individu yang tangguh dan berkarakter melalui pelatihan bela diri yang disiplin. Dengan menggabungkan pelatihan fisik dan mental, kami percaya bahwa setiap siswa memiliki kekuatan untuk menjadi versi terbaik dari diri mereka.
                    </p>
                </div>
                <div className="vision">
                    <h2><FaGlobe /> Visi Kami</h2>
                    <p>
                        Menjadi pusat seni bela diri yang tidak hanya unggul dalam keterampilan fisik, tetapi juga sebagai pemimpin dalam pembangunan karakter dan disiplin untuk generasi mendatang.
                    </p>
                </div>
            </section>

            {/* Founder Section */}
            <section className="founder-section fade-slide">
                <h2>Pendiri Kami</h2>
                <div className="section-content">
                    <img src={founderImage} alt="Para Pendiri" className="section-image" />
                    <p>
                        IL DAE JONG SA didirikan oleh Grandmaster Kim dan Master Lee, dua tokoh yang telah mendedikasikan hidup mereka pada seni bela diri. Mereka membawa pengalaman dan nilai-nilai yang membentuk dasar dari semua yang kami lakukan hari ini.
                    </p>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="achievements-section fade-slide">
                <h2><FaTrophy /> Pencapaian Kami</h2>
                <div className="section-content">
                    <img src={achievementImage} alt="Pencapaian Kami" className="section-image" />
                    <ul>
                        <li>
                            <strong>Lebih dari 2.000 lulusan sabuk hitam</strong> telah menjadi pelatih dan praktisi unggulan di komunitas lokal maupun internasional.
                        </li>
                        <li>
                            <strong>Pemenang Kompetisi Bela Diri Internasional</strong> meraih juara umum di turnamen bergengsi di Asia dan Eropa selama lima tahun berturut-turut.
                        </li>
                        <li>
                            <strong>Ekspansi global</strong> dengan membuka cabang di 10 negara, membawa seni bela diri tradisional ke komunitas internasional.
                        </li>
                        <li>
                            <strong>Penghargaan bergengsi</strong> termasuk "Best Martial Arts Academy" di Asia Tenggara selama tiga tahun terakhir.
                        </li>
                    </ul>
                </div>
            </section>

            {/* FAQs Section */}
            <section className="faqs-section fade-slide" aria-labelledby="faqs-header">
                <header>
                    <h2 id="faqs-header"><FaQuestionCircle /> Pertanyaan Umum</h2>
                </header>
                <div className="section-content">
                    <details>
                        <summary><FaQuestionCircle /> Apa itu IL DAE JONG SA?</summary>
                        <p>IL DAE JONG SA adalah pusat pelatihan seni bela diri yang mengajarkan seni bela diri Korea dengan fokus pada pengembangan fisik, mental, dan karakter para anggotanya.</p>
                    </details>
                    <details>
                        <summary><FaQuestionCircle /> Siapa yang bisa mengikuti kelas di IL DAE JONG SA?</summary>
                        <p>Kami menyambut semua level usia dan kemampuan. Dari anak-anak hingga orang dewasa, semua dapat belajar di IL DAE JONG SA.</p>
                    </details>
                    <details>
                        <summary><FaQuestionCircle /> Apakah saya perlu memiliki pengalaman sebelumnya?</summary>
                        <p>Tidak, tidak ada pengalaman sebelumnya yang diperlukan. Kelas kami dirancang untuk semua tingkatan, dari pemula hingga mahir.</p>
                    </details>
                    <details>
                        <summary><FaQuestionCircle /> Apa yang membedakan IL DAE JONG SA dari tempat pelatihan lainnya?</summary>
                        <p>IL DAE JONG SA berfokus pada pengembangan karakter dan kedisiplinan dalam setiap siswa, menggabungkan pelatihan fisik dan mental yang berorientasi pada pertumbuhan pribadi dan komunitas yang kuat.</p>
                    </details>
                </div>
            </section>

            {/* Future Section */}
            <section className="future-section fade-slide">
                <h2>Arah Masa Depan Kami</h2>
                <div className="section-content">
                    <img src={futureImage} alt="Arah Masa Depan" className="section-image" />
                    <p>
                        Ke depan, kami terus berkomitmen untuk meningkatkan standar pelatihan dengan berinovasi pada metode pengajaran dan meluncurkan program yang mendukung kesehatan mental serta kebugaran fisik. Kami ingin menjadi tempat di mana individu dapat menemukan kekuatan batin mereka dan berkembang.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;
