import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { InvoiceModal } from '../components/InvoiceModal';
import { Order } from '../types';
import { BANGLADESH_DISTRICTS } from '../data/mockData';
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  Lock,
  Tag,
  LogOut,
  ShoppingBag,
  Printer,
  Truck,
  Copy,
  CheckCircle2,
  Trash2,
  LayoutDashboard
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    login,
    logout,
    orders,
    wishlist,
    products,
    removeFromCart,
    moveWishlistToCart,
    toggleWishlist,
    coupons,
    navigateTo,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'password' | 'coupons'>('orders');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Login / Register state for guest
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // Password change state
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const customerOrders = orders.filter(
    (o) => !currentUser || o.customerEmail === currentUser.email || o.customerPhone === currentUser.phone
  );

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(authEmail || 'mariaafrin1106@gmail.com');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    showToast('Password changed successfully.', 'success');
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
  };

  const copyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Coupon "${code}" copied to clipboard!`, 'success');
  };

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white border border-[#F8E8EE] rounded-3xl p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-pink-50 text-[#E86A92] flex items-center justify-center mx-auto">
              <UserIcon className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl font-bold text-zinc-900">
              {authMode === 'login' ? 'Customer Sign In' : 'Create an Account'}
            </h1>
            <p className="text-xs text-zinc-500">
              {authMode === 'login'
                ? 'Sign in to access your orders, track shipments and redeem coupons.'
                : 'Join GlowAura for free delivery vouchers and member discounts.'}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Afrin"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
              />
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="017XXXXXXXX"
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E86A92] hover:bg-[#d6577e] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              {authMode === 'login' ? 'Sign In to Account' : 'Register Now'}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-zinc-600">
            {authMode === 'login' ? (
              <p>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => setAuthMode('register')}
                  className="text-[#E86A92] font-bold hover:underline"
                >
                  Create one here
                </button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="text-[#E86A92] font-bold hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-zinc-100 text-center space-y-2">
            <p className="text-[11px] text-zinc-500">Store Manager or Administrator?</p>
            <button
              onClick={() => navigateTo('admin')}
              className="w-full bg-zinc-900 hover:bg-black text-white text-xs font-semibold py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-pink-400" />
              <span>Go to Admin Dashboard (/admin)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Account Header */}
      <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-200 bg-pink-50 shrink-0">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-zinc-900">{currentUser.name}</h1>
              <span className="bg-pink-100 text-[#E86A92] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">{currentUser.email} · {currentUser.phone}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{currentUser.defaultAddress}, {currentUser.defaultDistrict}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="self-start sm:self-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-zinc-500" />
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-white border border-[#F8E8EE] rounded-2xl p-3 shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'orders' ? 'bg-pink-50 text-[#E86A92]' : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                My Orders
              </span>
              <span className="text-[11px] font-bold">({customerOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'wishlist' ? 'bg-pink-50 text-[#E86A92]' : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                My Wishlist
              </span>
              <span className="text-[11px] font-bold">({wishlistProducts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'coupons' ? 'bg-pink-50 text-[#E86A92]' : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Promo Coupons
              </span>
              <span className="text-[11px] font-bold">({coupons.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'addresses' ? 'bg-pink-50 text-[#E86A92]' : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Saved Addresses
              </span>
            </button>

            <button
              onClick={() => setActiveTab('password')}
              className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'password' ? 'bg-pink-50 text-[#E86A92]' : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Change Password
              </span>
            </button>

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin')}
                className="w-full text-left text-xs font-bold px-3 py-2.5 rounded-xl flex items-center gap-2 text-[#E86A92] bg-pink-50 hover:bg-pink-100 transition-colors cursor-pointer mt-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin Dashboard (/admin)</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-zinc-900">
                Order History & Invoices
              </h2>

              {customerOrders.length === 0 ? (
                <div className="bg-white border border-[#F8E8EE] rounded-3xl p-10 text-center space-y-3">
                  <Package className="w-12 h-12 text-zinc-300 mx-auto" />
                  <p className="font-semibold text-zinc-700 text-sm">No orders placed yet</p>
                  <p className="text-xs text-zinc-400">Your future shipments will appear right here.</p>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="bg-[#E86A92] text-white px-5 py-2 rounded-xl text-xs font-bold"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {customerOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white border border-[#F8E8EE] rounded-2xl p-5 shadow-xs space-y-4"
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
                                  : 'bg-pink-100 text-[#E86A92]'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-0.5">
                            Placed on {ord.date} · Payment:{' '}
                            <span className="uppercase font-semibold text-zinc-700">
                              {ord.paymentMethod}
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedInvoiceOrder(ord)}
                            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5 text-[#E86A92]" />
                            Invoice
                          </button>

                          <button
                            onClick={() => navigateTo('order-tracking', ord.orderNumber)}
                            className="bg-[#E86A92] hover:bg-[#d6577e] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            Track
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-zinc-50">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="py-2 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-10 h-10 rounded-lg object-cover border border-zinc-100"
                              />
                              <div>
                                <p className="font-semibold text-zinc-900">{item.productName}</p>
                                <p className="text-zinc-400 text-[11px]">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-bold text-zinc-800">
                              ৳{item.total.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-900">
                        <span>Total Paid / Payable:</span>
                        <span className="text-[#E86A92] text-sm">৳{ord.total.toLocaleString()} BDT</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-zinc-900">
                My Saved Wishlist ({wishlistProducts.length})
              </h2>

              {wishlistProducts.length === 0 ? (
                <div className="bg-white border border-[#F8E8EE] rounded-3xl p-10 text-center space-y-3">
                  <Heart className="w-12 h-12 text-zinc-300 mx-auto" />
                  <p className="font-semibold text-zinc-700 text-sm">Your wishlist is empty</p>
                  <p className="text-xs text-zinc-400">Save products to revisit or purchase later.</p>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="bg-[#E86A92] text-white px-5 py-2 rounded-xl text-xs font-bold"
                  >
                    Discover Products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white border border-[#F8E8EE] rounded-2xl p-4 flex gap-3 shadow-xs items-center justify-between"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-16 h-16 rounded-xl object-cover border border-zinc-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase font-bold text-[#E86A92]">{p.brand}</p>
                        <h4
                          onClick={() => navigateTo('product-detail', p.slug)}
                          className="text-xs font-semibold text-zinc-900 line-clamp-1 hover:text-[#E86A92] cursor-pointer"
                        >
                          {p.name}
                        </h4>
                        <p className="text-xs font-bold text-zinc-900 mt-1">
                          ৳{(p.discountPrice || p.regularPrice).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5 shrink-0">
                        <button
                          onClick={() => moveWishlistToCart(p.id)}
                          className="bg-[#E86A92] hover:bg-[#d6577e] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move</span>
                        </button>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="text-zinc-400 hover:text-red-500 text-center text-xs p-1"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5 mx-auto" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Coupons Tab */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-zinc-900">
                Available Discount Coupons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coupons.map((c) => (
                  <div
                    key={c.id}
                    className="bg-gradient-to-r from-pink-50 to-white border border-pink-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-base font-extrabold text-[#E86A92] tracking-wider">
                          {c.code}
                        </span>
                        <span className="bg-pink-100 text-[#E86A92] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `৳${c.discountValue} OFF`}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 mt-1">
                        Min spend: ৳{c.minOrderAmount.toLocaleString()}
                        {c.maxDiscount && ` · Max discount: ৳${c.maxDiscount.toLocaleString()}`}
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">Expires: {c.expiryDate}</p>
                    </div>

                    <button
                      onClick={() => copyCoupon(c.code)}
                      className="w-full bg-white hover:bg-pink-50 border border-pink-300 text-[#E86A92] text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy Promo Code
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-zinc-900">
                Saved Delivery Address
              </h2>
              <div className="bg-white border border-[#F8E8EE] rounded-2xl p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-pink-100 text-[#E86A92] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Primary Home Address
                  </span>
                  <span className="text-xs text-emerald-600 font-semibold">Active</span>
                </div>
                <h4 className="font-bold text-sm text-zinc-900">{currentUser.name}</h4>
                <p className="text-xs text-zinc-600">{currentUser.defaultAddress}</p>
                <p className="text-xs text-zinc-600">
                  {currentUser.defaultDistrict}, Bangladesh
                </p>
                <p className="text-xs text-zinc-600 font-mono">Mobile: {currentUser.phone}</p>
              </div>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-zinc-900">
                Change Account Password
              </h2>
              <form
                onSubmit={handlePasswordChange}
                className="bg-white border border-[#F8E8EE] rounded-2xl p-6 shadow-xs space-y-4 max-w-md"
              >
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#E86A92] hover:bg-[#d6577e] text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-colors cursor-pointer"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
