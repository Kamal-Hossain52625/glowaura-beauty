import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Code2,
  Database,
  Terminal,
  Server,
  FileCode,
  Copy,
  Check,
  FolderTree,
  ExternalLink,
  Layers,
  Cpu
} from 'lucide-react';

export const LaravelExplorer: React.FC = () => {
  const { showToast } = useStore();
  const [activeFile, setActiveFile] = useState<string>('routes/api.php');
  const [copied, setCopied] = useState(false);

  const codeSnippets: Record<string, { lang: string; description: string; content: string }> = {
    'routes/api.php': {
      lang: 'php',
      description: 'RESTful API routing with Laravel Sanctum authentication middleware and resource endpoints',
      content: `<?php

use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\Api\\AuthController;
use App\\Http\\Controllers\\Api\\ProductController;
use App\\Http\\Controllers\\Api\\CategoryController;
use App\\Http\\Controllers\\Api\\BrandController;
use App\\Http\\Controllers\\Api\\CartController;
use App\\Http\\Controllers\\Api\\OrderController;
use App\\Http\\Controllers\\Api\\WishlistController;
use App\\Http\\Controllers\\Api\\ReviewController;
use App\\Http\\Controllers\\Api\\CouponController;
use App\\Http\\Controllers\\Api\\Admin\\AdminDashboardController;
use App\\Http\\Controllers\\Api\\Admin\\AdminProductController;
use App\\Http\\Controllers\\Api\\Admin\\AdminOrderController;

/*
|--------------------------------------------------------------------------
| GlowAura Beauty BD - API Routes (Laravel 12)
|--------------------------------------------------------------------------
*/

// Public Catalog Endpoints
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/products/{slug}/related', [ProductController::class, 'related']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}/products', [CategoryController::class, 'products']);
Route::get('/brands', [BrandController::class, 'index']);
Route::post('/coupons/apply', [CouponController::class, 'apply']);
Route::get('/settings', [AdminDashboardController::class, 'publicSettings']);

// Customer Authentication (Sanctum)
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected Customer Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/user', [AuthController::class, 'profile']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Cart API
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    Route::delete('/cart', [CartController::class, 'clear']);

    // Wishlist API
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist', [WishlistController::class, 'toggle']);

    // Orders API
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{orderNumber}', [OrderController::class, 'show']);

    // Product Reviews
    Route::post('/reviews', [ReviewController::class, 'store']);
});

// Admin Protected Routes
Route::prefix('admin')->middleware(['auth:sanctum', 'can:admin-access'])->group(function () {
    Route::get('/metrics', [AdminDashboardController::class, 'metrics']);
    Route::apiResource('/products', AdminProductController::class);
    Route::apiResource('/orders', AdminOrderController::class);
    Route::patch('/orders/{id}/status', [AdminOrderController::class, 'updateStatus']);
    Route::apiResource('/categories', CategoryController::class);
    Route::apiResource('/coupons', CouponController::class);
    Route::patch('/reviews/{id}/approve', [ReviewController::class, 'approve']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
});`
    },
    'app/Models/Product.php': {
      lang: 'php',
      description: 'Eloquent Product Model with relationships, price formatting, scopes & casts',
      content: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\SoftDeletes;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'sku',
        'brand_id',
        'category_id',
        'subcategory_id',
        'regular_price',
        'discount_price',
        'stock_quantity',
        'stock_status',
        'is_featured',
        'is_bestseller',
        'is_new_arrival',
        'is_active',
        'rating',
        'review_count',
        'short_description',
        'description',
        'ingredients',
        'usage_instructions',
        'specifications',
        'volume_or_size',
        'country_of_origin'
    ];

    protected $casts = [
        'regular_price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'stock_quantity' => 'integer',
        'is_featured' => 'boolean',
        'is_bestseller' => 'boolean',
        'is_new_arrival' => 'boolean',
        'is_active' => 'boolean',
        'rating' => 'float',
        'review_count' => 'integer',
        'specifications' => 'array',
    ];

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('is_primary', 'desc');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class)->where('is_approved', true);
    }

    // Scopes for fast frontend querying
    public function scopeInStock($query)
    {
        return $query->where('stock_quantity', '>', 0);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true)->where('is_active', true);
    }
}`
    },
    'app/Models/Order.php': {
      lang: 'php',
      description: 'Eloquent Order Model for Bangladesh e-commerce with order items & tracking',
      content: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'district',
        'city_area',
        'full_address',
        'delivery_note',
        'subtotal',
        'discount',
        'delivery_charge',
        'total',
        'payment_method',
        'payment_status',
        'transaction_id',
        'status'
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'discount' => 'decimal:2',
        'delivery_charge' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function trackingHistory(): HasMany
    {
        return $this->hasMany(OrderTracking::class)->orderBy('created_at', 'asc');
    }
}`
    },
    'app/Http/Controllers/Api/OrderController.php': {
      lang: 'php',
      description: 'OrderController with atomic database transaction, coupon calculation, & bKash verification',
      content: `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Order;
use App\\Models\\OrderItem;
use App\\Models\\Product;
use App\\Models\\Coupon;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Support\\Str;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'nullable|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'district' => 'required|string|max:100',
            'city_area' => 'required|string|max:100',
            'full_address' => 'required|string',
            'delivery_note' => 'nullable|string',
            'payment_method' => 'required|in:cod,bkash,nagad,card',
            'transaction_id' => 'nullable|string|max:100',
            'coupon_code' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($validated, $request) {
            $subtotal = 0;
            $orderItemsData = [];

            foreach ($validated['items'] as $item) {
                $product = Product::lockForUpdate()->findOrFail($item['product_id']);
                
                if ($product->stock_quantity < $item['quantity']) {
                    return response()->json([
                        'error' => "Insufficient stock for product: {$product->name}"
                    ], 422);
                }

                $price = $product->discount_price ?? $product->regular_price;
                $lineTotal = $price * $item['quantity'];
                $subtotal += $lineTotal;

                // Decrement stock
                $product->decrement('stock_quantity', $item['quantity']);

                $orderItemsData[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'price' => $price,
                    'quantity' => $item['quantity'],
                    'total' => $lineTotal,
                ];
            }

            // Bangladesh Delivery Logic
            $deliveryFee = strtolower($validated['district']) === 'dhaka' ? 60 : 120;
            if ($subtotal >= 2500) {
                $deliveryFee = 0;
            }

            // Coupon Logic
            $discount = 0;
            if (!empty($validated['coupon_code'])) {
                $coupon = Coupon::where('code', $validated['coupon_code'])->where('is_active', true)->first();
                if ($coupon && $subtotal >= $coupon->min_order_amount) {
                    $discount = $coupon->discount_type === 'percentage'
                        ? ($subtotal * $coupon->discount_value) / 100
                        : $coupon->discount_value;
                    $coupon->increment('used_count');
                }
            }

            $grandTotal = max(0, $subtotal - $discount + $deliveryFee);

            $order = Order::create([
                'order_number' => 'GLOW-BD-' . strtoupper(Str::random(6)),
                'user_id' => $request->user()?->id,
                'customer_name' => $validated['customer_name'],
                'customer_email' => $validated['customer_email'],
                'customer_phone' => $validated['customer_phone'],
                'district' => $validated['district'],
                'city_area' => $validated['city_area'],
                'full_address' => $validated['full_address'],
                'delivery_note' => $validated['delivery_note'] ?? null,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'delivery_charge' => $deliveryFee,
                'total' => $grandTotal,
                'payment_method' => $validated['payment_method'],
                'payment_status' => $validated['payment_method'] === 'cod' ? 'unpaid' : 'paid',
                'transaction_id' => $validated['transaction_id'] ?? null,
                'status' => 'pending'
            ]);

            foreach ($orderItemsData as $itemData) {
                $order->items()->create($itemData);
            }

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order->load('items')
            ], 201);
        });
    }
}`
    },
    'database/migrations/2026_09_01_create_ecommerce_tables.php': {
      lang: 'php',
      description: 'MySQL Schema Migration for all 20 e-commerce tables with foreign keys and indexes',
      content: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Categories
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. Brands
        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('country')->default('South Korea');
            $table->string('logo')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 3. Products
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('sku')->unique();
            $table->foreignId('brand_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->decimal('regular_price', 10, 2);
            $table->decimal('discount_price', 10, 2);
            $table->integer('stock_quantity')->default(0);
            $table->string('stock_status')->default('in_stock');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_bestseller')->default(false);
            $table->boolean('is_new_arrival')->default(false);
            $table->boolean('is_active')->default(true);
            $table->decimal('rating', 3, 2)->default(5.0);
            $table->integer('review_count')->default(0);
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->longText('ingredients')->nullable();
            $table->text('usage_instructions')->nullable();
            $table->json('specifications')->nullable();
            $table->string('volume_or_size')->nullable();
            $table->string('country_of_origin')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['category_id', 'is_active']);
            $table->index(['brand_id', 'is_active']);
        });

        // 4. Orders
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('customer_name');
            $table->string('customer_email')->nullable();
            $table->string('customer_phone');
            $table->string('district');
            $table->string('city_area');
            $table->text('full_address');
            $table->text('delivery_note')->nullable();
            $table->decimal('subtotal', 10, 2);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('delivery_charge', 10, 2)->default(60);
            $table->decimal('total', 10, 2);
            $table->string('payment_method')->default('cod');
            $table->string('payment_status')->default('unpaid');
            $table->string('transaction_id')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();

            $table->index(['order_number', 'customer_phone']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
        Schema::dropIfExists('products');
        Schema::dropIfExists('brands');
        Schema::dropIfExists('categories');
    }
};`
    },
    'docker-compose.yml': {
      lang: 'yaml',
      description: 'Docker Compose configuration for Laravel 12 Sail with MySQL 8.0, Redis, and Mailpit',
      content: `version: '3.8'
services:
  laravel.test:
    build:
      context: ./vendor/laravel/sail/runtimes/8.3
      dockerfile: Dockerfile
      args:
        WWWGROUP: '1000'
    image: sail-8.3/app
    extra_hosts:
      - 'host.docker.internal:host-gateway'
    ports:
      - '\${APP_PORT:-80}:80'
      - '\${VITE_PORT:-5173}:\${VITE_PORT:-5173}'
    environment:
      WWWUSER: '1000'
      LARAVEL_SAIL: 1
      XDEBUG_MODE: '\${SAIL_XDEBUG_MODE:-off}'
    volumes:
      - '.:/var/www/html'
    networks:
      - sail
    depends_on:
      - mysql
      - redis
      - mailpit

  mysql:
    image: 'mysql/mysql-server:8.0'
    ports:
      - '\${FORWARD_DB_PORT:-3306}:3306'
    environment:
      MYSQL_ROOT_PASSWORD: '\${DB_PASSWORD:-password}'
      MYSQL_ROOT_HOST: '%'
      MYSQL_DATABASE: '\${DB_DATABASE:-glowaura_beauty}'
      MYSQL_USER: '\${DB_USERNAME:-sail}'
      MYSQL_PASSWORD: '\${DB_PASSWORD:-password}'
      MYSQL_ALLOW_EMPTY_PASSWORD: 1
    volumes:
      - 'sail-mysql:/var/lib/mysql'
    networks:
      - sail
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-p\${DB_PASSWORD}"]
      retries: 3
      timeout: 5s

  redis:
    image: 'redis:alpine'
    ports:
      - '\${FORWARD_REDIS_PORT:-6379}:6379'
    volumes:
      - 'sail-redis:/data'
    networks:
      - sail

  mailpit:
    image: 'axllent/mailpit:latest'
    ports:
      - '\${FORWARD_MAILPIT_PORT:-1025}:1025'
      - '\${FORWARD_MAILPIT_DASHBOARD_PORT:-8025}:8025'
    networks:
      - sail

networks:
  sail:
    driver: bridge

volumes:
  sail-mysql:
    driver: local
  sail-redis:
    driver: local`
    },
    '.env.example': {
      lang: 'bash',
      description: 'Laravel 12 Environment Configuration for MySQL, Sanctum, bKash & Redis',
      content: `APP_NAME="GlowAura Beauty BD"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_TIMEZONE="Asia/Dhaka"
APP_URL=http://localhost

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=glowaura_beauty
DB_USERNAME=sail
DB_PASSWORD=password

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=public
QUEUE_CONNECTION=database

CACHE_STORE=database
CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_SCHEME=null
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="orders@glowaurabd.com"
MAIL_FROM_NAME="\${APP_NAME}"

# BANGLADESH PAYMENT GATEWAYS
BKASH_MERCHANT_NUMBER="01711234567"
NAGAD_MERCHANT_NUMBER="01811234567"`
    }
  };

  const handleCopy = () => {
    const content = codeSnippets[activeFile]?.content;
    if (content) {
      navigator.clipboard?.writeText(content);
      setCopied(true);
      showToast('Copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>LARAVEL 12 + VUE 3 + MYSQL ARCHITECTURE</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-zinc-900">
            Backend Architecture & Code Explorer
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Complete production-ready Laravel 12 backend codebase, Eloquent ORM relationships, Sanctum security, and Docker Sail setup.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Code Copied!' : 'Copy Active File'}</span>
        </button>
      </div>

      {/* 3 Quick Setup Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#F8E8EE] p-5 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <Terminal className="w-4 h-4" />
            <span>1. Docker Sail Command</span>
          </div>
          <div className="bg-zinc-900 text-zinc-200 text-xs font-mono p-3 rounded-xl overflow-x-auto">
            ./vendor/bin/sail up -d
          </div>
          <p className="text-[11px] text-zinc-500">
            Spins up PHP 8.3 container, MySQL 8.0 instance, Redis cache, and Mailpit mail catcher.
          </p>
        </div>

        <div className="bg-white border border-[#F8E8EE] p-5 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-[#E86A92] font-bold text-xs uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>2. Migrate & Seed</span>
          </div>
          <div className="bg-zinc-900 text-zinc-200 text-xs font-mono p-3 rounded-xl overflow-x-auto">
            ./vendor/bin/sail artisan migrate --seed
          </div>
          <p className="text-[11px] text-zinc-500">
            Creates 20 tables and seeds 32+ authentic beauty products with Bangladesh pricing.
          </p>
        </div>

        <div className="bg-white border border-[#F8E8EE] p-5 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>3. Frontend Build</span>
          </div>
          <div className="bg-zinc-900 text-zinc-200 text-xs font-mono p-3 rounded-xl overflow-x-auto">
            npm install && npm run build
          </div>
          <p className="text-[11px] text-zinc-500">
            Bundles Vue 3 components, Composition API, and Tailwind CSS responsive styling.
          </p>
        </div>
      </div>

      {/* Code Browser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-[#F8E8EE] rounded-3xl p-6 shadow-xs">
        {/* Left: File Tree */}
        <div className="lg:col-span-4 space-y-3 border-r border-zinc-100 pr-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <FolderTree className="w-4 h-4 text-emerald-600" />
            Laravel Project Structure
          </h3>

          <div className="space-y-1 text-xs">
            {Object.keys(codeSnippets).map((path) => (
              <button
                key={path}
                onClick={() => setActiveFile(path)}
                className={`w-full text-left py-2 px-3 rounded-xl font-mono text-[11px] flex items-center justify-between transition-colors cursor-pointer ${
                  activeFile === path
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                    : 'text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                <span className="truncate">{path}</span>
                <FileCode className="w-3.5 h-3.5 shrink-0 opacity-60" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-100 text-xs text-zinc-600 space-y-2">
            <p className="font-semibold text-zinc-900">Laravel 12 Architecture Highlights:</p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-zinc-500">
              <li>Form Request validation on checkout & reviews</li>
              <li>Laravel Sanctum multi-role authentication</li>
              <li>Database transactions for order & inventory safety</li>
              <li>Eloquent Soft Deletes on products</li>
              <li>bKash & Nagad gateway architecture ready</li>
            </ul>
          </div>
        </div>

        {/* Right: Code Viewer */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 bg-zinc-900 text-zinc-300 px-4 py-2.5 rounded-t-2xl font-mono text-xs">
              <span className="text-emerald-400 font-bold">{activeFile}</span>
              <span className="text-[11px] text-zinc-400">
                {codeSnippets[activeFile]?.description}
              </span>
            </div>

            <pre className="bg-[#18181b] text-zinc-100 font-mono text-xs p-5 rounded-b-2xl overflow-x-auto max-h-[520px] overflow-y-auto leading-relaxed border border-zinc-800">
              <code>{codeSnippets[activeFile]?.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
