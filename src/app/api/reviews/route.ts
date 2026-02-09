import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/reviews.json');

export async function GET(request: NextRequest) {
  try {
    const productId = request.nextUrl.searchParams.get('productId');
    const content = fs.readFileSync(dataPath, 'utf-8');
    let data = JSON.parse(content);
    if (!Array.isArray(data)) data = [];
    if (productId) data = data.filter((r: { productId: string }) => r.productId === productId);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
