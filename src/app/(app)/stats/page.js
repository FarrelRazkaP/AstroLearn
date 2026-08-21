'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUserStats, BADGE_CATALOG } from '@/lib/userStats';

const TOPIC_LIST = [
  'Mekanika Benda Langit',
  'Astrofisika',
  'Bola Langit & Sistem Koordinat',
  'Fotometri & Magnitudo',
  'Kosmologi Dasar',
];

export default function StatsPage() {
  const [userStats, setUserStats] = useState({ points: 0, streak: 0, completedQuizzes: 0, badges: [] });
  const [topicMastery, setTopicMastery] = useState({});
  const [weeklyActivity, setWeeklyActivity] = useState([]);

  useEffect(() => {
    // 1. Fetch real user stats
    const stats = getUserStats();
    setUserStats(stats);

    // 2. Fetch saved quiz attempts / topic performance from localStorage
    try {
      const savedMastery = localStorage.getItem('astrolearn-topic-mastery');
      if (savedMastery) {
        setTopicMastery(JSON.parse(savedMastery));
      }

      const savedWeekly = localStorage.getItem('astrolearn-weekly-activity');
      if (savedWeekly) {
        setWeeklyActivity(JSON.parse(savedWeekly));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const hasActivity = (userStats.points || 0) > 0 || (userStats.completedQuizzes || 0) > 0;

  // Generate dynamic topic mastery data based on real user activity
  const heatmapData = TOPIC_LIST.map((topic) => {
    const data = topicMastery[topic] || {};
    return {
      topic,
      easy: data.easy !== undefined ? data.easy : null,
      medium: data.medium !== undefined ? data.medium : null,
      hard: data.hard !== undefined ? data.hard : null,
      olympiad: data.olympiad !== undefined ? data.olympiad : null,
    };
  });

  // Days of the week progress bar
  const days = ['S', 'S', 'R', 'K', 'J', 'S', 'M'];
  const todayIdx = (new Date().getDay() + 6) % 7; // Monday = 0

  const weeklyProgress = days.map((day, idx) => {
    const count = weeklyActivity[idx] || 0;
    const maxCount = Math.max(...weeklyActivity, 1);
    const heightPercent = count > 0 ? Math.min(100, Math.max(20, Math.round((count / maxCount) * 100))) : 0;
    return {
      day,
      height: `${heightPercent}%`,
      isPeak: idx === todayIdx && count > 0,
      count,
    };
  });

  // Style badge scores
  const getScoreBadgeClass = (score) => {
    if (score === null || score === undefined) {
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
    const exportObject = {
      userStats,
      topicMastery: heatmapData,
      exportedAt: new Date().toISOString(),
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(exportObject, null, 2)
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
            Mastery Matrix & Analisis Statistik
          </h1>
          <p className="text-base text-[#94a3b8] max-w-2xl">
            Visualisasi tingkat penguasaan topik astronomi berdasarkan kuis & drill yang benar-benar telah Anda selesaikan.
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

      {/* Zero State Alert for Brand New Accounts */}
      {!hasActivity && (
        <div className="glass-panel rounded-2xl p-6 md:p-8 border border-secondary/30 bg-secondary-container/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary/20 border border-secondary/40 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-3xl">insights</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-headline-md text-xl font-bold text-white">
                🚀 Belum Ada Data Analisis Kosmik!
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                Anda baru membuat akun. Heatmap penguasaan topik dan analisis progres akan otomatis terisi secara real-time setelah Anda menyelesaikan kuis atau drill pertama Anda di Practice Hub!
              </p>
            </div>
          </div>

          <Link
            href="/practice"
            className="px-6 py-3 rounded-xl bg-secondary text-on-secondary font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shrink-0 flex items-center gap-2"
          >
            <span>🎯 Mulai Kuis Pertama</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      )}

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

              {/* Legend */}
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
                  <span>Belum Diuji</span>
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[#94a3b8] font-code-md text-xs uppercase tracking-wider border-b border-[#1e294b]">
                    <th className="py-3 px-4 font-semibold w-2/5">Topik Astronomi</th>
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
          {/* Card 1: Progres Aktivitas Mingguan */}
          <div className="bg-[#0e162d]/80 rounded-2xl p-6 border border-[#1e294b] shadow-2xl backdrop-blur-xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#1e294b] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#94a3b8] text-xl">trending_up</span>
                <h3 className="text-lg font-bold text-white">Progres Mingguan</h3>
              </div>
              <span className="font-code-md text-xs text-secondary font-bold">
                {userStats.completedQuizzes || 0} Kuis Selesai
              </span>
            </div>

            {/* Weekly Bar Chart */}
            <div className="h-44 flex items-end justify-between px-2 pt-6 pb-2 gap-2">
              {weeklyProgress.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                  <div className="w-full bg-[#16203d] rounded-t flex items-end h-32 relative overflow-hidden">
                    <div
                      style={{ height: item.height }}
                      className={`w-full rounded-t transition-all ${
                        item.height === '0%'
                          ? 'bg-transparent'
                          : item.isPeak
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
            <div className="flex items-center justify-between border-b border-[#1e294b] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#94a3b8] text-xl">military_tech</span>
                <h3 className="text-lg font-bold text-white">Achievement Badges</h3>
              </div>
              <Link
                href="/achievements"
                className="font-code-md text-xs text-primary hover:text-white transition-colors font-bold"
              >
                Lihat Semua →
              </Link>
            </div>

            {/* 2x2 Grid Badges dynamically rendered */}
            <div className="grid grid-cols-2 gap-3">
              {BADGE_CATALOG.slice(0, 4).map((badge) => {
                const isUnlocked = (userStats.badges || []).includes(badge.name);
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-xl border flex flex-col items-center text-center gap-3 transition-all ${
                      isUnlocked
                        ? 'bg-[#141b36] border-secondary/40 text-white'
                        : 'bg-[#0f1428]/60 border-[#1e293b]/40 text-[#475569] grayscale opacity-50'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center ${
                        isUnlocked ? 'bg-secondary/20 text-secondary' : 'bg-[#181f38] text-[#475569]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">{badge.icon}</span>
                    </div>
                    <span className="font-code-md text-xs font-semibold leading-tight">
                      {badge.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
