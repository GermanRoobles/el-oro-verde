import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { addOrder, generateOrderId, getOrders, getProductById } from '@/lib/data';
import type { Order, OrderLine } from '@/types';

const COOKIE_NAME = 'eloroverde_user';

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie?.value) {
    return NextResponse.json({ orders: [] });
  }
  try {
    const { id } = JSON.parse(cookie.value);
    const orders = getOrders().filter((o) => o.userId === id);
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ orders: [] });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { shippingAddress, lines } = body as {
    shippingAddress: Order['shippingAddress'];
    lines: { productId: string; quantity: number }[];
  };
  if (!shippingAddress || !lines?.length) {
    return NextResponse.json(
      { error: 'Dirección de envío y líneas del pedido son requeridos' },
      { status: 400 }
    );
  }
  const required: (keyof Order['shippingAddress'])[] = ['name', 'address', 'city', 'postalCode', 'country', 'phone'];
  for (const key of required) {
    if (!shippingAddress[key]?.trim()) {
      return NextResponse.json(
        { error: `Falta el campo: ${key}` },
        { status: 400 }
      );
    }
  }
  let userId: string | null = null;
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (cookie?.value) {
    try {
      userId = JSON.parse(cookie.value).id;
    } catch {}
  }
  const orderLines: OrderLine[] = [];
  let total = 0;
  for (const line of lines) {
    const product = getProductById(line.productId);
    if (!product) continue;
    const qty = Math.max(1, Math.min(line.quantity, product.stock));
    const price = product.priceOffer ?? product.price;
    orderLines.push({
      productId: product.id,
      productName: product.name.es,
      quantity: qty,
      price,
    });
    total += price * qty;
  }
  if (orderLines.length === 0) {
    return NextResponse.json({ error: 'No hay líneas válidas en el pedido' }, { status: 400 });
  }
  const order: Order = {
    id: generateOrderId(),
    userId: userId ?? 'guest',
    lines: orderLines,
    total: Math.round(total * 100) / 100,
    status: 'pending',
    shippingAddress: {
      name: String(shippingAddress.name).trim(),
      address: String(shippingAddress.address).trim(),
      city: String(shippingAddress.city).trim(),
      postalCode: String(shippingAddress.postalCode).trim(),
      country: String(shippingAddress.country).trim(),
      phone: String(shippingAddress.phone).trim(),
    },
    createdAt: new Date().toISOString(),
  };
  addOrder(order);
  return NextResponse.json({ order });
}
