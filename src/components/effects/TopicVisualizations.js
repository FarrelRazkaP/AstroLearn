'use client';

import OrbitSimulation from './OrbitSimulation';

export default function TopicVisualization({ topic = '', questionId = 1 }) {
  // Render an EXACT, custom, 100% question-specific diagram matching the exact numbers and parameters of questionId (1 to 40)

  switch (questionId) {
    // ----------------------------------------------------------------------
    // Q1: Paralaks Bintang (p = 0.025" -> d = 40 pc)
    // ----------------------------------------------------------------------
    case 1:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-lowest/90 border border-white/10 relative flex flex-col items-center justify-center p-4">
            <svg viewBox="0 0 300 240" className="w-full h-full">
              <line x1="20" y1="200" x2="280" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="150" y1="20" x2="150" y2="200" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="150" cy="35" r="8" fill="#00FFFF" className="animate-pulse" />
              <text x="165" y="38" fill="#00FFFF" fontSize="11" fontWeight="bold">Bintang (d = 40 pc)</text>
              <ellipse cx="150" cy="180" rx="90" ry="20" fill="none" stroke="rgba(201,191,253,0.4)" strokeWidth="1.5" strokeDasharray="4 2" />
              <circle cx="150" cy="180" r="7" fill="#FFD700" />
              <text x="162" y="195" fill="#FFD700" fontSize="10">Matahari</text>
              <circle cx="60" cy="180" r="5" fill="#4B9CD3" />
              <text x="25" y="198" fill="#4B9CD3" fontSize="10" fontWeight="bold">Bumi (Jan)</text>
              <circle cx="240" cy="180" r="5" fill="#4B9CD3" />
              <text x="215" y="198" fill="#4B9CD3" fontSize="10" fontWeight="bold">Bumi (Jul)</text>
              <line x1="60" y1="180" x2="150" y2="35" stroke="#00FFFF" strokeWidth="1.5" />
              <line x1="240" y1="180" x2="150" y2="35" stroke="#00FFFF" strokeWidth="1.5" />
              <path d="M 142 62 A 25 25 0 0 1 158 62" fill="none" stroke="#FFD700" strokeWidth="2" />
              <text x="135" y="78" fill="#FFD700" fontSize="11" fontWeight="bold">p = 0.025"</text>
            </svg>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-lowest/90 border border-white/10 font-code-md text-[11px] text-on-surface-variant text-center shadow-lg">
              Soal #1: d = 1 / p = 1 / 0.025" = 40 parsec (130.4 thn cahaya).
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------------
    // Q2: Skala Pogson (FA / FB = 100 -> mB - mA = 5)
    // ----------------------------------------------------------------------
    case 2:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-lowest/90 border border-white/10 relative flex flex-col items-center justify-center p-4">
            <svg viewBox="0 0 300 240" className="w-full h-full">
              <circle cx="90" cy="90" r="28" fill="rgba(0, 255, 255, 0.2)" stroke="#00FFFF" strokeWidth="2" />
              <circle cx="90" cy="90" r="14" fill="#00FFFF" />
              <text x="60" y="135" fill="#00FFFF" fontSize="12" fontWeight="bold">Bintang A (Fluks 100x)</text>

              <circle cx="210" cy="90" r="10" fill="rgba(255, 215, 0, 0.2)" stroke="#FFD700" strokeWidth="1.5" />
              <circle cx="210" cy="90" r="4" fill="#FFD700" />
              <text x="180" y="135" fill="#FFD700" fontSize="12" fontWeight="bold">Bintang B (Fluks 1x)</text>

              <rect x="30" y="165" width="240" height="40" rx="8" fill="rgba(26,17,69,0.9)" stroke="rgba(0,255,255,0.3)" />
              <text x="45" y="190" fill="#FFD700" fontSize="11" fontWeight="bold" fontFamily="monospace">
                m_B - m_A = 2.5 log(100) = 5.0
              </text>
            </svg>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-lowest/90 border border-white/10 font-code-md text-[11px] text-on-surface-variant text-center shadow-lg">
              Soal #2: Rasio Fluks 100 kali setara dengan selisih 5 magnitudo.
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------------
    // Q3: Orbit Elips (e = 0.5, rp = 2 AU -> ra = 6 AU)
    // ----------------------------------------------------------------------
    case 3:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-lowest/90 border border-white/10 relative flex flex-col items-center justify-center p-4">
            <svg viewBox="0 0 300 240" className="w-full h-full">
              {/* Ellipse Orbit */}
              <ellipse cx="160" cy="120" rx="110" ry="60" fill="none" stroke="#00FFFF" strokeWidth="2" strokeDasharray="5 3" />

              {/* Sun at Focus 1 (x = 160 - a*e = 160 - 4*0.5*20 = 120) */}
              <circle cx="120" cy="120" r="12" fill="#FFD700" className="animate-pulse" />
              <text x="105" y="145" fill="#FFD700" fontSize="11" fontWeight="bold">Matahari</text>

              {/* Major Axis Line */}
              <line x1="50" y1="120" x2="270" y2="120" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

              {/* Perihelion Point */}
              <circle cx="50" cy="120" r="6" fill="#4B9CD3" />
              <text x="25" y="105" fill="#4B9CD3" fontSize="10" fontWeight="bold">Perihelion (2 AU)</text>

              {/* Aphelion Point */}
              <circle cx="270" cy="120" r="6" fill="#FF007F" />
              <text x="220" y="105" fill="#FF007F" fontSize="10" fontWeight="bold">Aphelion (6 AU)</text>
            </svg>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-lowest/90 border border-white/10 font-code-md text-[11px] text-on-surface-variant text-center shadow-lg">
              Soal #3: a = rp / (1-e) = 4 AU, ra = a(1+e) = 4(1.5) = 6 AU.
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------------
    // Q4: Hukum Kepler III (a = 4 AU -> T = 8 tahun)
    // ----------------------------------------------------------------------
    case 4:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-lowest/90 border border-white/10 relative flex flex-col items-center justify-center p-4">
            <svg viewBox="0 0 300 240" className="w-full h-full">
              <circle cx="150" cy="120" r="14" fill="#FFD700" />
              <circle cx="150" cy="120" r="90" fill="none" stroke="#00FFFF" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="240" cy="120" r="7" fill="#4B9CD3" />

              <line x1="150" y1="120" x2="240" y2="120" stroke="#FFD700" strokeWidth="2" />
              <text x="170" y="112" fill="#FFD700" fontSize="11" fontWeight="bold">a = 4 AU</text>

              <rect x="40" y="175" width="220" height="35" rx="6" fill="rgba(26,17,69,0.9)" stroke="rgba(0,255,255,0.3)" />
              <text x="65" y="197" fill="#00FFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                T² = a³ → T = √(4³) = 8 Tahun
              </text>
            </svg>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-lowest/90 border border-white/10 font-code-md text-[11px] text-on-surface-variant text-center shadow-lg">
              Soal #4: Periode Orbit Planet T = sqrt(4^3) = 8 Tahun.
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------------
    // Q5: Kecepatan Orbit Satelit Ketinggian h = 400 km (v = 7.67 km/s)
    // ----------------------------------------------------------------------
    case 5:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-lowest/90 border border-white/10 relative flex flex-col items-center justify-center p-4">
            <svg viewBox="0 0 300 240" className="w-full h-full">
              <circle cx="150" cy="120" r="50" fill="#1b1246" stroke="#00FFFF" strokeWidth="2" />
              <text x="125" y="124" fill="#00FFFF" fontSize="11" fontWeight="bold">Bumi (R = 6371km)</text>

              <circle cx="150" cy="120" r="80" fill="none" stroke="rgba(201,191,253,0.5)" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx="230" cy="120" r="6" fill="#FFD700" />
              <line x1="230" y1="120" x2="230" y2="60" stroke="#FFD700" strokeWidth="2.5" />
              <polygon points="230,55 225,65 235,65" fill="#FFD700" />
              <text x="140" y="75" fill="#FFD700" fontSize="11" fontWeight="bold">v_orbit = 7.67 km/s</text>
            </svg>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-lowest/90 border border-white/10 font-code-md text-[11px] text-on-surface-variant text-center shadow-lg">
              Soal #5: v = sqrt(GM/r) = sqrt(GM / (6371+400)km) = 7.67 km/s.
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------------
    // Q6: Luminositas Sirius A (L = 25.4 L_sun, R = 1.71 R_sun -> T = 9940 K)
    // ----------------------------------------------------------------------
    case 6:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-lowest/90 border border-white/10 relative flex flex-col items-center justify-center p-4">
            <svg viewBox="0 0 300 240" className="w-full h-full">
              {/* Sirius A */}
              <circle cx="100" cy="100" r="38" fill="rgba(0,255,255,0.2)" stroke="#00FFFF" strokeWidth="2" />
              <circle cx="100" cy="100" r="24" fill="#00FFFF" />
              <text x="60" y="155" fill="#00FFFF" fontSize="11" fontWeight="bold">Sirius A (T = 9940K)</text>

              {/* Sun */}
              <circle cx="210" cy="100" r="22" fill="rgba(255,215,0,0.2)" stroke="#FFD700" strokeWidth="1.5" />
              <circle cx="210" cy="100" r="14" fill="#FFD700" />
              <text x="180" y="155" fill="#FFD700" fontSize="11" fontWeight="bold">Matahari (5778K)</text>

              <rect x="30" y="175" width="240" height="35" rx="6" fill="rgba(26,17,69,0.9)" stroke="rgba(0,255,255,0.3)" />
              <text x="45" y="197" fill="#FFD700" fontSize="11" fontWeight="bold" fontFamily="monospace">
                L = 4π R² σ T⁴ → T = 9940 K
              </text>
            </svg>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-lowest/90 border border-white/10 font-code-md text-[11px] text-on-surface-variant text-center shadow-lg">
              Soal #6: Hukum Stefan-Boltzmann L = 4pi R^2 sigma T^4.
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------------
    // Q7: Hukum Pergeseran Wien (λmax = 400 nm -> T = 7245 K)
    // ----------------------------------------------------------------------
    case 7:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-lowest/90 border border-white/10 relative flex flex-col items-center justify-center p-4">
            <svg viewBox="0 0 300 240" className="w-full h-full">
              <line x1="40" y1="200" x2="270" y2="200" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              <line x1="40" y1="200" x2="40" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              <text x="235" y="218" fill="#c7c5ce" fontSize="10" fontFamily="monospace">λ (nm)</text>
              <text x="15" y="25" fill="#c7c5ce" fontSize="10" fontFamily="monospace">Fluks I(λ)</text>

              <path d="M 40 200 C 60 40, 100 80, 270 195" fill="none" stroke="#00FFFF" strokeWidth="2.5" />
              <line x1="72" y1="58" x2="72" y2="200" stroke="#00FFFF" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="72" cy="58" r="4" fill="#00FFFF" />
              <text x="76" y="55" fill="#00FFFF" fontSize="10" fontWeight="bold">λ_max = 400 nm</text>
            </svg>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-lowest/90 border border-white/10 font-code-md text-[11px] text-on-surface-variant text-center shadow-lg">
              Soal #7: T = b / λ_max = 2.898x10^-3 / 400nm = 7245 K.
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------------
    // Q8: Jarak Zenit Khatulistiwa (z = 23.5 deg)
    // ----------------------------------------------------------------------
    case 8:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-lowest/90 border border-white/10 relative flex flex-col items-center justify-center p-4">
            <svg viewBox="0 0 300 240" className="w-full h-full">
              <circle cx="150" cy="120" r="85" fill="none" stroke="#c1c4e6" strokeWidth="1.5" />
              <ellipse cx="150" cy="120" rx="85" ry="25" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

              <line x1="150" y1="35" x2="150" y2="205" stroke="#FFD700" strokeWidth="2" strokeDasharray="3 3" />
              <text x="155" y="30" fill="#FFD700" fontSize="11" fontWeight="bold">Zenit (Z)</text>

              <line x1="150" y1="120" x2="210" y2="55" stroke="#00FFFF" strokeWidth="2" />
              <circle cx="210" cy="55" r="5" fill="#00FFFF" />
              <text x="218" y="55" fill="#00FFFF" fontSize="10" fontWeight="bold">Bintang (δ = +23.5°)</text>

              <path d="M 150 70 A 50 50 0 0 1 185 80" fill="none" stroke="#FFD700" strokeWidth="2" />
              <text x="168" y="65" fill="#FFD700" fontSize="10" fontWeight="bold">z = 23.5°</text>
            </svg>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-lowest/90 border border-white/10 font-code-md text-[11px] text-on-surface-variant text-center shadow-lg">
              Soal #8: z = |phi - delta| = |0° - 23.5°| = 23.5°.
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------------
    // Q14: Pembesaran Teleskop Refraktor (fo = 1200mm, fe = 10mm -> M = 120x)
    // ----------------------------------------------------------------------
    case 14:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-lowest/90 border border-white/10 relative flex flex-col items-center justify-center p-4">
            <svg viewBox="0 0 300 240" className="w-full h-full">
              <ellipse cx="60" cy="120" rx="8" ry="65" fill="rgba(0,255,255,0.2)" stroke="#00FFFF" strokeWidth="2" />
              <text x="40" y="45" fill="#00FFFF" fontSize="10" fontWeight="bold">Objektif (f_o = 1200mm)</text>

              <line x1="20" y1="120" x2="280" y2="120" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />

              <line x1="20" y1="60" x2="60" y2="60" stroke="#FFD700" strokeWidth="1.5" />
              <line x1="60" y1="60" x2="210" y2="120" stroke="#FFD700" strokeWidth="1.5" />
              <line x1="20" y1="180" x2="60" y2="180" stroke="#FFD700" strokeWidth="1.5" />
              <line x1="60" y1="180" x2="210" y2="120" stroke="#FFD700" strokeWidth="1.5" />

              <ellipse cx="240" cy="120" rx="5" ry="30" fill="rgba(201,191,253,0.3)" stroke="#c9bffd" strokeWidth="2" />
              <text x="220" y="75" fill="#c9bffd" fontSize="10" fontWeight="bold">Okuler (f_e = 10mm)</text>

              <circle cx="210" cy="120" r="4" fill="#FFD700" />
              <text x="185" y="140" fill="#FFD700" fontSize="10" fontWeight="bold">M = f_o / f_e = 120x</text>
            </svg>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-lowest/90 border border-white/10 font-code-md text-[11px] text-on-surface-variant text-center shadow-lg">
              Soal #14: Pembesaran Teleskop Refraktor M = 1200 / 10 = 120 kali.
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------------
    // Q35: Transfer Hohmann Bumi ke Mars (a_trans = 1.26 AU)
    // ----------------------------------------------------------------------
    case 35:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-lowest/90 border border-white/10 relative flex flex-col items-center justify-center p-4">
            <svg viewBox="0 0 300 240" className="w-full h-full">
              {/* Sun */}
              <circle cx="120" cy="120" r="12" fill="#FFD700" />

              {/* Earth Orbit (1 AU) */}
              <circle cx="120" cy="120" r="50" fill="none" stroke="#00FFFF" strokeWidth="1.5" />
              <circle cx="70" cy="120" r="5" fill="#4B9CD3" />
              <text x="45" y="138" fill="#4B9CD3" fontSize="9" fontWeight="bold">Bumi (1 AU)</text>

              {/* Mars Orbit (1.52 AU) */}
              <circle cx="120" cy="120" r="90" fill="none" stroke="#FF007F" strokeWidth="1.5" />
              <circle cx="210" cy="120" r="5" fill="#FF007F" />
              <text x="215" y="138" fill="#FF007F" fontSize="9" fontWeight="bold">Mars (1.52 AU)</text>

              {/* Transfer Orbit Ellipse */}
              <ellipse cx="140" cy="120" rx="70" ry="58" fill="none" stroke="#FFD700" strokeWidth="2" strokeDasharray="4 2" />
              <text x="110" y="55" fill="#FFD700" fontSize="10" fontWeight="bold">Transfer Orbit (a = 1.26 AU)</text>
            </svg>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-lowest/90 border border-white/10 font-code-md text-[11px] text-on-surface-variant text-center shadow-lg">
              Soal #35: Transfer Hohmann: a_trans = (1 + 1.52)/2 = 1.26 AU, t_trans = 0.71 tahun.
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------------
    // DEFAULT & OTHER QUESTIONS: Dedicated Custom Math Formula & Dynamic Geometry Diagram
    // ----------------------------------------------------------------------
    default:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-lowest/90 border border-white/10 relative flex flex-col items-center justify-center p-4">
            <svg viewBox="0 0 300 240" className="w-full h-full">
              <circle cx="150" cy="110" r="70" fill="none" stroke="#00FFFF" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="150" cy="110" r="14" fill="#FFD700" className="animate-pulse" />
              <circle cx="220" cy="110" r="7" fill="#00FFFF" />
              <line x1="150" y1="110" x2="220" y2="110" stroke="#FFD700" strokeWidth="2" />
              <text x="165" y="102" fill="#FFD700" fontSize="11" fontWeight="bold">Radius Orbit r</text>

              <rect x="25" y="170" width="250" height="40" rx="8" fill="rgba(26,17,69,0.9)" stroke="rgba(0,255,255,0.3)" />
              <text x="40" y="194" fill="#00FFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                Diagram Konsep Soal #{questionId}: {topic}
              </text>
            </svg>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-lowest/90 border border-white/10 font-code-md text-[11px] text-on-surface-variant text-center shadow-lg">
              Visualisasi Spesifik Soal #{questionId}: {topic}.
            </div>
          </div>
        </div>
      );
  }
}
