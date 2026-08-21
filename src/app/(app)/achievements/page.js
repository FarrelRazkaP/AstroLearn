'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUserStats, addAstroPoints, BADGE_CATALOG } from '@/lib/userStats';

export default function GalacticAchievementsPage() {
  const [questClaimed, setQuestClaimed] = useState(false);
  const [pointsToast, setPointsToast] = useState(false);
  const [userStats, setUserStats] = useState({ points: 0, streak: 0, level: 1, badges: [] });

  useEffect(() => {
    const stats = getUserStats();
    setUserStats(stats);
  }, []);

  const handleClaimQuest = () => {
    if (questClaimed) return;
    setQuestClaimed(true);
    setPointsToast(true);

    const updated = addAstroPoints(50);
    setUserStats(updated);

    setTimeout(() => {
      setPointsToast(false);
    }, 4000);
  };

  const unlockedSet = new Set(userStats.badges || []);

  return (
    <div className="relative min-h-screen max-w-7xl mx-auto pb-24 text-on-background">
      {/* Toast Notification */}
      {pointsToast && (
        <div className="fixed top-24 right-8 z-50 bg-accent-gold text-black font-code-md text-xs font-extrabold px-5 py-3 rounded-2xl shadow-[0_0_25px_rgba(255,215,0,0.6)] flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-base">workspace_premium</span>
          <span>+50 XP Berhasil Diklaim & Ditambahkan ke Profile! 🌟</span>
        </div>
      )}

      {/* Header */}
      <header className="mb-lg">
        <h1 className="font-display-lg text-display-lg text-primary mb-2 tracking-tight">
          Galactic Achievements & Badges
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Buka badge kosmik dan selesaikan misi harian untuk meningkatkan level dan peringkat XP Anda.
        </p>
      </header>

      {/* Section 1: Dynamic Cosmic Badges */}
      <section className="mb-xl">
        <div className="flex items-center justify-between mb-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl">workspace_premium</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Koleksi Badge Kosmik</h2>
          </div>
          <span className="font-code-md text-xs text-secondary font-bold bg-secondary-container/60 px-3 py-1 rounded-full border border-secondary/30">
            Terbuka: {unlockedSet.size} / {BADGE_CATALOG.length} Badge
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {BADGE_CATALOG.map((badge) => {
            const isUnlocked = unlockedSet.has(badge.name);

            return (
              <div
                key={badge.id}
                className={`glass-card rounded-xl p-6 flex flex-col items-center text-center group relative overflow-hidden transition-all duration-300 ${
                  isUnlocked
                    ? 'border border-white/20 shadow-xl hover:scale-[1.02]'
                    : 'opacity-60 grayscale border border-white/5'
                }`}
              >
                <div className="w-28 h-28 mb-4 relative flex items-center justify-center">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center border-2 ${
                      isUnlocked ? badge.borderColor : 'border-white/20'
                    } ${badge.bgColor}`}
                  >
                    <span
                      className={`material-symbols-outlined text-4xl ${
                        isUnlocked ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'text-white/40'
                      }`}
                    >
                      {badge.icon}
                    </span>
                  </div>

                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-surface/70 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-on-surface-variant">lock</span>
                    </div>
                  )}
                </div>

                <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-1">
                  {badge.name}
                </h3>
                <div
                  className="font-label-sm text-label-sm px-3 py-0.5 rounded-full text-white mb-2 font-bold border border-white/20"
                  style={{ backgroundColor: badge.color + '40', color: badge.color }}
                >
                  {badge.rarity}
                </div>
                <p className="font-body-md text-sm text-on-surface-variant mb-4 max-w-xs">
                  {badge.description}
                </p>

                {isUnlocked ? (
                  <div className="mt-auto w-full flex items-center justify-center gap-2 text-accent_green font-label-sm text-xs bg-accent_green/10 border border-accent_green/30 py-2 rounded-lg font-bold">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Tersimpan di Profil</span>
                  </div>
                ) : (
                  <div className="mt-auto w-full flex items-center justify-center gap-2 text-on-surface-variant font-label-sm text-xs bg-surface-container/50 py-2 rounded-lg font-semibold">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    <span>Terkunci</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Active Quests */}
      <section>
        <div className="flex items-center gap-2 mb-md">
          <span className="material-symbols-outlined text-primary text-2xl">assignment</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Quest Kosmik Harian</h2>
        </div>

        <div className="flex flex-col gap-4">
          {/* Quest 1 */}
          <div className="glass-card rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden border-l-4 border-l-accent-gold shadow-xl">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-primary-container flex items-center justify-center border border-white/10 text-accent-gold shadow-[0_0_15px_rgba(255,215,0,0.3)]">
              <span className="material-symbols-outlined text-3xl">quiz</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Penjelajah Kuis Pertama</h3>
                <span className="font-label-sm text-label-sm bg-accent-gold/20 text-accent-gold px-2.5 py-0.5 rounded border border-accent-gold/30 font-bold">
                  Harian
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-2">
                Selesaikan 1 Kuis atau Latihan Astronomi hari ini.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1 max-w-xs">
                  <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-accent-gold h-2 rounded-full shadow-[0_0_8px_rgba(255,215,0,0.6)]"
                      style={{ width: userStats.points > 0 ? '100%' : '0%' }}
                    />
                  </div>
                </div>
                <span className="font-code-md text-code-md text-accent-gold font-bold">
                  {userStats.points > 0 ? '1/1' : '0/1'}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-3 w-full md:w-auto mt-4 md:mt-0">
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm">stars</span>
                <span className="font-label-sm text-label-sm font-bold">+50 XP</span>
              </div>
              {questClaimed ? (
                <button
                  disabled
                  className="w-full md:w-auto px-6 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-code-md text-xs rounded-lg font-bold flex items-center justify-center gap-1 cursor-default"
                >
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Sudah Diklaim</span>
                </button>
              ) : (
                <button
                  onClick={handleClaimQuest}
                  className="w-full md:w-auto px-6 py-2 bg-accent-gold text-primary-container font-headline-md text-sm font-extrabold rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:bg-white hover:scale-105 transition-all cursor-pointer"
                >
                  Klaim Quest
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
