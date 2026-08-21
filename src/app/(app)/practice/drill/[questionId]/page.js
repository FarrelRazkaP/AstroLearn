'use client';

import { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AstronomyDiagram from '@/components/ui/AstronomyDiagram';
import { recordQuizCompletionStreak } from '@/lib/userStats';

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 50 DISTINCT DYNAMIC QUESTION GENERATORS (10 Unique Question Concepts for EACH of the 5 Modules)
const DYNAMIC_TEMPLATES = {
  mekanika: [
    // 1. Kepler III Law
    () => {
      const aVals = [4, 9, 16, 25, 36, 49, 64];
      const a = aVals[Math.floor(Math.random() * aVals.length)];
      const T = Math.round(Math.pow(a, 1.5));
      return {
        module: 'Mekanika Benda Langit',
        code: `MOD_04 // KEPLER_3RD_A${a}`,
        title: 'Hukum III Kepler (Periode Orbit)',
        topicBadge: 'Hukum Kepler',
        figLabel: `FIG 1: Elliptic Semi-Major Axis a = ${a} AU`,
        question: `Sebuah komet mengorbit Matahari dengan jarak rata-rata (sumbu semi-mayor) a = ${a} AU. Berapakah periode revolusinya (T) mengelilingi Matahari?`,
        correctText: `${T} tahun`,
        wrongTexts: [`${a * 2} tahun`, `${a} tahun`, `${Math.round(a * 1.5)} tahun`],
        explanation: `Berdasarkan Hukum III Kepler T² = a³. Untuk a = ${a} AU, T² = ${a}³ = ${Math.pow(a, 3)}, sehingga T = √(${Math.pow(a, 3)}) = ${T} tahun.`,
      };
    },
    // 2. Satellite Orbit Velocity
    () => {
      const hVals = [300, 400, 500, 600, 800, 1000];
      const h = hVals[Math.floor(Math.random() * hVals.length)];
      const v = (Math.sqrt((6.674e-11 * 5.972e24) / ((6371 + h) * 1000)) / 1000).toFixed(2);
      return {
        module: 'Mekanika Benda Langit',
        code: `MOD_04 // ORBIT_VELOCITY_H${h}`,
        title: 'Kecepatan Orbit Melingkar Satelit',
        topicBadge: 'Mekanika Orbit',
        figLabel: `FIG 2: Satellite Altitude h = ${h} km`,
        question: `Sebuah satelit buatan mengorbit Bumi pada ketinggian h = ${h} km di atas permukaan. Tentukan kecepatan orbital melingkar satelit tersebut! (R_Bumi = 6371 km, M_Bumi = 5.972 × 10²⁴ kg)`,
        correctText: `${v} km/s`,
        wrongTexts: [`${(v * 1.15).toFixed(2)} km/s`, `${(v * 0.85).toFixed(2)} km/s`, '11.20 km/s'],
        explanation: `Kecepatan orbit v = √(GM / (R + h)) = √((6.674×10⁻¹¹ × 5.972×10²⁴) / (${6371 + h}×10³)) ≈ ${v} km/s.`,
      };
    },
    // 3. Escape Velocity Ratio
    () => {
      return {
        module: 'Mekanika Benda Langit',
        code: 'MOD_04 // ESCAPE_RATIO',
        title: 'Kecepatan Lepas Gravitasi',
        topicBadge: 'Kecepatan Lepas',
        figLabel: 'FIG 3: Parabolic Escape Trajectory',
        question: 'Berapakah rasio perbandingan konstan antara Kecepatan Lepas (v_escape) dari permukaan sebuah planet relatif terhadap Kecepatan Orbit Melingkar (v_orbit) pada permukaan planet tersebut?',
        correctText: '√2 (sekitar 1.414 kali)',
        wrongTexts: ['2.000 kali', 'π (sekitar 3.141 kali)', '√3 (sekitar 1.732 kali)'],
        explanation: 'v_escape = √(2GM/R) sedangkan v_orbit = √(GM/R). Maka v_escape / v_orbit = √2 ≈ 1.414.',
      };
    },
    // 4. Roche Limit Tidal Disruption
    () => {
      return {
        module: 'Mekanika Benda Langit',
        code: 'MOD_04 // ROCHE_LIMIT',
        title: 'Batas Roche & Pasang Surut',
        topicBadge: 'Gaya Pasang Surut',
        figLabel: 'FIG 4: Tidal Disruption Radius',
        question: 'Apakah akibat fisik utama yang terjadi pada sebuah satelit alami jika orbitnya melintasi batas di dalam Batas Roche (Roche Limit) sebuah planet?',
        correctText: 'Satelit akan hancur berantakan akibat gaya pasang surut gravitasi planet.',
        wrongTexts: [
          'Satelit memantul kembali keluar dari gravitasi planet.',
          'Kecepatan rotasi satelit menjadi dua kali lipat.',
          'Massa satelit bertambah secara bertahap.',
        ],
        explanation: 'Di dalam Batas Roche, diferensial gaya pasang surut gravitasi planet melampaui gaya kohesi gravitasi internal satelit, menghancurkannya menjadi cincin.',
      };
    },
    // 5. Orbital Energy Formula
    () => {
      const aVals = [2, 5, 10, 20];
      const a = aVals[Math.floor(Math.random() * aVals.length)];
      return {
        module: 'Mekanika Benda Langit',
        code: `MOD_04 // ORBITAL_ENERGY_A${a}`,
        title: 'Energi Spesifik Orbit Terikat',
        topicBadge: 'Energi Orbit',
        figLabel: `FIG 5: Bound Orbit Mechanical Energy (a = ${a} AU)`,
        question: `Untuk sebuah benda langit bermassa m yang mengorbit pada lintasan terikat dengan sumbu semi-mayor a = ${a} AU, berapakah persamaan total energi mekaniknya (E)?`,
        correctText: 'E = -GMm / (2a)',
        wrongTexts: ['E = -GMm / a', 'E = +GMm / (2a)', 'E = 0'],
        explanation: 'Total Energi Mekanik orbit terikat (elips/melingkar) dirumuskan E = K + U = -GMm / (2a).',
      };
    },
    // 6. Kepler II Law Speed at Perihelion vs Aphelion
    () => {
      return {
        module: 'Mekanika Benda Langit',
        code: 'MOD_04 // KEPLER_2ND_LAW',
        title: 'Hukum II Kepler & Vektor Kecepatan',
        topicBadge: 'Hukum II Kepler',
        figLabel: 'FIG 6: Perihelion vs Aphelion Velocity Vectors',
        question: 'Berdasarkan Hukum II Kepler (Hukum Luas), di posisi manakah sebuah planet bergerak dengan kecepatan orbital paling tinggi dalam lintasan elipsnya?',
        correctText: 'Perihelion (titik terdekat ke Matahari)',
        wrongTexts: [
          'Aphelion (titik terjauh dari Matahari)',
          'Di titik sumbu semi-minor',
          'Kecepatannya selalu sama di semua titik',
        ],
        explanation: 'Hukum II Kepler menyatakan vektor radius menyapu luas yang sama dalam waktu sama, sehingga planet bergerak paling cepat di Perihelion (terdekat) dan paling lambat di Aphelion (terjauh).',
      };
    },
    // 7. Hohmann Transfer Ellipse
    () => {
      return {
        module: 'Mekanika Benda Langit',
        code: 'MOD_04 // HOHMANN_TRANSFER',
        title: 'Transfer Orbit Hohmann',
        topicBadge: 'Mekanika Orbit',
        figLabel: 'FIG 7: Hohmann Elliptical Transfer Orbit',
        question: 'Bentuk lintasan orbit yang digunakan dalam Transfer Orbit Hohmann untuk berpindah dari satu orbit melingkar ke orbit melingkar lain yang lebih luar secara paling hemat bahan bakar adalah:',
        correctText: 'Orbit elips yang bersinggungan dengan kedua orbit melingkar asal dan tujuan',
        wrongTexts: [
          'Garis lurus radial',
          'Orbit parabola lepas',
          'Orbit hiperbola kecepatan tinggi',
        ],
        explanation: 'Transfer Hohmann menggunakan orbit elips di mana titik perihelion bersinggungan dengan orbit asal dan aphelion bersinggungan dengan orbit tujuan.',
      };
    },
    // 8. Lagrange Points Count
    () => {
      return {
        module: 'Mekanika Benda Langit',
        code: 'MOD_04 // LAGRANGE_POINTS',
        title: 'Titik Ekuilibrium Lagrange',
        topicBadge: 'Titik Lagrange',
        figLabel: 'FIG 8: L1-L5 Equilibrium Locations',
        question: 'Dalam masalah tiga benda terdistribusi (seperti sistem Bumi-Matahari), terdapat berapa banyak titik keseimbangan gravitasi Lagrange (Titik L)?',
        correctText: '5 Titik (L1 hingga L5)',
        wrongTexts: ['3 Titik', '2 Titik', '8 Titik'],
        explanation: 'Terdapat 5 Titik Lagrange: L1, L2, L3 berada sejajar garis kedua benda, sementara L4 dan L5 membentuk segitiga sama sisi yang stabil.',
      };
    },
    // 9. Vis-Viva Equation at r = a
    () => {
      return {
        module: 'Mekanika Benda Langit',
        code: 'MOD_04 // VIS_VIVA_EQ',
        title: 'Persamaan Vis-Viva',
        topicBadge: 'Kinetika Orbit',
        figLabel: 'FIG 9: Vis-Viva Kinetic Speed Equation',
        question: 'Persamaan Vis-Viva v² = GM (2/r - 1/a) menentukan kecepatan benda pada jarak r dari benda induk. Ketika r = a, berapakah kecepatan v?',
        correctText: 'v = √(GM / a), sama dengan kecepatan orbit melingkar beradius a',
        wrongTexts: ['v = 0', 'v = √(2GM / a)', 'v tak terhingga'],
        explanation: 'Jika r = a, maka v² = GM (2/a - 1/a) = GM / a, sehingga v = √(GM / a).',
      };
    },
    // 10. Kepler First Law
    () => {
      return {
        module: 'Mekanika Benda Langit',
        code: 'MOD_04 // KEPLER_1ST_LAW',
        title: 'Hukum I Kepler (Bentuk Orbit)',
        topicBadge: 'Hukum I Kepler',
        figLabel: 'FIG 10: Elliptical Geometry & Focus',
        question: 'Manakah pernyataan yang paling tepat mengenai bentuk orbit planet mengelilingi Matahari menurut Hukum I Kepler?',
        correctText: 'Orbit berbentuk elips dengan Matahari berada di salah satu titik fokusnya',
        wrongTexts: [
          'Orbit berbentuk lingkaran sempurna dengan Matahari di pusatnya',
          'Orbit berbentuk elips dengan Matahari di pusat geometri elips',
          'Orbit berbentuk parabola mengelilingi Matahari',
        ],
        explanation: 'Hukum I Kepler menyatakan lintasan planet berbentuk elips dengan Matahari terletak di salah satu dari dua titik fokus elips.',
      };
    },
  ],

  astrofisika: [
    // 1. Stefan Boltzmann Luminosity Ratio
    () => {
      const rMults = [2, 3, 4, 5, 8, 10];
      const R = rMults[Math.floor(Math.random() * rMults.length)];
      const lum = R * R;
      return {
        module: 'Astrofisika Stellar',
        code: `MOD_02 // STEFAN_BOLTZMANN_R${R}`,
        title: 'Luminositas Bintang (Hukum Stefan-Boltzmann)',
        topicBadge: 'Radiasi Bintang',
        figLabel: `FIG 1: Stellar Radius R = ${R} R_sun`,
        question: `Dua buah bintang memiliki suhu permukaan efektif yang persis sama (T1 = T2). Jika Bintang A memiliki radius R = ${R} R_☉ (radius Matahari) dan Bintang B berukuran 1 R_☉, berapakah luminositas Bintang A relatif terhadap Bintang B?`,
        correctText: `${lum} kali lebih terang`,
        wrongTexts: [`${R} kali lebih terang`, `${lum * 2} kali lebih terang`, `${R * 3} kali lebih terang`],
        explanation: `Luminositas L = 4π R² σ T⁴. Karena suhu T sama, L_A / L_B = (R_A / R_B)² = ${R}² = ${lum} kali lebih terang.`,
      };
    },
    // 2. Wien Law Peak Wavelength
    () => {
      const temps = [3000, 5800, 10000, 20000];
      const T = temps[Math.floor(Math.random() * temps.length)];
      const lambdaNm = Math.round((2.898e6) / T);
      return {
        module: 'Astrofisika Stellar',
        code: `MOD_02 // WIEN_LAW_T${T}`,
        title: 'Hukum Pergeseran Wien',
        topicBadge: 'Radiasi Benda Hitam',
        figLabel: `FIG 2: Blackbody Radiation Peak T = ${T} K`,
        question: `Sebuah bintang memiliki suhu permukaan T = ${T} Kelvin. Berapakah panjang gelombang emisi puncak (λ_max) radiasi bintang tersebut menurut Hukum Pergeseran Wien? (b = 2.898 × 10⁻³ m·K)`,
        correctText: `${lambdaNm} nm`,
        wrongTexts: [`${Math.round(lambdaNm * 1.4)} nm`, `${Math.round(lambdaNm * 0.7)} nm`, '100 nm'],
        explanation: `Hukum Wien λ_max = b / T = (2.898 × 10⁻³ m·K) / ${T} K ≈ ${lambdaNm} nm.`,
      };
    },
    // 3. White Dwarf HR Location
    () => {
      return {
        module: 'Astrofisika Stellar',
        code: 'MOD_02 // HR_WHITE_DWARF',
        title: 'Posisi Katai Putih di Diagram H-R',
        topicBadge: 'Diagram H-R',
        figLabel: 'FIG 3: Hertzsprung-Russell Scatter Plot',
        question: 'Dalam Diagram Hertzsprung-Russell, di wilayah manakah bintang katai putih (White Dwarfs) terletak?',
        correctText: 'Di bagian kiri bawah (suhu tinggi, luminositas amat rendah)',
        wrongTexts: [
          'Di bagian kanan atas (suhu rendah, luminositas tinggi)',
          'Di bagian kiri atas (suhu tinggi, luminositas tinggi)',
          'Di sepanjang garis diagonal Deret Utama',
        ],
        explanation: 'Katai Putih berukuran kecil (seukuran Bumi) sehingga kecerahannya redup (bawah), namun permukaannya amat panas (kiri).',
      };
    },
    // 4. Chandrasekhar Limit
    () => {
      return {
        module: 'Astrofisika Stellar',
        code: 'MOD_02 // CHANDRASEKHAR_LIMIT',
        title: 'Batas Chandrasekhar Katai Putih',
        topicBadge: 'Evolusi Stellar',
        figLabel: 'FIG 4: Electron Degeneracy Pressure Threshold',
        question: 'Berapakah nilai Batas Chandrasekhar yang menentukan batas massa maksimum bagi sebuah bintang katai putih yang stabil?',
        correctText: '1.44 Massa Matahari (M_☉)',
        wrongTexts: ['3.00 Massa Matahari (M_☉)', '0.08 Massa Matahari (M_☉)', '8.00 Massa Matahari (M_☉)'],
        explanation: 'Batas Chandrasekhar adalah 1.44 M_☉. Jika massa katai putih melampaui batas ini, tekanan degenerasi elektronnya gagal menahan gravitasi.',
      };
    },
    // 5. Morgan-Keenan Order
    () => {
      return {
        module: 'Astrofisika Stellar',
        code: 'MOD_02 // SPECTRAL_TYPES',
        title: 'Urutan Kelas Spektrum Bintang',
        topicBadge: 'Spektroskopi',
        figLabel: 'FIG 5: Stellar Spectral Classification Sequence',
        question: 'Urutan kelas spektrum bintang Morgan-Keenan dari yang bersuhu permukaan paling panas hingga paling dingin adalah:',
        correctText: 'O - B - A - F - G - K - M',
        wrongTexts: [
          'M - K - G - F - A - B - O',
          'A - B - F - G - K - M - O',
          'O - A - B - G - F - M - K',
        ],
        explanation: 'Urutan kelas spektrum dari terpanas ke terdingin: O (>30.000K), B, A, F, G (seperti Matahari ~5.800K), K, dan M (<3.700K).',
      };
    },
    // 6. p-p chain vs CNO
    () => {
      return {
        module: 'Astrofisika Stellar',
        code: 'MOD_02 // PP_CHAIN_FUSION',
        title: 'Fusi Rantai Proton-Proton',
        topicBadge: 'Energi Stellar',
        figLabel: 'FIG 6: Proton-Proton Chain Reaction Diagram',
        question: 'Reaksi fusi nuklir utama yang mengubah Hidrogen menjadi Helium di dalam inti bintang bermassa seukuran Matahari adalah:',
        correctText: 'Rantai Proton-Proton (p-p chain)',
        wrongTexts: ['Siklus CNO', 'Proses Triple-Alpha', 'Fusi Karbon-Oksigen'],
        explanation: 'Bintang bermassa seukuran Matahari (T_inti ~15 juta K) didominasi oleh Rantai Proton-Proton (p-p chain).',
      };
    },
    // 7. Hydrostatic Equilibrium
    () => {
      return {
        module: 'Astrofisika Stellar',
        code: 'MOD_02 // HYDROSTATIC_BAL',
        title: 'Keseimbangan Hidrostatik Bintang',
        topicBadge: 'Struktur Stellar',
        figLabel: 'FIG 7: Gravity vs Gas Pressure Balance',
        question: 'Keseimbangan Hidrostatik pada sebuah bintang Deret Utama terjadi akibat keseimbangan antara dua gaya, yaitu:',
        correctText: 'Gaya gravitasi internal ke dalam dan tekanan gas/radiasi termal ke luar',
        wrongTexts: [
          'Gaya magnetik dan gaya listrik',
          'Kecepatan rotasi sumbu dan medan gravitasi luar',
          'Massa bintang dan tekanan foton eksternal',
        ],
        explanation: 'Keseimbangan Hidrostatik menjaga bintang stabil di mana tarik gravitasi ke dalam diimbangi dorongan tekanan gas termal ke luar.',
      };
    },
    // 8. Neutron Star Degeneracy
    () => {
      return {
        module: 'Astrofisika Stellar',
        code: 'MOD_02 // NEUTRON_STAR_DEG',
        title: 'Tekanan Degenerasi Bintang Neutron',
        topicBadge: 'Sisa Stellar',
        figLabel: 'FIG 8: Neutron Degeneracy Pressure Vector',
        question: 'Gaya fisik apakah yang menahan keruntuhan gravitasi pada sebuah Bintang Neutron?',
        correctText: 'Tekanan degenerasi neutron',
        wrongTexts: ['Tekanan degenerasi elektron', 'Tekanan fusi hidrostatik', 'Tekanan medan elektromagnetik'],
        explanation: 'Bintang Neutron ditahan oleh Tekanan Degeneracy Neutron berdasarkan Prinsip Larangan Pauli.',
      };
    },
    // 9. Supernova Type Ia vs II
    () => {
      return {
        module: 'Astrofisika Stellar',
        code: 'MOD_02 // SUPERNOVA_TYPE_IA',
        title: 'Supernova Tipe Ia vs Tipe II',
        topicBadge: 'Evolusi Stellar',
        figLabel: 'FIG 9: Thermonuclear vs Core Collapse Explosions',
        question: 'Supernova jenis manakah yang dipicu oleh ledakan termonuklir penuh pada bintang Katai Putih yang menyerap materi pasangan melebihi batas Chandrasekhar?',
        correctText: 'Supernova Tipe Ia',
        wrongTexts: ['Supernova Tipe II', 'Supernova Tipe Ib', 'Nova Katai'],
        explanation: 'Supernova Tipe Ia terjadi akibat ledakan termonuklir katai putih pada sistem biner. Tipe II berasal dari keruntuhan inti bintang masif.',
      };
    },
    // 10. Schwarzschild Radius
    () => {
      const mSolars = [3, 5, 10, 20, 50];
      const M = mSolars[Math.floor(Math.random() * mSolars.length)];
      const rs = M * 3; // Approx 3km per solar mass
      return {
        module: 'Astrofisika Stellar',
        code: `MOD_02 // SCHWARZSCHILD_M${M}`,
        title: 'Radius Schwarzschild Lubang Hitam',
        topicBadge: 'Lubang Hitam',
        figLabel: `FIG 10: Black Hole Event Horizon (M = ${M} M_sun)`,
        question: `Berapakah perkiraan Radius Event Horizon (Radius Schwarzschild, r_s ≈ 3 km/M_☉) bagi sebuah Lubang Hitam bermassa M = ${M} Massa Matahari?`,
        correctText: `Sekitar ${rs} km`,
        wrongTexts: [`Sekitar ${rs * 10} km`, `Sekitar ${M} km`, `Sekitar ${rs * 3} km`],
        explanation: `Radius Schwarzschild r_s = 2GM / c² ≈ 3 km × M_☉. Untuk ${M} M_☉, r_s ≈ 3 × ${M} = ${rs} km.`,
      };
    },
  ],

  'tata-surya': [
    // 1. Mercury Highest Eccentricity
    () => {
      return {
        module: 'Sistem Tata Surya',
        code: 'MOD_03 // MERCURY_ECC',
        title: 'Eksentrisitas Orbit Planet',
        topicBadge: 'Karakteristik Planet',
        figLabel: 'FIG 1: Planetary Orbit Ellipticity',
        question: 'Di antara 8 planet utama di Tata Surya kita, planet manakah yang memiliki orbit dengan eksentrisitas tertinggi (paling elips)?',
        correctText: 'Merkurius (e ≈ 0.205)',
        wrongTexts: ['Mars (e ≈ 0.093)', 'Bumi (e ≈ 0.017)', 'Venus (e ≈ 0.007)'],
        explanation: 'Merkurius memiliki eksentrisitas orbit paling tinggi (e ≈ 0.205), menjadikan bentuk orbitnya paling lonjong.',
      };
    },
    // 2. Asteroid Belt Distance
    () => {
      const dVals = [4, 9, 16];
      const d = dVals[Math.floor(Math.random() * dVals.length)];
      const T = Math.round(Math.pow(d, 1.5));
      return {
        module: 'Sistem Tata Surya',
        code: `MOD_03 // ASTEROID_PERIOD_D${d}`,
        title: 'Periode Orbit Asteroid',
        topicBadge: 'Hukum Kepler',
        figLabel: `FIG 2: Asteroid Orbit d = ${d} AU`,
        question: `Sebuah asteroid mengorbit Matahari di Sabuk Utama pada jarak rata-rata d = ${d} AU. Berapakah periode revolusi asteroid tersebut?`,
        correctText: `${T} tahun`,
        wrongTexts: [`${d * 2} tahun`, `${d} tahun`, `${d * d} tahun`],
        explanation: `Berdasarkan Hukum III Kepler T² = a³. Untuk a = ${d} AU, T = √(${d}³) = ${T} tahun.`,
      };
    },
    // 3. Main Asteroid Belt Location
    () => {
      return {
        module: 'Sistem Tata Surya',
        code: 'MOD_03 // ASTEROID_LOCATION',
        title: 'Lokasi Sabuk Asteroid Utama',
        topicBadge: 'Sabuk Asteroid',
        figLabel: 'FIG 3: Main Asteroid Zone Distribution',
        question: 'Sabuk Asteroid Utama di Tata Surya kita terbentang di antara lintasan orbit planet manakah?',
        correctText: 'Antara Mars dan Jupiter',
        wrongTexts: ['Antara Bumi dan Mars', 'Antara Jupiter dan Saturnus', 'Antara Venus dan Bumi'],
        explanation: 'Sabuk Asteroid Utama terletak di antara orbit Mars (~1.5 AU) dan Jupiter (~5.2 AU).',
      };
    },
    // 4. Terrestrial vs Jovian Planets
    () => {
      return {
        module: 'Sistem Tata Surya',
        code: 'MOD_03 // TERRESTRIAL_VS_JOVIAN',
        title: 'Planet Terestrial vs Jovian',
        topicBadge: 'Klasifikasi Planet',
        figLabel: 'FIG 4: Terrestrial Rocky Surface Structure',
        question: 'Manakah ciri khas utama kelompok Planet Terestrial (Merkurius, Venus, Bumi, Mars) dibandingkan Planet Jovian?',
        correctText: 'Memiliki permukaan padat dari batuan/logam dan berdensitas tinggi',
        wrongTexts: [
          'Didominasi gas Hidrogen/Helium dan tak berpermukaan padat',
          'Memiliki sistem cincin yang amat tebal',
          'Memiliki puluhan satelit alami',
        ],
        explanation: 'Planet Terestrial berpermukaan padat berbatu dengan densitas tinggi (>3.9 g/cm³), berbeda dari planet Jovian raksasa gas.',
      };
    },
    // 5. Kuiper Belt vs Oort Cloud
    () => {
      return {
        module: 'Sistem Tata Surya',
        code: 'MOD_03 // KUIPER_VS_OORT',
        title: 'Sabuk Kuiper & Komet Periode Pendek',
        topicBadge: 'Trans-Neptunian',
        figLabel: 'FIG 5: Kuiper Disk Region',
        question: 'Wilayah es berbentuk piringan di luar orbit Neptunus (30-50 AU) yang menjadi tempat asal komet periode pendek adalah:',
        correctText: 'Sabuk Kuiper (Kuiper Belt)',
        wrongTexts: ['Awan Oort', 'Sabuk Asteroid', 'Awan Hill'],
        explanation: 'Sabuk Kuiper berada di luar Neptunus (30-50 AU) dan menjadi asal komet periode pendek (<200 tahun). Awan Oort jauh lebih luar (hingga 50.000 AU).',
      };
    },
    // 6. Titan Satellite Atmosphere
    () => {
      return {
        module: 'Sistem Tata Surya',
        code: 'MOD_03 // TITAN_ATM',
        title: 'Atmosfer Satelit Titan',
        topicBadge: 'Satelit Alami',
        figLabel: 'FIG 6: Titan Nitrogen Atmosphere Composition',
        question: 'Satelit alami Saturnus yang unik karena merupakan satu-satunya satelit di Tata Surya dengan atmosfer tebal berunsur dominan Nitrogen adalah:',
        correctText: 'Titan',
        wrongTexts: ['Enceladus', 'Europa', 'Ganymede'],
        explanation: 'Titan memiliki atmosfer tebal kaya Nitrogen (~95%) dan danau hidrokarbon cair.',
      };
    },
    // 7. Venus Retrograde Spin
    () => {
      return {
        module: 'Sistem Tata Surya',
        code: 'MOD_03 // VENUS_SPIN',
        title: 'Rotasi Retrograd Venus',
        topicBadge: 'Rotasi Planet',
        figLabel: 'FIG 7: Venus Retrograde Rotation Vector',
        question: 'Planet Venus memiliki keunikan rotasi retrograd. Ini berarti dari utara ekliptika, Venus berotasi pada sumbunya dari arah:',
        correctText: 'Timur ke Barat (searah jarum jam)',
        wrongTexts: [
          'Barat ke Timur (berlawanan jarum jam)',
          'Utara ke Selatan',
          'Venus tidak berotasi sama sekali',
        ],
        explanation: 'Venus berotasi dari Timur ke Barat (retrograd), berlawanan dari mayoritas planet lain yang berotasi dari Barat ke Timur.',
      };
    },
    // 8. Saturn Ring Ice Particles
    () => {
      return {
        module: 'Sistem Tata Surya',
        code: 'MOD_03 // SATURN_RINGS',
        title: 'Komposisi Cincin Saturnus',
        topicBadge: 'Cincin Planet',
        figLabel: 'FIG 8: Saturn Ice Ring Particles Spectrum',
        question: 'Komposisi utama penyusun sistem cincin Saturnus adalah:',
        correctText: '99% partikel es air dan debu berbatu',
        wrongTexts: ['Gas metana murni', 'Kumpulan besi cair', 'Plasma terionisasi'],
        explanation: 'Cincin Saturnus terdiri dari 99% pecahan es air murni dengan ukuran dari mikrometer hingga seukuran rumah.',
      };
    },
    // 9. Comet Ion Tail Solar Wind
    () => {
      return {
        module: 'Sistem Tata Surya',
        code: 'MOD_03 // COMET_ION_TAIL',
        title: 'Orientasi Ekor Komet',
        topicBadge: 'Komet',
        figLabel: 'FIG 9: Solar Wind Comet Tail Push',
        question: 'Arah ekor gas terionisasi (ion tail) sebuah komet ketika mendekati Matahari selalu menunjuk ke arah:',
        correctText: 'Selalu menunjuk menjauhi Matahari akibat dorongan angin surya',
        wrongTexts: [
          'Selalu menuju ke arah Matahari',
          'Tegak lurus terhadap orbit',
          'Mengikuti persis jejak di belakang lintasan komet',
        ],
        explanation: 'Angin surya dan tekanan radiasi Matahari selalu menolak gas terionisasi komet sehingga ekor selalu menunjuk menjauhi Matahari.',
      };
    },
    // 10. Ganymede Size
    () => {
      return {
        module: 'Sistem Tata Surya',
        code: 'MOD_03 // GANYMEDE_SIZE',
        title: 'Satelit Terbesar Ganymede',
        topicBadge: 'Satelit Jupiter',
        figLabel: 'FIG 10: Ganymede vs Mercury Size Comparison',
        question: 'Satelit alami terbesar di Tata Surya yang ukurannya bahkan lebih besar daripada planet Merkurius adalah:',
        correctText: 'Ganymede (Satelit Jupiter)',
        wrongTexts: ['Titan (Satelit Saturnus)', 'Callisto (Satelit Jupiter)', 'Io (Satelit Jupiter)'],
        explanation: 'Ganymede adalah satelit terbesar di Tata Surya dengan diameter 5.268 km (lebih besar dari Merkurius 4.879 km).',
      };
    },
  ],

  'astronomi-bola': [
    // 1. Sidereal vs Solar Day Diff Calculation
    () => {
      return {
        module: 'Astronomi Bola',
        code: 'MOD_01 // SIDEREAL_SOLAR_DIFF',
        title: 'Hari Sideris vs Hari Matahari',
        topicBadge: 'Rotasi Bumi',
        figLabel: 'FIG 1: Earth Orbit Motion 1 Degree Shift',
        question: 'Mengapa durasi 1 Hari Sideris (23j 56m 4s) lebih pendek sekitar 4 menit daripada 1 Hari Matahari rata-rata (24j)?',
        correctText: 'Bumi bergerak maju ~1° pada orbitnya mengelilingi Matahari setiap hari',
        wrongTexts: [
          'Kecepatan rotasi Bumi melambat saat malam hari',
          'Presesi sumbu Bumi memutar polaris',
          'Refraksi atmosfer membiaskan cahaya di horizon',
        ],
        explanation: 'Karena Bumi berevolusi ~1°/hari mengelilingi Matahari, Bumi harus berotasi ekstra ~1° (~4 menit) agar Matahari kembali berada di meridian sama.',
      };
    },
    // 2. Equatorial System RA Dec
    () => {
      return {
        module: 'Astronomi Bola',
        code: 'MOD_01 // EQUATORIAL_CONST',
        title: 'Sistem Koordinat Ekuator',
        topicBadge: 'Bola Langit',
        figLabel: 'FIG 2: Celestial Sphere Right Ascension & Dec Grid',
        question: 'Komponen koordinat bola langit manakah yang konstan dan tidak berubah akibat rotasi harian Bumi?',
        correctText: 'Asensio Rekta (RA) & Deklinasi (Dec)',
        wrongTexts: ['Altitude & Azimuth', 'Sudut Jam (Hour Angle) & Altitude', 'Zenith & Nadir'],
        explanation: 'Sistem Ekuator (RA & Dec) terikat pada bola langit independen dari rotasi harian Bumi dan lokasi pengamat.',
      };
    },
    // 3. Celestial Equator Declination
    () => {
      return {
        module: 'Astronomi Bola',
        code: 'MOD_01 // CELESTIAL_EQ_DEC',
        title: 'Deklinasi Ekuator Langit',
        topicBadge: 'Ekuator Langit',
        figLabel: 'FIG 3: Celestial Equator Projection',
        question: 'Berapakah nilai Deklinasi (Dec) untuk semua objek langit yang terletak di garis Ekuator Langit?',
        correctText: '0°',
        wrongTexts: ['+90°', '-90°', '+23.5°'],
        explanation: 'Ekuator Langit adalah proyeksi Ekuator Bumi ke bola langit, sehingga Deklinasinya persis 0°.',
      };
    },
    // 4. Zenith & Nadir Altitude
    () => {
      return {
        module: 'Astronomi Bola',
        code: 'MOD_01 // ZENITH_NADIR_ALT',
        title: 'Titik Zenith dan Nadir',
        topicBadge: 'Horizon Lokal',
        figLabel: 'FIG 4: Zenith Overhead & Nadir Axis',
        question: 'Titik Zenith di bola langit didefinisikan sebagai titik yang memiliki nilai Altitude (ketinggian) sebesar:',
        correctText: '+90° (Tepat tegak lurus di atas kepala)',
        wrongTexts: ['0° (Di garis horizon)', '-90° (Tepat di bawah kaki)', '+23.5°'],
        explanation: 'Zenith adalah titik teratas bola langit tepat di atas kepala pengamat (Altitude = +90°). Nadir berada di bawah kaki (-90°).',
      };
    },
    // 5. Hour Angle at Transit
    () => {
      return {
        module: 'Astronomi Bola',
        code: 'MOD_01 // HOUR_ANGLE_TRANSIT',
        title: 'Sudut Jam pada Meridian',
        topicBadge: 'Waktu Lokal',
        figLabel: 'FIG 5: Hour Angle Meridian Crossing',
        question: 'Berapakah nilai Sudut Jam (Hour Angle) sebuah bintang ketika bintang tersebut tepat melintas di garis Meridian Pengamat (Culmination)?',
        correctText: '0 Jam (0h)',
        wrongTexts: ['6 Jam (6h)', '12 Jam (12h)', '24 Jam (24h)'],
        explanation: 'Sudut Jam HA = LST - RA. Saat bintang berada di meridian lokal, LST = RA sehingga HA = 0 jam.',
      };
    },
    // 6. Precession Cycle
    () => {
      return {
        module: 'Astronomi Bola',
        code: 'MOD_01 // PRECESSION_CYCLE',
        title: 'Presesi Ekuinox',
        topicBadge: 'Gerak Sumbu Bumi',
        figLabel: 'FIG 6: Earth Precession Cone Cycle',
        question: 'Presesi sumbu rotasi Bumi yang disebabkan oleh gaya pasang surut Matahari dan Bulan memerlukan waktu berapa lama untuk 1 siklus lingkaran penuh?',
        correctText: 'Sekitar 25,772 Tahun',
        wrongTexts: ['Sekitar 365 Hari', 'Sekitar 100 Tahun', 'Sekitar 1,000 Tahun'],
        explanation: 'Presesi ekuinox membuat kutub langit bergeser mengelilingi kutub ekliptika dengan periode ~25,772 tahun.',
      };
    },
    // 7. Circumpolar Condition
    () => {
      return {
        module: 'Astronomi Bola',
        code: 'MOD_01 // CIRCUMPOLAR_COND',
        title: 'Syarat Bintang Sirkumpolar',
        topicBadge: 'Bintang Sirkumpolar',
        figLabel: 'FIG 7: Circumpolar Star Trails Circle',
        question: 'Untuk pengamat di lintang φ di belahan Bumi Utara, bintang dengan deklinasi δ akan menjadi Sirkumpolar (tidak pernah terbenam) jika:',
        correctText: 'δ ≥ 90° - φ',
        wrongTexts: ['δ ≤ φ', 'δ = 0°', 'δ ≥ 90° + φ'],
        explanation: 'Syarat bintang sirkumpolar (selalu di atas horizon) untuk pengamat lintang utara φ adalah Dec δ ≥ 90° - φ.',
      };
    },
    // 8. Atmospheric Refraction Shift
    () => {
      return {
        module: 'Astronomi Bola',
        code: 'MOD_01 // REFRACTION_SHIFT',
        title: 'Refraksi Atmosfer di Horizon',
        topicBadge: 'Koreksi Horizon',
        figLabel: 'FIG 8: Light Ray Bending near Horizon',
        question: 'Refraksi atmosfer menyebabkan posisi tampak suatu objek langit di dekat horizon terlihat:',
        correctText: 'Lebih tinggi dari posisi sebenarnya (terangkat ~34\' busur)',
        wrongTexts: [
          'Lebih rendah dari posisi sebenarnya',
          'Bergeser ke arah barat',
          'Tidak mengalami perubahan posisi',
        ],
        explanation: 'Pembiasan atmosfer membengkokkan berkas cahaya ke bawah, membuat objek di dekat horizon tampak terangkat ~34\' busur.',
      };
    },
    // 9. Ecliptic Obliquity Angle
    () => {
      return {
        module: 'Astronomi Bola',
        code: 'MOD_01 // OBLIQUITY_ANGLE',
        title: 'Kemiringan Ekliptika',
        topicBadge: 'Ekliptika',
        figLabel: 'FIG 9: Ecliptic Obliquity Tilt Angle',
        question: 'Sudut kemiringan bidang Ekliptika (lintasan tahunan Matahari) terhadap Ekuator Langit adalah sekitar:',
        correctText: '23.44° (sekitar 23.5°)',
        wrongTexts: ['45.00°', '0.00°', '90.00°'],
        explanation: 'Sudut obliquity ε ≈ 23.44° disebabkan oleh kemiringan sumbu rotasi Bumi terhadap bidang orbitnya.',
      };
    },
    // 10. Spherical Triangle PZX
    () => {
      return {
        module: 'Astronomi Bola',
        code: 'MOD_01 // PZX_TRIANGLE',
        title: 'Segitiga Bola Navigasi PZX',
        topicBadge: 'Trigonometri Bola',
        figLabel: 'FIG 10: PZX Navigational Spherical Triangle',
        question: 'Dalam Navigasi Astronomi, Segitiga Bola PZX dibentuk oleh tiga titik utama di bola langit, yaitu:',
        correctText: 'Kutub Langit (P), Zenith (Z), dan Bintang/Objek Langit (X)',
        wrongTexts: [
          'Planet (P), Zenith (Z), dan Ekuator (X)',
          'Polaris (P), Zenith (Z), dan Ekliptika (X)',
          'Pusat Galaksi (P), Zenith (Z), dan X-ray (X)',
        ],
        explanation: 'Segitiga Navigasi PZX menghubungkan Kutub Langit P, Zenith Pengamat Z, dan Posisi Bintang/Objek X.',
      };
    },
  ],

  observasi: [
    // 1. Telescope Magnification
    () => {
      const fObjs = [800, 1000, 1200, 1500, 2000];
      const fEyes = [8, 10, 20, 25];
      const fObj = fObjs[Math.floor(Math.random() * fObjs.length)];
      const fEye = fEyes[Math.floor(Math.random() * fEyes.length)];
      const mag = Math.round(fObj / fEye);
      return {
        module: 'Instrumen & Observasi',
        code: `MOD_05 // MAGNIFICATION_F${fObj}_E${fEye}`,
        title: 'Perbesaran Teleskop Optik',
        topicBadge: 'Optika Teleskop',
        figLabel: `FIG 1: f_obj = ${fObj}mm, f_eye = ${fEye}mm`,
        question: `Sebuah teleskop memiliki panjang fokus obyektif f_obj = ${fObj} mm dan eyepiece f_eye = ${fEye} mm. Berapakah perbesaran anguler teleskop tersebut?`,
        correctText: `${mag} kali`,
        wrongTexts: [`${Math.round(mag * 0.5)} kali`, `${mag * 2} kali`, `${fObj} kali`],
        explanation: `Perbesaran M = f_obj / f_eye = ${fObj} mm / ${fEye} mm = ${mag} kali.`,
      };
    },
    // 2. Magnitude Brightness Ratio
    () => {
      const magDiffs = [2, 3, 5];
      const dm = magDiffs[Math.floor(Math.random() * magDiffs.length)];
      const ratio = Math.round(Math.pow(100, dm / 5));
      return {
        module: 'Instrumen & Observasi',
        code: `MOD_05 // POGSON_SCALE_DM${dm}`,
        title: 'Skala Magnitudo Pogson',
        topicBadge: 'Fotometri',
        figLabel: `FIG 2: Δm = ${dm} Magnitude Difference`,
        question: `Dua buah bintang memiliki selisih magnitudo tampak sebesar Δm = ${dm} magnitudo. Berapa kali perbandingan fluks kecerahan kedua bintang tersebut?`,
        correctText: `${ratio} kali`,
        wrongTexts: [`${dm * 10} kali`, `${dm * 2} kali`, `${ratio * 2} kali`],
        explanation: `Berdasarkan Skala Pogson, rasio fluks F1/F2 = (100)^(Δm / 5) = (100)^(${dm}/5) = ${ratio} kali.`,
      };
    },
    // 3. CCD Quantum Efficiency
    () => {
      return {
        module: 'Instrumen & Observasi',
        code: 'MOD_05 // CCD_QUANTUM_EFF',
        title: 'Keunggulan Sensor CCD',
        topicBadge: 'Sensor CCD',
        figLabel: 'FIG 3: CCD Quantum Efficiency Curve',
        question: 'Keunggulan utama sensor detektor CCD (Charge-Coupled Device) dibanding pelat fotografi emulsi kuno adalah:',
        correctText: 'Efisiensi Kuantum (Quantum Efficiency) yang sangat tinggi hingga ~90%',
        wrongTexts: [
          'Ukuran fisik CCD seukuran lapangan sepak bola',
          'CCD tidak membutuhkan listrik',
          'CCD dapat menekuk secara fisik',
        ],
        explanation: 'CCD memiliki Efisiensi Kuantum tinggi (~90%), menangkap 90% foton yang masuk dibanding pelat fotografi kuno yang hanya ~1-2%.',
      };
    },
    // 4. Rayleigh Criterion Aperture
    () => {
      return {
        module: 'Instrumen & Observasi',
        code: 'MOD_05 // RAYLEIGH_CRITERION',
        title: 'Resolusi Anguler & Rayleigh',
        topicBadge: 'Resolusi Teleskop',
        figLabel: 'FIG 4: Airy Disk Rayleigh Limit',
        question: 'Bagaimana cara paling efektif untuk meningkatkan daya pisah (resolusi sudut θ) sebuah teleskop optik berdasarkan Kriteria Rayleigh θ = 1.22 λ / D?',
        correctText: 'Memperbesar diameter apertur cermin/lensa utama (D)',
        wrongTexts: [
          'Memperpanjang panjang fokus eyepiece',
          'Menggunakan filter cahaya berpanjang gelombang lebih panjang',
          'Mengurangi ukuran sensor detector',
        ],
        explanation: 'θ = 1.22 λ / D. Semakin besar diameter apertur D, nilai limit sudut θ semakin kecil, yang berarti resolusi detail semakin tajam.',
      };
    },
    // 5. Chromatic Aberration in Refractors
    () => {
      return {
        module: 'Instrumen & Observasi',
        code: 'MOD_05 // CHROMATIC_ABERRATION',
        title: 'Aberasi Kromatis pada Lensa',
        topicBadge: 'Cacat Optik',
        figLabel: 'FIG 5: Lens Focal Dispersion Color Fringe',
        question: 'Mengapa teleskop jenis reflektor (cermin) bebas dari masalah Aberasi Kromatis (cacat warna)?',
        correctText: 'Hukum pemantulan cahaya pada cermin tidak bergantung pada panjang gelombang cahaya',
        wrongTexts: [
          'Cermin membiaskan semua warna pada titik fokus yang sama',
          'Cermin menyerap gelombang merah dan biru',
          'Cermin dibuat dari bahan kaca achromatic',
        ],
        explanation: 'Pemantulan (refleksi) cermin berlaku sama untuk semua warna, sedangkan pembiasan (refraksi) lensa membiaskan warna dengan sudut berbeda.',
      };
    },
    // 6. Cassegrain Reflector Mirror Setup
    () => {
      return {
        module: 'Instrumen & Observasi',
        code: 'MOD_05 // CASSEGRAIN_REFLECTOR',
        title: 'Desain Teleskop Cassegrain',
        topicBadge: 'Reflektor Optik',
        figLabel: 'FIG 6: Primary Parabolic & Secondary Hyperbolic Mirrors',
        question: 'Teleskop reflektor jenis Cassegrain menggunakan kombinasi cermin utama dan cermin sekunder berupa:',
        correctText: 'Cermin utama Parabola (cekung) dan Cermin sekunder Hiperbola (cembung)',
        wrongTexts: [
          'Cermin utama Datar dan Cermin sekunder Cekung',
          'Cermin utama Lensa dan Cermin sekunder Datar',
          'Dua cermin datar sejajar',
        ],
        explanation: 'Desain Cassegrain menggunakan cermin utama cekung paraboloid dan cermin sekunder cembung hiperboloid untuk mengarahkan fokus ke belakang cermin utama.',
      };
    },
    // 7. Adaptive Optics Turbulence Correction
    () => {
      return {
        module: 'Instrumen & Observasi',
        code: 'MOD_05 // ADAPTIVE_OPTICS',
        title: 'Teknologi Adaptif Optik',
        topicBadge: 'Adaptif Optik',
        figLabel: 'FIG 7: Deformable Mirror Wavefront Correction',
        question: 'Fungsi utama dari teknologi Adaptif Optik (Adaptive Optics) pada teleskop berbasis permukaan Bumi adalah:',
        correctText: 'Mengkoreksi distorsi gambar akibat turbulensi atmosfer secara real-time',
        wrongTexts: [
          'Memperbesar fisik diameter cermin teleskop',
          'Mengubah warna bintang dari merah menjadi biru',
          'Mencegah radiasi sinar kosmik masuk ke sensor',
        ],
        explanation: 'Adaptif optik menggunakan cermin fleksibel yang diubah bentuknya ribuan kali per detik untuk membatalkan blur turbulensi atmosfer.',
      };
    },
    // 8. B-V Color Index Temperature
    () => {
      return {
        module: 'Instrumen & Observasi',
        code: 'MOD_05 // COLOR_INDEX_BV',
        title: 'Indeks Warna (B - V) Fotometri',
        topicBadge: 'Indeks Warna',
        figLabel: 'FIG 8: B - V Color Index Temperature Curve',
        question: 'Indeks Warna (B - V) diukur dari selisih magnitudo pita Biru (B) dan Visual (V). Bintang dengan nilai (B - V) negatif atau mendekati 0 menandakan:',
        correctText: 'Bintang bersuhu permukaan sangat panas (berwarna kebiruan)',
        wrongTexts: [
          'Bintang bersuhu permukaan sangat dingin (berwarna kemerahan)',
          'Bintang tidak memancarkan cahaya',
          'Bintang berjarak sangat dekat',
        ],
        explanation: 'Semakin kecil/negatif nilai indeks warna (B - V), semakin terang bintang pada pita biru dibanding visual, yang menandakan suhu permukaan sangat tinggi.',
      };
    },
    // 9. Radio Interferometry Aperture Synthesis
    () => {
      return {
        module: 'Instrumen & Observasi',
        code: 'MOD_05 // RADIO_INTERFEROMETRY',
        title: 'Interferometri Radio',
        topicBadge: 'Radio Astronomi',
        figLabel: 'FIG 9: Very Long Baseline Array Baseline',
        question: 'Mengapa teknik Interferometri (seperti VLA atau Event Horizon Telescope) sangat penting dalam observasi radio astronomi?',
        correctText: 'Menggabungkan beberapa teleskop terpisah untuk menghasilkan resolusi sudut setara teleskop seukuran bentangan jarak antar teleskop',
        wrongTexts: [
          'Meningkatkan frekuensi radio menjadi cahaya tampak',
          'Membuat gelombang radio bergerak lebih cepat dari kecepatan cahaya',
          'Menghilangkan sinyal dari satelit buatan',
        ],
        explanation: 'Karena gelombang radio memiliki λ amat besar, interferometri menghubungkan sinyal dari banyak parabola untuk membentuk aperture sintesis raksasa.',
      };
    },
    // 10. Dark Current Cryogenic Cooling
    () => {
      return {
        module: 'Instrumen & Observasi',
        code: 'MOD_05 // DARK_CURRENT_COOLING',
        title: 'Dark Current & Pendinginan Kriogenik',
        topicBadge: 'Noise Sensor',
        figLabel: 'FIG 10: Thermal Electron Noise Reduction',
        question: 'Mengapa sensor kamera CCD astronomi profesional harus didinginkan hingga suhu kriogenik ekstrem (-100 °C)?',
        correctText: 'Untuk meminimalkan noise termal (Dark Current)',
        wrongTexts: [
          'Untuk mencegah cermin meledak',
          'Untuk meningkatkan kecepatan rotasi teleskop',
          'Untuk menambah kecerahan bintang yang difoto',
        ],
        explanation: 'Noise termal (Dark Current) disebabkan oleh eksitasi elektron bebas akibat suhu. Pendinginan kriogenik menekan noise termal ini hingga mendekati nol.',
      };
    },
  ],
};

// Helper function to match 50 EXACT visual images and figure captions 1-to-1 with question codes
const getTopicSpecificImage = (code, topicBadge) => {
  const c = (code || '').toUpperCase();

  // Mekanika Benda Langit (10 Unique Images)
  if (c.includes('KEPLER_3RD')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmgbs9aU9qFkkS3TRGIxAWQD8iPTOhbiO1WI9kHkqCBKA6H5QajxkgyYgT-YhP29yx1i4C2JDD7IGXHBNSoe6eGhAsyVSmdO-l_bJWjEeZvm9bP0T7jjHzXBxWGy3Zuwy9AtvGYn8wsvxrns0NeztelhpNhI0ECEgG7rwOcuC-fxphRAUqLl-D72PdhepUlSe_LydMmyEk_zzW8CUkby6bOoJVaeJtwqZXSpg1e7PAOpis9R9jwd2WFg',
      figLabel: 'FIG 1: Elliptical Semi-Major Axis Orbit'
    };
  }
  if (c.includes('ORBIT_VELOCITY')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeN3Oe_KL6CqDOu-s8bNLUboORQ4XAgAcQ1h9sHgZiFJ8D0OR0X4rcLsXHsg0o4Q8MPisQKtJ5HcRnvZ9Duo1H97XlDT3u7IOTTinVO5Hph56tKIxhh4WDCg_tirVup8K7uhJjX9JYh3yynLBCieHSN3n60LKbA4gwh42ponnXIsNaJXLzTzbIdaglUlqNunLu21o6D053nu1cmbR9CUUfVNX6XU7ANHzHK8_FzOkm1UWGfUB4_FSbAA',
      figLabel: 'FIG 2: Satellite Altitude Circular Speed'
    };
  }
  if (c.includes('ESCAPE_RATIO')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKx_h92kMrSxLNG_ata8QsTI3KOUco219OH9r20yO24JptTRmxP2Hi6Uc0QBhA4LEsF9yfDb-eKakknT9q5PJV4ZJuozC8mcGxl-oKmHq-ytC6iiJOd14cyaiPTV05xyzxqdgScysufwkAaOY2k1yxqC4ojRIpq4W44Ji_2WIr_KOuRZtTu-LUjo5MCwCwLDC9rqULnWTpweSFejjQOQJFvLx0nkbCCm8BWorCBMv_xuZ7vD_FS-JcyQ',
      figLabel: 'FIG 3: Parabolic Escape Trajectory'
    };
  }
  if (c.includes('ROCHE_LIMIT')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKuv3ryHk0-2DzUg3caJqRvHC_8bwBeoW43Bf7futEZf3g2Wc0nX4eZrmln-5VQY5TnMxNak0upAOG1tdOhCufTvnAaRvrvrf5lF2L-ylubdJIBw0BsUIV1UGrWgl8F4y8yxYs2GB92SBSnSdKyKrtw8vv67YGDWMN0jQY2kHQjtBPiAeCj6e6E-BgU501bIEewV1D7fSJdu37RXNkPkHnFS3RNwLbc3E0fAZc7edm6BhzhM8KzQc6Kg',
      figLabel: 'FIG 4: Tidal Disruption Roche Limit'
    };
  }
  if (c.includes('ORBITAL_ENERGY')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Q1phGwgLm7lJNzU8xY0A4Rn3Ygeh05RnoKft484HzqpRiJsqr9BjRzXrmgaGSf39xQcapW-l67nT_2JVq8yWAnd2qarGQ3_b6P2V8U7XhhL06gA0eeKZUEvwuDN5N92Z-kvZgXBBHOhrKn2UcACk0EfiThgQT5RRt6d4ODpVHdptvsUTP8vnz4JSrTYRE4M10wIXcSeQvlSAdnH6viExHUZD0CRs245RMitPO80TIzJaBTqCzSR2ug',
      figLabel: 'FIG 5: Bound Orbit Mechanical Energy'
    };
  }
  if (c.includes('KEPLER_2ND')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtiV2hGLTg8aY5lx32RlkLqTZGZsOOSXkdme-k9tazWkRm46ni5cnj7jT8USNywISI5MEobAeP-MkOsxQwWVylYC5UwjZMeJ_hm1QrS4guBE4dvmNyv-4fpKXIfpxDnLf9mMTg8Ilwpiill3UaZRDlFiCyyUnGkD-q5yQlIYqWPTmn9hqxuZME_Zkhwu24upr-FACw4PnUX_pZhRJxAfFAWAw0dXadGz2Ke8979f20siSbTNtrku03Uw',
      figLabel: 'FIG 6: Perihelion Swept Area Vectors'
    };
  }
  if (c.includes('HOHMANN')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGA7TRZUL8218_4DZS2c2m-aTAWd3wmUjMmZKBSHSx0178-ZxVRI1q8TcZwWxO2EBc-UMGFUicd61ohwsxRswjnd037BI9m1c41sFIYtlvN-gPbOv0ZD54ekp57UCJztAL8obg_R4hGq0SOtkhI7bbYsEctn1DW-TyNsBIcBrZCEl0qK-10EIrkg78oTQzGm4fcJYPdRBcwYet4ml--6WSWLKl4lRo9T6IqhXrAWvF21d3b1CbRfTQmQ',
      figLabel: 'FIG 7: Hohmann Elliptical Transfer'
    };
  }
  if (c.includes('LAGRANGE')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuMOcBVPhBlZ9VhXNUbU93E-2JSch6FV6McaCVVc0UAhv0T8-_EL86U1wP4JRaVwRVJYmvrNQ7SHyPM_1yPi3UfbpcuPIYpz88N5ASiEUr6CiiDCCbDQu9wRrgsgJlRaaKGn_jEoHymBliYVwmdjnaQG71FIgIcGCVGF0e0YgUg1-PUrznHb1RxUox0YSZzOMzRlA7iDwKTpQx341JeKhCzrSBOu__ly3QS3PJ1HZ8XAo2GPmIw36pgw',
      figLabel: 'FIG 8: L1-L5 Equilibrium Points'
    };
  }
  if (c.includes('VIS_VIVA')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6nP1axwjJZ-sTe3574XnPxM3ybO0hEf8yIunPotl4W4sl7PTk8izxV8HdnpcBpocCPOzC-SNaABxouqLpW8t6OnThl4icxvTSMC0lS5kasW0H8mly1JLxxDsrtQbFf4SNXgSfKzAFjFBp4zeJ6LZU_O9ZuZ2i3tKt-DmPezcAbC8TZTGWID1DV1GUhtJ5B_SvI-1yjhjR4gdePzhVDw1qGh1Mac3Y7w50TMoZmjbIkdQ_MGGCaF1ACg',
      figLabel: 'FIG 9: Vis-Viva Kinetic Equation'
    };
  }
  if (c.includes('KEPLER_1ST')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp45Ct_Ubyj0zDpyw2ANceQ3LWIHC6AypqKL2rclQnj-l-JBnrtsjEO0gu-eRyaFf-TiFPqRJ2epguFIyXT4178sTcnZaGFXBSJMIT2tcHf1OygU6k9ggpQfncJfSnE0j2KSs9dUFgpJQfccknjx4CsQXA_Xr__JYrHJEOeAvAbazvTiwpqzVB7I0UyLmixINPKbWU3IzVEvKXK-eY8PxVclxhJKRJv0EQ1STb5cN2fHm9UpW7dQiK2A',
      figLabel: 'FIG 10: Elliptic Focus Geometry'
    };
  }

  // Astrofisika Stellar (10 Unique Images)
  if (c.includes('STEFAN_BOLTZMANN')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF9NXWiWV3V6QOzWPRacNMp6fWphBcXD3Epbkv_FfPSWCfUwRM_5d0uyziHR_J0GgY-rS8dB9HSGINWBLUb8R8CIzePrLzhEYaFFaDyfmEvd8nhSGyDHMTePA9SbJF5m5ZMlnKihuxX6oAN32_-Wtmp57UfBNwFiDAwASItXDpL-vR2pXtaglYlP4LfIfCgD4zmS3afenGXFBWnL75864iQaklebek3wMjQVtr8dbrno50vy-BEHwT2g',
      figLabel: 'FIG 1: Stefan-Boltzmann Radius Radiation'
    };
  }
  if (c.includes('WIEN_LAW')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKuv3ryHk0-2DzUg3caJqRvHC_8bwBeoW43Bf7futEZf3g2Wc0nX4eZrmln-5VQY5TnMxNak0upAOG1tdOhCufTvnAaRvrvrf5lF2L-ylubdJIBw0BsUIV1UGrWgl8F4y8yxYs2GB92SBSnSdKyKrtw8vv67YGDWMN0jQY2kHQjtBPiAeCj6e6E-BgU501bIEewV1D7fSJdu37RXNkPkHnFS3RNwLbc3E0fAZc7edm6BhzhM8KzQc6Kg',
      figLabel: 'FIG 2: Wien Peak Spectrum Curve'
    };
  }
  if (c.includes('WHITE_DWARF')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmgbs9aU9qFkkS3TRGIxAWQD8iPTOhbiO1WI9kHkqCBKA6H5QajxkgyYgT-YhP29yx1i4C2JDD7IGXHBNSoe6eGhAsyVSmdO-l_bJWjEeZvm9bP0T7jjHzXBxWGy3Zuwy9AtvGYn8wsvxrns0NeztelhpNhI0ECEgG7rwOcuC-fxphRAUqLl-D72PdhepUlSe_LydMmyEk_zzW8CUkby6bOoJVaeJtwqZXSpg1e7PAOpis9R9jwd2WFg',
      figLabel: 'FIG 3: White Dwarf HR Region'
    };
  }
  if (c.includes('CHANDRASEKHAR')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeN3Oe_KL6CqDOu-s8bNLUboORQ4XAgAcQ1h9sHgZiFJ8D0OR0X4rcLsXHsg0o4Q8MPisQKtJ5HcRnvZ9Duo1H97XlDT3u7IOTTinVO5Hph56tKIxhh4WDCg_tirVup8K7uhJjX9JYh3yynLBCieHSN3n60LKbA4gwh42ponnXIsNaJXLzTzbIdaglUlqNunLu21o6D053nu1cmbR9CUUfVNX6XU7ANHzHK8_FzOkm1UWGfUB4_FSbAA',
      figLabel: 'FIG 4: Electron Degeneracy Limit'
    };
  }
  if (c.includes('SPECTRAL_TYPES')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKx_h92kMrSxLNG_ata8QsTI3KOUco219OH9r20yO24JptTRmxP2Hi6Uc0QBhA4LEsF9yfDb-eKakknT9q5PJV4ZJuozC8mcGxl-oKmHq-ytC6iiJOd14cyaiPTV05xyzxqdgScysufwkAaOY2k1yxqC4ojRIpq4W44Ji_2WIr_KOuRZtTu-LUjo5MCwCwLDC9rqULnWTpweSFejjQOQJFvLx0nkbCCm8BWorCBMv_xuZ7vD_FS-JcyQ',
      figLabel: 'FIG 5: OBAFGKM Spectral Sequence'
    };
  }
  if (c.includes('PP_CHAIN')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Q1phGwgLm7lJNzU8xY0A4Rn3Ygeh05RnoKft484HzqpRiJsqr9BjRzXrmgaGSf39xQcapW-l67nT_2JVq8yWAnd2qarGQ3_b6P2V8U7XhhL06gA0eeKZUEvwuDN5N92Z-kvZgXBBHOhrKn2UcACk0EfiThgQT5RRt6d4ODpVHdptvsUTP8vnz4JSrTYRE4M10wIXcSeQvlSAdnH6viExHUZD0CRs245RMitPO80TIzJaBTqCzSR2ug',
      figLabel: 'FIG 6: Proton-Proton Core Fusion'
    };
  }
  if (c.includes('HYDROSTATIC')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtiV2hGLTg8aY5lx32RlkLqTZGZsOOSXkdme-k9tazWkRm46ni5cnj7jT8USNywISI5MEobAeP-MkOsxQwWVylYC5UwjZMeJ_hm1QrS4guBE4dvmNyv-4fpKXIfpxDnLf9mMTg8Ilwpiill3UaZRDlFiCyyUnGkD-q5yQlIYqWPTmn9hqxuZME_Zkhwu24upr-FACw4PnUX_pZhRJxAfFAWAw0dXadGz2Ke8979f20siSbTNtrku03Uw',
      figLabel: 'FIG 7: Hydrostatic Pressure Vector'
    };
  }
  if (c.includes('NEUTRON_STAR')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGA7TRZUL8218_4DZS2c2m-aTAWd3wmUjMmZKBSHSx0178-ZxVRI1q8TcZwWxO2EBc-UMGFUicd61ohwsxRswjnd037BI9m1c41sFIYtlvN-gPbOv0ZD54ekp57UCJztAL8obg_R4hGq0SOtkhI7bbYsEctn1DW-TyNsBIcBrZCEl0qK-10EIrkg78oTQzGm4fcJYPdRBcwYet4ml--6WSWLKl4lRo9T6IqhXrAWvF21d3b1CbRfTQmQ',
      figLabel: 'FIG 8: Neutron Degeneracy Core'
    };
  }
  if (c.includes('SUPERNOVA')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuMOcBVPhBlZ9VhXNUbU93E-2JSch6FV6McaCVVc0UAhv0T8-_EL86U1wP4JRaVwRVJYmvrNQ7SHyPM_1yPi3UfbpcuPIYpz88N5ASiEUr6CiiDCCbDQu9wRrgsgJlRaaKGn_jEoHymBliYVwmdjnaQG71FIgIcGCVGF0e0YgUg1-PUrznHb1RxUox0YSZzOMzRlA7iDwKTpQx341JeKhCzrSBOu__ly3QS3PJ1HZ8XAo2GPmIw36pgw',
      figLabel: 'FIG 9: Thermonuclear Supernova Ia'
    };
  }
  if (c.includes('SCHWARZSCHILD')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6nP1axwjJZ-sTe3574XnPxM3ybO0hEf8yIunPotl4W4sl7PTk8izxV8HdnpcBpocCPOzC-SNaABxouqLpW8t6OnThl4icxvTSMC0lS5kasW0H8mly1JLxxDsrtQbFf4SNXgSfKzAFjFBp4zeJ6LZU_O9ZuZ2i3tKt-DmPezcAbC8TZTGWID1DV1GUhtJ5B_SvI-1yjhjR4gdePzhVDw1qGh1Mac3Y7w50TMoZmjbIkdQ_MGGCaF1ACg',
      figLabel: 'FIG 10: Event Horizon Radius'
    };
  }

  // Sistem Tata Surya (10 Unique Images)
  if (c.includes('MERCURY')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtiV2hGLTg8aY5lx32RlkLqTZGZsOOSXkdme-k9tazWkRm46ni5cnj7jT8USNywISI5MEobAeP-MkOsxQwWVylYC5UwjZMeJ_hm1QrS4guBE4dvmNyv-4fpKXIfpxDnLf9mMTg8Ilwpiill3UaZRDlFiCyyUnGkD-q5yQlIYqWPTmn9hqxuZME_Zkhwu24upr-FACw4PnUX_pZhRJxAfFAWAw0dXadGz2Ke8979f20siSbTNtrku03Uw',
      figLabel: 'FIG 1: Mercury Elliptic Orbit'
    };
  }
  if (c.includes('ASTEROID_PERIOD')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmgbs9aU9qFkkS3TRGIxAWQD8iPTOhbiO1WI9kHkqCBKA6H5QajxkgyYgT-YhP29yx1i4C2JDD7IGXHBNSoe6eGhAsyVSmdO-l_bJWjEeZvm9bP0T7jjHzXBxWGy3Zuwy9AtvGYn8wsvxrns0NeztelhpNhI0ECEgG7rwOcuC-fxphRAUqLl-D72PdhepUlSe_LydMmyEk_zzW8CUkby6bOoJVaeJtwqZXSpg1e7PAOpis9R9jwd2WFg',
      figLabel: 'FIG 2: Asteroid Kepler Period Orbit'
    };
  }
  if (c.includes('ASTEROID_LOCATION')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeN3Oe_KL6CqDOu-s8bNLUboORQ4XAgAcQ1h9sHgZiFJ8D0OR0X4rcLsXHsg0o4Q8MPisQKtJ5HcRnvZ9Duo1H97XlDT3u7IOTTinVO5Hph56tKIxhh4WDCg_tirVup8K7uhJjX9JYh3yynLBCieHSN3n60LKbA4gwh42ponnXIsNaJXLzTzbIdaglUlqNunLu21o6D053nu1cmbR9CUUfVNX6XU7ANHzHK8_FzOkm1UWGfUB4_FSbAA',
      figLabel: 'FIG 3: Main Belt Mars-Jupiter Zone'
    };
  }
  if (c.includes('TERRESTRIAL')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuMOcBVPhBlZ9VhXNUbU93E-2JSch6FV6McaCVVc0UAhv0T8-_EL86U1wP4JRaVwRVJYmvrNQ7SHyPM_1yPi3UfbpcuPIYpz88N5ASiEUr6CiiDCCbDQu9wRrgsgJlRaaKGn_jEoHymBliYVwmdjnaQG71FIgIcGCVGF0e0YgUg1-PUrznHb1RxUox0YSZzOMzRlA7iDwKTpQx341JeKhCzrSBOu__ly3QS3PJ1HZ8XAo2GPmIw36pgw',
      figLabel: 'FIG 4: Terrestrial Rocky Crust Structure'
    };
  }
  if (c.includes('KUIPER')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Q1phGwgLm7lJNzU8xY0A4Rn3Ygeh05RnoKft484HzqpRiJsqr9BjRzXrmgaGSf39xQcapW-l67nT_2JVq8yWAnd2qarGQ3_b6P2V8U7XhhL06gA0eeKZUEvwuDN5N92Z-kvZgXBBHOhrKn2UcACk0EfiThgQT5RRt6d4ODpVHdptvsUTP8vnz4JSrTYRE4M10wIXcSeQvlSAdnH6viExHUZD0CRs245RMitPO80TIzJaBTqCzSR2ug',
      figLabel: 'FIG 5: Kuiper Disk Outer Edge'
    };
  }
  if (c.includes('TITAN')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGA7TRZUL8218_4DZS2c2m-aTAWd3wmUjMmZKBSHSx0178-ZxVRI1q8TcZwWxO2EBc-UMGFUicd61ohwsxRswjnd037BI9m1c41sFIYtlvN-gPbOv0ZD54ekp57UCJztAL8obg_R4hGq0SOtkhI7bbYsEctn1DW-TyNsBIcBrZCEl0qK-10EIrkg78oTQzGm4fcJYPdRBcwYet4ml--6WSWLKl4lRo9T6IqhXrAWvF21d3b1CbRfTQmQ',
      figLabel: 'FIG 6: Titan Nitrogen Atmosphere Spec'
    };
  }
  if (c.includes('VENUS')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKx_h92kMrSxLNG_ata8QsTI3KOUco219OH9r20yO24JptTRmxP2Hi6Uc0QBhA4LEsF9yfDb-eKakknT9q5PJV4ZJuozC8mcGxl-oKmHq-ytC6iiJOd14cyaiPTV05xyzxqdgScysufwkAaOY2k1yxqC4ojRIpq4W44Ji_2WIr_KOuRZtTu-LUjo5MCwCwLDC9rqULnWTpweSFejjQOQJFvLx0nkbCCm8BWorCBMv_xuZ7vD_FS-JcyQ',
      figLabel: 'FIG 7: Venus Retrograde Spin Axis'
    };
  }
  if (c.includes('SATURN')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6nP1axwjJZ-sTe3574XnPxM3ybO0hEf8yIunPotl4W4sl7PTk8izxV8HdnpcBpocCPOzC-SNaABxouqLpW8t6OnThl4icxvTSMC0lS5kasW0H8mly1JLxxDsrtQbFf4SNXgSfKzAFjFBp4zeJ6LZU_O9ZuZ2i3tKt-DmPezcAbC8TZTGWID1DV1GUhtJ5B_SvI-1yjhjR4gdePzhVDw1qGh1Mac3Y7w50TMoZmjbIkdQ_MGGCaF1ACg',
      figLabel: 'FIG 8: Saturn Ice Particle Rings'
    };
  }
  if (c.includes('COMET')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKuv3ryHk0-2DzUg3caJqRvHC_8bwBeoW43Bf7futEZf3g2Wc0nX4eZrmln-5VQY5TnMxNak0upAOG1tdOhCufTvnAaRvrvrf5lF2L-ylubdJIBw0BsUIV1UGrWgl8F4y8yxYs2GB92SBSnSdKyKrtw8vv67YGDWMN0jQY2kHQjtBPiAeCj6e6E-BgU501bIEewV1D7fSJdu37RXNkPkHnFS3RNwLbc3E0fAZc7edm6BhzhM8KzQc6Kg',
      figLabel: 'FIG 9: Comet Ion Tail Solar Wind Push'
    };
  }
  if (c.includes('GANYMEDE')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp45Ct_Ubyj0zDpyw2ANceQ3LWIHC6AypqKL2rclQnj-l-JBnrtsjEO0gu-eRyaFf-TiFPqRJ2epguFIyXT4178sTcnZaGFXBSJMIT2tcHf1OygU6k9ggpQfncJfSnE0j2KSs9dUFgpJQfccknjx4CsQXA_Xr__JYrHJEOeAvAbazvTiwpqzVB7I0UyLmixINPKbWU3IzVEvKXK-eY8PxVclxhJKRJv0EQ1STb5cN2fHm9UpW7dQiK2A',
      figLabel: 'FIG 10: Ganymede Galilean Satellite'
    };
  }

  // Astronomi Bola (10 Unique Images)
  if (c.includes('SIDEREAL')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Q1phGwgLm7lJNzU8xY0A4Rn3Ygeh05RnoKft484HzqpRiJsqr9BjRzXrmgaGSf39xQcapW-l67nT_2JVq8yWAnd2qarGQ3_b6P2V8U7XhhL06gA0eeKZUEvwuDN5N92Z-kvZgXBBHOhrKn2UcACk0EfiThgQT5RRt6d4ODpVHdptvsUTP8vnz4JSrTYRE4M10wIXcSeQvlSAdnH6viExHUZD0CRs245RMitPO80TIzJaBTqCzSR2ug',
      figLabel: 'FIG 1: Sidereal vs Solar Day 1 Deg Shift'
    };
  }
  if (c.includes('EQUATORIAL_CONST')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF9NXWiWV3V6QOzWPRacNMp6fWphBcXD3Epbkv_FfPSWCfUwRM_5d0uyziHR_J0GgY-rS8dB9HSGINWBLUb8R8CIzePrLzhEYaFFaDyfmEvd8nhSGyDHMTePA9SbJF5m5ZMlnKihuxX6oAN32_-Wtmp57UfBNwFiDAwASItXDpL-vR2pXtaglYlP4LfIfCgD4zmS3afenGXFBWnL75864iQaklebek3wMjQVtr8dbrno50vy-BEHwT2g',
      figLabel: 'FIG 2: RA & Dec Celestial Sphere Grid'
    };
  }
  if (c.includes('CELESTIAL_EQ')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmgbs9aU9qFkkS3TRGIxAWQD8iPTOhbiO1WI9kHkqCBKA6H5QajxkgyYgT-YhP29yx1i4C2JDD7IGXHBNSoe6eGhAsyVSmdO-l_bJWjEeZvm9bP0T7jjHzXBxWGy3Zuwy9AtvGYn8wsvxrns0NeztelhpNhI0ECEgG7rwOcuC-fxphRAUqLl-D72PdhepUlSe_LydMmyEk_zzW8CUkby6bOoJVaeJtwqZXSpg1e7PAOpis9R9jwd2WFg',
      figLabel: 'FIG 3: Celestial Equator 0 Dec Projection'
    };
  }
  if (c.includes('ZENITH_NADIR')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeN3Oe_KL6CqDOu-s8bNLUboORQ4XAgAcQ1h9sHgZiFJ8D0OR0X4rcLsXHsg0o4Q8MPisQKtJ5HcRnvZ9Duo1H97XlDT3u7IOTTinVO5Hph56tKIxhh4WDCg_tirVup8K7uhJjX9JYh3yynLBCieHSN3n60LKbA4gwh42ponnXIsNaJXLzTzbIdaglUlqNunLu21o6D053nu1cmbR9CUUfVNX6XU7ANHzHK8_FzOkm1UWGfUB4_FSbAA',
      figLabel: 'FIG 4: Zenith Overhead Altitude Axis'
    };
  }
  if (c.includes('HOUR_ANGLE')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKx_h92kMrSxLNG_ata8QsTI3KOUco219OH9r20yO24JptTRmxP2Hi6Uc0QBhA4LEsF9yfDb-eKakknT9q5PJV4ZJuozC8mcGxl-oKmHq-ytC6iiJOd14cyaiPTV05xyzxqdgScysufwkAaOY2k1yxqC4ojRIpq4W44Ji_2WIr_KOuRZtTu-LUjo5MCwCwLDC9rqULnWTpweSFejjQOQJFvLx0nkbCCm8BWorCBMv_xuZ7vD_FS-JcyQ',
      figLabel: 'FIG 5: Hour Angle Meridian Transit'
    };
  }
  if (c.includes('PRECESSION')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKuv3ryHk0-2DzUg3caJqRvHC_8bwBeoW43Bf7futEZf3g2Wc0nX4eZrmln-5VQY5TnMxNak0upAOG1tdOhCufTvnAaRvrvrf5lF2L-ylubdJIBw0BsUIV1UGrWgl8F4y8yxYs2GB92SBSnSdKyKrtw8vv67YGDWMN0jQY2kHQjtBPiAeCj6e6E-BgU501bIEewV1D7fSJdu37RXNkPkHnFS3RNwLbc3E0fAZc7edm6BhzhM8KzQc6Kg',
      figLabel: 'FIG 6: Earth Precession Cone 25772 Years'
    };
  }
  if (c.includes('CIRCUMPOLAR')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuMOcBVPhBlZ9VhXNUbU93E-2JSch6FV6McaCVVc0UAhv0T8-_EL86U1wP4JRaVwRVJYmvrNQ7SHyPM_1yPi3UfbpcuPIYpz88N5ASiEUr6CiiDCCbDQu9wRrgsgJlRaaKGn_jEoHymBliYVwmdjnaQG71FIgIcGCVGF0e0YgUg1-PUrznHb1RxUox0YSZzOMzRlA7iDwKTpQx341JeKhCzrSBOu__ly3QS3PJ1HZ8XAo2GPmIw36pgw',
      figLabel: 'FIG 7: Circumpolar Star Trail Circle'
    };
  }
  if (c.includes('REFRACTION')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGA7TRZUL8218_4DZS2c2m-aTAWd3wmUjMmZKBSHSx0178-ZxVRI1q8TcZwWxO2EBc-UMGFUicd61ohwsxRswjnd037BI9m1c41sFIYtlvN-gPbOv0ZD54ekp57UCJztAL8obg_R4hGq0SOtkhI7bbYsEctn1DW-TyNsBIcBrZCEl0qK-10EIrkg78oTQzGm4fcJYPdRBcwYet4ml--6WSWLKl4lRo9T6IqhXrAWvF21d3b1CbRfTQmQ',
      figLabel: 'FIG 8: Atmospheric Horizon Refraction'
    };
  }
  if (c.includes('OBLIQUITY')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtiV2hGLTg8aY5lx32RlkLqTZGZsOOSXkdme-k9tazWkRm46ni5cnj7jT8USNywISI5MEobAeP-MkOsxQwWVylYC5UwjZMeJ_hm1QrS4guBE4dvmNyv-4fpKXIfpxDnLf9mMTg8Ilwpiill3UaZRDlFiCyyUnGkD-q5yQlIYqWPTmn9hqxuZME_Zkhwu24upr-FACw4PnUX_pZhRJxAfFAWAw0dXadGz2Ke8979f20siSbTNtrku03Uw',
      figLabel: 'FIG 9: Ecliptic Obliquity 23.44 Deg'
    };
  }
  if (c.includes('PZX')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6nP1axwjJZ-sTe3574XnPxM3ybO0hEf8yIunPotl4W4sl7PTk8izxV8HdnpcBpocCPOzC-SNaABxouqLpW8t6OnThl4icxvTSMC0lS5kasW0H8mly1JLxxDsrtQbFf4SNXgSfKzAFjFBp4zeJ6LZU_O9ZuZ2i3tKt-DmPezcAbC8TZTGWID1DV1GUhtJ5B_SvI-1yjhjR4gdePzhVDw1qGh1Mac3Y7w50TMoZmjbIkdQ_MGGCaF1ACg',
      figLabel: 'FIG 10: PZX Navigational Spherical Triangle'
    };
  }

  // Instrumen & Observasi (10 Unique Images)
  if (c.includes('MAGNIFICATION')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp45Ct_Ubyj0zDpyw2ANceQ3LWIHC6AypqKL2rclQnj-l-JBnrtsjEO0gu-eRyaFf-TiFPqRJ2epguFIyXT4178sTcnZaGFXBSJMIT2tcHf1OygU6k9ggpQfncJfSnE0j2KSs9dUFgpJQfccknjx4CsQXA_Xr__JYrHJEOeAvAbazvTiwpqzVB7I0UyLmixINPKbWU3IzVEvKXK-eY8PxVclxhJKRJv0EQ1STb5cN2fHm9UpW7dQiK2A',
      figLabel: 'FIG 1: Telescope Focal Length Optics'
    };
  }
  if (c.includes('POGSON')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF9NXWiWV3V6QOzWPRacNMp6fWphBcXD3Epbkv_FfPSWCfUwRM_5d0uyziHR_J0GgY-rS8dB9HSGINWBLUb8R8CIzePrLzhEYaFFaDyfmEvd8nhSGyDHMTePA9SbJF5m5ZMlnKihuxX6oAN32_-Wtmp57UfBNwFiDAwASItXDpL-vR2pXtaglYlP4LfIfCgD4zmS3afenGXFBWnL75864iQaklebek3wMjQVtr8dbrno50vy-BEHwT2g',
      figLabel: 'FIG 2: Pogson Magnitude Difference Flux'
    };
  }
  if (c.includes('CCD_QUANTUM')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKuv3ryHk0-2DzUg3caJqRvHC_8bwBeoW43Bf7futEZf3g2Wc0nX4eZrmln-5VQY5TnMxNak0upAOG1tdOhCufTvnAaRvrvrf5lF2L-ylubdJIBw0BsUIV1UGrWgl8F4y8yxYs2GB92SBSnSdKyKrtw8vv67YGDWMN0jQY2kHQjtBPiAeCj6e6E-BgU501bIEewV1D7fSJdu37RXNkPkHnFS3RNwLbc3E0fAZc7edm6BhzhM8KzQc6Kg',
      figLabel: 'FIG 3: CCD Quantum Efficiency Detector'
    };
  }
  if (c.includes('RAYLEIGH')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmgbs9aU9qFkkS3TRGIxAWQD8iPTOhbiO1WI9kHkqCBKA6H5QajxkgyYgT-YhP29yx1i4C2JDD7IGXHBNSoe6eGhAsyVSmdO-l_bJWjEeZvm9bP0T7jjHzXBxWGy3Zuwy9AtvGYn8wsvxrns0NeztelhpNhI0ECEgG7rwOcuC-fxphRAUqLl-D72PdhepUlSe_LydMmyEk_zzW8CUkby6bOoJVaeJtwqZXSpg1e7PAOpis9R9jwd2WFg',
      figLabel: 'FIG 4: Airy Disk Rayleigh Angular Limit'
    };
  }
  if (c.includes('CHROMATIC')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeN3Oe_KL6CqDOu-s8bNLUboORQ4XAgAcQ1h9sHgZiFJ8D0OR0X4rcLsXHsg0o4Q8MPisQKtJ5HcRnvZ9Duo1H97XlDT3u7IOTTinVO5Hph56tKIxhh4WDCg_tirVup8K7uhJjX9JYh3yynLBCieHSN3n60LKbA4gwh42ponnXIsNaJXLzTzbIdaglUlqNunLu21o6D053nu1cmbR9CUUfVNX6XU7ANHzHK8_FzOkm1UWGfUB4_FSbAA',
      figLabel: 'FIG 5: Chromatic Dispersion Color Fringe'
    };
  }
  if (c.includes('CASSEGRAIN')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKx_h92kMrSxLNG_ata8QsTI3KOUco219OH9r20yO24JptTRmxP2Hi6Uc0QBhA4LEsF9yfDb-eKakknT9q5PJV4ZJuozC8mcGxl-oKmHq-ytC6iiJOd14cyaiPTV05xyzxqdgScysufwkAaOY2k1yxqC4ojRIpq4W44Ji_2WIr_KOuRZtTu-LUjo5MCwCwLDC9rqULnWTpweSFejjQOQJFvLx0nkbCCm8BWorCBMv_xuZ7vD_FS-JcyQ',
      figLabel: 'FIG 6: Cassegrain Primary & Secondary Mirror'
    };
  }
  if (c.includes('ADAPTIVE_OPTICS')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Q1phGwgLm7lJNzU8xY0A4Rn3Ygeh05RnoKft484HzqpRiJsqr9BjRzXrmgaGSf39xQcapW-l67nT_2JVq8yWAnd2qarGQ3_b6P2V8U7XhhL06gA0eeKZUEvwuDN5N92Z-kvZgXBBHOhrKn2UcACk0EfiThgQT5RRt6d4ODpVHdptvsUTP8vnz4JSrTYRE4M10wIXcSeQvlSAdnH6viExHUZD0CRs245RMitPO80TIzJaBTqCzSR2ug',
      figLabel: 'FIG 7: Adaptive Optics Wavefront Mirror'
    };
  }
  if (c.includes('COLOR_INDEX')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuMOcBVPhBlZ9VhXNUbU93E-2JSch6FV6McaCVVc0UAhv0T8-_EL86U1wP4JRaVwRVJYmvrNQ7SHyPM_1yPi3UfbpcuPIYpz88N5ASiEUr6CiiDCCbDQu9wRrgsgJlRaaKGn_jEoHymBliYVwmdjnaQG71FIgIcGCVGF0e0YgUg1-PUrznHb1RxUox0YSZzOMzRlA7iDwKTpQx341JeKhCzrSBOu__ly3QS3PJ1HZ8XAo2GPmIw36pgw',
      figLabel: 'FIG 8: B - V Color Index Temperature Curve'
    };
  }
  if (c.includes('INTERFEROMETRY')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGA7TRZUL8218_4DZS2c2m-aTAWd3wmUjMmZKBSHSx0178-ZxVRI1q8TcZwWxO2EBc-UMGFUicd61ohwsxRswjnd037BI9m1c41sFIYtlvN-gPbOv0ZD54ekp57UCJztAL8obg_R4hGq0SOtkhI7bbYsEctn1DW-TyNsBIcBrZCEl0qK-10EIrkg78oTQzGm4fcJYPdRBcwYet4ml--6WSWLKl4lRo9T6IqhXrAWvF21d3b1CbRfTQmQ',
      figLabel: 'FIG 9: Radio Interferometry Synthesis Array'
    };
  }
  if (c.includes('DARK_CURRENT')) {
    return {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6nP1axwjJZ-sTe3574XnPxM3ybO0hEf8yIunPotl4W4sl7PTk8izxV8HdnpcBpocCPOzC-SNaABxouqLpW8t6OnThl4icxvTSMC0lS5kasW0H8mly1JLxxDsrtQbFf4SNXgSfKzAFjFBp4zeJ6LZU_O9ZuZ2i3tKt-DmPezcAbC8TZTGWID1DV1GUhtJ5B_SvI-1yjhjR4gdePzhVDw1qGh1Mac3Y7w50TMoZmjbIkdQ_MGGCaF1ACg',
      figLabel: 'FIG 10: Cryogenic Cooling Dark Current Reduction'
    };
  }

  return {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeN3Oe_KL6CqDOu-s8bNLUboORQ4XAgAcQ1h9sHgZiFJ8D0OR0X4rcLsXHsg0o4Q8MPisQKtJ5HcRnvZ9Duo1H97XlDT3u7IOTTinVO5Hph56tKIxhh4WDCg_tirVup8K7uhJjX9JYh3yynLBCieHSN3n60LKbA4gwh42ponnXIsNaJXLzTzbIdaglUlqNunLu21o6D053nu1cmbR9CUUfVNX6XU7ANHzHK8_FzOkm1UWGfUB4_FSbAA',
    figLabel: 'FIG: Astronomy Visual Diagram'
  };
};

function DrillContent({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const moduleKey = searchParams.get('module') || 'mekanika';

  const [qId, setQId] = useState('1');
  const [activeQuestionsMap, setActiveQuestionsMap] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(899); // 14:59
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [streakCount, setStreakCount] = useState(7);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Safely unwrap params without SSR throwing
  useEffect(() => {
    if (params) {
      Promise.resolve(params).then((p) => {
        const raw = p?.questionId || '1';
        const num = parseInt(raw, 10);
        const safe = isNaN(num) || num < 1 ? '1' : num > 10 ? '10' : String(num);
        setQId(safe);
      });
    }
  }, [params]);

  // Helper to generate 10 COMPLETELY DISTINCT DYNAMIC questions per attempt!
  const generateFreshDynamicQuizSet = (mKey) => {
    const generatorTemplates = DYNAMIC_TEMPLATES[mKey] || DYNAMIC_TEMPLATES.mekanika;
    const questionsDict = {};

    // Shuffle the 10 distinct template generators so question order changes completely every attempt!
    const shuffledTemplates = shuffleArray(generatorTemplates);

    for (let i = 1; i <= 10; i++) {
      const templateFunc = shuffledTemplates[(i - 1) % shuffledTemplates.length];
      const generated = templateFunc();
      const topicVisual = getTopicSpecificImage(generated.code, generated.topicBadge);

      // Build 4 options (1 correct + 3 wrong) and shuffle their positions A, B, C, D
      const rawOptions = [
        { isCorrect: true, text: generated.correctText },
        ...generated.wrongTexts.map((txt) => ({ isCorrect: false, text: txt })),
      ];
      const shuffledOptions = shuffleArray(rawOptions);
      const labels = ['A', 'B', 'C', 'D'];

      let correctLabel = 'A';
      const formattedOptions = shuffledOptions.map((opt, idx) => {
        const label = labels[idx];
        if (opt.isCorrect) correctLabel = label;
        return { id: label, text: opt.text };
      });

      questionsDict[i.toString()] = {
        id: `gen_${i}_${Date.now()}`,
        module: generated.module,
        code: generated.code,
        title: generated.title,
        topicBadge: generated.topicBadge,
        image: topicVisual.image,
        figLabel: generated.figLabel || topicVisual.figLabel,
        question: generated.question,
        options: formattedOptions,
        correctOption: correctLabel,
        explanation: generated.explanation,
      };
    }

    return questionsDict;
  };

  // Initialize or Load Quiz Questions & Answers Session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionKey = `astrolearn-active-quiz-set-${moduleKey}`;
      let savedQuestions = sessionStorage.getItem(sessionKey);
      let questionsDict = {};

      if (savedQuestions) {
        try {
          questionsDict = JSON.parse(savedQuestions);
        } catch (e) {
          console.error(e);
        }
      }

      if (!savedQuestions || Object.keys(questionsDict).length === 0) {
        questionsDict = generateFreshDynamicQuizSet(moduleKey);
        sessionStorage.setItem(sessionKey, JSON.stringify(questionsDict));
      }

      setActiveQuestionsMap(questionsDict);

      // Load answers for this module session
      const savedAnswers = sessionStorage.getItem(`astrolearn-quiz-user-answers-${moduleKey}`);
      if (savedAnswers) {
        try {
          setUserAnswers(JSON.parse(savedAnswers));
        } catch (e) {
          console.error(e);
        }
      }

      // Load submission status for this module session
      const savedSubmitted = sessionStorage.getItem(`astrolearn-quiz-submitted-${moduleKey}`);
      if (savedSubmitted === 'true') {
        setIsSubmitted(true);
      }

      // Load streak count
      const savedStreak = localStorage.getItem('astrolearn_streak');
      if (savedStreak) {
        setStreakCount(parseInt(savedStreak, 10));
      }
    }
  }, [qId, moduleKey]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const totalQuestionsInSet = 10;
  const currentData = activeQuestionsMap[qId] || {
    module: 'Kuis Astronomi',
    code: 'ASTROLEARN_QUIZ',
    topicBadge: 'Kuis',
    question: 'Memuat soal...',
    options: [],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeN3Oe_KL6CqDOu-s8bNLUboORQ4XAgAcQ1h9sHgZiFJ8D0OR0X4rcLsXHsg0o4Q8MPisQKtJ5HcRnvZ9Duo1H97XlDT3u7IOTTinVO5Hph56tKIxhh4WDCg_tirVup8K7uhJjX9JYh3yynLBCieHSN3n60LKbA4gwh42ponnXIsNaJXLzTzbIdaglUlqNunLu21o6D053nu1cmbR9CUUfVNX6XU7ANHzHK8_FzOkm1UWGfUB4_FSbAA',
    figLabel: 'FIG 1: Cosmos Visual',
  };

  // Handle selecting an answer for the current question
  const handleSelectOption = (optionId) => {
    if (isSubmitted) return;
    const updated = { ...userAnswers, [qId]: optionId };
    setUserAnswers(updated);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`astrolearn-quiz-user-answers-${moduleKey}`, JSON.stringify(updated));
    }
  };

  // Reset entire quiz session for THIS SPECIFIC MODULE & generate BRAND NEW questions!
  const handleResetAndRestartQuiz = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(`astrolearn-active-quiz-set-${moduleKey}`);
      sessionStorage.removeItem(`astrolearn-quiz-user-answers-${moduleKey}`);
      sessionStorage.removeItem(`astrolearn-quiz-submitted-${moduleKey}`);
    }
    setUserAnswers({});
    setIsSubmitted(false);

    // Generate BRAND NEW 10 distinct dynamic questions!
    const freshQuestionsDict = generateFreshDynamicQuizSet(moduleKey);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`astrolearn-active-quiz-set-${moduleKey}`, JSON.stringify(freshQuestionsDict));
    }
    setActiveQuestionsMap(freshQuestionsDict);
    router.push(`/practice/drill/1?module=${moduleKey}`);
  };

  // Submit and Finish All 10 Questions
  const handleFinalSubmit = () => {
    const answeredCount = Object.keys(userAnswers).length;
    if (
      answeredCount < totalQuestionsInSet &&
      !confirm(`Anda baru menjawab ${answeredCount} dari ${totalQuestionsInSet} soal. Yakin ingin mengumpulkan kuis?`)
    ) {
      return;
    }

    // 1. Calculate Score & Points
    let correctCount = 0;
    let basePoints = 0;
    Object.keys(activeQuestionsMap).forEach((id) => {
      if (userAnswers[id] === activeQuestionsMap[id]?.correctOption) {
        correctCount += 1;
        basePoints += 100; // 100 points per correct answer
      }
    });

    let accuracyBonus = 0;
    let streakBonus = 0;
    if (correctCount === totalQuestionsInSet) {
      accuracyBonus = 500; // Perfect Score Bonus (+500)
      streakBonus = 200; // Daily Streak Bonus (+200)
    } else if (correctCount >= Math.ceil(totalQuestionsInSet * 0.8)) {
      accuracyBonus = 250; // Great Score Bonus (+250)
    } else if (correctCount >= Math.ceil(totalQuestionsInSet * 0.6)) {
      accuracyBonus = 100; // Pass Bonus (+100)
    }

    const earnedPoints = basePoints + accuracyBonus + streakBonus;

    // 2. Save earned points, streak & stats via userStats helper
    if (typeof window !== 'undefined') {
      try {
        const streakResult = recordQuizCompletionStreak(earnedPoints);
        if (streakResult && streakResult.streak) {
          setStreakCount(streakResult.streak);
        }

        // Record topic progress (0 to 100%)
        const savedProg = JSON.parse(localStorage.getItem('astrolearn-topic-progress') || '{}');
        const scorePercent = Math.round((correctCount / totalQuestionsInSet) * 100);
        savedProg[moduleKey] = Math.max(savedProg[moduleKey] || 0, scorePercent);
        localStorage.setItem('astrolearn-topic-progress', JSON.stringify(savedProg));

        // Record topic mastery for Heatmap
        const savedMastery = JSON.parse(localStorage.getItem('astrolearn-topic-mastery') || '{}');
        const topicName = activeQuestionsMap['1']?.module || 'Mekanika Benda Langit';
        if (!savedMastery[topicName]) {
          savedMastery[topicName] = { easy: null, medium: null, hard: null, olympiad: null };
        }
        savedMastery[topicName].easy = scorePercent;
        savedMastery[topicName].medium = Math.max(0, scorePercent - 15);
        localStorage.setItem('astrolearn-topic-mastery', JSON.stringify(savedMastery));

        sessionStorage.setItem(`astrolearn-quiz-submitted-${moduleKey}`, 'true');
        window.dispatchEvent(new Event('storage'));
      } catch (e) {
        console.error('Error saving quiz completion stats:', e);
      }
    }

    // 3. Mark as submitted to show full results & explanations
    setIsSubmitted(true);
    setShowStreakModal(true);
  };

  const handleNext = () => {
    const currentNum = parseInt(qId, 10);
    if (currentNum >= totalQuestionsInSet) {
      handleFinalSubmit();
    } else {
      router.push(`/practice/drill/${currentNum + 1}?module=${moduleKey}`);
    }
  };

  const handlePrev = () => {
    const currentNum = parseInt(qId, 10);
    if (currentNum > 1) {
      router.push(`/practice/drill/${currentNum - 1}?module=${moduleKey}`);
    }
  };

  const answeredTotal = Object.keys(userAnswers).length;
  const currentSelectedOption = userAnswers[qId] || null;

  // Calculate score breakdown when submitted
  let correctCount = 0;
  Object.keys(activeQuestionsMap).forEach((id) => {
    if (userAnswers[id] === activeQuestionsMap[id]?.correctOption) {
      correctCount += 1;
    }
  });

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-lg min-h-screen text-[#e2e8f0]">
      {/* Quiz Top Bar Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-sm mb-xs">
        <div>
          <h1 className="font-headline-lg text-2xl font-extrabold text-primary tracking-tight flex items-center gap-2">
            <span>{isSubmitted ? 'Hasil & Pembahasan Kuis' : currentData?.module || 'Kuis Modul'}</span>
            <span className="text-xs font-code-md px-3 py-0.5 rounded-full bg-secondary-container/60 text-secondary border border-secondary/30 font-bold">
              {moduleKey.toUpperCase()}
            </span>
          </h1>
          <p className="font-code-md text-xs text-on-surface-variant mt-0.5">
            {isSubmitted ? 'Evaluasi Jawaban & Pembahasan Lengkap' : currentData?.code || 'ASTROLEARN_QUIZ'}
          </p>
        </div>

        <div className="flex items-center gap-md">
          {/* Coba Lagi (Generate Soal Baru) Button */}
          <button
            onClick={handleResetAndRestartQuiz}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary text-on-secondary hover:bg-secondary-fixed font-code-md text-xs font-bold transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">autorenew</span>
            <span>{isSubmitted ? 'Coba Lagi (Generate Soal Baru)' : 'Generate Soal Baru'}</span>
          </button>

          {!isSubmitted && (
            <div className="hidden sm:flex items-center gap-1.5 glass-panel p-1.5 rounded-xl border border-white/10">
              {Object.keys(activeQuestionsMap).map((numKey) => {
                const isCurrent = numKey === qId;
                const isAnswered = !!userAnswers[numKey];
                return (
                  <button
                    key={numKey}
                    onClick={() => router.push(`/practice/drill/${numKey}?module=${moduleKey}`)}
                    className={`w-7 h-7 rounded-lg text-xs font-code-md font-bold transition-all cursor-pointer flex items-center justify-center ${
                      isCurrent
                        ? 'bg-primary text-on-primary ring-2 ring-primary shadow-lg scale-110'
                        : isAnswered
                        ? 'bg-secondary-container/60 text-secondary border border-secondary/40'
                        : 'bg-white/5 text-on-surface-variant hover:bg-white/10'
                    }`}
                  >
                    {numKey}
                  </button>
                );
              })}
            </div>
          )}

          {!isSubmitted && (
            <div className="glass-panel px-4 py-2 rounded-xl flex items-center space-x-2 border border-outline-variant/30 glow-accent shadow-xl">
              <span className="material-symbols-outlined text-secondary">timer</span>
              <span className="font-code-md text-base text-primary font-bold">
                {formatTimer(timeLeft)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🟢 VIEW 1: COMPLETE PEMBAHASAN VIEW (WHEN QUIZ IS SUBMITTED) */}
      {/* ========================================================================= */}
      {isSubmitted ? (
        <div className="flex flex-col gap-lg animate-fadeIn">
          {/* Summary Score & Points Breakdown Card */}
          <div className="glass-panel p-6 rounded-2xl border border-secondary/40 bg-secondary-container/20 flex flex-col gap-4 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center border border-secondary/40 text-secondary font-display-lg text-2xl font-bold shadow-[0_0_15px_rgba(201,191,253,0.3)]">
                  {Math.round((correctCount / totalQuestionsInSet) * 100)}%
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-code-md text-xs uppercase tracking-wider text-secondary font-bold">
                      Skor Kuis Modul {currentData?.module}
                    </span>
                    {isPerfect && (
                      <span className="font-code-md text-[10px] bg-[#ffd700] text-black px-2 py-0.5 rounded font-extrabold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">workspace_premium</span> PERFECT!
                      </span>
                    )}
                  </div>
                  <h2 className="font-headline-lg text-2xl font-extrabold text-white">
                    {correctCount} dari {totalQuestionsInSet} Soal Benar
                  </h2>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    +1 Streak Harian Berhasil Diraih! ({streakCount} Hari Berturut-turut)
                  </p>
                </div>
              </div>

              {/* Total Earned Points Highlight */}
              <div className="flex flex-col items-end bg-background/60 p-3 px-5 rounded-xl border border-primary/30">
                <span className="font-code-md text-[11px] text-on-surface-variant font-semibold">Total Poin Diperoleh</span>
                <span className="font-code-md text-2xl font-extrabold text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                  +{correctCount * 100 + (isPerfect ? 700 : isGreat ? 250 : isPass ? 100 : 0)} Poin
                </span>
              </div>
            </div>

            {/* Points System Breakdown Detail */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-surface-container/50 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                  <span className="font-code-md text-xs text-on-surface-variant">Soal Benar ({correctCount}x)</span>
                </div>
                <span className="font-code-md text-xs font-bold text-emerald-400">+{correctCount * 100}</span>
              </div>

              <div className="bg-surface-container/50 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-sm">workspace_premium</span>
                  <span className="font-code-md text-xs text-on-surface-variant">Bonus Akurasi</span>
                </div>
                <span className="font-code-md text-xs font-bold text-amber-400">
                  +{isPerfect ? 500 : isGreat ? 250 : isPass ? 100 : 0}
                </span>
              </div>

              <div className="bg-surface-container/50 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-rose-400 text-sm">local_fire_department</span>
                  <span className="font-code-md text-xs text-on-surface-variant">Bonus Perfect Streak</span>
                </div>
                <span className="font-code-md text-xs font-bold text-rose-400">
                  +{isPerfect ? 200 : 0}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
              <Link
                href="/leaderboard"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-tertiary-container/80 text-tertiary border border-tertiary/30 font-code-md text-xs font-bold hover:bg-tertiary-container transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">leaderboard</span>
                <span>Lihat Peringkat di Leaderboard →</span>
              </Link>

              <button
                onClick={handleResetAndRestartQuiz}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary text-on-primary font-code-md text-xs font-extrabold hover:bg-white transition-all shadow-[0_0_20px_rgba(193,196,230,0.5)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-base">autorenew</span>
                <span>Coba Lagi (Generate Soal Baru)</span>
              </button>
            </div>
          </div>

          {/* Full List of 10 Questions with Detailed Pembahasan */}
          <div className="flex flex-col gap-md">
            <h3 className="font-headline-md text-xl font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">menu_book</span>
              <span>Pembahasan Materi: {currentData?.module}</span>
            </h3>

            {Object.keys(activeQuestionsMap).map((numKey) => {
              const q = activeQuestionsMap[numKey];
              if (!q) return null;

              const userAns = userAnswers[numKey];
              const isCorrect = userAns === q.correctOption;

              return (
                <div
                  key={numKey}
                  className={`glass-card p-6 rounded-2xl border transition-all ${
                    isCorrect
                      ? 'border-emerald-500/40 bg-emerald-950/20'
                      : 'border-rose-500/40 bg-rose-950/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-code-md text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white">
                        Soal {numKey} dari {totalQuestionsInSet}
                      </span>
                      <span className="font-code-md text-xs text-on-surface-variant">
                        [{q.module}]
                      </span>
                    </div>

                    <span
                      className={`font-code-md text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border ${
                        isCorrect
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50'
                          : 'bg-rose-500/20 text-rose-300 border-rose-400/50'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isCorrect ? 'check_circle' : 'cancel'}
                      </span>
                      <span>{isCorrect ? 'Jawaban Benar' : 'Jawaban Salah'}</span>
                    </span>
                  </div>

                  <h4 className="font-headline-md text-lg font-bold text-white mb-4 leading-relaxed">
                    {q.question}
                  </h4>

                  {/* Options Review Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {q.options?.map((opt) => {
                      const isUserChoice = userAns === opt.id;
                      const isRightOption = opt.id === q.correctOption;

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border text-xs font-body-md flex items-center justify-between ${
                            isRightOption
                              ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold'
                              : isUserChoice
                              ? 'bg-rose-500/30 border-rose-400 text-rose-200 font-bold'
                              : 'glass-panel border-white/5 text-on-surface-variant'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-code-md font-bold px-2 py-0.5 rounded bg-black/30">
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                          </div>
                          {isRightOption && (
                            <span className="font-code-md text-[10px] bg-emerald-500 text-black font-extrabold px-2 py-0.5 rounded">
                              KUNCI BENAR
                            </span>
                          )}
                          {isUserChoice && !isRightOption && (
                            <span className="font-code-md text-[10px] bg-rose-500 text-white font-extrabold px-2 py-0.5 rounded">
                              PILIHAN ANDA
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Pembahasan Box */}
                  <div className="p-4 rounded-xl glass-panel bg-primary-container/40 border border-primary/20">
                    <h5 className="font-code-md text-xs text-primary font-bold mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">info</span>
                      <span>Pembahasan Lengkap {q.topicBadge}:</span>
                    </h5>
                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Retake Button */}
          <div className="flex justify-center mt-4 mb-12">
            <button
              onClick={handleResetAndRestartQuiz}
              className="px-8 py-4 rounded-xl bg-primary text-on-primary font-code-md text-base font-extrabold hover:bg-white transition-all shadow-[0_0_25px_rgba(193,196,230,0.5)] flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">autorenew</span>
              <span>Coba Lagi (Generate Soal Baru) 🚀</span>
            </button>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 🔵 VIEW 2: ACTIVE QUIZ TAKING VIEW (UNTIL SUBMITTED) */
        /* ========================================================================= */
        <div className="glass-card rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden border border-white/10">
          {/* Progress Bar Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-surface-variant text-on-surface-variant font-code-md text-xs px-3 py-1 rounded-full font-bold">
                Question {qId} of {totalQuestionsInSet}
              </span>
              <span className="text-xs font-code-md text-secondary font-semibold">
                ({answeredTotal}/{totalQuestionsInSet} Dijawab)
              </span>
            </div>

            <span className="bg-tertiary-container text-tertiary font-code-md text-xs px-3 py-1 rounded-full border border-tertiary/20 font-bold">
              {currentData?.topicBadge}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="font-headline-md text-xl font-bold text-on-surface mb-6 leading-relaxed">
            {currentData?.question}
          </h2>

          {/* Content Layout: Image + Options */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Question Image Visual */}
            <div className="w-full lg:w-1/2 rounded-xl overflow-hidden border border-white/10 relative group h-64 lg:h-auto min-h-[220px]">
              <AstronomyDiagram
                code={currentData?.code}
                topicBadge={currentData?.topicBadge}
                imageFallback={currentData?.image}
              />
              <div className="absolute bottom-3 left-3 z-20">
                <span className="font-code-md text-xs bg-background/80 text-primary px-3 py-1 rounded border border-primary/30 font-bold backdrop-blur-md">
                  {currentData?.figLabel}
                </span>
              </div>
            </div>

            {/* Options Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-3">
              {currentData?.options?.map((opt) => {
                const isSelected = currentSelectedOption === opt.id;

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'bg-secondary-container/60 border-secondary text-primary shadow-[0_0_15px_rgba(201,191,253,0.4)] font-bold ring-1 ring-secondary'
                        : 'glass-panel border-white/10 text-on-surface-variant hover:border-secondary/40 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-code-md text-xs w-8 h-8 rounded-full flex items-center justify-center font-bold border ${
                          isSelected ? 'border-current bg-current/20' : 'border-white/20'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="font-body-md text-sm leading-snug">{opt.text}</span>
                    </div>
                    {isSelected && (
                      <span className="material-symbols-outlined text-secondary text-base">
                        check_circle
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Controls Footer */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
            <button
              onClick={handlePrev}
              disabled={parseInt(qId, 10) <= 1}
              className={`px-5 py-2.5 border border-secondary text-secondary rounded-xl font-code-md text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                parseInt(qId, 10) <= 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-secondary/10'
              }`}
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
              <span>PREVIOUS</span>
            </button>

            <div className="flex gap-2">
              {answeredTotal >= totalQuestionsInSet ? (
                <button
                  onClick={handleFinalSubmit}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-code-md text-xs font-extrabold px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(52,211,153,0.5)] flex items-center gap-2"
                >
                  <span>FINISH & KUMPULKAN ({answeredTotal}/{totalQuestionsInSet})</span>
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </button>
              ) : parseInt(qId, 10) >= totalQuestionsInSet ? (
                <button
                  onClick={handleFinalSubmit}
                  className="bg-secondary text-on-secondary font-code-md text-xs font-extrabold px-6 py-2.5 rounded-xl hover:bg-secondary-fixed transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>KUMPULKAN QUIZ ({answeredTotal}/{totalQuestionsInSet})</span>
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-secondary text-on-secondary rounded-xl font-code-md text-xs font-bold hover:bg-secondary-fixed transition-colors flex items-center gap-1 cursor-pointer shadow-lg"
                >
                  <span>NEXT</span>
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STREAK POP-UP MODAL (Exact Google Stitch Design with Sci-Fi Pop-in Animation) */}
      {showStreakModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/70 backdrop-blur-md animate-backdrop-fade">
          <div className="glass-panel relative w-full max-w-md rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl border border-white/20 bg-surface-container/95 animate-streak-pop">
            <button
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              onClick={() => setShowStreakModal(false)}
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="w-52 h-52 mb-6 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-secondary/30 blur-3xl rounded-full animate-ring-pulse"></div>
              <img
                alt="Cosmic Fire Streak"
                className="relative z-10 w-full h-full object-contain animate-float-flame drop-shadow-[0_0_25px_rgba(255,180,100,0.8)]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKx_h92kMrSxLNG_ata8QsTI3KOUco219OH9r20yO24JptTRmxP2Hi6Uc0QBhA4LEsF9yfDb-eKakknT9q5PJV4ZJuozC8mcGxl-oKmHq-ytC6iiJOd14cyaiPTV05xyzxqdgScysufwkAaOY2k1yxqC4ojRIpq4W44Ji_2WIr_KOuRZtTu-LUjo5MCwCwLDC9rqULnWTpweSFejjQOQJFvLx0nkbCCm8BWorCBMv_xuZ7vD_FS-JcyQ"
              />
            </div>

            <span className="font-code-md text-xs uppercase tracking-widest text-secondary font-bold mb-1 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30">
              🔥 Streak Achieved
            </span>

            <h2 className="font-headline-lg text-3xl text-primary mb-2 stellar-glow tracking-tight font-extrabold mt-2">
              {streakCount} Hari Berturut-turut!
            </h2>

            <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
              Luar biasa! Kamu telah menyelesaikan kuis materi {currentData?.module} hari ini dan semakin dekat dengan bintang-bintang.
            </p>

            <button
              className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-bold shadow-[0_0_25px_rgba(193,196,230,0.5)] hover:scale-[1.03] active:scale-95 transition-all cursor-pointer text-base"
              onClick={() => setShowStreakModal(false)}
            >
              Lihat Hasil & Pembahasan 📖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DrillPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-white">
          <span className="material-symbols-outlined text-secondary text-5xl animate-spin">
            progress_activity
          </span>
          <p className="font-code-md text-sm text-on-surface-variant">
            Memuat Kuis & Soal Astronomi...
          </p>
        </div>
      }
    >
      <DrillContent params={params} />
    </Suspense>
  );
}
