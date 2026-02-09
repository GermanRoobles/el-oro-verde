export interface Category {
  id: string;
  name: Record<'es' | 'ca' | 'en', string>;
  slug: string;
  description: Record<'es' | 'ca' | 'en', string>;
  order: number;
}

export interface Product {
  id: string;
  name: Record<'es' | 'ca' | 'en', string>;
  slug: string;
  description: Record<'es' | 'ca' | 'en', string>;
  price: number;
  priceOffer?: number;
  images: string[];
  categoryId: string;
  brand: string;
  stock: number;
  featured: boolean;
  new: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  ageVerified: boolean;
  createdAt: string;
}

export interface OrderLine {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  lines: OrderLine[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  createdAt: string;
}

export type Locale = 'es' | 'ca' | 'en';

export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}
