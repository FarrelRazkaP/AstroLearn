import { NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/db';

export async function POST(req) {
  try {
    const { identity, password } = await req.json();

    if (!identity || !password) {
      return NextResponse.json(
        { error: 'Email/Username dan kata sandi wajib diisi!' },
        { status: 400 }
      );
    }

    const user = authenticateUser(identity, password);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Gagal masuk ke akun' },
      { status: 401 }
    );
  }
}
