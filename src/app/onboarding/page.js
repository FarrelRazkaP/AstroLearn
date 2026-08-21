'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const roles = [
  {
    id: 'pemula',
    title: 'Pemula & Hobi',
    icon: 'star',
    description: 'Memulai penjelajahan alam semesta',
  },
  {
    id: 'kompetisi',
    title: 'Kompetisi OSN/IOAA',
    icon: 'emoji_events',
    description: 'Persiapan olimpiade astronomi',
  },
  {
    id: 'mahasiswa',
    title: 'Mahasiswa Astronomi',
    icon: 'school',
    description: 'Kajian akademis & observasi lanjut',
  },
  {
    id: 'guru',
    title: 'Guru / Pembina',
    icon: 'co_present',
    description: 'Mengelola kelas dan materi ajar',
  },
];

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem('astrolearn-role', selectedRole);
      router.push(`/signup?role=${selectedRole}`);
    }
  };

  return (
    <div className="text-on-surface min-h-screen flex flex-col items-center justify-center relative overflow-hidden antialiased bg-[#0a0e27]">
      {/* Ambient Cosmic Background */}
      <div className="starfield" />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="nebula-glow-1 absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full blur-[120px]" />
        <div className="nebula-glow-2 absolute bottom-[0%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[100px]" />
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-5xl px-margin py-xl min-h-screen justify-center">
        {/* Header */}
        <header className="text-center mb-xl w-full max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-md border border-primary/20 shadow-[0_0_15px_rgba(193,196,230,0.15)]">
            <span
              className="material-symbols-outlined text-primary text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              rocket_launch
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-primary mb-sm tracking-tight drop-shadow-md">
            Selamat Datang!
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto">
            Pilih jalur belajarmu untuk menyesuaikan instrumen dan membuat akun AstroLearn milikmu.
          </p>
        </header>

        {/* Role Selection Grid */}
        <div
          aria-labelledby="role-selection-heading"
          className="grid grid-cols-1 md:grid-cols-2 gap-md md:gap-lg w-full mb-xl max-w-4xl"
          role="radiogroup"
        >
          {roles.map((role) => {
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedRole(role.id)}
                className={`role-card group rounded-xl p-lg flex flex-col items-center justify-center text-center cursor-pointer outline-none transition-all duration-300 ${
                  isSelected ? 'selected border-2 border-secondary bg-secondary-container/40' : 'bg-surface-container/40 border border-white/10'
                }`}
              >
                <div className="icon-container w-20 h-20 rounded-full bg-surface-container/50 flex items-center justify-center mb-md text-secondary border border-white/5">
                  <span className="material-symbols-outlined text-[40px]">
                    {role.icon}
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-xs font-bold">
                  {role.title}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant opacity-80 group-hover:opacity-100 transition-opacity">
                  {role.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Footer Action */}
        <div className="w-full max-w-sm mx-auto flex flex-col items-center mt-auto md:mt-0">
          {/* Target Acquired Status Chip */}
          {selectedRole && (
            <div className="mb-md px-4 py-1.5 rounded-full bg-surface-container border border-tertiary-fixed-dim/30 flex items-center gap-2 transition-all duration-300">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#c1c4e6]" />
              <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold">
                Jalur Dipilih: {roles.find((r) => r.id === selectedRole)?.title}
              </span>
            </div>
          )}

          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full py-3 px-lg rounded-xl font-headline-md text-headline-md font-bold transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden ${
              selectedRole
                ? 'bg-secondary text-on-secondary shadow-[0_0_25px_rgba(201,191,253,0.3)] hover:bg-secondary-fixed cursor-pointer'
                : 'bg-surface-variant text-on-surface-variant opacity-50 cursor-not-allowed'
            }`}
          >
            <span className="relative z-10">Lanjutkan ke Pendaftaran Akun</span>
            <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
