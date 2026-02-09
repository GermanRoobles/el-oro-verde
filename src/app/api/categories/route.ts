import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/data';

export async function GET() {
  try {
    const categories = getCategories();
    return NextResponse.json(categories);
  } catch (e) {
    console.error('[API categories]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Error loading categories' },
      { status: 500 }
    );
  }
}
