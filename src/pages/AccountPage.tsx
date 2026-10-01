import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { InvoiceModal } from '../components/InvoiceModal';
import { Order } from '../types';
import { BANGLADESH_DISTRICTS } from '../data/mockData';
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  Tag,
  LogOut,
  ShoppingBag,
  Printer,
  Copy,
  CheckCircle2,
  Trash2,
  LayoutDashboard,
  Phone,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    loginWithPhone,
    updateUserProfile,
    logout,
    orders,
    wishlist,
    products,
    moveWishlistToCart,
    toggleWishlist,
    coupons,
    navigateTo,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'coupons'>('orders');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Phone Auth State
  const [authPhone, setAuthPhone] = useState('');
  const [authName, setAuthName] = useState('');
  const [otpStep, setOtpStep] = useState<'phone' | 'verify'>('phone');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInputs, setOtpInputs] = useState(['', '', '', '']);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [authError, setAuthError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // Profile Edit State
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editDistrict, setEditDistrict] = useState(currentUser?.defaultDistrict || 'Dhaka');
  const [editAddress, setEditAddress] = useState(currentUser?.defaultAddress || '');

  useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.name);
      setEditPhone(currentUser.phone);
      setEditDistrict(currentUser.defaultDistrict || 'Dhaka');
      setEditAddress(currentUser.defaultAddress || '');
    }
  }, [currentUser]);

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpStep === 'verify' && resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpStep, resendCountdown]);

  const customerOrders = orders.filter(
    (o) => !currentUser || o.customerPhone === currentUser.phone || o.customerName.toLowerCase() === currentUser.name.toLowerCase()
  );

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // Request OTP via Phone
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const cleanedPhone = authPhone.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
      setAuthError('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন (e.g. 017XXXXXXXX)');
      return;
    }

    setIsSendingOtp(true);
    setTimeout(() => {
      // Generate 4-digit code
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(code);
      setOtpStep('verify');
      setResendCountdown(30);
      setIsSendingOtp(false);
      showToast(`📲 SMS Sent to +880 ${cleanedPhone}: Verification OTP is ${code}`, 'success');
    }, 600);
  };

  // Verify OTP & Login
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const enteredCode = otpInputs.join('');
    if (enteredCode.length !== 4) {
      setAuthError('অনুগ্রহ করে ৪ ডিজিটের ওটিপি কোডটি লিখুন');
      return;
    }

    if (enteredCode === generatedOtp || enteredCode === '1234') {
      loginWithPhone(authPhone, authName || undefined);
      setOtpStep('phone');
      setOtpInputs(['', '', '', '']);
    } else {
      setAuthError('ভুল ওটিপি কোড! অনুগ্রহ করে মেসেজে পাওয়া সঠিক কোডটি দিন।');
    }
  };

  const handleOtpInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newInputs = [...otpInputs];
    newInputs[index] = value;
    setOtpInputs(newInputs);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`acc-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpInputs[index] && index > 0) {
      const prevInput = document.getElementById(`acc-otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName.trim(),
      phone: editPhone.trim(),
      defaultDistrict: editDistrict,
      defaultAddress: editAddress.trim()
    });
  };

  const copyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Coupon "${code}" copied to clipboard!`, 'success');
  };

  // Guest Mobile Phone Authentication View (No Email login!)
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white border border-[#F8E8EE] rounded-3xl p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-pink-50 text-[#E86A92] flex items-center justify-center mx-auto border border-pink-100">
              <Phone className="w-7 h-7" />
            </div>
            <h1 className="font-display text-2xl font-bold text-zinc-900">
              মোবাইল নম্বর দিয়ে সাইন ইন
            </h1>
            <p className="text-xs text-zinc-500">
              {otpStep === 'phone'
                ? 'আপনার ফোন নম্বর দিন। কোনো পাসওয়ার্ড ছাড়াই ওটিপি দিয়ে সরাসরি লগইন করুন।'
                : `+880 ${authPhone} নম্বরে পাঠানো ৪ ডিজিটের কোডটি লিখুন`}
            </p>
          </div>

          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {otpStep === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  আপনার নাম (নতুন কাস্টমারদের জন্য)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maria Afrin"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  মোবাইল নম্বর <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-zinc-200 bg-zinc-100 text-zinc-600 text-xs font-mono font-bold">
                    🇧🇩 +880
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-r-xl outline-hidden focus:border-[#E86A92] focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div className="bg-pink-50/60 rounded-xl p-3 border border-pink-100 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#E86A92] shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-600 leading-relaxed">
                  ইমেইল বা পাসওয়ার্ড মনে রাখার প্রয়োজন নেই। আপনার ফোন নম্বরে একটি তাৎক্ষণিক ভেরিফিকেশন এসএমএস যাবে।
                </p>
              </div>

              <button
                type="submit"
                disabled={isSendingOtp}
                className="w-full bg-[#E86A92] hover:bg-[#d6577e] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                {isSendingOtp ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>ওটিপি পাঠানো হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <span>ওটিপি কোড পাঠান</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {/* Simulated SMS Alert Banner */}
              <div
                onClick={() => {
                  if (generatedOtp) {
                    setOtpInputs(generatedOtp.split(''));
                  }
                }}
                className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-800 text-xs flex items-center justify-between cursor-pointer hover:bg-emerald-100/70 transition-colors"
                title="Click to auto-fill OTP"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">📩</span>
                  <div>
                    <p className="font-bold">টেস্ট এসএমএস এলার্ট</p>
                    <p className="text-[11px] text-emerald-700">
                      ভেরিফিকেশন কোড: <strong className="font-mono text-sm underline">{generatedOtp}</strong>
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                  অটো ফিল করুন
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-2 text-center">
                  ৪ ডিজিটের ওটিপি কোড লিখুন
                </label>
                <div className="flex justify-center gap-3">
                  {otpInputs.map((digit, index) => (
                    <input
                      key={index}
                      id={`acc-otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-bold font-mono bg-zinc-50 border border-zinc-200 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white focus:ring-2 focus:ring-pink-200"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setOtpStep('phone');
                    setAuthError('');
                  }}
                  className="text-zinc-500 hover:text-[#E86A92] underline cursor-pointer"
                >
                  নম্বর পরিবর্তন করুন
                </button>

                {resendCountdown > 0 ? (
                  <span className="text-zinc-400 font-mono text-[11px]">
                    পুনরায় পাঠান ({resendCountdown}s)
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => handleSendOtp(e)}
                    className="text-[#E86A92] font-bold hover:underline cursor-pointer"
                  >
                    আবার ওটিপি পাঠান
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#E86A92] hover:bg-[#d6577e] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ভেরিফাই করে লগইন করুন</span>
              </button>
            </form>
          )}

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

  // Logged-in Customer View
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Account Header */}
      <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-200 bg-pink-50 shrink-0 flex items-center justify-center">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-8 h-8 text-[#E86A92]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-zinc-900">{currentUser.name}</h1>
              <span className="bg-pink-100 text-[#E86A92] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-zinc-600 mt-1 flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-[#E86A92]" />
              <span className="font-mono">{currentUser.phone}</span>
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              {currentUser.defaultAddress || 'No default address set'} · {currentUser.defaultDistrict || 'Dhaka'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('shop')}
            className="bg-pink-50 hover:bg-pink-100 text-[#E86A92] text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </button>
          <button
            onClick={logout}
            className="border border-zinc-200 hover:border-red-300 hover:bg-red-50 text-zinc-600 hover:text-red-600 text-xs font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[#F8E8EE] rounded-3xl p-3 shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left text-xs font-semibold px-4 py-3 rounded-2xl flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'orders' ? 'bg-[#E86A92] text-white shadow-xs' : 'text-zinc-700 hover:bg-pink-50'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                My Orders
              </span>
              <span className="text-[11px] opacity-80">({customerOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full text-left text-xs font-semibold px-4 py-3 rounded-2xl flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'wishlist' ? 'bg-[#E86A92] text-white shadow-xs' : 'text-zinc-700 hover:bg-pink-50'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Heart className="w-4 h-4" />
                My Wishlist
              </span>
              <span className="text-[11px] opacity-80">({wishlistProducts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left text-xs font-semibold px-4 py-3 rounded-2xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'addresses' ? 'bg-[#E86A92] text-white shadow-xs' : 'text-zinc-700 hover:bg-pink-50'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Delivery Address & Profile
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`w-full text-left text-xs font-semibold px-4 py-3 rounded-2xl flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'coupons' ? 'bg-[#E86A92] text-white shadow-xs' : 'text-zinc-700 hover:bg-pink-50'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Tag className="w-4 h-4" />
                Active Coupons
              </span>
              <span className="text-[11px] opacity-80">({coupons.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="lg:col-span-3 space-y-6">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-zinc-900">
                Order History ({customerOrders.length})
              </h2>

              {customerOrders.length === 0 ? (
                <div className="bg-white border border-[#F8E8EE] rounded-3xl p-10 text-center space-y-3">
                  <Package className="w-12 h-12 text-zinc-300 mx-auto" />
                  <p className="font-semibold text-zinc-700 text-sm">No orders found yet</p>
                  <p className="text-xs text-zinc-400">
                    Your confirmed beauty purchases and delivery records will show here.
                  </p>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="bg-[#E86A92] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {customerOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white border border-[#F8E8EE] rounded-3xl p-5 sm:p-6 shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-zinc-900">
                              {ord.orderNumber}
                            </span>
                            <span className="bg-pink-100 text-[#E86A92] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                              {ord.status}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-1">Placed on {ord.date}</p>
                          <p className="text-xs text-zinc-600 mt-0.5">
                            Recipient: {ord.customerName} ({ord.customerPhone}) · {ord.cityArea}, {ord.district}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedInvoiceOrder(ord)}
                            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            Tax Invoice
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs py-1">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-10 h-10 rounded-lg object-cover border border-zinc-100"
                              />
                              <div>
                                <p className="font-medium text-zinc-800 line-clamp-1">{item.productName}</p>
                                <p className="text-zinc-400">Qty: {item.quantity} × ৳{item.price.toLocaleString()}</p>
                              </div>
                            </div>
                            <span className="font-bold text-zinc-900 font-mono">
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
                    className="bg-[#E86A92] text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
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
                          className="text-zinc-400 hover:text-red-500 text-center text-xs p-1 cursor-pointer"
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

          {/* Delivery Address & Profile Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-zinc-900">
                Delivery Address & Profile
              </h2>
              <form
                onSubmit={handleSaveProfile}
                className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-4 max-w-xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Mobile Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Default District
                  </label>
                  <select
                    value={editDistrict}
                    onChange={(e) => setEditDistrict(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] cursor-pointer"
                  >
                    {BANGLADESH_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d} {d === 'Dhaka' ? '(Inside Dhaka - ৳60)' : '(Outside Dhaka - ৳120)'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Full Delivery Street Address
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    placeholder="e.g. House 42, Road 27, Block A, Dhanmondi, Dhaka"
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs p-3.5 rounded-xl outline-hidden focus:border-[#E86A92]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#E86A92] hover:bg-[#d6577e] text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Save Profile & Address
                </button>
              </form>
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
