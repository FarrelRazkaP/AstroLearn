// AstroLearn Universal User Stats, Dynamic Badge System & Quiz Streak Cooldown Manager

export const BADGE_CATALOG = [
  {
    id: 'penjelajah_awal',
    name: 'Penjelajah Awal',
    description: 'Menyelesaikan kuis atau latihan astronomi pertama Anda (+50 XP).',
    icon: 'public',
    rarity: 'Common',
    color: '#ffd700',
    borderColor: 'border-[#ffd700]',
    bgColor: 'bg-amber-500/20',
    checkUnlocked: (stats) => (stats.points || 0) >= 50 || (stats.completedQuizzes || 0) >= 1,
  },
  {
    id: 'pemburu_nebula',
    name: 'Pemburu Nebula',
    description: 'Mengumpulkan 500 Poin XP dari kuis & simulasi lab.',
    icon: 'auto_awesome',
    rarity: 'Rare',
    color: '#00FFFF',
    borderColor: 'border-[#00FFFF]',
    bgColor: 'bg-cyan-500/20',
    checkUnlocked: (stats) => (stats.points || 0) >= 500,
  },
  {
    id: 'kepler_master',
    name: 'Kepler Master',
    description: 'Mengumpulkan 1,000 Poin XP dari modul mekanika orbit.',
    icon: 'stars',
    rarity: 'Epic',
    color: '#ffd700',
    borderColor: 'border-[#ffd700]',
    bgColor: 'bg-amber-400/20',
    checkUnlocked: (stats) => (stats.points || 0) >= 1000,
  },
  {
    id: 'lunar_watcher',
    name: 'Lunar Watcher',
    description: 'Mempertahankan streak kuis harian selama 3 hari berturut-turut.',
    icon: 'bedtime',
    rarity: 'Rare',
    color: '#c0c0c0',
    borderColor: 'border-[#c0c0c0]',
    bgColor: 'bg-slate-400/20',
    checkUnlocked: (stats) => (stats.streak || 0) >= 3,
  },
  {
    id: 'cendekiawan_galaksi',
    name: 'Cendekiawan Galaksi',
    description: 'Mencapai 2,500 Poin XP di akademi astronomi.',
    icon: 'school',
    rarity: 'Legendary',
    color: '#c9bffd',
    borderColor: 'border-[#c9bffd]',
    bgColor: 'bg-purple-500/20',
    checkUnlocked: (stats) => (stats.points || 0) >= 2500,
  },
  {
    id: 'master_astrofisika',
    name: 'Master Astrofisika',
    description: 'Mencapai 5,000 Poin XP dan menjadi master kosmik teratas.',
    icon: 'flare',
    rarity: 'Mythic',
    color: '#ff4e50',
    borderColor: 'border-[#ff4e50]',
    bgColor: 'bg-red-500/20',
    checkUnlocked: (stats) => (stats.points || 0) >= 5000,
  },
];

export function getUserStats() {
  if (typeof window === 'undefined') {
    return { points: 0, streak: 0, lastStreakDate: '', level: 1, badges: [], completedQuizzes: 0 };
  }

  try {
    const raw = localStorage.getItem('astrolearn-user-stats');
    if (raw) {
      const parsed = JSON.parse(raw);
      return evaluateAndCheckBadges(checkAndSanitizeStreak(parsed));
    }
  } catch (e) {
    console.error('Error reading user stats:', e);
  }

  const defaultStats = {
    points: 0,
    streak: 0,
    lastStreakDate: '',
    level: 1,
    badges: [],
    completedQuizzes: 0,
  };
  saveUserStats(defaultStats);
  return defaultStats;
}

export function saveUserStats(stats) {
  if (typeof window === 'undefined') return;
  try {
    // Auto-calculate level: 1 level per 500 points
    stats.level = Math.floor((stats.points || 0) / 500) + 1;
    evaluateAndCheckBadges(stats);

    localStorage.setItem('astrolearn-user-stats', JSON.stringify(stats));
    localStorage.setItem('astrolearn_streak', String(stats.streak));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.error('Error saving user stats:', e);
  }
}

// Evaluate unlocked badges dynamically based on current user stats & achievements
function evaluateAndCheckBadges(stats) {
  if (!stats) return stats;
  const currentBadges = new Set(stats.badges || []);

  BADGE_CATALOG.forEach((badge) => {
    if (badge.checkUnlocked(stats)) {
      currentBadges.add(badge.name);
    }
  });

  stats.badges = Array.from(currentBadges);
  return stats;
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

// Verify daily streak against calendar dates
function checkAndSanitizeStreak(stats) {
  const today = getTodayStr();
  const yesterday = getYesterdayStr();
  const lastDate = stats.lastStreakDate || '';

  // If last quiz date is older than yesterday, streak resets to 0 until next quiz completion
  if (lastDate && lastDate !== today && lastDate !== yesterday) {
    stats.streak = 0;
  }

  return stats;
}

/**
 * AUTOMATIC STREAK SYSTEM & BADGE UNLOCK (Triggered strictly when finishing a quiz/tryout/drill)
 * Rules:
 * 1. Streak can ONLY be gained by completing a quiz/soal.
 * 2. 1-Day Cooldown: Max +1 Streak per calendar day.
 * 3. Answering more quizzes on the same day adds points, but streak stays cooled down.
 */
export function recordQuizCompletionStreak(pointsEarned = 0) {
  const stats = getUserStats();
  const today = getTodayStr();
  const yesterday = getYesterdayStr();
  const lastDate = stats.lastStreakDate || '';

  stats.completedQuizzes = (stats.completedQuizzes || 0) + 1;

  if (lastDate === today) {
    // Already gained streak from a quiz today -> Cooldown active!
    stats.points = (stats.points || 0) + pointsEarned;
    saveUserStats(stats);
    return {
      streakGained: false,
      streak: stats.streak,
      points: stats.points,
      message: `Poin Ditambahkan (+${pointsEarned} XP)! Streak hari ini sudah aktif (Cooldown 1 hari).`,
      cooldown: getRemainingCooldownTime(),
      stats,
    };
  }

  // First quiz answered today!
  if (lastDate === yesterday) {
    stats.streak = (stats.streak || 0) + 1;
  } else {
    stats.streak = 1;
  }

  stats.lastStreakDate = today;
  stats.points = (stats.points || 0) + pointsEarned;

  saveUserStats(stats);

  return {
    streakGained: true,
    streak: stats.streak,
    points: stats.points,
    message: `🎉 Kuis Selesai & Streak Bertambah! Streak Anda sekarang ${stats.streak} Hari (+${pointsEarned} XP).`,
    cooldown: getRemainingCooldownTime(),
    stats,
  };
}

// Calculate remaining cooldown time until midnight (next calendar day)
export function getRemainingCooldownTime() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);

  const diffMs = midnight - now;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const format = (n) => String(n).padStart(2, '0');

  return {
    hours,
    minutes,
    seconds,
    formatted: `${format(hours)}:${format(minutes)}:${format(seconds)}`,
  };
}

// Get status of daily streak
export function getStreakStatus() {
  const stats = getUserStats();
  const today = getTodayStr();
  const isCompletedToday = stats.lastStreakDate === today;

  return {
    streak: stats.streak || 0,
    isCompletedToday,
    cooldown: isCompletedToday ? getRemainingCooldownTime() : { formatted: 'Ready', isReady: true },
    points: stats.points || 0,
    level: stats.level || 1,
    badges: stats.badges || [],
  };
}

// Add AstroPoints for activity
export function addAstroPoints(pointsToAdd) {
  const stats = getUserStats();
  stats.points = (stats.points || 0) + pointsToAdd;
  saveUserStats(stats);
  return stats;
}
