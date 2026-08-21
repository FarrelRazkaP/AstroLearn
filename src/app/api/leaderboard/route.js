import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const timeframe = searchParams.get('timeframe') || 'selamanya';
    const currentUserId = searchParams.get('userId') || '';

    // Fetch ONLY real registered users from Database
    const dbUsers = getUsers();

    // Transform database users into leaderboard format
    const realUsers = dbUsers.map((u) => {
      let pts = u.points || 1250;
      if (timeframe === 'mingguan') pts = Math.round(pts * 0.3);
      if (timeframe === 'bulanan') pts = Math.round(pts * 0.7);

      let title = 'Pemula Kosmik';
      if (pts > 40000) title = 'Galactic Master';
      else if (pts > 25000) title = 'Supernova Explorer';
      else if (pts > 10000) title = 'Comet Chaser';
      else if (pts > 5000) title = 'Asteroid Miner';
      else if (pts > 1000) title = 'Penjelajah Awal';

      return {
        id: u.id,
        fullName: u.fullName || u.username,
        username: u.username || u.fullName,
        title,
        points: pts,
        avatarUrl: u.avatarUrl || null,
        isRealUser: true,
      };
    });

    // Sort all real users descending by points
    const sorted = realUsers.sort((a, b) => b.points - a.points);

    // Assign global ranks strictly based on real database users
    const ranked = sorted.map((p, idx) => ({
      ...p,
      rank: idx + 1,
      isCurrentUser: p.id === currentUserId || (currentUserId && p.id.includes(currentUserId)),
    }));

    const podium = ranked.slice(0, 3).map((p) => {
      let color = '#ffd700';
      let glowClass = 'podium-glow-gold';
      let badgeBg = 'bg-[#ffd700]';
      let borderCol = 'border-[#ffd700]';
      let podiumHeight = 'h-64';

      if (p.rank === 2) {
        color = '#c0c0c0';
        glowClass = 'podium-glow-silver';
        badgeBg = 'bg-[#c0c0c0]';
        borderCol = 'border-[#c0c0c0]';
        podiumHeight = 'h-48';
      } else if (p.rank === 3) {
        color = '#cd7f32';
        glowClass = 'podium-glow-bronze';
        badgeBg = 'bg-[#cd7f32]';
        borderCol = 'border-[#cd7f32]';
        podiumHeight = 'h-40';
      }

      return {
        ...p,
        color,
        glowClass,
        badgeBg,
        borderCol,
        podiumHeight,
        avatar: p.avatarUrl,
      };
    });

    const table = ranked.slice(3).map((p) => ({
      ...p,
      avatar: p.avatarUrl,
    }));

    return NextResponse.json({
      success: true,
      timeframe,
      totalPlayers: ranked.length,
      podium,
      table,
      allRanked: ranked,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Gagal memuat leaderboard' },
      { status: 500 }
    );
  }
}
