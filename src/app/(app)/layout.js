'use client';

import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import BottomNav from '@/components/layout/BottomNav';

export default function AppLayout({ children }) {
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
