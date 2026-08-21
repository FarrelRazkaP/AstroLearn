'use client';

import Link from 'next/link';
import StarfieldCanvas from '@/components/effects/StarfieldCanvas';

export default function PracticeHubPage() {
  return (
    <div className="flex flex-col gap-lg max-w-7xl mx-auto">
      {/* Background Starfield */}
      <StarfieldCanvas starCount={150} />

      {/* Header */}
      <div>
        <h1 className="font-display-lg text-display-lg text-primary mb-2">Practice Hub</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Uji pemahaman Anda melalui drill soal, tryout berwaktu, dan lab analisis data.
        </p>
      </div>

      {/* Quick Stats Panel */}
      <div className="glass-panel rounded-xl p-md grid grid-cols-1 md:grid-cols-3 gap-md">
        <div className="flex items-center gap-md">
          <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">quiz</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Total Soal</p>
            <p className="font-headline-md text-headline-md font-bold text-on-surface">256</p>
          </div>
        </div>

        <div className="flex items-center gap-md">
          <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-2xl">workspace_premium</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Tryout Terakhir</p>
            <p className="font-headline-md text-headline-md font-bold text-on-surface">82%</p>
          </div>
        </div>

        <div className="flex items-center gap-md">
          <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-2xl">local_fire_department</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Streak Hari Ini</p>
            <p className="font-headline-md text-headline-md font-bold text-on-surface">5 Hari</p>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Drill Mode Card */}
        <Link href="/practice/drill/1?module=mekanika" className="glass-card rounded-xl p-lg flex flex-col justify-between min-h-[280px] hover:border-secondary transition-all group">
          <div>
            <div className="w-14 h-14 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary mb-md group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">fitness_center</span>
            </div>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-xs">Drill Mode</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Latihan soal cepat untuk mengasah pemahaman konsep dan penurunan rumus astronomi.
            </p>
          </div>

          <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">local_fire_department</span>
              5 Hari Berturut-turut
            </span>
            <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </Link>

        {/* Tryout Arena Card */}
        <Link
          href="/practice/tryout"
          className="glass-card rounded-xl p-lg flex flex-col justify-between min-h-[280px] border border-secondary/30 shadow-[0_0_30px_rgba(201,191,253,0.15)] relative overflow-hidden group cursor-pointer hover:border-secondary transition-all"
        >
          <div>
            <div className="flex justify-between items-start mb-md">
              <div className="w-14 h-14 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">workspace_premium</span>
              </div>
              <span className="px-3 py-1 bg-secondary-container/60 text-secondary border border-secondary/30 rounded-full font-label-sm text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-accent_green animate-pulse" />
                <span>Simulasi Aktif</span>
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-xs">Tryout Arena</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Simulasi ujian real-time dengan batas waktu resmi OSN/IOAA dan leaderboard nasional.
            </p>
          </div>

          <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-secondary font-semibold">
              Tryout Terakhir: 82% (OSK 2024)
            </span>
            <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </Link>

        {/* Data Analysis Lab Card */}
        <Link
          href="/practice/data-lab"
          className="glass-card rounded-xl p-lg flex flex-col justify-between min-h-[280px] hover:border-tertiary transition-all group cursor-pointer"
        >
          <div>
            <div className="w-14 h-14 rounded-xl bg-tertiary-container/40 flex items-center justify-center text-tertiary mb-md group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">analytics</span>
            </div>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-xs">Lab Analisis Data</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Olah data observasi mentah (kurva cahaya, spektrum bintang) seperti astronom profesional.
            </p>
          </div>

          <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-tertiary font-bold">
              Lab 04: Exoplanet Transit Detection
            </span>
            <span className="material-symbols-outlined text-tertiary group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
