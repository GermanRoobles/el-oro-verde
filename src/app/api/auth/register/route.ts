import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUsers, getUserByEmail } from '@/lib/data';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, name, password } = body;
  if (!email || !name || !password) {
    return NextResponse.json(
      { error: 'Email, nombre y contraseña son requeridos' },
      { status: 400 }
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { error: 'La contraseña debe tener al menos 6 caracteres' },
      { status: 400 }
    );
  }
  if (getUserByEmail(email)) {
    return NextResponse.json({ error: 'Ya existe una cuenta con este email' }, { status: 409 });
  }
  const users = getUsers();
  const id = 'u' + String(users.length + 1);
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id,
    email: email.trim().toLowerCase(),
    name: name.trim(),
    passwordHash,
    ageVerified: true,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  const filePath = path.join(process.cwd(), 'src/data/users.json');
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
  const { passwordHash: _, ...userSafe } = newUser;
  return NextResponse.json({ user: userSafe });
}
