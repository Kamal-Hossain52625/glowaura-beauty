import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductSlug,
    addToCart,
    navigateTo,
    isInWishlist,
    toggleWishlist,
    reviews,
    addReview,
    currentUser
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'how-to' | 'specs'>('desc');

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewName, setReviewName] = useState(currentUser?.name || '');
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  // Find product
  const product =
    products.find((p) => p.slug === selectedProductSlug) ||
    products[0];

  const productReviews = reviews.filter((r) => r.productId === product.id);

  const discountPercent =
    product.regularPrice > product.discountPrice
      ? Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)
      : 0;

  const isLiked = isInWishlist(product.id);

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) return;

    addReview({
      productId: product.id,
      productName: product.name,
      customerName: reviewName.trim() || 'Verified Customer',
      customerEmail: currentUser?.email || 'customer@glowaurabd.com',
      rating: reviewRating,
      title: reviewTitle.trim(),
      comment: reviewComment.trim(),
      verifiedPurchase: true
    });

    setReviewTitle('');
    setReviewComment('');
    setIsReviewFormOpen(false);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    navigateTo('checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500">
        <button onClick={() => navigateTo('home')} className="hover:text-zinc-900 cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <button
          onClick={() => navigateTo('shop', product.category)}
          className="hover:text-zinc-900 cursor-pointer"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <span className="text-zinc-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Info & Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square w-full rounded-3xl overflow-hidden border border-[#F8E8EE] bg-pink-50/20 shadow-xs relative">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-[#E86A92] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnail list */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#E86A92] ring-2 ring-pink-100 scale-95'
                      : 'border-zinc-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E86A92]">
                {product.brand}
              </span>
              <span className="text-xs text-zinc-400 font-mono">SKU: {product.sku}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">
              {product.name}
            </h1>

            {/* Ratings and Reviews count */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-zinc-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-zinc-900">{product.rating} / 5.0</span>
              <span className="text-zinc-300">·</span>
              <span className="text-xs text-zinc-500">
                {product.reviewCount} Verified Customer Reviews
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-[#F8E8EE]/40 p-4 rounded-2xl border border-pink-100 flex items-baseline gap-4">
              <span className="text-3xl font-extrabold text-[#222222]">
                ৳{product.discountPrice.toLocaleString()}
              </span>
              {product.discountPrice < product.regularPrice && (
                <>
                  <span className="text-sm text-zinc-400 line-through">
                    ৳{product.regularPrice.toLocaleString()}
                  </span>
                  <span className="bg-[#E86A92] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Short overview */}
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Stock status indicator */}
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  product.stockQuantity > 0 ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              />
              <span className="font-bold text-zinc-800">
                {product.stockQuantity > 0
                  ? `In Stock (${product.stockQuantity} units left in Dhaka Hub)`
                  : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-4 pt-4 border-t border-zinc-100">
            {/* Quantity Selector & Wishlist */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-zinc-600 hover:bg-zinc-200 text-sm font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-bold text-zinc-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-zinc-600 hover:bg-zinc-200 text-sm font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold ${
                  isLiked
                    ? 'border-[#E86A92] bg-pink-50 text-[#E86A92]'
                    : 'border-zinc-200 text-zinc-700 hover:text-[#E86A92]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => addToCart(product, quantity, true)}
                disabled={product.stockQuantity <= 0}
                className="w-full bg-[#E86A92] hover:bg-[#d6577e] text-white py-3.5 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stockQuantity <= 0}
                className="w-full bg-[#222222] hover:bg-black text-white py-3.5 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                Buy Now (Fast Checkout)
              </button>
            </div>

            {/* Delivery & Authenticity Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-3 text-xs text-zinc-600">
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#E86A92] shrink-0" />
                <span>Inside Dhaka ৳60 / Outside Dhaka ৳120</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Genuine Barcoded Import</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed In-Depth Information */}
      <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Tab Headers */}
        <div className="flex items-center gap-2 sm:gap-4 border-b border-zinc-100 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'desc'
                ? 'text-[#E86A92] border-b-2 border-[#E86A92]'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Product Description
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'ingredients'
                ? 'text-[#E86A92] border-b-2 border-[#E86A92]'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Full Ingredients List
          </button>
          <button
            onClick={() => setActiveTab('how-to')}
            className={`pb-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'how-to'
                ? 'text-[#E86A92] border-b-2 border-[#E86A92]'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            How to Use
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'specs'
                ? 'text-[#E86A92] border-b-2 border-[#E86A92]'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Specifications
          </button>
        </div>

        {/* Tab Contents */}
        <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
          {activeTab === 'desc' && (
            <div className="space-y-4">
              <p>{product.description}</p>
              <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
                <h4 className="font-bold text-zinc-900 mb-1">Authenticity Guaranteed</h4>
                <p className="text-xs text-zinc-600">
                  Every product sold by GlowAura is directly imported through verified distributors in South Korea, Canada, USA, and France. We do not sell replicas or unverified goods.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-3">
              <p className="font-bold text-zinc-900">Key & Inactive Ingredients:</p>
              <p className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-xs font-mono leading-relaxed text-zinc-600">
                {product.ingredients}
              </p>
            </div>
          )}

          {activeTab === 'how-to' && (
            <div className="space-y-3">
              <p className="font-bold text-zinc-900">Recommended Application Routine:</p>
              <p className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-xs sm:text-sm">
                {product.usageInstructions}
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="divide-y divide-zinc-100">
              {Object.entries(product.specifications || {}).map(([key, val]) => (
                <div key={key} className="py-2.5 flex justify-between text-xs">
                  <span className="font-semibold text-zinc-500">{key}</span>
                  <span className="font-medium text-zinc-900">{val}</span>
                </div>
              ))}
              <div className="py-2.5 flex justify-between text-xs">
                <span className="font-semibold text-zinc-500">Country of Origin</span>
                <span className="font-medium text-zinc-900">
                  {product.countryOfOrigin || 'South Korea'}
                </span>
              </div>
              <div className="py-2.5 flex justify-between text-xs">
                <span className="font-semibold text-zinc-500">Volume / Net Weight</span>
                <span className="font-medium text-zinc-900">
                  {product.volumeOrSize || 'Standard'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews & Write a Review Form */}
      <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-zinc-900">
              Customer Reviews ({productReviews.length})
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Verified feedback from buyers who purchased this item
            </p>
          </div>

          <button
            onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
            className="bg-[#E86A92] hover:bg-[#d6577e] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            Write a Review
          </button>
        </div>

        {/* Review Form Drawer/Collapse */}
        {isReviewFormOpen && (
          <form
            onSubmit={handleReviewSubmit}
            className="bg-[#F8E8EE]/40 p-5 rounded-2xl border border-pink-100 space-y-4 animate-in fade-in"
          >
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Share Your Experience with {product.name}
            </h4>

            {/* Star selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-700">Rating:</span>
              <div className="flex gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className={`w-5 h-5 cursor-pointer ${
                      star <= reviewRating ? 'fill-amber-400' : 'text-zinc-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-zinc-800">({reviewRating} / 5)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name (e.g. Nusrat Jahan)"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                required
                className="bg-white border border-zinc-200 text-xs px-3 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
              />

              <input
                type="text"
                placeholder="Headline (e.g. Best sunscreen for summer!)"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                required
                className="bg-white border border-zinc-200 text-xs px-3 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92]"
              />
            </div>

            <textarea
              rows={3}
              placeholder="Tell others how this product worked for your skin texture, finish, and hydration..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              required
              className="w-full bg-white border border-zinc-200 text-xs p-3 rounded-xl outline-hidden focus:border-[#E86A92]"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsReviewFormOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#222222] hover:bg-black text-white text-xs font-bold px-6 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        {productReviews.length === 0 ? (
          <p className="text-xs text-zinc-500 py-4 text-center">
            Be the first verified customer to review this product!
          </p>
        ) : (
          <div className="divide-y divide-zinc-100">
            {productReviews.map((rev) => (
              <div key={rev.id} className="py-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-zinc-900">{rev.customerName}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Order
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400">{rev.date}</span>
                </div>

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

                <p className="text-xs font-bold text-zinc-900">{rev.title}</p>
                <p className="text-xs text-zinc-600 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="font-display text-2xl font-bold text-zinc-900">
            You May Also Love
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
