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
            className="cursor-pointer flex items-center gap-2.5 select-none group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E86A92] to-[#f49cb8] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform font-display font-black text-sm tracking-wider">
              A&A
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#222222] block leading-none">
                Ayat & Amat<span className="text-[#E86A92]">.</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#777777] block font-semibold mt-0.5">
                Fashion & Lifestyle
              </span>
            </div>
          </div>

          {/* Live Search Bar */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-xl mx-6 relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search Shirt, T-Shirt, Pant, Clock, Saree, Baby sets..."
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
                    No products matching &ldquo;{searchQuery}&rdquo; in Ayat & Amat
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
              placeholder="Search Shirt, T-Shirt, Pant, Clock, Saree, Baby sets..."
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

      {/* Collections Mega Navigation Bar */}
      <nav className="border-t border-[#F8E8EE] bg-white hidden md:block relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-xs font-semibold">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigateTo('home')}
                className={`hover:text-[#E86A92] transition-colors whitespace-nowrap cursor-pointer py-1.5 ${
                  activeView === 'home' ? 'text-[#E86A92] font-bold' : 'text-zinc-700'
                }`}
              >
                Home
              </button>

              {/* All Products with Full Mega Menu Dropdown */}
              <div className="relative group/all py-1.5">
                <button
                  onClick={() => navigateTo('shop')}
                  className={`hover:text-[#E86A92] transition-colors whitespace-nowrap cursor-pointer py-1.5 flex items-center gap-1.5 ${
                    activeView === 'shop' ? 'text-[#E86A92] font-bold' : 'text-zinc-700'
                  }`}
                >
                  <Package className="w-3.5 h-3.5 text-[#E86A92]" />
                  <span>All Products</span>
                  <ChevronDown className="w-3 h-3 text-zinc-400 group-hover/all:text-[#E86A92] transition-transform group-hover/all:rotate-180" />
                </button>

                {/* Mega Menu Dropdown for All Products */}
                <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover/all:opacity-100 group-hover/all:translate-y-0 group-hover/all:pointer-events-auto transition-all duration-200 z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-pink-100 p-6 w-[740px] max-w-[90vw]">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100">
                      <div>
                        <h4 className="font-display font-bold text-sm text-zinc-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#E86A92]"></span>
                          Ayat & Amat - All Products Catalog
                        </h4>
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          Browse all collections: Men's (Shirt, T-Shirt, Pant, Clock), Women's & Baby items
                        </p>
                      </div>
                      <button
                        onClick={() => navigateTo('shop')}
                        className="text-xs font-bold text-[#E86A92] hover:text-[#d6577e] flex items-center gap-1 cursor-pointer bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-100"
                      >
                        View All Products ({products.length}) →
                      </button>
                    </div>

                    {/* 3 Categories / Collections Grid */}
                    <div className="grid grid-cols-3 gap-5">
                      {/* Men's Collection */}
                      <div className="bg-zinc-50/70 rounded-xl p-3.5 border border-zinc-100 hover:border-pink-200 transition-colors">
                        <div
                          onClick={() => navigateTo('shop', "Men's Collection")}
                          className="flex items-center justify-between font-bold text-xs text-zinc-900 pb-2 border-b border-zinc-200/80 cursor-pointer group/title"
                        >
                          <span className="group-hover/title:text-[#E86A92] transition-colors flex items-center gap-1.5">
                            👔 Men's Collection
                          </span>
                          <span className="text-[10px] text-zinc-400 group-hover/title:text-[#E86A92]">All →</span>
                        </div>
                        <div className="mt-2.5 space-y-1">
                          {['Shirt', 'T-Shirt', 'Pant', 'Clock'].map((item) => (
                            <button
                              key={item}
                              onClick={() => navigateTo('shop', "Men's Collection", item)}
                              className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-zinc-600 hover:bg-white hover:text-[#E86A92] hover:shadow-xs font-medium transition-all cursor-pointer flex items-center justify-between"
                            >
                              <span>{item}</span>
                              <span className="text-[10px] text-zinc-400">
                                {products.filter((p) => p.category === "Men's Collection" && p.subcategory === item).length}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Women's Collection */}
                      <div className="bg-zinc-50/70 rounded-xl p-3.5 border border-zinc-100 hover:border-pink-200 transition-colors">
                        <div
                          onClick={() => navigateTo('shop', "Women's Collection")}
                          className="flex items-center justify-between font-bold text-xs text-zinc-900 pb-2 border-b border-zinc-200/80 cursor-pointer group/title"
                        >
                          <span className="group-hover/title:text-[#E86A92] transition-colors flex items-center gap-1.5">
                            👗 Women's Collection
                          </span>
                          <span className="text-[10px] text-zinc-400 group-hover/title:text-[#E86A92]">All →</span>
                        </div>
                        <div className="mt-2.5 space-y-1">
                          {['Three Piece', 'Kurti & Tops', 'Saree', 'Clock & Jewelry'].map((item) => (
                            <button
                              key={item}
                              onClick={() => navigateTo('shop', "Women's Collection", item)}
                              className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-zinc-600 hover:bg-white hover:text-[#E86A92] hover:shadow-xs font-medium transition-all cursor-pointer flex items-center justify-between"
                            >
                              <span>{item}</span>
                              <span className="text-[10px] text-zinc-400">
                                {products.filter((p) => p.category === "Women's Collection" && p.subcategory === item).length}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Baby Collection */}
                      <div className="bg-zinc-50/70 rounded-xl p-3.5 border border-zinc-100 hover:border-pink-200 transition-colors">
                        <div
                          onClick={() => navigateTo('shop', "Baby Collection")}
                          className="flex items-center justify-between font-bold text-xs text-zinc-900 pb-2 border-b border-zinc-200/80 cursor-pointer group/title"
                        >
                          <span className="group-hover/title:text-[#E86A92] transition-colors flex items-center gap-1.5">
                            🍼 Baby Collection
                          </span>
                          <span className="text-[10px] text-zinc-400 group-hover/title:text-[#E86A92]">All →</span>
                        </div>
                        <div className="mt-2.5 space-y-1">
                          {['Baby Boys Clothing', 'Baby Girls Clothing', 'Rompers & Sets', 'Baby Clock & Toys'].map((item) => (
                            <button
                              key={item}
                              onClick={() => navigateTo('shop', "Baby Collection", item)}
                              className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-zinc-600 hover:bg-white hover:text-[#E86A92] hover:shadow-xs font-medium transition-all cursor-pointer flex items-center justify-between"
                            >
                              <span>{item}</span>
                              <span className="text-[10px] text-zinc-400">
                                {products.filter((p) => p.category === "Baby Collection" && p.subcategory === item).length}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Info Strip */}
                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#E86A92]" />
                        Delivery: Inside Dhaka ৳70 | Sub Area ৳100 | Outside Dhaka ৳130
                      </span>
                      <span className="font-semibold text-emerald-600">
                        ✓ Free Delivery on orders over ৳2,500
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collections with Direct Individual Dropdowns */}
              {categories.map((cat) => (
                <div key={cat.id} className="relative group py-1.5">
                  <button
                    onClick={() => navigateTo('shop', cat.name)}
                    className="flex items-center gap-1.5 text-zinc-700 hover:text-[#E86A92] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>{cat.name}</span>
                    <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-[#E86A92] transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Individual Collection Mega Menu Dropdown */}
                  <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-pink-100 p-4 w-64 space-y-2">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                        <span className="font-bold text-xs text-zinc-900">{cat.name}</span>
                        <button
                          onClick={() => navigateTo('shop', cat.name)}
                          className="text-[10px] text-[#E86A92] font-bold hover:underline"
                        >
                          View All →
                        </button>
                      </div>

                      <div className="space-y-1">
                        {cat.subcategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => navigateTo('shop', cat.name, sub)}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-zinc-600 hover:bg-pink-50 hover:text-[#E86A92] font-medium transition-colors cursor-pointer flex items-center justify-between"
                          >
                            <span>{sub}</span>
                            <span className="text-[10px] text-zinc-400 group-hover/item:text-[#E86A92]">
                              {products.filter((p) => p.category === cat.name && p.subcategory === sub).length}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigateTo('shop')}
              className="text-[#E86A92] font-bold hover:text-[#d6577e] transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer bg-pink-50/80 px-3 py-1 rounded-full border border-pink-200"
            >
              <Sparkles className="w-3 h-3 text-[#E86A92]" />
              Special Offers %
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#F8E8EE] bg-white px-4 py-4 space-y-4 animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
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

          <div className="space-y-3">
            <button
              onClick={() => {
                navigateTo('shop');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 bg-pink-50/60 rounded-xl text-xs font-bold text-[#E86A92] flex items-center justify-between"
            >
              <span>All Products Catalog</span>
              <span>→</span>
            </button>

            {categories.map((cat) => (
              <div key={cat.id} className="border border-zinc-100 rounded-2xl p-3 space-y-2 bg-zinc-50/50">
                <div
                  onClick={() => {
                    navigateTo('shop', cat.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className="font-bold text-xs text-zinc-900 cursor-pointer flex items-center justify-between"
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-[#E86A92] font-semibold">View All</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        navigateTo('shop', cat.name, sub);
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left py-1 px-2 text-[11px] text-zinc-600 hover:text-[#E86A92] hover:bg-pink-50 rounded-md transition-colors"
                    >
                      • {sub}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Authentic Products
            </span>
            <button
              onClick={() => {
                navigateTo('order-tracking');
                setIsMobileMenuOpen(false);
              }}
              className="text-[#E86A92] font-semibold"
            >
              Track Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
