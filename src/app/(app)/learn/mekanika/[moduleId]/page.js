'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MekanikaModulePage() {
  const [activeSection, setActiveSection] = useState('intro');

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-gutter">
      {/* Module Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-label-sm text-label-sm font-code-md text-accent_cyan px-3 py-1 rounded-full bg-accent_cyan/10 border border-accent_cyan/30">
            MODULE 04
          </span>
          <span className="font-label-sm text-label-sm font-code-md text-secondary px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30">
            INTERMEDIATE
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
          Mekanika Benda Langit
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          Explore the fundamental physics that govern the motion of planets, stars, and galaxies. From Kepler's empirical observations to Newton's universal gravitation.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Navigation / Sub-topics (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-gutter">
          <div className="glass-card rounded-xl p-4 sticky top-gutter">
            <h3 className="font-headline-md text-headline-md text-primary mb-4 border-b border-white/10 pb-2 !text-lg">
              Module Sections
            </h3>
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => setActiveSection('intro')}
                className={`px-3 py-2 rounded-lg font-medium flex items-center justify-between group transition-colors cursor-pointer text-left ${
                  activeSection === 'intro'
                    ? 'text-accent_cyan bg-white/5'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                }`}
              >
                <span>Introduction to Orbits</span>
                <span
                  className={`material-symbols-outlined text-sm transition-opacity ${
                    activeSection === 'intro' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  chevron_right
                </span>
              </button>

              <button
                onClick={() => setActiveSection('kepler')}
                className={`px-3 py-2 rounded-lg font-medium flex items-center justify-between group transition-colors cursor-pointer text-left ${
                  activeSection === 'kepler'
                    ? 'text-accent_cyan bg-white/5'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                }`}
              >
                <span>Hukum Kepler</span>
                <span
                  className={`material-symbols-outlined text-sm transition-opacity ${
                    activeSection === 'kepler' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  chevron_right
                </span>
              </button>

              <button
                onClick={() => setActiveSection('energi')}
                className={`px-3 py-2 rounded-lg font-medium flex items-center justify-between group transition-colors cursor-pointer text-left ${
                  activeSection === 'energi'
                    ? 'text-accent_cyan bg-white/5'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                }`}
              >
                <span>Energi Orbit</span>
                <span
                  className={`material-symbols-outlined text-sm transition-opacity ${
                    activeSection === 'energi' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  chevron_right
                </span>
              </button>

              <Link
                href="/practice/tryout"
                className="px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors flex items-center justify-between group mt-4 border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">edit_note</span>
                  <span>Problem Set</span>
                </div>
              </Link>

              <div className="mt-4 pt-4 border-t border-white/10">
                <Link
                  href="/practice/drill/1?module=mekanika"
                  className="w-full flex items-center justify-center bg-secondary-container text-on-secondary-container font-headline-md text-headline-md py-3 rounded-xl hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer active:scale-95 shadow-lg font-bold gap-2"
                >
                  <span className="material-symbols-outlined text-lg">quiz</span>
                  <span>Mulai Kuis</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Center/Right Column: Main Content Area (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-gutter">
          {/* Hero Diagram / Concept Map */}
          <div className="glass-card rounded-2xl overflow-hidden relative min-h-[300px] flex items-center justify-center glow-accent group">
            {/* Diagram Background Image */}
            <div
              className="absolute inset-0 z-0 opacity-40 mix-blend-screen bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeN3Oe_KL6CqDOu-s8bNLUboORQ4XAgAcQ1h9sHgZiFJ8D0OR0X4rcLsXHsg0o4Q8MPisQKtJ5HcRnvZ9Duo1H97XlDT3u7IOTTinVO5Hph56tKIxhh4WDCg_tirVup8K7uhJjX9JYh3yynLBCieHSN3n60LKbA4gwh42ponnXIsNaJXLzTzbIdaglUlqNunLu21o6D053nu1cmbR9CUUfVNX6XU7ANHzHK8_FzOkm1UWGfUB4_FSbAA')",
              }}
            />
            <div className="relative z-10 p-margin text-center">
              <span className="material-symbols-outlined text-display-lg text-accent_gold mb-4 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                orbit
              </span>
              <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">
                The Architecture of Gravity
              </h3>
              <p className="text-on-surface-variant max-w-xl mx-auto">
                Understanding how mass warps spacetime to create the predictable paths of celestial bodies.
              </p>
            </div>
          </div>

          {/* Content Block: Hukum Kepler */}
          <div className="glass-card rounded-2xl p-margin" id="kepler">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-primary">looks_one</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface">Hukum Kepler</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div>
                <p className="text-on-surface-variant mb-4">
                  Johannes Kepler derived three laws of planetary motion based on Tycho Brahe's meticulous observations. These laws revolutionized our understanding of the solar system, replacing circular orbits with ellipses.
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-white/5">
                    <h4 className="font-bold text-on-surface mb-1 flex items-center gap-2">
                      <span className="text-accent_cyan font-code-md">I.</span> Hukum Orbit
                    </h4>
                    <p className="text-sm text-on-surface-variant">
                      Setiap planet bergerak pada lintasan elips dengan Matahari berada di salah satu titik fokusnya.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-white/5">
                    <h4 className="font-bold text-on-surface mb-1 flex items-center gap-2">
                      <span className="text-accent_cyan font-code-md">II.</span> Hukum Luasan
                    </h4>
                    <p className="text-sm text-on-surface-variant">
                      Garis khayal yang menghubungkan planet dan Matahari menyapu luasan yang sama dalam selang waktu yang sama.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/10 relative h-64">
                <img
                  alt="Kepler's Second Law Diagram"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvkn8oGAnafgwm9GW9d3yt88kABYHiisGJ192-r24ZTVqLc5SOTO5hYwoFT6eAvCEaXm0eEtmmPyH2n9H0BtJKIkf1I9L8XiCxyHrwFcvNOjhwkICyWREFYIFjF-IMcL4DRWx8d5XywLCqe9PxmgUu1cWyN1Klb4BkNtvTLPH6oTmkb7i0DiUSVg-N7R_dR4dtYmXpFxCdiMj-J29bhuo5OojMC6L3l6Gc0oOS2sV0kXBWFjd_Ko84Pg"
                />
              </div>
            </div>
          </div>

          {/* Data Module: Key Equations */}
          <div className="glass-panel rounded-2xl p-margin border-l-4 border-l-accent_cyan">
            <h4 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-accent_cyan">calculate</span>
              Persamaan Kritis
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-surface-container/50 p-4 rounded-lg flex flex-col justify-center items-center font-code-md text-code-md border border-white/5">
                <span className="text-on-surface-variant text-xs mb-2">Hukum Kepler III</span>
                <span className="text-on-surface text-lg">P² = (4π² / GM) · a³</span>
              </div>
              <div className="bg-surface-container/50 p-4 rounded-lg flex flex-col justify-center items-center font-code-md text-code-md border border-white/5">
                <span className="text-on-surface-variant text-xs mb-2">Kecepatan Lepas (Escape Velocity)</span>
                <span className="text-on-surface text-lg">vₑ = √(2GM / r)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
