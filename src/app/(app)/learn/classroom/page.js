'use client';

import { useState } from 'react';
import Link from 'next/link';

const students = [
  {
    id: '1',
    initials: 'AR',
    name: 'Arya Rajasa',
    status: 'On Target',
    statusVariant: 'on-target',
    score: '92.5',
    trend: '+4.0',
    trendDirection: 'up',
  },
  {
    id: '2',
    initials: 'BW',
    name: 'Budi Wibowo',
    status: 'Needs Review',
    statusVariant: 'needs-review',
    score: '68.0',
    trend: '-2.5',
    trendDirection: 'down',
  },
  {
    id: '3',
    initials: 'CN',
    name: 'Citra Ningsih',
    status: 'On Target',
    statusVariant: 'on-target',
    score: '85.0',
    trend: '0.0',
    trendDirection: 'flat',
  },
  {
    id: '4',
    initials: 'DS',
    name: 'Dewi Sartika',
    status: 'High Achiever',
    statusVariant: 'high-achiever',
    score: '98.5',
    trend: '+1.5',
    trendDirection: 'up',
  },
  {
    id: '5',
    initials: 'EH',
    name: 'Eko Hariyanto',
    status: 'On Target',
    statusVariant: 'on-target',
    score: '88.0',
    trend: '+2.0',
    trendDirection: 'up',
  },
  {
    id: '6',
    initials: 'FA',
    name: 'Fiona Amanda',
    status: 'High Achiever',
    statusVariant: 'high-achiever',
    score: '96.0',
    trend: '+3.5',
    trendDirection: 'up',
  },
];

export default function TeacherClassroomPage() {
  const [activeTab, setActiveTab] = useState('siswa');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-lg pb-16">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary-container/40 via-background to-background" />

      {/* Breadcrumb */}
      <nav className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
        <Link href="/learn" className="hover:text-primary transition-colors">Learning Hub</Link>
        <span>›</span>
        <span className="text-primary font-semibold">OSN Kab 2025</span>
      </nav>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-md">
        <div className="flex flex-col gap-xs max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high/60 border border-secondary/20 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">ACTIVE COHORT</span>
          </div>

          <h1 className="font-display-lg text-display-lg text-primary font-bold tracking-tight mt-2">
            OSN Kab 2025
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Intensive preparation program for the National Science Olympiad - Regency level. Focus areas include advanced mechanics, electromagnetism, and observational techniques.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-sm self-start md:self-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-lg text-on-surface hover:bg-white/5 transition-colors font-body-md cursor-pointer border border-white/10">
            <span className="material-symbols-outlined text-xl">more_horiz</span>
            <span>Options</span>
          </button>

          <button className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-on-secondary hover:bg-secondary-fixed transition-colors rounded-lg font-body-md font-semibold cursor-pointer shadow-[0_0_20px_rgba(201,191,253,0.2)]">
            <span className="material-symbols-outlined text-xl">add</span>
            <span>Invite Student</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-md border-b border-white/10 pb-1">
        <button
          onClick={() => setActiveTab('ringkasan')}
          className={`py-3 px-2 font-body-md transition-colors cursor-pointer ${
            activeTab === 'ringkasan'
              ? 'text-secondary border-b-2 border-secondary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Ringkasan
        </button>

        <button
          onClick={() => setActiveTab('tugas')}
          className={`py-3 px-2 font-body-md flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'tugas'
              ? 'text-secondary border-b-2 border-secondary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>Tugas</span>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-xs font-code-md text-on-surface-variant">
            12
          </span>
        </button>

        <button
          onClick={() => setActiveTab('siswa')}
          className={`py-3 px-2 font-body-md transition-colors cursor-pointer ${
            activeTab === 'siswa'
              ? 'text-secondary border-b-2 border-secondary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Siswa
        </button>

        <button
          onClick={() => setActiveTab('analisis')}
          className={`py-3 px-2 font-body-md transition-colors cursor-pointer ${
            activeTab === 'analisis'
              ? 'text-secondary border-b-2 border-secondary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Analisis
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Card 1: Total Students */}
        <div className="glass-card rounded-xl p-lg flex flex-col justify-between">
          <div className="flex justify-between items-start mb-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              TOTAL STUDENTS
            </span>
            <span className="material-symbols-outlined text-on-surface-variant text-2xl">group</span>
          </div>
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-display-lg text-display-lg font-bold text-on-surface">32</span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">+3 this week</span>
            </div>
          </div>
        </div>

        {/* Card 2: Avg Tryout Score */}
        <div className="glass-card rounded-xl p-lg flex flex-col justify-between">
          <div className="flex justify-between items-start mb-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              AVG TRYOUT SCORE
            </span>
            <span className="material-symbols-outlined text-on-surface-variant text-2xl">trending_up</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display-lg text-display-lg font-bold text-on-surface">78.4</span>
              <span className="font-code-md text-code-md text-on-surface-variant">/ 100</span>
            </div>
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full progress-gradient rounded-full" style={{ width: '78.4%' }} />
            </div>
          </div>
        </div>

        {/* Card 3: Next Milestone */}
        <div className="glass-card rounded-xl p-lg flex flex-col justify-between">
          <div className="flex justify-between items-start mb-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              NEXT MILESTONE
            </span>
            <span className="material-symbols-outlined text-on-surface-variant text-2xl">schedule</span>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-1">Tryout #4</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-2">Astrophysics & Relativity</p>
            <div className="flex items-center gap-2 text-secondary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>In 5 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Roster & Performance Section */}
      <div className="glass-panel rounded-xl p-lg flex flex-col gap-md">
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-2xl">space_dashboard</span>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
              Roster & Performance
            </h2>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 px-4 py-2 bg-surface-container/60 rounded-lg border border-white/10 w-full sm:w-64">
              <span className="material-symbols-outlined text-on-surface-variant text-lg">search</span>
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-body-md text-on-surface placeholder:text-on-surface-variant w-full"
              />
            </div>

            <button className="p-2 rounded-lg glass-card hover:bg-white/5 text-on-surface-variant transition-colors border border-white/10 cursor-pointer">
              <span className="material-symbols-outlined text-xl">filter_list</span>
            </button>
          </div>
        </div>

        {/* Student Roster Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <th className="py-4 px-4">STUDENT NAME</th>
                <th className="py-4 px-4">STATUS</th>
                <th className="py-4 px-4 text-center">TRYOUT #3</th>
                <th className="py-4 px-4 text-right">TREND</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center font-code-md text-code-md font-bold text-primary">
                        {student.initials}
                      </div>
                      <span className="font-body-md text-body-md font-medium text-on-surface group-hover:text-primary transition-colors">
                        {student.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-code-md text-xs border ${
                        student.statusVariant === 'high-achiever'
                          ? 'bg-secondary-container/40 text-secondary border-secondary/30'
                          : student.statusVariant === 'needs-review'
                          ? 'bg-error-container/40 text-error border-error/30'
                          : 'bg-surface-container-high text-on-surface-variant border-white/10'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center font-code-md text-body-md font-semibold text-on-surface">
                    {student.score}
                  </td>

                  <td className="py-4 px-4 text-right font-code-md text-body-md">
                    <span
                      className={`inline-flex items-center gap-1 ${
                        student.trendDirection === 'up'
                          ? 'text-accent_green'
                          : student.trendDirection === 'down'
                          ? 'text-error'
                          : 'text-on-surface-variant'
                      }`}
                    >
                      {student.trend}
                      <span className="material-symbols-outlined text-sm">
                        {student.trendDirection === 'up'
                          ? 'north_east'
                          : student.trendDirection === 'down'
                          ? 'south_east'
                          : 'east'}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
