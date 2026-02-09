import { Category, Product, User, Order } from '@/types';
import fs from 'fs';
import path from 'path';

function getDataDir(): string {
  const base = path.join(process.cwd(), 'src/data');
  try {
    if (fs.existsSync(base) && fs.statSync(base).isDirectory()) return base;
  } catch {
    // fallback
  }
  const alt = path.join(process.cwd(), 'data');
  try {
    if (fs.existsSync(alt) && fs.statSync(alt).isDirectory()) return alt;
  } catch {
    // fallback
  }
  return base;
}

const dataDir = getDataDir();

function readJson<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error('[data] File not found:', filePath, 'cwd:', process.cwd());
    return [] as T;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

function writeJson(filename: string, data: unknown): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

let categoriesCache: Category[] | null = null;
let productsCache: Product[] | null = null;
let ordersCache: Order[] | null = null;

export function getCategories(): Category[] {
  if (!categoriesCache) {
    try {
      categoriesCache = readJson<Category[]>('categories.json');
      if (!Array.isArray(categoriesCache)) categoriesCache = [];
    } catch (e) {
      console.error('[data] getCategories error:', e);
      categoriesCache = [];
    }
  }
  return categoriesCache;
}

export function getProducts(): Product[] {
  if (!productsCache) {
    try {
      productsCache = readJson<Product[]>('products.json');
      if (!Array.isArray(productsCache)) productsCache = [];
    } catch (e) {
      console.error('[data] getProducts error:', e);
      productsCache = [];
    }
  }
  return productsCache;
}

export function getUsers(): User[] {
  return readJson<User[]>('users.json');
}

export function getOrders(): Order[] {
  if (!ordersCache) ordersCache = readJson<Order[]>('orders.json');
  return ordersCache;
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return getCategories().find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug);
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getOrdersByUserId(userId: string): Order[] {
  return getOrders().filter((o) => o.userId === userId);
}

export function addOrder(order: Order): Order {
  const orders = getOrders();
  orders.push(order);
  ordersCache = orders;
  writeJson('orders.json', orders);
  return order;
}

export function generateOrderId(): string {
  const orders = getOrders();
  const nums = orders
    .map((o) => parseInt(o.id.replace('ORD-', ''), 10))
    .filter((n) => !isNaN(n));
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
  return `ORD-${String(next).padStart(3, '0')}`;
}
