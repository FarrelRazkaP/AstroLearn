'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StarfieldCanvas from '@/components/effects/StarfieldCanvas';

export default function LoginPage() {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal masuk ke akun!');
      }

      // Save authenticated user session
      localStorage.setItem('astrolearn-user', JSON.stringify(data.user));
      localStorage.setItem('astrolearn-role', data.user.role || 'pemula');
      window.dispatchEvent(new Event('storage'));

      router.push('/dashboard');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0e27] text-on-surface p-4 antialiased">
      {/* Background Starfield */}
      <StarfieldCanvas starCount={200} />

      {/* Cosmic Nebula Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="nebula-glow-1 absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full blur-[120px]" />
        <div className="nebula-glow-2 absolute bottom-[0%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[100px]" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md glass-panel rounded-2xl p-8 md:p-10 border border-white/10 shadow-[0_0_30px_rgba(26,17,69,0.8)] backdrop-blur-2xl flex flex-col items-center">
        {/* Header Icon */}
        <div className="w-14 h-14 rounded-full bg-secondary-container/60 border border-secondary/30 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(201,191,253,0.2)]">
          <span className="material-symbols-outlined text-secondary text-3xl">
            explore
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display-lg text-headline-lg font-bold text-white mb-1 tracking-tight">
          AstroLearn
        </h1>
        <p className="font-code-md text-label-sm text-on-surface-variant uppercase tracking-widest mb-6">
          Akademi Astronomi Observatorium
        </p>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="w-full mb-4 p-3 rounded-xl bg-error/20 border border-error/40 text-error font-body-md text-xs flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          {/* Email or Username */}
          <div className="flex flex-col gap-1.5">
            <label className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider">
              Email atau Username
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl pointer-events-none">
                person
              </span>
              <input
                type="text"
                required
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="farrel atau farrel@astrolearn.com"
                className="w-full bg-surface-container-lowest/80 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider">
                Kata Sandi
              </label>
              <Link
                href="/forgot-password"
                className="font-code-md text-xs text-secondary hover:underline transition-all"
              >
                Lupa Kata Sandi?
              </Link>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl pointer-events-none">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container-lowest/80 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-on-surface-variant hover:text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-6 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-headline-md text-body-lg font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(201,191,253,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Memproses...</span>
            ) : (
              <>
                <span>Masuk ke Observatorium</span>
                <span className="material-symbols-outlined">rocket_launch</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Info Box */}
        <div className="w-full mt-6 p-3 rounded-xl bg-surface-container-high/60 border border-white/10 text-xs font-code-md text-on-surface-variant flex flex-col gap-1">
          <span className="text-secondary font-bold">🔑 Demo Akun Default AstroLearn:</span>
          <span>• Identity: <code className="text-white">astronot</code> / <code className="text-white">astronot@astrolearn.com</code></span>
          <span>• Password: <code className="text-white">password123</code></span>
        </div>

        {/* Footer Link */}
        <p className="mt-6 font-body-md text-sm text-on-surface-variant">
          Belum punya akun?{' '}
          <Link href="/signup" className="text-secondary font-semibold hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
