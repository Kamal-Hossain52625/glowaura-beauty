import React, { useState } from 'react';
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
  Heart
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
      subtitle: "AUTHENTIC K-BEAUTY IN BANGLADESH",
      title: "Unlock Glass Skin with Korean Essentials",
      description: "Discover genuine COSRX Snail Mucin, Beauty of Joseon Sun Relief, and Anua Heartleaf at transparent Dhaka prices.",
      buttonText: "Shop Skincare Now",
      categoryTarget: "Skincare",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=80"
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Editorial Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F8E8EE] via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-pink-200 text-xs font-bold text-[#E86A92] shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SPRING GLOW EDIT 2026</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 leading-[1.1] tracking-tight">
                Pure Radiance, <br />
                <span className="text-[#E86A92] italic font-serif">Authentic</span> Beauty.
              </h1>

              <p className="text-zinc-600 text-sm sm:text-base max-w-xl leading-relaxed">
                Bangladesh’s premier curated boutique for authentic Korean and international skincare, lightweight tropical sunscreens, and dermatological essentials.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('shop')}
                  className="bg-[#E86A92] hover:bg-[#d6577e] text-white px-7 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('shop', 'Sun Care')}
                  className="bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Sun Protection
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-pink-200/60 flex items-center gap-6 text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E86A92]" />
                  <span>100% Genuine Barcoded</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#E86A92]" />
                  <span>Dhaka 24h & Nationwide Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80"
                    alt="Luxury Beauty Cosmetics"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating promo badge */}
                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-pink-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-[#E86A92] flex items-center justify-center font-black">
                    ৳
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-400">First Order Code</p>
                    <p className="text-sm font-bold text-zinc-900">Use Code: GLOW10</p>
                  </div>
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
            onClick={() => navigateTo('shop', 'Skincare')}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-pink-50 to-[#F8E8EE] p-6 border border-pink-100 cursor-pointer hover:shadow-md transition-all"
          >
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E86A92]">
                Dermatologist Recommended
              </span>
              <h3 className="font-display text-xl font-bold text-zinc-900 group-hover:text-[#E86A92] transition-colors">
                Korean Snail & Barrier Care
              </h3>
              <p className="text-xs text-zinc-600 line-clamp-2">
                Replenish moisture and repair post-acne scarring with authentic essence formulas.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E86A92] pt-2">
                Discover Serums →
              </span>
            </div>
          </div>

          <div
            onClick={() => navigateTo('shop', 'Sun Care')}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 p-6 border border-amber-100 cursor-pointer hover:shadow-md transition-all"
          >
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                BD Climate Tested
              </span>
              <h3 className="font-display text-xl font-bold text-zinc-900 group-hover:text-amber-700 transition-colors">
                Zero White-Cast Sunscreens
              </h3>
              <p className="text-xs text-zinc-600 line-clamp-2">
                Lightweight chemical & mineral SPF50+ formulas that withstand humid weather.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 pt-2">
                Explore Sun Sticks & Creams →
              </span>
            </div>
          </div>

          <div
            onClick={() => navigateTo('shop', 'Lip Care')}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100/50 p-6 border border-rose-100 cursor-pointer hover:shadow-md transition-all"
          >
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                Nightly Recovery
              </span>
              <h3 className="font-display text-xl font-bold text-zinc-900 group-hover:text-rose-600 transition-colors">
                Overnight Lip Sleeping Masks
              </h3>
              <p className="text-xs text-zinc-600 line-clamp-2">
                Melt away dead skin cells and wake up to baby-soft, deeply nourished lips.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 pt-2">
                Shop Lip Balms →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E86A92]">
              CURATED SELECTIONS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">
              Explore by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-[#E86A92] hover:text-[#d6577e] flex items-center gap-1 cursor-pointer"
          >
            View All Categories ({categories.length}) →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('shop', cat.name)}
              className="group cursor-pointer bg-white border border-[#F8E8EE] rounded-2xl p-4 text-center hover:border-[#E86A92] hover:shadow-md transition-all flex flex-col items-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-3 border-2 border-pink-100 group-hover:scale-105 transition-transform">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-xs sm:text-sm text-zinc-800 group-hover:text-[#E86A92] transition-colors">
                {cat.name}
              </h4>
              <span className="text-[11px] text-zinc-400 mt-0.5">
                {cat.itemCount || 8}+ items
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Tabbed Products Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-zinc-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E86A92]">
              TRENDING IN DHAKA
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">
              Curated Beauty Picks
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
              SPECIAL DEAL OF THE WEEK
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Get Up to 30% Off on Beauty of Joseon
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              Experience ancient Korean royal court Hanbang medicine infused with modern skin science: Rice Bran, Propolis, Ginseng & Mugwort.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => navigateTo('shop', 'Beauty of Joseon')}
                className="bg-[#E86A92] hover:bg-[#d6577e] text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Shop Beauty of Joseon
              </button>
              <span className="text-xs text-zinc-400">Coupon code automatically applied</span>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E86A92]">
            DIRECT SOURCING
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">
            Top International Beauty Brands
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Guaranteed 100% genuine with certified batch verification.
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
              What Bangladeshi Beauties Say
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Real reviews from verified buyers across Dhaka, Chittagong, Sylhet, and beyond.
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
          FOLLOW OUR GLOW
        </span>
        <h2 className="font-display text-2xl font-bold text-zinc-900 mt-1 mb-6">
          @GlowAura.BD on Instagram
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
