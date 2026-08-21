'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GalacticLeaderboardPage() {
  const [activeTab, setActiveTab] = useState('selamanya'); // 'mingguan' | 'bulanan' | 'selamanya'
  const [showMore, setShowMore] = useState(false);
  const [podiumData, setPodiumData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem('astrolearn-user');
      if (rawUser) {
        const u = JSON.parse(rawUser);
        if (u.id) setCurrentUserId(u.id);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function fetchLeaderboard() {
      try {
        const res = await fetch(`/api/leaderboard?timeframe=${activeTab}&userId=${currentUserId}`);
        const data = await res.json();

        if (isMounted && data.success) {
          setPodiumData(data.podium || []);
          setTableData(data.table || []);
        }
      } catch (err) {
        console.error('Failed to load global leaderboard:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [activeTab, currentUserId]);

  const rank1 = podiumData.find((p) => p.rank === 1);
  const rank2 = podiumData.find((p) => p.rank === 2);
  const rank3 = podiumData.find((p) => p.rank === 3);

  const visibleTable = showMore ? tableData : tableData.slice(0, 6);

  return (
    <div className="relative min-h-screen pb-24">
      {/* Background Starfield Effects */}
      <div className="fixed inset-0 pointer-events-none star-bg opacity-30 z-0" />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-primary-container/20 to-background z-0" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-10 pt-4">
          <h1 className="font-display-lg text-4xl md:text-5xl font-extrabold text-primary-fixed mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-tertiary drop-shadow-lg tracking-tight">
            Galactic Leaderboard Global
          </h1>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Peringkat astronot teratas di seluruh database AstroLearn. Klik nama untuk melihat profil & pameran badge!
          </p>
        </section>

        {/* Timefilter Tabs */}
        <div className="flex justify-center mb-28 md:mb-36 relative z-30">
          <div className="glass-panel p-1.5 rounded-full flex gap-2 border border-white/10 shadow-2xl backdrop-blur-xl bg-surface-container/90">
            <button
              onClick={() => setActiveTab('mingguan')}
              className={`px-6 py-2 rounded-full font-code-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'mingguan'
                  ? 'bg-primary-container text-primary shadow-[0_0_15px_rgba(193,196,230,0.3)] border border-primary/30'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Mingguan
            </button>

            <button
              onClick={() => setActiveTab('bulanan')}
              className={`px-6 py-2 rounded-full font-code-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'bulanan'
                  ? 'bg-primary-container text-primary shadow-[0_0_15px_rgba(193,196,230,0.3)] border border-primary/30'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Bulanan
            </button>

            <button
              onClick={() => setActiveTab('selamanya')}
              className={`px-6 py-2 rounded-full font-code-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'selamanya'
                  ? 'bg-primary-container text-primary shadow-[0_0_15px_rgba(193,196,230,0.3)] border border-primary/30'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Selamanya
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="material-symbols-outlined text-secondary text-4xl animate-spin">
              progress_activity
            </span>
            <span className="font-code-md text-sm text-on-surface-variant">
              Memuat Peringkat Global Database...
            </span>
          </div>
        ) : (
          <>
            {/* Podium Section (Ranks 1-3) */}
            <section className="flex flex-col md:flex-row justify-center items-end gap-6 mb-16 px-4 md:px-0 mt-36 md:mt-44 relative z-10">
              {/* Rank 2 (Silver) */}
              {rank2 && (
                <Link
                  href={`/profile/${encodeURIComponent(rank2.username || rank2.fullName)}`}
                  className="flex flex-col items-center order-2 md:order-1 relative w-full md:w-64 group cursor-pointer"
                >
                  <div className="absolute -top-20 flex flex-col items-center z-10">
                    <div className="relative group-hover:scale-110 transition-transform">
                      {rank2.avatar ? (
                        <img
                          className="w-20 h-20 rounded-full border-4 border-[#c0c0c0] object-cover shadow-[0_0_25px_rgba(192,192,192,0.4)]"
                          alt={rank2.username}
                          src={rank2.avatar}
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full border-4 border-[#c0c0c0] bg-surface-bright flex items-center justify-center font-bold text-2xl text-white shadow-[0_0_25px_rgba(192,192,192,0.4)]">
                          {(rank2.username || 'A').charAt(0)}
                        </div>
                      )}
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#c0c0c0] text-black w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm shadow-lg border-2 border-background">
                        2
                      </div>
                    </div>
                    <h3 className="font-headline-md text-base font-bold text-on-surface mt-4 text-center group-hover:text-primary transition-colors">
                      {rank2.fullName || rank2.username}
                    </h3>
                    <p className="font-code-md text-xs text-tertiary mb-1">{rank2.title}</p>
                    <p className="font-code-md text-xs text-[#c0c0c0] font-bold">
                      {rank2.points.toLocaleString()} XP
                    </p>
                  </div>
                  <div className="w-full h-48 glass-card rounded-t-2xl bg-gradient-to-t from-[#c0c0c0]/15 to-transparent border-t-[#c0c0c0]/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#c0c0c0]/5 to-transparent" />
                  </div>
                </Link>
              )}

              {/* Rank 1 (Gold) */}
              {rank1 && (
                <Link
                  href={`/profile/${encodeURIComponent(rank1.username || rank1.fullName)}`}
                  className="flex flex-col items-center order-1 md:order-2 relative w-full md:w-72 -mt-12 md:mt-0 z-20 group cursor-pointer"
                >
                  <div className="absolute -top-28 flex flex-col items-center z-10">
                    <span
                      className="material-symbols-outlined text-[#ffd700] text-4xl mb-1 drop-shadow-[0_0_15px_rgba(255,215,0,0.9)]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      workspace_premium
                    </span>
                    <div className="relative group-hover:scale-110 transition-transform">
                      {rank1.avatar ? (
                        <img
                          className="w-24 h-24 rounded-full border-4 border-[#ffd700] object-cover shadow-[0_0_35px_rgba(255,215,0,0.5)]"
                          alt={rank1.username}
                          src={rank1.avatar}
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full border-4 border-[#ffd700] bg-surface-bright flex items-center justify-center font-bold text-3xl text-white shadow-[0_0_35px_rgba(255,215,0,0.5)]">
                          {(rank1.username || 'A').charAt(0)}
                        </div>
                      )}
                      <div className="absolute -bottom-3.5 left-1/2 transform -translate-x-1/2 bg-[#ffd700] text-black w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-base shadow-lg border-2 border-background">
                        1
                      </div>
                    </div>
                    <h3 className="font-headline-md text-lg font-extrabold text-[#ffd700] mt-4 text-center group-hover:underline">
                      {rank1.fullName || rank1.username}
                    </h3>
                    <p className="font-code-md text-xs text-tertiary mb-1">{rank1.title}</p>
                    <p className="font-code-md text-sm text-[#ffd700] font-extrabold">
                      {rank1.points.toLocaleString()} XP
                    </p>
                  </div>
                  <div className="w-full h-64 glass-card rounded-t-2xl bg-gradient-to-t from-[#ffd700]/20 to-transparent border-t-[#ffd700]/50 relative overflow-hidden shadow-[0_-10px_30px_rgba(255,215,0,0.15)]">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#ffd700]/10 to-transparent" />
                  </div>
                </Link>
              )}

              {/* Rank 3 (Bronze) */}
              {rank3 && (
                <Link
                  href={`/profile/${encodeURIComponent(rank3.username || rank3.fullName)}`}
                  className="flex flex-col items-center order-3 relative w-full md:w-64 group cursor-pointer"
                >
                  <div className="absolute -top-20 flex flex-col items-center z-10">
                    <div className="relative group-hover:scale-110 transition-transform">
                      {rank3.avatar ? (
                        <img
                          className="w-20 h-20 rounded-full border-4 border-[#cd7f32] object-cover shadow-[0_0_25px_rgba(205,127,50,0.4)]"
                          alt={rank3.username}
                          src={rank3.avatar}
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full border-4 border-[#cd7f32] bg-surface-bright flex items-center justify-center font-bold text-2xl text-white shadow-[0_0_25px_rgba(205,127,50,0.4)]">
                          {(rank3.username || 'A').charAt(0)}
                        </div>
                      )}
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#cd7f32] text-black w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm shadow-lg border-2 border-background">
                        3
                      </div>
                    </div>
                    <h3 className="font-headline-md text-base font-bold text-on-surface mt-4 text-center group-hover:text-primary transition-colors">
                      {rank3.fullName || rank3.username}
                    </h3>
                    <p className="font-code-md text-xs text-tertiary mb-1">{rank3.title}</p>
                    <p className="font-code-md text-xs text-[#cd7f32] font-bold">
                      {rank3.points.toLocaleString()} XP
                    </p>
                  </div>
                  <div className="w-full h-40 glass-card rounded-t-2xl bg-gradient-to-t from-[#cd7f32]/15 to-transparent border-t-[#cd7f32]/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#cd7f32]/5 to-transparent" />
                  </div>
                </Link>
              )}
            </section>

            {/* Rankings Table */}
            <section className="glass-panel rounded-2xl p-2 md:p-6 overflow-hidden border border-white/10 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 font-code-md text-xs text-on-surface-variant uppercase tracking-wider">
                      <th className="p-4 w-16 text-center">Peringkat</th>
                      <th className="p-4">Astronomer</th>
                      <th className="p-4 hidden sm:table-cell">Gelar Kosmik</th>
                      <th className="p-4 text-right">XP Poin</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-sm text-on-surface">
                    {visibleTable.map((user) => (
                      <tr
                        key={user.id || user.rank}
                        className={`border-b border-white/5 transition-colors group ${
                          user.isCurrentUser
                            ? 'border-l-4 border-l-primary bg-primary-container/40 relative font-bold'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <td
                          className={`p-4 text-center font-code-md font-bold ${
                            user.isCurrentUser ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'
                          }`}
                        >
                          {user.rank}
                        </td>
                        <td className="p-4">
                          <Link
                            href={`/profile/${encodeURIComponent(user.username || user.fullName)}`}
                            className="flex items-center gap-4 group/user cursor-pointer"
                          >
                            {user.avatar ? (
                              <img
                                className={`w-10 h-10 rounded-full object-cover border transition-transform group-hover/user:scale-110 ${
                                  user.isCurrentUser
                                    ? 'border-2 border-primary shadow-[0_0_10px_rgba(193,196,230,0.4)]'
                                    : 'border-white/20'
                                }`}
                                alt={user.username}
                                src={user.avatar}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center font-bold text-on-surface border border-white/20 transition-transform group-hover/user:scale-110">
                                {(user.username || user.fullName || 'A').charAt(0)}
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="font-bold text-white group-hover/user:text-primary transition-colors flex items-center gap-1.5">
                                {user.fullName || user.username}
                                {user.isCurrentUser && (
                                  <span className="px-2 py-0.2 rounded-full bg-secondary-container text-secondary text-[10px] font-bold">
                                    Anda
                                  </span>
                                )}
                              </span>
                              <span className="font-code-md text-[10px] text-on-surface-variant">
                                @{user.username || 'user'}
                              </span>
                            </div>
                          </Link>
                        </td>
                        <td className={`p-4 hidden sm:table-cell font-code-md text-xs ${user.isCurrentUser ? 'text-primary font-bold' : 'text-tertiary'}`}>
                          {user.title}
                        </td>
                        <td
                          className={`p-4 text-right font-code-md font-bold ${
                            user.isCurrentUser ? 'text-primary text-base' : 'text-secondary-fixed'
                          }`}
                        >
                          {user.points.toLocaleString()} XP
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {tableData.length > 6 && (
                <div className="p-4 text-center border-t border-white/5 mt-2">
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="font-code-md text-xs font-bold text-primary hover:text-primary-fixed-dim transition-colors py-2 px-6 rounded-full border border-primary/30 hover:border-primary/60 bg-transparent hover:bg-primary/10 cursor-pointer"
                  >
                    {showMore ? 'Tampilkan Lebih Sedikit' : 'Muat Lebih Banyak'}
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
