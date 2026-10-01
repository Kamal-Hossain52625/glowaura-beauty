import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  Brand,
  CartItem,
  Order,
  Review,
  Coupon,
  StoreSettings,
  User,
  OrderStatus,
  AdminAccount,
  AdminRole
} from '../types';
import {
  PRODUCTS as INITIAL_PRODUCTS_LIST,
  CATEGORIES as INITIAL_CATEGORIES_LIST,
  BRANDS as INITIAL_BRANDS_LIST,
  INITIAL_SETTINGS,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS,
  INITIAL_USER,
  INITIAL_ADMIN_ACCOUNTS
} from '../data/mockData';

export type AppView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-tracking'
  | 'account'
  | 'admin'
  | 'laravel-code';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextType {
  // Navigation & View
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  navigateTo: (view: AppView, param?: string) => void;
  selectedProductSlug: string | null;
  setSelectedProductSlug: (slug: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;

  // Search & Modals
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Data & State
  products: Product[];
  categories: Category[];
  brands: Brand[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  reviews: Review[];
  coupons: Coupon[];
  settings: StoreSettings;
  currentUser: User | null;
  appliedCoupon: Coupon | null;
  toasts: ToastNotification[];

  // Cart actions
  addToCart: (product: Product, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryCharge: number;
  cartTotal: number;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;

  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (productId: string) => void;

  // Coupons
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Orders
  placeOrder: (orderPayload: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    district: string;
    cityArea: string;
    fullAddress: string;
    deliveryNote?: string;
    paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
    transactionId?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  activeTrackingOrder: Order | null;
  setTrackingOrderNumber: (num: string) => void;

  // Reviews
  addReview: (review: Omit<Review, 'id' | 'date' | 'isApproved'>) => void;
  approveReview: (reviewId: string) => void;
  rejectReview: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;

  // Admin Product Actions
  createProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  bulkDeleteProducts: (ids: string[]) => void;
  restoreDefaultProducts: () => void;

  // Admin Category & Brand
  createCategory: (cat: Omit<Category, 'id' | 'itemCount'>) => void;
  createBrand: (brand: Omit<Brand, 'id' | 'itemCount'>) => void;

  // Admin Coupons & Settings
  createCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => void;
  toggleCouponStatus: (id: string) => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Auth
  login: (email: string, role?: 'customer' | 'admin') => void;
  loginWithPhone: (phone: string, name?: string) => void;
  updateUserProfile: (updated: Partial<User>) => void;
  logout: () => void;

  // Admin & Sub-Admin Account Management
  adminAccounts: AdminAccount[];
  createSubAdmin: (subAdmin: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    permissions: string[];
  }) => { success: boolean; message: string };
  deleteSubAdmin: (id: string) => { success: boolean; message: string };
  toggleSubAdminStatus: (id: string) => void;
  adminLogin: (email: string, password: string) => { success: boolean; message: string; user?: User };

  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const resolveViewFromLocation = (): { view: AppView; param?: string } => {
  if (typeof window === 'undefined') return { view: 'home' };

  const pathname = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
  const search = window.location.search;

  // Direct check for /admin or /login or /admin/login or #admin or #login
  if (
    pathname === '/admin' ||
    pathname === '/login' ||
    pathname === '/admin/login' ||
    pathname.startsWith('/admin/') ||
    hash === 'admin' ||
    hash === 'login' ||
    hash.startsWith('admin/') ||
    hash === 'admin-login'
  ) {
    return { view: 'admin' };
  }

  // Check /account or /register or #account or #register
  if (
    pathname === '/register' ||
    pathname === '/account' ||
    pathname === '/customer-account' ||
    hash === 'register' ||
    hash === 'account'
  ) {
    return { view: 'account' };
  }

  // Check /shop
  if (pathname === '/shop' || hash === 'shop') {
    const urlParams = new URLSearchParams(search);
    const cat = urlParams.get('category');
    return { view: 'shop', param: cat || undefined };
  }

  // Check /checkout
  if (pathname === '/checkout' || hash === 'checkout') {
    return { view: 'checkout' };
  }

  // Check /order-tracking or /track
  if (
    pathname === '/order-tracking' ||
    pathname === '/track' ||
    hash === 'order-tracking' ||
    hash === 'track'
  ) {
    return { view: 'order-tracking' };
  }

  // Check /laravel-code or /backend
  if (
    pathname === '/laravel-code' ||
    pathname === '/laravel' ||
    pathname === '/backend' ||
    hash === 'laravel-code' ||
    hash === 'backend'
  ) {
    return { view: 'laravel-code' };
  }

  // Check /product/:slug
  if (pathname.startsWith('/product/')) {
    const slug = pathname.replace('/product/', '').split('/')[0];
    return { view: 'product-detail', param: slug };
  }
  if (hash.startsWith('product/')) {
    const slug = hash.replace('product/', '').split('/')[0];
    return { view: 'product-detail', param: slug };
  }

  return { view: 'home' };
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation initialized from browser URL
  const initialRoute = resolveViewFromLocation();
  const [activeView, setActiveView] = useState<AppView>(initialRoute.view);
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(
    initialRoute.view === 'product-detail' && initialRoute.param ? initialRoute.param : null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialRoute.view === 'shop' && initialRoute.param ? initialRoute.param : null
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Modals & UI
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Dhaka');
  const [trackingNumber, setTrackingNumber] = useState<string>('');

  // Notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Persistent State with Fallback to Initial Data
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('glowaura_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS_LIST;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('glowaura_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES_LIST;
  });

  const [brands, setBrands] = useState<Brand[]>(() => {
    const saved = localStorage.getItem('glowaura_brands');
    return saved ? JSON.parse(saved) : INITIAL_BRANDS_LIST;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('glowaura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('glowaura_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-2'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('glowaura_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('glowaura_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('glowaura_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('glowaura_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>(() => {
    try {
      const saved = localStorage.getItem('glowaura_admin_accounts');
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_ACCOUNTS;
    } catch {
      return INITIAL_ADMIN_ACCOUNTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('glowaura_admin_accounts', JSON.stringify(adminAccounts));
  }, [adminAccounts]);

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('glowaura_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('glowaura_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('glowaura_user');
    }
  }, [currentUser]);

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('glowaura_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('glowaura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('glowaura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('glowaura_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('glowaura_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('glowaura_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('glowaura_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('glowaura_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('glowaura_user');
    }
  }, [currentUser]);

  // Toast Helpers
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Listen for browser forward/backward & direct URL changes
  useEffect(() => {
    const handleUrlChange = () => {
      const route = resolveViewFromLocation();
      setActiveView(route.view);
      if (route.view === 'admin') {
        setCurrentUser((prev) => {
          if (!prev || prev.role !== 'admin') {
            return {
              id: 'admin-1',
              name: 'Store Manager (Super Admin)',
              email: 'admin@glowaurabd.com',
              phone: '01711234567',
              defaultDistrict: 'Dhaka',
              defaultAddress: 'Gulshan 2, Dhaka, Bangladesh',
              role: 'admin'
            };
          }
          return prev;
        });
      }
      if (route.view === 'product-detail' && route.param) {
        setSelectedProductSlug(route.param);
      }
      if (route.view === 'shop' && route.param) {
        setSelectedCategory(route.param);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = (view: AppView, param?: string) => {
    setActiveView(view);
    if (view === 'product-detail' && param) {
      setSelectedProductSlug(param);
    }
    if (view === 'shop' && param) {
      setSelectedCategory(param);
    }

    // Determine target URL path
    let newPath = '/';
    if (view === 'admin') {
      newPath = '/admin';
      // Ensure user has admin role when navigating to admin view
      if (!currentUser || currentUser.role !== 'admin') {
        const adminUser: User = {
          id: 'admin-1',
          name: 'Store Manager (Super Admin)',
          email: 'admin@glowaurabd.com',
          phone: '01711234567',
          defaultDistrict: 'Dhaka',
          defaultAddress: 'Gulshan 2, Dhaka, Bangladesh',
          role: 'admin'
        };
        setCurrentUser(adminUser);
      }
    } else if (view === 'account') {
      newPath = '/account';
    } else if (view === 'shop') {
      newPath = param ? `/shop?category=${encodeURIComponent(param)}` : '/shop';
    } else if (view === 'product-detail' && param) {
      newPath = `/product/${param}`;
    } else if (view === 'checkout') {
      newPath = '/checkout';
    } else if (view === 'order-tracking') {
      newPath = param ? `/order-tracking?order=${encodeURIComponent(param)}` : '/order-tracking';
    } else if (view === 'laravel-code') {
      newPath = '/laravel-code';
    }

    try {
      window.history.pushState({ view, param }, '', newPath);
    } catch {
      // Fallback to hash for environments that restrict pushState
      window.location.hash = newPath.replace(/^\//, '');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.product.discountPrice || item.product.regularPrice) * item.quantity,
    0
  );

  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderAmount) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = (cartSubtotal * appliedCoupon.discountValue) / 100;
      cartDiscount = appliedCoupon.maxDiscount
        ? Math.min(calculated, appliedCoupon.maxDiscount)
        : calculated;
    } else {
      cartDiscount = appliedCoupon.discountValue;
    }
  }

  // Bangladesh Delivery Rules: Inside Dhaka 60, Sub-Dhaka 90, Outside Dhaka 120
  const cartDeliveryCharge =
    cartSubtotal >= settings.freeDeliveryThreshold || cart.length === 0
      ? 0
      : selectedDistrict.toLowerCase() === 'dhaka'
      ? settings.deliveryInsideDhaka
      : ['gazipur', 'narayanganj'].includes(selectedDistrict.toLowerCase())
      ? settings.deliverySubDhaka
      : settings.deliveryOutsideDhaka;

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryCharge);

  // Cart Methods
  const addToCart = (product: Product, quantity = 1, openDrawer = true) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 28)}..." to bag!`, 'success');
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from your cart.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist Methods
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from your wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveWishlistToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, 1, true);
      toggleWishlist(productId);
    }
  };

  // Coupon
  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === normalized && c.isActive
    );

    if (!coupon) {
      showToast('Invalid coupon code.', 'error');
      return { success: false, message: 'Invalid or inactive coupon code.' };
    }

    if (cartSubtotal < coupon.minOrderAmount) {
      const msg = `Minimum spend of ৳${coupon.minOrderAmount} required for this coupon.`;
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    setAppliedCoupon(coupon);
    showToast(`Coupon "${coupon.code}" applied successfully! 🎉`, 'success');
    return { success: true, message: `Coupon applied: saved discount!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  // Orders
  const placeOrder = (payload: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    district: string;
    cityArea: string;
    fullAddress: string;
    deliveryNote?: string;
    paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
    transactionId?: string;
  }): Order => {
    const orderNum = `GLOW-BD-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const orderItems = cart.map((c) => ({
      productId: c.product.id,
      productName: c.product.name,
      productImage: c.product.images[0],
      price: c.product.discountPrice || c.product.regularPrice,
      quantity: c.quantity,
      total: (c.product.discountPrice || c.product.regularPrice) * c.quantity
    }));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: now,
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
      customerPhone: payload.customerPhone,
      district: payload.district,
      cityArea: payload.cityArea,
      fullAddress: payload.fullAddress,
      deliveryNote: payload.deliveryNote,
      items: orderItems,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryCharge: cartDeliveryCharge,
      total: cartTotal,
      paymentMethod: payload.paymentMethod,
      paymentStatus:
        payload.paymentMethod === 'cod'
          ? 'unpaid'
          : payload.transactionId
          ? 'paid'
          : 'pending_verification',
      transactionId: payload.transactionId,
      status: 'pending',
      trackingHistory: [
        {
          status: 'pending',
          date: now,
          note: `Order received via ${payload.paymentMethod.toUpperCase()}. Awaiting dispatch.`
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update coupon usage if applied
    if (appliedCoupon) {
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === appliedCoupon.id ? { ...c, usedCount: c.usedCount + 1 } : c
        )
      );
    }

    clearCart();
    setTrackingNumber(orderNum);
    showToast(`Order placed successfully! Order #${orderNum}`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const defaultNotes: Record<OrderStatus, string> = {
            pending: 'Order pending confirmation',
            confirmed: 'Order verified and confirmed with customer',
            processing: 'Packaging in Banani warehouse with sealed authentic bubble wrap',
            shipped: 'Handed over to Bangladesh courier partner (Steadfast / Pathao)',
            delivered: 'Package delivered to recipient successfully',
            cancelled: 'Order cancelled as requested'
          };
          const trackingEntry = {
            status,
            date: now,
            note: note || defaultNotes[status]
          };
          return {
            ...ord,
            status,
            trackingHistory: [...ord.trackingHistory, trackingEntry]
          };
        }
        return ord;
      })
    );
    showToast(`Order updated to: ${status.toUpperCase()}`, 'success');
  };

  const activeTrackingOrder =
    orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === trackingNumber.toLowerCase().trim() ||
        o.customerPhone.includes(trackingNumber.trim())
    ) || null;

  // Reviews
  const addReview = (reviewPayload: Omit<Review, 'id' | 'date' | 'isApproved'>) => {
    const newReview: Review = {
      ...reviewPayload,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isApproved: true // Auto-approve demo review for immediate user satisfaction
    };
    setReviews((prev) => [newReview, ...prev]);

    // Recalculate product rating
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === reviewPayload.productId) {
          const productReviews = reviews.filter((r) => r.productId === p.id);
          const totalRating =
            productReviews.reduce((sum, r) => sum + r.rating, 0) +
            reviewPayload.rating;
          const newCount = productReviews.length + 1;
          return {
            ...p,
            rating: Number((totalRating / newCount).toFixed(1)),
            reviewCount: newCount
          };
        }
        return p;
      })
    );
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  const approveReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, isApproved: true } : r))
    );
    showToast('Review approved.', 'success');
  };

  const rejectReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, isApproved: false } : r))
    );
    showToast('Review rejected.', 'info');
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    showToast('Review removed.', 'info');
  };

  // Product Admin
  const createProduct = (payload: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...payload,
      id: `prod-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${payload.name.slice(0, 24)}..." added!`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  const bulkDeleteProducts = (ids: string[]) => {
    setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
    showToast(`${ids.length} products removed from catalog.`, 'info');
  };

  const restoreDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS_LIST);
    localStorage.setItem('glowaura_products', JSON.stringify(INITIAL_PRODUCTS_LIST));
    showToast('Restored 32 original beauty products to catalog!', 'success');
  };

  // Categories & Brands
  const createCategory = (cat: Omit<Category, 'id' | 'itemCount'>) => {
    const newCat: Category = {
      ...cat,
      id: `cat-${Date.now()}`,
      itemCount: 0
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${cat.name}" created.`, 'success');
  };

  const createBrand = (brand: Omit<Brand, 'id' | 'itemCount'>) => {
    const newBrand: Brand = {
      ...brand,
      id: `brand-${Date.now()}`,
      itemCount: 0
    };
    setBrands((prev) => [...prev, newBrand]);
    showToast(`Brand "${brand.name}" created.`, 'success');
  };

  // Admin Coupons
  const createCoupon = (couponPayload: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newCoupon: Coupon = {
      ...couponPayload,
      id: `coup-${Date.now()}`,
      usedCount: 0
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast(`Coupon "${couponPayload.code}" active!`, 'success');
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Store settings saved.', 'success');
  };

  // Auth
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const mockUser: User = {
      id: role === 'admin' ? 'admin-1' : 'user-1',
      name: role === 'admin' ? 'Store Manager (Admin)' : 'Maria Afrin',
      email: email || (role === 'admin' ? 'admin@glowaurabd.com' : 'mariaafrin1106@gmail.com'),
      phone: '01789123456',
      defaultDistrict: 'Dhaka',
      defaultAddress: 'House 42, Road 27, Dhanmondi, Dhaka',
      role
    };
    setCurrentUser(mockUser);
    showToast(`Signed in as ${mockUser.name}`, 'success');
  };

  const loginWithPhone = (phone: string, name?: string) => {
    const formattedPhone = phone.trim();
    const pastOrder = orders.find((o) => o.customerPhone === formattedPhone);
    const userName = name?.trim() || (pastOrder ? pastOrder.customerName : 'Glow Member');
    const district = pastOrder ? pastOrder.district : 'Dhaka';
    const address = pastOrder ? pastOrder.fullAddress : 'Dhaka, Bangladesh';

    const customerUser: User = {
      id: `user-${formattedPhone.replace(/\D/g, '') || Date.now()}`,
      name: userName,
      email: `${formattedPhone.replace(/\D/g, '')}@mobile.glowaurabd.com`,
      phone: formattedPhone,
      defaultDistrict: district,
      defaultAddress: address,
      role: 'customer'
    };
    setCurrentUser(customerUser);
    showToast(`Welcome, ${customerUser.name}! Signed in with ${customerUser.phone}`, 'success');
  };

  const updateUserProfile = (updated: Partial<User>) => {
    if (currentUser) {
      const newUser = { ...currentUser, ...updated };
      setCurrentUser(newUser);
      showToast('Profile updated successfully.', 'success');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out successfully.', 'info');
  };

  // Admin and Sub-Admin Email Authentication
  const adminLogin = (email: string, password: string): { success: boolean; message: string; user?: User } => {
    const cleanEmail = email.trim().toLowerCase();
    const account = adminAccounts.find((a) => a.email.toLowerCase() === cleanEmail);

    if (!account) {
      return { success: false, message: 'Invalid admin email address.' };
    }

    if (!account.isActive) {
      return { success: false, message: 'This admin account has been deactivated by Super Admin.' };
    }

    if (account.password !== password) {
      return { success: false, message: 'Incorrect admin password.' };
    }

    const adminUser: User = {
      id: account.id,
      name: account.name,
      email: account.email,
      phone: account.phone || '01711234567',
      role: account.role === 'super_admin' ? 'admin' : 'sub_admin',
      adminRole: account.role,
      permissions: account.permissions,
      defaultDistrict: 'Dhaka',
      defaultAddress: 'Gulshan 2, Dhaka, Bangladesh'
    };

    setCurrentUser(adminUser);
    showToast(
      `Welcome, ${adminUser.name} (${account.role === 'super_admin' ? 'Super Admin' : 'Sub Admin'})!`,
      'success'
    );
    return { success: true, message: 'Admin login successful', user: adminUser };
  };

  // Sub Admin Management by Super Admin
  const createSubAdmin = (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    permissions: string[];
  }) => {
    const cleanEmail = payload.email.trim().toLowerCase();
    if (adminAccounts.some((a) => a.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'An administrator with this email address already exists.' };
    }

    const newSubAdmin: AdminAccount = {
      id: `admin-sub-${Date.now()}`,
      name: payload.name.trim(),
      email: cleanEmail,
      password: payload.password,
      role: 'sub_admin',
      phone: payload.phone?.trim() || '',
      permissions: payload.permissions.length > 0 ? payload.permissions : ['orders', 'tracking'],
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true
    };

    setAdminAccounts((prev) => [...prev, newSubAdmin]);
    showToast(`Sub Admin "${newSubAdmin.name}" added successfully!`, 'success');
    return { success: true, message: 'Sub Admin created successfully.' };
  };

  const deleteSubAdmin = (id: string) => {
    const account = adminAccounts.find((a) => a.id === id);
    if (!account) return { success: false, message: 'Account not found.' };
    if (account.role === 'super_admin') {
      showToast('Super Admin account cannot be deleted!', 'error');
      return { success: false, message: 'Super Admin cannot be deleted.' };
    }

    setAdminAccounts((prev) => prev.filter((a) => a.id !== id));
    showToast(`Sub Admin "${account.name}" removed.`, 'info');
    return { success: true, message: 'Sub Admin deleted.' };
  };

  const toggleSubAdminStatus = (id: string) => {
    setAdminAccounts((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          if (a.role === 'super_admin') {
            showToast('Super Admin status cannot be deactivated.', 'error');
            return a;
          }
          const updated = !a.isActive;
          showToast(
            `Admin "${a.name}" is now ${updated ? 'Active' : 'Deactivated'}.`,
            updated ? 'success' : 'info'
          );
          return { ...a, isActive: updated };
        }
        return a;
      })
    );
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        navigateTo,
        selectedProductSlug,
        setSelectedProductSlug,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,

        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,

        products,
        categories,
        brands,
        cart,
        wishlist,
        orders,
        reviews,
        coupons,
        settings,
        currentUser,
        appliedCoupon,
        toasts,

        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartDeliveryCharge,
        cartTotal,
        selectedDistrict,
        setSelectedDistrict,

        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,

        applyCoupon,
        removeCoupon,

        placeOrder,
        updateOrderStatus,
        activeTrackingOrder,
        setTrackingOrderNumber: setTrackingNumber,

        addReview,
        approveReview,
        rejectReview,
        deleteReview,

        createProduct,
        updateProduct,
        deleteProduct,
        bulkDeleteProducts,
        restoreDefaultProducts,

        createCategory,
        createBrand,

        createCoupon,
        toggleCouponStatus,
        updateSettings,

        login,
        loginWithPhone,
        updateUserProfile,
        logout,

        adminAccounts,
        createSubAdmin,
        deleteSubAdmin,
        toggleSubAdminStatus,
        adminLogin,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
