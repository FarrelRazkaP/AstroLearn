'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { icon: 'school', label: 'Learning Hub', href: '/learn' },
  { icon: 'fitness_center', label: 'Practice Hub', href: '/practice' },
  { icon: 'military_tech', label: 'Achievements', href: '/achievements' },
  { icon: 'architecture', label: 'Tools', href: '/tools' },
  { icon: 'leaderboard', label: 'Leaderboard', href: '/leaderboard' },
  { icon: 'insights', label: 'Stats', href: '/stats' },
  { icon: 'settings', label: 'Settings', href: '/settings' },
];

const roleLabels = {
  beginner: 'AMATEUR ASTRONOMER',
  competitor: 'COMPETITION TRACK',
  student: 'ADVANCED STUDENT',
  teacher: 'EDUCATOR',
};

export default function Sidebar() {
  const pathname = usePathname();
  const [roleLabel, setRoleLabel] = useState('AMATEUR ASTRONOMER');

  useEffect(() => {
    const savedRole = localStorage.getItem('astrolearn-role');
    if (savedRole && roleLabels[savedRole]) {
      setRoleLabel(roleLabels[savedRole]);
    }
  }, []);

  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 p-sm bg-surface-container/60 dark:bg-surface-container/60 backdrop-blur-2xl border-r border-white/10 shadow-2xl transition-all duration-300 ease-in-out z-40">
      <div className="px-md py-lg mb-4">
        <div className="flex items-center gap-sm mb-xs">
          <span className="material-symbols-outlined text-primary text-3xl">rocket_launch</span>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">AstroLearn</h1>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{roleLabel}</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive
                  ? 'flex items-center gap-md px-4 py-3 bg-secondary-container text-on-secondary-container rounded-xl shadow-[0_0_15px_rgba(201,191,253,0.15)] transition-all duration-300 ease-in-out cursor-pointer'
                  : 'flex items-center gap-md px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-white/5 rounded-xl transition-all duration-300 ease-in-out cursor-pointer'
              }
            >
              <span
                className="material-symbols-outlined"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className={isActive ? 'font-body-md text-body-md font-semibold' : 'font-body-md text-body-md'}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
