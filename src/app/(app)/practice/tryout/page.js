'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { osnQuestions } from '@/data/osnQuestions';
import { getUserStats, recordQuizCompletionStreak } from '@/lib/userStats';

export default function TryoutArenaPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1); // Starts at Question 1
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [timeLeft, setTimeLeft] = useState(5025); // 01:23:45 in seconds
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const currentQData = osnQuestions.find((q) => q.id === currentQuestion) || osnQuestions[0];

  const handleSelectAnswer = (optionKey) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionKey });
  };

  const toggleFlag = () => {
    setFlagged({ ...flagged, [currentQuestion]: !flagged[currentQuestion] });
  };

  const handleSubmit = () => {
    const totalAnswered = Object.keys(selectedAnswers).length;
    if (confirm(`Anda telah menjawab ${totalAnswered} dari 40 soal. Yakin ingin mengumpulkan seluruh jawaban Tryout?`)) {
      // Calculate category scores based on user's answers vs correct key
      const categoryStats = {
        Mekanika: { correct: 0, total: 0 },
        Astrofisika: { correct: 0, total: 0 },
        BolaLangit: { correct: 0, total: 0 },
        TataSurya: { correct: 0, total: 0 },
        Instrumen: { correct: 0, total: 0 },
      };

      let totalCorrect = 0;
      let totalIncorrect = 0;

      osnQuestions.forEach((q) => {
        let cat = 'Mekanika';
        if (q.topic.includes('Mekanika')) cat = 'Mekanika';
        else if (q.topic.includes('Astrofisika') || q.topic.includes('Radiasi') || q.topic.includes('Fotometri')) cat = 'Astrofisika';
        else if (q.topic.includes('Astronomi Bola')) cat = 'BolaLangit';
        else if (q.topic.includes('Tata Surya')) cat = 'TataSurya';
        else if (q.topic.includes('Instrumen')) cat = 'Instrumen';

        categoryStats[cat].total += 1;

        const userAns = selectedAnswers[q.id];
        if (userAns) {
          if (userAns === q.correct) {
            categoryStats[cat].correct += 1;
            totalCorrect += 1;
          } else {
            totalIncorrect += 1;
          }
        }
      });

      // Calculate Tryout Points & Medals
      const basePoints = Math.max(0, totalCorrect * 150 - totalIncorrect * 25);
      const accuracyPercent = Math.round((totalCorrect / osnQuestions.length) * 100);

      let medal = 'Peserta'; // 'Gold' | 'Silver' | 'Bronze' | 'Peserta'
      let medalBonus = 0;
      if (accuracyPercent >= 90) {
        medal = 'Gold';
        medalBonus = accuracyPercent === 100 ? 2000 : 1500;
      } else if (accuracyPercent >= 75) {
        medal = 'Silver';
        medalBonus = 1000;
      } else if (accuracyPercent >= 60) {
        medal = 'Bronze';
        medalBonus = 500;
      }

      const totalEarnedTryoutPoints = basePoints + medalBonus;

      const getPercent = (catKey) => {
        const item = categoryStats[catKey];
        if (!item || item.total === 0) return 75;
        return Math.round((item.correct / item.total) * 100);
      };

      // Save Tryout Scores for Result Page
      const scoresData = {
        Mekanika: getPercent('Mekanika'),
        Astrofisika: getPercent('Astrofisika'),
        BolaLangit: getPercent('BolaLangit'),
        TataSurya: getPercent('TataSurya'),
        Instrumen: getPercent('Instrumen'),
        totalCorrect,
        totalIncorrect,
        totalScore: accuracyPercent,
        earnedPoints: totalEarnedTryoutPoints,
        basePoints,
        medalBonus,
        medal,
      };

      // Record quiz completion to calculate streak and AstroPoints
      if (typeof window !== 'undefined') {
        try {
          const streakResult = recordQuizCompletionStreak(totalEarnedTryoutPoints);
          const stats = streakResult.stats || getUserStats();
          stats.lastEarned = totalEarnedTryoutPoints;
          stats.lastBase = basePoints;
          stats.lastMedalBonus = medalBonus;
          stats.lastMedal = medal;
          stats.lastDate = new Date().toISOString();

          localStorage.setItem('astrolearn-user-stats', JSON.stringify(stats));
          window.dispatchEvent(new Event('storage'));
        } catch (e) {
          console.error(e);
        }
      }

      localStorage.setItem('astrolearn-tryout-answers', JSON.stringify(selectedAnswers));
      localStorage.setItem('astrolearn-tryout-scores', JSON.stringify(scoresData));
      router.push('/practice/tryout/result');
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col -m-margin">
      {/* Exam Header */}
      <header className="bg-surface-container/80 backdrop-blur-xl border-b border-white/10 h-16 flex-shrink-0 flex items-center justify-between px-margin shadow-xl z-50">
        <div className="flex items-center gap-md">
          <span
            className="material-symbols-outlined text-primary text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            public
          </span>
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight hidden md:block">
            TRYOUT OSN ASTRONOMI — Tingkat Kabupaten 2024
          </h1>
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight md:hidden text-lg">
            OSK 2024
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-body-md text-body-md text-on-surface-variant">Progress:</span>
            <span className="font-code-md text-code-md text-on-surface bg-surface-container-highest px-3 py-1 rounded-full border border-white/5 font-bold">
              {answeredCount}/40 terjawab
            </span>
          </div>

          <div className="flex items-center gap-2 bg-primary-container/30 border border-primary/30 px-4 py-1.5 rounded-lg relative overflow-hidden">
            <span className="material-symbols-outlined text-primary text-xl relative z-10 animate-pulse">
              timer
            </span>
            <span className="font-code-md text-headline-md text-primary tracking-widest font-bold relative z-10">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row w-full overflow-hidden relative">
        {/* Subtle Starfield Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#c1c4e6 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Left Column: Question Area */}
        <section className="flex-1 flex flex-col p-margin overflow-y-auto relative z-10">
          <div className="max-w-4xl w-full mx-auto flex flex-col gap-lg pb-xl">
            {/* Question Card */}
            <div className="bg-surface-container/60 backdrop-blur-2xl border border-white/10 rounded-xl p-lg shadow-2xl relative">
              {/* Glow Accent Top Line */}
              <div className="absolute -top-[2px] left-lg right-lg h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-[2px]" />

              <div className="flex justify-between items-center mb-md border-b border-white/10 pb-sm">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
                    Soal {currentQData.id}
                  </h2>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary-container text-primary font-code-md text-[11px] mt-1 border border-primary/20">
                    {currentQData.topic}
                  </span>
                </div>

                <button
                  onClick={toggleFlag}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors border ${
                    flagged[currentQuestion]
                      ? 'bg-secondary/20 text-secondary border-secondary/50'
                      : 'text-on-surface-variant hover:bg-white/5 border-transparent'
                  } cursor-pointer`}
                >
                  <span className="material-symbols-outlined text-sm">flag</span>
                  <span className="font-body-md text-sm font-semibold">Tandai Ragu</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="font-body-lg text-body-lg text-on-surface leading-relaxed mb-xl">
                <p>{currentQData.question}</p>
              </div>

              {/* Multiple Choice Options */}
              <div className="flex flex-col gap-3">
                {currentQData.options.map((optText) => {
                  const optKey = optText.charAt(0); // 'A', 'B', 'C', 'D', 'E'
                  const isSelected = selectedAnswers[currentQuestion] === optKey;
                  return (
                    <label
                      key={optKey}
                      onClick={() => handleSelectAnswer(optKey)}
                      className={`flex items-start gap-md p-md rounded-xl border transition-all duration-200 cursor-pointer relative ${
                        isSelected
                          ? 'border-primary bg-primary-container/30 shadow-[0_0_15px_rgba(193,196,230,0.15)]'
                          : 'border-white/10 bg-surface-container-low hover:bg-surface-container hover:border-primary/50'
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'border-primary bg-primary/20' : 'border-outline-variant'
                        }`}
                      >
                        {isSelected && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                      </div>
                      <span
                        className={`font-body-md text-body-md ${
                          isSelected ? 'text-primary font-bold' : 'text-on-surface'
                        }`}
                      >
                        {optText}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Bottom Nav Controls */}
            <div className="flex justify-between items-center mt-md">
              <button
                disabled={currentQuestion === 1}
                onClick={() => setCurrentQuestion((q) => Math.max(1, q - 1))}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/10 text-on-surface hover:bg-white/5 transition-colors disabled:opacity-40 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined">chevron_left</span>
                <span>Prev</span>
              </button>

              <button
                disabled={currentQuestion === 40}
                onClick={() => setCurrentQuestion((q) => Math.min(40, q + 1))}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-surface-bright text-on-surface hover:bg-white/10 border border-white/10 transition-colors cursor-pointer font-semibold"
              >
                <span>Next</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Question Navigation Grid Sidebar */}
        <aside className="w-full lg:w-[360px] bg-surface-container/40 backdrop-blur-xl border-l border-white/10 flex-shrink-0 flex flex-col z-20 justify-between p-md">
          <div>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-md border-b border-white/10 pb-sm">
              Navigasi Soal
            </h3>

            {/* 5-Column Grid for 40 Questions */}
            <div className="grid grid-cols-5 gap-2 max-h-[50vh] overflow-y-auto pr-1">
              {Array.from({ length: 40 }, (_, i) => i + 1).map((qNum) => {
                const isCurrent = currentQuestion === qNum;
                const isAnswered = Boolean(selectedAnswers[qNum]);
                const isFlagged = Boolean(flagged[qNum]);

                let btnClass = 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:border-primary/50';

                if (isCurrent) {
                  btnClass =
                    'bg-primary text-on-primary ring-2 ring-primary ring-offset-2 ring-offset-background font-bold shadow-[0_0_15px_rgba(193,196,230,0.5)] z-10 scale-105';
                } else if (isFlagged) {
                  btnClass = 'bg-secondary/20 text-secondary border border-secondary/50 font-bold';
                } else if (isAnswered) {
                  btnClass = 'bg-primary/20 text-primary border border-primary/30 font-semibold';
                }

                return (
                  <button
                    key={qNum}
                    onClick={() => setCurrentQuestion(qNum)}
                    className={`aspect-square flex items-center justify-center rounded-lg font-code-md text-xs transition-all relative cursor-pointer ${btnClass}`}
                  >
                    <span>{qNum}</span>
                    {isFlagged && !isCurrent && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-secondary" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-col gap-2 font-code-md text-xs text-on-surface-variant border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary/20 border border-primary/30" />
                <span>Terjawab</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-secondary/20 border border-secondary/50 relative">
                  <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-secondary" />
                </div>
                <span>Ragu-ragu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-surface-container border border-outline-variant/30" />
                <span>Belum dijawab</span>
              </div>
            </div>
          </div>

          {/* Submit Exam Button */}
          <button
            onClick={handleSubmit}
            className="w-full mt-6 py-3.5 px-6 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-bold font-headline-md hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(201,191,253,0.3)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">send</span>
            <span>Kumpulkan Jawaban</span>
          </button>
        </aside>
      </main>
    </div>
  );
}
