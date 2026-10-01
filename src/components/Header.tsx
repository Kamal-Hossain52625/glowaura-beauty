import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  Phone,
  Truck,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  LayoutDashboard,
  Code2,
  LogOut,
  Package
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    navigateTo,
    cart,
    wishlist,
    currentUser,
    login,
    logout,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    products,
    categories,
    settings
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Search filtering
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6)
    : [];

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigateTo('shop');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-[#F8E8EE]">
      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-700 hover:text-[#E86A92] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex items-center gap-2 select-none group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#E86A92] to-[#f49cb8] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#222222] block leading-none">
                GlowAura<span className="text-[#E86A92]">.</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#777777] block font-medium">
                Authentic BD Beauty
              </span>
            </div>
          </div>

          {/* Live Search Bar */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-xl mx-6 relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search Korean serums, sunscreens, COSRX, The Ordinary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#F8E8EE]/40 border border-[#F8E8EE] focus:border-[#E86A92] focus:bg-white text-sm text-[#222222] pl-4 pr-10 py-2.5 rounded-full outline-hidden transition-all duration-200 placeholder:text-zinc-400"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 w-8 bg-[#E86A92] hover:bg-[#d6577e] text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Instant Search Suggestions Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-pink-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="p-3 bg-[#F8E8EE]/40 border-b border-[#F8E8EE] flex items-center justify-between text-xs text-[#777777]">
                  <span>Search suggestions for &ldquo;{searchQuery}&rdquo;</span>
                  <span>{searchResults.length} items found</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-zinc-100 max-h-80 overflow-y-auto">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setIsSearchFocused(false);
                          navigateTo('product-detail', product.slug);
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-pink-50/50 cursor-pointer transition-colors"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-zinc-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#777777] font-medium">{product.brand}</p>
                          <p className="text-sm font-semibold text-zinc-900 truncate">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-sm font-bold text-[#E86A92]">
                              ৳{product.discountPrice.toLocaleString()}
                            </span>
                            {product.discountPrice < product.regularPrice && (
                              <span className="text-xs text-zinc-400 line-through">
                                ৳{product.regularPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      onClick={() => {
                        setIsSearchFocused(false);
                        navigateTo('shop');
                      }}
                      className="p-3 text-center text-xs font-semibold text-[#E86A92] hover:bg-pink-50 cursor-pointer transition-colors"
                    >
                      View all results in Shop →
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-zinc-500">
                    No beauty products matching &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons: Wishlist, Account, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Account / Login Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="flex items-center gap-1.5 p-2 text-zinc-700 hover:text-[#E86A92] transition-colors rounded-full hover:bg-pink-50 cursor-pointer"
                title="Account"
              >
                <UserIcon className="w-5 h-5" />
                <span className="hidden lg:inline text-xs font-medium max-w-[85px] truncate">
                  {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
                </span>
                <ChevronDown className="w-3 h-3 text-zinc-400 hidden lg:inline" />
              </button>

              {isAccountDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-pink-100 py-2 z-50 animate-in fade-in duration-150">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 border-b border-zinc-100">
                        <p className="text-xs text-zinc-500">Signed in as</p>
                        <p className="text-sm font-bold text-zinc-900 truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-[11px] text-zinc-400 truncate">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsAccountDropdownOpen(false);
                          navigateTo('account');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-zinc-700 hover:bg-pink-50 hover:text-[#E86A92] flex items-center gap-2 cursor-pointer"
                      >
                        <UserIcon className="w-3.5 h-3.5" />
                        My Profile & Orders
                      </button>
                      <button
                        onClick={() => {
                          setIsAccountDropdownOpen(false);
                          navigateTo('admin');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-[#E86A92] font-semibold hover:bg-pink-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Admin Dashboard (/admin)
                      </button>
                      <div className="border-t border-zinc-100 my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setIsAccountDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="p-3 text-center space-y-2">
                      <p className="text-xs text-zinc-600">Access your account or store admin</p>
                      <button
                        onClick={() => {
                          setIsAccountDropdownOpen(false);
                          navigateTo('account');
                        }}
                        className="w-full bg-[#E86A92] hover:bg-[#d6577e] text-white text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Sign In with Phone (OTP)
                      </button>
                      <button
                        onClick={() => {
                          setIsAccountDropdownOpen(false);
                          navigateTo('admin');
                        }}
                        className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Admin Dashboard (/admin)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('account')}
              className="relative p-2 text-zinc-700 hover:text-[#E86A92] transition-colors rounded-full hover:bg-pink-50 cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E86A92] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#F8E8EE] hover:bg-[#fad2df] text-[#222222] px-3.5 py-2 rounded-full transition-all cursor-pointer group"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#E86A92] group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E86A92] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-[#222222]">
                Bag {cartItemCount > 0 && `(${cartItemCount})`}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search Korean skincare, makeup..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8E8EE]/40 border border-[#F8E8EE] text-xs text-[#222222] pl-3 pr-9 py-2 rounded-full outline-hidden"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1 bottom-1 w-7 bg-[#E86A92] text-white rounded-full flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Categories Navigation Bar */}
      <nav className="border-t border-[#F8E8EE] bg-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between overflow-x-auto py-2.5 text-xs font-medium no-scrollbar">
            <button
              onClick={() => navigateTo('home')}
              className={`hover:text-[#E86A92] transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'home' ? 'text-[#E86A92] font-bold' : 'text-zinc-700'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className={`hover:text-[#E86A92] transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'shop' ? 'text-[#E86A92] font-bold' : 'text-zinc-700'
              }`}
            >
              All Products
            </button>

            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigateTo('shop', cat.name)}
                className="text-zinc-700 hover:text-[#E86A92] transition-colors whitespace-nowrap cursor-pointer"
              >
                {cat.name}
              </button>
            ))}

            <button
              onClick={() => navigateTo('shop')}
              className="text-[#E86A92] font-bold hover:text-[#d6577e] transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              Special Offers %
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#F8E8EE] bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top-2">
          <div className="pb-3 border-b border-zinc-100">
            <button
              onClick={() => {
                navigateTo('account');
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-zinc-50 hover:bg-pink-50 text-zinc-700 text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 font-semibold border border-zinc-200"
            >
              <UserIcon className="w-3.5 h-3.5 text-[#E86A92]" />
              My Account & Orders
            </button>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Beauty Categories
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                navigateTo('shop');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-1.5 text-zinc-800 font-semibold hover:text-[#E86A92]"
            >
              All Catalog
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  navigateTo('shop', cat.name);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-1.5 text-zinc-700 hover:text-[#E86A92]"
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Authentic BD
            </span>
            <button
              onClick={() => {
                navigateTo('order-tracking');
                setIsMobileMenuOpen(false);
              }}
              className="text-[#E86A92] font-semibold"
            >
              Track My Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
