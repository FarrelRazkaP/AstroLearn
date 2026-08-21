'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StarfieldCanvas from '@/components/effects/StarfieldCanvas';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('pemula');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Kata sandi dan konfirmasi kata sandi tidak cocok!');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter!');
      return;
    }

    setIsSubmitting(true);

    try {
      let registeredUser = null;

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, password, role }),
        });
        const data = await res.json();
        if (res.ok && data.user) {
          registeredUser = data.user;
        } else if (data.error) {
          throw new Error(data.error);
        }
      } catch (apiErr) {
        // Fallback for Vercel/Client-Side offline persistence
        const username = fullName.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 100);
        registeredUser = {
          id: 'usr_' + Date.now(),
          fullName,
          email,
          username,
          role,
          points: 0,
          level: 1,
          streak: 0,
          badges: [],
          avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvnKwhe4rOXVCXw5tDtyiB5FKfdt6K4hKgDPP5aBhfnbJoVO1vvpa4jOWFT5Q5tFG2iiZ2EOtbdjMLUah106tRrdK6EHcXBFGAWA_P-cP8iO_fRcJW0uJeCoUKMyGsgbnAqq6LvN9xp1pB0q7fzw6CSx9B7lLJ2xrKSuYpbqskeyTO0kM15mmW81OoUWQX2jKVvmM8kujhyU0cJQMWiu_MM82nMz6etm5D03WKq2-Qqw0NVpy-bTme9Q',
        };
      }

      if (!registeredUser) {
        throw new Error('Gagal memproses pendaftaran!');
      }

      // Save user session
      localStorage.setItem('astrolearn-user', JSON.stringify(registeredUser));
      localStorage.setItem('astrolearn-role', registeredUser.role || 'pemula');

      // Save to local accounts registry for fallback login
      try {
        const existingLocal = JSON.parse(localStorage.getItem('astrolearn-registered-users') || '[]');
        const updated = [...existingLocal.filter((u) => u.email !== email), { ...registeredUser, password }];
        localStorage.setItem('astrolearn-registered-users', JSON.stringify(updated));
      } catch (e) {}

      window.dispatchEvent(new Event('storage'));
      router.push('/dashboard');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0e27] text-on-surface p-4 py-8 antialiased">
      {/* Background Starfield */}
      <StarfieldCanvas starCount={200} />

      {/* Cosmic Nebula Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="nebula-glow-1 absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full blur-[120px]" />
        <div className="nebula-glow-2 absolute bottom-[0%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[100px]" />
      </div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md glass-panel rounded-2xl p-8 md:p-10 border border-white/10 shadow-[0_0_30px_rgba(26,17,69,0.8)] backdrop-blur-2xl flex flex-col items-center">
        {/* Header Icon */}
        <div className="w-14 h-14 rounded-full bg-secondary-container/60 border border-secondary/30 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(201,191,253,0.2)]">
          <span
            className="material-symbols-outlined text-secondary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            rocket_launch
          </span>
        </div>

        {/* Title */}
        <h1 className="font-headline-lg text-headline-lg font-bold text-white mb-2 tracking-tight text-center">
          Mulai Perjalanan Kosmikmu
        </h1>
        <p className="font-body-md text-sm text-on-surface-variant text-center mb-6 max-w-xs">
          Bergabunglah dengan AstroLearn untuk menjelajahi alam semesta.
        </p>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="w-full mb-4 p-3 rounded-xl bg-error/20 border border-error/40 text-error font-body-md text-xs flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
          {/* NAMA LENGKAP */}
          <div className="flex flex-col gap-1.5">
            <label className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider">
              Nama Lengkap
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl pointer-events-none">
                person
              </span>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Neil Armstrong"
                className="w-full bg-surface-container-lowest/80 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1.5">
            <label className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider">
              Email
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl pointer-events-none">
                mail
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="neil@apollo.space"
                className="w-full bg-surface-container-lowest/80 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
              />
            </div>
          </div>

          {/* PILIH PERAN */}
          <div className="flex flex-col gap-1.5">
            <label className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider">
              Pilih Peran
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl pointer-events-none">
                school
              </span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-surface-container-lowest/80 border border-white/10 rounded-xl pl-10 pr-8 py-3 text-white text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="pemula" className="bg-surface-container text-white">Pemula (Murid)</option>
                <option value="kompetisi" className="bg-surface-container text-white">Kompetisi OSN/IOAA</option>
                <option value="mahasiswa" className="bg-surface-container text-white">Mahasiswa Astronomi</option>
                <option value="guru" className="bg-surface-container text-white">Guru / Pembina</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 text-on-surface-variant text-xl pointer-events-none">
                arrow_drop_down
              </span>
            </div>
          </div>

          {/* KATA SANDI */}
          <div className="flex flex-col gap-1.5">
            <label className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider">
              Kata Sandi
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl pointer-events-none">
                lock
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container-lowest/80 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
              />
            </div>
          </div>

          {/* KONFIRMASI KATA SANDI */}
          <div className="flex flex-col gap-1.5">
            <label className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl pointer-events-none">
                history
              </span>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container-lowest/80 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-6 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-headline-md text-body-lg font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(201,191,253,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Mendaftarkan...</span>
            ) : (
              <>
                <span>Daftar Akun AstroLearn</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 font-body-md text-sm text-on-surface-variant">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-secondary font-semibold hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
