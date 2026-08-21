'use client';

import Link from 'next/link';

export default function ToolsHubPage() {
  return (
    <div className="flex flex-col gap-lg max-w-7xl mx-auto">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="font-display-lg text-display-lg text-white font-bold tracking-tight mb-1">
          Interactive Tools
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Access precise simulation and calculation instrumentation for your deep space observations.
        </p>
      </div>

      {/* Grid of 4 Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {/* Tool 1: Sky Map */}
        <Link
          href="/tools/sky-map"
          className="glass-panel rounded-2xl p-lg border border-white/10 hover:border-accent_cyan transition-all flex flex-col justify-between group relative overflow-hidden shadow-2xl min-h-[260px]"
        >
          {/* Top Badge & Icon */}
          <div className="flex justify-between items-start z-10">
            <div className="p-3 rounded-xl bg-accent_cyan/10 text-accent_cyan border border-accent_cyan/20 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">map</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-accent_green/10 text-accent_green border border-accent_green/30 font-code-md text-xs font-bold">
              Active
            </span>
          </div>

          {/* Background Image Preview */}
          <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity">
            <img
              src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80"
              alt="Sky Map preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/70 to-transparent" />
          </div>

          {/* Title & Description */}
          <div className="relative z-10 mt-12">
            <h2 className="font-headline-lg text-headline-md font-bold text-white mb-2 group-hover:text-accent_cyan transition-colors flex items-center gap-2">
              <span>Sky Map</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Real-time celestial charting and constellation tracking with high-precision orbital data.
            </p>
          </div>
        </Link>

        {/* Tool 2: Orbit Sim */}
        <Link
          href="/tools/orbit-sim"
          className="glass-panel rounded-2xl p-lg border border-white/10 hover:border-secondary transition-all flex flex-col justify-between group relative overflow-hidden shadow-2xl min-h-[260px]"
        >
          {/* Top Badge & Icon */}
          <div className="flex justify-between items-start z-10">
            <div className="p-3 rounded-xl bg-secondary/10 text-secondary border border-secondary/20 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">rocket_launch</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/30 font-code-md text-xs font-bold">
              Active
            </span>
          </div>

          {/* Background Image Preview */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
            <img
              src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600&auto=format&fit=crop&q=80"
              alt="Orbit Sim preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/70 to-transparent" />
          </div>

          {/* Title & Description */}
          <div className="relative z-10 mt-12">
            <h2 className="font-headline-lg text-headline-md font-bold text-white mb-2 group-hover:text-secondary transition-colors flex items-center gap-2">
              <span>Orbit Sim</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Advanced mechanics engine for simulating planetary orbits and gravitational slingshots.
            </p>
          </div>
        </Link>

        {/* Tool 3: Calculator */}
        <Link
          href="/tools/calculator"
          className="glass-panel rounded-2xl p-lg border border-white/10 hover:border-primary transition-all flex flex-col justify-between group relative overflow-hidden shadow-2xl min-h-[260px]"
        >
          {/* Top Icon */}
          <div className="flex justify-between items-start z-10">
            <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">calculate</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="relative z-10 mt-12">
            <h2 className="font-headline-lg text-headline-md font-bold text-white mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
              <span>Calculator</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Compute apparent magnitude, focal ratios, and celestial coordinate transformations.
            </p>
          </div>
        </Link>

        {/* Tool 4: Constellation Quiz */}
        <Link
          href="/practice"
          className="glass-panel rounded-2xl p-lg border border-white/10 hover:border-accent_gold transition-all flex flex-col justify-between group relative overflow-hidden shadow-2xl min-h-[260px]"
        >
          {/* Top Badge & Icon */}
          <div className="flex justify-between items-start z-10">
            <div className="p-3 rounded-xl bg-accent_gold/10 text-accent_gold border border-accent_gold/20 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">quiz</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-accent_gold/10 text-accent_gold border border-accent_gold/30 font-code-md text-xs font-bold">
              New
            </span>
          </div>

          {/* Title & Description */}
          <div className="relative z-10 mt-12">
            <h2 className="font-headline-lg text-headline-md font-bold text-white mb-2 group-hover:text-accent_gold transition-colors flex items-center gap-2">
              <span>Constellation Quiz</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Test your knowledge of the night sky with interactive visual identification challenges.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
