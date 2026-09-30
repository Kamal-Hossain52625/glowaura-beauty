import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  X,
  Search,
  Check,
  Star,
  RotateCcw
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    brands,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [sortOption, setSortOption] = useState<
    'latest' | 'popular' | 'price-low' | 'price-high' | 'rating' | 'discount'
  >('latest');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search
        if (
          searchQuery.trim() &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.sku.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Category
        if (selectedCategory && p.category !== selectedCategory) {
          return false;
        }

        // Brand
        if (selectedBrand && p.brand !== selectedBrand) {
          return false;
        }

        // Stock
        if (inStockOnly && p.stockQuantity <= 0) {
          return false;
        }

        // On Sale
        if (onSaleOnly && p.discountPrice >= p.regularPrice) {
          return false;
        }

        // Price
        const effectivePrice = p.discountPrice || p.regularPrice;
        if (effectivePrice < minPrice || effectivePrice > maxPrice) {
          return false;
        }

        // Rating
        if (selectedRating !== null && p.rating < selectedRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.discountPrice || a.regularPrice;
        const priceB = b.discountPrice || b.regularPrice;

        if (sortOption === 'price-low') return priceA - priceB;
        if (sortOption === 'price-high') return priceB - priceA;
        if (sortOption === 'rating') return b.rating - a.rating;
        if (sortOption === 'popular') return b.reviewCount - a.reviewCount;
        if (sortOption === 'discount') {
          const discA = a.regularPrice - a.discountPrice;
          const discB = b.regularPrice - b.discountPrice;
          return discB - discA;
        }
        // latest
        return b.id.localeCompare(a.id);
      });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedBrand,
    inStockOnly,
    onSaleOnly,
    minPrice,
    maxPrice,
    selectedRating,
    sortOption
  ]);

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSearchQuery('');
    setInStockOnly(false);
    setOnSaleOnly(false);
    setMinPrice(0);
    setMaxPrice(5000);
    setSelectedRating(null);
  };

  const hasActiveFilters =
    selectedCategory !== null ||
    selectedBrand !== null ||
    searchQuery !== '' ||
    inStockOnly ||
    onSaleOnly ||
    minPrice > 0 ||
    maxPrice < 5000 ||
    selectedRating !== null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Title & Breadcrumb */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900">
            {selectedCategory ? `${selectedCategory} Collection` : 'All Beauty & Cosmetics'}
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Showing {filteredProducts.length} of {products.length} verified products
          </p>
        </div>

        {/* Mobile Filter Trigger */}
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="lg:hidden bg-zinc-900 text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters {hasActiveFilters && '(Active)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-white border border-[#F8E8EE] rounded-2xl p-5 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-[#E86A92]" />
                Filters
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#E86A92] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5">
                Category
              </h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left text-xs py-1 px-2 rounded-lg transition-colors flex justify-between items-center cursor-pointer ${
                    selectedCategory === null
                      ? 'bg-pink-50 text-[#E86A92] font-bold'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat.name).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() =>
                        setSelectedCategory(selectedCategory === cat.name ? null : cat.name)
                      }
                      className={`w-full text-left text-xs py-1 px-2 rounded-lg transition-colors flex justify-between items-center cursor-pointer ${
                        selectedCategory === cat.name
                          ? 'bg-pink-50 text-[#E86A92] font-bold'
                          : 'text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[11px] text-zinc-400">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brands */}
            <div className="border-t border-zinc-100 pt-4">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5">
                Brand
              </h4>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedBrand(null)}
                  className={`w-full text-left text-xs py-1 px-2 rounded-lg transition-colors flex justify-between items-center cursor-pointer ${
                    selectedBrand === null
                      ? 'bg-pink-50 text-[#E86A92] font-bold'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <span>All Brands</span>
                  <span>{products.length}</span>
                </button>
                {brands.map((b) => {
                  const count = products.filter((p) => p.brand === b.name).length;
                  return (
                    <button
                      key={b.id}
                      onClick={() =>
                        setSelectedBrand(selectedBrand === b.name ? null : b.name)
                      }
                      className={`w-full text-left text-xs py-1 px-2 rounded-lg transition-colors flex justify-between items-center cursor-pointer ${
                        selectedBrand === b.name
                          ? 'bg-pink-50 text-[#E86A92] font-bold'
                          : 'text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      <span className="truncate">{b.name}</span>
                      <span className="text-[11px] text-zinc-400">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="border-t border-zinc-100 pt-4">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5">
                Price (BDT ৳)
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  min={0}
                  max={5000}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  placeholder="Min"
                  className="w-1/2 text-xs border border-zinc-200 rounded-lg p-1.5 outline-hidden"
                />
                <span className="text-xs text-zinc-400">-</span>
                <input
                  type="number"
                  min={0}
                  max={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  placeholder="Max"
                  className="w-1/2 text-xs border border-zinc-200 rounded-lg p-1.5 outline-hidden"
                />
              </div>
              <input
                type="range"
                min={0}
                max={5000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#E86A92] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                <span>৳0</span>
                <span>Max: ৳{maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Availability & Offers */}
            <div className="border-t border-zinc-100 pt-4 space-y-2">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                Availability
              </h4>
              <label className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#E86A92] focus:ring-pink-400"
                />
                <span>In Stock only</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="rounded text-[#E86A92] focus:ring-pink-400"
                />
                <span>Discounted offers %</span>
              </label>
            </div>

            {/* Minimum Rating */}
            <div className="border-t border-zinc-100 pt-4">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                Rating
              </h4>
              <div className="space-y-1">
                {[4.8, 4.5, 4.0].map((stars) => (
                  <button
                    key={stars}
                    onClick={() =>
                      setSelectedRating(selectedRating === stars ? null : stars)
                    }
                    className={`w-full text-left text-xs py-1 px-2 rounded-lg flex items-center justify-between cursor-pointer ${
                      selectedRating === stars
                        ? 'bg-pink-50 text-[#E86A92] font-bold'
                        : 'text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{stars} & above</span>
                    </div>
                    {selectedRating === stars && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Catalog Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort & View Bar */}
          <div className="bg-white border border-[#F8E8EE] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-700">Sort By:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 rounded-xl px-3 py-1.5 outline-hidden focus:border-[#E86A92] cursor-pointer"
              >
                <option value="latest">Latest Arrivals</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedCategory && (
                    <span className="bg-pink-100 text-[#E86A92] text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                      {selectedCategory}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedCategory(null)}
                      />
                    </span>
                  )}
                  {selectedBrand && (
                    <span className="bg-pink-100 text-[#E86A92] text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                      {selectedBrand}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedBrand(null)}
                      />
                    </span>
                  )}
                </div>
              )}

              {/* View Toggle */}
              <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden ml-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 ${
                    viewMode === 'grid'
                      ? 'bg-zinc-900 text-white'
                      : 'text-zinc-500 hover:bg-zinc-100'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 ${
                    viewMode === 'list'
                      ? 'bg-zinc-900 text-white'
                      : 'text-zinc-500 hover:bg-zinc-100'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-[#F8E8EE] rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-[#E86A92] mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-zinc-900">No matching products</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Try widening your price range, clearing your search query, or resetting filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-[#E86A92] hover:bg-[#d6577e] text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-6 animate-in slide-in-from-right">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm">Filter Products</h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 rounded-full text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category */}
            <div>
              <h4 className="text-xs font-bold uppercase mb-2">Category</h4>
              <div className="space-y-1">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCategory(c.name);
                      setIsMobileFiltersOpen(false);
                    }}
                    className="w-full text-left text-xs py-1.5 text-zinc-700"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                clearAllFilters();
                setIsMobileFiltersOpen(false);
              }}
              className="w-full bg-zinc-100 text-zinc-800 text-xs font-semibold py-2.5 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
