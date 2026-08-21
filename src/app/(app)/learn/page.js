'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const BASE_TOPICS = [
  {
    id: 'mekanika',
    title: 'Mekanika Benda Langit',
    icon: 'auto_awesome',
    modules: 12,
    href: '/learn/mekanika/kepler',
  },
  {
    id: 'astrofisika',
    title: 'Astrofisika Stellar',
    icon: 'star',
    modules: 8,
    href: '/learn/astrofisika/hr-diagram',
  },
  {
    id: 'tata-surya',
    title: 'Sistem Tata Surya',
    icon: 'public',
    modules: 10,
    href: '/learn/tata-surya/overview',
  },
  {
    id: 'astronomi-bola',
    title: 'Astronomi Bola',
    icon: 'language',
    modules: 6,
    href: '/learn/astronomi-bola/koordinat',
  },
  {
    id: 'instrumen',
    title: 'Instrumen & Observasi',
    icon: 'camera_alt',
    modules: 5,
    href: '/learn/observasi/teleskop',
  },
];

export default function LearningHubPage() {
  const [topicProgress, setTopicProgress] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('astrolearn-topic-progress');
      if (saved) {
        setTopicProgress(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="flex flex-col gap-lg max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-display-lg text-display-lg text-primary mb-2">Learning Hub</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Pilih topik astronomi, ikuti program kelas, atau pelajari modul sains terstruktur.
        </p>
      </div>

      {/* Featured Classroom Banner */}
      <Link href="/learn/classroom" className="glass-panel rounded-xl p-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-md border border-secondary/30 shadow-[0_0_30px_rgba(201,191,253,0.15)] group cursor-pointer hover:border-secondary transition-all">
        <div className="flex flex-col gap-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">TEACHER COHORT</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary group-hover:text-white transition-colors">
            OSN Kab 2025 — Class Roster & Analytics
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Program persiapan intensif Olimpiade Sains Nasional tingkat Kabupaten. Pantau roster 32 siswa, skor tryout, dan matriks performa.
          </p>
        </div>

        <div className="flex items-center gap-2 px-5 py-3 bg-secondary text-on-secondary rounded-lg font-bold font-label-sm text-label-sm uppercase tracking-widest group-hover:bg-secondary-fixed transition-all self-start md:self-auto shrink-0">
          <span>Buka Kelas</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </div>
      </Link>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {BASE_TOPICS.map((topic) => {
          const progress = topicProgress[topic.id] || 0;
          return (
            <Link
              key={topic.id}
              href={topic.href}
              className="glass-card rounded-xl p-lg flex flex-col justify-between min-h-[220px] hover:border-secondary transition-all group cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-md">
                  <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">{topic.icon}</span>
                  </div>
                  <span className="px-3 py-1 bg-surface-container-high rounded-full font-code-md text-xs text-on-surface-variant border border-white/5">
                    {topic.modules} Modul
                  </span>
                </div>

                <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-xs">{topic.title}</h3>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Progres</span>
                  <span className="font-code-md text-code-md text-secondary">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full progress-gradient rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
