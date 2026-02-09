import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/blog.json');

export async function GET() {
  try {
    const content = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(content);
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch {
    return NextResponse.json([]);
  }
}
