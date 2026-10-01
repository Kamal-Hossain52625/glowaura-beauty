export interface ProductImage {
  id: string;
  url: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  category: string;
  subcategory: string;
  regularPrice: number; // in BDT (৳)
  discountPrice: number; // in BDT (৳)
  stockQuantity: number;
  stockStatus: 'in_stock' | 'out_of_stock' | 'low_stock';
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  ingredients: string;
  usageInstructions: string;
  specifications: Record<string, string>;
  images: string[];
  volumeOrSize?: string;
  countryOfOrigin?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  subcategories: string[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  country: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  isApproved: boolean;
  verifiedPurchase: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g., 10 for 10% or 200 for ৳200
  minOrderAmount: number;
  maxDiscount?: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  total: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  district: string;
  cityArea: string;
  fullAddress: string;
  deliveryNote?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
  paymentStatus: 'paid' | 'unpaid' | 'pending_verification';
  transactionId?: string;
  status: OrderStatus;
  trackingHistory: {
    status: OrderStatus;
    date: string;
    note: string;
  }[];
}

export type AdminRole = 'super_admin' | 'sub_admin';

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  phone?: string;
  permissions: string[];
  createdAt: string;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  defaultDistrict?: string;
  defaultAddress?: string;
  role: 'customer' | 'admin' | 'sub_admin' | 'super_admin';
  adminRole?: AdminRole;
  permissions?: string[];
}

export interface StoreSettings {
  storeName: string;
  hotline: string;
  supportEmail: string;
  announcement: string;
  deliveryInsideDhaka: number;
  deliveryOutsideDhaka: number;
  deliverySubDhaka: number;
  freeDeliveryThreshold: number;
  bkashMerchantNumber: string;
  nagadMerchantNumber: string;
}
