import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct
  } = useStore();

  const isLiked = isInWishlist(product.id);
  const discountPercent =
    product.regularPrice > product.discountPrice
      ? Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)
      : 0;

  return (
    <div className="group relative bg-white border border-[#F8E8EE] rounded-2xl overflow-hidden hover:border-[#E86A92]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-pink-50/20">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onClick={() => navigateTo('product-detail', product.slug)}
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-[#E86A92] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            -{discountPercent}%
          </div>
        )}

        {/* Out of Stock Badge */}
        {product.stockQuantity <= 0 && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-zinc-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}

        {/* Floating Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer ${
              isLiked ? 'bg-[#E86A92] text-white' : 'bg-white/90 text-zinc-700 hover:text-[#E86A92]'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-8 h-8 rounded-full bg-white/90 text-zinc-700 hover:text-[#E86A92] flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Size */}
          <div className="flex items-center justify-between text-xs text-[#777777] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#E86A92] text-[11px]">
              {product.brand}
            </span>
            {product.volumeOrSize && (
              <span className="text-[10px] text-zinc-400 font-medium">
                {product.volumeOrSize}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3
            onClick={() => navigateTo('product-detail', product.slug)}
            className="font-medium text-zinc-900 text-sm line-clamp-2 hover:text-[#E86A92] cursor-pointer transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-zinc-800">{product.rating}</span>
            <span className="text-[11px] text-zinc-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-[#222222]">
                ৳{product.discountPrice.toLocaleString()}
              </span>
              {product.discountPrice < product.regularPrice && (
                <span className="text-xs text-zinc-400 line-through">
                  ৳{product.regularPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stockQuantity <= 0}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              product.stockQuantity <= 0
                ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                : 'bg-[#E86A92] hover:bg-[#d6577e] text-white hover:shadow-md'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
