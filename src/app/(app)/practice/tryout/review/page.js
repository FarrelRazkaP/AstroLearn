'use client';

import { useState } from 'react';
import Link from 'next/link';
import Math from '@/components/ui/Math';
import TopicVisualization from '@/components/effects/TopicVisualizations';
import { osnQuestions } from '@/data/osnQuestions';

export default function SolutionReviewPage() {
  const [currentQId, setCurrentQId] = useState(1);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');

  const question = osnQuestions.find((q) => q.id === currentQId) || osnQuestions[0];

  const handleNext = () => {
    setCurrentQId((prev) => (prev < 40 ? prev + 1 : 1));
  };

  const handlePrev = () => {
    setCurrentQId((prev) => (prev > 1 ? prev - 1 : 40));
  };

  const isQuestion1 = question.id === 3 || question.id === 1;

  return (
    <div className="flex flex-col gap-lg max-w-7xl mx-auto">
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-display-lg text-display-lg text-white font-bold tracking-tight">
              Soal {question.id} Review
            </h1>
            <span className="px-3 py-1 rounded-full bg-primary-container text-primary font-code-md text-xs border border-primary/20">
              {question.topic}
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Pembahasan mendalam dan langkah penyelesaian matematis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2.5 rounded-xl border border-white/10 text-on-surface hover:bg-white/5 transition-colors font-body-md text-sm font-semibold cursor-pointer"
          >
            Kembali ke Dashboard
          </Link>
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-headline-md text-body-md font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(201,191,253,0.3)] flex items-center gap-2 cursor-pointer"
          >
            <span>Review Soal Selanjutnya</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* 2-Column Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Sidebar Filter / Navigation */}
        <aside className="lg:col-span-3 flex flex-col gap-md">
          {/* Solution Review Header Box */}
          <div className="glass-panel rounded-xl p-md border border-white/10 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-2xl text-secondary">assignment</span>
              <div>
                <h3 className="font-headline-md text-body-lg font-bold">Solution Review</h3>
                <p className="font-code-md text-xs text-on-surface-variant">Tryout #42: OSN Astronomi</p>
              </div>
            </div>

            <button
              onClick={() => alert('Mengunduh Berkas Pembahasan PDF...')}
              className="w-full py-2 px-4 rounded-xl border border-white/20 text-white font-code-md text-xs font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Download PDF</span>
            </button>
          </div>

          {/* Question List & Categories */}
          <div className="glass-card rounded-xl p-sm border border-white/10 flex flex-col gap-1">
            <button
              onClick={() => setActiveCategoryFilter('ALL')}
              className={`w-full p-2.5 rounded-lg flex items-center justify-between font-body-md text-sm font-semibold transition-all cursor-pointer ${
                activeCategoryFilter === 'ALL'
                  ? 'bg-secondary-container text-on-secondary-container shadow-md'
                  : 'text-on-surface-variant hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">format_list_bulleted</span>
                <span>Question List (1-40)</span>
              </div>
              <span className="font-code-md text-xs">40</span>
            </button>

            {[
              { id: 'MEK', label: 'Mekanika Orbit', symbol: 'functions', count: 8 },
              { id: 'AST', label: 'Astrofisika', symbol: 'wb_sunny', count: 14 },
              { id: 'BOL', label: 'Astronomi Bola', symbol: 'auto_awesome', count: 7 },
              { id: 'TAT', label: 'Tata Surya', symbol: 'public', count: 6 },
              { id: 'INS', label: 'Instrumen', symbol: 'telescope', count: 5 },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`w-full p-2.5 rounded-lg flex items-center justify-between font-body-md text-sm transition-all cursor-pointer ${
                  activeCategoryFilter === cat.id
                    ? 'bg-secondary-container text-on-secondary-container font-semibold'
                    : 'text-on-surface-variant hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">{cat.symbol}</span>
                  <span>{cat.label}</span>
                </div>
                <span className="font-code-md text-xs">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* 40 Question Quick Selection Grid */}
          <div className="glass-panel rounded-xl p-md border border-white/10">
            <h4 className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider mb-3 font-semibold">
              Pilih Nomor Soal:
            </h4>
            <div className="grid grid-cols-5 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {Array.from({ length: 40 }, (_, i) => i + 1).map((qNum) => (
                <button
                  key={qNum}
                  onClick={() => setCurrentQId(qNum)}
                  className={`aspect-square rounded-lg font-code-md text-xs transition-all cursor-pointer ${
                    currentQId === qNum
                      ? 'bg-secondary text-on-secondary font-bold ring-2 ring-secondary shadow-md'
                      : 'bg-surface-container border border-white/5 text-on-surface-variant hover:text-white hover:border-secondary/50'
                  }`}
                >
                  {qNum}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Main Column: Question, Answer Comparison & Explanation */}
        <div className="lg:col-span-5 flex flex-col gap-md">
          {/* Pertanyaan Card */}
          <div className="glass-panel rounded-xl p-lg border border-white/10 shadow-xl flex flex-col gap-3">
            <h3 className="font-headline-md text-headline-md font-bold text-white border-b border-white/10 pb-2">
              Pertanyaan
            </h3>
            <div className="font-body-lg text-body-lg text-on-surface leading-relaxed">
              <p>{question.question}</p>
            </div>
          </div>

          {/* Jawaban Comparison (2 Cards Grid) */}
          <div className="grid grid-cols-2 gap-md">
            {/* JAWABAN ANDA Card */}
            <div className="glass-card rounded-xl p-md border border-error/50 bg-error-container/20 flex flex-col gap-2 relative overflow-hidden">
              <div className="flex justify-between items-center text-error">
                <span className="font-code-md text-xs font-bold uppercase tracking-wider">
                  JAWABAN ANDA
                </span>
                <span className="material-symbols-outlined text-lg">close</span>
              </div>
              <p className="font-display-lg text-headline-lg font-bold text-white">
                {question.id === 3 ? '4 AU' : 'C'}
              </p>
            </div>

            {/* JAWABAN BENAR Card */}
            <div className="glass-card rounded-xl p-md border border-accent_green/50 bg-accent_green/10 flex flex-col gap-2 relative overflow-hidden">
              <div className="flex justify-between items-center text-accent_green">
                <span className="font-code-md text-xs font-bold uppercase tracking-wider">
                  JAWABAN BENAR
                </span>
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </div>
              <p className="font-display-lg text-headline-lg font-bold text-white">
                {question.id === 3 ? '6 AU' : `${question.correct}`}
              </p>
            </div>
          </div>

          {/* Pembahasan Card */}
          <div className="glass-panel rounded-xl p-lg border border-white/10 shadow-2xl flex flex-col gap-md">
            <h3 className="font-headline-md text-headline-md font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="material-symbols-outlined text-secondary text-2xl">school</span>
              <span>Pembahasan</span>
            </h3>

            {isQuestion1 ? (
              <div className="flex flex-col gap-4 font-body-md text-on-surface">
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-surface-container-high text-white font-code-md text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10">
                    1
                  </span>
                  <div>
                    <p className="mb-1">
                      Definisikan hubungan antara perihelion (<Math math="r_p" />) dan sumbu semi-mayor (<Math math="a" />):
                    </p>
                    <div className="bg-surface-container-lowest/80 p-3 rounded-lg border border-white/5 font-code-md text-sm">
                      <Math math="r_p = a(1 - e)" block />
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-surface-container-high text-white font-code-md text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10">
                    2
                  </span>
                  <div>
                    <p className="mb-1">Hitung nilai <Math math="a" />:</p>
                    <div className="bg-surface-container-lowest/80 p-3 rounded-lg border border-white/5 font-code-md text-sm">
                      <Math math="2 = a(1 - 0.5) \rightarrow 2 = 0.5a \rightarrow a = 4\text{ AU}" block />
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-surface-container-high text-white font-code-md text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10">
                    3
                  </span>
                  <div>
                    <p className="mb-1">
                      Definisikan hubungan antara aphelion (<Math math="r_a" />) dan sumbu semi-mayor (<Math math="a" />):
                    </p>
                    <div className="bg-surface-container-lowest/80 p-3 rounded-lg border border-white/5 font-code-md text-sm">
                      <Math math="r_a = a(1 + e)" block />
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-surface-container-high text-white font-code-md text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10">
                    4
                  </span>
                  <div>
                    <p className="mb-1">Hitung nilai <Math math="r_a" />:</p>
                    <div className="bg-surface-container-lowest/80 p-3 rounded-lg border border-white/5 font-code-md text-sm">
                      <Math math="r_a = 4(1 + 0.5) \rightarrow r_a = 4(1.5) = 6\text{ AU}" block />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 font-body-md text-on-surface">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-surface-container-high text-white font-code-md text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10">
                    1
                  </span>
                  <div>
                    <p className="mb-1 font-semibold">Analisis Konsep:</p>
                    <p className="text-on-surface-variant text-sm">
                      Soal ini menguji pemahaman mengenai <strong className="text-white">{question.topic}</strong>. Kunci jawaban yang benar adalah <strong className="text-accent_green">Opsi {question.correct}</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-surface-container-high text-white font-code-md text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10">
                    2
                  </span>
                  <div>
                    <p className="mb-1 font-semibold">Penurunan Kunci Jawaban:</p>
                    <div className="bg-surface-container-lowest/80 p-3 rounded-lg border border-white/5 font-code-md text-sm">
                      <p className="text-accent_cyan font-semibold">{question.options.find((o) => o.startsWith(question.correct))}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Topic Visualization Card */}
        <div className="lg:col-span-4 flex flex-col gap-md">
          <div className="glass-panel rounded-2xl p-md border border-white/10 shadow-2xl flex flex-col gap-3 h-full">
            <h3 className="font-headline-md text-headline-md font-bold text-white border-b border-white/10 pb-2">
              Visualisasi Materi
            </h3>

            <TopicVisualization topic={question.topic} questionId={question.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
