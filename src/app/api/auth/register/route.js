import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/db';

export async function POST(req) {
  try {
    const { fullName, email, password, role } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'Nama lengkap, email, dan kata sandi wajib diisi!' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Kata sandi minimal 6 karakter!' },
        { status: 400 }
      );
    }

    const user = registerUser({ fullName, email, password, role });
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Gagal mendaftarkan akun' },
      { status: 400 }
    );
  }
}
