import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingBag, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    navigateTo,
    isInWishlist,
    toggleWishlist
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isLiked = isInWishlist(quickViewProduct.id);
  const discountPercent =
    quickViewProduct.regularPrice > quickViewProduct.discountPrice
      ? Math.round(
          ((quickViewProduct.regularPrice - quickViewProduct.discountPrice) /
            quickViewProduct.regularPrice) *
            100
        )
      : 0;

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity, false);
    setQuickViewProduct(null);
    navigateTo('checkout');
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, true);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-pink-100 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-zinc-100 text-zinc-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Column */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-zinc-50/50">
          <div className="aspect-square w-full rounded-2xl overflow-hidden border border-zinc-100 bg-white">
            <img
              src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#E86A92]' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-[#777777] mb-1">
              <span className="font-bold uppercase tracking-wider text-[#E86A92]">
                {quickViewProduct.brand}
              </span>
              <span>SKU: {quickViewProduct.sku}</span>
            </div>

            <h2 className="text-lg font-bold text-zinc-900 leading-snug">
              {quickViewProduct.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="text-xs font-bold text-zinc-800">
                {quickViewProduct.rating} / 5.0
              </span>
              <span className="text-xs text-zinc-400">
                ({quickViewProduct.reviewCount} customer reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 my-3">
              <span className="text-2xl font-extrabold text-[#222222]">
                ৳{quickViewProduct.discountPrice.toLocaleString()}
              </span>
              {quickViewProduct.discountPrice < quickViewProduct.regularPrice && (
                <>
                  <span className="text-sm text-zinc-400 line-through">
                    ৳{quickViewProduct.regularPrice.toLocaleString()}
                  </span>
                  <span className="bg-[#E86A92] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  quickViewProduct.stockQuantity > 0 ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              />
              <span className="font-medium text-zinc-700">
                {quickViewProduct.stockQuantity > 0
                  ? `In Stock (${quickViewProduct.stockQuantity} units available)`
                  : 'Currently Out of Stock'}
              </span>
            </div>

            <p className="text-xs text-zinc-600 line-clamp-3 mt-3 leading-relaxed">
              {quickViewProduct.shortDescription || quickViewProduct.description}
            </p>

            <div className="bg-[#F8E8EE]/40 p-2.5 rounded-xl border border-pink-100 flex items-center gap-2 mt-3 text-[11px] text-zinc-700">
              <ShieldCheck className="w-4 h-4 text-[#E86A92] shrink-0" />
              <span>100% Genuine product with verified batch code.</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-3 border-t border-zinc-100">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-zinc-700">Quantity:</span>
              <div className="flex items-center border border-zinc-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-zinc-600 hover:bg-zinc-100 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-zinc-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-zinc-600 hover:bg-zinc-100 text-sm font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ml-auto ${
                  isLiked
                    ? 'border-[#E86A92] bg-pink-50 text-[#E86A92]'
                    : 'border-zinc-200 text-zinc-600 hover:text-[#E86A92]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddToCart}
                disabled={quickViewProduct.stockQuantity <= 0}
                className="w-full bg-[#E86A92] hover:bg-[#d6577e] text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>

              <button
                onClick={handleBuyNow}
                disabled={quickViewProduct.stockQuantity <= 0}
                className="w-full bg-[#222222] hover:bg-black text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                Buy Now
              </button>
            </div>

            <button
              onClick={() => {
                setQuickViewProduct(null);
                navigateTo('product-detail', quickViewProduct.slug);
              }}
              className="w-full text-center text-xs font-semibold text-[#E86A92] hover:underline flex items-center justify-center gap-1 cursor-pointer pt-1"
            >
              <span>View Full Ingredients & How to Use</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
