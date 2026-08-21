'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProgressBar from '@/components/ui/ProgressBar';
import {
  getUserStats,
  recordQuizCompletionStreak,
  getStreakStatus,
  getRemainingCooldownTime,
} from '@/lib/userStats';

export default function DashboardPage() {
  const [role, setRole] = useState('pemula'); // 'pemula' (siswa) or 'guru'
  const [userName, setUserName] = useState('Pengguna AstroLearn');
  const [userStats, setUserStats] = useState({ points: 0, streak: 0, level: 1 });
  const [streakInfo, setStreakInfo] = useState({ isCompletedToday: false, cooldown: { formatted: '00:00:00' } });
  const [topicProgress, setTopicProgress] = useState({});

  const refreshStats = () => {
    const stats = getUserStats();
    const status = getStreakStatus();
    setUserStats(stats);
    setStreakInfo(status);
    try {
      const rawUser = localStorage.getItem('astrolearn-user');
      if (rawUser) {
        const p = JSON.parse(rawUser);
        if (p.name || p.fullName) setUserName(p.name || p.fullName);
      }
      const savedProg = localStorage.getItem('astrolearn-topic-progress');
      if (savedProg) {
        setTopicProgress(JSON.parse(savedProg));
      }
    } catch (e) {}
  };

  useEffect(() => {
    const savedRole = localStorage.getItem('astrolearn-role');
    if (savedRole === 'guru') {
      setRole('guru');
    }

    refreshStats();

    // Live Cooldown countdown timer interval (1s)
    const interval = setInterval(() => {
      const status = getStreakStatus();
      if (status.isCompletedToday) {
        setStreakInfo((prev) => ({
          ...prev,
          cooldown: getRemainingCooldownTime(),
        }));
      } else {
        setStreakInfo(status);
      }
    }, 1000);

    const handleStorage = () => refreshStats();
    window.addEventListener('storage', handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    localStorage.setItem('astrolearn-role', newRole);
  };

  // Level progression calculations (500 pts per level)
  const currentLevel = userStats.level || Math.floor((userStats.points || 0) / 500) + 1;
  const pointsInCurrentLevel = (userStats.points || 0) % 500;
  const levelProgressPercent = Math.floor((pointsInCurrentLevel / 500) * 100);

  return (
    <div className="flex flex-col gap-lg max-w-7xl mx-auto">
      {/* Super Simple Compact Role Switcher Bar */}
      <div className="flex justify-between items-center pb-2 border-b border-white/10">
        <h1 className="font-headline-lg text-headline-lg text-white font-bold tracking-tight">
          {role === 'guru' ? 'Dashboard Guru' : 'Dashboard Utama'}
        </h1>

        {/* Minimalist 2-Option Pill Toggle */}
        <div className="inline-flex p-1 bg-surface-container-lowest/90 rounded-xl border border-white/10 shadow-inner">
          <button
            onClick={() => handleRoleSwitch('pemula')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              role === 'pemula'
                ? 'bg-secondary text-on-secondary shadow-md'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            Murid
          </button>
          <button
            onClick={() => handleRoleSwitch('guru')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              role === 'guru'
                ? 'bg-secondary text-on-secondary shadow-md'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            Guru
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 👨‍🎓 DASHBOARD SISWA / MURID */}
      {/* ========================================================================= */}
      {role !== 'guru' && (
        <div className="flex flex-col gap-lg">
          {/* Welcome Header Module with Level & Quiz Streak Cooldown Status Widget */}
          <section className="glass-panel rounded-2xl p-md md:p-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-md relative overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute right-0 top-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                  👋 Halo, {userName}!
                </h2>
                <span className="px-3 py-0.5 rounded-full bg-secondary-container text-secondary font-code-md text-xs font-bold border border-secondary/30">
                  Level {currentLevel}
                </span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Satu langkah lebih dekat memahami semesta hari ini. Total AstroPoints: <strong className="text-accent_gold">{(userStats.points || 0).toLocaleString()} Poin</strong>
              </p>

              {/* Level Progress Bar */}
              <div className="mt-3 w-72 max-w-full">
                <div className="flex justify-between text-xs font-code-md text-on-surface-variant mb-1">
                  <span>Level {currentLevel}</span>
                  <span>{pointsInCurrentLevel} / 500 XP</span>
                </div>
                <ProgressBar value={levelProgressPercent} variant="gradient" size="sm" />
              </div>
            </div>

            {/* Quiz Completion Streak & 1-Day Cooldown Widget */}
            <div className="flex flex-col gap-2 relative z-10 w-full md:w-auto">
              <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col gap-3 min-w-[280px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-error text-2xl animate-pulse">local_fire_department</span>
                    <div>
                      <p className="font-label-sm text-xs text-on-surface-variant">Daily Quiz Streak</p>
                      <p className="font-headline-md text-base text-white font-bold">{userStats.streak || 0} Hari Berturut</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full font-code-md text-xs font-bold border ${
                    streakInfo.isCompletedToday
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}>
                    {streakInfo.isCompletedToday ? '🔥 Active' : '⚡ Belum Kuis'}
                  </span>
                </div>

                {/* Status Box */}
                {streakInfo.isCompletedToday ? (
                  <div className="p-3 rounded-xl bg-surface-container-highest/60 border border-white/10 flex flex-col items-center justify-center text-center">
                    <span className="font-code-md text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">task_alt</span>
                      Streak Hari Ini Aktif (Kuis Selesai)
                    </span>
                    <span className="font-code-md text-[11px] text-on-surface-variant/80 mt-1">
                      ⏳ Cooldown streak berikutnya: <strong className="text-secondary">{streakInfo.cooldown?.formatted}</strong>
                    </span>
                  </div>
                ) : (
                  <Link
                    href="/practice"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-black font-headline-md text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 text-center"
                  >
                    <span className="material-symbols-outlined text-base">quiz</span>
                    <span>Jawab Kuis/Soal untuk Menambah Streak →</span>
                  </Link>
                )}
              </div>
            </div>
          </section>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Progress Overview (Left Column) */}
            <div className="lg:col-span-4 flex flex-col gap-md">
              <h3 className="font-headline-md text-headline-md text-primary-fixed-dim border-b border-outline-variant/30 pb-2 font-semibold">
                Progress Overview
              </h3>
              <div className="glass-card rounded-xl p-md space-y-md border border-white/10">
                <div className="space-y-xs">
                  <div className="flex justify-between font-body-md text-body-md">
                    <span className="text-on-surface">Mekanika</span>
                    <span className="font-code-md text-code-md text-secondary">{topicProgress.mekanika || 0}%</span>
                  </div>
                  <ProgressBar value={topicProgress.mekanika || 0} variant="gradient" />
                </div>
                <div className="space-y-xs">
                  <div className="flex justify-between font-body-md text-body-md">
                    <span className="text-on-surface">Astrofisika</span>
                    <span className="font-code-md text-code-md text-tertiary">{topicProgress.astrofisika || 0}%</span>
                  </div>
                  <ProgressBar value={topicProgress.astrofisika || 0} variant="tertiary" />
                </div>
                <div className="space-y-xs">
                  <div className="flex justify-between font-body-md text-body-md">
                    <span className="text-on-surface">Tata Surya</span>
                    <span className="font-code-md text-code-md text-primary">{topicProgress['tata-surya'] || 0}%</span>
                  </div>
                  <ProgressBar value={topicProgress['tata-surya'] || 0} variant="primary" />
                </div>
              </div>

              {/* Quick Tools */}
              <h3 className="font-headline-md text-headline-md text-primary-fixed-dim border-b border-outline-variant/30 pb-2 mt-sm font-semibold">
                Quick Tools
              </h3>
              <div className="grid grid-cols-2 gap-sm">
                <Link
                  href="/tools/sky-map"
                  className="glass-card rounded-lg p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors cursor-pointer group border border-white/10"
                >
                  <span className="material-symbols-outlined text-tertiary group-hover:scale-110 transition-transform">
                    map
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface">Peta Langit</span>
                </Link>
                <Link
                  href="/tools/calculator"
                  className="glass-card rounded-lg p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors cursor-pointer group border border-white/10"
                >
                  <span className="material-symbols-outlined text-tertiary group-hover:scale-110 transition-transform">
                    calculate
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface">Kalkulator</span>
                </Link>
                <Link
                  href="/tools/orbit-sim"
                  className="glass-card rounded-lg p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors cursor-pointer group col-span-2 border border-white/10"
                >
                  <span className="material-symbols-outlined text-tertiary group-hover:scale-110 transition-transform">
                    view_in_ar
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface">Simulator</span>
                </Link>
              </div>
            </div>

            {/* Main Interactive Canvas (Right Column) */}
            <div className="lg:col-span-8 flex flex-col gap-md">
              {/* Lanjutkan Belajar */}
              <h3 className="font-headline-md text-headline-md text-primary-fixed-dim border-b border-outline-variant/30 pb-2 flex items-center justify-between font-semibold">
                <span>Lanjutkan Belajar</span>
                <Link href="/learn" className="text-secondary hover:text-secondary-fixed transition-colors">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
                {/* Card 1 */}
                <Link
                  href="/learn/mekanika/kepler"
                  className="glass-card rounded-xl overflow-hidden relative group cursor-pointer stellar-glow border border-white/10"
                >
                  <div className="h-24 w-full relative">
                    <img
                      alt="Mekanika Orbit Cover"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Q1phGwgLm7lJNzU8xY0A4Rn3Ygeh05RnoKft484HzqpRiJsqr9BjRzXrmgaGSf39xQcapW-l67nT_2JVq8yWAnd2qarGQ3_b6P2V8U7XhhL06gA0eeKZUEvwuDN5N92Z-kvZgXBBHOhrKn2UcACk0EfiThgQT5RRt6d4ODpVHdptvsUTP8vnz4JSrTYRE4M10wIXcSeQvlSAdnH6viExHUZD0CRs245RMitPO80TIzJaBTqCzSR2ug"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest to-transparent" />
                  </div>
                  <div className="p-4 relative z-10 -mt-6">
                    <span className="inline-block px-2 py-1 rounded-full bg-primary-container text-primary font-code-md text-[10px] mb-2 border border-primary/20">
                      Mekanika
                    </span>
                    <h4 className="font-body-lg text-body-lg font-semibold text-white mb-1">
                      Mekanika Orbit
                    </h4>
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">85% Selesai</span>
                      <span className="material-symbols-outlined text-secondary">play_circle</span>
                    </div>
                  </div>
                </Link>

                {/* Card 2 */}
                <Link
                  href="/learn/astrofisika/fotometri"
                  className="glass-card rounded-xl overflow-hidden relative group cursor-pointer border border-white/10"
                >
                  <div className="h-24 w-full relative">
                    <img
                      alt="Fotometri Bintang Cover"
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpInz60VXLDdHroNqFhbVUGzKdctL2gU2utoY47mnLEetR6jhD0PYBnxAcdsFKKvAy2p9Rpon2DH0lEwbd1omtaHvjf5aRv4MxYkRJ7gvi4dzssYkREDdwHkcgqJtXZ2ZekAbH3jLvsZNzFCb2vE4_WLNvoLErp4f-KSxLpS9F0_wzAssiNXYb-mQoUpRPGUyHYF_cPxz6_P1KfamA2aKYOa8QOvKvdEIjP6A1XzCZAEH1COM39q3rZg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest to-transparent" />
                  </div>
                  <div className="p-4 relative z-10 -mt-6">
                    <span className="inline-block px-2 py-1 rounded-full bg-surface-variant text-on-surface-variant font-code-md text-[10px] mb-2 border border-outline/20">
                      Astrofisika
                    </span>
                    <h4 className="font-body-lg text-body-lg font-semibold text-white mb-1">
                      Fotometri Bintang
                    </h4>
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">32% Selesai</span>
                      <span className="material-symbols-outlined text-outline">play_circle</span>
                    </div>
                  </div>
                </Link>

                {/* Card 3 */}
                <div className="glass-card rounded-xl overflow-hidden relative group cursor-pointer opacity-70 hover:opacity-100 transition-opacity border border-white/10">
                  <div className="h-24 w-full bg-surface-dim flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline-variant">public</span>
                  </div>
                  <div className="p-4 relative z-10">
                    <span className="inline-block px-2 py-1 rounded-full bg-surface-variant text-on-surface-variant font-code-md text-[10px] mb-2 border border-outline/20">
                      Dasar Observasi
                    </span>
                    <h4 className="font-body-lg text-body-lg font-semibold text-white mb-1">
                      Bola Langit
                    </h4>
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-label-sm text-label-sm text-outline">Belum dimulai</span>
                      <span className="material-symbols-outlined text-outline">lock_open</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Berita Astronomi Terkini */}
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2 mt-4">
                <h3 className="font-headline-md text-headline-md text-primary-fixed-dim flex items-center gap-2 font-semibold">
                  <span className="material-symbols-outlined text-tertiary">satellite_alt</span>
                  <span>Berita Astronomi Terkini</span>
                </h3>
                <a
                  href="https://news.google.com/search?q=astronomy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-code-md text-xs text-secondary hover:underline flex items-center gap-1"
                >
                  <span>Google News Astronomi</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>

              <div className="glass-panel rounded-xl p-4 flex flex-col gap-3 border border-white/10">
                {[
                  {
                    title: 'James Webb Temukan "Black Hole Stars" Pertama di Alam Semesta Purba',
                    source: 'NASA Science News • JWST',
                    date: '17 Agustus 2026',
                    img: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=300&auto=format&fit=crop&q=80',
                    url: 'https://science.nasa.gov/mission/webb/',
                    badge: 'JWST',
                  },
                  {
                    title: 'Teleskop JWST Deteksi Air & Debu Organik 0.55 Tahun Cahaya dari Sagittarius A*',
                    source: 'Space.com • ESA',
                    date: '16 Agustus 2026',
                    img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&auto=format&fit=crop&q=80',
                    url: 'https://www.space.com/astronomy',
                    badge: 'Penemuan Baru',
                  },
                  {
                    title: 'Satelit Proba-3 ESA Rekam Gerhana Matahari Ganda Pertama dari Luar Angkasa',
                    source: 'European Space Agency (ESA)',
                    date: '12 Agustus 2026',
                    img: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=300&auto=format&fit=crop&q=80',
                    url: 'https://www.esa.int/Science_Exploration/Space_Science',
                    badge: 'Misi ESA',
                  },
                  {
                    title: 'NASA Rampungkan Persiapan Peluncuran Teleskop Luar Angkasa Nancy Grace Roman',
                    source: 'NASA JPL • Astronomy Magazine',
                    date: '10 Agustus 2026',
                    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&auto=format&fit=crop&q=80',
                    url: 'https://roman.gsfc.nasa.gov/',
                    badge: 'Misi NASA',
                  },
                ].map((news, idx) => (
                  <a
                    key={idx}
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 items-center group cursor-pointer hover:bg-white/5 p-2.5 rounded-xl transition-all border border-transparent hover:border-white/10"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant/50 relative">
                      <img
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={news.img}
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-tertiary-container text-tertiary font-code-md text-[10px] font-bold">
                          {news.badge}
                        </span>
                        <span className="font-label-sm text-xs text-tertiary">{news.date} • {news.source}</span>
                      </div>
                      <h4 className="font-body-md text-body-md font-semibold text-on-surface group-hover:text-secondary transition-colors line-clamp-2">
                        {news.title}
                      </h4>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all text-sm">
                      open_in_new
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 👨‍🏫 TEACHER DECK DASHBOARD (GURU / EDUKATOR) */}
      {/* ========================================================================= */}
      {role === 'guru' && (
        <div className="flex flex-col gap-lg">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-sm mb-2">
            <div>
              <h2 className="font-display-lg text-display-lg text-primary tracking-tight font-bold">
                Teacher Deck
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
                Command center for your active constellations.
              </p>
            </div>
            <div className="flex gap-sm">
              <Link
                href="/learn/classroom"
                className="glass-card hover:bg-white/10 transition-colors px-md py-sm rounded-lg flex items-center gap-xs text-tertiary border border-white/10 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                  Buat Kelas Baru
                </span>
              </Link>
              <button
                onClick={() => alert('Membuka Pembuat Soal Guru...')}
                className="bg-[#c9bffd] text-black hover:bg-white/90 transition-colors px-md py-sm rounded-lg flex items-center gap-xs font-label-sm text-label-sm uppercase tracking-wider font-bold shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">assignment</span>
                <span>Buat Soal</span>
              </button>
            </div>
          </div>

          {/* Quick Stats - Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Stat Card 1: Total Siswa Aktif */}
            <div className="glass-card rounded-xl p-md flex flex-col justify-between relative overflow-hidden group border border-white/10 shadow-xl">
              <div className="absolute -right-4 -top-4 text-white/5 group-hover:text-secondary/10 transition-colors">
                <span className="material-symbols-outlined text-[120px]">groups</span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-xs">
                  Total Siswa Aktif
                </p>
                <h3 className="font-display-lg text-display-lg text-primary font-bold">47</h3>
              </div>
              <div className="mt-sm flex items-center gap-xs">
                <span className="w-2 h-2 rounded-full bg-[#b9c5f2] animate-pulse" />
                <span className="font-code-md text-code-md text-tertiary">Acquiring Data...</span>
              </div>
            </div>

            {/* Stat Card 2: Rata-Rata Skor Tryout */}
            <div className="glass-card rounded-xl p-md flex flex-col justify-between border border-white/10 shadow-xl">
              <div>
                <div className="flex justify-between items-start">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-xs">
                    Rata-rata Skor Tryout
                  </p>
                  <span className="material-symbols-outlined text-secondary">analytics</span>
                </div>
                <h3 className="font-display-lg text-display-lg text-secondary font-bold">73.4</h3>
              </div>
              <div className="mt-sm">
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full" style={{ width: '73.4%' }} />
                </div>
              </div>
            </div>

            {/* Stat Card 3: Perlu Perhatian */}
            <div className="glass-card rounded-xl p-md flex flex-col justify-between border-l-4 border-error border-white/10 shadow-xl">
              <div>
                <div className="flex justify-between items-start">
                  <p className="font-label-sm text-label-sm text-error uppercase tracking-widest mb-xs">
                    Perlu Perhatian
                  </p>
                  <span className="material-symbols-outlined text-error">warning</span>
                </div>
                <h3 className="font-display-lg text-display-lg text-error font-bold">5</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
                  Siswa di bawah ambang batas orbital.
                </p>
              </div>
              <button
                onClick={() => alert('Menampilkan 5 siswa yang memerlukan perhatian...')}
                className="mt-sm text-left font-label-sm text-label-sm text-error hover:text-error/80 transition-colors flex items-center gap-xs w-max cursor-pointer"
              >
                <span>View Sector</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Bottom Grid: Active Constellations & Instruments */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Active Constellations (Kelas) */}
            <div className="md:col-span-8 glass-panel rounded-xl p-md border border-white/10 shadow-xl">
              <div className="flex justify-between items-center mb-md border-b border-white/10 pb-sm">
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Active Constellations (Kelas)
                </h3>
                <button className="text-tertiary hover:text-white transition-colors flex items-center gap-xs font-label-sm text-label-sm cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  <span>Filter</span>
                </button>
              </div>

              <div className="space-y-sm">
                {/* Class Item 1 */}
                <div className="glass-card rounded-lg p-sm flex flex-col sm:flex-row justify-between sm:items-center gap-sm hover:bg-white/5 transition-colors cursor-pointer group border border-white/10">
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center border border-white/10 group-hover:border-secondary/50 transition-colors">
                      <span className="material-symbols-outlined text-secondary">star_rate</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-headline-md text-on-surface text-[18px] leading-[28px] font-bold">
                        OSN Kab 2025
                      </h4>
                      <p className="font-code-md text-code-md text-on-surface-variant">Sektor Alpha • 24 Siswa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-md ml-12 sm:ml-0">
                    <div className="text-right">
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Modul Selesai</p>
                      <p className="font-body-md text-body-md text-tertiary font-bold">65%</p>
                    </div>
                    <div className="w-px h-8 bg-white/10 hidden sm:block" />
                    <span className="font-label-sm text-label-sm px-3 py-1 rounded-full bg-[#1b1246] text-[#b9c5f2] border border-[#39456b] font-semibold">
                      Active Orbit
                    </span>
                  </div>
                </div>

                {/* Class Item 2 */}
                <div className="glass-card rounded-lg p-sm flex flex-col sm:flex-row justify-between sm:items-center gap-sm hover:bg-white/5 transition-colors cursor-pointer group border border-white/10">
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center border border-white/10 group-hover:border-secondary/50 transition-colors">
                      <span className="material-symbols-outlined text-tertiary">group_work</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-headline-md text-on-surface text-[18px] leading-[28px] font-bold">
                        OSN Provinsi
                      </h4>
                      <p className="font-code-md text-code-md text-on-surface-variant">Sektor Beta • 18 Siswa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-md ml-12 sm:ml-0">
                    <div className="text-right">
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Modul Selesai</p>
                      <p className="font-body-md text-body-md text-tertiary font-bold">82%</p>
                    </div>
                    <div className="w-px h-8 bg-white/10 hidden sm:block" />
                    <span className="font-label-sm text-label-sm px-3 py-1 rounded-full bg-[#1b1246] text-[#b9c5f2] border border-[#39456b] font-semibold">
                      Active Orbit
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions / Instruments Grid */}
            <div className="md:col-span-4 glass-panel rounded-xl p-md border border-white/10 shadow-xl">
              <h3 className="font-headline-md text-headline-md text-primary mb-md pb-sm border-b border-white/10 font-bold">
                Instruments
              </h3>
              <div className="grid grid-cols-2 gap-sm">
                <button
                  onClick={() => alert('Membuka Analytics Guru...')}
                  className="glass-card p-sm rounded-lg flex flex-col items-center justify-center gap-xs hover:bg-white/10 transition-colors aspect-square border border-white/10 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[32px] text-tertiary mb-xs">bar_chart</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Analytics</span>
                </button>
                <button
                  onClick={() => alert('Membuka Review Tugas Siswa...')}
                  className="glass-card p-sm rounded-lg flex flex-col items-center justify-center gap-xs hover:bg-white/10 transition-colors aspect-square border border-white/10 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[32px] text-tertiary mb-xs">assignment_turned_in</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Review Tugas</span>
                </button>
                <button
                  onClick={() => alert('Membuka Jadwal Pengajaran...')}
                  className="glass-card p-sm rounded-lg flex flex-col items-center justify-center gap-xs hover:bg-white/10 transition-colors aspect-square border border-white/10 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[32px] text-tertiary mb-xs">event_note</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Jadwal</span>
                </button>
                <button
                  onClick={() => alert('Membuka Diskusi Kelas...')}
                  className="glass-card p-sm rounded-lg flex flex-col items-center justify-center gap-xs hover:bg-white/10 transition-colors aspect-square border border-white/10 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[32px] text-tertiary mb-xs">forum</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Diskusi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
