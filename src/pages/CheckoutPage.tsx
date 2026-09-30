import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BANGLADESH_DISTRICTS } from '../data/mockData';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryCharge,
    cartTotal,
    selectedDistrict,
    setSelectedDistrict,
    placeOrder,
    navigateTo,
    currentUser,
    appliedCoupon,
    settings
  } = useStore();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [cityArea, setCityArea] = useState('');
  const [fullAddress, setFullAddress] = useState(currentUser?.defaultAddress || '');
  const [deliveryNote, setDeliveryNote] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [transactionId, setTransactionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-[#E86A92] mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-zinc-900">Your bag is empty</h2>
        <p className="text-xs text-zinc-500">
          Add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-[#E86A92] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim() || !customerPhone.trim() || !fullAddress.trim() || !cityArea.trim()) {
      setErrorMessage('Please fill in all required shipping fields.');
      return;
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !transactionId.trim()) {
      setErrorMessage(`Please provide the ${paymentMethod.toUpperCase()} Transaction ID (TrxID) after payment.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const order = placeOrder({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim() || 'customer@glowaurabd.com',
        customerPhone: customerPhone.trim(),
        district: selectedDistrict,
        cityArea: cityArea.trim(),
        fullAddress: fullAddress.trim(),
        deliveryNote: deliveryNote.trim(),
        paymentMethod,
        transactionId: transactionId.trim() || undefined
      });

      setIsSubmitting(false);
      navigateTo('order-tracking', order.orderNumber);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage('Could not place order. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900">
          Fast Bangladesh Checkout
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Complete your delivery and payment details to receive your order
        </p>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Shipping & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Information Box */}
            <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="font-display text-lg font-bold text-zinc-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#E86A92]" />
                1. Delivery & Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Afrin"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Mobile Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Email Address (For receipt & tracking updates)
                </label>
                <input
                  type="email"
                  placeholder="e.g. yourname@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Delivery District <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white cursor-pointer"
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
                    Area / Thana / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhanmondi, Banani, Uttara, Nasirabad"
                    value={cityArea}
                    onChange={(e) => setCityArea(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Complete Street Address / House / Flat <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="House No, Road No, Sector / Block, Landmark..."
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs p-3 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Courier Note / Preferred Delivery Time (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Deliver after 2:00 PM, call before arrival"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2 rounded-xl outline-hidden focus:border-[#E86A92]"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="font-display text-lg font-bold text-zinc-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#E86A92]" />
                2. Select Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'cod'
                      ? 'border-[#E86A92] bg-pink-50/40'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-zinc-900">Cash on Delivery</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'cod'
                          ? 'border-[#E86A92] bg-[#E86A92]'
                          : 'border-zinc-300'
                      }`}
                    >
                      {paymentMethod === 'cod' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500">Pay cash to courier upon receiving.</p>
                </div>

                {/* bKash */}
                <div
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'bkash'
                      ? 'border-[#E86A92] bg-pink-50/40'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-pink-700">bKash Payment</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'bkash'
                          ? 'border-[#E86A92] bg-[#E86A92]'
                          : 'border-zinc-300'
                      }`}
                    >
                      {paymentMethod === 'bkash' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500">Fast bKash Merchant / Personal transfer.</p>
                </div>

                {/* Nagad */}
                <div
                  onClick={() => setPaymentMethod('nagad')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'nagad'
                      ? 'border-[#E86A92] bg-pink-50/40'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-orange-700">Nagad Payment</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'nagad'
                          ? 'border-[#E86A92] bg-[#E86A92]'
                          : 'border-zinc-300'
                      }`}
                    >
                      {paymentMethod === 'nagad' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500">Direct Nagad wallet payment.</p>
                </div>
              </div>

              {/* bKash Instructions Box */}
              {paymentMethod === 'bkash' && (
                <div className="p-4 bg-pink-50 rounded-2xl border border-pink-200 text-xs space-y-2 animate-in fade-in">
                  <p className="font-bold text-pink-900">bKash Payment Instructions:</p>
                  <ol className="list-decimal list-inside text-zinc-700 space-y-1 text-[11px]">
                    <li>
                      Go to your bKash Mobile App or dial <span className="font-mono font-bold">*247#</span>
                    </li>
                    <li>
                      Select <span className="font-bold">Payment</span> or <span className="font-bold">Send Money</span>
                    </li>
                    <li>
                      Enter Merchant / Store Number:{' '}
                      <span className="font-mono font-bold text-pink-800">
                        {settings.bkashMerchantNumber}
                      </span>
                    </li>
                    <li>
                      Enter Exact Amount:{' '}
                      <span className="font-bold text-zinc-900">৳{cartTotal.toLocaleString()}</span>
                    </li>
                    <li>Complete transaction and paste the 10-character TrxID below:</li>
                  </ol>

                  <div className="pt-2">
                    <label className="block text-xs font-bold text-pink-900 mb-1">
                      bKash Transaction ID (TrxID) <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. BK9284XZ10"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-pink-300 text-xs font-mono font-bold px-3 py-2 rounded-xl outline-hidden focus:border-[#E86A92]"
                    />
                  </div>
                </div>
              )}

              {/* Nagad Instructions Box */}
              {paymentMethod === 'nagad' && (
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 text-xs space-y-2 animate-in fade-in">
                  <p className="font-bold text-orange-900">Nagad Payment Instructions:</p>
                  <ol className="list-decimal list-inside text-zinc-700 space-y-1 text-[11px]">
                    <li>
                      Go to your Nagad App or dial <span className="font-mono font-bold">*167#</span>
                    </li>
                    <li>
                      Select <span className="font-bold">Merchant Pay</span>
                    </li>
                    <li>
                      Enter Store Number:{' '}
                      <span className="font-mono font-bold text-orange-800">
                        {settings.nagadMerchantNumber}
                      </span>
                    </li>
                    <li>
                      Enter Exact Amount:{' '}
                      <span className="font-bold text-zinc-900">৳{cartTotal.toLocaleString()}</span>
                    </li>
                    <li>Enter TrxID below for auto-verification:</li>
                  </ol>

                  <div className="pt-2">
                    <label className="block text-xs font-bold text-orange-900 mb-1">
                      Nagad Transaction ID (TrxID) <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NG81029XA"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-orange-300 text-xs font-mono font-bold px-3 py-2 rounded-xl outline-hidden focus:border-orange-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-5 sticky top-28">
              <h3 className="font-display text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-3">
                Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-zinc-50">
                {cart.map((item) => (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover border border-zinc-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase font-bold text-[#E86A92]">
                        {item.product.brand}
                      </p>
                      <p className="text-xs font-semibold text-zinc-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        Qty: {item.quantity} × ৳{(item.product.discountPrice || item.product.regularPrice).toLocaleString()}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-zinc-900">
                      ৳{((item.product.discountPrice || item.product.regularPrice) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="border-t border-zinc-100 pt-3 space-y-2 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900">
                    ৳{cartSubtotal.toLocaleString()}
                  </span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-৳{cartDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>
                    Delivery Fee ({selectedDistrict === 'Dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})
                  </span>
                  <span className="font-semibold text-zinc-900">
                    {cartDeliveryCharge === 0 ? 'FREE' : `৳${cartDeliveryCharge}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-zinc-900 pt-2 border-t border-zinc-200">
                  <span>Total Amount</span>
                  <span className="text-[#E86A92]">৳{cartTotal.toLocaleString()} BDT</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E86A92] hover:bg-[#d6577e] disabled:bg-zinc-300 text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>{isSubmitting ? 'Confirming Order...' : 'Confirm & Place Order'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center space-y-1">
                <p className="text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Guaranteed authentic items delivered directly to your doorstep.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
