import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUsers } from '@/lib/data';

const COOKIE_NAME = 'eloroverde_user';

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie?.value) {
    return NextResponse.json({ user: null });
  }
  try {
    const { id } = JSON.parse(cookie.value);
    const users = getUsers();
    const user = users.find((u) => u.id === id);
    if (!user) return NextResponse.json({ user: null });
    const { passwordHash: _, ...userSafe } = user;
    return NextResponse.json({ user: userSafe });
  } catch {
    return NextResponse.json({ user: null });
  }
}
