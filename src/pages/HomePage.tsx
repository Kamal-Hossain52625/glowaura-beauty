import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Quote,
  Flame,
  Tag,
  Clock,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, categories, brands, reviews, navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState<'featured' | 'new' | 'bestseller' | 'discount'>('featured');

  // Filtered products by tab
  const tabProducts = products.filter((p) => {
    if (activeTab === 'featured') return p.isFeatured;
    if (activeTab === 'new') return p.isNewArrival;
    if (activeTab === 'bestseller') return p.isBestSeller;
    if (activeTab === 'discount') return p.discountPrice < p.regularPrice;
    return true;
  }).slice(0, 8);

  const heroSlides = [
    {
      id: 'mens',
      category: "Men's Collection",
      badge: "👔 Men's Collection",
      title: "Men's Premium Attire & Watches",
      subtitle: "Executive Shirts, T-Shirts, Pants & Clocks",
      image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85",
      accentBg: "from-blue-600/30 via-transparent to-black/60",
      pillBg: "bg-blue-600/95 text-white"
    },
    {
      id: 'womens',
      category: "Women's Collection",
      badge: "👗 Women's Collection",
      title: "Women's Festive & Ethnic Fashion",
      subtitle: "Jamdani Sarees, Three-Piece, Kurtis & Jewelry",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85",
      accentBg: "from-rose-600/30 via-transparent to-black/60",
      pillBg: "bg-[#E86A92] text-white"
    },
    {
      id: 'baby',
      category: "Baby Collection",
      badge: "🍼 Baby Collection",
      title: "Gentle Baby Clothing & Essentials",
      subtitle: "Organic Rompers, Suspender Sets, Toys & Clocks",
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=85",
      accentBg: "from-amber-600/30 via-transparent to-black/60",
      pillBg: "bg-amber-600/95 text-white"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Continuous auto-sliding effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const handlePrevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Editorial Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F8E8EE] via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-pink-200 text-xs font-bold text-[#E86A92] shadow-xs">
                
                <span>NEW SEASON COLLECTION 2026</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 leading-[1.1] tracking-tight">
                Timeless Elegance, <br />
                <span className="text-[#E86A92] italic font-serif">Ayat & Amat</span> Quality.
              </h1>

              <p className="text-zinc-600 text-sm sm:text-base max-w-xl leading-relaxed">
                Bangladesh’s premier destination for fine tailored Men's shirts, pants & watches, handcrafted Women's fashion, and organic baby wear.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('shop')}
                  className="bg-[#E86A92] hover:bg-[#d6577e] text-white px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>All Products Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCurrentSlide(0);
                    navigateTo('shop', "Men's Collection");
                  }}
                  className={`border px-5 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    currentSlide === 0
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                      : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-800'
                  }`}
                >
                  👔 Men's Collection
                </button>

                <button
                  onClick={() => {
                    setCurrentSlide(1);
                    navigateTo('shop', "Women's Collection");
                  }}
                  className={`border px-5 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    currentSlide === 1
                      ? 'bg-[#E86A92] text-white border-[#E86A92] shadow-sm'
                      : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-800'
                  }`}
                >
                  👗 Women's
                </button>

                <button
                  onClick={() => {
                    setCurrentSlide(2);
                    navigateTo('shop', "Baby Collection");
                  }}
                  className={`border px-5 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    currentSlide === 2
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-800'
                  }`}
                >
                  🍼 Baby
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-pink-200/60 flex flex-wrap items-center gap-6 text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E86A92]" />
                  <span>100% Genuine Quality Fabrics & Movements</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#E86A92]" />
                  <span>Inside Dhaka ৳70 | Sub ৳100 | Outside ৳130</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card with Continuous Auto Slider */}
            <div className="lg:col-span-5 relative">
              <div
                className="relative mx-auto max-w-md lg:max-w-none group"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Main Slider Display */}
                <div
                  onClick={() => navigateTo('shop', heroSlides[currentSlide].category)}
                  className="aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative cursor-pointer bg-zinc-950 select-none"
                  title="Click to view this collection"
                >
                  {heroSlides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentSlide
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-105 pointer-events-none z-0'
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Subtle Vignette Gradient for Contrast */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${slide.accentBg}`} />

                      {/* Collection Pill Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-md backdrop-blur-md ${slide.pillBg}`}>
                          {slide.badge}
                        </span>
                      </div>

                      {/* Bottom Info Ribbon on Slide */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 text-white p-3.5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-between gap-3 shadow-lg">
                        <div className="min-w-0">
                          <p className="text-xs font-bold truncate leading-tight">{slide.title}</p>
                          <p className="text-[11px] text-zinc-300 truncate">{slide.subtitle}</p>
                        </div>
                        <span className="shrink-0 bg-white/20 group-hover:bg-[#E86A92] group-hover:text-white text-white text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-1">
                          Shop Now →
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Previous Slide Chevron */}
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    aria-label="Previous Slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-zinc-800 shadow-lg flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 hover:scale-110 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Next Slide Chevron */}
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    aria-label="Next Slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-zinc-800 shadow-lg flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 hover:scale-110 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dot / Pill Indicators */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(index);
                        }}
                        aria-label={`Go to ${slide.category}`}
                        className={`transition-all rounded-full cursor-pointer ${
                          index === currentSlide
                            ? 'w-7 h-2 bg-white shadow-md'
                            : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating promo badge (Preserved original) */}
                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-pink-100 flex items-center gap-3 z-30 pointer-events-auto">
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-[#E86A92] flex items-center justify-center font-black">
                    ৳
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-400">Welcome Discount</p>
                    <p className="text-sm font-bold text-zinc-900">Code: AYAT10 (10% OFF)</p>
                  </div>
                </div>

                {/* Auto Slide Counter Pill */}
                <div className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-pink-100 flex items-center gap-2 z-30 text-[11px] font-bold text-zinc-700">
                  <span className="w-2 h-2 rounded-full bg-[#E86A92] animate-ping" />
                  <span>{currentSlide + 1} / {heroSlides.length} ({heroSlides[currentSlide].category.split(" ")[0]})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Promotional Highlight Cards */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigateTo('shop', "Men's Collection")}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50/50 p-6 border border-blue-100 cursor-pointer hover:shadow-md transition-all"
          >
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                👔 Men's Collection
              </span>
              <h3 className="font-display text-xl font-bold text-zinc-900 group-hover:text-blue-700 transition-colors">
                Shirt, T-Shirt, Pant & Clock
              </h3>
              <p className="text-xs text-zinc-600 line-clamp-2">
                Tailored 100% cotton Oxford shirts, stretch chinos, selvedge denim & chronograph timepieces.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 pt-2">
                Discover Men's Items →
              </span>
            </div>
          </div>

          <div
            onClick={() => navigateTo('shop', "Women's Collection")}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50/60 p-6 border border-pink-100 cursor-pointer hover:shadow-md transition-all"
          >
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E86A92]">
                👗 Women's Collection
              </span>
              <h3 className="font-display text-xl font-bold text-zinc-900 group-hover:text-[#E86A92] transition-colors">
                Three Piece, Saree & Jewelry
              </h3>
              <p className="text-xs text-zinc-600 line-clamp-2">
                Authentic Dhakai Jamdani sarees, organza unstitched 3-pieces, kurtis, and crystal watches.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E86A92] pt-2">
                Explore Women's Items →
              </span>
            </div>
          </div>

          <div
            onClick={() => navigateTo('shop', "Baby Collection")}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50/50 p-6 border border-amber-100 cursor-pointer hover:shadow-md transition-all"
          >
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                🍼 Baby Collection
              </span>
              <h3 className="font-display text-xl font-bold text-zinc-900 group-hover:text-amber-700 transition-colors">
                Rompers, Clothing & Kids Clocks
              </h3>
              <p className="text-xs text-zinc-600 line-clamp-2">
                GOTS organic newborn onesies, suspender sets, princess frocks, and silent nursery wall clocks.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 pt-2">
                Browse Baby Essentials →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E86A92]">
              AYAT & AMAT COLLECTIONS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">
              Explore Our Collections & Items
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-[#E86A92] hover:text-[#d6577e] flex items-center gap-1 cursor-pointer"
          >
            View All Products ({products.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group bg-white border border-[#F8E8EE] rounded-3xl p-5 hover:border-[#E86A92] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div
                onClick={() => navigateTo('shop', cat.name)}
                className="cursor-pointer"
              >
                <div className="aspect-16/10 rounded-2xl overflow-hidden mb-4 border border-pink-100 group-hover:scale-[1.02] transition-transform">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-base sm:text-lg text-zinc-900 group-hover:text-[#E86A92] transition-colors">
                    {cat.name}
                  </h4>
                  <span className="text-xs font-bold text-[#E86A92] bg-pink-50 px-2.5 py-0.5 rounded-full">
                    {products.filter((p) => p.category === cat.name).length} Items
                  </span>
                </div>
              </div>

              {/* Subcategories pill links */}
              <div className="mt-4 pt-3 border-t border-zinc-100">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Items in this collection:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => navigateTo('shop', cat.name, sub)}
                      className="text-[11px] bg-zinc-50 hover:bg-[#E86A92] hover:text-white text-zinc-700 px-2.5 py-1 rounded-lg border border-zinc-200 transition-colors cursor-pointer font-medium"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Tabbed Products Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-zinc-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E86A92]">
              TRENDING IN BANGLADESH
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">
              Curated Fashion & Lifestyle Picks
            </h2>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'featured'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab('bestseller')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'bestseller'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'new'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab('discount')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'discount'
                  ? 'bg-[#E86A92] text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Special Discounts %
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {tabProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 bg-[#222222] hover:bg-black text-white text-xs font-bold px-8 py-3.5 rounded-2xl uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
          >
            <span>View All {products.length} Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Spotlight Promo Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white p-8 sm:p-12">
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E86A92] flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              SPECIAL TIMEPIECE HIGHLIGHT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Men's Heritage Steel & Skeleton Clocks / Watches
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              Crafted with surgical-grade 316L stainless steel, scratch-resistant sapphire crystal glass, and precision Japanese quartz movements. Complete with 1 year warranty.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigateTo('shop', "Men's Collection", 'Clock')}
                className="bg-[#E86A92] hover:bg-[#d6577e] text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Explore Men's Clocks & Watches
              </button>
              <span className="text-xs text-zinc-400">Cash on Delivery across Bangladesh</span>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E86A92]">
            AUTHENTIC LABELS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">
            Featured Brands & Makers
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Ayat & Amat Signature, Zara & Urban, Casio & Curren Timepieces, and Apex Heritage.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {brands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => {
                navigateTo('shop');
              }}
              className="bg-white border border-[#F8E8EE] rounded-2xl p-4 text-center hover:border-[#E86A92] hover:shadow-xs transition-all cursor-pointer flex flex-col items-center justify-center group"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-pink-50 mb-2 flex items-center justify-center p-1">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform"
                />
              </div>
              <p className="text-xs font-bold text-zinc-800 group-hover:text-[#E86A92] truncate w-full">
                {brand.name}
              </p>
              <span className="text-[10px] text-zinc-400">{brand.country}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Real Customer Reviews Showcase */}
      <section className="bg-[#F8E8EE]/40 py-16 border-y border-pink-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E86A92]">
              COMMUNITY LOVE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">
              What Ayat & Amat Customers Say
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Real reviews from verified buyers across Dhaka, Chittagong, Sylhet, and nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400' : 'text-zinc-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      ✓ Verified Order
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-zinc-900 mb-1">
                    &ldquo;{rev.title}&rdquo;
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed italic">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-zinc-900">{rev.customerName}</p>
                    <p className="text-[10px] text-zinc-400">{rev.productName}</p>
                  </div>
                  <span className="text-[10px] text-zinc-400">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social / Instagram Grid Section */}
      <section className="max-w-7xl mx-auto px-4 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E86A92]">
          FOLLOW OUR JOURNEY
        </span>
        <h2 className="font-display text-2xl font-bold text-zinc-900 mt-1 mb-6">
          @AyatAmat.BD on Instagram
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {[
            'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1608248597359-3e3a479ff73a?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80'
          ].map((url, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-2xl overflow-hidden group relative cursor-pointer"
            >
              <img
                src={url}
                alt="Instagram Glow Post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Heart className="w-5 h-5 fill-white" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
