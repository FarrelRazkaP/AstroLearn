'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: 'home', label: 'Home', href: '/dashboard' },
  { icon: 'menu_book', label: 'Learn', href: '/learn' },
  { icon: 'leaderboard', label: 'Rank', href: '/leaderboard' },
  { icon: 'construction', label: 'Tools', href: '/tools' },
  { icon: 'person', label: 'Profile', href: '/settings' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface-container-lowest/80 dark:bg-surface-container-lowest/80 backdrop-blur-lg rounded-t-xl border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              isActive
                ? 'flex flex-col items-center justify-center text-primary bg-primary-container/20 rounded-full px-4 py-1 active:bg-white/10 transition-transform duration-150'
                : 'flex flex-col items-center justify-center text-on-surface-variant active:bg-white/10 transition-transform duration-150 p-2'
            }
          >
            <span
              className="material-symbols-outlined"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="font-label-sm text-label-sm">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
