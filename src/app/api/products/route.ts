import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';
import type { Product } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const newOnly = searchParams.get('new');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? Math.min(50, Math.max(1, parseInt(limitParam, 10))) : undefined;

    let products: Product[] = getProducts();

    if (categoryId) products = products.filter((p) => p.categoryId === categoryId);
    if (brand) products = products.filter((p) => p.brand === brand);
    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) products = products.filter((p) => (p.priceOffer ?? p.price) >= min);
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) products = products.filter((p) => (p.priceOffer ?? p.price) <= max);
    }
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.es.toLowerCase().includes(q) ||
          p.name.ca.toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }
    if (featured === 'true') products = products.filter((p) => p.featured);
    if (newOnly === 'true') products = products.filter((p) => p.new);
    if (limit != null) products = products.slice(0, limit);

    return NextResponse.json(products);
  } catch (e) {
    console.error('[API products]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Error loading products' },
      { status: 500 }
    );
  }
}
