'use client';

import Link from 'next/link';
import ShaderCanvas from '@/components/effects/ShaderCanvas';

export default function LandingPage() {
  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin h-16 bg-secondary-container/40 dark:bg-secondary-container/40 backdrop-blur-xl border-b border-white/10 shadow-xl">
        <div className="font-display-lg text-display-lg text-primary dark:text-primary tracking-tight" style={{ fontSize: '24px', lineHeight: '32px' }}>
          AstroLearn
        </div>

        <div className="hidden md:flex space-x-md items-center">
          <Link href="/" className="text-primary font-bold cursor-pointer active:scale-95 duration-200 hover:bg-white/10 transition-colors p-2 rounded">
            Home
          </Link>
          <Link href="/learn" className="text-on-surface-variant cursor-pointer active:scale-95 duration-200 hover:bg-white/10 transition-colors p-2 rounded">
            Programs
          </Link>
          <Link href="/about" className="text-on-surface-variant cursor-pointer active:scale-95 duration-200 hover:bg-white/10 transition-colors p-2 rounded">
            About
          </Link>
        </div>

        <div className="flex space-x-sm items-center">
          <button className="p-2 rounded-full hover:bg-white/10 text-primary transition-colors cursor-pointer" title="Notifikasi">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 text-primary transition-colors cursor-pointer" title="Mode Gelap">
            <span className="material-symbols-outlined">dark_mode</span>
          </button>
          <Link
            href="/profile"
            title="Lihat Profil & Pengaturan"
            className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant hover:border-secondary transition-all cursor-pointer active:scale-95 duration-200 block shadow-md hover:shadow-[0_0_15px_rgba(201,191,253,0.4)]"
          >
            <img
              alt="User profile avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdLKfzfaAfA-yOmQOxx0G_RLWhpEDN_i7dvB2Ol1072d7IQ0hUw4bIpMYuMgmeas3wP_jgmDXuAaaMUI0FfbSkq9IlhpIu9mxeqpuaOdjDtvwCG8bZpC-VQaIi2ugJnJRKAelD-LhQSij4t1WyuFWDkSmMbmQML999jGJwTBDG0MB2iUIewNl09hVHoHC21w7fTX3jnKpWcaDpk7-co3QnXNbR67Aw7QcKM2LP_8J7WcbcXrfjI06H6Q"
            />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-margin overflow-hidden pt-16">
        {/* WebGL Starfield Shader Canvas */}
        <ShaderCanvas opacity={0.8} />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
          <div className="glass-panel px-lg py-md rounded-full mb-lg border-t border-white/20 inline-flex items-center gap-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-code-md text-code-md text-primary tracking-widest uppercase">
              Platform Pembelajaran Astronomi Terpadu
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg mb-md lg:text-[72px] lg:leading-[80px]">
            <span className="text-on-background block">Jelajahi Alam Semesta,</span>
            <span className="text-stellar-gold">Mulai Dari Sini.</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-2xl mx-auto">
            AstroLearn adalah platform multi-persona yang dirancang khusus untuk membawa Anda menembus batas atmosfer. Baik Anda seorang pemula yang penasaran, siswa pejuang OSN, mahasiswa fisika, atau guru pembimbing, temukan lintasan belajar Anda di sini.
          </p>

          <Link
            href="/onboarding"
            className="glass-panel px-xl py-md rounded-full font-headline-md text-headline-md text-on-background hover:bg-white/10 transition-all duration-300 border border-primary/30 hover:border-primary glow-cyan flex items-center gap-sm group cursor-pointer"
          >
            <span>Mulai Belajar</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Personas Section */}
      <section className="relative z-10 py-xl px-margin max-w-7xl mx-auto">
        <div className="text-center mb-xl">
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-sm">Pilih Lintasan Orbit Anda</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Modul pembelajaran yang dikalibrasi secara presisi untuk setiap tingkatan keahlian astronomi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* Pemula */}
          <Link
            href="/onboarding"
            className="glass-panel p-lg rounded-xl flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 glow-cyan border-t border-white/20 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-md border border-primary/20">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                rocket_launch
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-background mb-sm">Pemula</h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-md">
              Pengenalan rasi bintang, tata surya dasar, dan fenomena langit sehari-hari.
            </p>
            <div className="font-label-sm text-label-sm text-primary uppercase tracking-wider flex items-center gap-xs group-hover:translate-x-1 transition-transform">
              <span>Jelajahi</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </div>
          </Link>

          {/* OSN/IOAA */}
          <Link
            href="/onboarding"
            className="glass-panel p-lg rounded-xl flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 glow-cyan border-t border-white/20 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-md border border-primary/20">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                workspace_premium
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-background mb-sm">OSN / IOAA</h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-md">
              Materi mendalam, bank soal kompetisi, astronomi bola, dan astrofisika teoretis.
            </p>
            <div className="font-label-sm text-label-sm text-primary uppercase tracking-wider flex items-center gap-xs group-hover:translate-x-1 transition-transform">
              <span>Persiapan</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </div>
          </Link>

          {/* Mahasiswa */}
          <Link
            href="/onboarding"
            className="glass-panel p-lg rounded-xl flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 glow-cyan border-t border-white/20 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-md border border-primary/20">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                school
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-background mb-sm">Mahasiswa</h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-md">
              Mekanika benda langit, kosmologi, teknik observasi, dan pengolahan data.
            </p>
            <div className="font-label-sm text-label-sm text-primary uppercase tracking-wider flex items-center gap-xs group-hover:translate-x-1 transition-transform">
              <span>Riset</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </div>
          </Link>

          {/* Guru */}
          <Link
            href="/onboarding"
            className="glass-panel p-lg rounded-xl flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 glow-cyan border-t border-white/20 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-md border border-primary/20">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                group
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-background mb-sm">Guru</h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-md">
              Rencana pelaksanaan pembelajaran, alat peraga visual, dan sistem evaluasi.
            </p>
            <div className="font-label-sm text-label-sm text-primary uppercase tracking-wider flex items-center gap-xs group-hover:translate-x-1 transition-transform">
              <span>Mengajar</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
