'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InteractiveStellarExplorerPage() {
  const [mass, setMass] = useState(1.0);
  const [age, setAge] = useState(4.6);
  const [selectedRegion, setSelectedRegion] = useState('Main Sequence');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLogScale, setIsLogScale] = useState(false);

  // Calculate detailed astrophysical parameters
  const calculateProperties = () => {
    const msLifespan = 10 * Math.pow(mass, -2.5); // MS lifetime in Gyr
    const isEvolved = age > msLifespan;
    const isWhiteDwarf = mass < 8 && age > msLifespan * 1.1;

    let spectral = 'Class G';
    let coreState = 'Radiative Core';
    let temp = Math.floor(5778 * Math.pow(mass, 0.5));
    let lum = Math.pow(mass, 3.5);
    let rad = Math.pow(mass, 0.8);
    let starColor = '#ffffcc';
    let glowColor = '#ffd700';
    let xPos = 50; // temp (left to right inverse)
    let yPos = 50; // lum (top to bottom inverse)
    let logMsg = '';

    // Position & Classification logic based on ZAMS mass
    if (mass > 10) {
      xPos = 20; yPos = 20; spectral = 'Class O'; coreState = 'Convective Core';
      starColor = '#dbe1ff'; glowColor = '#4a4277';
    } else if (mass > 3) {
      xPos = 35; yPos = 35; spectral = 'Class B/A'; coreState = 'Convective Core';
      starColor = '#b9c5f2'; glowColor = '#30295c';
    } else if (mass < 0.5) {
      xPos = 75; yPos = 80; spectral = 'Class M'; coreState = 'Fully Convective';
      starColor = '#ffb4ab'; glowColor = '#93000a';
    } else {
      xPos = 50; yPos = 50; spectral = 'Class G'; coreState = 'Radiative Core';
      starColor = '#ffffcc'; glowColor = '#aa8800';
    }

    // Hydrogen & Helium fractions
    let hFrac = age < msLifespan ? 0.70 * (1 - age / msLifespan) : 0;
    hFrac = Math.max(0, hFrac);
    let heFrac = 0.98 - hFrac;
    let zFrac = 0.02;

    if (isEvolved) {
      if (isWhiteDwarf) {
        xPos -= 40;
        yPos += 30;
        starColor = '#e5e1e4';
        glowColor = '#353437';
        spectral = 'White Dwarf';
        coreState = 'Degenerate C/O';
        temp = 12000;
        lum = 0.01;
        rad = 0.01;
        logMsg = 'FASE 3 (Katai Putih): Lapisan luar bintang terlepas menjadi Nebula Planet. Yang tersisa hanyalah INTI BINTANG SEUKURAN BUMI. Karena ukurannya sangat kecil, cahayanya redup (anjlok ke bawah), namun suhunya sangat panas (pindah ke kiri).';
      } else {
        xPos += 25;
        yPos -= 15;
        starColor = '#ff8877';
        glowColor = '#690005';
        spectral = 'Red Giant Branch';
        coreState = 'Degenerate He Core';
        temp = Math.floor(temp * 0.6);
        lum = lum * 10;
        rad = rad * 20;
        logMsg = 'FASE 2 (Raksasa Merah): Bahan bakar hidrogen di inti habis! Bintang membengkak hingga 100x lipat. Karena ukurannya RAKSASA, cahayanya makin terang (naik ke atas), namun suhunya mendingin (geser ke kanan).';
      }
    } else {
      const msPercent = Math.min(100, Math.floor((age / msLifespan) * 100));
      logMsg = `FASE 1 (Deret Utama): Bintang sedang membakar bahan bakar Hidrogen secara stabil di intinya (~${msPercent}% selesai). Ukuran dan suhu bintang tetap stabil di garis diagonal.`;
    }

    return {
      spectral,
      coreState,
      temp,
      lum: lum.toFixed(2),
      rad: rad.toFixed(2),
      starColor,
      glowColor,
      xPos,
      yPos,
      hFrac,
      heFrac,
      zFrac,
      msLifespan,
      isEvolved,
      isWhiteDwarf,
      logMsg,
    };
  };

  const props = calculateProperties();

  const handleReset = () => {
    setMass(1.0);
    setAge(4.6);
    setSelectedRegion('Main Sequence');
  };

  const handleAnimate = () => {
    setIsAnimating(true);
    let currentAge = 0;
    const interval = setInterval(() => {
      currentAge += 0.2;
      if (currentAge >= 14) {
        clearInterval(interval);
        setIsAnimating(false);
      }
      setAge(parseFloat(currentAge.toFixed(1)));
    }, 100);
  };

  return (
    <div className="max-w-[1600px] mx-auto flex flex-col gap-lg min-h-screen text-[#e2e8f0]">
      {/* Top Header Bar Navigation */}
      <nav className="w-full sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-xl px-gutter py-3 rounded-2xl flex justify-between items-center mb-2">
        <div className="flex items-center gap-md">
          <Link
            href="/learn/astrofisika/hr-diagram"
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center text-xs font-code-md"
          >
            <span className="material-symbols-outlined mr-2 text-base">arrow_back</span>
            <span>Back to Module</span>
          </Link>
          <div className="font-display-lg text-2xl font-extrabold text-primary tracking-tighter">
            AstroLearn
          </div>
        </div>

        <div className="hidden md:flex gap-lg text-sm font-medium">
          <Link href="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/practice" className="text-on-surface-variant hover:text-primary transition-colors">
            Tryouts
          </Link>
          <span className="text-primary font-bold border-b-2 border-primary pb-1">Curriculum</span>
          <Link href="/community" className="text-on-surface-variant hover:text-primary transition-colors">
            Community
          </Link>
        </div>

        <div className="flex items-center gap-md">
          <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-code-md text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">visibility</span> Live Data
          </span>
        </div>
      </nav>

      {/* Main Context Header */}
      <div>
        <h1 className="font-headline-lg text-3xl font-extrabold text-primary mb-2">
          Interactive Stellar Explorer
        </h1>
        <p className="font-body-lg text-sm text-on-surface-variant max-w-3xl">
          Analyze stellar life cycles on the Hertzsprung-Russell diagram. Select regions or adjust parameters to simulate evolutionary paths.
        </p>
      </div>

      {/* Main Content Layout: Grid 12 cols */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
        {/* Left Column: H-R Diagram Canvas & Simulation Log (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-lg">
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col h-[700px] relative shadow-2xl border border-white/10">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-surface-container-low/80">
              <h2 className="font-headline-md text-xl font-bold text-secondary">
                Hertzsprung-Russell Diagram
              </h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-code-md text-xs flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[16px]">visibility</span> Live Data
                </span>
              </div>
            </div>

            {/* Diagram Canvas Area */}
            <div
              className="flex-grow p-8 relative overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop'), linear-gradient(to bottom right, rgba(10, 14, 39, 0.85), rgba(0, 13, 49, 0.95))",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
              }}
            >
              {/* Evolutionary Tracks Overlay Lines */}
              <div className="absolute top-[10%] left-[10%] w-[40%] h-[30%] border border-dashed border-white/30 rounded-full rotate-12 pointer-events-none border-l-0 border-b-0">
                <span className="absolute right-0 bottom-0 text-[10px] text-white/60 bg-black/60 px-1 rounded font-code-md">
                  15 M☉ Track
                </span>
              </div>
              <div className="absolute top-[25%] left-[20%] w-[45%] h-[35%] border border-dashed border-white/30 rounded-full rotate-20 pointer-events-none border-l-0 border-b-0">
                <span className="absolute right-0 bottom-0 text-[10px] text-white/60 bg-black/60 px-1 rounded font-code-md">
                  5 M☉ Track
                </span>
              </div>
              <div className="absolute top-[50%] left-[40%] w-[50%] h-[40%] border border-dashed border-white/30 rounded-full rotate-25 pointer-events-none border-l-0 border-b-0">
                <span className="absolute right-0 bottom-0 text-[10px] text-white/60 bg-black/60 px-1 rounded font-code-md">
                  1 M☉ Track
                </span>
              </div>
              <div className="absolute top-[70%] left-[60%] w-[30%] h-[20%] border border-dashed border-white/30 rounded-full rotate-30 pointer-events-none border-l-0 border-b-0">
                <span className="absolute right-0 bottom-0 text-[10px] text-white/60 bg-black/60 px-1 rounded font-code-md">
                  0.5 M☉ Track
                </span>
              </div>

              {/* Axes Labels */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-code-md text-xs text-on-surface-variant font-bold">
                Surface Temperature (Kelvin) ← Hotter
              </div>
              <div className="absolute top-1/2 left-4 -translate-y-1/2 -rotate-90 font-code-md text-xs text-on-surface-variant font-bold whitespace-nowrap">
                Luminosity (L/L☉)
              </div>

              {/* Grid Lines */}
              <div className="absolute inset-10 border-l-2 border-b-2 border-surface-variant opacity-70 pointer-events-none" />

              {/* Interactive Region 1: Main Sequence */}
              <div
                onClick={() => setSelectedRegion('Main Sequence')}
                className={`absolute top-[15%] left-[15%] w-[70%] h-[70%] rounded-[50%_10%_50%_10%] -rotate-45 blur-md cursor-pointer transition-all duration-300 ${
                  selectedRegion === 'Main Sequence'
                    ? 'bg-gradient-to-br from-secondary/40 to-tertiary/40 border-2 border-secondary'
                    : 'bg-gradient-to-br from-secondary/15 to-tertiary/15 hover:from-secondary/30 hover:to-tertiary/30'
                }`}
                title="Main Sequence"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 font-code-md text-xs text-on-surface opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-surface-container/90 border border-white/10 px-3 py-1.5 rounded shadow-lg backdrop-blur">
                  Main Sequence
                </span>
              </div>

              {/* Interactive Region 2: Red Giant Branch */}
              <div
                onClick={() => setSelectedRegion('Red Giants')}
                className={`absolute top-[15%] right-[20%] w-[25%] h-[25%] rounded-full cursor-pointer transition-all duration-300 ${
                  selectedRegion === 'Red Giants'
                    ? 'bg-radial from-error/40 to-transparent border-2 border-error'
                    : 'bg-radial from-error/20 to-transparent hover:from-error/40'
                }`}
                title="Red Giant Branch"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-code-md text-xs text-error font-bold bg-surface-container/90 border border-error/30 px-3 py-1.5 rounded shadow-lg backdrop-blur whitespace-nowrap">
                  Red Giant Branch
                </span>
              </div>

              {/* Interactive Region 3: Horizontal Branch */}
              <div
                onClick={() => setSelectedRegion('Horizontal Branch')}
                className={`absolute top-[30%] left-[30%] w-[40%] h-[15%] rounded-full cursor-pointer transition-all duration-300 ${
                  selectedRegion === 'Horizontal Branch'
                    ? 'bg-radial from-error-container/40 to-transparent border-2 border-white'
                    : 'bg-radial from-error-container/20 to-transparent hover:from-error-container/40'
                }`}
                title="Horizontal Branch"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-code-md text-xs text-white font-bold bg-surface-container/90 border border-white/10 px-3 py-1.5 rounded shadow-lg backdrop-blur whitespace-nowrap">
                  Horizontal Branch
                </span>
              </div>

              {/* Interactive Region 4: White Dwarf Graveyard */}
              <div
                onClick={() => setSelectedRegion('White Dwarfs')}
                className={`absolute bottom-[20%] left-[20%] w-[20%] h-[20%] rounded-full cursor-pointer transition-all duration-300 ${
                  selectedRegion === 'White Dwarfs'
                    ? 'bg-radial from-tertiary/40 to-transparent border-2 border-tertiary'
                    : 'bg-radial from-tertiary/20 to-transparent hover:from-tertiary/40'
                }`}
                title="White Dwarf Graveyard"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-code-md text-xs text-tertiary font-bold bg-surface-container/90 border border-tertiary/30 px-3 py-1.5 rounded shadow-lg backdrop-blur whitespace-nowrap">
                  White Dwarf Graveyard
                </span>
              </div>

              {/* Solar Marker (☉ Sun) */}
              <div
                className="absolute w-3 h-3 border-2 border-[#ffcc00] rounded-full bg-transparent -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                style={{ left: '50%', top: '50%' }}
              >
                <span className="absolute top-4 left-[-10px] text-[10px] text-[#ffcc00] font-code-md whitespace-nowrap">
                  ☉ Sun
                </span>
              </div>

              {/* Animated Star Marker */}
              <div
                style={{
                  left: `${props.xPos}%`,
                  top: `${props.yPos}%`,
                  backgroundColor: props.starColor,
                  boxShadow: `0 0 15px #fff, 0 0 30px ${props.glowColor}`,
                }}
                className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-30 border border-white/80"
              />
            </div>
          </div>

          {/* Detailed Simulation Log Panel */}
          <div className="glass-panel rounded-xl p-md border-l-4 border-l-primary shadow-xl">
            <h3 className="font-code-md text-xs text-primary mb-2 uppercase tracking-widest flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              <span>Simulation Log</span>
            </h3>
            <p className="font-code-md text-sm text-on-surface-variant bg-surface-container-low/50 p-3 rounded border border-white/5 leading-relaxed">
              {props.logMsg}
            </p>
          </div>
        </div>

        {/* Right Column: Controls & Data (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-lg h-full">
          {/* Visual Feedback (3D Preview & Spectra) */}
          <div className="glass-active rounded-xl p-md flex flex-col items-center justify-center relative overflow-hidden shadow-2xl border border-white/10">
            <h3 className="font-code-md text-xs text-on-surface-variant absolute top-4 left-4 uppercase tracking-widest font-bold">
              Spectral Preview
            </h3>
            <div className="absolute top-4 right-4 flex gap-1">
              <span className="w-2 h-2 rounded-full bg-error shadow-[0_0_5px_#ffb4ab]" />
              <span className="w-2 h-2 rounded-full bg-surface-variant" />
              <span className="w-2 h-2 rounded-full bg-surface-variant" />
            </div>

            {/* Glowing 3D Star Sphere with Granulation Overlay */}
            <div
              style={{
                backgroundColor: props.starColor,
                boxShadow: `0 0 50px ${props.glowColor}, inset -15px -15px 30px rgba(0,0,0,0.6)`,
                transform: props.isEvolved
                  ? props.isWhiteDwarf
                    ? 'scale(0.6)'
                    : 'scale(1.3)'
                  : 'scale(1)',
              }}
              className="w-40 h-40 rounded-full transition-all duration-700 mt-6 mb-4 relative overflow-hidden border border-white/20 shadow-2xl"
            >
              {/* Granulation SVG Texture Overlay */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay animate-[spin_60s_linear_infinite]">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" stitchTiles="stitch" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
              </div>
            </div>

            <div className="text-center w-full mt-2">
              <div className="font-headline-md text-2xl font-bold text-secondary">
                {props.spectral}
              </div>
              <div className="font-code-md text-xs text-on-surface-variant mb-4">
                {props.isEvolved ? (props.isWhiteDwarf ? 'Degenerate Remnant' : 'Post-Main-Sequence') : 'Main Sequence'}
              </div>

              {/* Spectral Lines Absorption Bar */}
              <div className="w-full px-4 mb-2">
                <div className="text-[10px] text-outline text-left mb-1 uppercase font-code-md">
                  Absorption Spectrum
                </div>
                <div className="h-5 rounded relative overflow-hidden bg-gradient-to-r from-[#4a0080] via-[#0000ff] via-[#00ffff] via-[#00ff00] via-[#ffff00] via-[#ff8000] to-[#ff0000] border border-white/20">
                  <div className="absolute top-0 bottom-0 left-[15%] w-[2px] bg-black/80 shadow-[0_0_2px_rgba(0,0,0,0.5)]" />
                  <div className="absolute top-0 bottom-0 left-[30%] w-[2px] bg-black/80 shadow-[0_0_2px_rgba(0,0,0,0.5)]" />
                  <div className="absolute top-0 bottom-0 left-[45%] w-[3px] bg-black/80 shadow-[0_0_2px_rgba(0,0,0,0.5)]" />
                  <div className="absolute top-0 bottom-0 left-[60%] w-[2px] bg-black/80 shadow-[0_0_2px_rgba(0,0,0,0.5)]" />
                  <div className="absolute top-0 bottom-0 left-[80%] w-[4px] bg-black/80 shadow-[0_0_2px_rgba(0,0,0,0.5)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Stellar Evolution Simulator Controls */}
          <div className="glass-panel rounded-xl p-md flex-grow flex flex-col border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">tune</span>
                <h3 className="font-headline-md text-xl font-bold text-on-surface">
                  Evolution Simulator
                </h3>
              </div>
              <button className="p-1 rounded bg-surface-variant text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[16px]">speed</span>
              </button>
            </div>

            <div className="flex flex-col gap-6 flex-grow">
              {/* Initial Mass Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-code-md text-xs text-on-surface-variant font-bold">
                    Initial Mass (M☉)
                  </label>
                  <span className="font-code-md text-xs text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">
                    {mass.toFixed(1)}
                  </span>
                </div>
                <div className="relative pt-2 pb-4">
                  <input
                    type="range"
                    min="0.1"
                    max="50"
                    step="0.1"
                    value={mass}
                    onChange={(e) => setMass(parseFloat(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>
                <div className="flex justify-between font-code-md text-[10px] text-outline">
                  <span>0.1 (Red Dwarf)</span>
                  <span>50 (O-Type)</span>
                </div>
              </div>

              {/* Stellar Age Slider with Milestone Marker */}
              <div>
                <div className="flex justify-between mb-2 items-center">
                  <label className="font-code-md text-xs text-on-surface-variant font-bold">
                    Stellar Age (Gyr)
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex bg-surface-container-highest rounded text-[10px] overflow-hidden">
                      <button
                        onClick={() => setIsLogScale(false)}
                        className={`px-2 py-1 font-bold ${
                          !isLogScale ? 'bg-secondary text-on-secondary' : 'text-on-surface-variant'
                        }`}
                      >
                        Lin
                      </button>
                      <button
                        onClick={() => setIsLogScale(true)}
                        className={`px-2 py-1 font-bold ${
                          isLogScale ? 'bg-secondary text-on-secondary' : 'text-on-surface-variant'
                        }`}
                      >
                        Log
                      </button>
                    </div>
                    <span className="font-code-md text-xs text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">
                      {age.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="relative pt-2 pb-6">
                  <input
                    type="range"
                    min="0"
                    max="14"
                    step="0.1"
                    value={age}
                    onChange={(e) => setAge(parseFloat(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />

                  {/* Milestone Marker for H-Exhaustion */}
                  {props.msLifespan < 14 && (
                    <div
                      style={{ left: `${Math.min(95, Math.max(5, (props.msLifespan / 14) * 100))}%` }}
                      className="absolute top-[-2px] w-[2px] h-[8px] bg-[#919098] pointer-events-none select-none"
                    >
                      <span className="absolute top-[14px] text-[9px] text-[#919098] -translate-x-1/2 whitespace-nowrap font-code-md pointer-events-none select-none">
                        H-Exhaustion
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between font-code-md text-[10px] text-outline">
                  <span>0 (ZAMS)</span>
                  <span>14 (Current Universe)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto grid grid-cols-2 gap-4">
                <button
                  onClick={handleAnimate}
                  disabled={isAnimating}
                  className="bg-primary hover:bg-primary-fixed text-on-primary rounded-lg py-2.5 px-4 font-code-md text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isAnimating ? 'sync' : 'play_arrow'}
                  </span>
                  <span>{isAnimating ? 'Simulating...' : 'Animate'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="bg-surface-container-high hover:bg-surface-variant text-on-surface border border-outline-variant rounded-lg py-2.5 px-4 font-code-md text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Current Properties Data Panel */}
          <div className="glass-panel rounded-xl p-md border border-white/10 shadow-2xl">
            <h3 className="font-code-md text-xs text-on-surface-variant mb-4 uppercase tracking-widest border-b border-white/5 pb-2 font-bold flex justify-between">
              <span>Current Properties</span>
              <span className="text-tertiary">t = {age.toFixed(1)} Gyr</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 font-code-md">
              <div className="bg-surface-container-highest/80 p-3 rounded-lg border border-white/10 shadow-inner">
                <div className="text-[10px] text-outline-variant mb-1">Temperature</div>
                <div className="text-lg text-primary font-bold flex items-baseline gap-1">
                  <span>{props.temp.toLocaleString()}</span>
                  <span className="text-xs text-outline font-normal">K</span>
                </div>
              </div>

              <div className="bg-surface-container-highest/80 p-3 rounded-lg border border-white/10 shadow-inner">
                <div className="text-[10px] text-outline-variant mb-1">Luminosity</div>
                <div className="text-lg text-primary font-bold flex items-baseline gap-1">
                  <span>{props.lum}</span>
                  <span className="text-xs text-outline font-normal">L/L☉</span>
                </div>
              </div>

              <div className="bg-surface-container-highest/80 p-3 rounded-lg border border-white/10 shadow-inner">
                <div className="text-[10px] text-outline-variant mb-1">Radius</div>
                <div className="text-lg text-primary font-bold flex items-baseline gap-1">
                  <span>{props.rad}</span>
                  <span className="text-xs text-outline font-normal">R/R☉</span>
                </div>
              </div>

              <div className="bg-surface-container-highest/80 p-3 rounded-lg border border-white/10 shadow-inner">
                <div className="text-[10px] text-outline-variant mb-1">Expected Core</div>
                <div className="text-sm text-tertiary font-bold truncate">
                  {props.coreState}
                </div>
              </div>

              {/* Core Composition Bar */}
              <div className="col-span-2 bg-surface-container-highest/80 p-3 rounded-lg border border-white/10 shadow-inner flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-outline-variant mb-1">Core Composition</div>
                  <div className="text-sm text-secondary font-bold">
                    X: {props.hFrac.toFixed(2)}, Y: {props.heFrac.toFixed(2)}
                  </div>
                </div>
                <div className="w-24 h-2 bg-surface-variant rounded-full overflow-hidden flex">
                  <div
                    className="bg-blue-400 h-full transition-all duration-300"
                    style={{ width: `${(props.hFrac * 100).toFixed(0)}%` }}
                    title="Hydrogen (X)"
                  />
                  <div
                    className="bg-yellow-500 h-full transition-all duration-300"
                    style={{ width: `${(props.heFrac * 100).toFixed(0)}%` }}
                    title="Helium (Y)"
                  />
                  <div
                    className="bg-red-500 h-full transition-all duration-300"
                    style={{ width: `${(props.zFrac * 100).toFixed(0)}%` }}
                    title="Metals (Z)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
