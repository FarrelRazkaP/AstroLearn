'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AstronomiBolaModulePage() {
  const [sphereMode, setSphereMode] = useState('equator');

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-gutter">
      {/* Header */}
      <header className="mb-lg">
        <div className="inline-block px-3 py-1 rounded-full bg-tertiary-container text-tertiary font-label-sm text-label-sm mb-sm border border-tertiary/30 font-bold">
          Modul 2.1
        </div>
        <h1 className="font-display-lg text-display-lg text-primary mb-xs font-extrabold">
          Sistem Koordinat
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Memahami letak objek di langit menggunakan sistem koordinat Ekuatorial dan Alt-Azimuth. Konsep dasar trigonometri bola untuk navigasi celestial.
        </p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Hero Interactive Diagram Area (Spans 8 cols) */}
        <section className="glass-card rounded-xl p-md md:col-span-8 relative overflow-hidden flex flex-col min-h-[400px]">
          <div className="flex justify-between items-start mb-sm relative z-10">
            <h3 className="font-headline-md text-headline-md text-primary font-bold">
              Bola Langit
            </h3>
            <div className="flex gap-xs">
              <span className="px-2 py-1 rounded-full bg-secondary-container/50 text-secondary font-label-sm text-label-sm border border-secondary/20 font-bold">
                3D Interactive
              </span>
            </div>
          </div>

          <div className="flex-1 w-full bg-surface-dim/50 rounded-lg border border-white/5 relative flex items-center justify-center overflow-hidden min-h-[300px]">
            {/* Background 3D Celestial Sphere Graphic */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-container/20"></div>
            <img
              alt="Celestial Sphere Diagram"
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC902Zg563HumUOZ7it0eUrivuNSnrLnrvSO_5Y2F6kwZhYFJkVX-qiWo-4UNyL3gCzczAnk1fWQgvfHJJsw0rxnFrqZnDX0_GxFVqHfmOdI5Wumf8IT5r78-gXr87CK8Sw6AqQfvlNim-YmUJoC4ZqR1vXEFfDPt8BM3c9etfITAkNfZo9iZBfT4MtK1Dqn84c-XP3PoSn3F0WEYr-LNMw2DPBL5wVFuqQriNdKlGUdEpHOaV6KdZQrg"
            />

            {/* Overlay UI elements */}
            <div className="absolute bottom-4 left-4 flex gap-sm z-20">
              <button
                onClick={() => setSphereMode('equator')}
                className={`px-3 py-1.5 rounded-lg border font-label-sm text-label-sm flex items-center gap-xs transition-colors cursor-pointer ${
                  sphereMode === 'equator'
                    ? 'bg-primary text-on-primary border-primary font-bold'
                    : 'bg-surface-container/80 backdrop-blur text-on-surface border-outline-variant hover:bg-surface-bright'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>Ekuator</span>
              </button>

              <button
                onClick={() => setSphereMode('altaz')}
                className={`px-3 py-1.5 rounded-lg border font-label-sm text-label-sm flex items-center gap-xs transition-colors cursor-pointer ${
                  sphereMode === 'altaz'
                    ? 'bg-primary text-on-primary border-primary font-bold'
                    : 'bg-surface-container/80 backdrop-blur text-on-surface border-outline-variant hover:bg-surface-bright'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>Alt-Az</span>
              </button>
            </div>
          </div>
        </section>

        {/* Key Concepts (Spans 4 cols) */}
        <section className="flex flex-col gap-gutter md:col-span-4 justify-between">
          {/* Concept 1: Ekuatorial */}
          <div className="glass-panel rounded-xl p-md flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-sm mb-sm">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center border border-primary/30">
                  <span className="material-symbols-outlined text-primary text-[18px]">public</span>
                </div>
                <h4 className="font-headline-md text-[18px] font-bold text-on-surface">
                  Ekuatorial
                </h4>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-sm leading-relaxed">
                Sistem koordinat yang terikat pada bintang, menggunakan Asensio Rekta (RA) dan Deklinasi (Dec). Tidak bergantung pada waktu atau lokasi pengamat.
              </p>
            </div>

            <div className="flex gap-xs mt-auto">
              <span className="font-code-md text-code-md text-secondary bg-secondary-container/30 px-2 py-0.5 rounded font-bold">
                RA: Jam
              </span>
              <span className="font-code-md text-code-md text-secondary bg-secondary-container/30 px-2 py-0.5 rounded font-bold">
                Dec: Derajat
              </span>
            </div>
          </div>

          {/* Concept 2: Alt-Azimuth */}
          <div className="glass-panel rounded-xl p-md flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-sm mb-sm">
                <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center border border-tertiary/30">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">my_location</span>
                </div>
                <h4 className="font-headline-md text-[18px] font-bold text-on-surface">
                  Alt-Azimuth
                </h4>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-sm leading-relaxed">
                Sistem lokal berbasis pengamat. Menggunakan Altitude (ketinggian dari horizon) dan Azimuth (arah mata angin). Berubah seiring waktu.
              </p>
            </div>

            <div className="flex gap-xs mt-auto">
              <span className="font-code-md text-code-md text-tertiary bg-tertiary-container/30 px-2 py-0.5 rounded font-bold">
                Alt: 0°-90°
              </span>
              <span className="font-code-md text-code-md text-tertiary bg-tertiary-container/30 px-2 py-0.5 rounded font-bold">
                Az: 0°-360°
              </span>
            </div>
          </div>

          {/* Mulai Kuis Button Card */}
          <div className="glass-card rounded-xl p-md flex items-center justify-between">
            <Link
              href="/practice/drill/1?module=astronomi-bola"
              className="w-full flex items-center justify-center bg-secondary-container text-on-secondary-container font-headline-md text-headline-md py-3 rounded-xl hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer active:scale-95 shadow-lg font-bold gap-2"
            >
              <span className="material-symbols-outlined text-lg">quiz</span>
              <span>Mulai Kuis</span>
            </Link>
          </div>
        </section>

        {/* Trigonometri Bola & Formula (Spans full 12 cols) */}
        <section className="glass-card rounded-xl p-md md:col-span-12">
          <h3 className="font-headline-lg text-headline-lg text-primary mb-md font-bold">
            Trigonometri Bola
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
            <div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md leading-relaxed">
                Segitiga bola terbentuk oleh busur-busur lingkaran besar pada permukaan bola. Aturan dasar seperti Aturan Sinus dan Cosinus bola sangat penting untuk transformasi koordinat.
              </p>

              <div className="space-y-sm">
                <div className="bg-surface-container-low p-sm rounded-lg border border-white/5 flex items-center justify-between flex-wrap gap-2">
                  <span className="font-body-md text-on-surface font-semibold">Aturan Cosinus</span>
                  <span className="font-code-md text-primary bg-primary-container/50 px-2 py-1 rounded font-bold">
                    cos(a) = cos(b)cos(c) + sin(b)sin(c)cos(A)
                  </span>
                </div>

                <div className="bg-surface-container-low p-sm rounded-lg border border-white/5 flex items-center justify-between flex-wrap gap-2">
                  <span className="font-body-md text-on-surface font-semibold">Aturan Sinus</span>
                  <span className="font-code-md text-primary bg-primary-container/50 px-2 py-1 rounded font-bold">
                    sin(a)/sin(A) = sin(b)/sin(B) = sin(c)/sin(C)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container/50 rounded-lg border border-white/5 p-sm flex items-center justify-center relative min-h-[200px]">
              <img
                alt="Spherical Triangle Diagram"
                className="w-full h-full object-contain mix-blend-screen opacity-90"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6nP1axwjJZ-sTe3574XnPxM3ybO0hEf8yIunPotl4W4sl7PTk8izxV8HdnpcBpocCPOzC-SNaABxouqLpW8t6OnThl4icxvTSMC0lS5kasW0H8mly1JLxxDsrtQbFf4SNXgSfKzAFjFBp4zeJ6LZU_O9ZuZ2i3tKt-DmPezcAbC8TZTGWID1DV1GUhtJ5B_SvI-1yjhjR4gdePzhVDw1qGh1Mac3Y7w50TMoZmjbIkdQ_MGGCaF1ACg"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
