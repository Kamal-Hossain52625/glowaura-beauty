import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { InvoiceModal } from '../components/InvoiceModal';
import { Product, Order, OrderStatus, Coupon } from '../types';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Star,
  Tag,
  Settings,
  Plus,
  Trash2,
  Edit,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Search,
  ExternalLink,
  DollarSign,
  TrendingUp,
  X,
  Eye,
  Check,
  Ban,
  RefreshCw,
  Sparkles,
  Flame,
  Filter,
  CheckSquare,
  Square,
  ArrowUpDown,
  RotateCcw,
  SlidersHorizontal,
  Copy,
  Percent
} from 'lucide-react';

const BEAUTY_IMAGE_PRESETS = [
  {
    name: 'Hydrating Serum',
    url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    tag: 'Serum'
  },
  {
    name: 'Relief Sunscreen SPF50+',
    url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    tag: 'Sun Care'
  },
  {
    name: 'Water Sleeping Mask',
    url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    tag: 'Moisturizer'
  },
  {
    name: 'Velvet Matte Lipstick',
    url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
    tag: 'Lip Care'
  },
  {
    name: 'Low pH Gentle Cleanser',
    url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    tag: 'Cleanser'
  },
  {
    name: 'Hydra Essence Toner',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    tag: 'Toner'
  }
];

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    login,
    logout,
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    bulkDeleteProducts,
    restoreDefaultProducts,
    categories,
    createCategory,
    brands,
    createBrand,
    orders,
    updateOrderStatus,
    reviews,
    approveReview,
    rejectReview,
    deleteReview,
    coupons,
    createCoupon,
    toggleCouponStatus,
    settings,
    updateSettings,
    navigateTo,
    showToast,
    setQuickViewProduct
  } = useStore();

  // Auto-elevate to Super Admin when AdminDashboard is mounted
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      login('admin@glowaurabd.com', 'admin');
    }
  }, []);

  const [adminEmail, setAdminEmail] = useState('admin@glowaurabd.com');
  const [adminPassword, setAdminPassword] = useState('password123');
  const [adminAuthError, setAdminAuthError] = useState('');

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'products' | 'orders' | 'categories' | 'customers' | 'reviews' | 'coupons' | 'settings'
  >('overview');

  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Product Management Enhanced Search, Filter & Bulk Selection
  const [prodSearch, setProdSearch] = useState('');
  const [prodCategoryFilter, setProdCategoryFilter] = useState('all');
  const [prodBrandFilter, setProdBrandFilter] = useState('all');
  const [prodStockFilter, setProdStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [prodBadgeFilter, setProdBadgeFilter] = useState<'all' | 'featured' | 'bestseller' | 'new_arrival' | 'inactive'>('all');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState<Product | null>(null);
  const [isBulkDeleteConfirmOpen, setIsBulkDeleteConfirmOpen] = useState(false);
  const [isRestoreConfirmOpen, setIsRestoreConfirmOpen] = useState(false);

  // Product Create/Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState<{
    name: string;
    brand: string;
    category: string;
    subcategory: string;
    sku: string;
    regularPrice: number;
    discountPrice: number;
    stockQuantity: number;
    volumeOrSize: string;
    countryOfOrigin: string;
    image: string;
    description: string;
    ingredients: string;
    usageInstructions: string;
    isFeatured: boolean;
    isBestSeller: boolean;
    isNewArrival: boolean;
    isActive: boolean;
  }>({
    name: '',
    brand: 'COSRX',
    category: 'Skincare',
    subcategory: 'Serums & Ampoules',
    sku: `GLW-${Math.floor(1000 + Math.random() * 9000)}`,
    regularPrice: 1500,
    discountPrice: 1250,
    stockQuantity: 30,
    volumeOrSize: '100ml',
    countryOfOrigin: 'South Korea',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    description: 'High-performance hydrating formula imported directly from South Korea.',
    ingredients: 'Water, Niacinamide, Hyaluronic Acid, Glycerin, Centella Asiatica Extract.',
    usageInstructions: 'Apply morning and evening after toner.',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true
  });

  // Category & Coupon modals
  const [newCatName, setNewCatName] = useState('');
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandCountry, setNewBrandCountry] = useState('South Korea');

  const [couponCode, setCouponCode] = useState('');
  const [couponType, setCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [couponValue, setCouponValue] = useState(10);
  const [couponMinSpend, setCouponMinSpend] = useState(1500);

  // Financial & Inventory Statistics
  const totalSales = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
  const todayOrders = orders.filter((o) => o.date.startsWith('2026-09-29'));
  const todaySales = todayOrders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const processingOrdersCount = orders.filter((o) => o.status === 'processing').length;
  const completedOrdersCount = orders.filter((o) => o.status === 'delivered').length;
  const lowStockProducts = products.filter((p) => p.stockQuantity < 20);

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    if (
      orderSearch.trim() &&
      !o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) &&
      !o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) &&
      !o.customerPhone.includes(orderSearch.trim())
    ) {
      return false;
    }
    return true;
  });

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthError('');
    if (!adminEmail.trim()) {
      setAdminAuthError('Please enter admin email address.');
      return;
    }
    login(adminEmail.trim(), 'admin');
    showToast('Authenticated as Super Admin!', 'success');
  };

  const handleDirectAdminEnter = () => {
    login('admin@glowaurabd.com', 'admin');
    showToast('Super Admin access granted!', 'success');
  };

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProdForm({
      name: '',
      brand: brands[0]?.name || 'COSRX',
      category: categories[0]?.name || 'Skincare',
      subcategory: 'Serums & Ampoules',
      sku: `GLW-${Math.floor(1000 + Math.random() * 9000)}`,
      regularPrice: 1500,
      discountPrice: 1250,
      stockQuantity: 30,
      volumeOrSize: '100ml',
      countryOfOrigin: 'South Korea',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      description: 'High-performance hydrating formula imported directly from South Korea.',
      ingredients: 'Water, Niacinamide, Hyaluronic Acid, Glycerin, Centella Asiatica Extract.',
      usageInstructions: 'Apply morning and evening after toner.',
      isFeatured: true,
      isBestSeller: false,
      isNewArrival: true,
      isActive: true
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProdForm({
      name: p.name,
      brand: p.brand,
      category: p.category,
      subcategory: p.subcategory || 'General',
      sku: p.sku,
      regularPrice: p.regularPrice,
      discountPrice: p.discountPrice,
      stockQuantity: p.stockQuantity,
      volumeOrSize: p.volumeOrSize || 'Standard',
      countryOfOrigin: p.countryOfOrigin || 'South Korea',
      image: p.images[0] || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      description: p.description || '',
      ingredients: p.ingredients || '',
      usageInstructions: p.usageInstructions || '',
      isFeatured: !!p.isFeatured,
      isBestSeller: !!p.isBestSeller,
      isNewArrival: !!p.isNewArrival,
      isActive: p.isActive !== false
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name.trim()) return;

    const regPrice = Number(prodForm.regularPrice) || 0;
    const discPrice = Number(prodForm.discountPrice) || regPrice;
    const qty = Number(prodForm.stockQuantity) || 0;

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: prodForm.name.trim(),
        brand: prodForm.brand,
        category: prodForm.category,
        subcategory: prodForm.subcategory,
        sku: prodForm.sku.trim(),
        regularPrice: regPrice,
        discountPrice: discPrice,
        stockQuantity: qty,
        stockStatus: qty > 0 ? (qty < 15 ? 'low_stock' : 'in_stock') : 'out_of_stock',
        volumeOrSize: prodForm.volumeOrSize,
        countryOfOrigin: prodForm.countryOfOrigin,
        description: prodForm.description,
        shortDescription: prodForm.description.slice(0, 120),
        ingredients: prodForm.ingredients,
        usageInstructions: prodForm.usageInstructions,
        isFeatured: prodForm.isFeatured,
        isBestSeller: prodForm.isBestSeller,
        isNewArrival: prodForm.isNewArrival,
        isActive: prodForm.isActive,
        images: [prodForm.image]
      });
    } else {
      createProduct({
        name: prodForm.name.trim(),
        slug: prodForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        brand: prodForm.brand,
        category: prodForm.category,
        subcategory: prodForm.subcategory,
        sku: prodForm.sku.trim() || `GLW-${Math.floor(1000 + Math.random() * 9000)}`,
        regularPrice: regPrice,
        discountPrice: discPrice,
        stockQuantity: qty,
        stockStatus: qty > 0 ? (qty < 15 ? 'low_stock' : 'in_stock') : 'out_of_stock',
        volumeOrSize: prodForm.volumeOrSize,
        countryOfOrigin: prodForm.countryOfOrigin,
        isFeatured: prodForm.isFeatured,
        isBestSeller: prodForm.isBestSeller,
        isNewArrival: prodForm.isNewArrival,
        isActive: prodForm.isActive,
        rating: 5.0,
        reviewCount: 0,
        shortDescription: prodForm.description.slice(0, 120),
        description: prodForm.description,
        ingredients: prodForm.ingredients,
        usageInstructions: prodForm.usageInstructions,
        specifications: {
          "Authenticity": "100% Guaranteed Original",
          "Origin": prodForm.countryOfOrigin || "South Korea",
          "Volume": prodForm.volumeOrSize || "Standard"
        },
        images: [prodForm.image]
      });
    }

    setIsProductModalOpen(false);
  };

  const handleQuickStock = (p: Product, delta: number) => {
    const newQty = Math.max(0, p.stockQuantity + delta);
    updateProduct(p.id, {
      stockQuantity: newQty,
      stockStatus: newQty > 0 ? (newQty < 15 ? 'low_stock' : 'in_stock') : 'out_of_stock'
    });
  };

  const handleQuickToggle = (p: Product, field: 'isActive' | 'isFeatured' | 'isBestSeller' | 'isNewArrival') => {
    updateProduct(p.id, {
      [field]: !p[field]
    });
  };

  const handleConfirmSingleDelete = () => {
    if (deleteConfirmProduct) {
      deleteProduct(deleteConfirmProduct.id);
      setSelectedProductIds(prev => prev.filter(id => id !== deleteConfirmProduct.id));
      setDeleteConfirmProduct(null);
    }
  };

  const handleConfirmBulkDelete = () => {
    if (selectedProductIds.length > 0) {
      bulkDeleteProducts(selectedProductIds);
      setSelectedProductIds([]);
      setIsBulkDeleteConfirmOpen(false);
    }
  };

  const handleConfirmRestore = () => {
    restoreDefaultProducts();
    setSelectedProductIds([]);
    setIsRestoreConfirmOpen(false);
  };

  const handleToggleSelectAll = () => {
    if (selectedProductIds.length === filteredAdminProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredAdminProducts.map(p => p.id));
    }
  };

  const handleToggleSelectProduct = (id: string) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Filtered Products for Admin
  const filteredAdminProducts = products.filter((p) => {
    if (prodSearch.trim()) {
      const q = prodSearch.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (prodCategoryFilter !== 'all' && p.category !== prodCategoryFilter) {
      return false;
    }

    if (prodBrandFilter !== 'all' && p.brand !== prodBrandFilter) {
      return false;
    }

    if (prodStockFilter === 'in_stock' && p.stockQuantity < 15) return false;
    if (prodStockFilter === 'low_stock' && (p.stockQuantity <= 0 || p.stockQuantity >= 15)) return false;
    if (prodStockFilter === 'out_of_stock' && p.stockQuantity > 0) return false;

    if (prodBadgeFilter === 'featured' && !p.isFeatured) return false;
    if (prodBadgeFilter === 'bestseller' && !p.isBestSeller) return false;
    if (prodBadgeFilter === 'new_arrival' && !p.isNewArrival) return false;
    if (prodBadgeFilter === 'inactive' && p.isActive !== false) return false;

    return true;
  });

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    createCoupon({
      code: couponCode.trim().toUpperCase(),
      discountType: couponType,
      discountValue: Number(couponValue),
      minOrderAmount: Number(couponMinSpend),
      maxDiscount: couponType === 'percentage' ? 500 : undefined,
      expiryDate: '2026-12-31',
      usageLimit: 500,
      isActive: true
    });
    setCouponCode('');
  };

  // If user is not authenticated as admin, show dedicated Admin Authentication Portal
  if (currentUser?.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#faf8f9] px-4 py-16">
        <div className="bg-white border border-[#F8E8EE] w-full max-w-md rounded-3xl p-8 shadow-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-[#E86A92] flex items-center justify-center mx-auto shadow-sm">
              <LayoutDashboard className="w-7 h-7" />
            </div>
            <h1 className="font-display text-2xl font-bold text-zinc-900">
              GlowAura BD Admin Portal
            </h1>
            <p className="text-xs text-zinc-500">
              Restricted access for store managers & staff. Secured via Laravel 12 Sanctum.
            </p>
          </div>

          <div className="bg-pink-50/70 border border-pink-200 p-3.5 rounded-2xl text-xs space-y-1.5">
            <div className="flex items-center justify-between font-bold text-zinc-800">
              <span>Demo Super Admin Credentials:</span>
              <span className="text-[10px] bg-[#E86A92] text-white px-2 py-0.5 rounded-full uppercase">
                Active
              </span>
            </div>
            <p className="text-zinc-600 font-mono text-[11px]">Email: admin@glowaurabd.com</p>
            <p className="text-zinc-600 font-mono text-[11px]">Password: password123</p>
          </div>

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@glowaurabd.com"
                className="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white text-zinc-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Secret Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white text-zinc-900 font-mono"
              />
            </div>

            {adminAuthError && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                {adminAuthError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-[#E86A92]" />
              <span>Sign In to Admin Dashboard</span>
            </button>
          </form>

          <div className="pt-2 border-t border-zinc-100 space-y-2">
            <button
              onClick={handleDirectAdminEnter}
              className="w-full bg-[#E86A92] hover:bg-[#d6577e] text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>⚡ One-Click Enter Admin Dashboard</span>
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="w-full text-center text-xs text-zinc-500 hover:text-zinc-800 py-1.5 font-medium cursor-pointer"
            >
              ← Back to Customer Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f9] pb-16">
      {/* Top Admin Header */}
      <div className="bg-[#1f1d1e] text-white py-4 px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E86A92] flex items-center justify-center font-bold text-white shadow-sm">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold">GlowAura BD Admin Center</h1>
              <p className="text-[11px] text-zinc-400">
                Logged in as: <span className="text-pink-300 font-semibold">{currentUser?.email || 'admin@glowaurabd.com'}</span> (Super Admin)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="bg-zinc-800 hover:bg-zinc-700 text-pink-300 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Storefront
            </button>
            <button
              onClick={() => navigateTo('laravel-code')}
              className="bg-emerald-900/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Laravel Backend Code
            </button>
            <button
              onClick={() => {
                logout();
                showToast('Admin logged out successfully.', 'info');
              }}
              className="bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800/60 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Logout from Admin"
            >
              Logout Admin
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Admin Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-1">
            <div className="bg-white border border-[#F8E8EE] rounded-2xl p-3 shadow-xs space-y-1 sticky top-24">
              <button
                onClick={() => setActiveAdminTab('overview')}
                className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeAdminTab === 'overview'
                    ? 'bg-[#E86A92] text-white shadow-xs'
                    : 'text-zinc-700 hover:bg-pink-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('products')}
                className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                  activeAdminTab === 'products'
                    ? 'bg-[#E86A92] text-white shadow-xs'
                    : 'text-zinc-700 hover:bg-pink-50'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  Product Catalog
                </span>
                <span className="text-[11px] opacity-80">({products.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('orders')}
                className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                  activeAdminTab === 'orders'
                    ? 'bg-[#E86A92] text-white shadow-xs'
                    : 'text-zinc-700 hover:bg-pink-50'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4" />
                  Order Management
                </span>
                {pendingOrdersCount > 0 && (
                  <span className="bg-amber-400 text-zinc-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {pendingOrdersCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveAdminTab('categories')}
                className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeAdminTab === 'categories'
                    ? 'bg-[#E86A92] text-white shadow-xs'
                    : 'text-zinc-700 hover:bg-pink-50'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Categories & Brands</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('reviews')}
                className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                  activeAdminTab === 'reviews'
                    ? 'bg-[#E86A92] text-white shadow-xs'
                    : 'text-zinc-700 hover:bg-pink-50'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Star className="w-4 h-4" />
                  Customer Reviews
                </span>
                <span className="text-[11px] opacity-80">({reviews.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('coupons')}
                className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeAdminTab === 'coupons'
                    ? 'bg-[#E86A92] text-white shadow-xs'
                    : 'text-zinc-700 hover:bg-pink-50'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Coupons & Promos</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('customers')}
                className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeAdminTab === 'customers'
                    ? 'bg-[#E86A92] text-white shadow-xs'
                    : 'text-zinc-700 hover:bg-pink-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Customer Accounts</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('settings')}
                className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeAdminTab === 'settings'
                    ? 'bg-[#E86A92] text-white shadow-xs'
                    : 'text-zinc-700 hover:bg-pink-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Store Settings</span>
              </button>
            </div>
          </div>

          {/* Admin Main Body */}
          <div className="lg:col-span-9 space-y-6">
            {/* TAB 1: OVERVIEW */}
            {activeAdminTab === 'overview' && (
              <div className="space-y-6">
                {/* Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-[#F8E8EE] p-5 rounded-2xl shadow-xs">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-[11px] font-bold uppercase">Total Sales (BDT)</span>
                      <TrendingUp className="w-4 h-4 text-[#E86A92]" />
                    </div>
                    <p className="text-2xl font-extrabold text-zinc-900">
                      ৳{totalSales.toLocaleString()}
                    </p>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      Live store turnover
                    </span>
                  </div>

                  <div className="bg-white border border-[#F8E8EE] p-5 rounded-2xl shadow-xs">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-[11px] font-bold uppercase">Total Orders</span>
                      <ShoppingBag className="w-4 h-4 text-zinc-600" />
                    </div>
                    <p className="text-2xl font-extrabold text-zinc-900">{orders.length}</p>
                    <span className="text-[11px] text-zinc-500">
                      {completedOrdersCount} delivered successfully
                    </span>
                  </div>

                  <div className="bg-white border border-[#F8E8EE] p-5 rounded-2xl shadow-xs">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-[11px] font-bold uppercase">Pending Dispatch</span>
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    </div>
                    <p className="text-2xl font-extrabold text-amber-600">
                      {pendingOrdersCount + processingOrdersCount}
                    </p>
                    <span className="text-[11px] text-amber-700">Requires Courier Label</span>
                  </div>

                  <div className="bg-white border border-[#F8E8EE] p-5 rounded-2xl shadow-xs">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-[11px] font-bold uppercase">Active Products</span>
                      <Package className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-2xl font-extrabold text-zinc-900">{products.length}</p>
                    <span className="text-[11px] text-zinc-500">
                      {lowStockProducts.length} low stock alerts
                    </span>
                  </div>
                </div>

                {/* Sales Chart Visualization */}
                <div className="bg-white border border-[#F8E8EE] p-6 rounded-3xl shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-base font-bold text-zinc-900">
                        Weekly Sales Revenue (Dhaka & Nationwide)
                      </h3>
                      <p className="text-xs text-zinc-400">BDT Turnover by Day</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      +28.4% Growth
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-2 pt-6 items-end h-44">
                    {[
                      { day: 'Mon', val: 18500, height: '45%' },
                      { day: 'Tue', val: 24200, height: '60%' },
                      { day: 'Wed', val: 29800, height: '75%' },
                      { day: 'Thu', val: 21000, height: '52%' },
                      { day: 'Fri', val: 38400, height: '95%' },
                      { day: 'Sat', val: 34100, height: '85%' },
                      { day: 'Sun', val: 27500, height: '70%' }
                    ].map((bar, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                        <div
                          className="w-full bg-[#E86A92]/80 hover:bg-[#E86A92] rounded-t-xl transition-all"
                          style={{ height: bar.height }}
                          title={`৳${bar.val.toLocaleString()}`}
                        />
                        <span className="text-[11px] font-semibold text-zinc-500">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="bg-white border border-[#F8E8EE] p-6 rounded-3xl shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-bold text-zinc-900">
                      Recent Orders
                    </h3>
                    <button
                      onClick={() => setActiveAdminTab('orders')}
                      className="text-xs text-[#E86A92] font-semibold hover:underline"
                    >
                      View All Orders ({orders.length}) →
                    </button>
                  </div>

                  <div className="divide-y divide-zinc-100">
                    {orders.slice(0, 4).map((ord) => (
                      <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-zinc-900">
                            #{ord.orderNumber} · {ord.customerName}
                          </p>
                          <p className="text-zinc-500 text-[11px]">
                            {ord.district} · {ord.items.length} items · {ord.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-zinc-900">৳{ord.total.toLocaleString()}</p>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              ord.status === 'delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-pink-100 text-[#E86A92]'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PRODUCTS MANAGEMENT */}
            {activeAdminTab === 'products' && (
              <div className="space-y-6">
                {/* 1. Product Inventory Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="bg-white border border-[#F8E8EE] rounded-2xl p-4 shadow-xs">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Total Products</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-2xl font-bold text-zinc-900">{products.length}</span>
                      <Package className="w-5 h-5 text-[#E86A92]" />
                    </div>
                  </div>
                  <div className="bg-white border border-[#F8E8EE] rounded-2xl p-4 shadow-xs">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Active in Store</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-2xl font-bold text-emerald-600">
                        {products.filter((p) => p.isActive !== false).length}
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>
                  <div className="bg-white border border-[#F8E8EE] rounded-2xl p-4 shadow-xs">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Low Stock (&lt;15)</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-2xl font-bold text-amber-600">
                        {products.filter((p) => p.stockQuantity > 0 && p.stockQuantity < 15).length}
                      </span>
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    </div>
                  </div>
                  <div className="bg-white border border-[#F8E8EE] rounded-2xl p-4 shadow-xs">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Out of Stock</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-2xl font-bold text-rose-600">
                        {products.filter((p) => p.stockQuantity <= 0).length}
                      </span>
                      <Ban className="w-5 h-5 text-rose-500" />
                    </div>
                  </div>
                  <div className="bg-white border border-[#F8E8EE] rounded-2xl p-4 shadow-xs col-span-2 sm:col-span-1">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Total Units</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-2xl font-bold text-zinc-900">
                        {products.reduce((acc, p) => acc + p.stockQuantity, 0).toLocaleString()}
                      </span>
                      <TrendingUp className="w-5 h-5 text-[#E86A92]" />
                    </div>
                  </div>
                </div>

                {/* 2. Main Product Catalog Card */}
                <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-6">
                  {/* Header & Primary Actions */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h2 className="font-display text-xl font-bold text-zinc-900">
                          Product Catalog Management
                        </h2>
                        <span className="bg-pink-100 text-[#E86A92] font-bold text-xs px-2.5 py-0.5 rounded-full">
                          {filteredAdminProducts.length} showing
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Add new products, edit pricing & stock, delete products, and manage live beauty catalog
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={() => setIsRestoreConfirmOpen(true)}
                        className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Reset catalog back to 32 default authentic products"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-zinc-600" />
                        <span>Restore 32 Defaults</span>
                      </button>

                      <button
                        onClick={handleOpenAddProduct}
                        className="bg-[#E86A92] hover:bg-[#d6577e] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer hover:shadow-md"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Product</span>
                      </button>
                    </div>
                  </div>

                  {/* Search & Comprehensive Filters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {/* Live Search */}
                    <div className="relative lg:col-span-2">
                      <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Search product name, SKU, brand, category..."
                        value={prodSearch}
                        onChange={(e) => setProdSearch(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 text-xs pl-9 pr-8 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white text-zinc-900 transition-colors"
                      />
                      {prodSearch && (
                        <button
                          onClick={() => setProdSearch('')}
                          className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Category Filter */}
                    <div>
                      <select
                        value={prodCategoryFilter}
                        onChange={(e) => setProdCategoryFilter(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white text-zinc-800"
                      >
                        <option value="all">All Categories ({categories.length})</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Brand Filter */}
                    <div>
                      <select
                        value={prodBrandFilter}
                        onChange={(e) => setProdBrandFilter(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white text-zinc-800"
                      >
                        <option value="all">All Brands ({brands.length})</option>
                        {brands.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Stock Status Filter */}
                    <div>
                      <select
                        value={prodStockFilter}
                        onChange={(e) => setProdStockFilter(e.target.value as any)}
                        className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white text-zinc-800"
                      >
                        <option value="all">All Stock Statuses</option>
                        <option value="in_stock">In Stock (&ge;15)</option>
                        <option value="low_stock">Low Stock (&lt;15)</option>
                        <option value="out_of_stock">Out of Stock (0)</option>
                      </select>
                    </div>
                  </div>

                  {/* Secondary Filter Row & Badge Selectors */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-zinc-500 text-[11px] font-medium mr-1">Filter Badges:</span>
                      <button
                        onClick={() => setProdBadgeFilter('all')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                          prodBadgeFilter === 'all'
                            ? 'bg-zinc-900 text-white font-bold'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setProdBadgeFilter('featured')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                          prodBadgeFilter === 'featured'
                            ? 'bg-amber-500 text-white font-bold'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </button>
                      <button
                        onClick={() => setProdBadgeFilter('bestseller')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                          prodBadgeFilter === 'bestseller'
                            ? 'bg-rose-500 text-white font-bold'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        <Flame className="w-3 h-3 fill-current" />
                        Best Seller
                      </button>
                      <button
                        onClick={() => setProdBadgeFilter('new_arrival')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                          prodBadgeFilter === 'new_arrival'
                            ? 'bg-purple-600 text-white font-bold'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        New Arrival
                      </button>
                      <button
                        onClick={() => setProdBadgeFilter('inactive')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                          prodBadgeFilter === 'inactive'
                            ? 'bg-zinc-700 text-white font-bold'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        <Ban className="w-3 h-3" />
                        Hidden / Draft
                      </button>
                    </div>

                    {(prodSearch || prodCategoryFilter !== 'all' || prodBrandFilter !== 'all' || prodStockFilter !== 'all' || prodBadgeFilter !== 'all') && (
                      <button
                        onClick={() => {
                          setProdSearch('');
                          setProdCategoryFilter('all');
                          setProdBrandFilter('all');
                          setProdStockFilter('all');
                          setProdBadgeFilter('all');
                        }}
                        className="text-[#E86A92] hover:text-[#d6577e] font-semibold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        Reset All Filters
                      </button>
                    )}
                  </div>

                  {/* Bulk Actions Banner */}
                  {selectedProductIds.length > 0 && (
                    <div className="bg-pink-50 border border-pink-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs animate-in fade-in">
                      <div className="flex items-center gap-2 text-zinc-800 font-semibold">
                        <CheckSquare className="w-4 h-4 text-[#E86A92]" />
                        <span>
                          {selectedProductIds.length} of {filteredAdminProducts.length} products selected
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedProductIds([])}
                          className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 bg-white border border-zinc-200 rounded-xl font-medium cursor-pointer"
                        >
                          Deselect All
                        </button>
                        <button
                          onClick={() => setIsBulkDeleteConfirmOpen(true)}
                          className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete Selected ({selectedProductIds.length})
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Products Table */}
                  <div className="border border-zinc-100 rounded-2xl overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-50 text-zinc-600 font-bold uppercase text-[10px] border-b border-zinc-100">
                        <tr>
                          <th className="py-3.5 px-3 text-center w-10">
                            <button
                              onClick={handleToggleSelectAll}
                              className="text-zinc-500 hover:text-zinc-800 cursor-pointer"
                              title="Select/Deselect All"
                            >
                              {selectedProductIds.length > 0 && selectedProductIds.length === filteredAdminProducts.length ? (
                                <CheckSquare className="w-4 h-4 text-[#E86A92]" />
                              ) : (
                                <Square className="w-4 h-4" />
                              )}
                            </button>
                          </th>
                          <th className="py-3.5 px-4 min-w-[220px]">Product Info</th>
                          <th className="py-3.5 px-3">SKU</th>
                          <th className="py-3.5 px-3">Category</th>
                          <th className="py-3.5 px-3 min-w-[130px]">Price (৳)</th>
                          <th className="py-3.5 px-3 min-w-[150px] text-center">Stock & Units</th>
                          <th className="py-3.5 px-3 text-center min-w-[100px]">Visibility</th>
                          <th className="py-3.5 px-3 text-center min-w-[110px]">Highlights</th>
                          <th className="py-3.5 px-4 text-right min-w-[130px]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 text-zinc-800">
                        {filteredAdminProducts.length > 0 ? (
                          filteredAdminProducts.map((p) => {
                            const isSelected = selectedProductIds.includes(p.id);
                            const discountPercent =
                              p.regularPrice > p.discountPrice
                                ? Math.round(((p.regularPrice - p.discountPrice) / p.regularPrice) * 100)
                                : 0;

                            return (
                              <tr
                                key={p.id}
                                className={`transition-colors ${
                                  isSelected ? 'bg-pink-50/50' : 'hover:bg-pink-50/20'
                                }`}
                              >
                                {/* Checkbox */}
                                <td className="py-3 px-3 text-center">
                                  <button
                                    onClick={() => handleToggleSelectProduct(p.id)}
                                    className="text-zinc-400 hover:text-zinc-700 cursor-pointer"
                                  >
                                    {isSelected ? (
                                      <CheckSquare className="w-4 h-4 text-[#E86A92]" />
                                    ) : (
                                      <Square className="w-4 h-4" />
                                    )}
                                  </button>
                                </td>

                                {/* Product Image & Name */}
                                <td className="py-3 px-4 flex items-center gap-3">
                                  <div className="relative group shrink-0">
                                    <img
                                      src={p.images[0]}
                                      alt={p.name}
                                      className="w-12 h-12 rounded-xl object-cover border border-zinc-100 shadow-xs"
                                    />
                                    {p.volumeOrSize && (
                                      <span className="absolute -bottom-1 -right-1 bg-zinc-900 text-white text-[9px] font-bold px-1 rounded">
                                        {p.volumeOrSize}
                                      </span>
                                    )}
                                  </div>
                                  <div className="min-w-0 max-w-xs">
                                    <p
                                      onClick={() => handleOpenEditProduct(p)}
                                      className="font-semibold text-zinc-900 truncate hover:text-[#E86A92] cursor-pointer"
                                      title={p.name}
                                    >
                                      {p.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-[10px] text-[#E86A92] uppercase font-bold tracking-wider">
                                        {p.brand}
                                      </span>
                                      {p.countryOfOrigin && (
                                        <span className="text-[10px] text-zinc-400 font-medium">
                                          · {p.countryOfOrigin}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>

                                {/* SKU */}
                                <td className="py-3 px-3 font-mono text-[11px] text-zinc-600 whitespace-nowrap">
                                  {p.sku}
                                </td>

                                {/* Category */}
                                <td className="py-3 px-3 text-zinc-700 whitespace-nowrap">
                                  <p className="font-medium">{p.category}</p>
                                  {p.subcategory && (
                                    <p className="text-[10px] text-zinc-400 truncate">{p.subcategory}</p>
                                  )}
                                </td>

                                {/* Pricing */}
                                <td className="py-3 px-3 whitespace-nowrap">
                                  <div className="flex items-baseline gap-1.5">
                                    <span className="font-bold text-zinc-900">
                                      ৳{p.discountPrice.toLocaleString()}
                                    </span>
                                    {p.discountPrice < p.regularPrice && (
                                      <span className="text-[11px] text-zinc-400 line-through">
                                        ৳{p.regularPrice.toLocaleString()}
                                      </span>
                                    )}
                                  </div>
                                  {discountPercent > 0 && (
                                    <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded">
                                      -{discountPercent}%
                                    </span>
                                  )}
                                </td>

                                {/* Stock & Inline Adjustment */}
                                <td className="py-3 px-3 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      onClick={() => handleQuickStock(p, -1)}
                                      disabled={p.stockQuantity <= 0}
                                      className="w-6 h-6 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold text-xs cursor-pointer transition-colors"
                                      title="Subtract 1 unit"
                                    >
                                      -
                                    </button>
                                    <span
                                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold min-w-[50px] inline-block ${
                                        p.stockQuantity <= 0
                                          ? 'bg-rose-100 text-rose-800'
                                          : p.stockQuantity < 15
                                          ? 'bg-amber-100 text-amber-800'
                                          : 'bg-emerald-100 text-emerald-800'
                                      }`}
                                    >
                                      {p.stockQuantity}
                                    </span>
                                    <button
                                      onClick={() => handleQuickStock(p, 1)}
                                      className="w-6 h-6 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-xs cursor-pointer transition-colors"
                                      title="Add 1 unit"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <div className="text-[10px] text-zinc-400 mt-0.5">
                                    {p.stockQuantity <= 0
                                      ? 'Out of Stock'
                                      : p.stockQuantity < 15
                                      ? 'Low Stock'
                                      : 'In Stock'}
                                  </div>
                                </td>

                                {/* Active / Visibility Toggle */}
                                <td className="py-3 px-3 text-center">
                                  <button
                                    onClick={() => handleQuickToggle(p, 'isActive')}
                                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer inline-flex items-center gap-1 ${
                                      p.isActive !== false
                                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                        : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
                                    }`}
                                    title="Click to toggle store visibility"
                                  >
                                    {p.isActive !== false ? (
                                      <>
                                        <Check className="w-3 h-3" />
                                        <span>Active</span>
                                      </>
                                    ) : (
                                      <>
                                        <Ban className="w-3 h-3" />
                                        <span>Hidden</span>
                                      </>
                                    )}
                                  </button>
                                </td>

                                {/* Badges Toggles */}
                                <td className="py-3 px-3 text-center whitespace-nowrap">
                                  <div className="flex items-center justify-center gap-1">
                                    <button
                                      onClick={() => handleQuickToggle(p, 'isFeatured')}
                                      className={`p-1 rounded-lg transition-colors cursor-pointer ${
                                        p.isFeatured
                                          ? 'bg-amber-100 text-amber-600'
                                          : 'text-zinc-300 hover:text-zinc-500'
                                      }`}
                                      title={p.isFeatured ? 'Featured (click to remove)' : 'Mark as Featured'}
                                    >
                                      <Star className="w-3.5 h-3.5 fill-current" />
                                    </button>
                                    <button
                                      onClick={() => handleQuickToggle(p, 'isBestSeller')}
                                      className={`p-1 rounded-lg transition-colors cursor-pointer ${
                                        p.isBestSeller
                                          ? 'bg-rose-100 text-rose-600'
                                          : 'text-zinc-300 hover:text-zinc-500'
                                      }`}
                                      title={p.isBestSeller ? 'Best Seller (click to remove)' : 'Mark as Best Seller'}
                                    >
                                      <Flame className="w-3.5 h-3.5 fill-current" />
                                    </button>
                                    <button
                                      onClick={() => handleQuickToggle(p, 'isNewArrival')}
                                      className={`p-1 rounded-lg transition-colors cursor-pointer ${
                                        p.isNewArrival
                                          ? 'bg-purple-100 text-purple-600'
                                          : 'text-zinc-300 hover:text-zinc-500'
                                      }`}
                                      title={p.isNewArrival ? 'New Arrival (click to remove)' : 'Mark as New Arrival'}
                                    >
                                      <Sparkles className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>

                                {/* Actions: Quick View, Edit, Delete */}
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <button
                                      onClick={() => setQuickViewProduct(p)}
                                      className="p-1.5 text-zinc-500 hover:text-[#E86A92] hover:bg-pink-50 rounded-lg transition-colors cursor-pointer"
                                      title="Live Preview / Quick View"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleOpenEditProduct(p)}
                                      className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                                      title="Edit Product"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => setDeleteConfirmProduct(p)}
                                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                      title="Delete Product"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={9} className="py-12 text-center text-zinc-500">
                              <Package className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
                              <p className="font-semibold text-zinc-800">No beauty products found</p>
                              <p className="text-xs text-zinc-400 mt-1">
                                Try changing your search query or reset active filters.
                              </p>
                              <div className="mt-4 flex items-center justify-center gap-2">
                                <button
                                  onClick={() => {
                                    setProdSearch('');
                                    setProdCategoryFilter('all');
                                    setProdBrandFilter('all');
                                    setProdStockFilter('all');
                                    setProdBadgeFilter('all');
                                  }}
                                  className="px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold rounded-xl cursor-pointer"
                                >
                                  Clear Filters
                                </button>
                                <button
                                  onClick={handleOpenAddProduct}
                                  className="px-3.5 py-1.5 bg-[#E86A92] text-white text-xs font-semibold rounded-xl cursor-pointer"
                                >
                                  + Add New Product
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Catalog Footer Info */}
                  <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-100 gap-2">
                    <p>
                      Showing <span className="font-bold text-zinc-800">{filteredAdminProducts.length}</span> of{' '}
                      <span className="font-bold text-zinc-800">{products.length}</span> total beauty products in database
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      Changes persist instantly to localStorage & live storefront.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ORDERS MANAGEMENT */}
            {activeAdminTab === 'orders' && (
              <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-xl font-bold text-zinc-900">
                      Order Management ({filteredOrders.length})
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Track payment verification, dispatch couriers, and generate printable tax invoices
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="bg-zinc-50 border border-zinc-200 text-xs px-3 py-2 rounded-xl outline-hidden focus:border-[#E86A92]"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search by order or phone..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="bg-zinc-50 border border-zinc-200 text-xs pl-3 pr-8 py-2 rounded-xl outline-hidden focus:border-[#E86A92]"
                      />
                      <Search className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-2.5" />
                    </div>
                  </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                  {filteredOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="border border-zinc-200 rounded-2xl p-5 space-y-3 hover:border-pink-200 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-zinc-900">
                              Order #{ord.orderNumber}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                ord.status === 'delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : ord.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-pink-100 text-[#E86A92]'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Customer: <span className="font-semibold text-zinc-800">{ord.customerName}</span> ({ord.customerPhone}) · {ord.cityArea}, {ord.district}
                          </p>
                          <p className="text-[11px] text-zinc-400">
                            Payment Method: <span className="uppercase font-bold text-zinc-700">{ord.paymentMethod}</span> ({ord.paymentStatus}) {ord.transactionId && `· TrxID: ${ord.transactionId}`}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedInvoiceOrder(ord)}
                            className="bg-zinc-900 hover:bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5 text-pink-400" />
                            Print Invoice
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-600 bg-zinc-50/50 p-3 rounded-xl">
                        {ord.items.map((item, i) => (
                          <div key={i} className="flex justify-between">
                            <span>
                              {item.productName} × {item.quantity}
                            </span>
                            <span className="font-semibold text-zinc-900">
                              ৳{item.total.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Status Update Controls */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-semibold text-zinc-600">Update Status:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="bg-white border border-zinc-300 text-xs px-2.5 py-1 rounded-lg outline-hidden focus:border-[#E86A92] cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>

                        <div className="text-right text-xs">
                          <span className="text-zinc-500">Total: </span>
                          <span className="font-bold text-sm text-[#E86A92]">
                            ৳{ord.total.toLocaleString()} BDT
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: CATEGORIES & BRANDS */}
            {activeAdminTab === 'categories' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Categories */}
                <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="font-display text-lg font-bold text-zinc-900">
                    Product Categories ({categories.length})
                  </h3>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (newCatName.trim()) {
                        createCategory({
                          name: newCatName.trim(),
                          slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
                          image:
                            'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
                          subcategories: ['All Products']
                        });
                        setNewCatName('');
                      }
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      placeholder="New category name..."
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      className="flex-1 bg-zinc-50 border border-zinc-200 text-xs px-3 py-2 rounded-xl outline-hidden focus:border-[#E86A92]"
                    />
                    <button
                      type="submit"
                      className="bg-[#E86A92] text-white text-xs font-bold px-4 py-2 rounded-xl"
                    >
                      Add
                    </button>
                  </form>

                  <div className="divide-y divide-zinc-100 max-h-96 overflow-y-auto pr-1">
                    {categories.map((c) => (
                      <div key={c.id} className="py-2.5 flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-900">{c.name}</span>
                        <span className="text-zinc-400">/{c.slug}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="font-display text-lg font-bold text-zinc-900">
                    Beauty Brands ({brands.length})
                  </h3>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (newBrandName.trim()) {
                        createBrand({
                          name: newBrandName.trim(),
                          slug: newBrandName.toLowerCase().replace(/\s+/g, '-'),
                          country: newBrandCountry,
                          logo:
                            'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=200&q=80'
                        });
                        setNewBrandName('');
                      }
                    }}
                    className="space-y-2"
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Brand name..."
                        value={newBrandName}
                        onChange={(e) => setNewBrandName(e.target.value)}
                        className="flex-1 bg-zinc-50 border border-zinc-200 text-xs px-3 py-2 rounded-xl outline-hidden focus:border-[#E86A92]"
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        value={newBrandCountry}
                        onChange={(e) => setNewBrandCountry(e.target.value)}
                        className="w-28 bg-zinc-50 border border-zinc-200 text-xs px-3 py-2 rounded-xl outline-hidden focus:border-[#E86A92]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#222222] hover:bg-black text-white text-xs font-bold py-2 rounded-xl"
                    >
                      Register New Brand
                    </button>
                  </form>

                  <div className="divide-y divide-zinc-100 max-h-80 overflow-y-auto pr-1">
                    {brands.map((b) => (
                      <div key={b.id} className="py-2.5 flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-900">{b.name}</span>
                        <span className="text-zinc-500 font-medium">{b.country}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: REVIEWS MODERATION */}
            {activeAdminTab === 'reviews' && (
              <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-4">
                <h2 className="font-display text-xl font-bold text-zinc-900">
                  Customer Review Moderation ({reviews.length})
                </h2>
                <div className="divide-y divide-zinc-100">
                  {reviews.map((r) => (
                    <div key={r.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-900">{r.customerName}</span>
                          <span className="text-amber-500 font-bold">★ {r.rating}.0</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              r.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-100 text-zinc-600'
                            }`}
                          >
                            {r.isApproved ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                        <p className="font-semibold text-zinc-800">&ldquo;{r.title}&rdquo;</p>
                        <p className="text-zinc-600 italic">{r.comment}</p>
                        <p className="text-[10px] text-zinc-400">Product: {r.productName}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {!r.isApproved ? (
                          <button
                            onClick={() => approveReview(r.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Approve
                          </button>
                        ) : (
                          <button
                            onClick={() => rejectReview(r.id)}
                            className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => deleteReview(r.id)}
                          className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: COUPONS */}
            {activeAdminTab === 'coupons' && (
              <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-xl font-bold text-zinc-900">
                      Coupon Management ({coupons.length})
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Create promotional campaigns and set minimum spend rules
                    </p>
                  </div>
                </div>

                {/* Create Coupon Form */}
                <form
                  onSubmit={handleCreateCoupon}
                  className="bg-pink-50/40 p-4 rounded-2xl border border-pink-200 space-y-3"
                >
                  <h4 className="text-xs font-bold text-zinc-900 uppercase">Create New Coupon</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <input
                      type="text"
                      placeholder="Code (e.g. FLASH20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="bg-white border border-zinc-200 text-xs px-3 py-2 rounded-xl outline-hidden font-mono font-bold"
                    />
                    <select
                      value={couponType}
                      onChange={(e) => setCouponType(e.target.value as any)}
                      className="bg-white border border-zinc-200 text-xs px-3 py-2 rounded-xl outline-hidden"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed BDT (৳)</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Discount Value"
                      value={couponValue}
                      onChange={(e) => setCouponValue(Number(e.target.value))}
                      className="bg-white border border-zinc-200 text-xs px-3 py-2 rounded-xl outline-hidden"
                    />
                    <input
                      type="number"
                      placeholder="Min Order (৳)"
                      value={couponMinSpend}
                      onChange={(e) => setCouponMinSpend(Number(e.target.value))}
                      className="bg-white border border-zinc-200 text-xs px-3 py-2 rounded-xl outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#E86A92] hover:bg-[#d6577e] text-white text-xs font-bold px-5 py-2 rounded-xl"
                  >
                    Save & Activate Coupon
                  </button>
                </form>

                <div className="divide-y divide-zinc-100">
                  {coupons.map((c) => (
                    <div key={c.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#E86A92] text-sm">{c.code}</span>
                        <p className="text-zinc-500 text-[11px]">
                          {c.discountType === 'percentage' ? `${c.discountValue}% Off` : `৳${c.discountValue} Off`} · Min spend: ৳{c.minOrderAmount} · Used {c.usedCount} times
                        </p>
                      </div>
                      <button
                        onClick={() => toggleCouponStatus(c.id)}
                        className={`text-xs px-3 py-1 rounded-full font-bold cursor-pointer ${
                          c.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-zinc-200 text-zinc-600'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: CUSTOMERS */}
            {activeAdminTab === 'customers' && (
              <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-4">
                <h2 className="font-display text-xl font-bold text-zinc-900">
                  Registered Customers
                </h2>
                <div className="divide-y divide-zinc-100 text-xs">
                  {[
                    { name: 'Maria Afrin', email: 'mariaafrin1106@gmail.com', phone: '01789123456', district: 'Dhaka', orders: 4, spent: 8850 },
                    { name: 'Sadia Rahman', email: 'sadia.rahman@example.com', phone: '01812345678', district: 'Chittagong', orders: 2, spent: 4440 },
                    { name: 'Farhana Islam', email: 'farhana.i@example.com', phone: '01999887766', district: 'Dhaka', orders: 1, spent: 2900 }
                  ].map((cust, i) => (
                    <div key={i} className="py-3.5 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-zinc-900">{cust.name}</p>
                        <p className="text-zinc-500">{cust.email} · {cust.phone} · {cust.district}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-zinc-900">৳{cust.spent.toLocaleString()} spent</span>
                        <p className="text-[11px] text-zinc-400">{cust.orders} lifetime orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: STORE SETTINGS */}
            {activeAdminTab === 'settings' && (
              <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-zinc-900">
                    Store Delivery & Operations Settings
                  </h2>
                  <p className="text-xs text-zinc-500">Configure Bangladesh shipping rates and merchant mobile accounts</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">
                      Inside Dhaka Delivery Fee (৳)
                    </label>
                    <input
                      type="number"
                      value={settings.deliveryInsideDhaka}
                      onChange={(e) =>
                        updateSettings({ deliveryInsideDhaka: Number(e.target.value) })
                      }
                      className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">
                      Outside Dhaka Delivery Fee (৳)
                    </label>
                    <input
                      type="number"
                      value={settings.deliveryOutsideDhaka}
                      onChange={(e) =>
                        updateSettings({ deliveryOutsideDhaka: Number(e.target.value) })
                      }
                      className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">
                      Free Delivery Spend Threshold (৳)
                    </label>
                    <input
                      type="number"
                      value={settings.freeDeliveryThreshold}
                      onChange={(e) =>
                        updateSettings({ freeDeliveryThreshold: Number(e.target.value) })
                      }
                      className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">
                      Customer Service Hotline
                    </label>
                    <input
                      type="text"
                      value={settings.hotline}
                      onChange={(e) => updateSettings({ hotline: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">
                      bKash Merchant Account Number
                    </label>
                    <input
                      type="text"
                      value={settings.bkashMerchantNumber}
                      onChange={(e) => updateSettings({ bkashMerchantNumber: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl outline-hidden font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">
                      Nagad Merchant Account Number
                    </label>
                    <input
                      type="text"
                      value={settings.nagadMerchantNumber}
                      onChange={(e) => updateSettings({ nagadMerchantNumber: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl outline-hidden font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 1. Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 overflow-y-auto max-h-[92vh] space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-display text-lg font-bold text-zinc-900">
                  {editingProductId ? 'Edit Beauty Product' : 'Add New Beauty Product'}
                </h3>
                <p className="text-xs text-zinc-500">
                  Fill in authentic product specs, prices in BDT, and inventory stock
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Product Title */}
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">
                  Product Title / Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  className="w-full border border-zinc-200 p-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                  placeholder="e.g. Advanced Snail 96 Mucin Power Essence"
                />
              </div>

              {/* Brand & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Brand</label>
                  <select
                    value={prodForm.brand}
                    onChange={(e) => setProdForm({ ...prodForm, brand: e.target.value })}
                    className="w-full border border-zinc-200 p-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Category</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => {
                      const newCat = e.target.value;
                      const catObj = categories.find((c) => c.name === newCat);
                      setProdForm({
                        ...prodForm,
                        category: newCat,
                        subcategory: catObj?.subcategories[0] || 'General'
                      });
                    }}
                    className="w-full border border-zinc-200 p-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subcategory & SKU with Generator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Subcategory</label>
                  <select
                    value={prodForm.subcategory}
                    onChange={(e) => setProdForm({ ...prodForm, subcategory: e.target.value })}
                    className="w-full border border-zinc-200 p-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                  >
                    {(categories.find((c) => c.name === prodForm.category)?.subcategories || [
                      'Serums & Ampoules',
                      'Moisturizers',
                      'Cleansers',
                      'General'
                    ]).map((sub, i) => (
                      <option key={i} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-zinc-700">SKU Code</label>
                    <button
                      type="button"
                      onClick={() =>
                        setProdForm({
                          ...prodForm,
                          sku: `GLW-${Math.floor(1000 + Math.random() * 9000)}`
                        })
                      }
                      className="text-[#E86A92] hover:underline text-[11px] font-semibold"
                    >
                      ⚡ Auto-Generate
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={prodForm.sku}
                    onChange={(e) => setProdForm({ ...prodForm, sku: e.target.value.toUpperCase() })}
                    className="w-full border border-zinc-200 p-2.5 rounded-xl outline-hidden font-mono focus:border-[#E86A92]"
                    placeholder="GLW-8492"
                  />
                </div>
              </div>

              {/* Prices & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Regular Price (৳)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={prodForm.regularPrice}
                    onChange={(e) =>
                      setProdForm({ ...prodForm, regularPrice: Number(e.target.value) })
                    }
                    className="w-full border border-zinc-200 p-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-zinc-700">Discount Price (৳)</label>
                    {prodForm.regularPrice > prodForm.discountPrice && (
                      <span className="text-[10px] text-[#E86A92] font-bold">
                        -{Math.round(((prodForm.regularPrice - prodForm.discountPrice) / prodForm.regularPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    required
                    min={0}
                    value={prodForm.discountPrice}
                    onChange={(e) =>
                      setProdForm({ ...prodForm, discountPrice: Number(e.target.value) })
                    }
                    className="w-full border border-zinc-200 p-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={prodForm.stockQuantity}
                    onChange={(e) =>
                      setProdForm({ ...prodForm, stockQuantity: Number(e.target.value) })
                    }
                    className="w-full border border-zinc-200 p-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                  />
                </div>
              </div>

              {/* Volume/Size & Country of Origin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Volume / Size</label>
                  <input
                    type="text"
                    value={prodForm.volumeOrSize}
                    onChange={(e) => setProdForm({ ...prodForm, volumeOrSize: e.target.value })}
                    className="w-full border border-zinc-200 p-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                    placeholder="e.g. 100ml, 50ml, 30g"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Country of Origin</label>
                  <select
                    value={prodForm.countryOfOrigin}
                    onChange={(e) => setProdForm({ ...prodForm, countryOfOrigin: e.target.value })}
                    className="w-full border border-zinc-200 p-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                  >
                    <option value="South Korea">🇰🇷 South Korea (K-Beauty)</option>
                    <option value="Japan">🇯🇵 Japan (J-Beauty)</option>
                    <option value="United States">🇺🇸 United States</option>
                    <option value="France">🇫🇷 France</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="Bangladesh">🇧🇩 Bangladesh</option>
                  </select>
                </div>
              </div>

              {/* Product Image URL & One-Click Presets */}
              <div className="space-y-2">
                <label className="block font-semibold text-zinc-700">
                  Primary Image URL & One-Click Presets
                </label>
                <div className="flex gap-3 items-center">
                  <div className="w-14 h-14 rounded-xl border border-zinc-200 overflow-hidden shrink-0 bg-zinc-50 flex items-center justify-center">
                    {prodForm.image ? (
                      <img
                        src={prodForm.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                    ) : (
                      <Package className="w-6 h-6 text-zinc-300" />
                    )}
                  </div>
                  <input
                    type="url"
                    required
                    value={prodForm.image}
                    onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                    className="flex-1 border border-zinc-200 p-2.5 rounded-xl outline-hidden font-mono text-[11px] focus:border-[#E86A92]"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-zinc-400 font-medium">Quick Presets:</span>
                  {BEAUTY_IMAGE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setProdForm({ ...prodForm, image: preset.url })}
                      className="px-2 py-0.5 rounded-lg bg-zinc-100 hover:bg-pink-100 hover:text-[#E86A92] text-zinc-700 text-[10px] font-medium transition-colors cursor-pointer"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Product Description</label>
                <textarea
                  rows={2}
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full border border-zinc-200 p-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                  placeholder="Detailed product benefits and texture information..."
                />
              </div>

              {/* Ingredients & Usage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Key Ingredients</label>
                  <input
                    type="text"
                    value={prodForm.ingredients}
                    onChange={(e) => setProdForm({ ...prodForm, ingredients: e.target.value })}
                    className="w-full border border-zinc-200 p-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                    placeholder="e.g. Niacinamide, Hyaluronic Acid, Centella"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">How to Use</label>
                  <input
                    type="text"
                    value={prodForm.usageInstructions}
                    onChange={(e) => setProdForm({ ...prodForm, usageInstructions: e.target.value })}
                    className="w-full border border-zinc-200 p-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                    placeholder="e.g. Apply 2-3 drops morning and night"
                  />
                </div>
              </div>

              {/* Status and Badges */}
              <div className="bg-zinc-50 border border-zinc-200 p-3.5 rounded-2xl flex flex-wrap gap-5">
                <label className="flex items-center gap-2 text-zinc-800 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isActive}
                    onChange={(e) => setProdForm({ ...prodForm, isActive: e.target.checked })}
                    className="rounded text-[#E86A92] focus:ring-[#E86A92]"
                  />
                  <span>Active / Visible in Store</span>
                </label>

                <label className="flex items-center gap-2 text-zinc-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isFeatured}
                    onChange={(e) => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                    className="rounded text-[#E86A92] focus:ring-[#E86A92]"
                  />
                  <span>Featured Product</span>
                </label>

                <label className="flex items-center gap-2 text-zinc-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isBestSeller}
                    onChange={(e) => setProdForm({ ...prodForm, isBestSeller: e.target.checked })}
                    className="rounded text-[#E86A92] focus:ring-[#E86A92]"
                  />
                  <span>Best Seller</span>
                </label>

                <label className="flex items-center gap-2 text-zinc-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isNewArrival}
                    onChange={(e) => setProdForm({ ...prodForm, isNewArrival: e.target.checked })}
                    className="rounded text-[#E86A92] focus:ring-[#E86A92]"
                  />
                  <span>New Arrival</span>
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-2.5 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 border border-zinc-200 text-zinc-600 rounded-xl hover:bg-zinc-100 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#E86A92] hover:bg-[#d6577e] text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
                >
                  {editingProductId ? 'Update Product' : 'Save & Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Single Product Delete Confirmation Modal */}
      {deleteConfirmProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="font-display text-lg font-bold text-zinc-900">
                Delete This Product?
              </h3>
              <p className="text-xs text-zinc-500">
                This will permanently remove the item from the catalog, search, and store shelves.
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 p-3 rounded-2xl flex items-center gap-3">
              <img
                src={deleteConfirmProduct.images[0]}
                alt={deleteConfirmProduct.name}
                className="w-12 h-12 rounded-xl object-cover border border-zinc-100 shrink-0"
              />
              <div className="min-w-0 text-left">
                <p className="font-bold text-zinc-900 text-xs truncate">
                  {deleteConfirmProduct.name}
                </p>
                <p className="text-[11px] text-zinc-500 font-mono">
                  {deleteConfirmProduct.sku} · {deleteConfirmProduct.brand}
                </p>
                <p className="text-xs font-bold text-[#E86A92]">
                  ৳{deleteConfirmProduct.discountPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmProduct(null)}
                className="flex-1 px-4 py-2.5 border border-zinc-200 text-zinc-700 rounded-xl hover:bg-zinc-100 font-semibold text-xs cursor-pointer"
              >
                Keep Product
              </button>
              <button
                type="button"
                onClick={handleConfirmSingleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                Yes, Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Bulk Delete Confirmation Modal */}
      {isBulkDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="font-display text-lg font-bold text-zinc-900">
                Delete {selectedProductIds.length} Products?
              </h3>
              <p className="text-xs text-zinc-500">
                Are you sure you want to permanently delete these {selectedProductIds.length} selected products from your catalog?
              </p>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsBulkDeleteConfirmOpen(false)}
                className="flex-1 px-4 py-2.5 border border-zinc-200 text-zinc-700 rounded-xl hover:bg-zinc-100 font-semibold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBulkDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                Delete Selected ({selectedProductIds.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Restore Defaults Confirmation Modal */}
      {isRestoreConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#E86A92] flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="font-display text-lg font-bold text-zinc-900">
                Restore Default Catalog?
              </h3>
              <p className="text-xs text-zinc-500">
                This will reset your products catalog back to the 32 authentic Korean & global beauty products with full specs and Bangladesh pricing.
              </p>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsRestoreConfirmOpen(false)}
                className="flex-1 px-4 py-2.5 border border-zinc-200 text-zinc-700 rounded-xl hover:bg-zinc-100 font-semibold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRestore}
                className="flex-1 px-4 py-2.5 bg-[#E86A92] hover:bg-[#d6577e] text-white rounded-xl font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                Restore 32 Products
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
