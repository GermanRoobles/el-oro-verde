import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/lib/data';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'eloroverde_user';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
  }
  const user = getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
  }
  const { passwordHash: _, ...userSafe } = user;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify({ id: user.id, email: user.email }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
  return NextResponse.json({ user: userSafe });
}
