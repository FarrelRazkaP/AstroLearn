'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import BottomNav from '@/components/layout/BottomNav';

export default function AppLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user session exists in localStorage
    const savedUser = localStorage.getItem('astrolearn-user');

    if (!savedUser) {
      setIsAuthenticated(false);
      setCheckingAuth(false);
      router.push('/login');
      return;
    }

    try {
      const parsed = JSON.parse(savedUser);
      if (parsed && (parsed.id || parsed.username || parsed.fullName)) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('astrolearn-user');
        setIsAuthenticated(false);
        router.push('/login');
      }
    } catch (e) {
      localStorage.removeItem('astrolearn-user');
      setIsAuthenticated(false);
      router.push('/login');
    } finally {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex flex-col items-center justify-center text-white gap-3 p-4">
        <span className="material-symbols-outlined text-secondary text-5xl animate-spin">
          progress_activity
        </span>
        <p className="font-code-md text-sm text-on-surface-variant">
          Memeriksa Autentikasi Akun AstroLearn...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via router.push('/login')
  }

  return (
    <div className="font-body-md text-body-md antialiased min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      <TopBar />
      <Sidebar />
      <main className="flex-1 mt-16 md:ml-64 p-4 md:p-margin pb-24 md:pb-margin relative overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
