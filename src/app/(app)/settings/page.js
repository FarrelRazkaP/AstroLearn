'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUserStats, BADGE_CATALOG } from '@/lib/userStats';

const DEFAULT_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAvnKwhe4rOXVCXw5tDtyiB5FKfdt6K4hKgDPP5aBhfnbJoVO1vvpa4jOWFT5Q5tFG2iiZ2EOtbdjMLUah106tRrdK6EHcXBFGAWA_P-cP8iO_fRcJW0uJeCoUKMyGsgbnAqq6LvN9xp1pB0q7fzw6CSx9B7lLJ2xrKSuYpbqskeyTO0kM15mmW81OoUWQX2jKVvmM8kujhyU0cJQMWiu_MM82nMz6etm5D03WKq2-Qqw0NVpy-bTme9Q';

export default function SettingsPage() {
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('Pengguna AstroLearn');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [userStats, setUserStats] = useState({ points: 0, streak: 0, level: 1 });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Load live user profile from localStorage & database session
    try {
      const rawUser = localStorage.getItem('astrolearn-user');
      if (rawUser) {
        const u = JSON.parse(rawUser);
        if (u.id) setUserId(u.id);
        if (u.fullName || u.name) setFullName(u.fullName || u.name);
        if (u.bio) setBio(u.bio);
        if (u.avatarUrl) setAvatarUrl(u.avatarUrl);
      }

      const savedAvatar = localStorage.getItem('astrolearn-avatar');
      if (savedAvatar) setAvatarUrl(savedAvatar);

      const stats = getUserStats();
      setUserStats(stats);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const cleanHandle = fullName.toLowerCase().replace(/[^a-z0-9]/g, '');

      // 1. Save to Client LocalStorage Session
      const rawUser = localStorage.getItem('astrolearn-user');
      const currentUser = rawUser ? JSON.parse(rawUser) : {};
      const updatedUser = {
        ...currentUser,
        id: userId || currentUser.id || 'usr_' + Date.now(),
        fullName,
        name: fullName,
        username: cleanHandle || currentUser.username || 'astronomer',
        bio,
        avatarUrl,
      };

      localStorage.setItem('astrolearn-user', JSON.stringify(updatedUser));
      localStorage.setItem('astrolearn-avatar', avatarUrl);

      // Sync with local registered users registry
      try {
        const localReg = JSON.parse(localStorage.getItem('astrolearn-registered-users') || '[]');
        const updatedReg = localReg.map((u) =>
          u.id === updatedUser.id || (u.email && u.email === updatedUser.email)
            ? { ...u, ...updatedUser }
            : u
        );
        if (!updatedReg.some((u) => u.id === updatedUser.id)) {
          updatedReg.push(updatedUser);
        }
        localStorage.setItem('astrolearn-registered-users', JSON.stringify(updatedReg));
      } catch (e) {}

      window.dispatchEvent(new Event('storage'));

      // 2. Persist to Backend Database API
      await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawUrl = event.target.result;

        // Compress image using HTML5 Canvas to 256x256 (~25KB) to guarantee LocalStorage quota is never exceeded!
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 256, 256);
            const compressedUrl = canvas.toDataURL('image/jpeg', 0.85);

            setAvatarUrl(compressedUrl);

            // Immediately save to LocalStorage session
            localStorage.setItem('astrolearn-avatar', compressedUrl);
            const rawUser = localStorage.getItem('astrolearn-user');
            if (rawUser) {
              const u = JSON.parse(rawUser);
              u.avatarUrl = compressedUrl;
              localStorage.setItem('astrolearn-user', JSON.stringify(u));
            }
            window.dispatchEvent(new Event('storage'));
          } catch (err) {
            console.error('Error compressing/saving avatar:', err);
            // Fallback if canvas fails
            setAvatarUrl(rawUrl);
            localStorage.setItem('astrolearn-avatar', rawUrl);
            window.dispatchEvent(new Event('storage'));
          }
        };
        img.onerror = () => {
          setAvatarUrl(rawUrl);
          localStorage.setItem('astrolearn-avatar', rawUrl);
          window.dispatchEvent(new Event('storage'));
        };
        img.src = rawUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar dari sesi AstroLearn?')) {
      localStorage.removeItem('astrolearn-user');
      localStorage.removeItem('astrolearn-role');
      window.dispatchEvent(new Event('storage'));
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col gap-lg max-w-7xl mx-auto">
      {/* Top Banner Profile Header */}
      <section className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden border border-white/10 shadow-2xl">
        {/* Avatar with Ganti Foto Overlay */}
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary shadow-[0_0_20px_rgba(193,196,230,0.3)] relative">
            <img
              src={avatarUrl || DEFAULT_AVATAR}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
            {/* Hover Camera Overlay */}
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
              <span className="text-[10px] text-white font-bold uppercase tracking-wider">Ubah</span>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center border border-white/20 text-accent_gold shadow-md">
            <span className="material-symbols-outlined text-lg">light_mode</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="flex flex-col gap-2 text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row items-center md:items-baseline justify-between gap-4">
            <div>
              <h1 className="font-display-lg text-display-lg text-white font-bold tracking-tight">
                {fullName}
              </h1>
            </div>

            {/* Top Action Buttons (Ganti Profile & Logout) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-surface-container/60 border border-white/10 hover:bg-white/10 text-white font-body-md text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">photo_camera</span>
                <span>Ganti Foto Profil</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-error-container/60 border border-error/30 text-error hover:bg-error-container transition-all font-body-md text-sm font-bold flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                <span>Keluar</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 font-body-md text-on-surface-variant">
            <span>Amateur Astronomer</span>
            <span className="text-white/30">•</span>
            <span className="text-secondary font-semibold">Level {userStats.level || 1}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
            <span className="px-3 py-1 rounded-full bg-surface-container/60 border border-white/10 font-code-md text-xs text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">location_on</span>
              Observatorium Bosscha
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-container/60 border border-white/10 font-code-md text-xs text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              Akun Terverifikasi
            </span>
          </div>
        </div>
      </section>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column (Stats & Badges) */}
        <div className="lg:col-span-4 flex flex-col gap-lg">
          {/* Statistik Singkat Card */}
          <div className="glass-card rounded-xl p-md flex flex-col gap-md border border-white/10">
            <h2 className="font-headline-md text-headline-md text-white font-semibold flex items-center gap-2 border-b border-outline-variant/30 pb-2">
              <span className="material-symbols-outlined text-primary text-2xl">insights</span>
              <span>Statistik Singkat</span>
            </h2>

            <div className="flex flex-col gap-3">
              <div className="glass-panel rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">menu_book</span>
                  <span className="font-body-md text-on-surface-variant">Level Player</span>
                </div>
                <span className="font-headline-md text-headline-md font-bold text-white">Level {userStats.level || 1}</span>
              </div>

              <div className="glass-panel rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error">local_fire_department</span>
                  <span className="font-body-md text-on-surface-variant">Streak Kuis</span>
                </div>
                <span className="font-headline-md text-headline-md font-bold text-white">{userStats.streak || 0} Hari</span>
              </div>

              <div className="glass-panel rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent_gold">star</span>
                  <span className="font-body-md text-on-surface-variant">Total Poin XP</span>
                </div>
                <span className="font-headline-md text-headline-md font-bold text-white">{(userStats.points || 0).toLocaleString()} Poin</span>
              </div>
            </div>
          </div>

          {/* Badge Koleksi Card */}
          <div className="glass-card rounded-xl p-md flex flex-col gap-md border border-white/10 shadow-xl">
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
              <h2 className="font-headline-md text-headline-md text-white font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-2xl">workspace_premium</span>
                <span>Badge Koleksi</span>
              </h2>
              <Link
                href="/achievements"
                className="font-code-md text-xs text-primary hover:text-white transition-colors font-bold"
              >
                Lihat Semua →
              </Link>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 pt-2">
              {BADGE_CATALOG.map((b) => {
                const isUnlocked = (userStats.badges || []).includes(b.name);
                return (
                  <Link
                    key={b.id}
                    href="/achievements"
                    className={`flex flex-col items-center gap-2 group cursor-pointer transition-all ${
                      isUnlocked ? 'opacity-100' : 'opacity-40 grayscale'
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isUnlocked ? b.borderColor + ' ' + b.bgColor : 'border-white/20 bg-surface-bright'
                      }`}
                      style={{ color: isUnlocked ? b.color : '#888' }}
                    >
                      <span className="material-symbols-outlined text-2xl">{b.icon}</span>
                    </div>
                    <span className="font-code-md text-[11px] font-semibold text-center text-on-surface-variant group-hover:text-white transition-colors">
                      {b.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (Account Info, Security, Preferences & Sesi) */}
        <div className="lg:col-span-8 flex flex-col gap-lg">
          {/* Informasi Akun Form */}
          <form onSubmit={handleSave} className="glass-panel rounded-xl p-md md:p-lg flex flex-col gap-md border border-white/10">
            <h2 className="font-headline-md text-headline-md text-white font-bold border-b border-outline-variant/30 pb-2">
              Informasi Akun & Profil
            </h2>

            {/* Nama Lengkap (Dapat diubah kapan saja!) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider">
                  Nama Lengkap Astronomer (Dapat Diubah)
                </label>
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Masukkan Nama Lengkap Baru Anda..."
                className="bg-surface-container-lowest/80 border border-white/10 rounded-xl px-4 py-3 text-white text-body-md focus:border-secondary outline-none transition-colors font-bold"
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5">
              <label className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider">
                Bio Observasi
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tulis deskripsi singkat atau minat astronomi Anda..."
                className="bg-surface-container-lowest/80 border border-white/10 rounded-xl px-4 py-2.5 text-white text-body-md focus:border-secondary outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              {savedSuccess && (
                <span className="text-accent_green text-sm font-semibold animate-fadeIn flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  Nama & Profil Baru Berhasil Tersimpan!
                </span>
              )}
              <button
                type="submit"
                disabled={isSaving}
                className="ml-auto px-6 py-2.5 rounded-xl bg-secondary text-on-secondary font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer disabled:opacity-50"
              >
                {isSaving ? 'Menyimpan...' : 'Simpan Nama & Profil Baru'}
              </button>
            </div>
          </form>

          {/* Keamanan Card */}
          <div className="glass-panel rounded-xl p-md md:p-lg flex flex-col gap-md border border-white/10">
            <h2 className="font-headline-md text-headline-md text-white font-bold border-b border-outline-variant/30 pb-2">
              Keamanan Akun
            </h2>

            <div className="flex flex-col gap-4">
              <div className="glass-card rounded-xl p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-body-md font-semibold text-white">Status Keamanan Password</h3>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    Password Anda dilindungi enkripsi kriptografi SHA-256 secara aman.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-accent_green/20 text-accent_green text-xs font-bold border border-accent_green/30">
                  Terenkripsi SHA-256
                </span>
              </div>
            </div>
          </div>

          {/* Sesi & Logout Card */}
          <div className="glass-panel rounded-xl p-md md:p-lg flex flex-col gap-md border border-white/10">
            <h2 className="font-headline-md text-headline-md text-white font-bold border-b border-outline-variant/30 pb-2">
              Manajemen Sesi
            </h2>

            <div className="glass-card rounded-xl p-4 flex justify-between items-center border border-error/20 bg-error-container/10">
              <div>
                <h3 className="font-body-md font-semibold text-white">Keluar dari Sesi (Logout)</h3>
                <p className="font-body-md text-xs text-on-surface-variant">
                  Mengakhiri sesi pembelajaran aktif Anda di perangkat ini.
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-xl bg-error-container text-white font-bold hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
