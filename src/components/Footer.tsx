import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  Clock,
  Instagram,
  Facebook,
  Send
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, settings, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast('🎉 Subscribed! Use coupon "GLOW10" for 10% off your order.', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#1f1d1e] text-zinc-300 pt-16 pb-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* 4 Feature Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-zinc-800">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-pink-900/40 text-[#E86A92] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Authentic Products</h4>
              <p className="text-xs text-zinc-400 mt-1">Directly imported from South Korea, Japan, France & USA with authentic batch codes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-pink-900/40 text-[#E86A92] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">All Bangladesh Express Delivery</h4>
              <p className="text-xs text-zinc-400 mt-1">Inside Dhaka 24-48 hours (৳60), All 64 Districts 48-72 hours via Steadfast courier.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-pink-900/40 text-[#E86A92] flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Easy Return Policy</h4>
              <p className="text-xs text-zinc-400 mt-1">Hassle-free 3-day replacement policy for damaged or transit-affected deliveries.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-pink-900/40 text-[#E86A92] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Free Skin Consultation</h4>
              <p className="text-xs text-zinc-400 mt-1">Talk with our certified skin consultants to find the ideal routine for your skin type.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-zinc-800 text-xs">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#E86A92] flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-display text-xl font-bold text-white tracking-tight">
                GlowAura<span className="text-[#E86A92]">.</span>
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Your most trusted online destination in Bangladesh for authentic Korean and international skincare, makeup, and personal wellness essentials.
            </p>
            <div className="space-y-2 text-zinc-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E86A92] shrink-0" />
                <span>Banani Experience Store: Road 11, Block D, Dhaka</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E86A92] shrink-0" />
                <span>Hotline: {settings.hotline} (10:00 AM - 10:00 PM)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E86A92] shrink-0" />
                <span>Email: {settings.supportEmail}</span>
              </p>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-[11px]">
              Categories
            </h5>
            <ul className="space-y-2.5 text-zinc-400">
              <li>
                <button onClick={() => navigateTo('shop', 'Skincare')} className="hover:text-white transition-colors cursor-pointer">
                  Korean Skincare
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'Sun Care')} className="hover:text-white transition-colors cursor-pointer">
                  Sun Protection
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'Makeup')} className="hover:text-white transition-colors cursor-pointer">
                  Face Makeup & Tints
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'Lip Care')} className="hover:text-white transition-colors cursor-pointer">
                  Lip Balms & Masks
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'Hair Care')} className="hover:text-white transition-colors cursor-pointer">
                  Scalp & Hair Care
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-[11px]">
              Customer Care
            </h5>
            <ul className="space-y-2.5 text-zinc-400">
              <li>
                <button onClick={() => navigateTo('order-tracking')} className="hover:text-white transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors cursor-pointer">
                  My Orders & Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Delivery Rates & Info
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-white transition-colors cursor-pointer text-[#E86A92]">
                  Admin Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('laravel-code')} className="hover:text-white transition-colors cursor-pointer text-emerald-400">
                  Laravel 12 Backend Docs
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h5 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
              Join the Glow Club
            </h5>
            <p className="text-zinc-400 text-xs mb-3">
              Subscribe to get exclusive discount coupons and skin routine guides.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-[#E86A92] text-xs text-white px-3 py-2 rounded-lg outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#E86A92] hover:bg-[#d6577e] text-white font-semibold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Get 10% Discount Code
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Bangladesh Payment Badges & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} GlowAura Beauty BD. All rights reserved. Built with Laravel 12 + Vue 3 + MySQL architecture.
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-400 mr-1">We accept:</span>
            <span className="px-2 py-1 bg-pink-950/60 border border-pink-700/40 text-pink-300 font-bold rounded text-[11px]">
              bKash
            </span>
            <span className="px-2 py-1 bg-orange-950/60 border border-orange-700/40 text-orange-300 font-bold rounded text-[11px]">
              Nagad
            </span>
            <span className="px-2 py-1 bg-zinc-800 border border-zinc-700 text-zinc-300 font-medium rounded text-[11px]">
              Cash on Delivery (COD)
            </span>
            <span className="px-2 py-1 bg-blue-950/60 border border-blue-700/40 text-blue-300 font-semibold rounded text-[11px]">
              Visa / Master
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
