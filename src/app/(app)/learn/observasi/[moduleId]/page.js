'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ObservasiModulePage() {
  const [activeSection, setActiveSection] = useState('jenis');

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-gutter">
      {/* Page Header */}
      <div className="mb-lg">
        <div className="flex items-center gap-xs text-on-surface-variant font-code-md text-code-md mb-sm">
          <Link href="/learn" className="hover:text-primary transition-colors">
            Learning Hub
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-primary font-bold">Module 4</span>
        </div>
        <h1 className="font-display-lg text-display-lg text-primary mb-xs">
          Instrumen &amp; Observasi
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          Pahami prinsip kerja teleskop, karakteristik detektor modern, dan teknik pengamatan mutakhir untuk memaksimalkan observasi astronomi Anda.
        </p>
      </div>

      {/* Content Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main Content Area (Left Col on Desktop: 8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-md">
          {/* Hero Section / Diagram */}
          <div className="glass-card rounded-xl overflow-hidden glow-accent relative min-h-[400px] flex items-end">
            <div
              className="absolute inset-0 bg-cover bg-center z-0 opacity-80"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbZIzdI7UP_BoVOtElIVszQkQywRXO9QcrTEEze7ATO7PveqEjpUSMYEqrkn46NFzQfxKKUnaJhOo3kOjbTPvqHPuzFTXVILwXeZ0jKR3fx3VmhB59IuEQ_fh_590NnKOhdlqrr3ohvcJgeJbsXpX74OT7_mmcz0TseHCACD6tQhHSq_o3-pCJlAKN1T0MTXE4Ggq7fM78Z_zYeDDyvY7Qd3XC59PnBMNyReypblxemZbOoxz258roZA')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent z-10" />
            <div className="relative z-20 p-margin w-full">
              <span className="inline-block px-sm py-xs bg-surface-container/80 backdrop-blur-md rounded-full font-code-md text-code-md text-primary border border-primary/30 mb-sm">
                Optika Fundamental
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs font-bold">
                Sistem Optik Teleskop
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Mekanisme penangkapan dan pemfokusan cahaya pada teleskop refraktor dan reflektor.
              </p>
            </div>
          </div>

          {/* Bento Grid for Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {/* Module Card 1 */}
            <div className="glass-panel p-md rounded-xl hover:glow-accent transition-shadow duration-300 group cursor-pointer flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center mb-sm border border-white/10 group-hover:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined text-secondary text-2xl">camera</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-xs font-bold">
                  CCD &amp; Detektor
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-sm line-clamp-2">
                  Teknologi sensor gambar solid-state untuk pencitraan astronomi resolusi tinggi.
                </p>
              </div>
              <div className="flex items-center gap-xs font-code-md text-code-md text-primary font-bold mt-2">
                <span>Mulai Belajar</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Module Card 2 */}
            <div className="glass-panel p-md rounded-xl hover:glow-accent transition-shadow duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between">
              <div
                className="absolute inset-0 bg-cover bg-center z-0 opacity-20 mix-blend-screen group-hover:opacity-40 transition-opacity"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGWQZkZNYZJ5Yazm5EmI7r8WT680Iz8oGOtBgxsmLdDjayRZXddPht1TGkBfZZHZEgebVrce_PXrWuOlPcN0ZEsXJIKDHu_cFjhBhDYRuVXVkzltYTabo0NnBTOvI2q7v-XGah31VculThZE6J0QmbFMafWxT_a6pJ8yQljrPcUGerDlXElJ_F4qPAaSyaTJ_O9w8_bgbZjVggoWO45PohRL2JcgCokLVaNpFd20VRuIo9yhIioHm1HA')",
                }}
              />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center mb-sm border border-white/10 group-hover:border-primary/50 transition-colors">
                    <span className="material-symbols-outlined text-secondary text-2xl">radar</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-xs font-bold">
                    Teleskop Non-Optik
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-sm line-clamp-2">
                    Eksplorasi alam semesta melalui panjang gelombang radio, inframerah, dan sinar-X.
                  </p>
                </div>
                <div className="flex items-center gap-xs font-code-md text-code-md text-primary font-bold mt-2">
                  <span>Lanjutkan</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar (Right Col on Desktop: 4 cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-md">
          {/* Quick Navigation Glass Card */}
          <div className="glass-card p-md rounded-xl">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-sm flex items-center gap-xs border-b border-white/10 pb-xs font-bold">
              <span className="material-symbols-outlined text-primary">menu_book</span>
              <span>Isi Modul</span>
            </h3>
            <ul className="flex flex-col gap-xs mt-sm">
              {[
                { id: 'jenis', label: 'Jenis Teleskop' },
                { id: 'ccd', label: 'CCD & Detektor' },
                { id: 'rencana', label: 'Perencanaan Observasi' },
                { id: 'koreksi', label: 'Koreksi Atmosfer' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left p-sm rounded-lg font-body-md transition-colors cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-surface-container-high/80 border-l-2 border-primary text-on-surface font-bold'
                        : 'hover:bg-surface-container-high/50 border-l-2 border-transparent text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                href="/practice/drill/1?module=observasi"
                className="w-full flex items-center justify-center bg-secondary-container text-on-secondary-container font-headline-md text-headline-md py-3 rounded-xl hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer active:scale-95 shadow-lg font-bold gap-2"
              >
                <span className="material-symbols-outlined text-lg">quiz</span>
                <span>Mulai Kuis</span>
              </Link>
            </div>
          </div>

          {/* Tool Highlight Card */}
          <div className="glass-panel p-md rounded-xl border border-secondary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-sm opacity-20 pointer-events-none">
              <span className="material-symbols-outlined text-6xl">build</span>
            </div>
            <h4 className="font-code-md text-code-md text-secondary mb-xs uppercase tracking-wider font-bold">
              Alat Interaktif
            </h4>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-sm font-bold">
              Kalkulator FoV
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-md leading-relaxed">
              Simulasikan Field of View untuk berbagai kombinasi teleskop dan eyepiece Anda.
            </p>
            <Link
              href="/tools/calculator"
              className="w-full py-sm bg-surface-container-high hover:bg-surface-bright text-primary border border-white/10 rounded-lg font-label-sm text-label-sm transition-colors flex items-center justify-center gap-xs cursor-pointer font-bold"
            >
              <span>Buka Alat</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
