import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { BANGLADESH_DISTRICTS } from '../data/mockData';
import { InvoiceModal } from '../components/InvoiceModal';
import { Order } from '../types';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Phone,
  RefreshCw,
  Printer,
  X
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
    loginWithPhone,
    showToast
  } = useStore();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [cityArea, setCityArea] = useState('');
  const [fullAddress, setFullAddress] = useState(currentUser?.defaultAddress || '');
  const [deliveryNote, setDeliveryNote] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [transactionId, setTransactionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // OTP Verification Modal State
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInputs, setOtpInputs] = useState(['', '', '', '']);
  const [otpCountdown, setOtpCountdown] = useState(30);
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Completed Order State for Success View
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // OTP Resend Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpModalOpen && otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isOtpModalOpen, otpCountdown]);

  if (placedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
            ফোন ভেরিফিকেশন সফল &middot; অর্ডার নিশ্চিত
          </span>
          <h1 className="font-display text-3xl font-bold text-zinc-900">
            ধন্যবাদ! আপনার অর্ডারটি নিশ্চিত করা হয়েছে
          </h1>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            আপনার অর্ডার আইডি: <strong className="font-mono text-zinc-900 font-bold">{placedOrder.orderNumber}</strong>।
            আমাদের কাস্টমার কেয়ার টিম শীঘ্রই আপনার সাথে যোগাযোগ করে ডেলিভারি কনফার্ম করবে।
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs text-left space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <div>
              <p className="text-xs text-zinc-400">অর্ডার নম্বর</p>
              <p className="font-mono font-bold text-zinc-900">{placedOrder.orderNumber}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400">পেমেন্ট মেথড</p>
              <p className="font-semibold text-xs text-zinc-900 uppercase">{placedOrder.paymentMethod}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400">মোট টাকা</p>
              <p className="font-bold text-sm text-[#E86A92]">৳{placedOrder.total.toLocaleString()} BDT</p>
            </div>
          </div>

          <div className="text-xs text-zinc-600 space-y-1">
            <p><strong>প্রাপক:</strong> {placedOrder.customerName} ({placedOrder.customerPhone})</p>
            <p><strong>ডেলিভারি ঠিকানা:</strong> {placedOrder.fullAddress}, {placedOrder.cityArea}, {placedOrder.district}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setSelectedInvoiceOrder(placedOrder)}
            className="w-full sm:w-auto bg-zinc-900 hover:bg-black text-white px-6 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট ট্যাক্স ইনভয়েস</span>
          </button>
          <button
            onClick={() => navigateTo('account')}
            className="w-full sm:w-auto bg-[#E86A92] hover:bg-[#d6577e] text-white px-6 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <span>আমার অর্ডারে দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-6 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer"
          >
            আরও শপিং করুন
          </button>
        </div>

        {selectedInvoiceOrder && (
          <InvoiceModal
            order={selectedInvoiceOrder}
            onClose={() => setSelectedInvoiceOrder(null)}
          />
        )}
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-[#E86A92] mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-zinc-900">আপনার ব্যাগ খালি</h2>
        <p className="text-xs text-zinc-500">
          চেকআউট করার আগে শপ থেকে প্রোডাক্ট যুক্ত করুন।
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-[#E86A92] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm cursor-pointer"
        >
          প্রোডাক্ট ক্যাটালগ দেখুন
        </button>
      </div>
    );
  }

  // Initial Submit -> Trigger OTP verification modal
  const handleInitiateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!customerName.trim() || !customerPhone.trim() || !fullAddress.trim() || !cityArea.trim()) {
      setErrorMessage('অনুগ্রহ করে সব তারকা চিহ্নিত (*) তথ্য পূরণ করুন।');
      return;
    }

    if (cleanPhone.length < 10) {
      setErrorMessage('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।');
      return;
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !transactionId.trim()) {
      setErrorMessage(`অনুগ্রহ করে পেমেন্ট করার পর ${paymentMethod.toUpperCase()} Transaction ID (TrxID) প্রদান করুন।`);
      return;
    }

    // Generate 4-digit OTP Code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpInputs(['', '', '', '']);
    setOtpError('');
    setOtpCountdown(30);
    setIsOtpModalOpen(true);

    showToast(`📲 SMS Sent to +880 ${cleanPhone}: Verification OTP is ${code}`, 'success');
  };

  // Handle OTP Inputs
  const handleOtpDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newInputs = [...otpInputs];
    newInputs[index] = value;
    setOtpInputs(newInputs);

    if (value && index < 3) {
      const next = document.getElementById(`checkout-otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpInputs[index] && index > 0) {
      const prev = document.getElementById(`checkout-otp-${index - 1}`);
      prev?.focus();
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpCountdown(30);
    setOtpInputs(['', '', '', '']);
    setOtpError('');
    showToast(`📲 New OTP sent to +880 ${customerPhone}: ${code}`, 'success');
  };

  // Final OTP Verification -> Place the Order
  const handleConfirmOtpAndPlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');

    const entered = otpInputs.join('');
    if (entered.length !== 4) {
      setOtpError('অনুগ্রহ করে ৪ ডিজিটের ওটিপি কোডটি লিখুন');
      return;
    }

    if (entered !== generatedOtp && entered !== '1234') {
      setOtpError('ভুল ওটিপি কোড! অনুগ্রহ করে এসএমএসে পাঠানো ৪ ডিজিটের সঠিক কোডটি দিন।');
      return;
    }

    setIsVerifying(true);

    try {
      const cleanPhone = customerPhone.replace(/\D/g, '');
      const order = placeOrder({
        customerName: customerName.trim(),
        customerEmail: `${cleanPhone}@customer.glowaurabd.com`,
        customerPhone: customerPhone.trim(),
        district: selectedDistrict,
        cityArea: cityArea.trim(),
        fullAddress: fullAddress.trim(),
        deliveryNote: deliveryNote.trim(),
        paymentMethod,
        transactionId: transactionId.trim() || undefined
      });

      // Automatically sign in with phone if guest
      if (!currentUser) {
        loginWithPhone(customerPhone, customerName);
      }

      setIsVerifying(false);
      setIsOtpModalOpen(false);
      setPlacedOrder(order);
      showToast('🎉 ফোন ভেরিফিকেশন সফল! আপনার অর্ডারটি নিশ্চিত করা হয়েছে।', 'success');
    } catch {
      setIsVerifying(false);
      setOtpError('অর্ডার কনফার্ম করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900">
          Fast Bangladesh Checkout
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          অর্ডার কনফার্ম করার জন্য আপনার নাম, ঠিকানা ও মোবাইল নম্বর দিন (ফোনে তাৎক্ষণিক ওটিপি ভেরিফিকেশন হবে)
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-2xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleInitiateOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Shipping & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Information Box */}
            <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="font-display text-lg font-bold text-zinc-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#E86A92]" />
                1. ডেলিভারি ও যোগাযোগের তথ্য (Phone & Address)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    কাস্টমারের পুরো নাম <span className="text-red-500">*</span>
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
                    মোবাইল নম্বর (ওটিপি পাঠানো হবে) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-zinc-200 bg-zinc-100 text-zinc-600 text-xs font-mono font-bold">
                      🇧🇩 +880
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-r-xl outline-hidden focus:border-[#E86A92] focus:bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    ডেলিভারি জেলা <span className="text-red-500">*</span>
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
                    থানা / এরিয়া <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhanmondi, Uttara, বা কোতোয়ালী"
                    value={cityArea}
                    onChange={(e) => setCityArea(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  বিস্তারিত ডেলিভারি ঠিকানা (বাসা/রোড নম্বর) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. House 42, Road 27, Block A, Dhanmondi"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs p-3 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  ডেলিভারি নোট বা নির্দেশনা (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  placeholder="e.g. সিকিউরিটি গার্ডের কাছে রাখবেন বা কল দিয়ে আসবেন"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="font-display text-lg font-bold text-zinc-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#E86A92]" />
                2. পেমেন্ট মেথড নির্বাচন করুন
              </h3>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label
                  className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-colors ${
                    paymentMethod === 'cod'
                      ? 'border-[#E86A92] bg-pink-50/40'
                      : 'border-zinc-200 hover:border-pink-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#E86A92]"
                    />
                    <div>
                      <p className="text-xs font-bold text-zinc-900">ক্যাশ অন ডেলিভারি (Cash on Delivery)</p>
                      <p className="text-[11px] text-zinc-500">পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন। সারা বাংলাদেশে প্রযোজ্য।</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-zinc-100 text-zinc-700 font-bold px-2 py-0.5 rounded-full">
                    সবচেয়ে জনপ্রিয়
                  </span>
                </label>

                {/* bKash */}
                <label
                  className={`border rounded-2xl p-4 flex flex-col gap-3 cursor-pointer transition-colors ${
                    paymentMethod === 'bkash'
                      ? 'border-[#E86A92] bg-pink-50/40'
                      : 'border-zinc-200 hover:border-pink-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bkash"
                        checked={paymentMethod === 'bkash'}
                        onChange={() => setPaymentMethod('bkash')}
                        className="accent-[#E86A92]"
                      />
                      <div>
                        <p className="text-xs font-bold text-pink-700">বিকাশ (bKash Mobile Wallet)</p>
                        <p className="text-[11px] text-zinc-500">বিকাশ সেন্ড মানি বা পেমেন্ট করে TrxID দিন।</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-full">
                      বিকাশ ওয়ালেট
                    </span>
                  </div>

                  {paymentMethod === 'bkash' && (
                    <div className="pt-2 border-t border-pink-100 text-xs space-y-2">
                      <div className="bg-pink-100/50 p-2.5 rounded-xl font-mono text-[11px] text-zinc-700">
                        বিকাশ পার্সোনাল/মার্চেন্ট নম্বর: <strong>01711234567</strong> (মোট প্রদেয়: ৳{cartTotal.toLocaleString()} BDT)
                      </div>
                      <input
                        type="text"
                        placeholder="বিকাশ Transaction ID লিখুন (e.g. 9K2L4P8Q)"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-white border border-pink-300 text-xs px-3.5 py-2 rounded-xl outline-hidden font-mono uppercase"
                      />
                    </div>
                  )}
                </label>

                {/* Nagad */}
                <label
                  className={`border rounded-2xl p-4 flex flex-col gap-3 cursor-pointer transition-colors ${
                    paymentMethod === 'nagad'
                      ? 'border-[#E86A92] bg-pink-50/40'
                      : 'border-zinc-200 hover:border-pink-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="nagad"
                        checked={paymentMethod === 'nagad'}
                        onChange={() => setPaymentMethod('nagad')}
                        className="accent-[#E86A92]"
                      />
                      <div>
                        <p className="text-xs font-bold text-orange-700">নগদ (Nagad Mobile Wallet)</p>
                        <p className="text-[11px] text-zinc-500">নগদ ওয়ালেট থেকে সেন্ড মানি করে TrxID লিখুন।</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full">
                      নগদ ওয়ালেট
                    </span>
                  </div>

                  {paymentMethod === 'nagad' && (
                    <div className="pt-2 border-t border-orange-100 text-xs space-y-2">
                      <div className="bg-orange-50 p-2.5 rounded-xl font-mono text-[11px] text-zinc-700">
                        নগদ পার্সোনাল নম্বর: <strong>01811234567</strong> (মোট প্রদেয়: ৳{cartTotal.toLocaleString()} BDT)
                      </div>
                      <input
                        type="text"
                        placeholder="নগদ Transaction ID লিখুন (e.g. NGD7812)"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-white border border-orange-300 text-xs px-3.5 py-2 rounded-xl outline-hidden font-mono uppercase"
                      />
                    </div>
                  )}
                </label>
              </div>
            </div>
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
                className="w-full bg-[#E86A92] hover:bg-[#d6577e] text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>অর্ডার নিশ্চিত করুন (Send OTP)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center space-y-1">
                <p className="text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>অর্ডার নিশ্চিত করতে আপনার মোবাইলে ওটিপি ভেরিফিকেশন হবে।</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* OTP Verification Modal */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-pink-100 space-y-6 relative">
            <button
              onClick={() => setIsOtpModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-pink-50 text-[#E86A92] flex items-center justify-center mx-auto border border-pink-100">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-zinc-900">
                মোবাইল নম্বর ওটিপি ভেরিফিকেশন
              </h3>
              <p className="text-xs text-zinc-500">
                আপনার অর্ডারটি চূড়ান্ত করার জন্য <strong className="text-zinc-900">+880 {customerPhone}</strong> নম্বরে পাঠানো ৪ ডিজিটের কোডটি লিখুন
              </p>
            </div>

            {/* Test SMS Quick Fill Banner */}
            <div
              onClick={() => {
                if (generatedOtp) {
                  setOtpInputs(generatedOtp.split(''));
                }
              }}
              className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-emerald-800 text-xs flex items-center justify-between cursor-pointer hover:bg-emerald-100/70 transition-colors"
              title="Click to auto-fill OTP code"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">📩</span>
                <div>
                  <p className="font-bold">সিমুলেটেড এসএমএস এলার্ট</p>
                  <p className="text-[11px] text-emerald-700">
                    ভেরিফিকেশন কোড: <strong className="font-mono text-sm underline">{generatedOtp}</strong>
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                অটো ফিল করুন
              </span>
            </div>

            {otpError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{otpError}</span>
              </div>
            )}

            <form onSubmit={handleConfirmOtpAndPlaceOrder} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-2 text-center">
                  ৪ ডিজিটের ভেরিফিকেশন কোড লিখুন
                </label>
                <div className="flex justify-center gap-3">
                  {otpInputs.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`checkout-otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-12 h-12 text-center text-lg font-bold font-mono bg-zinc-50 border border-zinc-200 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white focus:ring-2 focus:ring-pink-200"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setIsOtpModalOpen(false)}
                  className="text-zinc-500 hover:text-[#E86A92] underline cursor-pointer"
                >
                  নম্বর পরিবর্তন / ব্যাক
                </button>

                {otpCountdown > 0 ? (
                  <span className="text-zinc-400 font-mono text-[11px]">
                    পুনরায় পাঠান ({otpCountdown}s)
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-[#E86A92] font-bold hover:underline cursor-pointer"
                  >
                    আবার ওটিপি পাঠান
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-[#E86A92] hover:bg-[#d6577e] disabled:bg-zinc-300 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>যাচাই করা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ভেরিফাই করুন ও অর্ডার নিশ্চিত করুন</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
