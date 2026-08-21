'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const DEFAULT_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAvnKwhe4rOXVCXw5tDtyiB5FKfdt6K4hKgDPP5aBhfnbJoVO1vvpa4jOWFT5Q5tFG2iiZ2EOtbdjMLUah106tRrdK6EHcXBFGAWA_P-cP8iO_fRcJW0uJeCoUKMyGsgbnAqq6LvN9xp1pB0q7fzw6CSx9B7lLJ2xrKSuYpbqskeyTO0kM15mmW81OoUWQX2jKVvmM8kujhyU0cJQMWiu_MM82nMz6etm5D03WKq2-Qqw0NVpy-bTme9Q';

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const notifRef = useRef(null);
  const searchModalRef = useRef(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Peringkat Leaderboard Naik! 🏆',
      message: 'Selamat! Peringkat Anda naik di Galactic Leaderboard Global.',
      time: '5 mnt lalu',
      unread: true,
      icon: 'leaderboard',
      color: 'text-amber-400',
      link: '/leaderboard',
    },
    {
      id: 2,
      title: 'Lencana Baru Berhasil Dibuka! 🎖️',
      message: 'Lencana kosmik baru dibuka. Klaim di halaman Achievements.',
      time: '1 jam lalu',
      unread: true,
      icon: 'workspace_premium',
      color: 'text-secondary',
      link: '/achievements',
    },
    {
      id: 3,
      title: 'Lab Analisis Transit Siap! 🔭',
      message: 'Lab Transit Eksoplanet interaktif kini tersedia di Practice Hub.',
      time: 'Kemarin',
      unread: false,
      icon: 'science',
      color: 'text-cyan-400',
      link: '/practice/data-lab',
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('astrolearn-avatar');
    if (saved) setAvatarUrl(saved);

    const handleStorage = () => {
      const updated = localStorage.getItem('astrolearn-avatar');
      if (updated) setAvatarUrl(updated);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifs(false);
      }
      if (searchModalRef.current && !searchModalRef.current.contains(e.target)) {
        setShowSearchModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search User Database
  useEffect(() => {
    if (!showSearchModal) return;

    let isMounted = true;
    setIsSearching(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/user/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (isMounted && data.success) {
          setSearchResults(data.results || []);
        }
      } catch (err) {
        console.error('Search user error:', err);
      } finally {
        if (isMounted) setIsSearching(false);
      }
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery, showSearchModal]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleNotifClick = (link, id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
    setShowNotifs(false);
    if (link) router.push(link);
  };

  const handleSelectUser = (username) => {
    setShowSearchModal(false);
    setSearchQuery('');
    router.push(`/profile/${encodeURIComponent(username)}`);
  };

  const filteredNotifs =
    activeTab === 'unread' ? notifications.filter((n) => n.unread) : notifications;

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin h-16 bg-secondary-container/40 dark:bg-secondary-container/40 backdrop-blur-xl shadow-xl md:pl-72 border-b border-white/10 transition-all">
      <div className="flex items-center gap-sm">
        <span
          className="md:hidden font-display-lg text-display-lg text-primary tracking-tight"
          style={{ fontSize: '24px' }}
        >
          AstroLearn
        </span>
        <span className="hidden md:block font-headline-md text-headline-md text-primary font-bold">
          {pathname.includes('/learn')
            ? 'Learning Hub'
            : pathname.includes('/practice')
            ? 'Practice Hub'
            : pathname.includes('/tools')
            ? 'Tools'
            : pathname.includes('/stats')
            ? 'Stats'
            : pathname.includes('/settings') || pathname.includes('/profile')
            ? 'Profil & Pengaturan'
            : pathname.includes('/achievements')
            ? 'Achievements'
            : pathname.includes('/leaderboard')
            ? 'Galactic Leaderboard'
            : 'Dashboard Utama'}
        </span>
      </div>

      {/* Top Search Button to find other users */}
      <div className="flex items-center gap-md relative" ref={searchModalRef}>
        <button
          onClick={() => setShowSearchModal(!showSearchModal)}
          className="flex items-center gap-2 px-4 py-2 bg-surface-container/60 hover:bg-surface-container border border-white/10 rounded-full text-on-surface-variant hover:text-white transition-all cursor-pointer text-xs font-code-md shadow-md"
        >
          <span className="material-symbols-outlined text-base text-primary">search</span>
          <span className="hidden sm:inline">Cari Profil Astronomer...</span>
        </button>

        {/* User Search Dropdown Modal */}
        {showSearchModal && (
          <div className="absolute top-14 right-0 w-[90vw] sm:w-96 glass-panel rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-primary/30 z-50 animate-fadeIn backdrop-blur-2xl bg-surface-container/95 text-on-surface">
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-lowest/90 rounded-xl border border-white/10 mb-3">
              <span className="material-symbols-outlined text-primary text-xl">search</span>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik nama atau username..."
                className="bg-transparent border-none outline-none text-body-md text-white placeholder:text-on-surface-variant w-full text-xs font-body-md"
              />
            </div>

            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
              {isSearching ? (
                <div className="py-6 text-center text-on-surface-variant text-xs font-code-md flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                  <span>Mencari database...</span>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="py-6 text-center text-on-surface-variant text-xs font-body-md">
                  Tidak ada pengguna ditemukan.
                </div>
              ) : (
                searchResults.map((usr) => (
                  <div
                    key={usr.id}
                    onClick={() => handleSelectUser(usr.username || usr.fullName)}
                    className="p-2.5 rounded-xl bg-surface-container-lowest/60 hover:bg-surface-container border border-white/5 hover:border-primary/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-surface-bright border border-white/20 overflow-hidden shrink-0">
                        <img
                          src={usr.avatarUrl || DEFAULT_AVATAR}
                          alt={usr.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-headline-md text-xs font-bold text-white group-hover:text-primary transition-colors">
                          {usr.fullName}
                        </span>
                        <span className="font-code-md text-[10px] text-on-surface-variant">
                          @{usr.username || 'user'} • Rank #{usr.rank || '-'}
                        </span>
                      </div>
                    </div>

                    <span className="font-code-md text-xs font-bold text-accent_gold">
                      {usr.points || 0} XP
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Notification Bell Button */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-primary dark:text-primary cursor-pointer active:scale-95 duration-200 relative"
            title="Notifikasi"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-error text-on-error font-code-md text-[10px] font-bold flex items-center justify-center border border-background animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown Panel Modal */}
          {showNotifs && (
            <div className="absolute top-14 right-0 w-[90vw] sm:w-96 glass-panel rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-primary/30 z-50 animate-fadeIn backdrop-blur-2xl bg-surface-container/95 text-on-surface">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-md text-sm font-bold text-white">Notifikasi Kosmik</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary font-code-md text-[10px] font-bold border border-primary/30">
                      {unreadCount} Baru
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1 mt-3">
                {filteredNotifs.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleNotifClick(notif.link, notif.id)}
                    className="p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 bg-surface-container-lowest/40 border-white/5 hover:border-white/20"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-surface-container border border-white/10 ${notif.color}`}>
                      <span className="material-symbols-outlined text-lg">{notif.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-headline-md text-xs font-bold text-white">{notif.title}</h4>
                      <p className="font-body-md text-[11px] text-on-surface-variant leading-snug">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode Button */}
        <button
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-primary dark:text-primary cursor-pointer active:scale-95 duration-200"
          title="Mode Gelap"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            dark_mode
          </span>
        </button>

        {/* Avatar Profile Link */}
        <Link
          href="/settings"
          title="Lihat Profil Saya & Pengaturan"
          className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant hover:border-secondary transition-all cursor-pointer active:scale-95 duration-200 block shadow-md hover:shadow-[0_0_15px_rgba(201,191,253,0.4)]"
        >
          <img alt="User profile avatar" className="w-full h-full object-cover" src={avatarUrl || DEFAULT_AVATAR} />
        </Link>
      </div>
    </header>
  );
}
