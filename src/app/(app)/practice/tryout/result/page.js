'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TryoutResultPage() {
  const [scores, setScores] = useState({
    Mekanika: 0,
    Astrofisika: 0,
    BolaLangit: 0,
    TataSurya: 0,
    Instrumen: 0,
  });

  const [totalScore, setTotalScore] = useState(0);
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    const savedScores = localStorage.getItem('astrolearn-tryout-scores');
    if (savedScores) {
      try {
        const parsed = JSON.parse(savedScores);
        setScores({
          Mekanika: parsed.Mekanika ?? 0,
          Astrofisika: parsed.Astrofisika ?? 0,
          BolaLangit: parsed.BolaLangit ?? 0,
          TataSurya: parsed.TataSurya ?? 0,
          Instrumen: parsed.Instrumen ?? 0,
        });
        if (parsed.totalScore !== undefined) {
          setTotalScore(parsed.totalScore);
        }
        setHasAttempted(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Compute SVG Radar Chart 5-vertex polygon points
  const cx = 200;
  const cy = 200;
  const maxR = 135;

  const getCoords = (percent, angleDeg) => {
    const rad = (angleDeg * Math.PI) / 180;
    const r = Math.max(2, (percent / 100) * maxR);
    const x = cx + r * Math.cos(rad);
    const y = cy + r * Math.sin(rad);
    return { x, y };
  };

  const p0 = getCoords(scores.Mekanika, -90); // Top: Mekanika
  const p1 = getCoords(scores.Astrofisika, -18); // Top Right: Astrofisika
  const p2 = getCoords(scores.BolaLangit, 54); // Bottom Right: Bola Langit
  const p3 = getCoords(scores.TataSurya, 126); // Bottom Left: Tata Surya
  const p4 = getCoords(scores.Instrumen, 198); // Top Left: Instrumen

  const polygonPoints = `${p0.x.toFixed(1)},${p0.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)} ${p4.x.toFixed(1)},${p4.y.toFixed(1)}`;

  // Category Metadata for Recommendations
  const allCategories = [
    {
      key: 'Instrumen',
      icon: 'telescope',
      label: 'Instrumen & Observasi',
      desc: 'Daya Pisah Rayleigh, Pembesaran, CCD Noise, Mass Air',
      link: '/learn/instrumen/teleskop',
      linkText: 'Pelajari Modul Teleskop & Detektor',
    },
    {
      key: 'BolaLangit',
      icon: 'language',
      label: 'Astronomi Bola',
      desc: 'Jarak Zenit, Waktu Sideris, Ekuator Langit, Presepsi',
      link: '/learn/astronomi-bola/koordinat',
      linkText: 'Pelajari Modul Tata Koordinat',
    },
    {
      key: 'Mekanika',
      icon: 'auto_awesome',
      label: 'Mekanika Orbit',
      desc: 'Hukum Kepler III, Orbit Transfer Hohmann, Batas Roche',
      link: '/learn/mekanika/kepler',
      linkText: 'Pelajari Modul Hukum Kepler',
    },
    {
      key: 'Astrofisika',
      icon: 'star',
      label: 'Astrofisika & Fotometri',
      desc: 'Magnitudo, Modulus Jarak, Radiasi Benda Hitam, Redshift',
      link: '/learn/astrofisika/fotometri',
      linkText: 'Pelajari Modul Fotometri Bintang',
    },
    {
      key: 'TataSurya',
      icon: 'public',
      label: 'Tata Surya & Keplanetan',
      desc: 'Periode Sinodis/Sideris, Albedo Bond, Pasang Surut',
      link: '/learn/tata-surya/planet',
      linkText: 'Pelajari Modul Sistem Keplanetan',
    },
  ];

  // Sort categories by score ascending to identify areas for improvement
  const sortedWeakness = [...allCategories].sort(
    (a, b) => (scores[a.key] ?? 0) - (scores[b.key] ?? 0)
  );

  const primaryWeak = sortedWeakness[0];
  const weakList = sortedWeakness.filter((c) => (scores[c.key] ?? 0) < 80);

  return (
    <div className="flex flex-col gap-lg max-w-7xl mx-auto">
      {/* Back Link & Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div>
          <Link
            href="/practice"
            className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors mb-2 font-code-md text-xs uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Kembali ke Tryout</span>
          </Link>
          <h1 className="font-headline-lg text-display-lg text-white font-bold tracking-tight mb-1">
            Hasil Ujian & Kuis Astronomi
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Evaluasi kemampuan Anda berdasarkan hasil pengerjaan soal ujian terbaru.
          </p>
        </div>

        <Link
          href="/practice/tryout/review/1"
          className="px-6 py-3 rounded-xl bg-secondary text-on-secondary font-headline-md text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(201,191,253,0.4)] flex items-center gap-2 cursor-pointer border border-white/20"
        >
          <span className="material-symbols-outlined text-lg">menu_book</span>
          <span>Lihat Pembahasan Lengkap</span>
        </Link>
      </div>

      {/* Status Alert Banner */}
      {!hasAttempted && (
        <div className="glass-panel p-4 rounded-xl border border-secondary/30 bg-secondary-container/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-2xl">info</span>
            <span className="font-body-md text-sm text-on-surface">
              Grafik di bawah merupakan simulasi analisis. Selesaikan pengerjaan <strong>Tryout Arena</strong> untuk mendeteksi grafik pemahaman asli Anda secara otomatis.
            </span>
          </div>
          <Link
            href="/practice/tryout"
            className="px-4 py-2 rounded-lg bg-secondary text-on-secondary font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex-shrink-0"
          >
            Mulai Tryout
          </Link>
        </div>
      )}

      {/* 3 Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        {/* Card 1: Total Skor */}
        <div className="glass-panel rounded-xl p-md flex flex-col justify-between relative overflow-hidden border border-accent_cyan/30 shadow-[0_0_20px_rgba(0,255,255,0.15)]">
          <div className="absolute top-0 right-0 p-sm text-primary/10 pointer-events-none">
            <span className="material-symbols-outlined text-7xl">military_tech</span>
          </div>
          <div className="relative z-10">
            <h3 className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
              Total Skor Hasil Ujian
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="font-display-lg text-display-lg text-primary font-bold">
                {totalScore}
              </span>
              <span className="font-headline-md text-headline-md text-on-surface-variant font-bold">/100</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-accent_green font-code-md text-xs font-semibold">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>Terdeteksi Otomatis dari Jawaban Soal</span>
            </div>
          </div>
        </div>

        {/* Card 2: Peringkat Nasional */}
        <div className="glass-panel rounded-xl p-md flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-xl">
          <div className="absolute top-0 right-0 p-sm text-primary/10 pointer-events-none">
            <span className="material-symbols-outlined text-7xl">group</span>
          </div>
          <div className="relative z-10">
            <h3 className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
              Peringkat Nasional
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="font-display-lg text-display-lg text-secondary font-bold">
                #{Math.max(1, Math.round(340 * (1 - totalScore / 100)))}
              </span>
              <span className="font-headline-md text-headline-md text-on-surface-variant font-bold">/340</span>
            </div>
            <div className="mt-3 font-code-md text-xs text-on-surface-variant">
              Top {Math.max(1, Math.round(100 - totalScore))}% Peserta Nasional
            </div>
          </div>
        </div>

        {/* Card 3: Waktu Pengerjaan */}
        <div className="glass-panel rounded-xl p-md flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-xl">
          <div className="absolute top-0 right-0 p-sm text-primary/10 pointer-events-none">
            <span className="material-symbols-outlined text-7xl">timer</span>
          </div>
          <div className="relative z-10">
            <h3 className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
              Waktu Pengerjaan
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="font-code-md text-headline-lg text-white font-bold tracking-wider">
                01:36:15
              </span>
            </div>
            <div className="mt-3 font-code-md text-xs text-on-surface-variant">
              Sisa waktu: 23:45
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Section: Dynamic Radar Chart & Detailed Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Mastery Radar Chart */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-md md:p-lg border border-white/10 shadow-2xl flex flex-col items-center justify-center">
          <div className="flex justify-between items-center w-full mb-4 border-b border-white/10 pb-3">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-white">
                Mastery Radar Chart
              </h2>
              <p className="font-code-md text-xs text-on-surface-variant">
                Grafik otomatis hasil evaluasi 40 nomor soal
              </p>
            </div>
            <span className="font-code-md text-xs text-accent_green font-semibold bg-accent_green/10 px-3 py-1 rounded-full border border-accent_green/30 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent_green animate-pulse" />
              <span>Deteksi Jawaban Ujian</span>
            </span>
          </div>

          {/* SVG Dynamic Radar Chart */}
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center p-4">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {/* Background Concentric Radar Polygons */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, idx) => (
                <polygon
                  key={idx}
                  points="200,65 328,158 279,309 121,309 72,158"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                  transform={`scale(${scale})`}
                  transform-origin="200 200"
                />
              ))}

              {/* Axis Lines from Center */}
              <line x1="200" y1="200" x2="200" y2="65" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              <line x1="200" y1="200" x2="328" y2="158" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              <line x1="200" y1="200" x2="279" y2="309" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              <line x1="200" y1="200" x2="121" y2="309" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              <line x1="200" y1="200" x2="72" y2="158" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

              {/* DYNAMIC Glowing Polygon based strictly on exam scores */}
              <polygon
                points={polygonPoints}
                fill="rgba(0, 255, 255, 0.25)"
                stroke="#00FFFF"
                strokeWidth="3"
                className="filter drop-shadow-[0_0_15px_rgba(0,255,255,0.9)] transition-all duration-700 ease-out"
              />

              {/* DYNAMIC Data Nodes */}
              {[p0, p1, p2, p3, p4].map((p, idx) => (
                <circle
                  key={idx}
                  cx={p.x}
                  cy={p.y}
                  r="6"
                  fill="#00FFFF"
                  className="transition-all duration-700 ease-out"
                />
              ))}
            </svg>

            {/* Dynamic Topic Labels */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 font-code-md text-xs text-white font-bold bg-surface-container/90 px-2.5 py-1 rounded border border-white/10 shadow-md">
              Mekanika ({scores.Mekanika}%)
            </div>
            <div className="absolute top-1/3 right-0 font-code-md text-xs text-white font-bold bg-surface-container/90 px-2.5 py-1 rounded border border-white/10 shadow-md">
              Astrofisika ({scores.Astrofisika}%)
            </div>
            <div className="absolute bottom-4 right-4 font-code-md text-xs text-white font-bold bg-surface-container/90 px-2.5 py-1 rounded border border-white/10 shadow-md">
              Bola Langit ({scores.BolaLangit}%)
            </div>
            <div className="absolute bottom-4 left-4 font-code-md text-xs text-white font-bold bg-surface-container/90 px-2.5 py-1 rounded border border-white/10 shadow-md">
              Tata Surya ({scores.TataSurya}%)
            </div>
            <div className="absolute top-1/3 left-0 font-code-md text-xs text-white font-bold bg-surface-container/90 px-2.5 py-1 rounded border border-white/10 shadow-md">
              Instrumen ({scores.Instrumen}%)
            </div>
          </div>

          {/* Breakdown Stats Summary Bar */}
          <div className="w-full mt-4 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
            {allCategories.map((cat) => (
              <div key={cat.key} className="bg-surface-container-lowest/60 p-2 rounded-lg border border-white/5">
                <p className="font-code-md text-[10px] text-on-surface-variant uppercase tracking-wider">
                  {cat.key}
                </p>
                <p className="font-headline-md text-body-md font-bold text-accent_cyan mt-0.5">
                  {scores[cat.key]}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Area Perbaikan & Module Recommendations */}
        <div className="lg:col-span-5 flex flex-col gap-lg justify-between">
          {/* Detailed Area Perbaikan Card */}
          <div className="glass-card rounded-2xl p-md border border-white/10 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 text-error border-b border-white/10 pb-3">
              <span className="material-symbols-outlined text-2xl">warning</span>
              <h2 className="font-headline-md text-headline-md font-bold text-white">
                Area Perbaikan
              </h2>
            </div>

            {/* Primary Highlight Banner */}
            <div className="p-3.5 rounded-xl bg-error-container/20 border border-error/30 flex flex-col gap-1">
              <p className="font-body-md text-body-md text-on-surface">
                Skor terendah Anda ada pada materi{' '}
                <strong className="text-error font-bold">{primaryWeak.label}</strong> (
                {scores[primaryWeak.key]}%).
              </p>
              <p className="font-code-md text-xs text-on-surface-variant">
                Sub-konsep: {primaryWeak.desc}
              </p>
            </div>

            {/* Comprehensive Breakdown of All Weak Topics (< 80%) */}
            <div className="flex flex-col gap-2 mt-1">
              <h3 className="font-code-md text-xs text-tertiary uppercase tracking-wider font-bold">
                🎯 Daftar Rekomendasi Modul Pembelajaran:
              </h3>

              <div className="flex flex-col gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                {weakList.map((item) => (
                  <div
                    key={item.key}
                    className="p-3 rounded-xl bg-surface-container/60 border border-white/10 hover:border-secondary transition-all flex flex-col gap-2 group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-body-md font-bold text-white text-sm">
                          {item.label}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-error-container/40 text-error font-code-md text-xs font-bold border border-error/30">
                        {scores[item.key]}%
                      </span>
                    </div>

                    <p className="font-code-md text-[11px] text-on-surface-variant line-clamp-1">
                      {item.desc}
                    </p>

                    <Link
                      href={item.link}
                      className="mt-1 px-3 py-1.5 rounded-lg bg-secondary-container/40 text-secondary hover:bg-secondary-container transition-all flex items-center justify-between font-code-md text-xs font-bold border border-secondary/30"
                    >
                      <span>REKOMENDASI: {item.linkText}</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {/* Lihat Pembahasan */}
            <Link
              href="/practice/tryout/review"
              className="w-full py-4 px-6 rounded-xl bg-[#FFD700] text-black font-headline-md text-body-lg font-bold hover:brightness-110 active:scale-95 transition-all text-center shadow-[0_0_20px_rgba(255,215,0,0.3)] cursor-pointer"
            >
              Lihat Pembahasan
            </Link>

            {/* Coba Lagi */}
            <Link
              href="/practice/tryout"
              className="w-full py-3.5 px-6 rounded-xl border border-accent_cyan text-accent_cyan font-headline-md text-body-md font-bold hover:bg-accent_cyan/10 active:scale-95 transition-all text-center cursor-pointer"
            >
              Coba Lagi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
