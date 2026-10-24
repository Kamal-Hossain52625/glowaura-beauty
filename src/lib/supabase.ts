// @ts-ignore -- allow type-checking when the Supabase package declarations are unavailable
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
  },

  // Secure Role-Based Admin Login via Supabase
  async adminLogin(email: string, password: string): Promise<{ success: boolean; message: string; user?: any }> {
    try {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || !password) {
        return { success: false, message: 'ইমেইল এবং পাসওয়ার্ড দুটিই দিন।' };
      }

      const passwordHash = await hashPassword(password);

      // Query admin_users table in Supabase
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', cleanEmail)
        .eq('password_hash', passwordHash)
        .maybeSingle();

      if (error) {
        if (error.message.includes('admin_users') || error.message.includes('schema cache')) {
          return {
            success: false,
            message: 'Supabase-এ admin_users টেবিলটি এখনও তৈরি করা হয়নি। অনুগ্রহ করে schema.sql কোডটি Supabase SQL Editor-এ রান করুন।'
          };
        }
        return { success: false, message: 'ডাটাবেজ চেক ব্যর্থ: ' + error.message };
      }

      if (!data) {
        return {
          success: false,
          message: 'ভুল ইমেইল বা পাসওয়ার্ড। শুধুমাত্র ডাটাবেজে অনুমোদিত এডমিন ইউজারগণ প্রবেশ করতে পারবেন।'
        };
      }

      if (data.is_active === false) {
        return {
          success: false,
          message: 'এই এডমিন একাউন্টটি বর্তমানে নিষ্ক্রিয় (Deactivated) অবস্থায় রয়েছে।'
        };
      }

      // Record last login
      try {
        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.id);
      } catch {
        // non-blocking
      }

      return {
        success: true,
        message: 'Admin login successful',
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone || '01711234567',
          role: data.role === 'super_admin' ? 'admin' : 'sub_admin',
          adminRole: data.role,
          permissions: Array.isArray(data.permissions) ? data.permissions : ['all'],
          defaultDistrict: 'Dhaka',
          defaultAddress: 'Banani, Dhaka, Bangladesh'
        }
      };
    } catch (err: any) {
      console.error('Supabase admin login error:', err);
      return { success: false, message: err.message || 'সার্ভার যোগাযোগে সমস্যা হয়েছে।' };
    }
  },

  // Fetch all admins for Super Admin management view
  async fetchAdmins(): Promise<any[] | null> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, name, email, role, phone, permissions, is_active, created_at, last_login')
        .order('created_at', { ascending: false });

      if (error || !data) return null;
      return data.map((r: any) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        password: '', // Never expose password
        role: r.role,
        phone: r.phone || '',
        permissions: Array.isArray(r.permissions) ? r.permissions : ['orders', 'tracking'],
        createdAt: r.created_at ? r.created_at.split('T')[0] : '2026-10-23',
        isActive: r.is_active ?? true
      }));
    } catch {
      return null;
    }
  },

  // Create Sub-Admin in Supabase
  async createAdminUser(admin: {
    name: string;
    email: string;
    password: string;
    role?: 'super_admin' | 'sub_admin';
    phone?: string;
    permissions?: string[];
  }): Promise<{ success: boolean; message: string }> {
    try {
      const cleanEmail = admin.email.trim().toLowerCase();
      const passwordHash = await hashPassword(admin.password);

      const { error } = await supabase.from('admin_users').insert([
        {
          id: `admin-${Date.now()}`,
          name: admin.name.trim(),
          email: cleanEmail,
          password_hash: passwordHash,
          role: admin.role || 'sub_admin',
          phone: admin.phone || '',
          permissions: admin.permissions || ['orders', 'tracking'],
          is_active: true
        }
      ]);

      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, message: 'Sub Admin created in Supabase database.' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  },

  // Register new customer with email and password
  async registerCustomer(customer: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<{ success: boolean; message: string; user?: any }> {
    try {
      const cleanEmail = customer.email.trim().toLowerCase();
      const passwordHash = await hashPassword(customer.password);
      const customerId = `cust-${Date.now()}`;

      // Insert into customers table in Supabase
      try {
        await supabase.from('customers').insert([
          {
            id: customerId,
            name: customer.name.trim(),
            email: cleanEmail,
            phone: customer.phone?.trim() || `017${Math.floor(10000000 + Math.random() * 90000000)}`,
            role: 'customer'
          }
        ]);
      } catch (insertErr) {
        console.warn('Supabase customer insert notice:', insertErr);
      }

      // Also store in localStorage registered list for instant offline/session reliability
      const savedList = JSON.parse(localStorage.getItem('ayat_registered_users') || '[]');
      const existing = savedList.find((u: any) => u.email === cleanEmail);
      if (existing) {
        return { success: false, message: 'এই ইমেইল দিয়ে ইতিমধ্যেই একটি অ্যাকাউন্ট খোলা রয়েছে। অনুগ্রহ করে Sign In করুন।' };
      }

      const newUserObj = {
        id: customerId,
        name: customer.name.trim(),
        email: cleanEmail,
        phone: customer.phone?.trim() || '',
        passwordHash,
        role: 'customer',
        defaultDistrict: 'Dhaka',
        defaultAddress: ''
      };
      savedList.push(newUserObj);
      localStorage.setItem('ayat_registered_users', JSON.stringify(savedList));

      return {
        success: true,
        message: 'Registration successful',
        user: {
          id: newUserObj.id,
          name: newUserObj.name,
          email: newUserObj.email,
          phone: newUserObj.phone,
          role: 'customer',
          defaultDistrict: newUserObj.defaultDistrict,
          defaultAddress: newUserObj.defaultAddress
        }
      };
    } catch (err: any) {
      return { success: false, message: err.message || 'রেজিস্ট্রেশনে সমস্যা হয়েছে।' };
    }
  },

  // Customer Login with email & password
  async customerLogin(email: string, password: string): Promise<{ success: boolean; message: string; user?: any }> {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const passwordHash = await hashPassword(password);

      // Check localStorage registered users
      const savedList = JSON.parse(localStorage.getItem('ayat_registered_users') || '[]');
      const localUser = savedList.find((u: any) => u.email === cleanEmail);

      if (localUser) {
        if (localUser.passwordHash === passwordHash) {
          return {
            success: true,
            message: 'Login successful',
            user: {
              id: localUser.id,
              name: localUser.name,
              email: localUser.email,
              phone: localUser.phone,
              role: 'customer',
              defaultDistrict: localUser.defaultDistrict || 'Dhaka',
              defaultAddress: localUser.defaultAddress || ''
            }
          };
        } else {
          return { success: false, message: 'ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।' };
        }
      }

      // If not in local cache, check Supabase customers table by email
      const { data } = await supabase
        .from('customers')
        .select('*')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (data) {
        return {
          success: true,
          message: 'Login successful',
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone || '',
            role: 'customer',
            defaultDistrict: data.district || 'Dhaka',
            defaultAddress: data.address || ''
          }
        };
      }

      return {
        success: false,
        message: 'এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি। অনুগ্রহ করে নিচে Sign Up-এ ক্লিক করে নতুন অ্যাকাউন্ট তৈরি করুন।'
      };
    } catch (err: any) {
      return { success: false, message: err.message || 'লগইনে সমস্যা হয়েছে।' };
    }
  }
};

// SHA-256 Web Crypto hashing for zero-plaintext password security
export async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
