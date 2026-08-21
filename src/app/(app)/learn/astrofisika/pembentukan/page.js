'use client';

import Link from 'next/link';

export default function PembentukanBintangPage() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-gutter">
      {/* Breadcrumb & Header */}
      <div className="mb-lg">
        <div className="flex items-center gap-xs font-label-sm text-xs text-on-surface-variant mb-sm">
          <Link href="/learn" className="hover:text-primary transition-colors">
            Learning Hub
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>Astrofisika Dasar</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-bold">Pembentukan Bintang</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <h1 className="font-display-lg text-4xl font-extrabold text-on-surface mb-xs">
              Pembentukan Bintang
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Memahami siklus hidup awal bintang, dari keruntuhan awan molekul raksasa hingga fase T-Tauri.
            </p>
          </div>

          <div className="flex gap-sm">
            <span className="bg-[#2b2f49] border border-[#777a99] text-[#dee0ff] px-3 py-1 rounded-full font-code-md text-xs inline-flex items-center gap-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#c1c4e6] animate-pulse" /> Modul Aktif
            </span>
            <span className="bg-[#000d31] border border-[#c1c4e6] text-[#c1c4e6] px-3 py-1 rounded-full font-code-md text-xs inline-flex items-center gap-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">schedule</span> 45 Menit
            </span>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main Content Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-gutter">
          {/* Intro Card */}
          <section className="glass-card rounded-xl p-md glow-accent border border-white/10">
            <h2 className="font-headline-md text-xl font-bold text-primary mb-sm flex items-center gap-sm">
              <span className="material-symbols-outlined">blur_on</span>
              <span>Pendahuluan: Awan Molekul Raksasa (GMC)</span>
            </h2>
            <div className="prose prose-invert max-w-none font-body-md text-body-md text-on-surface leading-relaxed space-y-4">
              <p>
                Bintang tidak terbentuk di ruang kosong, melainkan di dalam <strong>Awan Molekul Raksasa (Giant Molecular Clouds - GMC)</strong>. Awan ini adalah struktur masif gas dan debu antarbintang yang sangat dingin (sekitar 10 hingga 20 Kelvin) dan padat, terutama terdiri dari molekul hidrogen ($H_2$).
              </p>
              <p>
                Proses pembentukan bintang dimulai ketika keseimbangan hidrostatik di dalam awan terganggu. Gangguan ini bisa berupa gelombang kejut dari supernova terdekat, tabrakan antar awan, atau gelombang kepadatan galaksi. Ketika gangguan ini menyebabkan massa suatu wilayah awan melebihi <em>Massa Jeans</em>, gravitasi mulai mendominasi atas tekanan termal gas, memicu keruntuhan awan (collapse).
              </p>
            </div>
          </section>

          {/* Visual / Diagram */}
          <div className="relative w-full h-[360px] rounded-xl overflow-hidden border border-white/10 group">
            <div
              className="absolute inset-0 bg-cover bg-center w-full h-full z-0 transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDo_Yt374tAV7BIGs-wJphBjBG-jXJHpvLdp_ADvgZ_KeDqu-la3KWf2Nqa7fddxbzxlsfZTmenMU5ZImX_UckYjipd6vMFq-KUWTfbKdAj6RdXFRkN83KAU3gWVcgTvGqf1NAQHwXfaJ6TEWd7pzncc7W53m_1n6MU1riqU_wUPvUPQuRd8WR8jSSd8vi3rXdIuX4eX2vUEnQEALWraXY-tcrnpeEKYMQmZW15kMRZzcX_J5Q75Kn7zQ')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-transparent to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-md z-20 w-full">
              <p className="font-code-md text-xs text-primary mb-xs uppercase tracking-widest font-bold">
                Visualisasi
              </p>
              <p className="font-body-md text-body-md text-on-surface drop-shadow-md">
                Keruntuhan bertahap inti padat dalam nebula gelap, membentuk piringan akresi awal.
              </p>
            </div>
          </div>

          {/* Key Phases */}
          <section className="glass-panel rounded-xl p-md border border-white/10 shadow-xl">
            <h2 className="font-headline-md text-xl font-bold text-secondary mb-md">
              Fase Utama Pembentukan
            </h2>
            <div className="space-y-sm">
              {/* Phase 1 */}
              <div className="bg-surface-container-high/50 p-sm rounded-lg border border-outline-variant flex gap-md items-start">
                <div className="w-8 h-8 rounded-full bg-secondary-container flex-shrink-0 flex items-center justify-center text-on-secondary-container font-bold font-label-sm">
                  1
                </div>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface mb-xs">
                    Keruntuhan Awan (Cloud Collapse)
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    Inti awan runtuh di bawah gravitasinya sendiri. Saat menyusut, material memanas karena konversi energi potensial gravitasi menjadi energi termal. Bagian luar awan tetap dingin dan gelap, menyembunyikan proses ini dari cahaya tampak.
                  </p>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="bg-surface-container-high/50 p-sm rounded-lg border border-outline-variant flex gap-md items-start">
                <div className="w-8 h-8 rounded-full bg-secondary-container flex-shrink-0 flex items-center justify-center text-on-secondary-container font-bold font-label-sm">
                  2
                </div>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface mb-xs">
                    Pembentukan Protobintang
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    Pusat awan menjadi buram terhadap radiasi infra merah, menyebabkan suhu dan tekanan meningkat tajam. Sebuah inti hidrostatik terbentuk di pusat — ini adalah Protobintang. Material dari awan sekitar terus jatuh (akresi) ke protobintang, seringkali membentuk piringan akresi akibat kekekalan momentum sudut.
                  </p>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="bg-surface-container-high/50 p-sm rounded-lg border border-outline-variant flex gap-md items-start">
                <div className="w-8 h-8 rounded-full bg-secondary-container flex-shrink-0 flex items-center justify-center text-on-secondary-container font-bold font-label-sm">
                  3
                </div>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface mb-xs">
                    Fase T-Tauri
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    Protobintang berhenti mengakresi material secara besar-besaran dan mulai memancarkan angin bintang yang kuat, membersihkan sisa awan gas dan debu di sekitarnya. Pada fase ini, protobintang terlihat (terutama di inframerah) namun belum memulai fusi nuklir hidrogen di intinya. Ini adalah fase pra-deret utama.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          {/* Interactive Card */}
          <div className="glass-card rounded-xl p-md border border-primary/30 relative overflow-hidden group cursor-pointer hover:shadow-[0_0_20px_rgba(193,196,230,0.2)] transition-all duration-300 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all" />
            <div className="flex items-center gap-sm mb-md">
              <span className="material-symbols-outlined text-primary text-[32px]">explore</span>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">Simulasi Interaktif</h3>
            </div>
            <p className="font-body-md text-sm text-on-surface-variant mb-md leading-relaxed">
              Gunakan Stellar Explorer untuk memanipulasi massa awal awan molekul dan amati bagaimana hal itu mempengaruhi tipe bintang yang terbentuk (Katai Merah hingga Superraksasa Biru).
            </p>
            <Link
              href="/learn/astrofisika/explorer"
              className="w-full py-sm bg-primary text-on-primary font-label-sm text-xs font-bold rounded flex items-center justify-center gap-xs hover:bg-primary-fixed-dim transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              <span>Launch Stellar Explorer</span>
            </Link>
          </div>

          {/* Related Topics Navigation */}
          <div className="glass-panel rounded-xl p-md border border-white/10 shadow-xl">
            <h3 className="font-headline-sm text-base font-bold text-on-surface mb-sm flex items-center gap-xs">
              <span className="material-symbols-outlined text-on-surface-variant">account_tree</span>
              <span>Topik Terkait</span>
            </h3>
            <div className="h-[1px] w-full bg-white/10 mb-sm" />
            <nav className="flex flex-col gap-xs font-code-md text-xs">
              {[
                { title: 'Awan Molekul Raksasa', code: 'ASTRO-101' },
                { title: 'Massa & Hukum Jeans', code: 'PHYS-204' },
                { title: 'Fisika Protobintang', code: 'ASTRO-202' },
                { title: 'Evolusi Deret Utama', code: 'ASTRO-203' },
              ].map((topic, idx) => (
                <div
                  key={idx}
                  className="group flex items-center justify-between p-sm rounded hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-on-surface group-hover:text-primary transition-colors font-bold">
                      {topic.title}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">{topic.code}</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-[18px]">
                    arrow_forward
                  </span>
                </div>
              ))}
            </nav>
          </div>

          {/* Glossary Snippet */}
          <div className="glass-panel rounded-xl p-md bg-surface-container-low/80 border border-white/10 shadow-xl">
            <h4 className="font-code-md text-xs text-secondary uppercase tracking-wider mb-xs font-bold">
              Glosarium Cepat
            </h4>
            <dl className="font-body-md text-xs text-on-surface-variant space-y-3">
              <div>
                <dt className="font-bold text-on-surface">Keseimbangan Hidrostatik</dt>
                <dd className="mt-0.5">Keseimbangan antara gaya gravitasi yang menarik ke dalam dan tekanan termal yang mendorong ke luar.</dd>
              </div>
              <div>
                <dt className="font-bold text-on-surface">Piringan Akresi</dt>
                <dd className="mt-0.5">Struktur material yang berputar mengelilingi benda pusat yang masif, terbentuk dari material awan yang jatuh.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-xl flex justify-between items-center border-t border-white/10 pt-md pb-xl">
        <Link
          href="/learn/astrofisika/hr-diagram"
          className="text-on-surface-variant hover:text-on-surface font-label-sm text-xs flex items-center gap-xs transition-colors font-bold"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Klasifikasi Spektral</span>
        </Link>
        <Link
          href="/learn/astrofisika/evolusi"
          className="bg-surface-container-high hover:bg-surface-variant text-primary border border-primary/20 px-md py-sm rounded-lg font-label-sm text-xs font-bold flex items-center gap-sm transition-colors"
        >
          <span>Evolusi Stellar</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
