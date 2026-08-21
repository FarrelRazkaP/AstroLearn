'use client';

export default function AstronomyDiagram({ code, topicBadge, imageFallback }) {
  const c = (code || '').toUpperCase();

  // 1. Morgan-Keenan Spectral Classification Sequence (O B A F G K M)
  if (c.includes('SPECTRAL_TYPES')) {
    return (
      <div className="w-full h-full min-h-[220px] bg-[#0a0e27] p-4 rounded-xl flex flex-col justify-between items-center border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="text-center mb-2">
          <span className="font-code-md text-xs text-secondary uppercase tracking-widest font-bold">
            Klasifikasi Spektrum Bintang Morgan-Keenan
          </span>
          <p className="text-[11px] text-on-surface-variant font-code-md">
            Suhu Terpanas (Kiri) → Terdingin (Kanan)
          </p>
        </div>

        <svg viewBox="0 0 500 140" className="w-full h-36">
          <defs>
            <linearGradient id="specGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="15%" stopColor="#3b82f6" />
              <stop offset="35%" stopColor="#f8fafc" />
              <stop offset="55%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#eab308" />
              <stop offset="85%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          {/* Class O */}
          <circle cx="40" cy="45" r="26" fill="#4f46e5" filter="drop-shadow(0 0 12px #6366f1)" />
          <text x="40" y="50" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="bold">O</text>

          {/* Class B */}
          <circle cx="105" cy="45" r="23" fill="#60a5fa" filter="drop-shadow(0 0 10px #60a5fa)" />
          <text x="105" y="50" fill="#ffffff" textAnchor="middle" fontSize="15" fontWeight="bold">B</text>

          {/* Class A */}
          <circle cx="170" cy="45" r="20" fill="#f8fafc" filter="drop-shadow(0 0 8px #ffffff)" />
          <text x="170" y="50" fill="#0f172a" textAnchor="middle" fontSize="14" fontWeight="bold">A</text>

          {/* Class F */}
          <circle cx="235" cy="45" r="18" fill="#fef08a" filter="drop-shadow(0 0 8px #fef08a)" />
          <text x="235" y="50" fill="#0f172a" textAnchor="middle" fontSize="13" fontWeight="bold">F</text>

          {/* Class G */}
          <circle cx="300" cy="45" r="16" fill="#eab308" filter="drop-shadow(0 0 8px #eab308)" />
          <text x="300" y="50" fill="#0f172a" textAnchor="middle" fontSize="12" fontWeight="bold">G</text>

          {/* Class K */}
          <circle cx="365" cy="45" r="14" fill="#f97316" filter="drop-shadow(0 0 6px #f97316)" />
          <text x="365" y="49" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">K</text>

          {/* Class M */}
          <circle cx="430" cy="45" r="12" fill="#ef4444" filter="drop-shadow(0 0 6px #ef4444)" />
          <text x="430" y="49" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">M</text>

          {/* Spectrum Gradient Line */}
          <rect x="20" y="90" width="440" height="10" rx="5" fill="url(#specGrad)" />
        </svg>

        <div className="w-full flex justify-between px-3 text-[10px] font-code-md text-on-surface-variant border-t border-white/10 pt-1 mt-1 font-bold">
          <span className="text-indigo-400">O - B - A (Suhu &gt; 10.000 K)</span>
          <span className="text-amber-400">F - G (Matahari ~5.800 K)</span>
          <span className="text-red-400">K - M (Suhu &lt; 4.000 K)</span>
        </div>
      </div>
    );
  }

  // 2. Kepler's Orbit Ellipse Geometry
  if (c.includes('KEPLER_3RD') || c.includes('KEPLER_1ST') || c.includes('KEPLER_2ND')) {
    return (
      <div className="w-full h-full min-h-[220px] bg-[#0a0e27] p-4 rounded-xl flex flex-col justify-between items-center border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="text-center mb-1">
          <span className="font-code-md text-xs text-secondary uppercase tracking-widest font-bold">
            Geometri Orbit Elips & Hukum Kepler
          </span>
        </div>
        <svg viewBox="0 0 400 170" className="w-full h-38">
          <ellipse cx="200" cy="85" rx="140" ry="65" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 2" />
          {/* Sun at Focus 1 */}
          <circle cx="140" cy="85" r="14" fill="#fde047" filter="drop-shadow(0 0 12px #facc15)" />
          <text x="140" y="112" fill="#fde047" textAnchor="middle" fontSize="10" fontWeight="bold">Matahari (Fokus)</text>

          {/* Planet */}
          <circle cx="330" cy="65" r="7" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
          <text x="330" y="50" fill="#38bdf8" textAnchor="middle" fontSize="10" fontWeight="bold">Planet</text>

          {/* Semi Major Axis Line */}
          <line x1="200" y1="85" x2="340" y2="85" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2 2" />
          <text x="270" y="80" fill="#f43f5e" textAnchor="middle" fontSize="10" fontWeight="bold">Semi-Major Axis (a)</text>

          {/* Kepler III Box */}
          <rect x="250" y="125" width="130" height="28" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" strokeWidth="1" />
          <text x="315" y="144" fill="#38bdf8" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold">T² = a³</text>
        </svg>
      </div>
    );
  }

  // 3. Satellite Altitude & Circular Speed
  if (c.includes('ORBIT_VELOCITY') || c.includes('ESCAPE_RATIO')) {
    return (
      <div className="w-full h-full min-h-[220px] bg-[#0a0e27] p-4 rounded-xl flex flex-col justify-between items-center border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="text-center mb-1">
          <span className="font-code-md text-xs text-secondary uppercase tracking-widest font-bold">
            Orbit & Vektor Kecepatan Satelit
          </span>
        </div>
        <svg viewBox="0 0 400 170" className="w-full h-38">
          <circle cx="200" cy="85" r="42" fill="#2563eb" filter="drop-shadow(0 0 15px #3b82f6)" />
          <text x="200" y="90" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">Bumi (R)</text>

          <circle cx="200" cy="85" r="70" fill="none" stroke="#a7f3d0" strokeWidth="1.5" strokeDasharray="5 3" />

          <circle cx="200" cy="15" r="6" fill="#f43f5e" filter="drop-shadow(0 0 6px #f43f5e)" />
          <text x="200" y="10" fill="#f43f5e" textAnchor="middle" fontSize="9" fontWeight="bold">Satelit</text>

          <line x1="200" y1="15" x2="255" y2="15" stroke="#facc15" strokeWidth="2.5" />
          <text x="235" y="8" fill="#facc15" textAnchor="middle" fontSize="9" fontWeight="bold">v = √(GM/r)</text>
        </svg>
      </div>
    );
  }

  // 4. Hertzsprung-Russell (H-R) Diagram
  if (c.includes('HR_') || c.includes('STEFAN_BOLTZMANN') || c.includes('WHITE_DWARF')) {
    return (
      <div className="w-full h-full min-h-[220px] bg-[#0a0e27] p-4 rounded-xl flex flex-col justify-between items-center border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="text-center mb-1">
          <span className="font-code-md text-xs text-secondary uppercase tracking-widest font-bold">
            Diagram Hertzsprung-Russell (H-R)
          </span>
        </div>
        <svg viewBox="0 0 400 160" className="w-full h-36">
          <line x1="45" y1="15" x2="45" y2="135" stroke="#94a3b8" strokeWidth="2" />
          <line x1="45" y1="135" x2="380" y2="135" stroke="#94a3b8" strokeWidth="2" />
          <text x="18" y="75" fill="#94a3b8" fontSize="9" fontWeight="bold" transform="rotate(-90 18 75)">Luminositas (L)</text>
          <text x="210" y="152" fill="#94a3b8" textAnchor="middle" fontSize="9" fontWeight="bold">Suhu T (K) [Panas ← Dingin]</text>

          {/* Main Sequence */}
          <path d="M 65 25 Q 180 80 350 125" fill="none" stroke="#38bdf8" strokeWidth="3.5" filter="drop-shadow(0 0 8px #38bdf8)" />
          <text x="230" y="95" fill="#38bdf8" fontSize="9" fontWeight="bold" transform="rotate(18 230 95)">Deret Utama</text>

          {/* White Dwarf */}
          <ellipse cx="95" cy="115" rx="30" ry="14" fill="rgba(192, 132, 252, 0.4)" stroke="#c084fc" strokeWidth="2" strokeDasharray="3 2" />
          <text x="95" y="118" fill="#e9d5ff" textAnchor="middle" fontSize="9" fontWeight="bold">Katai Putih</text>
        </svg>
      </div>
    );
  }

  // Fallback to standard clean galaxy image if no matching SVG
  return (
    <img
      alt="Quiz Visual"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      src={imageFallback || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeN3Oe_KL6CqDOu-s8bNLUboORQ4XAgAcQ1h9sHgZiFJ8D0OR0X4rcLsXHsg0o4Q8MPisQKtJ5HcRnvZ9Duo1H97XlDT3u7IOTTinVO5Hph56tKIxhh4WDCg_tirVup8K7uhJjX9JYh3yynLBCieHSN3n60LKbA4gwh42ponnXIsNaJXLzTzbIdaglUlqNunLu21o6D053nu1cmbR9CUUfVNX6XU7ANHzHK8_FzOkm1UWGfUB4_FSbAA'}
    />
  );
}
