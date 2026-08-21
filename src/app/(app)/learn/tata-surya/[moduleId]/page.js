'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TataSuryaModulePage() {
  const [activeTab, setActiveTab] = useState('terestrial');

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-gutter">
      {/* Breadcrumb & Header */}
      <div className="mb-lg">
        <div className="flex items-center gap-xs text-on-surface-variant font-label-sm text-label-sm mb-sm">
          <Link href="/learn" className="hover:text-primary transition-colors">
            Learning Hub
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-bold">Sistem Tata Surya</span>
        </div>
        <h1 className="font-display-lg text-display-lg text-primary mb-xs">
          Sistem Tata Surya
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          Jelajahi keajaiban lingkungan kosmik kita, dari planet berbatu yang panas hingga raksasa gas yang dingin di pinggiran tata surya.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Hero Feature Card (md:col-span-12 lg:col-span-8) */}
        <div className="md:col-span-12 lg:col-span-8 glass-card rounded-xl p-md flex flex-col relative overflow-hidden group min-h-[280px]">
          <div
            className="absolute inset-0 z-0 opacity-40 mix-blend-screen transition-transform duration-700 group-hover:scale-105 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEEUNQbpKu8-S_ZAOEPEuCzWvEpEY-_Y5k_v1uEHSbrI_0uq8xhQtUugzjRKntpwasA_VmdfzdRnrWOOJOW9vaK8xJFHA-uy0Ta0lYlGiHThD-9BElYJYMgEJ6eMVxBNDkwoOk3yH3YZaVnpTi7ap7UJOfDXwLpKyxHrNEVP1DR91F1DGJJq9Ga5t20tNMSUzexO6a5yN0HTmklfJPwM8sJoE2y7UNr_LDQg03TM1Rr-H8munX969Mzw')",
            }}
          />
          <div className="relative z-10 flex-1 flex flex-col justify-end">
            <span className="font-label-sm text-label-sm text-primary bg-primary-container/50 px-3 py-1 rounded-full w-max mb-sm border border-primary/20 backdrop-blur-md">
              Modul Inti
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm drop-shadow-lg font-bold">
              Tinjauan Tata Surya
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mb-md drop-shadow-md">
              Sebuah sistem bintang yang terdiri dari Matahari dan objek-objek terikat gravitasinya, terbentuk 4.6 miliar tahun lalu.
            </p>
            <button
              onClick={() => alert('Memulai Eksplorasi Tata Surya...')}
              className="bg-primary text-[#000000] font-headline-md text-headline-md py-2 px-6 rounded-lg w-max hover:bg-white transition-colors cursor-pointer font-bold"
            >
              Mulai Eksplorasi
            </button>
          </div>
        </div>

        {/* Secondary Info Card (md:col-span-12 lg:col-span-4) */}
        <div className="md:col-span-12 lg:col-span-4 glass-card rounded-xl p-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-sm mb-md">
              <span className="material-symbols-outlined text-secondary text-3xl">wb_sunny</span>
              <h3 className="font-headline-md text-headline-md text-secondary font-bold">
                Matahari Pusat
              </h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md leading-relaxed">
              Matahari menyumbang 99.86% dari total massa tata surya, menjadi jangkar gravitasi bagi semua planet dan benda kecil lainnya.
            </p>
            <ul className="space-y-2 mb-md">
              <li className="flex items-center gap-2 font-code-md text-code-md text-on-surface">
                <span className="text-tertiary">Tipe:</span> Bintang Deret Utama G
              </li>
              <li className="flex items-center gap-2 font-code-md text-code-md text-on-surface">
                <span className="text-tertiary">Suhu Permukaan:</span> ~5,500 °C
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <Link
              href="/practice/drill/1?module=tata-surya"
              className="w-full flex items-center justify-center bg-secondary-container text-on-secondary-container font-headline-md text-headline-md py-3 rounded-xl hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer active:scale-95 shadow-lg font-bold gap-2"
            >
              <span className="material-symbols-outlined text-lg">quiz</span>
              <span>Mulai Kuis</span>
            </Link>
          </div>
        </div>

        {/* Category Sub-Nav / Filter Bar (md:col-span-12) */}
        <div className="md:col-span-12 glass-panel rounded-xl p-2 flex overflow-x-auto gap-sm mt-md no-scrollbar">
          {[
            { id: 'terestrial', label: 'Planet Terestrial' },
            { id: 'raksasa', label: 'Raksasa Gas' },
            { id: 'asteroid', label: 'Sabuk Asteroid' },
            { id: 'eksplorasi', label: 'Eksplorasi' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-headline-md text-headline-md transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-secondary-container/50 text-secondary glow-active border border-secondary/30 font-bold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Grid for 'Planet Terestrial' (md:col-span-12) */}
        <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mt-sm">
          {/* Planet Card: Mercury */}
          <div className="glass-card rounded-xl overflow-hidden group hover:border-primary/50 transition-colors duration-300 flex flex-col justify-between">
            <div className="h-40 overflow-hidden relative">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtiV2hGLTg8aY5lx32RlkLqTZGZsOOSXkdme-k9tazWkRm46ni5cnj7jT8USNywISI5MEobAeP-MkOsxQwWVylYC5UwjZMeJ_hm1QrS4guBE4dvmNyv-4fpKXIfpxDnLf9mMTg8Ilwpiill3UaZRDlFiCyyUnGkD-q5yQlIYqWPTmn9hqxuZME_Zkhwu24upr-FACw4PnUX_pZhRJxAfFAWAw0dXadGz2Ke8979f20siSbTNtrku03Uw')",
                }}
              />
            </div>
            <div className="p-md">
              <div className="flex justify-between items-start mb-xs">
                <h4 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Merkurius
                </h4>
                <span className="font-label-sm text-label-sm bg-error/20 text-error px-2 py-0.5 rounded-full border border-error/30">
                  Terpanas
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                Planet terkecil dan terdekat dengan Matahari, memiliki variasi suhu ekstrem.
              </p>
            </div>
          </div>

          {/* Planet Card: Venus */}
          <div className="glass-card rounded-xl overflow-hidden group hover:border-primary/50 transition-colors duration-300 flex flex-col justify-between">
            <div className="h-40 overflow-hidden relative">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGA7TRZUL8218_4DZS2c2m-aTAWd3wmUjMmZKBSHSx0178-ZxVRI1q8TcZwWxO2EBc-UMGFUicd61ohwsxRswjnd037BI9m1c41sFIYtlvN-gPbOv0ZD54ekp57UCJztAL8obg_R4hGq0SOtkhI7bbYsEctn1DW-TyNsBIcBrZCEl0qK-10EIrkg78oTQzGm4fcJYPdRBcwYet4ml--6WSWLKl4lRo9T6IqhXrAWvF21d3b1CbRfTQmQ')",
                }}
              />
            </div>
            <div className="p-md">
              <div className="flex justify-between items-start mb-xs">
                <h4 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Venus
                </h4>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                Sering disebut kembaran Bumi karena ukurannya, namun memiliki atmosfer beracun tebal.
              </p>
            </div>
          </div>

          {/* Planet Card: Earth */}
          <div className="glass-card rounded-xl overflow-hidden group border-primary/40 glow-active transition-colors duration-300 relative flex flex-col justify-between">
            {/* Active indicator */}
            <div className="absolute top-2 right-2 z-20 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <div className="h-40 overflow-hidden relative">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuMOcBVPhBlZ9VhXNUbU93E-2JSch6FV6McaCVVc0UAhv0T8-_EL86U1wP4JRaVwRVJYmvrNQ7SHyPM_1yPi3UfbpcuPIYpz88N5ASiEUr6CiiDCCbDQu9wRrgsgJlRaaKGn_jEoHymBliYVwmdjnaQG71FIgIcGCVGF0e0YgUg1-PUrznHb1RxUox0YSZzOMzRlA7iDwKTpQx341JeKhCzrSBOu__ly3QS3PJ1HZ8XAo2GPmIw36pgw')",
                }}
              />
            </div>
            <div className="p-md">
              <div className="flex justify-between items-start mb-xs">
                <h4 className="font-headline-md text-headline-md text-primary font-bold">
                  Bumi
                </h4>
                <span className="font-label-sm text-label-sm bg-[#52c41a]/20 text-[#52c41a] px-2 py-0.5 rounded-full border border-[#52c41a]/30">
                  Dihuni
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                Satu-satunya planet yang diketahui mendukung kehidupan dengan lautan air cair.
              </p>
            </div>
          </div>

          {/* Planet Card: Mars */}
          <div className="glass-card rounded-xl overflow-hidden group hover:border-primary/50 transition-colors duration-300 flex flex-col justify-between">
            <div className="h-40 overflow-hidden relative">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeQyivxtvvSPD10LcCmB0qMjJkEnpIhx2GOFO0jSKGXBiCjgTLCrknQmUeFRpKY611O6nXLu7RAcxctns0bXG_j8dTGan553XyE8lnY1TaBw4umD1gZK7pLnUr51pp0e7baN_yqSk3TIpBsGuZzoB7-UNxgOYJDLjBIIre4v_sattB8CHrvsQm-YS9uEHVHmToQxv09FYiI62IqVtPqAW5DLSkZHWZ_tMF5U2Jn2C_8x5aNNcYgjY6ZA')",
                }}
              />
            </div>
            <div className="p-md">
              <div className="flex justify-between items-start mb-xs">
                <h4 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Mars
                </h4>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                Planet merah dengan lanskap berdebu, gunung berapi besar, dan sejarah air cair.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
