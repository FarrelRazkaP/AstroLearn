'use client';

import Link from 'next/link';

export default function AstrofisikaModulePage() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-gutter">
      {/* Breadcrumb & Header */}
      <div className="mb-lg">
        <div className="flex items-center gap-2 text-on-surface-variant font-code-md text-code-md mb-xs">
          <Link className="hover:text-primary transition-colors" href="/learn">
            Learning Hub
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="hover:text-primary transition-colors">Advanced Modules</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-bold">Astrofisika Stellar</span>
        </div>
        <h1 className="font-display-lg text-display-lg text-on-surface mb-xs drop-shadow-md">
          Astrofisika Stellar
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Explore the lifecycle of stars, from molecular clouds to stellar remnants. Understand the H-R diagram and the physical principles driving stellar evolution.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main Content Column (Left: 8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-gutter">
          {/* Hero Card: H-R Diagram Introduction */}
          <div className="glass-card rounded-xl p-md lg:p-lg relative overflow-hidden group">
            {/* Abstract background graphic */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center border border-secondary/30">
                    <span className="material-symbols-outlined text-on-secondary-container text-2xl">
                      scatter_plot
                    </span>
                  </div>
                  <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                      Diagram Hertzsprung-Russell
                    </h2>
                    <div className="flex gap-2 mt-1">
                      <span
                        className="px-2 py-1 rounded-full bg-tertiary-container/50 border border-tertiary/30 font-code-md text-code-md text-tertiary"
                        style={{ fontSize: '10px' }}
                      >
                        Core Concept
                      </span>
                      <span
                        className="px-2 py-1 rounded-full bg-surface-container border border-outline-variant font-code-md text-code-md text-on-surface-variant"
                        style={{ fontSize: '10px' }}
                      >
                        Est. 15 mins
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md leading-relaxed">
                The Hertzsprung-Russell (H-R) diagram is a scatter plot of stars showing the relationship between the stars' absolute magnitudes or luminosities versus their stellar classifications or effective temperatures. It represents a major step towards an understanding of stellar evolution.
              </p>
              {/* Interactive H-R Diagram Image */}
              <div className="w-full h-64 bg-surface-dim rounded-lg border border-outline-variant/30 mb-md relative overflow-hidden flex items-center justify-center group-hover:border-primary/30 transition-colors">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle at center, #c1c4e6 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                ></div>
                <img
                  alt="H-R Diagram Visualization"
                  className="w-full h-full object-cover mix-blend-screen opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF9NXWiWV3V6QOzWPRacNMp6fWphBcXD3Epbkv_FfPSWCfUwRM_5d0uyziHR_J0GgY-rS8dB9HSGINWBLUb8R8CIzePrLzhEYaFFaDyfmEvd8nhSGyDHMTePA9SbJF5m5ZMlnKihuxX6oAN32_-Wtmp57UfBNwFiDAwASItXDpL-vR2pXtaglYlP4LfIfCgD4zmS3afenGXFBWnL75864iQaklebek3wMjQVtr8dbrno50vy-BEHwT2g"
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between px-4 py-2 glass-panel rounded-md text-label-sm font-label-sm text-on-surface">
                  <span>Hotter (O, B)</span>
                  <span>Cooler (M)</span>
                </div>
              </div>
              <Link
                href="/learn/astrofisika/explorer"
                className="px-6 py-3 bg-secondary text-on-secondary font-body-md font-semibold rounded-lg hover:bg-secondary-fixed transition-colors flex items-center gap-2 cursor-pointer w-max"
              >
                <span>Launch Interactive Explorer</span>
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </Link>
            </div>
          </div>

          {/* Grid of Sub-topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Star Formation */}
            <div className="glass-card rounded-xl p-md flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center mb-sm">
                <span className="material-symbols-outlined text-primary">cloud</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-xs" style={{ fontSize: '20px' }}>
                Pembentukan Bintang
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md flex-1">
                Collapse of molecular clouds, Jeans mass, and the birth of protostars within nebulas.
              </p>
              <Link
                href="/learn/astrofisika/pembentukan"
                className="flex items-center gap-2 font-code-md text-code-md text-primary cursor-pointer hover:underline"
              >
                <span>Study Module</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            {/* Stellar Evolution */}
            <div className="glass-card rounded-xl p-md flex flex-col hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-error/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="w-10 h-10 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center mb-sm relative z-10">
                <span className="material-symbols-outlined text-error">local_fire_department</span>
              </div>
              <h3
                className="font-headline-md text-headline-md text-on-surface mb-xs relative z-10"
                style={{ fontSize: '20px' }}
              >
                Evolusi Stellar
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md flex-1 relative z-10">
                Main sequence life, hydrogen burning, giant phases, and planetary nebulas.
              </p>
              <Link
                href="/learn/astrofisika/evolusi"
                className="flex items-center gap-2 font-code-md text-code-md text-primary cursor-pointer hover:underline relative z-10"
              >
                <span>Study Module</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Advanced Data Section */}
          <div className="glass-panel rounded-xl border-l-4 border-l-tertiary p-md">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-tertiary mt-1 text-2xl">analytics</span>
              <div className="flex-1">
                <h4 className="font-headline-md text-on-surface text-[18px] mb-xs font-semibold">
                  Spectroscopic Analysis Simulator
                </h4>
                <p className="font-body-md text-on-surface-variant mb-sm">
                  Analyze the absorption lines of various stellar classes to determine composition and temperature.
                </p>
                <div className="w-full h-12 bg-surface-dim rounded border border-outline-variant/50 relative overflow-hidden flex items-center">
                  {/* Simulated spectrum */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, #4a0080, #0000ff, #00ffff, #00ff00, #ffff00, #ff7f00, #ff0000)',
                    }}
                  ></div>
                  {/* Absorption lines */}
                  <div className="absolute top-0 bottom-0 left-[20%] w-[2px] bg-black/80"></div>
                  <div className="absolute top-0 bottom-0 left-[45%] w-[4px] bg-black/80"></div>
                  <div className="absolute top-0 bottom-0 left-[60%] w-[1px] bg-black/80"></div>
                  <div className="absolute top-0 bottom-0 left-[85%] w-[3px] bg-black/80"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column (Right: 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-md">
          {/* Progress Card */}
          <div className="glass-card rounded-xl p-md">
            <h3 className="font-headline-md text-[18px] text-on-surface mb-md font-semibold">
              Module Progress
            </h3>
            <div className="flex items-center justify-between mb-xs">
              <span className="font-code-md text-code-md text-on-surface-variant">Completion</span>
              <span className="font-code-md text-code-md text-primary font-bold">35%</span>
            </div>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-md">
              <div className="h-full bg-primary w-[35%] rounded-full shadow-[0_0_10px_rgba(193,196,230,0.5)]"></div>
            </div>
            <button
              onClick={() => alert('Resuming session...')}
              className="w-full py-2 border border-outline-variant rounded-lg text-on-surface font-body-md hover:bg-white/5 transition-colors cursor-pointer text-center"
            >
              Resume Last Session
            </button>
          </div>

          {/* Contextual Navigation */}
          <div className="glass-panel rounded-xl p-sm">
            <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-sm px-2 font-bold">
              Sub-Topics
            </h3>
            <div className="flex flex-col gap-1">
              <Link
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 text-on-surface transition-colors group"
                href="#"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary transition-colors">
                    radio_button_checked
                  </span>
                  <span className="font-body-md text-[15px]">Siklus Hidup Bintang</span>
                </div>
                <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                  chevron_right
                </span>
              </Link>

              <Link
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 text-on-surface transition-colors group"
                href="#"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary transition-colors">
                    ssid_chart
                  </span>
                  <span className="font-body-md text-[15px]">Spektroskopi</span>
                </div>
                <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                  chevron_right
                </span>
              </Link>

              <Link
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface transition-colors group"
                href="/practice/drill/1?module=astrofisika"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    quiz
                  </span>
                  <span className="font-body-md text-[15px]">Kuis Bintang</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-code-md bg-secondary-container/50 text-secondary border border-secondary/20 font-bold">
                  Start
                </span>
              </Link>

              <div className="mt-3 pt-3 border-t border-white/10">
                <Link
                  href="/practice/drill/1?module=astrofisika"
                  className="w-full flex items-center justify-center bg-secondary-container text-on-secondary-container font-headline-md text-headline-md py-3 rounded-xl hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer active:scale-95 shadow-lg font-bold gap-2"
                >
                  <span className="material-symbols-outlined text-lg">quiz</span>
                  <span>Mulai Kuis</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Glossary Snippet */}
          <div className="glass-card rounded-xl p-md border-t border-t-white/5">
            <div className="flex items-center gap-2 mb-sm">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                menu_book
              </span>
              <h3 className="font-headline-md text-[16px] text-on-surface font-bold">Term of the Day</h3>
            </div>
            <p className="font-code-md text-code-md text-primary mb-1 font-bold">Chandrasekhar Limit</p>
            <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
              The maximum mass of a stable white dwarf star. Currently accepted value is about 1.4 solar masses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
