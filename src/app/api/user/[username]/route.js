import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/db';
import { BADGE_CATALOG } from '@/lib/userStats';

export async function GET(req, { params }) {
  try {
    const { username } = await params;
    const cleanParam = decodeURIComponent(username || '').toLowerCase().trim();

    const dbUsers = getUsers();
    const user = dbUsers.find(
      (u) =>
        (u.username && u.username.toLowerCase() === cleanParam) ||
        (u.fullName && u.fullName.toLowerCase().replace(/\s+/g, '') === cleanParam) ||
        u.id === username
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Profil astronomer tidak ditemukan!' },
        { status: 404 }
      );
    }

    // Calculate global rank
    const sorted = [...dbUsers].sort((a, b) => (b.points || 0) - (a.points || 0));
    const globalRank = sorted.findIndex((u) => u.id === user.id) + 1;

    // Filter unlocked badges details
    const unlockedBadgeNames = new Set(user.badges || []);
    const badgeDetails = BADGE_CATALOG.map((b) => ({
      ...b,
      isUnlocked: unlockedBadgeNames.has(b.name) || (user.points || 0) >= (b.id === 'penjelajah_awal' ? 50 : b.id === 'pemburu_nebula' ? 500 : 1000),
    }));

    const { passwordHash: _, ...publicProfile } = user;

    return NextResponse.json({
      success: true,
      profile: {
        ...publicProfile,
        globalRank: globalRank > 0 ? globalRank : sorted.length,
        badges: badgeDetails,
        unlockedCount: badgeDetails.filter((b) => b.isUnlocked).length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Gagal memuat profil' },
      { status: 500 }
    );
  }
}
