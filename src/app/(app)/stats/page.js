'use client';

import { useState } from 'react';

export default function StatsPage() {
  const [heatmapData] = useState([
    {
      topic: 'Mekanika Benda Langit',
      easy: 92,
      medium: 75,
      hard: 40,
      olympiad: null,
    },
    {
      topic: 'Astrofisika',
      easy: 88,
      medium: 82,
      hard: 60,
      olympiad: 25,
    },
    {
      topic: 'Bola Langit & Sistem Koordinat',
      easy: 95,
      medium: 90,
      hard: 85,
      olympiad: 55,
    },
    {
      topic: 'Fotometri & Magnitudo',
      easy: 100,
      medium: 68,
      hard: 30,
      olympiad: null,
    },
    {
      topic: 'Kosmologi Dasar',
      easy: 70,
      medium: 45,
      hard: 15,
      olympiad: null,
    },
  ]);

  const weeklyProgress = [
    { day: 'S', height: '45%', isPeak: false },
    { day: 'S', height: '65%', isPeak: false },
    { day: 'R', height: '95%', isPeak: true },
    { day: 'K', height: '25%', isPeak: false },
    { day: 'J', height: '75%', isPeak: false },
    { day: 'S', height: '55%', isPeak: false },
    { day: 'M', height: '20%', isPeak: false },
  ];

  const badges = [
    {
      id: 1,
      title: 'Navigator Bola Langit',
      icon: 'explore',
      unlocked: true,
      badgeStyle: 'bg-[#141b36] border-[#312e81]/60 text-[#a5b4fc]',
      iconStyle: 'bg-[#232a52] text-[#818cf8]',
    },
    {
      id: 2,
      title: 'Master Fotometri',
      icon: 'lightbulb',
      unlocked: true,
      badgeStyle: 'bg-[#141b36] border-[#78350f]/60 text-[#fde047]',
      iconStyle: 'bg-[#3b2710] text-[#fbbf24]',
    },
    {
      id: 3,
      title: 'Penakluk Gravitasi',
      icon: 'lock',
      unlocked: false,
      badgeStyle: 'bg-[#0f1428]/60 border-[#1e293b]/40 text-[#475569]',
      iconStyle: 'bg-[#181f38] text-[#475569]',
    },
    {
      id: 4,
      title: 'Fisikawan Bintang',
      icon: 'lock',
      unlocked: false,
      badgeStyle: 'bg-[#0f1428]/60 border-[#1e293b]/40 text-[#475569]',
      iconStyle: 'bg-[#181f38] text-[#475569]',
    },
  ];

  // Exact color mapping matching user's screenshot
  const getScoreBadgeClass = (score) => {
    if (score === null) {
      return 'bg-[#121a36]/50 border border-dashed border-[#2a365c] text-[#475569] font-normal';
    }
    if (score > 80) {
      return 'bg-[#064e3b]/80 border border-[#059669]/40 text-[#34d399] font-bold';
    }
    if (score >= 50) {
      return 'bg-[#451a03]/80 border border-[#d97706]/40 text-[#fbbf24] font-bold';
    }
    return 'bg-[#4c0519]/80 border border-[#e11d48]/40 text-[#f43f5e] font-bold';
  };

  const handleExportData = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(heatmapData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'astrolearn_mastery_matrix.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto text-[#e2e8f0]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display-lg text-4xl font-extrabold text-white tracking-tight mb-2">
            Mastery Matrix
          </h1>
          <p className="text-base text-[#94a3b8] max-w-2xl">
            Visualisasi tingkat penguasaan Anda pada berbagai topik astronomi berdasarkan tingkat kesulitan soal yang berhasil diselesaikan.
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="bg-[#1e293b]/70 hover:bg-[#334155]/80 transition-all px-4 py-2 rounded-lg border border-[#334155] text-xs font-code-md text-[#cbd5e1] hover:text-white flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          <span>Export Data</span>
        </button>
      </div>

      {/* Main Grid Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Heatmap Penguasaan Topik (lg:col-span-8) */}
        <div className="lg:col-span-8">
          <div className="bg-[#0e162d]/80 rounded-2xl p-6 border border-[#1e294b] shadow-2xl backdrop-blur-xl flex flex-col gap-6">
            {/* Card Header & Legend */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#1e294b] pb-4">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#94a3b8] text-xl">grid_on</span>
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Heatmap Penguasaan Topik
                </h2>
              </div>

              {/* Legend matching screenshot */}
              <div className="flex items-center gap-3 font-code-md text-xs">
                <span className="flex items-center gap-1.5 text-[#34d399]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]" />
                  <span>&gt;80%</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#fbbf24]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]" />
                  <span>50-80%</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#f43f5e]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" />
                  <span>&lt;50%</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#64748b]">
                  <span className="w-2.5 h-2.5 rounded-full border border-dashed border-[#64748b]" />
                  <span>0%</span>
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[#94a3b8] font-code-md text-xs uppercase tracking-wider border-b border-[#1e294b]">
                    <th className="py-3 px-4 font-semibold w-2/5">Topik</th>
                    <th className="py-3 px-2 font-semibold text-center">Mudah</th>
                    <th className="py-3 px-2 font-semibold text-center">Sedang</th>
                    <th className="py-3 px-2 font-semibold text-center">Sulit</th>
                    <th className="py-3 px-2 font-semibold text-center">Olimpiade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e294b]/60">
                  {heatmapData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      {/* Topic Name */}
                      <td className="py-4 px-4 font-medium text-white text-sm">
                        {row.topic}
                      </td>

                      {/* Cells */}
                      <td className="py-4 px-2 text-center">
                        <div
                          className={`mx-auto py-2.5 px-3 rounded-lg font-code-md text-xs w-[72px] flex items-center justify-center transition-all ${getScoreBadgeClass(
                            row.easy
                          )}`}
                        >
                          {row.easy !== null ? `${row.easy}%` : '-'}
                        </div>
                      </td>

                      <td className="py-4 px-2 text-center">
                        <div
                          className={`mx-auto py-2.5 px-3 rounded-lg font-code-md text-xs w-[72px] flex items-center justify-center transition-all ${getScoreBadgeClass(
                            row.medium
                          )}`}
                        >
                          {row.medium !== null ? `${row.medium}%` : '-'}
                        </div>
                      </td>

                      <td className="py-4 px-2 text-center">
                        <div
                          className={`mx-auto py-2.5 px-3 rounded-lg font-code-md text-xs w-[72px] flex items-center justify-center transition-all ${getScoreBadgeClass(
                            row.hard
                          )}`}
                        >
                          {row.hard !== null ? `${row.hard}%` : '-'}
                        </div>
                      </td>

                      <td className="py-4 px-2 text-center">
                        <div
                          className={`mx-auto py-2.5 px-3 rounded-lg font-code-md text-xs w-[72px] flex items-center justify-center transition-all ${getScoreBadgeClass(
                            row.olympiad
                          )}`}
                        >
                          {row.olympiad !== null ? `${row.olympiad}%` : '-'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Stacked Cards (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Card 1: Progres Mingguan */}
          <div className="bg-[#0e162d]/80 rounded-2xl p-6 border border-[#1e294b] shadow-2xl backdrop-blur-xl flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-[#1e294b] pb-3">
              <span className="material-symbols-outlined text-[#94a3b8] text-xl">trending_up</span>
              <h3 className="text-lg font-bold text-white">
                Progres Mingguan
              </h3>
            </div>

            {/* Weekly Bar Chart matching screenshot */}
            <div className="h-44 flex items-end justify-between px-2 pt-6 pb-2 gap-2">
              {weeklyProgress.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                  <div className="w-full bg-[#16203d] rounded-t flex items-end h-32 relative">
                    <div
                      style={{ height: item.height }}
                      className={`w-full rounded-t transition-all ${
                        item.isPeak
                          ? 'bg-[#93c5fd] shadow-[0_0_12px_rgba(147,197,253,0.4)]'
                          : 'bg-[#334155] group-hover:bg-[#475569]'
                      }`}
                    />
                  </div>
                  <span className="font-code-md text-xs text-[#94a3b8] font-semibold">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Achievement Badges */}
          <div className="bg-[#0e162d]/80 rounded-2xl p-6 border border-[#1e294b] shadow-2xl backdrop-blur-xl flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-[#1e294b] pb-3">
              <span className="material-symbols-outlined text-[#94a3b8] text-xl">military_tech</span>
              <h3 className="text-lg font-bold text-white">
                Achievement Badges
              </h3>
            </div>

            {/* 2x2 Grid Badges matching screenshot */}
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border flex flex-col items-center text-center gap-3 transition-all ${badge.badgeStyle}`}
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center ${badge.iconStyle}`}>
                    <span className="material-symbols-outlined text-xl">{badge.icon}</span>
                  </div>
                  <span className="font-code-md text-xs font-semibold leading-tight">
                    {badge.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
