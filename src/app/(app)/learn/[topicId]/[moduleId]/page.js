'use client';

import { useState } from 'react';
import Link from 'next/link';
import OrbitSimulation from '@/components/effects/OrbitSimulation';
import Math from '@/components/ui/Math';
import { getUserStats, saveUserStats } from '@/lib/userStats';

export default function ModulePage() {
  const [activeTab, setActiveTab] = useState('rumus');
  const [activeSection, setActiveSection] = useState('eksentrisitas');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const handleSubmitQuiz = () => {
    setSubmittedQuiz(true);
    setShowResultModal(true);
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    if (activeTab !== 'rumus') {
      setActiveTab('rumus');
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  return (
    <div className="flex flex-col gap-lg max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
        <Link href="/learn" className="hover:text-secondary transition-colors">
          Mekanika Benda Langit
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-semibold">Hukum Kepler</span>
      </nav>

      {/* Module Title Header */}
      <header className="flex flex-col gap-md">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">
          Hukum Kepler I: Orbit Elips
        </h1>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
          <button
            onClick={() => setActiveTab('teori')}
            className={`px-4 py-2 flex items-center gap-2 rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'teori'
                ? 'bg-white/10 border-b-2 border-secondary text-primary font-bold'
                : 'hover:bg-white/5 text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span>Teori</span>
          </button>

          <button
            onClick={() => setActiveTab('rumus')}
            className={`px-4 py-2 flex items-center gap-2 rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'rumus'
                ? 'bg-white/10 border-b-2 border-secondary text-primary font-bold'
                : 'hover:bg-white/5 text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">architecture</span>
            <span>Rumus</span>
          </button>

          <button
            onClick={() => setActiveTab('contoh')}
            className={`px-4 py-2 flex items-center gap-2 rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'contoh'
                ? 'bg-white/10 border-b-2 border-secondary text-primary font-bold'
                : 'hover:bg-white/5 text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">science</span>
            <span>Contoh</span>
          </button>

          <button
            onClick={() => setActiveTab('kuis')}
            className={`px-4 py-2 flex items-center gap-2 rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'kuis'
                ? 'bg-white/10 border-b-2 border-secondary text-primary font-bold'
                : 'hover:bg-white/5 text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">help</span>
            <span>Kuis</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left: Content Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-lg">
          {/* TAB 1: TEORI */}
          {activeTab === 'teori' && (
            <div className="glass-panel rounded-xl p-md md:p-lg flex flex-col gap-lg">
              <p className="font-body-lg text-body-lg leading-relaxed text-on-surface">
                Hukum Kepler Pertama, yang juga dikenal sebagai Hukum Elips, menyatakan bahwa setiap planet bergerak mengelilingi Matahari dalam lintasan berbentuk elips, dengan Matahari berada di salah satu titik fokusnya. Ini merevolusi pemahaman kita tentang tata surya, menggantikan model lingkaran sempurna yang sebelumnya diyakini.
              </p>

              {/* Interactive Visual Simulation */}
              <div className="w-full h-80 md:h-[400px] rounded-xl bg-surface-container-lowest/80 border border-white/10 relative overflow-hidden shadow-xl">
                <OrbitSimulation semiMajorAxis={10} eccentricity={0.6} />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-surface-container-lowest/80 backdrop-blur rounded-full border border-white/10 text-xs text-on-surface-variant z-10 pointer-events-none">
                  <span>🌀 Simulasi Interaktif: Drag untuk memutar 3D</span>
                </div>
              </div>

              {/* Mathematical Equation Overview */}
              <div className="p-md bg-surface-container/40 rounded-lg border-l-4 border-secondary flex flex-col gap-sm">
                <h3 className="font-headline-md text-headline-md text-secondary font-bold">
                  Persamaan Geometri Elips
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Secara matematis, persamaan elips dalam koordinat Kartesius dengan titik pusat (0,0) adalah:
                </p>

                <div className="glass-card rounded-lg p-md text-center border border-white/10 my-2">
                  <Math math="\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1" block />
                </div>

                <div className="flex justify-between text-label-sm text-on-surface-variant px-4">
                  <span><Math math="a" /> : Sumbu semi-mayor</span>
                  <span><Math math="b" /> : Sumbu semi-minor</span>
                </div>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex justify-between items-center mt-4 border-t border-white/10 pt-4">
                <Link
                  href="/learn"
                  className="px-6 py-3 rounded-lg border border-outline text-on-surface hover:bg-white/5 transition-colors font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Sebelumnya</span>
                </Link>

                <button
                  onClick={() => setActiveTab('rumus')}
                  className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-label-sm text-label-sm uppercase tracking-widest hover:bg-secondary-fixed transition-all font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Selanjutnya (Rumus)</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: RUMUS */}
          {activeTab === 'rumus' && (
            <div className="glass-panel rounded-xl p-md md:p-lg flex flex-col gap-lg">
              {/* Section 1: Eksentrisitas */}
              <div id="eksentrisitas" className="flex flex-col gap-sm scroll-mt-28">
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold flex items-center gap-2">
                  <span>Eksentrisitas Orbit</span>
                  <span className="text-secondary font-mono">(<Math math="e" />)</span>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Eksentrisitas menentukan seberapa "lonjong" sebuah elips. Nilainya berkisar antara 0 (lingkaran sempurna) hingga kurang dari 1 (elips). Didefinisikan sebagai rasio jarak fokus ke pusat (<Math math="c" />) terhadap setengah sumbu mayor (<Math math="a" />).
                </p>

                <div className="glass-card rounded-lg p-md text-center border border-white/10 my-2 shadow-lg">
                  <Math math="e = \frac{c}{a}" block />
                </div>

                <ul className="list-disc list-inside space-y-2 font-body-md text-body-md text-on-surface-variant">
                  <li>
                    <strong className="text-primary"><Math math="e" /></strong>: Eksentrisitas (tanpa satuan, <Math math="0 \le e < 1" />)
                  </li>
                  <li>
                    <strong className="text-primary"><Math math="c" /></strong>: Jarak dari pusat elips ke fokus (titik api tempat matahari berada)
                  </li>
                  <li>
                    <strong className="text-primary"><Math math="a" /></strong>: Setengah sumbu mayor (semi-major axis)
                  </li>
                </ul>
              </div>

              <div className="h-[1px] w-full bg-white/10" />

              {/* Section 2: Hubungan Sumbu Mayor & Minor */}
              <div id="sumbu" className="flex flex-col gap-sm scroll-mt-28">
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold flex items-center gap-2">
                  <span>Hubungan Sumbu Mayor & Minor</span>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Panjang setengah sumbu minor (<Math math="b" />) dapat dihitung jika kita mengetahui setengah sumbu mayor (<Math math="a" />) dan eksentrisitas (<Math math="e" />). Ini diturunkan dari teorema Pythagoras pada segitiga yang terbentuk di dalam elips.
                </p>

                <div className="glass-card rounded-lg p-md text-center border border-white/10 my-2 shadow-lg">
                  <Math math="b = a \sqrt{1 - e^2}" block />
                </div>

                <ul className="list-disc list-inside space-y-2 font-body-md text-body-md text-on-surface-variant">
                  <li>
                    <strong className="text-primary"><Math math="b" /></strong>: Setengah sumbu minor (semi-minor axis)
                  </li>
                  <li>
                    Dapat juga ditulis sebagai: <Math math="c^2 = a^2 - b^2" />
                  </li>
                </ul>
              </div>

              <div className="h-[1px] w-full bg-white/10" />

              {/* Section 3: Persamaan Koordinat Polar */}
              <div id="polar" className="flex flex-col gap-sm scroll-mt-28">
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold flex items-center gap-2">
                  <span>Persamaan Orbit (Koordinat Polar)</span>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Untuk menentukan posisi planet pada orbitnya, seringkali lebih mudah menggunakan koordinat polar <Math math="(r, \theta)" /> dengan titik asal di salah satu fokus (Matahari).
                </p>

                <div className="glass-card rounded-lg p-md text-center border border-white/10 my-2 shadow-lg">
                  <Math math="r = \frac{a(1 - e^2)}{1 + e \cos \theta}" block />
                </div>

                <ul className="list-disc list-inside space-y-2 font-body-md text-body-md text-on-surface-variant">
                  <li>
                    <strong className="text-primary"><Math math="r" /></strong>: Jarak heliosentris (jarak planet ke matahari)
                  </li>
                  <li>
                    <strong className="text-primary"><Math math="\theta" /></strong>: Anomali sejati (true anomaly), sudut yang diukur dari perihelion
                  </li>
                </ul>
              </div>

              <div className="h-[1px] w-full bg-white/10" />

              {/* Section 4: Titik Ekstrem */}
              <div id="titik" className="flex flex-col gap-sm scroll-mt-28">
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold flex items-center gap-2">
                  <span>Titik Ekstrem (Perihelion & Aphelion)</span>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Titik terdekat dan terjauh planet dari Matahari dihitung saat anomali sejati $\theta = 0^\circ$ dan $\theta = 180^\circ$.
                </p>

                <ul className="list-disc list-inside space-y-2 font-body-md text-body-md text-on-surface-variant">
                  <li>
                    Saat <Math math="\theta = 0" /> (Perihelion): <Math math="r_{\text{min}} = a(1 - e)" />
                  </li>
                  <li>
                    Saat <Math math="\theta = \pi" /> (Aphelion): <Math math="r_{\text{max}} = a(1 + e)" />
                  </li>
                </ul>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-4 border-t border-white/10 pt-4">
                <button
                  onClick={() => setActiveTab('teori')}
                  className="px-6 py-3 rounded-lg border border-outline text-on-surface hover:bg-white/5 transition-colors font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Sebelumnya (Teori)</span>
                </button>

                <button
                  onClick={() => setActiveTab('contoh')}
                  className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-label-sm text-label-sm uppercase tracking-widest hover:bg-secondary-fixed transition-all font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Selanjutnya (Contoh)</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CONTOH SOAL & PEMBAHASAN */}
          {activeTab === 'contoh' && (
            <div className="glass-panel rounded-xl p-md md:p-lg flex flex-col gap-lg">
              <h2 className="font-headline-md text-headline-md text-primary font-bold border-b border-outline-variant/30 pb-2">
                Contoh Soal & Pembahasan
              </h2>

              {/* Contoh 1 */}
              <div className="glass-card rounded-xl p-md flex flex-col gap-md border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary-container text-primary font-code-md text-xs border border-primary/20">
                    Contoh 1
                  </span>
                  <h3 className="font-body-lg text-body-lg font-semibold text-white">
                    Menghitung Perihelion & Aphelion Asteroid
                  </h3>
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant">
                  Sebuah asteroid memiliki setengah sumbu mayor <Math math="a = 2.5\text{ AU}" /> dan eksentrisitas <Math math="e = 0.4" />. Hitunglah jarak perihelion (<Math math="r_{\text{min}}" />) dan aphelion (<Math math="r_{\text{max}}" />) asteroid tersebut.
                </p>

                <div className="p-md bg-surface-container/60 rounded-lg border-l-4 border-accent_cyan flex flex-col gap-sm">
                  <h4 className="font-label-sm text-label-sm text-accent_cyan uppercase tracking-wider font-bold">
                    Pembahasan Langkah demi Langkah:
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface flex items-center gap-2">
                    <strong>1. Rumus Perihelion:</strong> <Math math="r_{\text{min}} = a(1 - e)" />
                  </p>
                  <div className="bg-black/40 p-3 rounded text-center">
                    <Math math="r_{\text{min}} = 2.5 \times (1 - 0.4) = 2.5 \times 0.6 = 1.5\text{ AU}" block />
                  </div>

                  <p className="font-body-md text-body-md text-on-surface mt-2 flex items-center gap-2">
                    <strong>2. Rumus Aphelion:</strong> <Math math="r_{\text{max}} = a(1 + e)" />
                  </p>
                  <div className="bg-black/40 p-3 rounded text-center">
                    <Math math="r_{\text{max}} = 2.5 \times (1 + 0.4) = 2.5 \times 1.4 = 3.5\text{ AU}" block />
                  </div>
                </div>
              </div>

              {/* Contoh 2 */}
              <div className="glass-card rounded-xl p-md flex flex-col gap-md border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-secondary-container text-secondary font-code-md text-xs border border-secondary/20">
                    Contoh 2
                  </span>
                  <h3 className="font-body-lg text-body-lg font-semibold text-white">
                    Menentukan Eksentrisitas Komet
                  </h3>
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant">
                  Jika jarak perihelion sebuah komet adalah <Math math="0.6\text{ AU}" /> dan jarak aphelion-nya adalah <Math math="17.4\text{ AU}" />, berapakah eksentrisitas orbit komet tersebut?
                </p>

                <div className="p-md bg-surface-container/60 rounded-lg border-l-4 border-accent_green flex flex-col gap-sm">
                  <h4 className="font-label-sm text-label-sm text-accent_green uppercase tracking-wider font-bold">
                    Pembahasan Langkah demi Langkah:
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface flex items-center gap-2">
                    <strong>1. Sumbu Semi-Mayor (a):</strong> <Math math="a = \frac{r_{\text{min}} + r_{\text{max}}}{2}" />
                  </p>
                  <div className="bg-black/40 p-3 rounded text-center">
                    <Math math="a = \frac{0.6 + 17.4}{2} = \frac{18.0}{2} = 9.0\text{ AU}" block />
                  </div>

                  <p className="font-body-md text-body-md text-on-surface mt-2 flex items-center gap-2">
                    <strong>2. Menghitung Eksentrisitas (e):</strong> <Math math="e = \frac{r_{\text{max}} - r_{\text{min}}}{2a}" />
                  </p>
                  <div className="bg-black/40 p-3 rounded text-center">
                    <Math math="e = \frac{17.4 - 0.6}{18.0} = \frac{16.8}{18.0} \approx 0.933" block />
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-4 border-t border-white/10 pt-4">
                <button
                  onClick={() => setActiveTab('rumus')}
                  className="px-6 py-3 rounded-lg border border-outline text-on-surface hover:bg-white/5 transition-colors font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Sebelumnya (Rumus)</span>
                </button>

                <button
                  onClick={() => setActiveTab('kuis')}
                  className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-label-sm text-label-sm uppercase tracking-widest hover:bg-secondary-fixed transition-all font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Selanjutnya (Kuis)</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: KUIS INTERAKTIF */}
          {activeTab === 'kuis' && (
            <div className="glass-panel rounded-xl p-md md:p-lg flex flex-col gap-lg">
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                <h2 className="font-headline-md text-headline-md text-primary font-bold">
                  Kuis Uji Pemahaman: Hukum Kepler I
                </h2>
                <span className="px-3 py-1 rounded-full bg-secondary-container text-secondary font-code-md text-xs">
                  2 Pertanyaan
                </span>
              </div>

              {/* Pertanyaan 1 */}
              <div className="glass-card rounded-xl p-md flex flex-col gap-md border border-white/10">
                <h3 className="font-body-lg text-body-lg font-semibold text-white flex items-center gap-2 flex-wrap">
                  1. Sebuah planet mengorbit bintang induk dengan eksentrisitas <Math math="e = 0" />. Jika setengah sumbu mayor <Math math="a = 1.0\text{ AU}" />, manakah pernyataan yang benar?
                </h3>

                <div className="grid grid-cols-1 gap-sm">
                  {[
                    'Orbitnya berbentuk lingkaran sempurna (r_min = r_max = 1.0 AU)',
                    'Bintang induk berada tepat di titik aphelion',
                    'Jarak perihelion planet adalah 0 AU',
                    'Orbit planet berbentuk garis lurus',
                  ].map((opt, idx) => {
                    const isSelected = quizAnswers['q1'] === idx;
                    const isCorrect = idx === 0;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect('q1', idx)}
                        className={`p-3 rounded-lg text-left font-body-md text-body-md flex items-center gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? submittedQuiz
                              ? isCorrect
                                ? 'bg-green-950/60 border-2 border-green-500 text-green-200'
                                : 'bg-red-950/60 border-2 border-red-500 text-red-200'
                              : 'bg-secondary-container/60 border-2 border-secondary text-white'
                            : 'bg-surface-container/40 border border-white/10 text-on-surface-variant hover:bg-white/5'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pertanyaan 2 */}
              <div className="glass-card rounded-xl p-md flex flex-col gap-md border border-white/10">
                <h3 className="font-body-lg text-body-lg font-semibold text-white flex items-center gap-2 flex-wrap">
                  2. Manakah persamaan koordinat polar yang menggambarkan jarak heliosentris <Math math="r" /> terhadap anomali sejati <Math math="\theta" />?
                </h3>

                <div className="grid grid-cols-1 gap-sm">
                  {[
                    'r = a(1 - e²) / (1 + e cos θ)',
                    'r = a / (1 - e sin θ)',
                    'r = a(1 + e cos θ)',
                    'r = b √(1 - e²)',
                  ].map((opt, idx) => {
                    const isSelected = quizAnswers['q2'] === idx;
                    const isCorrect = idx === 0;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect('q2', idx)}
                        className={`p-3 rounded-lg text-left font-body-md text-body-md flex items-center gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? submittedQuiz
                              ? isCorrect
                                ? 'bg-green-950/60 border-2 border-green-500 text-green-200'
                                : 'bg-red-950/60 border-2 border-red-500 text-red-200'
                              : 'bg-secondary-container/60 border-2 border-secondary text-white'
                            : 'bg-surface-container/40 border border-white/10 text-on-surface-variant hover:bg-white/5'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit & Reset Button */}
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(quizAnswers).length === 0 || submittedQuiz}
                  className="bg-accent_gold text-black font-bold px-6 py-3 rounded-lg uppercase tracking-wider hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {submittedQuiz ? 'Sudah Dikumpulkan' : 'Submit Jawaban'}
                </button>

                {submittedQuiz && (
                  <button
                    onClick={() => setShowResultModal(true)}
                    className="text-accent_green font-bold text-body-md underline hover:text-green-400 transition-colors cursor-pointer"
                  >
                    Lihat Hasil Kuis
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Table of Contents & Constants Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-md">
          {/* Daftar Isi Card */}
          <div className="sticky top-24 glass-panel rounded-xl p-md flex flex-col gap-md">
            <h3 className="font-headline-md text-headline-md text-primary font-bold border-b border-outline-variant/30 pb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
              <span>Daftar Isi</span>
            </h3>

            <ul className="space-y-2 font-code-md text-code-md">
              <li>
                <button
                  onClick={() => handleSectionClick('eksentrisitas')}
                  className={`w-full text-left pl-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeSection === 'eksentrisitas'
                      ? 'text-secondary border-l-2 border-secondary bg-white/5 font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Eksentrisitas Orbit
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('sumbu')}
                  className={`w-full text-left pl-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeSection === 'sumbu'
                      ? 'text-secondary border-l-2 border-secondary bg-white/5 font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Hubungan Sumbu Mayor & Minor
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('polar')}
                  className={`w-full text-left pl-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeSection === 'polar'
                      ? 'text-secondary border-l-2 border-secondary bg-white/5 font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Persamaan Koordinat Polar
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('titik')}
                  className={`w-full text-left pl-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeSection === 'titik'
                      ? 'text-secondary border-l-2 border-secondary bg-white/5 font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Titik Ekstrem (Perihelion/Aphelion)
                </button>
              </li>
            </ul>

            {/* Konstanta Terkait Card */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-sm">
              <h4 className="font-headline-md text-headline-md text-secondary font-bold flex items-center gap-2">
                <span>Σ</span>
                <span>Konstanta Terkait</span>
              </h4>

              {/* Box 1 */}
              <div className="glass-card rounded-lg p-3 flex flex-col gap-1 border border-white/10">
                <span className="font-code-md text-xs text-primary font-semibold">
                  Satuan Astronomi (SA / AU)
                </span>
                <div className="my-1">
                  <Math math="1\text{ AU} \approx 1.496 \times 10^{11}\text{ m}" />
                </div>
                <span className="font-label-sm text-[11px] text-on-surface-variant flex items-center gap-1">
                  Sumbu mayor bumi (<Math math="a_{\text{bumi}}" />)
                </span>
              </div>

              {/* Box 2 */}
              <div className="glass-card rounded-lg p-3 flex flex-col gap-1 border border-white/10">
                <span className="font-code-md text-xs text-primary font-semibold">
                  Eksentrisitas Bumi
                </span>
                <div className="my-1">
                  <Math math="e_{\text{bumi}} \approx 0.0167" />
                </div>
                <span className="font-label-sm text-[11px] text-on-surface-variant">
                  Sangat mendekati lingkaran
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result Modal Overlay */}
      {showResultModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowResultModal(false)} />
          <div className="relative bg-surface-container border border-accent_cyan/30 rounded-3xl p-6 md:p-10 max-w-lg w-full shadow-[0_0_50px_rgba(0,255,255,0.15)] animate-in zoom-in-95 duration-500 flex flex-col items-center text-center">
            
            {/* Sparkles Decoration */}
            <div className="absolute -top-6 -right-6 text-accent_gold animate-pulse text-4xl">✨</div>
            <div className="absolute -bottom-4 -left-4 text-accent_cyan animate-pulse text-3xl delay-150">🌟</div>

            <div className="w-24 h-24 rounded-full bg-accent_green/20 flex items-center justify-center border-2 border-accent_green shadow-[0_0_30px_rgba(74,222,128,0.4)] mb-6">
              <span className="material-symbols-outlined text-5xl text-accent_green">
                workspace_premium
              </span>
            </div>

            <h2 className="font-headline-lg text-headline-lg font-extrabold text-white tracking-tight mb-2">
              Kuis Selesai!
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Selamat! Anda telah menyelesaikan kuis pemahaman modul <strong>Hukum Kepler I</strong>.
            </p>

            <div className="w-full bg-surface-container-lowest border border-white/10 rounded-2xl p-6 mb-8 flex flex-col items-center">
              <span className="font-code-md text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-2">
                Skor Akhir
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-6xl font-black text-accent_cyan">
                  {(quizAnswers['q1'] === 0 ? 50 : 0) + (quizAnswers['q2'] === 0 ? 50 : 0)}
                </span>
                <span className="font-headline-md text-2xl text-on-surface-variant font-bold">/100</span>
              </div>
            </div>

            <button
              onClick={() => setShowResultModal(false)}
              className="w-full py-4 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-bold font-headline-md hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(201,191,253,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">school</span>
              <span>Lanjut Belajar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
