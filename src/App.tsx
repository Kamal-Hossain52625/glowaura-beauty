import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { ToastContainer } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { LaravelExplorer } from './pages/LaravelExplorer';

const AppContent: React.FC = () => {
  const { activeView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#222222]">
      <Header />

      <main className="flex-1">
        {activeView === 'home' && <HomePage />}
        {activeView === 'shop' && <ShopPage />}
        {activeView === 'product-detail' && <ProductDetailPage />}
        {activeView === 'checkout' && <CheckoutPage />}
        {activeView === 'order-tracking' && <OrderTrackingPage />}
        {activeView === 'account' && <AccountPage />}
        {activeView === 'admin' && <AdminDashboard />}
        {activeView === 'laravel-code' && <LaravelExplorer />}
      </main>

      <Footer />

      {/* Global Modals & Notifications */}
      <CartDrawer />
      <ProductQuickViewModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
