import React, { useState } from 'react';
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
  X,
  Sparkles
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
    deliveryZone,
    setDeliveryZone,
    placeOrder,
    navigateTo,
    currentUser,
    loginWithPhone,
    showToast
  } = useStore();

  // Clean customer input state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [cityArea, setCityArea] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [transactionId, setTransactionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Completed Order State for Success View
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  if (placedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
            অর্ডার নিশ্চিত হয়েছে &middot; দ্রুততম ডেলিভারি
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

  // Direct 1-Click Order Placement (No OTP required)
  const handleDirectOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!customerName.trim() || !customerPhone.trim() || !district.trim() || !fullAddress.trim() || !cityArea.trim()) {
      setErrorMessage('অনুগ্রহ করে সব তারকা চিহ্নিত (*) তথ্য (নাম, মোবাইল নম্বর, জেলা, থানা/এরিয়া, পূর্ণ ঠিকানা) পূরণ করুন।');
      return;
    }

    if (cleanPhone.length < 10) {
      setErrorMessage('অনুগ্রহ করে সঠিক মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।');
      return;
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !transactionId.trim()) {
      setErrorMessage(`অনুগ্রহ করে পেমেন্ট করার পর ${paymentMethod.toUpperCase()} Transaction ID (TrxID) প্রদান করুন।`);
      return;
    }

    setIsPlacingOrder(true);

    try {
      const order = placeOrder({
        customerName: customerName.trim(),
        customerEmail: `${cleanPhone}@customer.ayatamat.com`,
        customerPhone: customerPhone.trim(),
        district: district.trim(),
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

      setIsPlacingOrder(false);
      setPlacedOrder(order);
      showToast('🎉 আপনার অর্ডারটি সফলভাবে কনফার্ম করা হয়েছে!', 'success');
    } catch {
      setIsPlacingOrder(false);
      setErrorMessage('অর্ডার কনফার্ম করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900">
          Fast Bangladesh Checkout
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          অর্ডার কনফার্ম করার জন্য আপনার নাম, ঠিকানা ও মোবাইল নম্বর দিন — ১ ক্লিকেই অর্ডার নিশ্চিত হবে!
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-2xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleDirectOrderSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Shipping & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Information Box */}
            <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="font-display text-lg font-bold text-zinc-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#E86A92]" />
                1. ডেলিভারি ও যোগাযোগের তথ্য (Phone & Address)
              </h3>

              {/* Delivery Charge 3 Options: Inside Dhaka-70, Sub Area Dhaka-100, Outside Dhaka-130 */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-zinc-800">
                    ডেলিভারি চার্জ নির্বাচন করুন <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-[#E86A92] font-bold">
                    {deliveryZone === 'inside_dhaka' && 'ঢাকা সিটি: ৳৭০'}
                    {deliveryZone === 'sub_dhaka' && 'ঢাকা সাব-এরিয়া: ৳১০০'}
                    {deliveryZone === 'outside_dhaka' && 'ঢাকার বাইরে: ৳১৩০'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Option 1: Inside Dhaka - 70 */}
                  <div
                    onClick={() => {
                      setDeliveryZone('inside_dhaka');
                    }}
                    className={`p-3.5 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                      deliveryZone === 'inside_dhaka'
                        ? 'border-[#E86A92] bg-pink-50/60 shadow-xs ring-1 ring-[#E86A92]/20'
                        : 'border-zinc-200 bg-zinc-50/50 hover:border-pink-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-zinc-900">Inside Dhaka</span>
                      <input
                        type="radio"
                        name="deliveryZone"
                        checked={deliveryZone === 'inside_dhaka'}
                        onChange={() => {
                          setDeliveryZone('inside_dhaka');
                        }}
                        className="text-[#E86A92] focus:ring-[#E86A92]"
                      />
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">ঢাকার ভিতরে</p>
                    <div className="mt-2.5 flex items-baseline justify-between pt-2 border-t border-zinc-100">
                      <span className="text-base font-black text-[#E86A92]">৳70</span>
                      <span className="text-[10px] text-zinc-400 font-medium">২৪-৪৮ ঘণ্টা</span>
                    </div>
                  </div>

                  {/* Option 2: Sub Area Dhaka - 100 */}
                  <div
                    onClick={() => {
                      setDeliveryZone('sub_dhaka');
                    }}
                    className={`p-3.5 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                      deliveryZone === 'sub_dhaka'
                        ? 'border-[#E86A92] bg-pink-50/60 shadow-xs ring-1 ring-[#E86A92]/20'
                        : 'border-zinc-200 bg-zinc-50/50 hover:border-pink-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-zinc-900">Sub Area Dhaka</span>
                      <input
                        type="radio"
                        name="deliveryZone"
                        checked={deliveryZone === 'sub_dhaka'}
                        onChange={() => {
                          setDeliveryZone('sub_dhaka');
                        }}
                        className="text-[#E86A92] focus:ring-[#E86A92]"
                      />
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">সাভার, কেরানীগঞ্জ, গাজীপুর</p>
                    <div className="mt-2.5 flex items-baseline justify-between pt-2 border-t border-zinc-100">
                      <span className="text-base font-black text-[#E86A92]">৳100</span>
                      <span className="text-[10px] text-zinc-400 font-medium">২-৩ দিন</span>
                    </div>
                  </div>

                  {/* Option 3: Outside Dhaka - 130 */}
                  <div
                    onClick={() => {
                      setDeliveryZone('outside_dhaka');
                    }}
                    className={`p-3.5 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                      deliveryZone === 'outside_dhaka'
                        ? 'border-[#E86A92] bg-pink-50/60 shadow-xs ring-1 ring-[#E86A92]/20'
                        : 'border-zinc-200 bg-zinc-50/50 hover:border-pink-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-zinc-900">Outside Dhaka</span>
                      <input
                        type="radio"
                        name="deliveryZone"
                        checked={deliveryZone === 'outside_dhaka'}
                        onChange={() => {
                          setDeliveryZone('outside_dhaka');
                        }}
                        className="text-[#E86A92] focus:ring-[#E86A92]"
                      />
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">ঢাকার বাইরে সারাদেশে</p>
                    <div className="mt-2.5 flex items-baseline justify-between pt-2 border-t border-zinc-100">
                      <span className="text-base font-black text-[#E86A92]">৳130</span>
                      <span className="text-[10px] text-zinc-400 font-medium">৩-৫ দিন</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    কাস্টমারের পুরো নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="আপনার পুরো নাম লিখুন (e.g. Sabrina Akter)"
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
                      placeholder="01XXXXXXXXX"
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
                  <input
                    type="text"
                    required
                    list="bd-all-districts"
                    placeholder="আপনার জেলার নাম লিখুন (যেমন: ঢাকা, চট্টগ্রাম, বগুড়া ইত্যাদি)"
                    value={district}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDistrict(val);
                      setSelectedDistrict(val);
                      const lower = val.trim().toLowerCase();
                      if (lower === 'dhaka' || lower === 'ঢাকা') {
                        setDeliveryZone('inside_dhaka');
                      } else if (
                        ['gazipur', 'narayanganj', 'গাজীপুর', 'নারায়ণগঞ্জ', 'সাভার', 'savar', 'কেরানীগঞ্জ', 'keraniganj'].includes(lower)
                      ) {
                        setDeliveryZone('sub_dhaka');
                      }
                    }}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs px-3.5 py-2.5 rounded-xl outline-hidden focus:border-[#E86A92] focus:bg-white"
                  />
                  <datalist id="bd-all-districts">
                    {BANGLADESH_DISTRICTS.map((d) => (
                      <option key={d} value={d} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    থানা / এরিয়া <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ধানমন্ডি, মিরপুর, উত্তরা, বা কোতোয়ালী"
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
                  placeholder="বাসা নম্বর, রোড নম্বর, এলাকা ইত্যাদি বিস্তারিত লিখুন"
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
                    Delivery Fee (
                    {deliveryZone === 'inside_dhaka'
                      ? 'Inside Dhaka - ৳70'
                      : deliveryZone === 'sub_dhaka'
                      ? 'Sub Area Dhaka - ৳100'
                      : 'Outside Dhaka - ৳130'}
                    )
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
                disabled={isPlacingOrder}
                className="w-full bg-[#E86A92] hover:bg-[#d6577e] disabled:bg-zinc-300 text-white font-bold py-4 rounded-2xl text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {isPlacingOrder ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>অর্ডার প্রসেস হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>১-ক্লিকে অর্ডার কনফার্ম করুন</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center space-y-1">
                <p className="text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>কোনো ওটিপির ঝামেলা নেই &bull; ১০০% সুরক্ষিত ক্যাশ অন ডেলিভারি</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
