'use client';

import Link from 'next/link';

export default function EvolusiStellarPage() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-gutter">
      {/* Header Section */}
      <header className="mb-lg" id="overview">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 border border-secondary/20 mb-md">
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00ffff]" />
          <span className="font-label-sm text-secondary font-bold">Bab 4 • Astrofisika Lanjut</span>
        </div>

        <h1 className="font-display-lg text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-sm">
          Evolusi Stellar
        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
          Perjalanan sebuah bintang dari fase Deret Utama (Main Sequence) hingga menjadi sisa bintang (stellar remnant). Jalur evolusi ini sangat bergantung pada massa awal bintang tersebut saat terbentuk dari nebula.
        </p>
      </header>

      {/* Bento Grid Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter items-start">
        {/* Diagram Visual (Spans 2 cols) */}
        <section className="xl:col-span-2 glass-active rounded-xl p-md flex flex-col relative overflow-hidden border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-md relative z-10">
            <h3 className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary">account_tree</span>
              <span>Jalur Evolusi Bintang</span>
            </h3>
            <span className="font-label-sm text-xs bg-surface-container py-1 px-3 rounded-full text-on-surface-variant border border-white/10 font-bold">
              Diagram Interaktif
            </span>
          </div>

          <div className="relative w-full h-80 rounded-lg overflow-hidden border border-white/10 bg-surface-container-low">
            <img
              alt="Diagram Evolusi Stellar"
              className="w-full h-full object-cover opacity-80 mix-blend-screen"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY1zfHW8bpSkCDrd1zMdCjn8KxfP-xbTaYRxMNTsSgJVnnkEoFb5o3g59IPlibyBKE3tLjetKFuPO0LDFbPn4o7eeLGFvW5Y7EWwyK182j2lI1vfYK4n5UAWy6KY_5WAFfDIeFhdb5ho1SlGy3Z4NUg-s_VKX3i0Oc-r58ABR6Vq15NVNXCF_xk891h1ATQNTNxz5aeNjiPE37G7I35x5CB67z6vq8N0i9jTr7sgXyZLQKLO4tmFUQIA"
            />
            {/* Overlay Labels */}
            <div className="absolute top-4 left-4 font-label-sm text-xs text-cyan-400 bg-background/80 px-2.5 py-1 rounded backdrop-blur-sm border border-cyan-400/30 font-bold">
              Nebula
            </div>
            <div className="absolute top-1/2 left-1/4 font-label-sm text-xs text-on-surface bg-background/80 px-2.5 py-1 rounded backdrop-blur-sm border border-white/20 font-bold">
              Deret Utama
            </div>
          </div>

          {/* Interactive Tool Banner */}
          <div className="mt-md pt-md border-t border-white/10 flex items-center justify-between">
            <span className="font-body-md text-sm text-on-surface-variant font-semibold">
              Uji skenario evolusi secara real-time di simulator:
            </span>
            <Link
              href="/learn/astrofisika/explorer"
              className="px-4 py-2 bg-primary text-on-primary font-bold rounded-lg font-label-sm text-xs flex items-center gap-2 hover:bg-primary-fixed-dim transition-colors"
            >
              <span>Detailed Stellar Explorer Pro</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* Low Mass Card */}
        <section className="glass-panel rounded-xl p-md flex flex-col bg-surface-container border border-white/10 shadow-xl" id="raksasa-merah">
          <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center mb-md border border-white/5 shadow-inner">
            <span className="material-symbols-outlined text-yellow-400 text-2xl">star_half</span>
          </div>

          <h3 className="font-headline-md text-xl font-bold text-on-surface mb-sm">
            Bintang Massa Rendah
          </h3>

          <p className="font-body-md text-sm text-on-surface-variant mb-md flex-1 leading-relaxed">
            Bintang dengan massa mirip Matahari (hingga ~8 massa Matahari). Berevolusi secara perlahan melintasi miliaran tahun.
          </p>

          <ul className="space-y-sm">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-red-500 text-sm mt-1">lens</span>
              <div>
                <span className="font-label-sm text-on-surface font-bold block">Raksasa Merah</span>
                <span className="text-xs text-on-surface-variant">Pembengkakan atmosfer saat hidrogen inti habis.</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-secondary text-sm mt-1">blur_on</span>
              <div>
                <span className="font-label-sm text-on-surface font-bold block">Nebula Planetari</span>
                <span className="text-xs text-on-surface-variant">Lapisan luar yang terhempas ke angkasa.</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-on-surface text-sm mt-1">radio_button_unchecked</span>
              <div>
                <span className="font-label-sm text-on-surface font-bold block">Katai Putih (White Dwarf)</span>
                <span className="text-xs text-on-surface-variant">Inti karbon-oksigen padat yang tersisa.</span>
              </div>
            </li>
          </ul>
        </section>

        {/* High Mass Card */}
        <section className="glass-panel rounded-xl p-md flex flex-col bg-surface-container border border-white/10 shadow-xl" id="supernova">
          <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center mb-md border border-white/5 shadow-inner">
            <span className="material-symbols-outlined text-cyan-400 text-2xl">stars</span>
          </div>

          <h3 className="font-headline-md text-xl font-bold text-on-surface mb-sm">
            Bintang Massa Tinggi
          </h3>

          <p className="font-body-md text-sm text-on-surface-variant mb-md flex-1 leading-relaxed">
            Bintang bermassa besar (&gt;8 massa Matahari). Membakar bahan bakar dengan sangat cepat dan berakhir secara dramatis.
          </p>

          <ul className="space-y-sm">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-red-500 text-sm mt-1">lens</span>
              <div>
                <span className="font-label-sm text-on-surface font-bold block">Super raksasa (Supergiant)</span>
                <span className="text-xs text-on-surface-variant">Fusi elemen berat hingga besi di inti.</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-yellow-400 text-sm mt-1">explosion</span>
              <div>
                <span className="font-label-sm text-on-surface font-bold block">Supernova</span>
                <span className="text-xs text-on-surface-variant">Ledakan dahsyat saat inti besi runtuh.</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Remnants (Spans 2 cols) */}
        <section className="xl:col-span-2 glass-panel rounded-xl p-md border-l-4 border-l-primary bg-surface-container shadow-xl" id="sisa-bintang">
          <h3 className="font-headline-md text-xl font-bold text-on-surface mb-sm flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary">trip_origin</span>
            <span>Sisa Bintang Ekstrem (Remnants)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-md">
            <div className="bg-surface-container/50 p-sm rounded border border-white/5 hover:border-cyan-400/30 transition-colors">
              <h4 className="font-label-sm text-cyan-400 font-bold mb-1">Bintang Neutron</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Terbentuk jika sisa massa inti antara 1.4 hingga ~3 massa Matahari. Sangat padat, tersusun dari materi neutron murni. Sering berputar cepat sebagai Pulsar.
              </p>
            </div>

            <div className="bg-surface-container/50 p-sm rounded border border-white/5 hover:border-error/30 transition-colors">
              <h4 className="font-label-sm text-error font-bold mb-1">Lubang Hitam (Black Hole)</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Terbentuk jika massa inti melebihi batas Tolman-Oppenheimer-Volkoff (~3 massa Matahari). Gravitasi runtuh tak terbatas membentuk singularitas.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Navigation */}
      <footer className="mt-xl py-md border-t border-white/10 flex justify-between items-center text-sm text-on-surface-variant">
        <p>AstroLearn Platform © 2026</p>
        <div className="flex gap-md font-code-md text-xs">
          <Link href="/learn/astrofisika/pembentukan" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Pembentukan Bintang</span>
          </Link>
          <Link href="/learn/astrofisika/hr-diagram" className="hover:text-primary transition-colors flex items-center gap-1">
            <span>H-R Diagram Overview</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
