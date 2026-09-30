# GlowAura Beauty BD - Laravel 12 + Vue 3 Cosmetics E-commerce Platform

A production-ready, authentic Beauty & Cosmetics E-commerce platform inspired by top modern Bangladeshi beauty destinations (such as smbeautyshop.com, Shajgoj). Features a curated design with **#E86A92** primary rose, **#F8E8EE** secondary mist, Bangladeshi Taka (৳ BDT) pricing, **bKash & Nagad** mobile wallet integrations, 64-district delivery rules, comprehensive product catalog, and full **Laravel 12 + MySQL** backend architecture.

---

## 🌟 Key Features

### 🛍️ Customer Experience
- **Editorial Beauty Storefront**: Hero carousel, promotional feature cards, category grid, trending tabs (Featured, Best Sellers, New Arrivals, Discounts), brand showcase, verified customer reviews, and Instagram gallery.
- **Dynamic Search & Autocomplete**: Real-time search suggestions with thumbnail, brand, SKU, and price.
- **Rich Product Catalog (32+ Products)**: Genuine Korean & international skincare (COSRX, Beauty of Joseon, The Ordinary, CeraVe, Laneige, Anua, Bioderma, Maybelline) with ingredients, how-to-use guide, and specs.
- **Shop & Filtering**: Filter by category, brand, price slider (৳0-৳5000), ratings, and in-stock / discount status with Grid / List view.
- **Interactive Quick View & Cart Drawer**: Slide-over drawer with a free delivery progress meter across Bangladesh.
- **Bangladesh Checkout**: District selector for all 64 BD districts, delivery rules (Inside Dhaka ৳60, Outside Dhaka ৳120, Free over ৳2,500), and payment methods (**Cash on Delivery, bKash with TrxID verification, Nagad with TrxID**).
- **Order Tracking**: Real-time shipment status tracker with a 5-step visual timeline and printable tax invoice.
- **Customer Account**: Profile, order history, saved addresses, wishlist with 1-click move to bag, and active discount coupons (`GLOW10`, `BEAUTY500`, `EID2026`).

### ⚙️ Admin Control Panel
- **Executive Analytics**: Total revenue in BDT, today's sales, pending dispatch orders, low stock warnings, and interactive weekly sales chart.
- **Product Management**: Create, edit, delete, manage pricing, discount %, inventory count, and toggle Featured / Best Seller / New Arrival flags.
- **Order Processing**: Filter orders by status, change status (Pending -> Confirmed -> Processing -> Shipped -> Delivered -> Cancelled), and print professional invoices.
- **Review Moderation**: Approve, reject, or delete customer reviews.
- **Coupon System**: Create percentage or fixed discount coupons with minimum order amount rules.
- **Category & Brand Management**: Add and manage beauty categories and brands.

---

## 🚀 Local Installation & Setup

### Option 1: Docker & Laravel Sail (Recommended)

1. **Clone the repository**:
   ```bash
   git clone <repo-url> glowaura-beauty
   cd glowaura-beauty
   ```

2. **Copy the environment configuration**:
   ```bash
   cp .env.example .env
   ```

3. **Install Composer dependencies**:
   ```bash
   docker run --rm \
       -u "$(id -u):$(id -g)" \
       -v "$(pwd):/var/www/html" \
       -w /var/www/html \
       laravelsail/php83-composer:latest \
       composer install --ignore-platform-reqs
   ```

4. **Start Docker Sail containers**:
   ```bash
   ./vendor/bin/sail up -d
   ```

5. **Generate application key & run database migrations**:
   ```bash
   ./vendor/bin/sail artisan key:generate
   ./vendor/bin/sail artisan migrate --seed
   ```

6. **Install frontend dependencies & run Vite**:
   ```bash
   ./vendor/bin/sail npm install
   ./vendor/bin/sail npm run dev
   ```

7. **Access the application**:
   - Customer Storefront: `http://localhost`
   - MySQL Database: `localhost:3306` (User: `sail`, Password: `password`, DB: `glowaura_beauty`)
   - Mailpit (Email Catcher): `http://localhost:8025`

---

### Option 2: Traditional Setup (PHP 8.2+ & Local MySQL)

1. **Install PHP & Node Dependencies**:
   ```bash
   composer install
   npm install
   ```

2. **Configure Database in `.env`**:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=glowaura_beauty
   DB_USERNAME=root
   DB_PASSWORD=your_mysql_password
   ```

3. **Run Migrations & Seeders**:
   ```bash
   php artisan key:generate
   php artisan migrate --seed
   ```

4. **Start Development Servers**:
   ```bash
   php artisan serve --port=8000
   npm run dev
   ```

---

## 🗄️ Database Schema (20 Tables)

- `users` (id, name, email, phone, password, role, default_district, default_address, timestamps)
- `admins` (id, name, email, password, role, timestamps)
- `categories` (id, name, slug, image, is_active, timestamps)
- `subcategories` (id, category_id, name, slug, timestamps)
- `brands` (id, name, slug, country, logo, is_active, timestamps)
- `products` (id, name, slug, sku, brand_id, category_id, subcategory_id, regular_price, discount_price, stock_quantity, stock_status, is_featured, is_bestseller, is_new_arrival, is_active, rating, review_count, short_description, description, ingredients, usage_instructions, specifications, volume_or_size, country_of_origin, timestamps, soft_deletes)
- `product_images` (id, product_id, url, is_primary, timestamps)
- `product_variants` (id, product_id, name, sku, price, stock_quantity, timestamps)
- `orders` (id, order_number, user_id, customer_name, customer_email, customer_phone, district, city_area, full_address, delivery_note, subtotal, discount, delivery_charge, total, payment_method, payment_status, transaction_id, status, timestamps)
- `order_items` (id, order_id, product_id, product_name, price, quantity, total, timestamps)
- `payments` (id, order_id, method, transaction_id, amount, status, timestamps)
- `wishlists` (id, user_id, product_id, timestamps)
- `cart_items` (id, user_id, session_id, product_id, quantity, timestamps)
- `coupons` (id, code, discount_type, discount_value, min_order_amount, max_discount, expiry_date, usage_limit, used_count, is_active, timestamps)
- `reviews` (id, product_id, user_id, customer_name, customer_email, rating, title, comment, is_approved, verified_purchase, timestamps)
- `settings` (id, key, value, timestamps)

---

## 📡 RESTful API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Paginated product list with search & filters |
| `GET` | `/api/products/{slug}` | Detailed single product with ingredients & reviews |
| `GET` | `/api/categories` | All categories with subcategories |
| `GET` | `/api/brands` | All cosmetics brands |
| `POST` | `/api/cart` | Add product to bag |
| `PUT` | `/api/cart/{id}` | Update bag quantity |
| `DELETE` | `/api/cart/{id}` | Remove item from bag |
| `POST` | `/api/orders` | Place order with bKash/Nagad/COD |
| `GET` | `/api/orders/{orderNumber}` | Track order status and shipment |
| `POST` | `/api/coupons/apply` | Validate and calculate coupon discount |
| `POST` | `/api/reviews` | Submit product review |
| `GET` | `/api/admin/metrics` | Admin revenue and order statistics |

---

## 🎨 Design System & Colors

- **Primary Accent**: `#E86A92` (Refined Rose Berry)
- **Secondary Mist**: `#F8E8EE` (Blush Porcelain)
- **Background**: `#FFFFFF`
- **Text Headings**: `Playfair Display`, serif
- **Body & UI**: `Outfit`, -apple-system, sans-serif
# glowaura-beauty
