import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { InvoiceModal } from '../components/InvoiceModal';
import { Order, OrderStatus } from '../types';
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Printer,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orders, activeTrackingOrder, setTrackingOrderNumber } = useStore();
  const [searchInput, setSearchInput] = useState('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  const currentOrder = activeTrackingOrder || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setTrackingOrderNumber(searchInput.trim());
    }
  };

  const steps: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'pending', label: 'Order Received', desc: 'Order submitted to system' },
    { status: 'confirmed', label: 'Confirmed', desc: 'Customer verified & approved' },
    { status: 'processing', label: 'Packed in Hub', desc: 'Protected with authentic seal' },
    { status: 'shipped', label: 'Shipped / In Transit', desc: 'Handed to BD Courier partner' },
    { status: 'delivered', label: 'Delivered', desc: 'Received by recipient' }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;
      case 'processing':
        return 2;
      case 'shipped':
        return 3;
      case 'delivered':
        return 4;
      case 'cancelled':
        return -1;
      default:
        return 0;
    }
  };

  const currentStepIndex = currentOrder ? getStepIndex(currentOrder.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-pink-50 text-[#E86A92] text-xs font-bold px-3 py-1 rounded-full">
          <Truck className="w-3.5 h-3.5" />
          <span>REAL-TIME BANGLADESH COURIER TRACKING</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-zinc-900">
          Track Your Beauty Order
        </h1>
        <p className="text-xs text-zinc-500 max-w-md mx-auto">
          Enter your Order Number (e.g. GLOW-BD-91823) or Mobile Phone Number to check current shipment status.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <input
          type="text"
          placeholder="Enter Order ID (e.g. GLOW-BD-91823) or Phone..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 bg-white border border-zinc-200 text-xs px-4 py-3 rounded-2xl outline-hidden focus:border-[#E86A92] shadow-xs"
        />
        <button
          type="submit"
          className="bg-[#E86A92] hover:bg-[#d6577e] text-white px-5 py-3 rounded-2xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
        >
          <Search className="w-4 h-4" />
          Track
        </button>
      </form>

      {/* Order Status Display */}
      {currentOrder ? (
        <div className="bg-white border border-[#F8E8EE] rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-zinc-900">
                  Order #{currentOrder.orderNumber}
                </h2>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    currentOrder.status === 'delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : currentOrder.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-pink-100 text-[#E86A92]'
                  }`}
                >
                  {currentOrder.status}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">Placed on {currentOrder.date}</p>
            </div>

            <button
              onClick={() => setSelectedInvoiceOrder(currentOrder)}
              className="bg-zinc-900 hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Printer className="w-3.5 h-3.5 text-pink-400" />
              View & Print Invoice
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="py-4">
            <div className="grid grid-cols-5 gap-2 relative">
              {steps.map((st, idx) => {
                const isPassed = currentStepIndex >= idx;
                const isCurrent = currentStepIndex === idx;

                return (
                  <div key={st.status} className="flex flex-col items-center text-center relative z-10">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isPassed
                          ? 'bg-[#E86A92] text-white shadow-md'
                          : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                      } ${isCurrent ? 'ring-4 ring-pink-100 scale-110' : ''}`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="text-xs font-bold">{idx + 1}</span>
                      )}
                    </div>
                    <p
                      className={`text-xs font-bold mt-2 ${
                        isPassed ? 'text-zinc-900' : 'text-zinc-400'
                      }`}
                    >
                      {st.label}
                    </p>
                    <p className="text-[10px] text-zinc-400 hidden sm:block mt-0.5">{st.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery & Payment Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50/70 p-5 rounded-2xl border border-zinc-100 text-xs">
            <div className="space-y-1">
              <p className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">
                Recipient & Delivery Address:
              </p>
              <p className="font-bold text-zinc-900">{currentOrder.customerName}</p>
              <p className="text-zinc-600">{currentOrder.fullAddress}</p>
              <p className="text-zinc-600">
                {currentOrder.cityArea}, {currentOrder.district}
              </p>
              <p className="text-zinc-600 font-mono">Mobile: {currentOrder.customerPhone}</p>
            </div>

            <div className="space-y-1">
              <p className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">
                Shipment & Payment Info:
              </p>
              <p className="text-zinc-600">
                Payment:{' '}
                <span className="font-bold uppercase text-zinc-900">
                  {currentOrder.paymentMethod}
                </span>{' '}
                ({currentOrder.paymentStatus})
              </p>
              {currentOrder.transactionId && (
                <p className="text-zinc-600 font-mono text-[11px]">
                  TrxID: {currentOrder.transactionId}
                </p>
              )}
              <p className="text-zinc-600">
                Delivery Courier:{' '}
                <span className="font-semibold text-zinc-800">
                  {currentOrder.district.toLowerCase() === 'dhaka'
                    ? 'Pathao Express Dhaka'
                    : 'Steadfast Courier'}
                </span>
              </p>
              {currentOrder.deliveryNote && (
                <p className="text-zinc-500 italic text-[11px] pt-1">
                  Note: &ldquo;{currentOrder.deliveryNote}&rdquo;
                </p>
              )}
            </div>
          </div>

          {/* Items In Order */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-700">
              Items In This Shipment ({currentOrder.items.length})
            </h3>
            <div className="divide-y divide-zinc-100 border border-zinc-100 rounded-2xl overflow-hidden">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between gap-3 bg-white">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-12 h-12 rounded-xl object-cover border border-zinc-100"
                    />
                    <div>
                      <p className="text-xs font-semibold text-zinc-900">{item.productName}</p>
                      <p className="text-xs text-zinc-500">
                        Qty: {item.quantity} × ৳{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-zinc-900">
                    ৳{item.total.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Total balance */}
            <div className="flex justify-end pt-2 text-xs">
              <div className="w-56 space-y-1">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal:</span>
                  <span>৳{currentOrder.subtotal.toLocaleString()}</span>
                </div>
                {currentOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount:</span>
                    <span>-৳{currentOrder.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-500">
                  <span>Delivery:</span>
                  <span>
                    {currentOrder.deliveryCharge === 0 ? 'FREE' : `৳${currentOrder.deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm text-zinc-900 pt-1 border-t border-zinc-200">
                  <span>Total Paid/Due:</span>
                  <span className="text-[#E86A92]">৳{currentOrder.total.toLocaleString()} BDT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-zinc-200 p-6 space-y-3">
          <AlertCircle className="w-8 h-8 text-zinc-400 mx-auto" />
          <h3 className="font-bold text-zinc-800 text-sm">No order found</h3>
          <p className="text-xs text-zinc-500">
            Please verify your Order Number and phone number format.
          </p>
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
