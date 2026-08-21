import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get('q') || '').toLowerCase().trim();

    const dbUsers = getUsers();
    const sorted = [...dbUsers].sort((a, b) => (b.points || 0) - (a.points || 0));

    if (!query) {
      // Return top 10 users if query is empty
      const topUsers = sorted.slice(0, 10).map((u, idx) => ({
        id: u.id,
        fullName: u.fullName || u.username,
        username: u.username || u.fullName,
        points: u.points || 0,
        level: u.level || 1,
        streak: u.streak || 0,
        avatarUrl: u.avatarUrl || null,
        rank: idx + 1,
      }));
      return NextResponse.json({ success: true, results: topUsers });
    }

    const matches = sorted
      .map((u, idx) => ({ ...u, rank: idx + 1 }))
      .filter(
        (u) =>
          (u.fullName && u.fullName.toLowerCase().includes(query)) ||
          (u.username && u.username.toLowerCase().includes(query))
      )
      .slice(0, 10)
      .map(({ passwordHash: _, ...safeUser }) => safeUser);

    return NextResponse.json({ success: true, results: matches });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Gagal mencari astronomer' },
      { status: 500 }
    );
  }
}
