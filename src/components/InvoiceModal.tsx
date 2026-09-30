import React from 'react';
import { Order } from '../types';
import { Printer, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        {/* Modal Controls (Not printed) */}
        <div className="p-4 bg-zinc-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-pink-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Printable Order Invoice #{order.orderNumber}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-[#E86A92] hover:bg-[#d6577e] text-white text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Document */}
        <div id="printable-invoice" className="p-8 overflow-y-auto bg-white text-zinc-900 text-xs">
          {/* Invoice Header */}
          <div className="flex justify-between items-start border-b border-zinc-200 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#E86A92] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-display text-xl font-bold tracking-tight text-zinc-900">
                  GlowAura<span className="text-[#E86A92]">.</span>
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">GlowAura Beauty Bangladesh Ltd.</p>
              <p className="text-[11px] text-zinc-500">Road 11, Banani, Dhaka-1213, Bangladesh</p>
              <p className="text-[11px] text-zinc-500">Hotline: +880 1711-234567 | support@glowaurabd.com</p>
              <p className="text-[11px] text-zinc-500">BIN / Trade License: 002918274-0102</p>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-pink-50 border border-pink-200 text-[#E86A92] font-black text-sm uppercase rounded tracking-wider mb-2">
                INVOICE
              </span>
              <p className="font-bold text-zinc-900 text-sm">{order.orderNumber}</p>
              <p className="text-zinc-500 text-[11px]">Date: {order.date}</p>
              <p className="text-zinc-500 text-[11px] uppercase">
                Payment: <span className="font-bold text-zinc-800">{order.paymentMethod}</span>
              </p>
              <p className="text-zinc-500 text-[11px]">
                Status: <span className="font-bold uppercase text-emerald-600">{order.status}</span>
              </p>
            </div>
          </div>

          {/* Customer & Shipping Information */}
          <div className="grid grid-cols-2 gap-6 my-6 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <div>
              <p className="font-bold text-zinc-800 uppercase tracking-wider text-[10px] mb-1">
                Billed To & Delivery Address:
              </p>
              <p className="font-bold text-zinc-900 text-xs">{order.customerName}</p>
              <p className="text-zinc-600 mt-0.5">{order.fullAddress}</p>
              <p className="text-zinc-600">
                {order.cityArea}, {order.district}, Bangladesh
              </p>
              <p className="text-zinc-600 mt-1 font-medium">Phone: {order.customerPhone}</p>
              {order.customerEmail && (
                <p className="text-zinc-600">Email: {order.customerEmail}</p>
              )}
            </div>

            <div>
              <p className="font-bold text-zinc-800 uppercase tracking-wider text-[10px] mb-1">
                Order & Courier Notes:
              </p>
              <p className="text-zinc-600">
                Courier Partner:{' '}
                <span className="font-medium text-zinc-900">
                  {order.district.toLowerCase() === 'dhaka' ? 'Pathao Express' : 'Steadfast Courier'}
                </span>
              </p>
              <p className="text-zinc-600 mt-0.5">
                Payment Status:{' '}
                <span className="font-bold uppercase text-zinc-900">
                  {order.paymentStatus}
                </span>
              </p>
              {order.transactionId && (
                <p className="text-zinc-600 font-mono text-[11px]">
                  TxnID: {order.transactionId}
                </p>
              )}
              {order.deliveryNote && (
                <p className="text-zinc-500 italic mt-2 text-[11px]">
                  &ldquo;{order.deliveryNote}&rdquo;
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-zinc-200 rounded-xl overflow-hidden my-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-100 text-zinc-700 text-[11px] uppercase font-bold border-b border-zinc-200">
                  <th className="py-2.5 px-4">Item Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-800">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 px-4">
                      <p className="font-semibold text-zinc-900">{item.productName}</p>
                    </td>
                    <td className="py-2.5 px-3 text-center">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right">৳{item.price.toLocaleString()}</td>
                    <td className="py-2.5 px-4 text-right font-semibold">
                      ৳{item.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end mt-4">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal:</span>
                <span className="font-medium text-zinc-900">৳{order.subtotal.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount:</span>
                  <span>-৳{order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600">
                <span>Delivery Charge:</span>
                <span className="font-medium text-zinc-900">
                  {order.deliveryCharge === 0 ? 'FREE' : `৳${order.deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-zinc-900 pt-2 border-t-2 border-zinc-900">
                <span>Total Amount:</span>
                <span className="text-[#E86A92]">৳{order.total.toLocaleString()} BDT</span>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="mt-8 pt-4 border-t border-zinc-200 flex justify-between items-end text-[10px] text-zinc-500">
            <div>
              <p className="font-semibold text-zinc-700">Thank you for shopping with GlowAura!</p>
              <p>For any inquiries, please contact our support hotline or email support@glowaurabd.com</p>
              <p>100% Genuine Imported Skincare with Sealed Barcodes.</p>
            </div>
            <div className="text-right">
              <div className="border border-dashed border-zinc-300 px-3 py-1 rounded text-center inline-block">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                  AUTHORIZED SEAL
                </span>
                <span className="text-xs font-serif font-bold text-[#E86A92]">GlowAura BD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
