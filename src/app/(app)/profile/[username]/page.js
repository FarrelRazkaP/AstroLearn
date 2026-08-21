'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BADGE_CATALOG } from '@/lib/userStats';

const DEFAULT_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAvnKwhe4rOXVCXw5tDtyiB5FKfdt6K4hKgDPP5aBhfnbJoVO1vvpa4jOWFT5Q5tFG2iiZ2EOtbdjMLUah106tRrdK6EHcXBFGAWA_P-cP8iO_fRcJW0uJeCoUKMyGsgbnAqq6LvN9xp1pB0q7fzw6CSx9B7lLJ2xrKSuYpbqskeyTO0kM15mmW81OoUWQX2jKVvmM8kujhyU0cJQMWiu_MM82nMz6etm5D03WKq2-Qqw0NVpy-bTme9Q';

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const rawUsername = params?.username;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);

  useEffect(() => {
    if (!rawUsername) return;

    async function fetchProfile() {
      setLoading(true);
      setErrorMsg('');

      const cleanParam = decodeURIComponent(rawUsername).toLowerCase().trim();
      let found = null;

      // 1. Try fetching from API
      try {
        const res = await fetch(`/api/user/${encodeURIComponent(cleanParam)}`);
        const data = await res.json();
        if (res.ok && data.profile) {
          found = data.profile;
        }
      } catch (err) {}

      // 2. Fallback to LocalStorage registered users / active session
      if (!found) {
        try {
          const activeUser = JSON.parse(localStorage.getItem('astrolearn-user') || '{}');
          const localReg = JSON.parse(localStorage.getItem('astrolearn-registered-users') || '[]');

          const candidates = [...localReg];
          if (activeUser.id && !candidates.some((c) => c.id === activeUser.id)) {
            candidates.push(activeUser);
          }

          const match = candidates.find((u) => {
            return (
              (u.username && u.username.toLowerCase() === cleanParam) ||
              (u.fullName && u.fullName.toLowerCase().replace(/\s+/g, '') === cleanParam) ||
              (u.fullName && u.fullName.toLowerCase() === cleanParam) ||
              u.id === cleanParam
            );
          });

          if (match) {
            const unlockedNames = new Set(match.badges || []);
            const badgeDetails = BADGE_CATALOG.map((b) => ({
              ...b,
              isUnlocked:
                unlockedNames.has(b.name) ||
                (match.points || 0) >= (b.id === 'penjelajah_awal' ? 50 : b.id === 'pemburu_nebula' ? 500 : 1000),
            }));

            found = {
              ...match,
              globalRank: match.globalRank || 1,
              badges: badgeDetails,
              unlockedCount: badgeDetails.filter((b) => b.isUnlocked).length,
            };
          }
        } catch (e) {}
      }

      if (found) {
        setProfile(found);
      } else {
        setErrorMsg('Profil astronomer tidak ditemukan!');
      }
      setLoading(false);
    }

    fetchProfile();
  }, [rawUsername]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-on-surface">
        <span className="material-symbols-outlined text-secondary text-5xl animate-spin">
          progress_activity
        </span>
        <p className="font-code-md text-sm text-on-surface-variant">
          Memuat showcase profil astronomer...
        </p>
      </div>
    );
  }

  if (errorMsg || !profile) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-error/20 text-error flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-3xl">search_off</span>
        </div>
        <h2 className="font-headline-lg text-headline-lg font-bold text-white mb-2">
          Profil Tidak Ditemukan
        </h2>
        <p className="font-body-md text-sm text-on-surface-variant mb-6">
          Astronomer &quot;{rawUsername}&quot; belum terdaftar di akademi.
        </p>
        <Link
          href="/leaderboard"
          className="px-6 py-2.5 rounded-xl bg-secondary text-on-secondary font-bold hover:brightness-110 transition-all shadow-lg"
        >
          Kembali ke Leaderboard
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen max-w-5xl mx-auto pb-24 text-on-background">
      {/* Toast Link Copied */}
      {copiedToast && (
        <div className="fixed top-24 right-8 z-50 bg-accent_green text-black font-code-md text-xs font-extrabold px-5 py-3 rounded-2xl shadow-[0_0_25px_rgba(0,255,0,0.6)] flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-base">link</span>
          <span>Tautan Profil Berhasil Disalin! Siap dipamerkan 🚀</span>
        </div>
      )}

      {/* Top Banner Public Showcase Card */}
      <section className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden border border-white/10 shadow-2xl mb-8">
        <div className="absolute right-0 top-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        {/* User Avatar with Rank Ring */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-secondary shadow-[0_0_25px_rgba(201,191,253,0.4)] relative">
            <img
              src={profile.avatarUrl || DEFAULT_AVATAR}
              alt={profile.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-secondary text-on-secondary font-code-md text-xs font-extrabold shadow-lg border border-white/20 whitespace-nowrap">
            Rank #{profile.globalRank || 1} Global
          </div>
        </div>

        {/* User Showcase Metadata */}
        <div className="flex flex-col gap-2 text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row items-center md:items-baseline justify-between gap-4">
            <div>
              <h1 className="font-display-lg text-3xl md:text-4xl text-white font-extrabold tracking-tight">
                {profile.fullName}
              </h1>
              <p className="font-code-md text-sm text-secondary font-bold">
                @{ (profile.username || (profile.fullName ? profile.fullName.toLowerCase().replace(/[^a-z0-9]/g, '') : 'astronomer')).replace(/@.*/, '') }
              </p>
            </div>

            {/* Share Profile Link Button */}
            <button
              onClick={handleCopyLink}
              className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-bold hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">share</span>
              <span>Pamerkan / Bagikan Profil</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 font-body-md text-on-surface-variant mt-1">
            <span className="px-3 py-1 rounded-full bg-surface-container/80 border border-white/10 text-white font-semibold text-xs capitalize">
              🎓 Peran: {profile.role || 'Pemula'}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-secondary font-bold text-sm">⭐ Level {profile.level || 1}</span>
            <span className="text-white/30">•</span>
            <span className="text-accent_gold font-bold text-sm">🔥 Streak {profile.streak || 0} Hari</span>
          </div>

          {profile.bio && (
            <p className="font-body-md text-sm text-on-surface-variant mt-2 italic bg-surface-container-lowest/60 p-3 rounded-xl border border-white/5">
              &quot;{profile.bio}&quot;
            </p>
          )}
        </div>
      </section>

      {/* Grid Showcase Stats & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Stats Highlight */}
        <div className="lg:col-span-4 flex flex-col gap-md">
          <div className="glass-card rounded-2xl p-md flex flex-col gap-md border border-white/10 shadow-xl">
            <h2 className="font-headline-md text-headline-md text-white font-semibold flex items-center gap-2 border-b border-outline-variant/30 pb-2">
              <span className="material-symbols-outlined text-primary text-2xl">insights</span>
              <span>Statistik Kosmik</span>
            </h2>

            <div className="flex flex-col gap-3">
              <div className="glass-panel rounded-xl p-3.5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent_gold">military_tech</span>
                  <span className="font-body-md text-on-surface-variant">Peringkat Global</span>
                </div>
                <span className="font-headline-md text-headline-md font-extrabold text-accent_gold">
                  #{profile.globalRank || 1}
                </span>
              </div>

              <div className="glass-panel rounded-xl p-3.5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">star</span>
                  <span className="font-body-md text-on-surface-variant">Total XP Poin</span>
                </div>
                <span className="font-headline-md text-headline-md font-extrabold text-white">
                  {(profile.points || 0).toLocaleString()} XP
                </span>
              </div>

              <div className="glass-panel rounded-xl p-3.5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error">local_fire_department</span>
                  <span className="font-body-md text-on-surface-variant">Streak Kuis</span>
                </div>
                <span className="font-headline-md text-headline-md font-extrabold text-white">
                  {profile.streak || 0} Hari
                </span>
              </div>

              <div className="glass-panel rounded-xl p-3.5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary">workspace_premium</span>
                  <span className="font-body-md text-on-surface-variant">Badge Terbuka</span>
                </div>
                <span className="font-headline-md text-headline-md font-extrabold text-tertiary">
                  {profile.unlockedCount || 0} Badge
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Badge Showcase Gallery */}
        <div className="lg:col-span-8 flex flex-col gap-md">
          <div className="glass-panel rounded-2xl p-md md:p-lg flex flex-col gap-md border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
              <h2 className="font-headline-md text-headline-md text-white font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-2xl">workspace_premium</span>
                <span>Galeri Badge Koleksi</span>
              </h2>
              <span className="font-code-md text-xs text-secondary font-bold">
                {profile.unlockedCount || 0} / {profile.badges ? profile.badges.length : 0} Terbuka
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-md pt-2">
              {profile.badges &&
                profile.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`glass-card rounded-xl p-4 flex flex-col items-center text-center transition-all ${
                      badge.isUnlocked
                        ? 'border border-white/20 shadow-lg hover:scale-105'
                        : 'opacity-40 grayscale border border-white/5'
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-3 ${
                        badge.isUnlocked ? badge.borderColor + ' ' + badge.bgColor : 'border-white/20 bg-surface-bright'
                      }`}
                      style={{ color: badge.isUnlocked ? badge.color : '#888' }}
                    >
                      <span className="material-symbols-outlined text-3xl">{badge.icon}</span>
                    </div>

                    <h3 className="font-headline-md text-sm font-bold text-white mb-0.5">
                      {badge.name}
                    </h3>
                    <span
                      className="font-code-md text-[10px] font-bold px-2 py-0.5 rounded-full mb-2"
                      style={{ backgroundColor: badge.color + '30', color: badge.color }}
                    >
                      {badge.rarity}
                    </span>
                    <p className="font-body-md text-xs text-on-surface-variant">
                      {badge.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
