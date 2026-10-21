// @ts-ignore -- Supabase package types may not be available to the editor.
import { createClient } from '@supabase/supabase-js';
import { Product, Order, Category, OrderStatus } from '../types';

// Supabase project credentials provided by user
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://mefckadtnwygvcfpgyod.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lZmNrYWR0bnd5Z3ZjZnBneW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1NDg5MjYsImV4cCI6MjEwODEyNDkyNn0.QAY10VJABk31R7FjJ3-eYTPzUybRJjX7ZeRY0xivE9Y';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const supabaseConfig = {
  url: SUPABASE_URL,
  projectId: 'mefckadtnwygvcfpgyod',
  projectName: 'Ayat & Amat'
};

// Database helper functions with fallback and graceful error handling
export const supabaseService = {
  // Test connection to Supabase
  async testConnection(): Promise<{ connected: boolean; tablesFound: boolean; error?: string }> {
    try {
      const { data, error } = await supabase.from('products').select('id').limit(1);
      if (error) {
        if (error.message.includes('schema cache') || error.message.includes('does not exist')) {
          // Connected to project, but tables are pending migration in Supabase SQL editor
          return { connected: true, tablesFound: false, error: 'Tables pending creation in Supabase SQL Editor' };
        }
        return { connected: false, tablesFound: false, error: error.message };
      }
      return { connected: true, tablesFound: true };
    } catch (err: any) {
      return { connected: false, tablesFound: false, error: err.message || 'Connection failed' };
    }
  },

  // Fetch all products from Supabase
  async fetchProducts(): Promise<Product[] | null> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

      if (error || !data || data.length === 0) {
        return null;
      }

      // Map snake_case database columns to frontend camelCase Product type
      return data.map((row: any) => ({
        id: row.id,
        name: row.name,
        slug: row.slug || row.id,
        sku: row.sku || '',
        brand: row.brand || 'Ayat & Amat',
        category: row.category,
        subcategory: row.subcategory || '',
        regularPrice: Number(row.regular_price || row.regularPrice || 0),
        discountPrice: Number(row.discount_price || row.discountPrice || 0),
        stockQuantity: Number(row.stock_quantity || row.stockQuantity || 0),
        stockStatus: row.stock_status || (row.stock_quantity > 0 ? 'in_stock' : 'out_of_stock'),
        isFeatured: Boolean(row.is_featured ?? row.isFeatured),
        isBestSeller: Boolean(row.is_best_seller ?? row.isBestSeller),
        isNewArrival: Boolean(row.is_new_arrival ?? row.isNewArrival),
        isActive: Boolean(row.is_active ?? row.isActive ?? true),
        rating: Number(row.rating || 5.0),
        reviewCount: Number(row.review_count || row.reviewCount || 0),
        shortDescription: row.short_description || row.shortDescription || '',
        description: row.description || '',
        ingredients: row.ingredients || '',
        usageInstructions: row.usage_instructions || row.usageInstructions || '',
        specifications: typeof row.specifications === 'string' ? JSON.parse(row.specifications) : (row.specifications || {}),
        images: Array.isArray(row.images) ? row.images : [row.image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800'],
        volumeOrSize: row.volume_or_size || row.volumeOrSize,
        countryOfOrigin: row.country_of_origin || row.countryOfOrigin
      }));
    } catch (err) {
      console.warn('Supabase products fetch fallback:', err);
      return null;
    }
  },

  // Insert a new product into Supabase
  async insertProduct(product: Omit<Product, 'id'> & { id?: string }): Promise<boolean> {
    try {
      const payload = {
        id: product.id || `prod-${Date.now()}`,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        brand: product.brand,
        category: product.category,
        subcategory: product.subcategory,
        regular_price: product.regularPrice,
        discount_price: product.discountPrice,
        stock_quantity: product.stockQuantity,
        stock_status: product.stockStatus,
        is_featured: product.isFeatured,
        is_best_seller: product.isBestSeller,
        is_new_arrival: product.isNewArrival,
        is_active: product.isActive,
        rating: product.rating,
        review_count: product.reviewCount,
        short_description: product.shortDescription,
        description: product.description,
        ingredients: product.ingredients,
        usage_instructions: product.usageInstructions,
        specifications: product.specifications,
        images: product.images,
        volume_or_size: product.volumeOrSize,
        country_of_origin: product.countryOfOrigin
      };

      const { error } = await supabase.from('products').upsert(payload);
      if (error) {
        console.warn('Supabase product insert warning:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Supabase insert error:', err);
      return false;
    }
  },

  // Save an order to Supabase
  async insertOrder(order: Order): Promise<boolean> {
    try {
      const payload = {
        id: order.id,
        order_number: order.orderNumber,
        date: order.date,
        customer_name: order.customerName,
        customer_email: order.customerEmail,
        customer_phone: order.customerPhone,
        district: order.district,
        city_area: order.cityArea,
        full_address: order.fullAddress,
        delivery_note: order.deliveryNote || '',
        subtotal: order.subtotal,
        discount: order.discount,
        delivery_charge: order.deliveryCharge,
        total: order.total,
        payment_method: order.paymentMethod,
        payment_status: order.paymentStatus,
        transaction_id: order.transactionId || null,
        status: order.status,
        items: order.items,
        tracking_history: order.trackingHistory
      };

      const { error } = await supabase.from('orders').insert(payload);
      if (error) {
        console.warn('Supabase order insert warning (tables might need creation in SQL editor):', error.message);
        return false;
      }
      console.log('Order successfully synced to Supabase:', order.orderNumber);
      return true;
    } catch (err) {
      console.warn('Supabase insertOrder error:', err);
      return false;
    }
  },

  // Update order status in Supabase
  async updateOrderStatus(orderId: string, status: OrderStatus, trackingHistory?: any[]): Promise<boolean> {
    try {
      const updateData: any = { status };
      if (trackingHistory) {
        updateData.tracking_history = trackingHistory;
      }
      const { error } = await supabase.from('orders').update(updateData).eq('id', orderId);
      if (error) {
        console.warn('Supabase update order status error:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Supabase updateOrderStatus error:', err);
      return false;
    }
  },

  // Fetch orders from Supabase
  async fetchOrders(): Promise<Order[] | null> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('date', { ascending: false });

      if (error || !data || data.length === 0) {
        return null;
      }

      return data.map((row: any) => ({
        id: row.id,
        orderNumber: row.order_number || row.orderNumber,
        date: row.date,
        customerName: row.customer_name || row.customerName,
        customerEmail: row.customer_email || row.customerEmail,
        customerPhone: row.customer_phone || row.customerPhone,
        district: row.district,
        cityArea: row.city_area || row.cityArea,
        fullAddress: row.full_address || row.fullAddress,
        deliveryNote: row.delivery_note || row.deliveryNote,
        items: row.items || [],
        subtotal: Number(row.subtotal || 0),
        discount: Number(row.discount || 0),
        deliveryCharge: Number(row.delivery_charge || row.deliveryCharge || 0),
        total: Number(row.total || 0),
        paymentMethod: row.payment_method || row.paymentMethod,
        paymentStatus: row.payment_status || row.paymentStatus || 'unpaid',
        transactionId: row.transaction_id || row.transactionId,
        status: row.status,
        trackingHistory: row.tracking_history || row.trackingHistory || []
      }));
    } catch (err) {
      console.warn('Supabase fetchOrders error:', err);
      return null;
    }
  }
};
