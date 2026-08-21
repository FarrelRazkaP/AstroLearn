import { NextResponse } from 'next/server';
import { getUsers, saveUsers } from '@/lib/db';

export async function POST(req) {
  try {
    const { id, fullName, email, bio, avatarUrl } = await req.json();

    const users = getUsers();
    const index = users.findIndex((u) => u.id === id || u.email.toLowerCase() === (email || '').toLowerCase());

    if (index !== -1) {
      if (fullName) users[index].fullName = fullName;
      if (email) users[index].email = email;
      if (bio !== undefined) users[index].bio = bio;
      if (avatarUrl) users[index].avatarUrl = avatarUrl;
      
      saveUsers(users);

      const { passwordHash: _, ...safeUser } = users[index];
      return NextResponse.json({ success: true, user: safeUser });
    }

    return NextResponse.json({ success: true, message: 'Profile updated locally' });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Gagal menyimpan profil' },
      { status: 400 }
    );
  }
}
