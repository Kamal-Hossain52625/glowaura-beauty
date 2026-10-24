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
  AlertCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    customerLogin,
    customerRegister,
    loginWithPhone,
    adminLogin,
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

  // Authentication Mode: Customer vs Admin
  const [authMode, setAuthMode] = useState<'customer' | 'admin'>('customer');

  // Customer Authentication: 'login' vs 'signup'
  const [customerAuthView, setCustomerAuthView] = useState<'login' | 'signup'>('login');
  const [custEmail, setCustEmail] = useState('');
  const [custPassword, setCustPassword] = useState('');
  const [showCustPassword, setShowCustPassword] = useState(false);
  const [isCustLoggingIn, setIsCustLoggingIn] = useState(false);
  const [custAuthError, setCustAuthError] = useState('');

  // Customer Sign-Up State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupError, setSignupError] = useState('');

  // Admin Auth State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isAdminLoggingIn, setIsAdminLoggingIn] = useState(false);

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

  const customerOrders = orders.filter(
    (o) => !currentUser || o.customerPhone === currentUser.phone || o.customerName.toLowerCase() === currentUser.name.toLowerCase()
  );

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // Customer Login with Email & Password
  const handleCustomerLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustAuthError('');

    if (!custEmail.trim() || !custPassword.trim()) {
      setCustAuthError('ইমেইল ও পাসওয়ার্ড উভয়ই পূরণ করুন।');
      return;
    }

    setIsCustLoggingIn(true);
    try {
      const res = await customerLogin(custEmail.trim(), custPassword);
      if (!res.success) {
        setCustAuthError(res.message);
      }
    } catch {
      setCustAuthError('লগইন প্রক্রিয়ায় সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsCustLoggingIn(false);
    }
  };

  // Customer Sign-Up (Registration) with Email & Password
  const handleCustomerSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!signupName.trim()) {
      setSignupError('অনুগ্রহ করে আপনার পুরো নাম লিখুন।');
      return;
    }
    if (!signupEmail.trim()) {
      setSignupError('অনুগ্রহ করে আপনার ইমেইল অ্যাড্রেস লিখুন।');
      return;
    }
    if (signupPassword.length < 6) {
      setSignupError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setSignupError('পাসওয়ার্ড দুটি মেলেনি! একই পাসওয়ার্ড দিন।');
      return;
    }

    setIsSigningUp(true);
    try {
      const res = await customerRegister({
        name: signupName.trim(),
        email: signupEmail.trim(),
        password: signupPassword,
        phone: signupPhone.trim() || undefined
      });
      if (!res.success) {
        setSignupError(res.message);
      }
    } catch {
      setSignupError('রেজিস্ট্রেশনে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSigningUp(false);
    }
  };

  // Admin login with email & password (async encrypted database verification)
  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setIsAdminLoggingIn(true);

    try {
      const res = await adminLogin(adminEmail, adminPassword);
      if (res.success) {
        navigateTo('admin');
      } else {
        setAdminError(res.message || 'ভুল ইমেইল বা পাসওয়ার্ড।');
      }
    } catch {
      setAdminError('লগইন প্রক্রিয়ায় সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsAdminLoggingIn(false);
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

  // Authentication View (User Login & Admin Login with Guest checkout option)
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 space-y-5">
        {/* Guest Shopping Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold bg-emerald-100/70 px-3 py-1 rounded-full">
            <span>✨ লগইন ছাড়াই সরাসরি অর্ডার করুন</span>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            কোনো অ্যাকাউন্ট খোলা বা পাসওয়ার্ড ছাড়াই সরাসরি প্রোডাক্ট পছন্দ করে ১-ক্লিকে ক্যাশ অন ডেলিভারিতে অর্ডার করতে পারবেন।
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>সরাসরি শপিং করুন (লগইন ছাড়া)</span>
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Tabs */}
          <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-2xl gap-1">
            <button
              type="button"
              onClick={() => {
                setAuthMode('customer');
                setCustAuthError('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'customer'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5 text-[#E86A92]" />
              <span>User Login</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('admin');
                setAdminError('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'admin'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-800" />
              <span>Admin Login</span>
            </button>
          </div>

          {/* Customer Login / Sign-Up Form */}
          {authMode === 'customer' ? (
            customerAuthView === 'login' ? (
              <form onSubmit={handleCustomerLoginSubmit} className="space-y-4">
                <div className="text-center space-y-1">
                  <h1 className="font-display text-xl font-bold text-zinc-900">
                    কাস্টমার সাইন ইন
                  </h1>
                  <p className="text-xs text-zinc-500">
                    আপনার ইমেইল ও পাসওয়ার্ড দিয়ে অ্যাকাউন্টে প্রবেশ করুন
                  </p>
                </div>

                {custAuthError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{custAuthError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    ইমেইল অ্যাড্রেস <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="customer@example.com"
                      value={custEmail}
                      onChange={(e) => setCustEmail(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs pl-9 pr-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                    />
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    পাসওয়ার্ড <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showCustPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={custPassword}
                      onChange={(e) => setCustPassword(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs pl-9 pr-9 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                    />
                    <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowCustPassword(!showCustPassword)}
                      className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                    >
                      {showCustPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCustLoggingIn}
                  className="w-full bg-[#E86A92] hover:bg-[#d6577e] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isCustLoggingIn ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>লগইন করা হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <span>লগইন করুন</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Small Sign-Up prompt */}
                <div className="pt-2 text-center border-t border-zinc-100">
                  <p className="text-xs text-zinc-600">
                    অ্যাকাউন্ট নেই?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setCustomerAuthView('signup');
                        setCustAuthError('');
                      }}
                      className="text-[#E86A92] font-bold hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Sign Up (নতুন অ্যাকাউন্ট খুলুন)</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              /* Customer Sign-Up Form */
              <form onSubmit={handleCustomerSignupSubmit} className="space-y-3.5">
                <div className="text-center space-y-1">
                  <h1 className="font-display text-xl font-bold text-zinc-900">
                    নতুন অ্যাকাউন্ট তৈরি করুন
                  </h1>
                  <p className="text-xs text-zinc-500">
                    নাম, ইমেইল ও পাসওয়ার্ড দিয়ে রেজিস্ট্রেশন সম্পন্ন করুন
                  </p>
                </div>

                {signupError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{signupError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    আপনার নাম <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maria Afrin"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs pl-9 pr-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                    />
                    <UserIcon className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    ইমেইল অ্যাড্রেস <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="yourname@gmail.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs pl-9 pr-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                    />
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    মোবাইল নম্বর (ঐচ্ছিক)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="017XXXXXXXX"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs pl-9 pr-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white font-mono"
                    />
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    পাসওয়ার্ড <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      required
                      placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs pl-9 pr-9 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                    />
                    <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                    >
                      {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    পাসওয়ার্ড নিশ্চিত করুন <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs pl-9 pr-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                    />
                    <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="w-full bg-[#E86A92] hover:bg-[#d6577e] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSigningUp ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>রেজিস্ট্রেশন করুন ও লগইন করুন</span>
                    </>
                  )}
                </button>

                {/* Back to Sign-in */}
                <div className="pt-2 text-center border-t border-zinc-100">
                  <p className="text-xs text-zinc-600">
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setCustomerAuthView('login');
                        setSignupError('');
                      }}
                      className="text-[#E86A92] font-bold hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Sign In (লগইন করুন)</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </p>
                </div>
              </form>
            )
          ) : (
            /* Admin Login Form */
            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <h1 className="font-display text-xl font-bold text-zinc-900">
                  এডমিন সাইন ইন
                </h1>
                <p className="text-xs text-zinc-500">
                  স্টোর পরিচালনা, স্টক আপডেট ও অর্ডার ম্যানেজমেন্টের জন্য
                </p>
              </div>

              {adminError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  এডমিন ইমেইল <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@ayatamat.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-zinc-800 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  পাসওয়ার্ড <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-zinc-800 focus:bg-white"
                />
              </div>

              <div className="bg-pink-50/60 rounded-xl p-3 border border-pink-100 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E86A92] shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-600 leading-relaxed">
                  নিরাপত্তা প্রোটোকল: শুধুমাত্র ডাটাবেজে আপনার নির্ধারিত রোল-বেসড এডমিন অ্যাকাউন্ট দিয়ে লগইন করা যাবে।
                </p>
              </div>

              <button
                type="submit"
                disabled={isAdminLoggingIn}
                className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isAdminLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#E86A92]" />
                    <span>যাচাই করা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <LayoutDashboard className="w-4 h-4 text-[#E86A92]" />
                    <span>এডমিন প্যানেলে লগইন করুন</span>
                  </>
                )}
              </button>
            </form>
          )}
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
